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
# default_args: applies to EVERY task in the DAG. Set retry + email so that when a task
# fails in the middle of the night, the on-call engineer is notified immediately, not tomorrow morning.
# ---------------------------------------------------------------------------
default_args = {
    "owner": "data-platform",
    "depends_on_past": False,        # today's task doesn't need to wait for yesterday's
    "retries": 3,                    # auto-retry 3 times on transient errors
    "retry_delay": timedelta(minutes=5),
    "email_on_failure": True,
    "sla": timedelta(hours=2),       # alert if it runs longer than 2h
}

# schedule_interval="@daily" + catchup=False = only run for today,
# do NOT backfill the entire history on a new deploy (avoid a "backfill storm").
dag = DAG(
    "daily_sales_pipeline",
    default_args=default_args,
    description="Extract revenue Postgres -> S3 -> Warehouse daily",
    schedule_interval="@daily",
    start_date=datetime(2026, 1, 1),
    catchup=False,
    tags=["sales", "production"],
)


def extract(ds, **_):
    """Fetch transactions for DAY ds (Airflow execution date, format 'YYYY-MM-DD').

    Use ds instead of datetime.now() to guarantee IDEMPOTENCY:
    re-running this task for 2026-03-01 always produces the same dataset, even if
    today is 2026-04-15.
    """
    pg = PostgresHook(postgres_conn_id="oltp_prod")
    sql = """
        SELECT order_id, customer_id, amount, currency, created_at
        FROM orders
        WHERE created_at::date = %(ds)s
    """
    df = pg.get_pandas_df(sql, parameters={"ds": ds})
    path = f"/tmp/orders_{ds}.parquet"
    # Parquet instead of CSV because: ~5x better compression, fast columnar reads, keeps schema.
    df.to_parquet(path, index=False)
    return path  # return value -> XCom for the next task to use


def upload_to_s3(ds, **ctx):
    """Push the local Parquet file to S3 (data lake, raw storage)."""
    local_path = ctx["ti"].xcom_pull(task_ids="extract")  # get the path from the previous task
    s3 = S3Hook(aws_conn_id="aws_default")
    s3.load_file(
        filename=local_path,
        # Partitioned by day -> Athena/Spark can prune partitions when querying.
        key=f"raw/orders/dt={ds}/orders.parquet",
        bucket_name="lake-prod",
        replace=True,                # allow overwrite on retry
    )


def load_to_warehouse(ds, **_):
    """COPY from S3 into the staging table, then MERGE into the fact table."""
    pg = PostgresHook(postgres_conn_id="warehouse_prod")
    # "DELETE + INSERT" pattern by partition: re-running a failed day
    # won't create duplicate data (idempotent).
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


# Declare tasks + dependency: extract -> upload -> load.
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
# Why "manual commit"? enable.auto.commit=False lets us commit
# the offset ONLY AFTER a successful write to ClickHouse. If it crashes midway,
# the next run will re-read the uncommitted events -> at-least-once delivery.
# ---------------------------------------------------------------------------
consumer = Consumer({
    "bootstrap.servers": "kafka-1:9092,kafka-2:9092,kafka-3:9092",
    "group.id": "clickstream-loader-v1",
    "enable.auto.commit": False,
    "auto.offset.reset": "earliest",   # new consumer reads from the beginning
    "max.poll.interval.ms": 600000,    # allow long batch processing (10 minutes)
})
consumer.subscribe(["events.clicks"])

# Dead-letter queue: where unparseable messages are dropped, for the data team
# to inspect later, WITHOUT blocking the whole pipeline for one bad record.
dlq = Producer({"bootstrap.servers": "kafka-1:9092"})

ch = Client("clickhouse-prod")
BATCH_SIZE = 5000
buffer: list[tuple] = []
running = True


def flush():
    """Push the current buffer into ClickHouse + commit the Kafka offset."""
    if not buffer:
        return
    # ClickHouse recommends inserting in large batches (1k-100k) to reduce the number of
    # merged 'parts'. Inserting row by row would create millions of parts -> background
    # merge overload -> slow queries.
    ch.execute(
        "INSERT INTO events.clicks (ts, user_id, url, country, device) VALUES",
        buffer,
    )
    consumer.commit(asynchronous=False)  # synchronous, ensures the commit completes
    buffer.clear()


def shutdown(*_):
    """Catch SIGTERM (k8s, systemd) -> flush the buffer before exiting.

    Without this function -> a pod killed during a rolling deploy would LOSE every event
    still sitting in the buffer.
    """
    global running
    running = False


signal.signal(signal.SIGTERM, shutdown)
signal.signal(signal.SIGINT, shutdown)

