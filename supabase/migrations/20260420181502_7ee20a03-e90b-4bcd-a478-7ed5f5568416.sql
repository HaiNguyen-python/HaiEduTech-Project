-- Helper: inject a mermaid block right after "## 4. Detailed Breakdown" header
DO $$
DECLARE
  rec RECORD;
  diagrams JSONB := '{
    "reinforcement-learning::rl-01-foundations": "flowchart LR\n  A[Agent] -->|Action| B[Environment]\n  B -->|State| A\n  B -->|Reward| A",
    "reinforcement-learning::rl-03-qlearning-dqn": "flowchart LR\n  S[State] --> Q[Q-Network]\n  Q --> A[Action]\n  A --> R[Reward]\n  R --> U[Update Q]\n  U --> Q",
    "reinforcement-learning::rl-04-policy-gradients": "flowchart LR\n  S[State] --> P[Policy Net]\n  P --> A[Action]\n  A --> R[Reward]\n  R --> G[Gradient]\n  G --> P",
    "reinforcement-learning::rl-05-applications": "flowchart TD\n  RL[Reinforcement Learning] --> Robot[Robotics]\n  RL --> Game[Game AI]\n  RL --> Drive[Self-Driving]\n  RL --> Rec[Recommenders]\n  RL --> Fin[Finance]",
    "reinforcement-learning::rl-10-rlhf-alphago": "flowchart LR\n  H[Human Feedback] --> RM[Reward Model]\n  RM --> PPO[PPO Trainer]\n  PPO --> LLM[LLM Policy]\n  LLM --> Out[Aligned Output]",
    "reinforcement-learning::rl-11-exploration": "flowchart LR\n  S[State] --> D{Explore?}\n  D -->|Yes| RA[Random Action]\n  D -->|No| BA[Best Action]\n  RA --> R[Reward]\n  BA --> R",
    "cloud-architecture-cost::cloud-arch-2": "flowchart LR\n  C[Client] --> CDN[CDN]\n  CDN --> LB[Load Balancer]\n  LB --> APP[App Tier]\n  APP --> DB[Database]\n  APP --> Cache[Cache]",
    "cloud-serverless-devops::cloud-iac-1": "flowchart LR\n  Code[IaC Code] --> Plan[Terraform Plan]\n  Plan --> Apply[Apply]\n  Apply --> Cloud[Cloud Resources]\n  Cloud --> State[State File]",
    "cloud-strategy-cost::cloud-strat-5": "flowchart TD\n  Cost[Cloud Cost] --> Tag[Tagging]\n  Cost --> RI[Reserved Instances]\n  Cost --> Auto[Autoscaling]\n  Cost --> Spot[Spot Instances]\n  Cost --> Mon[Monitoring]",
    "de-etl::de-etl-1": "flowchart LR\n  Src[Source DB] --> E[Extract]\n  E --> T[Transform]\n  T --> L[Load]\n  L --> DW[Data Warehouse]",
    "de-ingestion::de-ingest-1": "flowchart LR\n  API[API Source] --> Q[Message Queue]\n  DB[Database] --> Q\n  File[Files] --> Q\n  Q --> Pipe[Ingestion Pipeline]\n  Pipe --> Lake[Data Lake]",
    "dl-foundations::dl-9": "flowchart LR\n  Data[Training Data] --> M[Model]\n  M --> Loss[Loss Function]\n  Loss --> Grad[Gradients]\n  Grad --> Opt[Optimizer]\n  Opt --> M",
    "prog-ml::ml-5": "flowchart TD\n  Raw[Raw Data] --> Clean[Cleaning]\n  Clean --> Feat[Feature Eng]\n  Feat --> Train[Train Model]\n  Train --> Eval[Evaluate]\n  Eval --> Deploy[Deploy]",
    "prog-python-basic::py-basic-2": "flowchart LR\n  Var[Variable] --> Type{Type}\n  Type --> Int[int]\n  Type --> Str[str]\n  Type --> List[list]\n  Type --> Dict[dict]",
    "py-decorators::py-dec-1": "flowchart LR\n  Func[Original Func] --> Dec[Decorator]\n  Dec --> Wrap[Wrapper]\n  Wrap --> Call[Call Original]\n  Call --> Ret[Return Result]"
  }'::jsonb;
  k TEXT;
  parts TEXT[];
  mod_id TEXT;
  les_id TEXT;
  diagram TEXT;
  fence TEXT;
  current_md TEXT;
  new_md TEXT;
BEGIN
  FOR k IN SELECT jsonb_object_keys(diagrams) LOOP
    parts := string_to_array(k, '::');
    mod_id := parts[1];
    les_id := parts[2];
    diagram := diagrams->>k;
    fence := E'\n\n```mermaid\n' || diagram || E'\n```\n\n';

    SELECT enhanced_markdown INTO current_md
    FROM public.programming_theory_cache
    WHERE module_id = mod_id AND lesson_id = les_id;

    CONTINUE WHEN current_md IS NULL OR current_md LIKE '%```mermaid%';

    IF current_md ~ '## 4\. Detailed Breakdown' THEN
      new_md := REGEXP_REPLACE(
        current_md,
        E'(## 4\\. Detailed Breakdown[^\n]*\n)',
        E'\\1' || fence,
        'n'
      );
    ELSE
      new_md := current_md || fence;
    END IF;

    UPDATE public.programming_theory_cache
    SET enhanced_markdown = new_md, updated_at = now()
    WHERE module_id = mod_id AND lesson_id = les_id;
  END LOOP;
END $$;