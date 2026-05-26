# HaiEduTech: Reinforcement Learning for Early Educational Intervention

[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Framework: RL](https://img.shields.io/badge/Framework-Reinforcement%20Learning-orange.svg)]()

HaiEduTech is an open-source research and implementation framework dedicated to optimizing digital early educational interventions. Derived from a finalized thesis project, this repository features a **Cost-Aware** and **Fairness-Aware Reinforcement Learning (RL)** framework designed to build equitable, personalized learning paths for early childhood education.

---

## 📌 Project Overview

In digital learning environments, timely and targeted pedagogical interventions are critical for early childhood development. However, existing adaptive learning systems often face two major limitations:
1. **Resource/Cost Constraints:** Schools and educators operate under limited operational, financial, and temporal budgets.
2. **Algorithmic Bias:** Naive optimization models tend to favor students with higher baseline performance, inadvertently widening the educational equity gap.

**HaiEduTech** addresses these challenges by formulating early educational intervention as a Constrained Markov Decision Process (CMDP). The system learns an optimal intervention policy that maximizes cumulative pedagogical gains while strictly adhering to budget limits and algorithmic fairness constraints.

---

## ⚙️ Core Architecture & Methodology

The core engine models the interaction between the student (Environment) and the digital tutor system (Agent) using an advanced Reinforcement Learning framework:

### 1. MDP Formulation
*   **State Space ($S$):** Multi-dimensional vectors capturing student engagement metrics, error rates, response latencies, historical performance, and contextual demographic indicators.
*   **Action Space ($A$):** Discrete pedagogical interventions, including scaffolding hints, level-of-difficulty adjustments, automated formative feedback, and direct teacher-alert triggers.
*   **Reward Function ($R$):** Dynamically computed based on immediate learning gains, long-term retention metrics, and student persistence.

### 2. Strategic Constraints
*   **Cost-Awareness:** The objective function integrates operational cost penalties (e.g., computational overhead, teacher resource allocation tokens) to ensure the framework remains highly viable for real-world school budgets.
*   **Fairness-Awareness:** Incorporates mathematical fairness constraints (e.g., Equal Opportunity, Demographic Parity metrics) directly into the policy optimization process. This prevents the agent from allocating disproportionate intervention resources exclusively to high-performing student groups.

---

## 📁 Repository Structure

```text
├── data/                  # Simulated and anonymized student interaction datasets
├── environments/          # Custom Gymnasium-based educational environments
├── models/                # RL agent architectures (DQN, PPO, Multi-Armed Bandits)
├── utils/                 # Evaluation metrics, cost-calculators, and fairness auditors
├── notebooks/             # Jupyter notebooks for exploratory data analysis and training visualization
├── main.py                # Main training pipeline entry point
├── requirements.txt       # Project dependencies
└── README.md              # Project documentation