while running:
    msg = consumer.poll(timeout=1.0)
    if msg is None:
        # No new data -> take the opportunity to flush a partial batch if any.
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
        # Poison pill -> push to the DLQ, with the error for debugging, then continue.
        dlq.produce("events.clicks.dlq",
                    msg.value(),
                    headers={"error": str(e)})
        continue

    if len(buffer) >= BATCH_SIZE:
        flush()

flush()                  # final flush before exiting
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

# spark.sql.adaptive.enabled = AQE: Spark automatically rebalances partitions and handles
# skew at runtime. Enabling it by default on Spark 3.x is best practice.
spark = (
    SparkSession.builder
    .appName("daily_user_aggregates")
    .config("spark.sql.adaptive.enabled", "true")
    .config("spark.sql.sources.partitionOverwriteMode", "dynamic")
    .getOrCreate()
)

DATE = "2026-06-28"

# ---------------------------------------------------------------------------
# Predicate pushdown: thanks to partitioning by dt=YYYY-MM-DD, Spark only reads the
# s3://lake/raw/events/dt=2026-06-28/ folder instead of scanning the whole lake.
# ---------------------------------------------------------------------------
events = (
    spark.read.parquet("s3://lake/raw/events/")
    .where(F.col("dt") == DATE)
    .select("user_id", "country_code", "event_type", "duration_ms")
)

# The dim_country table has only ~250 rows -> broadcast it so every executor keeps a copy
# in memory. Avoids shuffling billions of events just to join with 250 rows.
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

# The "small files" problem: if output has the default 200 partitions -> 200 tiny
# Parquet files -> NameNode/S3 listing gets very slow. Coalesce/repartition to a
# suitable number of files (here 4 files ~128MB / partition is optimal for HDFS/S3).
(agg.repartition(4, "region")
    .write
    .mode("overwrite")          # only overwrite the dt=DATE partition thanks to dynamic mode
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
-- Why incremental? The raw.orders table has 5 billion rows. A full refresh every day
-- costs 4 hours and 200 USD. Incremental only processes new orders -> 4 minutes, 3 USD.

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
        _loaded_at                 -- watermark written by Fivetran/Stitch
    from {{ source('oltp', 'orders') }}

    {% if is_incremental() %}
        -- Only runs from the 2nd build onward.
        -- Take every row with _loaded_at greater than the current max watermark
        -- in the target table. Subtract 1 hour to compensate for event arrival lag.
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
        -- Classify revenue into buckets, used for the dashboard.
        case
            when amount_usd >= 1000 then 'enterprise'
            when amount_usd >=  100 then 'smb'
            else 'consumer'
        end as revenue_bucket
    from src s
    left join {{ ref('dim_customers') }} c using (customer_id)
)

select * from enriched

