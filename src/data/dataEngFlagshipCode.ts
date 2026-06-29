// Flagship Data Engineering code samples for read-along practice.
// Each project is a real-world pattern used at companies like Airbnb, Netflix,
// Uber, Spotify and Shopify. Code is heavily commented (Vietnamese) so the
// learner can follow each block and understand the "why".

export interface DataEngFlagshipProject {
  id: string;
  emoji: string;
  title: string;
  titleEn: string;
  company: string;        // Real-world inspiration
  stack: string[];
  whatYouLearn: string[]; // 3-5 bullets in Vietnamese
  language: string;       // for CodeBlock highlighter
  code: string;
}

export const dataEngFlagshipProjects: DataEngFlagshipProject[] = [
  // ---------------------------------------------------------------------------
  // 1) Airflow daily sales pipeline
  // ---------------------------------------------------------------------------
  {
    id: "flagship-airflow-sales",
    emoji: "🌬️",
    title: "Airflow: Pipeline doanh thu hằng ngày",
    titleEn: "Airflow: Daily sales pipeline",
    company: "Airbnb / Shopify pattern",
    stack: ["Apache Airflow 2.x", "PostgreSQL", "S3", "Python"],
    whatYouLearn: [
      "Cấu trúc một DAG sản xuất: default_args, retries, SLA, alert",
      "Phân tách bước Extract / Transform / Load thành từng task riêng",
      "Dùng XCom để truyền metadata giữa các task (không truyền data lớn)",
      "Idempotency: chạy lại ngày cũ vẫn ra kết quả giống nhau",
    ],
    language: "python",
    code: `from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.postgres.hooks.postgres import PostgresHook
from airflow.providers.amazon.aws.hooks.s3 import S3Hook
import pandas as pd

# ---------------------------------------------------------------------------
# default_args: áp dụng cho MỌI task trong DAG. Đặt retry + email để khi task
# fail giữa đêm thì on-call engineer được báo ngay, không phải đợi sáng mai.
# ---------------------------------------------------------------------------
default_args = {
    "owner": "data-platform",
    "depends_on_past": False,        # task hôm nay không cần đợi hôm qua
    "retries": 3,                    # tự retry 3 lần khi gặp lỗi tạm thời
    "retry_delay": timedelta(minutes=5),
    "email_on_failure": True,
    "sla": timedelta(hours=2),       # cảnh báo nếu chạy quá 2h
}

# schedule_interval="@daily" + catchup=False = chỉ chạy ngày hôm nay,
# KHÔNG chạy bù toàn bộ lịch sử khi deploy mới (tránh "backfill bão").
dag = DAG(
    "daily_sales_pipeline",
    default_args=default_args,
    description="Trích doanh thu Postgres -> S3 -> Warehouse mỗi ngày",
    schedule_interval="@daily",
    start_date=datetime(2026, 1, 1),
    catchup=False,
    tags=["sales", "production"],
)


def extract(ds, **_):
    """Lấy giao dịch của NGÀY ds (Airflow execution date, dạng 'YYYY-MM-DD').

    Dùng ds thay vì datetime.now() để bảo đảm IDEMPOTENT:
    chạy lại task này ngày 2026-03-01 luôn ra cùng 1 tập dữ liệu, dù
    hôm nay là 2026-04-15.
    """
    pg = PostgresHook(postgres_conn_id="oltp_prod")
    sql = """
        SELECT order_id, customer_id, amount, currency, created_at
        FROM orders
        WHERE created_at::date = %(ds)s
    """
    df = pg.get_pandas_df(sql, parameters={"ds": ds})
    path = f"/tmp/orders_{ds}.parquet"
    # Parquet thay vì CSV vì: nén tốt hơn ~5x, đọc cột nhanh, giữ schema.
    df.to_parquet(path, index=False)
    return path  # giá trị return -> XCom cho task sau dùng


def upload_to_s3(ds, **ctx):
    """Đẩy file Parquet local lên S3 (data lake, lưu thô)."""
    local_path = ctx["ti"].xcom_pull(task_ids="extract")  # lấy path từ task trước
    s3 = S3Hook(aws_conn_id="aws_default")
    s3.load_file(
        filename=local_path,
        # Phân vùng theo ngày -> Athena/Spark có thể prune partition khi query.
        key=f"raw/orders/dt={ds}/orders.parquet",
        bucket_name="lake-prod",
        replace=True,                # cho phép ghi đè khi retry
    )


def load_to_warehouse(ds, **_):
    """COPY từ S3 vào bảng staging, rồi MERGE vào fact table."""
    pg = PostgresHook(postgres_conn_id="warehouse_prod")
    # Pattern "DELETE + INSERT" theo partition: chạy lại 1 ngày bị lỗi
    # sẽ không tạo dữ liệu trùng (idempotent).
    pg.run(f"DELETE FROM fct_sales WHERE order_date = '{ds}'")
    pg.run(f"""
        INSERT INTO fct_sales (order_id, customer_id, amount_usd, order_date)
        SELECT order_id,
               customer_id,
               amount * fx_rate(currency, '{ds}') AS amount_usd,
               '{ds}'::date
        FROM staging.orders_s3
        WHERE dt = '{ds}'
    """)


# Khai báo task + dependency: extract -> upload -> load.
t1 = PythonOperator(task_id="extract", python_callable=extract, dag=dag)
t2 = PythonOperator(task_id="upload", python_callable=upload_to_s3, dag=dag)
t3 = PythonOperator(task_id="load", python_callable=load_to_warehouse, dag=dag)
t1 >> t2 >> t3
`,
  },

  // ---------------------------------------------------------------------------
  // 2) Kafka streaming clickstream consumer
  // ---------------------------------------------------------------------------
  {
    id: "flagship-kafka-clickstream",
    emoji: "📡",
    title: "Kafka: Tiêu thụ clickstream realtime",
    titleEn: "Kafka clickstream consumer",
    company: "Spotify / TikTok pattern",
    stack: ["Apache Kafka", "Python", "confluent-kafka", "ClickHouse"],
    whatYouLearn: [
      "Consumer group + offset commit thủ công để bảo đảm at-least-once",
      "Batch insert vào ClickHouse thay vì insert từng dòng (gấp 100 lần nhanh hơn)",
      "Graceful shutdown: flush buffer trước khi thoát để không mất event",
      "Dead-letter queue cho message hỏng (poison pill)",
    ],
    language: "python",
    code: `import json
import signal
from confluent_kafka import Consumer, Producer, KafkaError
from clickhouse_driver import Client

# ---------------------------------------------------------------------------
# Vì sao "manual commit"? enable.auto.commit=False cho phép ta CHỈ commit
# offset SAU KHI đã ghi thành công vào ClickHouse. Nếu crash giữa chừng,
# lần chạy sau sẽ đọc lại các event chưa commit -> at-least-once delivery.
# ---------------------------------------------------------------------------
consumer = Consumer({
    "bootstrap.servers": "kafka-1:9092,kafka-2:9092,kafka-3:9092",
    "group.id": "clickstream-loader-v1",
    "enable.auto.commit": False,
    "auto.offset.reset": "earliest",   # consumer mới đọc từ đầu
    "max.poll.interval.ms": 600000,    # cho phép xử lý batch lâu (10 phút)
})
consumer.subscribe(["events.clicks"])

# Dead-letter queue: nơi vứt các message không parse được, để team data
# inspect sau, KHÔNG block toàn bộ pipeline vì 1 record xấu.
dlq = Producer({"bootstrap.servers": "kafka-1:9092"})

ch = Client("clickhouse-prod")
BATCH_SIZE = 5000
buffer: list[tuple] = []
running = True


def flush():
    """Đẩy buffer hiện tại vào ClickHouse + commit offset Kafka."""
    if not buffer:
        return
    # ClickHouse khuyến nghị insert theo batch lớn (1k-100k) để giảm số
    # 'parts' merge. Insert từng row sẽ tạo hàng triệu parts -> background
    # merge ngộp -> query chậm.
    ch.execute(
        "INSERT INTO events.clicks (ts, user_id, url, country, device) VALUES",
        buffer,
    )
    consumer.commit(asynchronous=False)  # đồng bộ, đảm bảo commit xong
    buffer.clear()


def shutdown(*_):
    """Bắt SIGTERM (k8s, systemd) -> flush buffer trước khi thoát.

    Không có hàm này -> pod bị kill khi rolling deploy sẽ MẤT mọi event
    đang nằm trong buffer.
    """
    global running
    running = False


signal.signal(signal.SIGTERM, shutdown)
signal.signal(signal.SIGINT, shutdown)

while running:
    msg = consumer.poll(timeout=1.0)
    if msg is None:
        # Không có data mới -> tranh thủ flush partial batch nếu có.
        flush()
        continue
    if msg.error():
        if msg.error().code() == KafkaError._PARTITION_EOF:
            continue
        raise RuntimeError(msg.error())

    try:
        event = json.loads(msg.value())
        buffer.append((
            event["ts"], event["user_id"],
            event["url"], event["country"], event["device"],
        ))
    except (json.JSONDecodeError, KeyError) as e:
        # Poison pill -> đẩy vào DLQ, kèm lỗi để debug, rồi đi tiếp.
        dlq.produce("events.clicks.dlq",
                    msg.value(),
                    headers={"error": str(e)})
        continue

    if len(buffer) >= BATCH_SIZE:
        flush()

flush()                  # flush lần cuối trước khi thoát
consumer.close()
print("clean shutdown")
`,
  },

  // ---------------------------------------------------------------------------
  // 3) Spark batch aggregation
  // ---------------------------------------------------------------------------
  {
    id: "flagship-spark-aggregate",
    emoji: "⚡",
    title: "Spark: Tổng hợp 1 tỷ dòng log/ngày",
    titleEn: "Spark: aggregate 1B log rows/day",
    company: "Netflix / Uber pattern",
    stack: ["Apache Spark 3.5", "PySpark", "Parquet", "S3"],
    whatYouLearn: [
      "Đọc theo partition để Spark chỉ scan thư mục cần thiết",
      "broadcast() bảng nhỏ để tránh shuffle hàng tỷ dòng",
      "repartition() trước khi write để file output không bị 'small files'",
      "Lưu bằng partitionBy + overwrite mode='dynamic' an toàn cho partition khác",
    ],
    language: "python",
    code: `from pyspark.sql import SparkSession, functions as F
from pyspark.sql.functions import broadcast

# spark.sql.adaptive.enabled = AQE: Spark tự cân lại số partition và xử lý
# skew lúc runtime. Bật mặc định trên Spark 3.x là best-practice.
spark = (
    SparkSession.builder
    .appName("daily_user_aggregates")
    .config("spark.sql.adaptive.enabled", "true")
    .config("spark.sql.sources.partitionOverwriteMode", "dynamic")
    .getOrCreate()
)

DATE = "2026-06-28"

# ---------------------------------------------------------------------------
# Predicate pushdown: nhờ partition theo dt=YYYY-MM-DD, Spark chỉ đọc đúng
# thư mục s3://lake/raw/events/dt=2026-06-28/ chứ không scan toàn lake.
# ---------------------------------------------------------------------------
events = (
    spark.read.parquet("s3://lake/raw/events/")
    .where(F.col("dt") == DATE)
    .select("user_id", "country_code", "event_type", "duration_ms")
)

# Bảng dim_country chỉ có ~250 dòng -> broadcast để mọi executor giữ 1 bản
# trong memory. Tránh shuffle hàng tỷ event chỉ để join với 250 dòng.
countries = spark.read.parquet("s3://lake/dim/countries/")  # name, region

agg = (
    events.join(broadcast(countries), "country_code")
    .groupBy("region", "event_type")
    .agg(
        F.countDistinct("user_id").alias("dau"),
        F.sum("duration_ms").alias("total_ms"),
        F.avg("duration_ms").alias("avg_ms"),
    )
    .withColumn("dt", F.lit(DATE))
)

# Vấn đề "small files": nếu output có 200 partition mặc định -> 200 file
# Parquet bé tí -> NameNode/S3 list rất chậm. Coalesce/repartition về số
# file phù hợp (ở đây 4 file ~128MB / partition là tối ưu cho HDFS/S3).
(agg.repartition(4, "region")
    .write
    .mode("overwrite")          # chỉ overwrite partition dt=DATE nhờ dynamic
    .partitionBy("dt", "region")
    .parquet("s3://lake/mart/user_aggregates/"))

spark.stop()
`,
  },

  // ---------------------------------------------------------------------------
  // 4) dbt incremental model
  // ---------------------------------------------------------------------------
  {
    id: "flagship-dbt-incremental",
    emoji: "🧱",
    title: "dbt: Mô hình incremental cho fact lớn",
    titleEn: "dbt: incremental fact model",
    company: "Fishtown Analytics / Modern Data Stack",
    stack: ["dbt-core", "Snowflake / BigQuery", "Jinja", "SQL"],
    whatYouLearn: [
      "incremental + merge giúp chỉ xử lý dữ liệu mới, tiết kiệm 90% compute",
      "is_incremental() macro để chia logic full-refresh vs delta",
      "unique_key + on_schema_change để dbt tự sinh MERGE đúng",
      "Test schema (not_null, unique) + freshness là tuyến phòng thủ đầu tiên",
    ],
    language: "sql",
    code: `-- models/marts/fct_orders.sql
-- Vì sao incremental? Bảng raw.orders có 5 tỷ dòng. Full-refresh mỗi ngày
-- tốn 4 giờ và 200 USD. Incremental chỉ xử lý orders mới -> 4 phút, 3 USD.

{{ config(
    materialized = 'incremental',
    unique_key   = 'order_id',
    on_schema_change = 'append_new_columns',
    incremental_strategy = 'merge',
    cluster_by   = ['order_date']
) }}

with src as (
    select
        order_id,
        customer_id,
        status,
        amount_usd,
        order_ts,
        cast(order_ts as date) as order_date,
        _loaded_at                 -- watermark do Fivetran/Stitch ghi vào
    from {{ source('oltp', 'orders') }}

    {% if is_incremental() %}
        -- ⬇️ Chỉ chạy ở lần build thứ 2 trở đi.
        -- Lấy mọi row có _loaded_at lớn hơn watermark tối đa hiện có
        -- trong bảng đích. Trừ 1 giờ để bù trễ event arrival.
        where _loaded_at > (
            select coalesce(max(_loaded_at), '1900-01-01')
                   - interval '1 hour'
            from {{ this }}
        )
    {% endif %}
),

enriched as (
    select
        s.*,
        c.country,
        c.segment,
        -- Phân loại doanh thu theo bucket, dùng cho dashboard.
        case
            when amount_usd >= 1000 then 'enterprise'
            when amount_usd >=  100 then 'smb'
            else 'consumer'
        end as revenue_bucket
    from src s
    left join {{ ref('dim_customers') }} c using (customer_id)
)

select * from enriched

-- Test đi kèm (schema.yml):
--   - unique:  order_id
--   - not_null: order_id, order_date
--   - accepted_values: status in ('placed','paid','refunded','cancelled')
--   - source freshness: error_after 24h
`,
  },

  // ---------------------------------------------------------------------------
  // 5) Debezium CDC -> Kafka -> Lake
  // ---------------------------------------------------------------------------
  {
    id: "flagship-cdc-debezium",
    emoji: "🔁",
    title: "CDC: Debezium đồng bộ Postgres -> Lake",
    titleEn: "CDC: Debezium Postgres to Lake",
    company: "Confluent / Stripe pattern",
    stack: ["Debezium", "Kafka Connect", "Postgres logical replication", "S3 sink"],
    whatYouLearn: [
      "CDC log-based đọc WAL -> không gây tải SELECT lên DB nguồn",
      "Mỗi event có op (c/u/d/r) cho create/update/delete/snapshot",
      "Tombstone record (value=null) báo hiệu DELETE cho compacted topic",
      "Outbox pattern: ghi event vào bảng outbox rồi để CDC stream ra Kafka",
    ],
    language: "json",
    code: `// Cấu hình connector Debezium cho Postgres.
// POST đến Kafka Connect REST API: /connectors
{
  "name": "pg-orders-cdc",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",

    // --- Kết nối DB nguồn ---
    "database.hostname": "oltp-primary.internal",
    "database.port": "5432",
    "database.user": "debezium",
    "database.password": "\${file:/secrets/db.properties:password}",
    "database.dbname": "shop",

    // --- Cấu hình quan trọng nhất: plugin logical decoding ---
    // pgoutput là plugin chuẩn của Postgres 10+, không cần cài thêm.
    // Debezium đọc WAL qua replication slot này.
    "plugin.name": "pgoutput",
    "slot.name": "debezium_orders",
    "publication.autocreate.mode": "filtered",

    // Chỉ stream các bảng cần (giảm noise + tải).
    "table.include.list": "public.orders,public.order_items,public.outbox",

    // --- Snapshot ban đầu ---
    // "initial" = quét toàn bộ bảng 1 lần (event op='r'), rồi mới đọc WAL.
    // Nhờ vậy consumer luôn có full state, không bị thiếu dữ liệu cũ.
    "snapshot.mode": "initial",

    // --- Schema registry: chuẩn hoá schema Avro/JSON-Schema ---
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "http://schema-registry:8081",

    // --- Routing topic ---
    // Mặc định topic = serverName.schema.table.
    // Ở đây gắn prefix "cdc.shop" để dễ ACL.
    "topic.prefix": "cdc.shop",

    // --- Outbox pattern ---
    // Bảng "outbox" giữ event domain (OrderPlaced, OrderRefunded). Mỗi row
    // được transform thành 1 event lên topic riêng theo cột aggregatetype.
    "transforms": "outbox",
    "transforms.outbox.type": "io.debezium.transforms.outbox.EventRouter",
    "transforms.outbox.route.by.field": "aggregatetype",
    "transforms.outbox.table.field.event.id": "id",
    "transforms.outbox.table.field.event.key": "aggregateid",
    "transforms.outbox.table.field.event.payload": "payload"
  }
}
`,
  },

  // ---------------------------------------------------------------------------
  // 6) Great Expectations data quality
  // ---------------------------------------------------------------------------
  {
    id: "flagship-ge-quality",
    emoji: "🛡️",
    title: "Data Quality: Great Expectations gate",
    titleEn: "Data Quality with Great Expectations",
    company: "Superconductive / Heineken pattern",
    stack: ["Great Expectations", "Airflow", "Pandas/Spark", "Slack alert"],
    whatYouLearn: [
      "Expectation suite = hợp đồng dữ liệu giữa producer và consumer",
      "Gate pipeline: thất bại = chặn load vào warehouse (fail fast)",
      "Phân biệt rule cứng (must) và rule cảnh báo (should)",
      "Lưu Data Docs HTML để stakeholder không kỹ thuật cũng đọc được",
    ],
    language: "python",
    code: `import great_expectations as ge
import pandas as pd
import requests

# ---------------------------------------------------------------------------
# Mô hình "data contract":
#   - PRODUCER (team OLTP) cam kết schema + invariant qua suite này.
#   - CONSUMER (data team) chạy validate mỗi lần ingest. Suite fail =
#     dữ liệu coi như "không tồn tại", KHÔNG load vào fct_orders.
# Nhờ vậy dashboard ở downstream không bao giờ thấy số sai mà không ai biết.
# ---------------------------------------------------------------------------

df = pd.read_parquet("s3://lake/raw/orders/dt=2026-06-28/")
dataset = ge.from_pandas(df)

# 1) Rule cứng (hard): vi phạm = chặn pipeline.
dataset.expect_column_values_to_not_be_null("order_id")
dataset.expect_column_values_to_be_unique("order_id")
dataset.expect_column_values_to_be_in_set("status",
    ["placed", "paid", "refunded", "cancelled"])
dataset.expect_column_values_to_be_between("amount_usd", min_value=0,
                                           max_value=1_000_000)

# 2) Rule mềm (soft / cảnh báo): không chặn nhưng bắn Slack để team check.
dataset.expect_table_row_count_to_be_between(min_value=50_000,
                                             max_value=2_000_000,
                                             meta={"severity": "warning"})

result = dataset.validate(result_format="SUMMARY")

def slack(text: str, color: str):
    requests.post("https://hooks.slack.com/services/XXX/YYY/ZZZ",
                  json={"attachments": [{"color": color, "text": text}]})

# Phân loại theo severity rồi quyết định fail-pipeline hay chỉ cảnh báo.
hard_failed = [
    r for r in result["results"]
    if not r["success"] and r["expectation_config"]["meta"].get("severity") != "warning"
]
soft_failed = [
    r for r in result["results"]
    if not r["success"] and r["expectation_config"]["meta"].get("severity") == "warning"
]

if soft_failed:
    slack(f"⚠️ DQ warning: {len(soft_failed)} expectation(s) drifted", "warning")

if hard_failed:
    slack(f"🔥 DQ FAIL: blocking load. {len(hard_failed)} hard rules failed", "danger")
    # SystemExit != 0 -> Airflow task fail -> downstream task không chạy.
    raise SystemExit(1)

print("All hard expectations passed -> safe to load into warehouse")
`,
  },

  // ---------------------------------------------------------------------------
  // 7) Delta Lake MERGE upsert (lakehouse)
  // ---------------------------------------------------------------------------
  {
    id: "flagship-delta-merge",
    emoji: "🏞️",
    title: "Lakehouse: Delta Lake MERGE upsert",
    titleEn: "Lakehouse: Delta Lake MERGE upsert",
    company: "Databricks / ByteDance pattern",
    stack: ["Delta Lake 3.x", "Spark", "S3"],
    whatYouLearn: [
      "MERGE = UPSERT + DELETE atomic trên data lake (điều mà Parquet thuần không làm được)",
      "Time travel: query bảng tại version cũ để debug hoặc rollback",
      "OPTIMIZE + ZORDER giảm số file nhỏ và tăng tốc query theo cột lọc",
      "VACUUM xoá file mồ côi sau khi đã giữ đủ retention cho time travel",
    ],
    language: "python",
    code: `from delta.tables import DeltaTable
from pyspark.sql import SparkSession, functions as F

spark = (
    SparkSession.builder
    .appName("merge_users_into_delta")
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension")
    .config("spark.sql.catalog.spark_catalog",
            "org.apache.spark.sql.delta.catalog.DeltaCatalog")
    .getOrCreate()
)

# ---------------------------------------------------------------------------
# Tình huống: hằng ngày nhận file CDC chứa cả INSERT, UPDATE, DELETE.
# Với Parquet thuần phải đọc full + rewrite toàn bộ partition -> rất đắt.
# Delta Lake hỗ trợ MERGE INTO atomic, transaction qua _delta_log.
# ---------------------------------------------------------------------------

updates = spark.read.parquet("s3://lake/cdc/users/dt=2026-06-28/")
# updates có cột op: 'I' insert, 'U' update, 'D' delete.

target = DeltaTable.forPath(spark, "s3://lake/silver/dim_users")

(target.alias("t")
    .merge(updates.alias("s"), "t.user_id = s.user_id")
    # Nếu source là DELETE -> xoá row đích.
    .whenMatchedDelete(condition="s.op = 'D'")
    # Update khi user_id khớp và record source MỚI hơn (chống out-of-order).
    .whenMatchedUpdate(
        condition="s.op = 'U' AND s.updated_at > t.updated_at",
        set={
            "email":      "s.email",
            "country":    "s.country",
            "updated_at": "s.updated_at",
        },
    )
    # Insert khi chưa có row đích và source là INSERT.
    .whenNotMatchedInsert(
        condition="s.op = 'I'",
        values={
            "user_id":    "s.user_id",
            "email":      "s.email",
            "country":    "s.country",
            "created_at": "s.created_at",
            "updated_at": "s.updated_at",
        },
    )
    .execute())

# Time travel: nếu có sự cố, query bảng tại version trước để so sánh.
prev = spark.read.format("delta") \\
    .option("versionAsOf", 41) \\
    .load("s3://lake/silver/dim_users")
prev.where("country = 'VN'").show(5)

# OPTIMIZE + ZORDER: gom nhiều file nhỏ thành file ~128MB và sắp xếp
# theo cột thường lọc -> query downstream nhanh hơn nhiều lần.
spark.sql("OPTIMIZE delta.\`s3://lake/silver/dim_users\` ZORDER BY (country)")

# VACUUM: xoá file Parquet cũ không còn nằm trong version hiện hành.
# Mặc định giữ 7 ngày -> đủ cho time travel debug.
spark.sql("VACUUM delta.\`s3://lake/silver/dim_users\` RETAIN 168 HOURS")
`,
  },

  // ---------------------------------------------------------------------------
  // 8) Dimensional ETL: Slowly Changing Dimension type 2
  // ---------------------------------------------------------------------------
  {
    id: "flagship-scd2",
    emoji: "📚",
    title: "Warehouse: SCD Type 2 cho dim_customer",
    titleEn: "Warehouse: SCD Type 2 customer dimension",
    company: "Kimball-style enterprise DW",
    stack: ["Snowflake / BigQuery", "SQL", "MERGE"],
    whatYouLearn: [
      "Tại sao SCD2 giữ lịch sử thay đổi (vd: khách đổi địa chỉ, đổi tier)",
      "valid_from / valid_to / is_current là 3 cột bất ly thân",
      "Surrogate key (customer_sk) khác business key (customer_id)",
      "Hash row để phát hiện thay đổi mà không phải so từng cột",
    ],
    language: "sql",
    code: `-- ============================================================
-- SCD Type 2: mỗi lần một customer thay đổi attribute quan trọng,
-- ta KHÔNG overwrite row cũ. Ta:
--   1) đóng version cũ (set valid_to = now, is_current = false)
--   2) chèn version mới với surrogate key mới
-- Nhờ vậy fact_orders join về dim_customer luôn cho ra "địa chỉ tại
-- thời điểm đặt hàng", không phải địa chỉ hôm nay.
-- ============================================================

merge into dim_customer t
using (
    select
        customer_id,
        full_name,
        email,
        country,
        tier,
        current_timestamp() as effective_ts,
        -- Hash cột nghiệp vụ để so sánh nhanh: 1 hash đại diện cả row.
        md5(coalesce(full_name,'') || '|' ||
            coalesce(email,'')     || '|' ||
            coalesce(country,'')   || '|' ||
            coalesce(tier,''))     as row_hash
    from staging.customers_today
) s
on  t.customer_id = s.customer_id
and t.is_current   = true

-- Khớp row hiện hành nhưng hash khác -> attribute đã đổi: ĐÓNG version cũ.
when matched and t.row_hash != s.row_hash then update set
    t.valid_to   = s.effective_ts,
    t.is_current = false

-- Không khớp -> hoặc customer mới hoàn toàn, hoặc version mới sau khi
-- vừa đóng version cũ ở câu MERGE trước (chạy 2 pass).
when not matched then insert (
    customer_sk, customer_id, full_name, email, country, tier,
    row_hash, valid_from, valid_to, is_current
) values (
    -- surrogate key tự sinh; trên Snowflake dùng sequence/identity column.
    dim_customer_sk_seq.nextval,
    s.customer_id, s.full_name, s.email, s.country, s.tier,
    s.row_hash, s.effective_ts, timestamp '9999-12-31 00:00:00', true
);

-- Truy vấn lịch sử: "tier của khách 42 vào lúc đơn hàng được đặt"
select o.order_id, o.order_ts, c.tier as tier_at_purchase
from   fct_orders o
join   dim_customer c
       on o.customer_id = c.customer_id
       and o.order_ts >= c.valid_from
       and o.order_ts <  c.valid_to;
`,
  },

  // ---------------------------------------------------------------------------
  // 9) Flink streaming windowed aggregation
  // ---------------------------------------------------------------------------
  {
    id: "flagship-flink-windows",
    emoji: "🌊",
    title: "Flink: Window aggregation realtime",
    titleEn: "Flink: realtime window aggregation",
    company: "Uber / Alibaba pattern",
    stack: ["Apache Flink 1.18", "Java / SQL", "Kafka", "RocksDB state"],
    whatYouLearn: [
      "Event-time vs processing-time + watermark cho late event",
      "Tumbling vs sliding vs session window khác nhau ra sao",
      "Keyed state lưu vào RocksDB -> chịu được TB state, không OOM",
      "Exactly-once nhờ checkpoint + 2-phase commit sink",
    ],
    language: "java",
    code: `// Pipeline: tính số đơn hàng và doanh thu theo cửa hàng,
// theo cửa sổ 1 phút (tumbling), realtime với độ trễ ~vài giây.

import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.windowing.time.Time;
import org.apache.flink.streaming.api.windowing.assigners.TumblingEventTimeWindows;
import org.apache.flink.api.common.eventtime.WatermarkStrategy;
import org.apache.flink.connector.kafka.source.KafkaSource;
import java.time.Duration;

public class StoreRevenueJob {
    public static void main(String[] args) throws Exception {
        StreamExecutionEnvironment env =
            StreamExecutionEnvironment.getExecutionEnvironment();

        // ----- Checkpoint mỗi 30s vào S3 -> exactly-once nếu sink hỗ trợ -----
        // Khi job restart, Flink khôi phục state + offset Kafka tại checkpoint
        // cuối -> không double-count, không mất event.
        env.enableCheckpointing(30_000);
        env.getCheckpointConfig()
           .setCheckpointStorage("s3://flink-checkpoints/store-revenue/");

        KafkaSource<OrderEvent> source = KafkaSource.<OrderEvent>builder()
            .setBootstrapServers("kafka:9092")
            .setTopics("orders.placed")
            .setGroupId("store-revenue-flink")
            .setDeserializer(new OrderEventDeserializer())
            .build();

        // ----- Watermark: chấp nhận event đến trễ 10s -----
        // Sự thật cay đắng của streaming: event-time không monotonic. Mạng,
        // mobile offline, retry... khiến event 12:00:01 có thể tới SAU
        // event 12:00:05. Watermark = "promise" rằng mọi event <= ts này
        // đã đến gần hết -> Flink mới đóng window và emit kết quả.
        WatermarkStrategy<OrderEvent> wm = WatermarkStrategy
            .<OrderEvent>forBoundedOutOfOrderness(Duration.ofSeconds(10))
            .withTimestampAssigner((e, ts) -> e.getOrderTs());

        env.fromSource(source, wm, "orders-kafka")
           // keyBy = shuffle theo storeId. State của mỗi store nằm trên 1
           // task slot duy nhất -> không cần lock, scale ngang dễ.
           .keyBy(OrderEvent::getStoreId)
           // Tumbling 1 phút: cửa sổ KHÔNG chồng lấn -> tổng hợp gọn cho dashboard.
           .window(TumblingEventTimeWindows.of(Time.minutes(1)))
           // ReduceFunction giữ state nhỏ (1 accumulator / key / window) thay vì
           // toàn bộ event -> chịu được hàng triệu key.
           .reduce((a, b) -> new OrderEvent(
                a.getStoreId(),
                a.getCount() + b.getCount(),
                a.getRevenue() + b.getRevenue(),
                Math.max(a.getOrderTs(), b.getOrderTs())))
           // Sink: ghi vào Kafka topic "metrics.store.1m" để dashboard
           // (Grafana/Looker) đọc realtime.
           .sinkTo(buildKafkaSink("metrics.store.1m"));

        env.execute("store-revenue-1m");
    }
}
`,
  },

  // ---------------------------------------------------------------------------
  // 10) Data observability with OpenLineage
  // ---------------------------------------------------------------------------
  {
    id: "flagship-openlineage",
    emoji: "🔭",
    title: "Observability: OpenLineage + Marquez",
    titleEn: "Data observability with OpenLineage",
    company: "WeWork / Astronomer pattern",
    stack: ["OpenLineage", "Marquez", "Airflow listener", "dbt artifacts"],
    whatYouLearn: [
      "Lineage = ai đã sinh ra dataset này, từ input nào, bằng job nào",
      "Khi báo cáo sai -> chỉ vài giây để biết upstream nào hỏng",
      "Tự động collect lineage qua listener thay vì code thủ công mỗi job",
      "Kết hợp lineage + DQ alert -> root cause analysis chỉ trong vài click",
    ],
    language: "python",
    code: `from openlineage.client import OpenLineageClient
from openlineage.client.run import (
    RunEvent, RunState, Run, Job, Dataset
)
from openlineage.client.facet import (
    SchemaDatasetFacet, SchemaField,
    SqlJobFacet, DataQualityMetricsInputDatasetFacet, ColumnMetric,
)
import uuid, datetime

# ---------------------------------------------------------------------------
# Vì sao cần lineage? Khi VP Sales hỏi "vì sao doanh thu hôm qua bị âm?",
# bạn có thể trace từ dashboard -> mart.daily_revenue -> staging.orders
# -> bảng OLTP nguồn -> commit dbt đã sửa logic chiết khấu. Việc này nếu
# làm tay sẽ mất nửa ngày; với OpenLineage chỉ vài giây trên Marquez UI.
# ---------------------------------------------------------------------------

client = OpenLineageClient.from_environment()  # đọc OPENLINEAGE_URL/API_KEY
RUN_ID = str(uuid.uuid4())
PRODUCER = "https://github.com/acme/etl/blob/main/jobs/daily_revenue.py"

# Input dataset: bảng staging.orders trong Snowflake.
input_ds = Dataset(
    namespace="snowflake://acme",
    name="ANALYTICS.STAGING.ORDERS",
    facets={
        "schema": SchemaDatasetFacet(fields=[
            SchemaField("order_id",   "STRING"),
            SchemaField("amount_usd", "NUMBER"),
            SchemaField("order_ts",   "TIMESTAMP"),
        ]),
        # DQ metric đính kèm: row count + null count. Marquez sẽ vẽ biểu đồ
        # diễn biến chất lượng theo thời gian -> dễ phát hiện drift.
        "dataQualityMetrics": DataQualityMetricsInputDatasetFacet(
            rowCount=1_240_553,
            columnMetrics={
                "amount_usd": ColumnMetric(nullCount=0, distinctCount=98_201)
            },
        ),
    },
)

# Output dataset: bảng mart.daily_revenue.
output_ds = Dataset(
    namespace="snowflake://acme",
    name="ANALYTICS.MART.DAILY_REVENUE",
)

job = Job(
    namespace="airflow://prod",
    name="daily_revenue_pipeline.transform",
    facets={
        # Lưu chính câu SQL transform -> reviewer thấy ngay LOGIC nào đã chạy.
        "sql": SqlJobFacet(query="""
            insert into mart.daily_revenue
            select cast(order_ts as date) as day, sum(amount_usd)
            from staging.orders
            where cast(order_ts as date) = current_date - 1
            group by 1
        """),
    },
)

# ----- Gửi 2 event: START rồi COMPLETE để vẽ timeline đúng -----
now = datetime.datetime.utcnow().isoformat()
client.emit(RunEvent(RunState.START,    now, Run(RUN_ID), job, PRODUCER,
                    inputs=[input_ds], outputs=[output_ds]))

# ... thực thi pipeline ở đây ...

client.emit(RunEvent(RunState.COMPLETE, now, Run(RUN_ID), job, PRODUCER,
                    inputs=[input_ds], outputs=[output_ds]))

# Trên Marquez UI bạn sẽ thấy đồ thị:
#   STAGING.ORDERS  ---[daily_revenue_pipeline.transform]--->  MART.DAILY_REVENUE
# Click vào cạnh để xem SQL, runtime, DQ metric, owner.
`,
  },
];
