/**
 * @file rlLessons.ts
 * @description Reinforcement Learning curriculum — 5 long-read English lessons.
 *              Covers RL foundations → MDP → Q-Learning/DQN → Policy Gradients → Real-world applications.
 *              Each lesson follows the ExtendedProgrammingLesson schema with Mermaid flowcharts,
 *              Python examples (gymnasium / numpy / pytorch), and 3-question quizzes.
 */
import type { ExtendedProgrammingModule } from "./types";

export const rlModule: ExtendedProgrammingModule = {
  id: "reinforcement-learning",
  title: "Reinforcement Learning",
  titleEn: "Reinforcement Learning",
  icon: "🤖",
  color: "from-orange-500 to-red-600",
  description:
    "Master Reinforcement Learning: agents that learn from rewards. From MDPs and Q-Learning to Deep Q-Networks, Policy Gradients, and real-world applications in robotics, self-driving cars, and game AI.",
  descriptionEn:
    "Master Reinforcement Learning: agents that learn from rewards. From MDPs and Q-Learning to Deep Q-Networks, Policy Gradients, and real-world applications in robotics, self-driving cars, and game AI.",
  course: "rl",
  lessons: [
    // ────────────────────────────────────────────────────────────────────────
    // Lesson 1 — Foundations of RL
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "rl-01-foundations",
      title: "Foundations of RL: Agent, Environment, State, Action, Reward",
      titleEn: "Foundations of RL: Agent, Environment, State, Action, Reward",
      level: 4,
      difficulty: "advanced",
      codeLanguage: "python",
      __THEORY_START__
> **Prerequisites**: Python basics, basic probability, NumPy. Linear Algebra is helpful for later lessons.

## What is Reinforcement Learning?

**Reinforcement Learning (RL)** is the science of decision-making. Unlike Supervised Learning (which learns from labeled examples) or Unsupervised Learning (which finds hidden patterns), RL learns by **trial and error** — the agent interacts with an environment and receives **rewards** or **penalties** based on its actions.

> 🎯 **Real-world analogy**: Training a dog. You don't show it 10,000 labeled photos of "sit" vs "stand". You give it a treat (reward) when it sits on command. Over time, it learns the policy: "command 'sit' → action 'sit' → tasty reward."

## The Five Pillars of RL

Every RL problem is built from five core components:

| Component | Symbol | Description | Example (self-driving car) |
|-----------|--------|-------------|----------------------------|
| **Agent** | — | The learner / decision-maker | The car's AI brain |
| **Environment** | — | The world the agent interacts with | The road, traffic, weather |
| **State** | \`s\` | Current situation | Speed, position, nearby cars |
| **Action** | \`a\` | What the agent can do | Accelerate, brake, turn |
| **Reward** | \`r\` | Feedback signal | +1 for safe driving, -100 for crash |

## The RL Loop

The interaction between agent and environment forms a continuous loop:

\`\`\`mermaid
flowchart LR
  A[Agent] -->|Action a_t| E[Environment]
  E -->|State s_t+1| A
  E -->|Reward r_t+1| A
  style A fill:#fb923c,color:#fff
  style E fill:#3b82f6,color:#fff
\`\`\`

At each timestep \`t\`:
1. Agent observes state \`s_t\`
2. Agent picks action \`a_t\` according to its **policy** \`π(a|s)\`
3. Environment returns next state \`s_{t+1}\` and reward \`r_{t+1}\`
4. Repeat until episode ends

## Key Terminology

- **Policy (π)**: The agent's strategy — a mapping from states to actions. Can be deterministic (\`a = π(s)\`) or stochastic (\`π(a|s) = probability\`).
- **Episode**: One complete sequence from start to terminal state (e.g., one game of chess).
- **Return (G)**: Total accumulated reward from time \`t\` onward, often discounted: \`G_t = r_{t+1} + γ·r_{t+2} + γ²·r_{t+3} + ...\` where \`γ ∈ [0,1]\` is the discount factor.
- **Value Function V(s)**: Expected return starting from state \`s\` and following policy \`π\`.
- **Action-Value Q(s,a)**: Expected return after taking action \`a\` in state \`s\`, then following \`π\`.

## Exploration vs Exploitation

The fundamental dilemma in RL:
- **Exploit**: Pick the action that currently looks best (greedy).
- **Explore**: Try something new — maybe it's even better.

The classic solution is **ε-greedy**: with probability \`ε\` pick a random action, otherwise pick the best known action. Start with high \`ε\` (explore) and decay it over time (exploit).

> 🚗 **License plate recognition** uses Supervised Learning, but **adaptive cruise control** that learns optimal acceleration patterns uses RL — it must balance smooth driving (exploit) with testing slightly different behaviors (explore) to improve.
      `,
      theory: "",
      conceptEn: `Reinforcement Learning trains agents to make sequential decisions by interacting with an environment and learning from rewards. The five core components (Agent, Environment, State, Action, Reward) form a feedback loop that drives learning.`,
      pitfallsEn: `**Sparse rewards** make learning slow — if reward only comes at the very end (e.g., winning chess), the agent struggles to credit the right actions. **Reward hacking** is when agents find unintended shortcuts (e.g., a boat-racing AI that endlessly collects bonus points instead of finishing the race). Always design reward functions carefully and test for unexpected behavior.`,
      practiceTaskEn: `Implement a simple agent in the FrozenLake environment that takes random actions for one episode. Print each (state, action, reward) tuple to visualize the RL loop in action.`,
      code: `# Foundations of RL: The Agent-Environment Loop
# Using gymnasium (the modern successor to OpenAI Gym)
import gymnasium as gym

# Create the FrozenLake environment (4x4 grid, agent must reach goal without falling)
env = gym.make("FrozenLake-v1", is_slippery=False, render_mode="ansi")

# Reset returns initial state and info
state, info = env.reset(seed=42)
print(f"Initial state: {state}")
print(env.render())

total_reward = 0
done = False
step = 0

# Run one episode with random actions
while not done:
    # Sample a random action from the action space (0=Left, 1=Down, 2=Right, 3=Up)
    action = env.action_space.sample()
    
    # Step the environment forward
    next_state, reward, terminated, truncated, info = env.step(action)
    done = terminated or truncated
    
    print(f"Step {step}: state={state}, action={action}, reward={reward}, next_state={next_state}")
    
    state = next_state
    total_reward += reward
    step += 1

print(f"\\nEpisode finished. Total reward: {total_reward}")
env.close()`,
      exercise: "",
      exerciseEn: `Modify the code above to run **100 random episodes** and print the average total reward. You'll see why random policies are terrible — most episodes end with reward 0 because the agent falls into a hole before reaching the goal.`,
      quiz: [
        {
          question: "What is the primary signal that an RL agent uses to learn?",
          options: ["Labeled examples", "Reward", "Cluster assignments", "Pre-trained weights"],
          answer: 1,
          explanation: "RL agents learn from a scalar reward signal received from the environment after each action — no labels are needed.",
        },
        {
          question: "What does the discount factor γ (gamma) control?",
          options: [
            "The learning rate of the policy",
            "How much future rewards are valued vs immediate rewards",
            "The size of the neural network",
            "The exploration probability",
          ],
          answer: 1,
          explanation: "γ ∈ [0,1] determines how much the agent cares about future rewards. γ=0 makes it purely myopic; γ=0.99 makes it far-sighted.",
        },
        {
          question: "Which strategy balances trying new actions with using known good actions?",
          options: ["Greedy", "Random", "ε-greedy", "Brute force"],
          answer: 2,
          explanation: "ε-greedy picks a random action with probability ε (explore) and the best-known action otherwise (exploit), balancing the two.",
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // Lesson 2 — Markov Decision Process (MDP)
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "rl-02-mdp",
      title: "The Markov Decision Process (MDP): Mathematical Framework for RL",
      titleEn: "The Markov Decision Process (MDP): Mathematical Framework for RL",
      level: 4,
      difficulty: "advanced",
      codeLanguage: "python",
      __THEORY_START__
> **Prerequisites**: Lesson 1 (RL Foundations), basic probability theory.

## Why We Need a Mathematical Framework

In Lesson 1, we described RL informally. To **prove** algorithms converge and **derive** optimal policies, we need a rigorous mathematical model: the **Markov Decision Process (MDP)**.

## The Markov Property

A process is **Markov** if the future depends only on the present, not the past:

> **P(s_{t+1} | s_t, a_t, s_{t-1}, a_{t-1}, ...) = P(s_{t+1} | s_t, a_t)**

In plain English: **"Given the current state, the past is irrelevant for predicting the future."** This dramatically simplifies the math.

> 🎯 **Real-world example**: In chess, the current board position contains *all* information needed to decide the next move — you don't need to remember how you got there. The state is Markov.

## Definition: MDP as a 5-Tuple

An MDP is formally defined as **(S, A, P, R, γ)**:

| Symbol | Name | Description |
|--------|------|-------------|
| \`S\` | State space | Set of all possible states |
| \`A\` | Action space | Set of all possible actions |
| \`P\` | Transition probability | \`P(s' \\| s, a)\` — probability of next state \`s'\` |
| \`R\` | Reward function | \`R(s, a, s')\` — reward for transition |
| \`γ\` | Discount factor | \`γ ∈ [0,1]\` — future reward weighting |

## The MDP Loop, Visualized

\`\`\`mermaid
flowchart TB
  S0[State s_t] -->|"Policy π chooses a_t"| A0[Action a_t]
  A0 -->|"P(s' | s,a)"| S1[Next State s_t+1]
  A0 -->|"R(s,a,s')"| R1[Reward r_t+1]
  S1 --> S0
  style S0 fill:#3b82f6,color:#fff
  style A0 fill:#fb923c,color:#fff
  style S1 fill:#3b82f6,color:#fff
  style R1 fill:#10b981,color:#fff
\`\`\`

## The Bellman Equation — The Heart of RL

The **value** of being in state \`s\` under policy \`π\` is the expected discounted return:

> **V^π(s) = Σ_a π(a|s) Σ_{s'} P(s'|s,a) [R(s,a,s') + γ·V^π(s')]**

This recursive equation says: *"The value of a state equals the immediate reward plus the discounted value of where you end up."*

The **optimal value function** \`V*(s)\` satisfies the **Bellman optimality equation**:

> **V*(s) = max_a Σ_{s'} P(s'|s,a) [R(s,a,s') + γ·V*(s')]**

Once we have \`V*\`, the optimal policy is to pick the action that maximizes expected return:

> **π*(s) = argmax_a Σ_{s'} P(s'|s,a) [R(s,a,s') + γ·V*(s')]**

## Solving Small MDPs: Value Iteration

When \`P\` and \`R\` are known, we can solve the MDP exactly using **Value Iteration**:

1. Initialize \`V(s) = 0\` for all states
2. Repeat until convergence:
   - For each state \`s\`, update: \`V(s) ← max_a Σ_{s'} P(s'|s,a) [R + γV(s')]\`
3. Extract policy from final \`V\`

This is **dynamic programming** — and it's the foundation of every RL algorithm.

> ⚠️ **Limitation**: Value iteration requires knowing \`P\` and \`R\`, which is rarely true in real problems. Q-Learning (Lesson 3) lifts this restriction by learning from experience.
      `,
      theory: "",
      conceptEn: `An MDP is a 5-tuple (S, A, P, R, γ) that mathematically formalizes RL. The Markov property — future depends only on the present state — enables recursive value functions via the Bellman equation. Value iteration solves small MDPs exactly when transition dynamics are known.`,
      pitfallsEn: `**Non-Markov environments** break the math. If your "state" lacks crucial information (e.g., velocity in addition to position), the Markov property fails and convergence is not guaranteed. **Curse of dimensionality**: |S| grows exponentially with state variables — value iteration becomes infeasible beyond a few thousand states.`,
      practiceTaskEn: `Implement Value Iteration for a 4x4 GridWorld where each step costs -1 and reaching the goal gives +10. Print the converged value function as a 4x4 grid.`,
      code: `# Value Iteration on FrozenLake (known dynamics)
import numpy as np
import gymnasium as gym

env = gym.make("FrozenLake-v1", is_slippery=False)
n_states = env.observation_space.n
n_actions = env.action_space.n
gamma = 0.99
theta = 1e-8  # Convergence threshold

# Extract transition dynamics P[s][a] = list of (prob, next_state, reward, done)
P = env.unwrapped.P

# Initialize value function
V = np.zeros(n_states)

# Value Iteration loop
iteration = 0
while True:
    delta = 0
    for s in range(n_states):
        v_old = V[s]
        # Compute Q(s,a) for each action
        action_values = np.zeros(n_actions)
        for a in range(n_actions):
            for prob, next_s, reward, done in P[s][a]:
                action_values[a] += prob * (reward + gamma * V[next_s] * (not done))
        # Bellman optimality update
        V[s] = np.max(action_values)
        delta = max(delta, abs(v_old - V[s]))
    iteration += 1
    if delta < theta:
        break

print(f"Converged in {iteration} iterations")
print("Optimal V*(s) reshaped as 4x4 grid:")
print(V.reshape(4, 4).round(3))

# Extract optimal policy from V
policy = np.zeros(n_states, dtype=int)
for s in range(n_states):
    action_values = np.zeros(n_actions)
    for a in range(n_actions):
        for prob, next_s, reward, done in P[s][a]:
            action_values[a] += prob * (reward + gamma * V[next_s] * (not done))
    policy[s] = np.argmax(action_values)

action_symbols = ["←", "↓", "→", "↑"]
print("\\nOptimal policy (4x4):")
for row in policy.reshape(4, 4):
    print(" ".join(action_symbols[a] for a in row))`,
      exercise: "",
      exerciseEn: `Re-run the code with \`is_slippery=True\` (stochastic transitions). Compare the optimal value function with the deterministic case. Why does V* decrease everywhere when slipping is introduced?`,
      quiz: [
        {
          question: "What does the Markov Property state?",
          options: [
            "All states have equal probability",
            "The future depends only on the present, not the past",
            "Rewards are always positive",
            "Actions are deterministic",
          ],
          answer: 1,
          explanation: "Markov Property: P(s_{t+1} | s_t, a_t) = P(s_{t+1} | s_t, a_t, all history). Current state contains all relevant information.",
        },
        {
          question: "What does the Bellman Optimality Equation express?",
          options: [
            "The total reward at episode end",
            "Value of a state = max over actions of (immediate reward + discounted future value)",
            "The probability of each action",
            "The transition matrix between states",
          ],
          answer: 1,
          explanation: "V*(s) = max_a E[R + γV*(s')]. The recursive nature is what makes dynamic programming possible.",
        },
        {
          question: "What is the main limitation of Value Iteration?",
          options: [
            "It only works for two-player games",
            "It requires knowing the transition probabilities P and rewards R in advance",
            "It cannot handle discrete actions",
            "It always finds suboptimal policies",
          ],
          answer: 1,
          explanation: "Value Iteration is model-based — it needs P(s'|s,a) and R(s,a,s'). In real-world problems these are unknown, motivating model-free methods like Q-Learning.",
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // Lesson 3 — Q-Learning & DQN
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "rl-03-qlearning-dqn",
      title: "Q-Learning & Deep Q-Networks (DQN): Teaching AI to Play Games",
      titleEn: "Q-Learning & Deep Q-Networks (DQN): Teaching AI to Play Games",
      level: 5,
      difficulty: "advanced",
      codeLanguage: "python",
      __THEORY_START__
> **Prerequisites**: Lesson 2 (MDP), Python OOP, basic PyTorch.

## From Model-Based to Model-Free

Value Iteration is powerful but needs full knowledge of \`P\` and \`R\`. In reality (e.g., Atari games, robotics), we don't know the dynamics — we just **interact and observe**. This is **model-free RL**.

**Q-Learning** (Watkins, 1989) is the breakthrough algorithm that learns optimal action-values directly from experience.

## The Q-Function

Instead of \`V(s)\`, we learn \`Q(s, a)\`: *"How good is taking action \`a\` in state \`s\`?"*

\`\`\`mermaid
flowchart LR
  S[State s] --> Q[Q-Table or Q-Network]
  Q --> Q1["Q(s, a₁)"]
  Q --> Q2["Q(s, a₂)"]
  Q --> Q3["Q(s, a₃)"]
  Q1 --> P[argmax → Best Action]
  Q2 --> P
  Q3 --> P
  style Q fill:#fb923c,color:#fff
  style P fill:#10b981,color:#fff
\`\`\`

Once we know \`Q*\`, the optimal policy is trivial: \`π*(s) = argmax_a Q*(s, a)\`.

## The Q-Learning Update Rule

After observing transition \`(s, a, r, s')\`, update Q toward the **TD target**:

> **Q(s, a) ← Q(s, a) + α · [r + γ · max_{a'} Q(s', a') − Q(s, a)]**

Where:
- **α** = learning rate (e.g., 0.1)
- **r + γ · max Q(s', a')** = TD target (bootstrapped estimate)
- **r + γ · max Q(s', a') − Q(s, a)** = TD error (how wrong we were)

This is **off-policy** learning: we update based on the *greedy* future action, regardless of what we actually did. This is why Q-Learning works even with random exploration.

## When Q-Tables Fail: Enter DQN

Q-Tables work when |S| × |A| is small (FrozenLake has 16 × 4 = 64 entries). But Atari has ~10⁷⁰ possible screens. We can't tabulate that.

**Solution**: Approximate \`Q(s, a)\` with a **neural network** \`Q(s, a; θ)\`. This is **Deep Q-Network (DQN)** — DeepMind's 2015 breakthrough that mastered 49 Atari games.

## Two Critical DQN Tricks

DQN doesn't just bolt a NN onto Q-Learning — that's unstable. Two innovations make it work:

### 1. Experience Replay
Store transitions \`(s, a, r, s', done)\` in a replay buffer. Sample random minibatches to train on. This **decorrelates samples** and **reuses experience**, drastically improving sample efficiency.

### 2. Target Network
Use a *separate* slow-updating network \`Q_target\` to compute the TD target. The main network \`Q\` chases a *frozen* target, preventing the "chasing your own tail" instability.

> 🎮 **AlphaGo connection**: DQN is the conceptual ancestor of AlphaGo (Go) and AlphaStar (StarCraft II). Both extend DQN with Monte Carlo Tree Search and self-play.

## ε-Greedy with Decay

During training, balance exploration and exploitation:

\`\`\`python
epsilon = max(0.01, 1.0 - episode / 500)  # Decay from 1.0 to 0.01
if random() < epsilon:
    action = random_action()  # Explore
else:
    action = argmax(Q(state))  # Exploit
\`\`\`
      `,
      theory: "",
      conceptEn: `Q-Learning is a model-free RL algorithm that learns Q(s,a) — the expected return of each action — via the temporal-difference update Q ← Q + α[r + γ·max Q' − Q]. Deep Q-Networks (DQN) replace the Q-table with a neural network, using experience replay and target networks to stabilize training. DQN powers landmark achievements like Atari mastery and laid the groundwork for AlphaGo.`,
      pitfallsEn: `**Q-Learning overestimation bias** — the \`max\` operator systematically overestimates Q-values. Use **Double DQN** (decouple action selection and evaluation) to fix this. **Catastrophic forgetting**: NNs can forget old experiences; experience replay mitigates this. **Hyperparameter sensitivity**: learning rate, ε decay, replay buffer size, and target update frequency all matter — tune carefully.`,
      practiceTaskEn: `Train a tabular Q-Learning agent on FrozenLake for 5,000 episodes with ε-greedy exploration. Plot the moving average of episode rewards. You should see the agent learn to reach the goal consistently.`,
      code: `# Tabular Q-Learning on FrozenLake
import numpy as np
import gymnasium as gym

env = gym.make("FrozenLake-v1", is_slippery=False)
n_states = env.observation_space.n
n_actions = env.action_space.n

# Hyperparameters
alpha = 0.1        # Learning rate
gamma = 0.99       # Discount factor
epsilon = 1.0      # Initial exploration
epsilon_min = 0.01
epsilon_decay = 0.995
n_episodes = 2000

# Initialize Q-table
Q = np.zeros((n_states, n_actions))
episode_rewards = []

for episode in range(n_episodes):
    state, _ = env.reset()
    total_reward = 0
    done = False
    
    while not done:
        # ε-greedy action selection
        if np.random.rand() < epsilon:
            action = env.action_space.sample()
        else:
            action = int(np.argmax(Q[state]))
        
        # Step the environment
        next_state, reward, terminated, truncated, _ = env.step(action)
        done = terminated or truncated
        
        # Q-Learning update: Q(s,a) ← Q(s,a) + α[r + γ·max Q(s',·) − Q(s,a)]
        td_target = reward + gamma * np.max(Q[next_state]) * (not done)
        td_error = td_target - Q[state, action]
        Q[state, action] += alpha * td_error
        
        state = next_state
        total_reward += reward
    
    episode_rewards.append(total_reward)
    epsilon = max(epsilon_min, epsilon * epsilon_decay)
    
    if (episode + 1) % 200 == 0:
        avg = np.mean(episode_rewards[-200:])
        print(f"Episode {episode+1} | Avg reward (last 200): {avg:.3f} | ε = {epsilon:.3f}")

print("\\nLearned Q-table (rounded):")
print(Q.round(2))
print("\\nDerived policy (4x4):")
policy = np.argmax(Q, axis=1).reshape(4, 4)
arrows = ["←", "↓", "→", "↑"]
for row in policy:
    print(" ".join(arrows[a] for a in row))

env.close()`,
      exercise: "",
      exerciseEn: `Extend the agent to **CartPole-v1** by replacing the Q-table with a small PyTorch network (2 hidden layers of 64 units). Implement experience replay (buffer size 10,000, batch size 64) and a target network updated every 100 steps. Train for 500 episodes — you should reach the 500-step solve threshold.`,
      quiz: [
        {
          question: "What is the key difference between Value Iteration and Q-Learning?",
          options: [
            "Q-Learning uses neural networks; Value Iteration does not",
            "Q-Learning is model-free (learns from experience); Value Iteration requires known dynamics",
            "Q-Learning only works for continuous actions",
            "Value Iteration is for games; Q-Learning is for robots",
          ],
          answer: 1,
          explanation: "Q-Learning learns Q(s,a) directly from sampled transitions (s,a,r,s'), without needing P(s'|s,a) or R(s,a,s') in advance.",
        },
        {
          question: "Why does DQN use a separate target network?",
          options: [
            "To make training run on multiple GPUs",
            "To prevent the 'moving target' instability when bootstrapping with the same network",
            "To handle continuous action spaces",
            "To reduce memory usage",
          ],
          answer: 1,
          explanation: "Without a target network, the network chases a target derived from itself, causing oscillation. The slow-updating target network stabilizes training.",
        },
        {
          question: "What problem does Experience Replay solve?",
          options: [
            "It speeds up the forward pass",
            "It decorrelates sequential samples and reuses past experience",
            "It eliminates the need for exploration",
            "It allows training without rewards",
          ],
          answer: 1,
          explanation: "Sequential RL samples are highly correlated. Random sampling from a replay buffer breaks correlation and improves sample efficiency.",
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // Lesson 4 — Policy Gradients
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "rl-04-policy-gradients",
      title: "Policy Gradients: Learning Policies Directly",
      titleEn: "Policy Gradients: Learning Policies Directly",
      level: 5,
      difficulty: "advanced",
      codeLanguage: "python",
      __THEORY_START__
> **Prerequisites**: Lesson 3 (Q-Learning/DQN), PyTorch autograd, basic calculus (gradients).

## Why Not Just Use Q-Learning?

DQN works great for **discrete** action spaces (4 directions, 18 Atari buttons). But what about:
- **Continuous control** — robot joint angles, steering wheel positions
- **Stochastic policies** — rock-paper-scissors needs randomness
- **High-dimensional actions** — humanoid robots have ~30 motors

For these, we need **Policy Gradient (PG) methods**: directly parameterize and optimize the policy \`π(a|s; θ)\`.

## The Policy Gradient Theorem

We want to maximize the expected return:

> **J(θ) = E_π[ Σ_t γ^t · r_t ]**

The gradient w.r.t. policy parameters θ is (Sutton et al., 2000):

> **∇J(θ) = E_π[ Σ_t ∇log π(a_t | s_t; θ) · G_t ]**

In plain English: *"Increase the log-probability of actions that led to high returns; decrease it for actions that led to low returns."*

## REINFORCE — The Simplest PG Algorithm

\`\`\`mermaid
flowchart TB
  A[Sample episode with π_θ] --> B[Compute returns G_t for each step]
  B --> C[Compute loss: -Σ log π(a_t|s_t) · G_t]
  C --> D[Backprop & update θ]
  D --> A
  style A fill:#3b82f6,color:#fff
  style B fill:#10b981,color:#fff
  style C fill:#fb923c,color:#fff
  style D fill:#a855f7,color:#fff
\`\`\`

**Algorithm**:
1. Roll out an episode using current policy \`π_θ\`
2. For each step \`t\`, compute return \`G_t = Σ_{k≥t} γ^{k-t} · r_k\`
3. Compute loss \`L = −Σ_t log π(a_t|s_t; θ) · G_t\`
4. Take a gradient step on θ
5. Repeat

## Variance Reduction: Baselines

REINFORCE has **high variance** — returns depend on whole episodes, so gradients are noisy. The fix: subtract a **baseline** \`b(s)\` from \`G_t\`:

> **∇J(θ) = E[ Σ_t ∇log π(a_t|s_t) · (G_t − b(s_t)) ]**

A good baseline is the **value function** \`V(s)\`. The difference \`G_t − V(s_t)\` is called the **advantage** \`A(s,a)\`: *"How much better was this action than average?"*

## Actor-Critic: The Modern Standard

**Actor-Critic** combines policy gradient (Actor) with value learning (Critic):

- **Actor** \`π(a|s; θ)\`: chooses actions
- **Critic** \`V(s; φ)\`: estimates state value, provides baseline

This is the foundation of state-of-the-art algorithms:
- **A2C / A3C** (Advantage Actor-Critic): synchronous / asynchronous variants
- **PPO** (Proximal Policy Optimization): clipped objective, used by ChatGPT's RLHF
- **SAC** (Soft Actor-Critic): max-entropy RL for continuous control
- **TD3** (Twin Delayed DDPG): robust continuous control

> 🤖 **Real-world**: PPO trained OpenAI Five (Dota 2 world champions). SAC controls robot manipulators. PPO with human feedback (RLHF) is what aligns ChatGPT/Claude to follow instructions.
      `,
      theory: "",
      conceptEn: `Policy Gradient methods directly optimize the policy π(a|s;θ) by gradient ascent on expected return. The Policy Gradient Theorem gives ∇J(θ) = E[∇log π(a|s) · G_t]. Subtracting a baseline (typically V(s)) yields the advantage A(s,a) and reduces variance. Actor-Critic combines a policy network (actor) with a value network (critic), forming the basis of PPO, SAC, and the RLHF used to align large language models like ChatGPT.`,
      pitfallsEn: `**High variance**: vanilla REINFORCE is extremely noisy — always use baselines. **Sample inefficiency**: PG methods are on-policy, so old data must be discarded after each update (PPO's clipping mitigates this). **Local optima**: poor initialization can trap the policy in a bad mode — use entropy regularization to encourage exploration.`,
      practiceTaskEn: `Implement REINFORCE on CartPole-v1: a 2-layer MLP outputs softmax over 2 actions. Use discount γ=0.99 and a learning rate of 1e-3. Train for 1000 episodes and plot the moving average reward — you should reach 500 (max) within a few hundred episodes.`,
      code: `# REINFORCE on CartPole-v1
import torch
import torch.nn as nn
import torch.optim as optim
from torch.distributions import Categorical
import gymnasium as gym
import numpy as np

# Policy network: state → action probabilities
class PolicyNet(nn.Module):
    def __init__(self, state_dim, action_dim, hidden=128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(state_dim, hidden),
            nn.ReLU(),
            nn.Linear(hidden, action_dim),
        )

    def forward(self, x):
        return self.net(x)  # logits; softmax inside Categorical

env = gym.make("CartPole-v1")
state_dim = env.observation_space.shape[0]  # 4
action_dim = env.action_space.n             # 2

policy = PolicyNet(state_dim, action_dim)
optimizer = optim.Adam(policy.parameters(), lr=1e-3)
gamma = 0.99
n_episodes = 500

reward_history = []

for episode in range(n_episodes):
    state, _ = env.reset()
    log_probs, rewards = [], []
    done = False

    # Roll out one episode
    while not done:
        state_t = torch.from_numpy(state).float().unsqueeze(0)
        logits = policy(state_t)
        dist = Categorical(logits=logits)
        action = dist.sample()
        log_probs.append(dist.log_prob(action))

        state, reward, terminated, truncated, _ = env.step(action.item())
        rewards.append(reward)
        done = terminated or truncated

    # Compute discounted returns G_t (reversed cumulative sum)
    returns = []
    G = 0
    for r in reversed(rewards):
        G = r + gamma * G
        returns.insert(0, G)
    returns = torch.tensor(returns, dtype=torch.float32)
    # Normalize for variance reduction (baseline trick)
    returns = (returns - returns.mean()) / (returns.std() + 1e-8)

    # Policy gradient loss: -Σ log π(a|s) · G
    loss = -torch.stack([lp * G for lp, G in zip(log_probs, returns)]).sum()

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    total_reward = sum(rewards)
    reward_history.append(total_reward)

    if (episode + 1) % 50 == 0:
        avg = np.mean(reward_history[-50:])
        print(f"Episode {episode+1} | Avg reward (last 50): {avg:.1f}")

env.close()`,
      exercise: "",
      exerciseEn: `Add a **value baseline** to the REINFORCE agent: a second small network V(s; φ) trained with MSE against the actual returns. Use \`A(s,a) = G_t − V(s)\` instead of normalized returns in the policy loss. You should see faster, more stable learning — congratulations, you've just built an Advantage Actor-Critic (A2C)!`,
      quiz: [
        {
          question: "Why are Policy Gradient methods preferred over Q-Learning for continuous action spaces?",
          options: [
            "They are always more sample-efficient",
            "Q-Learning's argmax over actions is intractable in continuous spaces; PG outputs actions directly",
            "Policy Gradients don't need rewards",
            "They only work on small problems",
          ],
          answer: 1,
          explanation: "Computing argmax_a Q(s,a) over a continuous action space is hard. PG methods parameterize the policy as a distribution and sample directly.",
        },
        {
          question: "What does the advantage function A(s,a) represent?",
          options: [
            "The total reward of an episode",
            "How much better action a is compared to the average action in state s",
            "The probability of taking action a",
            "The discount factor",
          ],
          answer: 1,
          explanation: "A(s,a) = Q(s,a) − V(s). It quantifies the relative quality of action a vs the policy's average behavior in s, reducing gradient variance.",
        },
        {
          question: "Which algorithm is used by RLHF (the technique that aligned ChatGPT)?",
          options: ["DQN", "Q-Learning", "PPO (Proximal Policy Optimization)", "Value Iteration"],
          answer: 2,
          explanation: "PPO is the workhorse of RLHF — it stably fine-tunes large language models against a learned reward model derived from human preferences.",
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // Lesson 5 — Real-world Applications
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "rl-05-applications",
      title: "Real-World RL: Robotics, Self-Driving Cars, and Game AI",
      titleEn: "Real-World RL: Robotics, Self-Driving Cars, and Game AI",
      level: 5,
      difficulty: "advanced",
      codeLanguage: "python",
      __THEORY_START__
> **Prerequisites**: Lessons 1–4. This lesson surveys industrial RL deployments and the engineering challenges that come with them.

## RL in the Wild — A 2025 Snapshot

RL has graduated from academic toy problems to powering some of the most impressive AI systems in production. Let's tour four domains where RL delivers measurable value.

## 1. Game AI — From Atari to AlphaGo to GPT-RLHF

\`\`\`mermaid
flowchart LR
  A[2013: DQN<br/>Atari games] --> B[2016: AlphaGo<br/>defeats Lee Sedol]
  B --> C[2019: AlphaStar<br/>StarCraft II Grandmaster]
  C --> D[2022: ChatGPT<br/>RLHF aligns LLMs]
  D --> E[2024-25: AlphaProof<br/>IMO silver medal]
  style A fill:#3b82f6,color:#fff
  style B fill:#10b981,color:#fff
  style C fill:#fb923c,color:#fff
  style D fill:#a855f7,color:#fff
  style E fill:#ec4899,color:#fff
\`\`\`

- **AlphaGo / AlphaZero**: Deep RL + Monte Carlo Tree Search + self-play. Mastered Go, Chess, and Shogi from scratch.
- **OpenAI Five**: PPO + LSTM at massive scale (~180 years of game time per day). Defeated Dota 2 world champions.
- **AlphaStar**: Multi-agent RL on StarCraft II with population-based training.
- **RLHF (ChatGPT/Claude)**: PPO fine-tunes LLMs on a learned reward model derived from human preference rankings — *the* breakthrough that made aligned chatbots possible.

## 2. Robotics — From Simulation to Reality

Modern robot learning uses **massive parallel simulation** (Isaac Gym, MuJoCo) followed by **sim-to-real transfer**:

- **Boston Dynamics Spot**: classical control + RL for terrain adaptation
- **Tesla Optimus / Figure 01**: end-to-end RL for grasping and manipulation
- **OpenAI Rubik's Cube hand**: PPO + domain randomization solved a Rubik's cube one-handed (2019)
- **DeepMind RGB-Stacking**: zero-shot sim-to-real via massive randomization

> 🛠️ **Engineering challenge**: The **reality gap** — policies trained in simulation often fail in the real world due to physics differences, sensor noise, and unmodeled dynamics. Solutions include domain randomization, system identification, and meta-learning.

## 3. Self-Driving Cars — RL as One Tool Among Many

Despite Hollywood hype, no commercial self-driving stack uses pure end-to-end RL — it's not safe enough yet. But RL plays specific roles:

- **Trajectory planning**: choosing safe, smooth paths through traffic
- **Adaptive cruise control**: learning optimal acceleration profiles for fuel efficiency
- **Lane-change decision-making**: when to merge in dense traffic
- **Wayve & Tesla**: neural planners trained with imitation + RL refinement

The rest of the stack (perception, prediction, low-level control) uses supervised learning, classical optimization, and rule-based systems.

## 4. Industrial Optimization — Where RL Quietly Wins

RL shines in well-defined optimization problems with cheap simulators:

- **Google DeepMind cooling Google data centers**: 40% energy reduction (2016, ongoing)
- **Chip design**: Google's AlphaChip places transistors faster than human engineers
- **Network routing**: real-time traffic engineering at internet scale
- **Recommender systems**: YouTube, TikTok use RL bandits to balance exploration/exploitation
- **Algorithmic trading**: quant funds use RL for execution and market making

## License Plate Recognition vs Adaptive Driving

A nice contrast — same domain, different ML:

| Task | Best Approach | Why |
|------|---------------|-----|
| **License plate OCR** | Supervised CNN (e.g., YOLO + CRNN) | Labeled training data is abundant; no decision-making over time |
| **Adaptive cruise control** | RL (e.g., SAC) | Sequential decisions; reward = fuel efficiency + safety + comfort |

> 💡 **Heuristic**: Use Supervised Learning when you have (input, label) pairs. Use RL when you have **(state, action) → reward** and decisions affect future states.

## The Frontier — 2025 and Beyond

- **Foundation models for RL**: pre-train on vast offline data, fine-tune online
- **Multi-agent RL**: cooperative AI teams, market simulations
- **Hierarchical RL**: long-horizon planning via temporal abstractions
- **Offline RL**: learning from logged data without online interaction (medicine, finance)
- **World models**: learn environment dynamics, plan in imagination (Dreamer V3)

> 🚀 **Your next step**: Pick a real environment from \`gymnasium\` (LunarLander, BipedalWalker, Atari) and train PPO on it. Tools like **Stable-Baselines3** and **CleanRL** give you battle-tested implementations to learn from.
      `,
      theory: "",
      conceptEn: `Real-world RL has moved beyond toy problems: AlphaGo/AlphaZero conquered board games, PPO+RLHF aligned ChatGPT, OpenAI's Rubik's cube hand demonstrated sim-to-real robotics, and DeepMind's RL slashed Google data center cooling costs by 40%. The choice between Supervised Learning and RL hinges on whether your problem is one-shot prediction (use SL) or sequential decision-making with delayed rewards (use RL).`,
      pitfallsEn: `**Sim-to-real gap**: policies trained in simulation often fail on physical robots — use domain randomization. **Safety**: pure RL exploration can be catastrophic in real systems (a self-driving car can't randomly try driving off-road). Use **safe RL**, **constrained MDPs**, and human oversight. **Reward specification**: defining a good reward is harder than the algorithm itself — see "reward hacking" and Specification Gaming Examples.`,
      practiceTaskEn: `Use Stable-Baselines3 to train PPO on LunarLander-v2 for 200,000 timesteps. Render the trained policy and watch your agent learn to land safely. Try modifying the reward function (e.g., penalize fuel use more) and see how behavior changes.`,
      code: `# Production-grade RL with Stable-Baselines3
# pip install stable-baselines3[extra] gymnasium

import gymnasium as gym
from stable_baselines3 import PPO
from stable_baselines3.common.evaluation import evaluate_policy

# Create environment (LunarLander: classic continuous-control benchmark)
env = gym.make("LunarLander-v2")

# Instantiate PPO agent with MLP policy
model = PPO(
    policy="MlpPolicy",
    env=env,
    learning_rate=3e-4,
    n_steps=2048,
    batch_size=64,
    n_epochs=10,
    gamma=0.99,
    gae_lambda=0.95,
    clip_range=0.2,
    verbose=1,
)

# Train for 200k timesteps (~5-10 min on a modern laptop)
model.learn(total_timesteps=200_000)

# Save the trained policy
model.save("ppo_lunarlander")

# Evaluate over 10 episodes
mean_reward, std_reward = evaluate_policy(
    model, env, n_eval_episodes=10, deterministic=True
)
print(f"Mean reward: {mean_reward:.1f} +/- {std_reward:.1f}")
print("Solved threshold: 200. Above 200 = successful landing policy.")

# Render a trained episode
render_env = gym.make("LunarLander-v2", render_mode="human")
obs, _ = render_env.reset()
done = False
while not done:
    action, _ = model.predict(obs, deterministic=True)
    obs, reward, terminated, truncated, _ = render_env.step(action)
    done = terminated or truncated
render_env.close()`,
      exercise: "",
      exerciseEn: `Train PPO on **BipedalWalker-v3** (continuous control of a 2D walker). This is harder — you may need 1M+ timesteps. Compare convergence speed with **SAC** (also in Stable-Baselines3). Which performs better and why? Hint: SAC's max-entropy objective often wins on continuous control.`,
      quiz: [
        {
          question: "Which RL technique was the key innovation that aligned ChatGPT to follow instructions?",
          options: [
            "Tabular Q-Learning",
            "Value Iteration",
            "RLHF (Reinforcement Learning from Human Feedback) using PPO",
            "Monte Carlo Tree Search",
          ],
          answer: 2,
          explanation: "RLHF trains a reward model from human preference rankings, then uses PPO to fine-tune the LLM. This is the breakthrough behind ChatGPT, Claude, and similar aligned chatbots.",
        },
        {
          question: "What is the 'sim-to-real' gap in robotics RL?",
          options: [
            "The cost difference between simulation and real hardware",
            "The performance drop when a policy trained in simulation is deployed on a real robot",
            "The latency between simulator and physical robot",
            "The size difference between simulated and real action spaces",
          ],
          answer: 1,
          explanation: "Simulators imperfectly model physics, sensor noise, and friction. Policies that work in sim often fail on real robots — domain randomization helps bridge this gap.",
        },
        {
          question: "Which problem is BEST suited for RL rather than Supervised Learning?",
          options: [
            "Classifying photos of cats vs dogs",
            "Translating English to French given parallel sentences",
            "Choosing trading actions to maximize portfolio return over time",
            "Reading handwritten digits from MNIST",
          ],
          answer: 2,
          explanation: "RL excels at sequential decision-making with delayed rewards. The other tasks have (input, label) pairs and are classic SL problems.",
        },
      ],
    },
  ],
};

export const rlModules: ExtendedProgrammingModule[] = [rlModule];