-- Accompanying tests (schema.yml):
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
// Debezium connector configuration for Postgres.
// POST to the Kafka Connect REST API: /connectors
{
  "name": "pg-orders-cdc",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",

    // --- Connection to the source DB ---
    "database.hostname": "oltp-primary.internal",
    "database.port": "5432",
    "database.user": "debezium",
    "database.password": "\${file:/secrets/db.properties:password}",
    "database.dbname": "shop",

    // --- Most important config: logical decoding plugin ---
    // pgoutput is the standard plugin for Postgres 10+, no extra install needed.
    // Debezium reads the WAL through this replication slot.
    "plugin.name": "pgoutput",
    "slot.name": "debezium_orders",
    "publication.autocreate.mode": "filtered",

    // Only stream the needed tables (reduce noise + load).
    "table.include.list": "public.orders,public.order_items,public.outbox",

    // --- Initial snapshot ---
    // "initial" = scan the whole table once (event op='r'), then read the WAL.
    // This way the consumer always has full state, without missing old data.
    "snapshot.mode": "initial",

    // --- Schema registry: standardize Avro/JSON-Schema schemas ---
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "http://schema-registry:8081",

    // --- Routing topic ---
    // Default topic = serverName.schema.table.
    // Here we add the prefix "cdc.shop" for easier ACL management.
    "topic.prefix": "cdc.shop",

    // --- Outbox pattern ---
    // The "outbox" table holds domain events (OrderPlaced, OrderRefunded). Each row
    // is transformed into a separate event on a topic based on the aggregatetype column.
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
# The "data contract" model:
#   - PRODUCER (OLTP team) commits to schema + invariants through this suite.
#   - CONSUMER (data team) runs validation on every ingest. A failed suite means
#     the data is treated as "nonexistent" and NOT loaded into fct_orders.
# This way, downstream dashboards never silently show wrong numbers.
# ---------------------------------------------------------------------------

df = pd.read_parquet("s3://lake/raw/orders/dt=2026-06-28/")
dataset = ge.from_pandas(df)

# 1) Hard rule: violation blocks the pipeline.
dataset.expect_column_values_to_not_be_null("order_id")
dataset.expect_column_values_to_be_unique("order_id")
dataset.expect_column_values_to_be_in_set("status",
    ["placed", "paid", "refunded", "cancelled"])
dataset.expect_column_values_to_be_between("amount_usd", min_value=0,
                                           max_value=1_000_000)

# 2) Soft rule (warning): doesn't block, but pings Slack for the team to check.
dataset.expect_table_row_count_to_be_between(min_value=50_000,
                                             max_value=2_000_000,
                                             meta={"severity": "warning"})

result = dataset.validate(result_format="SUMMARY")

def slack(text: str, color: str):
    requests.post("https://hooks.slack.com/services/XXX/YYY/ZZZ",
                  json={"attachments": [{"color": color, "text": text}]})

# Classify by severity, then decide to fail the pipeline or just warn.
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
    # SystemExit != 0 -> Airflow task fails -> downstream tasks don't run.
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
# Scenario: every day we receive a CDC file containing INSERT, UPDATE, and DELETE.
# With plain Parquet we'd have to read + rewrite the whole partition -> very expensive.
# Delta Lake supports atomic MERGE INTO, transactions via _delta_log.
# ---------------------------------------------------------------------------

updates = spark.read.parquet("s3://lake/cdc/users/dt=2026-06-28/")
# updates has an op column: 'I' insert, 'U' update, 'D' delete.

target = DeltaTable.forPath(spark, "s3://lake/silver/dim_users")

(target.alias("t")
    .merge(updates.alias("s"), "t.user_id = s.user_id")
    # If the source is a DELETE -> remove the target row.
    .whenMatchedDelete(condition="s.op = 'D'")
    # Update when user_id matches and the source record is NEWER (guards against out-of-order).
    .whenMatchedUpdate(
        condition="s.op = 'U' AND s.updated_at > t.updated_at",
        set={
            "email":      "s.email",
            "country":    "s.country",
            "updated_at": "s.updated_at",
        },
    )
    # Insert when there's no target row yet and the source is an INSERT.
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

# Time travel: if there's an incident, query the table at a prior version to compare.
prev = spark.read.format("delta") \\
    .option("versionAsOf", 41) \\
    .load("s3://lake/silver/dim_users")
prev.where("country = 'VN'").show(5)

# OPTIMIZE + ZORDER: merge many small files into ~128MB files and sort
# by the commonly filtered column -> much faster downstream queries.
spark.sql("OPTIMIZE delta.\`s3://lake/silver/dim_users\` ZORDER BY (country)")

# VACUUM: delete old Parquet files no longer part of the current version.
# Default retention is 7 days -> enough for time travel debugging.
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
-- SCD Type 2: every time a customer changes an important attribute,
-- we do NOT overwrite the old row. We:
--   1) close the old version (set valid_to = now, is_current = false)
--   2) insert a new version with a new surrogate key
-- This way, fact_orders joined to dim_customer always returns the "address at the
-- time the order was placed", not today's address.
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
        -- Hash the business columns for fast comparison: one hash represents the whole row.
        md5(coalesce(full_name,'') || '|' ||
            coalesce(email,'')     || '|' ||
            coalesce(country,'')   || '|' ||
            coalesce(tier,''))     as row_hash
    from staging.customers_today
) s
on  t.customer_id = s.customer_id
and t.is_current   = true

-- Matches the current row but hash differs -> attribute changed: CLOSE the old version.
when matched and t.row_hash != s.row_hash then update set
    t.valid_to   = s.effective_ts,
    t.is_current = false

-- No match -> either a brand-new customer, or a new version right after
-- closing the old version in the previous MERGE statement (runs in 2 passes).
when not matched then insert (
    customer_sk, customer_id, full_name, email, country, tier,
    row_hash, valid_from, valid_to, is_current
) values (
    -- surrogate key auto-generated; on Snowflake use a sequence/identity column.
    dim_customer_sk_seq.nextval,
    s.customer_id, s.full_name, s.email, s.country, s.tier,
    s.row_hash, s.effective_ts, timestamp '9999-12-31 00:00:00', true
);

-- History query: "customer 42's tier at the time the order was placed"
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
// Pipeline: computes order count and revenue per store,
// using a 1-minute (tumbling) window, realtime with ~a few seconds of latency.

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

        // ----- Checkpoint every 30s to S3 -> exactly-once if the sink supports it -----
        // When the job restarts, Flink restores state + Kafka offset at the last
        // checkpoint -> no double-counting, no lost events.
        env.enableCheckpointing(30_000);
        env.getCheckpointConfig()
           .setCheckpointStorage("s3://flink-checkpoints/store-revenue/");

        KafkaSource<OrderEvent> source = KafkaSource.<OrderEvent>builder()
            .setBootstrapServers("kafka:9092")
            .setTopics("orders.placed")
            .setGroupId("store-revenue-flink")
            .setDeserializer(new OrderEventDeserializer())
            .build();

        // ----- Watermark: accept events arriving up to 10s late -----
        // The bitter truth of streaming: event-time isn't monotonic. Network,
        // mobile offline mode, retries... can make event 12:00:01 arrive AFTER
        // event 12:00:05. Watermark = a "promise" that all events <= this ts
        // have mostly arrived -> only then does Flink close the window and emit results.
        WatermarkStrategy<OrderEvent> wm = WatermarkStrategy
            .<OrderEvent>forBoundedOutOfOrderness(Duration.ofSeconds(10))
            .withTimestampAssigner((e, ts) -> e.getOrderTs());

        env.fromSource(source, wm, "orders-kafka")
           // keyBy = shuffle by storeId. Each store's state lives on a single
           // task slot -> no locking needed, easy horizontal scaling.
           .keyBy(OrderEvent::getStoreId)
           // 1-minute tumbling: windows do NOT overlap -> clean aggregates for the dashboard.
           .window(TumblingEventTimeWindows.of(Time.minutes(1)))
           // ReduceFunction keeps small state (1 accumulator / key / window) instead of
           // the whole event -> can handle millions of keys.
           .reduce((a, b) -> new OrderEvent(
                a.getStoreId(),
                a.getCount() + b.getCount(),
                a.getRevenue() + b.getRevenue(),
                Math.max(a.getOrderTs(), b.getOrderTs())))
           // Sink: write to the Kafka topic "metrics.store.1m" for the dashboard
           // (Grafana/Looker) to read in realtime.
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
# Why do we need lineage? When the VP of Sales asks "why was yesterday's revenue negative?",
# you can trace from the dashboard -> mart.daily_revenue -> staging.orders
# -> the source OLTP table -> the dbt commit that changed the discount logic. Doing this
# by hand would take half a day; with OpenLineage it's a few seconds on the Marquez UI.
# ---------------------------------------------------------------------------

client = OpenLineageClient.from_environment()  # reads OPENLINEAGE_URL/API_KEY
RUN_ID = str(uuid.uuid4())
PRODUCER = "https://github.com/acme/etl/blob/main/jobs/daily_revenue.py"

# Input dataset: the staging.orders table in Snowflake.
input_ds = Dataset(
    namespace="snowflake://acme",
    name="ANALYTICS.STAGING.ORDERS",
    facets={
        "schema": SchemaDatasetFacet(fields=[
            SchemaField("order_id",   "STRING"),
            SchemaField("amount_usd", "NUMBER"),
            SchemaField("order_ts",   "TIMESTAMP"),
        ]),
        # Attached DQ metric: row count + null count. Marquez will chart the
        # quality trend over time -> easy to spot drift.
        "dataQualityMetrics": DataQualityMetricsInputDatasetFacet(
            rowCount=1_240_553,
            columnMetrics={
                "amount_usd": ColumnMetric(nullCount=0, distinctCount=98_201)
            },
        ),
    },
)

# Output dataset: the mart.daily_revenue table.
output_ds = Dataset(
    namespace="snowflake://acme",
    name="ANALYTICS.MART.DAILY_REVENUE",
)

job = Job(
    namespace="airflow://prod",
    name="daily_revenue_pipeline.transform",
    facets={
        # Store the actual transform SQL -> reviewers immediately see which LOGIC ran.
        "sql": SqlJobFacet(query="""
            insert into mart.daily_revenue
            select cast(order_ts as date) as day, sum(amount_usd)
            from staging.orders
            where cast(order_ts as date) = current_date - 1
            group by 1
        """),
    },
)

# ----- Send 2 events: START then COMPLETE so the timeline renders correctly -----
now = datetime.datetime.utcnow().isoformat()
client.emit(RunEvent(RunState.START,    now, Run(RUN_ID), job, PRODUCER,
                    inputs=[input_ds], outputs=[output_ds]))

# ... run the pipeline here ...

client.emit(RunEvent(RunState.COMPLETE, now, Run(RUN_ID), job, PRODUCER,
                    inputs=[input_ds], outputs=[output_ds]))

# In the Marquez UI you'll see a graph:
#   STAGING.ORDERS  ---[daily_revenue_pipeline.transform]--->  MART.DAILY_REVENUE
# Click on an edge to see SQL, runtime, DQ metric, owner.
`,
  },
];
