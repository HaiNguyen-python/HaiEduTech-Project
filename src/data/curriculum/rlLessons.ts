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
      theoryEn: `
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

## Key Concept

Reinforcement Learning trains agents to make sequential decisions by interacting with an environment and learning from rewards. The five core components (Agent, Environment, State, Action, Reward) form a feedback loop that drives learning.

## Common Pitfalls

**Sparse rewards** make learning slow — if reward only comes at the very end (e.g., winning chess), the agent struggles to credit the right actions. **Reward hacking** is when agents find unintended shortcuts (e.g., a boat-racing AI that endlessly collects bonus points instead of finishing the race). Always design reward functions carefully and test for unexpected behavior.

## Practice Task

Implement a simple agent in the FrozenLake environment that takes random actions for one episode. Print each (state, action, reward) tuple to visualize the RL loop in action.
      
      `,
      theory: "",
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
      theoryEn: `
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

## Key Concept

An MDP is a 5-tuple (S, A, P, R, γ) that mathematically formalizes RL. The Markov property — future depends only on the present state — enables recursive value functions via the Bellman equation. Value iteration solves small MDPs exactly when transition dynamics are known.

## Common Pitfalls

**Non-Markov environments** break the math. If your "state" lacks crucial information (e.g., velocity in addition to position), the Markov property fails and convergence is not guaranteed. **Curse of dimensionality**: |S| grows exponentially with state variables — value iteration becomes infeasible beyond a few thousand states.

## Practice Task

Implement Value Iteration for a 4x4 GridWorld where each step costs -1 and reaching the goal gives +10. Print the converged value function as a 4x4 grid.
      
      `,
      theory: "",
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
      theoryEn: `
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

## Key Concept

Q-Learning is a model-free RL algorithm that learns Q(s,a) — the expected return of each action — via the temporal-difference update Q ← Q + α[r + γ·max Q' − Q]. Deep Q-Networks (DQN) replace the Q-table with a neural network, using experience replay and target networks to stabilize training. DQN powers landmark achievements like Atari mastery and laid the groundwork for AlphaGo.

## Common Pitfalls

**Q-Learning overestimation bias** — the \`max\` operator systematically overestimates Q-values. Use **Double DQN** (decouple action selection and evaluation) to fix this. **Catastrophic forgetting**: NNs can forget old experiences; experience replay mitigates this. **Hyperparameter sensitivity**: learning rate, ε decay, replay buffer size, and target update frequency all matter — tune carefully.

## Practice Task

Train a tabular Q-Learning agent on FrozenLake for 5,000 episodes with ε-greedy exploration. Plot the moving average of episode rewards. You should see the agent learn to reach the goal consistently.
      
      `,
      theory: "",
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
      theoryEn: `
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

## Key Concept

Policy Gradient methods directly optimize the policy π(a|s;θ) by gradient ascent on expected return. The Policy Gradient Theorem gives ∇J(θ) = E[∇log π(a|s) · G_t]. Subtracting a baseline (typically V(s)) yields the advantage A(s,a) and reduces variance. Actor-Critic combines a policy network (actor) with a value network (critic), forming the basis of PPO, SAC, and the RLHF used to align large language models like ChatGPT.

## Common Pitfalls

**High variance**: vanilla REINFORCE is extremely noisy — always use baselines. **Sample inefficiency**: PG methods are on-policy, so old data must be discarded after each update (PPO's clipping mitigates this). **Local optima**: poor initialization can trap the policy in a bad mode — use entropy regularization to encourage exploration.

## Practice Task

Implement REINFORCE on CartPole-v1: a 2-layer MLP outputs softmax over 2 actions. Use discount γ=0.99 and a learning rate of 1e-3. Train for 1000 episodes and plot the moving average reward — you should reach 500 (max) within a few hundred episodes.
      
      `,
      theory: "",
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
      theoryEn: `
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

## Key Concept

Real-world RL has moved beyond toy problems: AlphaGo/AlphaZero conquered board games, PPO+RLHF aligned ChatGPT, OpenAI's Rubik's cube hand demonstrated sim-to-real robotics, and DeepMind's RL slashed Google data center cooling costs by 40%. The choice between Supervised Learning and RL hinges on whether your problem is one-shot prediction (use SL) or sequential decision-making with delayed rewards (use RL).

## Common Pitfalls

**Sim-to-real gap**: policies trained in simulation often fail on physical robots — use domain randomization. **Safety**: pure RL exploration can be catastrophic in real systems (a self-driving car can't randomly try driving off-road). Use **safe RL**, **constrained MDPs**, and human oversight. **Reward specification**: defining a good reward is harder than the algorithm itself — see "reward hacking" and Specification Gaming Examples.

## Practice Task

Use Stable-Baselines3 to train PPO on LunarLander-v2 for 200,000 timesteps. Render the trained policy and watch your agent learn to land safely. Try modifying the reward function (e.g., penalize fuel use more) and see how behavior changes.
      
      `,
      theory: "",
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
    // ────────────────────────────────────────────────────────────────────────
    // Lesson 6 — SARSA: On-Policy TD Control
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "rl-06-sarsa",
      title: "SARSA: On-Policy TD Control",
      titleEn: "SARSA: On-Policy TD Control",
      level: 4,
      difficulty: "advanced",
      codeLanguage: "python",
      theoryEn: `
> **Prerequisites**: Lesson 3 (Q-Learning).

## On-policy vs Off-policy — the key distinction

**Q-Learning** is **off-policy** — its update target uses \`max Q(s', a')\` regardless of the action actually taken. **SARSA** (Rummery & Niranjan, 1994) is **on-policy** — it uses the action \`A'\` actually selected by the current ε-greedy policy.

The name itself is the update tuple: **(S, A, R, S\', A\')**

\`\`\`text
Q(S,A) ← Q(S,A) + α · [R + γ · Q(S\', A\') − Q(S,A)]
\`\`\`

## The cliff-walking experiment

In a gridworld with a cliff (reward −100 if you fall off):
- **Q-Learning** learns the *optimal* (cliff-edge) path — but with ε-exploration it falls off frequently → low average reward during training.
- **SARSA** learns a *safer* (longer) path because its updates account for exploration mistakes.

\`\`\`mermaid
flowchart LR
  S[Start] --> P1[ ] --> P2[ ] --> P3[ ] --> G[Goal]
  S -.optimal but risky.-> CLIFF[CLIFF: -100]
  style CLIFF fill:#dc2626,color:#fff
\`\`\`

> 🎯 **Real-world insight**: When the deployed policy will keep exploring (medical dosing, noisy robotics), on-policy SARSA can be safer.

## Expected SARSA — smoother variant

\`\`\`text
Q(S,A) ← Q(S,A) + α · [R + γ · Σ_a π(a|S\')·Q(S\',a) − Q(S,A)]
\`\`\`

Replace the sampled \`Q(S\',A\')\` with its expectation under the policy. Lower variance, basis of modern actor-critic methods.

## Key Concept

SARSA is the on-policy cousin of Q-Learning. Its update target uses the *next action actually selected* by the current ε-greedy policy, so SARSA learns the value of exploration-aware behavior — making it safer for real-world deployment in robotics and safety-critical domains.

## Common Pitfalls

**Slow convergence** vs Q-Learning when the deployment policy is greedy. **ε decay matters more** — if ε stays high, SARSA converges to a very conservative policy. Tune ε schedule carefully.

## Practice Task

Implement SARSA on **CliffWalking-v0**. Compare its trajectory and average reward against Q-Learning over 500 episodes. SARSA should take the safe upper path while Q-Learning hugs the cliff edge.
      `,
      theory: "",
      code: `# SARSA on CliffWalking-v0
import numpy as np
import gymnasium as gym

env = gym.make("CliffWalking-v0")
n_states = env.observation_space.n
n_actions = env.action_space.n

alpha, gamma = 0.1, 1.0
epsilon, eps_min, eps_decay = 1.0, 0.05, 0.995

Q = np.zeros((n_states, n_actions))

def epsilon_greedy(state, eps):
    if np.random.rand() < eps:
        return env.action_space.sample()
    return int(np.argmax(Q[state]))

for episode in range(500):
    state, _ = env.reset()
    action = epsilon_greedy(state, epsilon)
    total_reward = 0
    done = False

    while not done:
        next_state, reward, terminated, truncated, _ = env.step(action)
        done = terminated or truncated
        # Pick A' using the SAME policy (on-policy)
        next_action = epsilon_greedy(next_state, epsilon)
        # SARSA update: uses Q(S', A') — NOT max Q(S', .)
        td_target = reward + gamma * Q[next_state, next_action] * (not done)
        Q[state, action] += alpha * (td_target - Q[state, action])
        state, action = next_state, next_action
        total_reward += reward

    epsilon = max(eps_min, epsilon * eps_decay)
    if (episode + 1) % 50 == 0:
        print(f"Episode {episode+1} | reward={total_reward} | eps={epsilon:.3f}")

arrows = ["↑", "→", "↓", "←"]
print("\\nLearned greedy policy (SARSA):")
for row in np.argmax(Q, axis=1).reshape(4, 12):
    print(" ".join(arrows[a] for a in row))`,
      exercise: "",
      exerciseEn: "Re-run with **Q-Learning** (use `max(Q[next_state])`). Compare: does Q-Learning hug the cliff? Which has higher average reward DURING training?",
      quiz: [
        {
          question: "What makes SARSA an on-policy algorithm?",
          options: ["It always picks the greedy action", "Its update uses the next action selected by the same policy being followed", "It does not use exploration", "It works only on continuous spaces"],
          answer: 1,
          explanation: "SARSA updates Q(S,A) toward R + γ·Q(S\',A\') where A\' is sampled by the current ε-greedy policy.",
        },
        {
          question: "On CliffWalking, why does SARSA learn a safer (longer) path?",
          options: ["It cannot represent the optimal path", "Its updates account for the cost of accidentally falling during exploration", "Smaller learning rate", "Cliffs are unreachable"],
          answer: 1,
          explanation: "Because SARSA evaluates the policy it actually follows (including ε-greedy slips), it correctly devalues states near the cliff.",
        },
        {
          question: "Advantage of Expected SARSA?",
          options: ["Skips exploration", "Replaces sampled Q(S\',A\') with an expectation, reducing variance", "Eliminates the Q-table", "Only for continuous actions"],
          answer: 1,
          explanation: "Expected SARSA averages over all next actions weighted by policy probability — lower variance, still on-policy.",
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // Lesson 7 — PPO Deep Dive
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "rl-07-ppo-deep-dive",
      title: "PPO Deep Dive: The Industry Workhorse",
      titleEn: "PPO Deep Dive: The Industry Workhorse",
      level: 5,
      difficulty: "advanced",
      codeLanguage: "python",
      theoryEn: `
> **Prerequisites**: Lesson 4 (Policy Gradients).

## Why PPO took over

REINFORCE is brittle — one bad step collapses the policy. **TRPO** (2015) fixed this with a complex KL-divergence trust region. **PPO** (Schulman et al., 2017) keeps TRPO's safety using a tiny clipping trick that fits in 10 lines of code — the default RL algorithm at OpenAI, DeepMind, and Anthropic ever since.

It powers: 🤖 OpenAI Five (Dota 2), 🧠 ChatGPT's RLHF, 🦾 robot locomotion, 🎮 most production game AIs.

## The PPO clipped objective

\`\`\`text
L^CLIP(θ) = E_t[ min( r_t(θ) · A_t, clip(r_t(θ), 1−ε, 1+ε) · A_t ) ]
\`\`\`

Where **r_t(θ) = π_θ(a_t|s_t) / π_θ_old(a_t|s_t)** is the probability ratio and **A_t** the advantage (typically GAE-Lambda). **ε** = 0.1–0.2.

\`\`\`mermaid
flowchart TB
  A[Old policy π_θ_old] -->|collect rollout| B[Compute advantages with GAE]
  B --> C[For K epochs: optimize clipped objective on minibatches]
  C --> D[θ_old ← θ]
  D --> A
\`\`\`

**Intuition**: if a new action is much more likely AND has positive advantage, the ratio is clipped to \`1+ε\` so the gradient stops pushing — preventing catastrophic policy jumps.

## GAE-Lambda — the perfect partner

\`\`\`text
A_t^GAE(λ) = Σ (γλ)^l · δ_{t+l},   δ_t = r_t + γV(s_{t+1}) − V(s_t)
\`\`\`

\`λ\` interpolates bias (low) ↔ variance (high). **λ=0.95** is the standard sweet spot.

## 7 essential PPO implementation tricks

1. Reward normalization (running std)
2. Observation normalization (running mean/std)
3. Orthogonal weight init (gain √2 hidden, 0.01 actor, 1.0 critic)
4. Adam with linear LR decay
5. Gradient clipping at norm 0.5
6. Entropy bonus (~0.01)
7. Clip range scheduling (typically constant 0.2)

## Key Concept

PPO clips the policy update ratio so no single optimization step moves the policy too far. Combined with GAE for advantages and the 7 engineering tricks, it delivers state-of-the-art performance across Atari, MuJoCo, robotics, and LLM alignment.

## Common Pitfalls

**Hyperparameter sensitivity** — wrong batch size or rollout length silently degrades performance. **Reward scaling** is critical — always normalize. **Off-the-shelf libraries** (Stable-Baselines3, CleanRL) embed all 7 tricks; reinventing PPO from scratch usually produces worse results.

## Practice Task

Train PPO on **LunarLander-v2** with Stable-Baselines3 for 500k timesteps. Compare wall-clock time and final return against your REINFORCE from Lesson 4 — PPO should reach the 200-reward solve threshold ~10× faster.
      `,
      theory: "",
      code: `# Production-grade PPO with Stable-Baselines3
# pip install stable-baselines3[extra] gymnasium
import gymnasium as gym
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv, VecNormalize
from stable_baselines3.common.evaluation import evaluate_policy

def make_env():
    return gym.make("LunarLander-v2")

env = DummyVecEnv([make_env])
env = VecNormalize(env, norm_obs=True, norm_reward=True, clip_obs=10.0)

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
    ent_coef=0.01,
    vf_coef=0.5,
    max_grad_norm=0.5,
    verbose=1,
)

model.learn(total_timesteps=500_000, progress_bar=True)
model.save("ppo_lunarlander")
env.save("vec_normalize.pkl")

mean_reward, std_reward = evaluate_policy(model, env, n_eval_episodes=20)
print(f"Mean reward: {mean_reward:.1f} ± {std_reward:.1f}")
print("Solved threshold = 200.")`,
      exercise: "",
      exerciseEn: "Train on **BipedalWalker-v3** for 1M+ timesteps. Compare convergence with **SAC** (off-policy max-entropy method) — which wins on this harder continuous task?",
      quiz: [
        {
          question: "Main purpose of clipping in PPO's objective?",
          options: ["Reduce computational cost", "Prevent overly large policy updates that destabilize training", "Eliminate the value function", "Handle continuous spaces"],
          answer: 1,
          explanation: "Clipping the ratio to [1−ε, 1+ε] caps the per-step policy change — replicating TRPO's trust region with a much simpler implementation.",
        },
        {
          question: "What does GAE-Lambda's λ trade off?",
          options: ["Learning rate vs batch size", "Bias (low λ) vs variance (high λ) in advantage estimation", "Discount vs reward", "Exploration vs exploitation"],
          answer: 1,
          explanation: "λ=0 uses only TD error (low variance, high bias); λ=1 is full Monte Carlo. λ=0.95 is the standard middle ground.",
        },
        {
          question: "Which famous AI system is fine-tuned with PPO?",
          options: ["BERT", "ChatGPT (RLHF)", "ResNet-50", "AlphaFold"],
          answer: 1,
          explanation: "ChatGPT and Claude are aligned via RLHF, where PPO fine-tunes the LLM against a learned reward model from human preferences.",
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // Lesson 8 — Multi-Agent RL
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "rl-08-multi-agent",
      title: "Multi-Agent RL: Cooperation, Competition, Emergence",
      titleEn: "Multi-Agent RL: Cooperation, Competition, Emergence",
      level: 5,
      difficulty: "advanced",
      codeLanguage: "python",
      theoryEn: `
> **Prerequisites**: Lessons 3–4.

## When one agent isn't enough

Real systems have multiple decision-makers: financial markets, traffic, robot swarms, multi-LLM systems. **Multi-Agent RL (MARL)** studies how multiple agents learn simultaneously while their actions affect each other.

\`\`\`mermaid
flowchart LR
  A1[Agent 1] -->|action| ENV[Shared Environment]
  A2[Agent 2] -->|action| ENV
  A3[Agent 3] -->|action| ENV
  ENV -->|obs, reward| A1
  ENV -->|obs, reward| A2
  ENV -->|obs, reward| A3
\`\`\`

## Three flavors

| Setting | Reward | Examples |
|---------|--------|----------|
| **Cooperative** | Shared team reward | Drone swarms, warehouse robots |
| **Competitive** | Zero-sum | Chess, poker, StarCraft |
| **Mixed** | Personal + shared | Auctions, traffic, Diplomacy |

## Why naive single-agent algorithms break

You **cannot** just run independent DQN per agent. Three challenges:

1. **Non-stationarity**: from agent A's view, agent B is *itself learning and changing* — the MDP becomes non-Markov.
2. **Credit assignment**: when team reward is high, *which agent* deserves credit?
3. **Partial observability**: each agent sees only local info.

## Centralized Training, Decentralized Execution (CTDE)

The dominant 2025 paradigm:
- **Training**: a centralized critic sees the global state + all actions → stable learning
- **Execution**: each agent acts using only local observation → scalable, no comms needed

Architecture behind **MADDPG**, **QMIX**, **MAPPO**.

## Self-play — the engine of superhuman AI

The most stunning MARL successes use **self-play**: an agent plays against past versions of itself. Opponent always matches current skill → automatic curriculum.

- **AlphaGo Zero / AlphaZero**: pure self-play, mastered Go/Chess/Shogi
- **AlphaStar**: population-based self-play → StarCraft II Grandmaster
- **OpenAI Five**: PPO + self-play → Dota 2 world champions
- **Cicero (2022)**: self-play + dialogue → human-level Diplomacy

## Emergent behavior

OpenAI's **hide-and-seek** agents discovered tool use, ramp surfing, and box surfing. **AlphaZero** invented chess openings dismissed by humans for centuries.

## Key Concept

MARL extends RL to systems with multiple learners whose actions interact. Non-stationarity (every agent's "environment" includes other learning agents) breaks naive single-agent approaches. CTDE combines a global critic at training time with local policies at deployment. Self-play has produced superhuman performance in Go, StarCraft II, Dota 2, and Diplomacy.

## Common Pitfalls

**Reward shaping** is even harder than single-agent — credit assignment is ambiguous. **Population-based training** matters: training against only one opponent risks overfitting to its quirks.

## Practice Task

Use **PettingZoo** to train independent PPO on the cooperative \`pursuit_v4\` environment. Plot average team reward over 200k timesteps.
      `,
      theory: "",
      code: `# Multi-agent cooperative pursuit with PettingZoo + Stable-Baselines3
# pip install pettingzoo[sisl] supersuit stable-baselines3
from pettingzoo.sisl import pursuit_v4
import supersuit as ss
from stable_baselines3 import PPO

env = pursuit_v4.parallel_env(max_cycles=500, n_pursuers=8, n_evaders=30)
env.reset(seed=42)

# Wrap for SB3
env = ss.pad_observations_v0(env)
env = ss.pad_action_space_v0(env)
env = ss.pettingzoo_env_to_vec_env_v1(env)
env = ss.concat_vec_envs_v1(env, num_vec_envs=4, base_class="stable_baselines3")

# Shared-parameter PPO — all predators use the same policy
model = PPO(
    policy="MlpPolicy",
    env=env,
    learning_rate=3e-4,
    n_steps=512,
    batch_size=128,
    n_epochs=4,
    gamma=0.99,
    gae_lambda=0.95,
    clip_range=0.2,
    ent_coef=0.01,
    verbose=1,
)

print("Training cooperative predator team for 200k timesteps...")
model.learn(total_timesteps=200_000)
model.save("ppo_pursuit_team")`,
      exercise: "",
      exerciseEn: "Switch to **competitive** `connect_four_v3`. Implement self-play: train P1 against frozen P2 for 50k steps, then swap. Repeat 5 cycles. Measure win-rate vs random opponent — does it grow monotonically?",
      quiz: [
        {
          question: "Why is naive independent Q-Learning unstable in multi-agent envs?",
          options: ["Q-tables too large", "From each agent's view the env is non-stationary because other agents are also learning", "Discount factor must be negative", "Rewards cannot be shared"],
          answer: 1,
          explanation: "If agent B keeps changing while A learns, A's transition dynamics are non-stationary — breaking the Markov assumption.",
        },
        {
          question: "What does CTDE mean?",
          options: ["All agents share one network at execution", "Centralized critic with global info during training; agents act on local obs at deployment", "All agents communicate every step", "Cloud training, on-device execution"],
          answer: 1,
          explanation: "CTDE gives stable learning (global critic) + scalable execution (local policies) — the paradigm behind MADDPG, QMIX, MAPPO.",
        },
        {
          question: "Which technique enabled AlphaZero to master Go/Chess/Shogi without human games?",
          options: ["Imitation learning", "Self-play", "Reward shaping", "Curriculum learning"],
          answer: 1,
          explanation: "Pure self-play creates an automatic curriculum — opponents always match current skill — enabling AlphaZero to surpass humans in days.",
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // Lesson 9 — Offline RL
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "rl-09-offline-rl",
      title: "Offline RL: Learning from Logged Data",
      titleEn: "Offline RL: Learning from Logged Data",
      level: 5,
      difficulty: "advanced",
      codeLanguage: "python",
      theoryEn: `
> **Prerequisites**: Lesson 3 (Q-Learning).

## The most important RL paradigm for industry

Most real-world RL applications **cannot afford online exploration**:
- 🏥 Healthcare — cannot test random treatments on patients
- 💰 Finance — random trades lose millions
- 🚗 Autonomous driving — random actions cause crashes
- 🏭 Industrial control — random commands destroy equipment

But these domains have **enormous logged datasets**. **Offline RL** (Batch RL) learns optimal policies purely from this fixed dataset, with **zero new interaction**.

\`\`\`mermaid
flowchart LR
  D[(Logged dataset:<br/>states, actions, rewards)] --> ALG[Offline RL Algorithm]
  ALG --> POLICY[Improved Policy π*]
  POLICY -.deploy.-> ENV[Real Environment]
\`\`\`

## Why offline RL is hard: distributional shift

Naive Q-Learning on logged data **catastrophically overestimates** Q-values for actions never taken — there's no online feedback to correct optimism. Deploy → policy picks unseen actions → fails.

## Three families of solutions

### 1. Policy Constraint (BCQ, TD3+BC)
Restrict the learned policy to stay close to the behavior policy.

### 2. Conservative Q-Learning (CQL)
Penalize Q-values for out-of-distribution actions. Explicitly **lower-bounds** the true Q.

### 3. Sequence Modeling (Decision Transformer, 2021)
Treat RL as **autoregressive sequence modeling** — feed (return-to-go, state, action) tuples to a Transformer, predict the next action. No Bellman backups, no distributional shift.

## Offline → Online Fine-Tuning (modern recipe)

1. Pretrain offline on massive logged data (cheap, safe)
2. Fine-tune online with limited rollouts (a few hours of robot time)

## Real-world successes

- **Google DeepMind**: offline RL on cooling logs → 40% data-center energy reduction
- **Healthcare**: sepsis treatment from MIMIC-III ICU logs
- **Robotics**: Google's RT-2 trained on internet + offline robot demos
- **Recommenders**: YouTube, TikTok use offline RL for watch-time

## Key Concept

Offline RL learns optimal policies from a fixed dataset of past interactions, with no new environment access. The core challenge — distributional shift — is addressed by either constraining the policy (BCQ, TD3+BC), being pessimistic about unseen actions (CQL), or treating RL as sequence modeling (Decision Transformer).

## Common Pitfalls

**Insufficient state coverage** in the dataset → policy can't generalize. **Reward signal quality** — if logged rewards are biased (e.g., only logged successful sessions), the policy inherits the bias. **Always evaluate offline** with techniques like FQE before deployment.

## Practice Task

Use **D4RL** + **d3rlpy** to train **CQL** on \`hopper-medium-v2\`. Compare its return against pure behavior cloning — CQL should outperform, demonstrating offline RL improving *beyond* what was demonstrated.
      `,
      theory: "",
      code: `# Offline RL with d3rlpy on the D4RL benchmark
# pip install d3rlpy gymnasium
import d3rlpy
from d3rlpy.algos import CQLConfig

# Load D4RL hopper-medium dataset (1M transitions)
dataset, env = d3rlpy.datasets.get_dataset("hopper-medium-v2")
print(f"Loaded {len(dataset.episodes)} episodes")

# Conservative Q-Learning — penalizes Q for out-of-distribution actions
cql = CQLConfig(
    actor_learning_rate=1e-4,
    critic_learning_rate=3e-4,
    batch_size=256,
    gamma=0.99,
    tau=0.005,
    n_critics=2,
    conservative_weight=5.0,    # the key CQL hyperparameter
).create(device="cuda:0")        # or "cpu:0"

# Train offline — NO interaction with env during training
cql.fit(
    dataset,
    n_steps=500_000,
    n_steps_per_epoch=10_000,
    evaluators={"environment": d3rlpy.metrics.EnvironmentEvaluator(env)},
)

cql.save("cql_hopper_medium.d3")
print("CQL typically reaches ~70-80 normalized score vs ~45 for BC.")`,
      exercise: "",
      exerciseEn: "Train **Behavior Cloning** (`d3rlpy.algos.BCConfig`) on the same dataset. Compare returns vs CQL. Try `hopper-medium-replay-v2` — on which dataset does CQL's improvement over BC become larger and why?",
      quiz: [
        {
          question: "Defining constraint of offline RL?",
          options: ["Must use deep NNs", "Learns purely from a fixed dataset, no new environment interaction", "Only for continuous actions", "Requires a perfect simulator"],
          answer: 1,
          explanation: "Offline RL operates on a frozen dataset of (s,a,r,s') tuples — no additional rollouts allowed.",
        },
        {
          question: "What is 'distributional shift' in offline RL?",
          options: ["Train and test rewards differ", "The learned policy wants actions outside the data distribution, causing extrapolation errors in Q", "Discount factor changes", "Dataset too small"],
          answer: 1,
          explanation: "Naive Q-Learning overestimates Q for unseen actions because there's no online feedback to correct optimism.",
        },
        {
          question: "How does CQL prevent distributional shift?",
          options: ["Smaller learning rate", "Adds a penalty that lowers Q-values for actions not in the dataset", "Restricts to discrete actions", "Increases discount"],
          answer: 1,
          explanation: "CQL adds a regularizer that pushes down Q for out-of-distribution actions, ensuring the learned Q is a lower bound on true Q.",
        },
      ],
    },

    // ────────────────────────────────────────────────────────────────────────
    // Lesson 10 — RLHF & AlphaGo Deep Dive
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "rl-10-rlhf-alphago",
      title: "Landmark Case Studies: AlphaGo & RLHF (ChatGPT)",
      titleEn: "Landmark Case Studies: AlphaGo & RLHF (ChatGPT)",
      level: 5,
      difficulty: "advanced",
      codeLanguage: "python",
      theoryEn: `
> **Prerequisites**: Lessons 3–4, Lesson 7 (PPO).

## Two RL achievements that defined modern AI

**AlphaGo** (board games — discrete, perfect information) and **RLHF** (LLM alignment — continuous, partial-information, human-preference-based) showcase the breadth of modern RL.

## Case Study 1: AlphaGo → AlphaZero → MuZero

### AlphaGo (March 2016) — defeated Lee Sedol 4-1
- **Stage 1**: Supervised learning on ~30M human Go moves
- **Stage 2**: Policy gradient self-play
- **Stage 3**: **Monte Carlo Tree Search (MCTS)** at inference, guided by policy + value network

\`\`\`mermaid
flowchart TB
  ROOT[Current Board] --> SEL[1. Select: traverse tree using UCB]
  SEL --> EXP[2. Expand: add child via policy network]
  EXP --> SIM[3. Evaluate: value network gives V_s]
  SIM --> BACK[4. Backpropagate: update visits and values]
  BACK --> ROOT
\`\`\`

### AlphaGo Zero (Oct 2017) — beat AlphaGo 100-0
- **Zero** human data — pure self-play from random init
- Single network outputs both policy and value
- Surpassed all previous Go AIs in 40 days

### AlphaZero (Dec 2017) — generalized to Chess and Shogi
Same algorithm, three games — superhuman in 24 hours.

### MuZero (Dec 2019) — learned the rules from scratch
Combined model-based RL + MCTS, never told the rules.

## Case Study 2: RLHF — How ChatGPT Was Aligned

Three stages turned a raw LLM into a usable assistant:

### Stage 1: Supervised Fine-Tuning (SFT)
Fine-tune base LLM on human-written demonstrations.

### Stage 2: Reward Model Training
Humans rank model outputs. Train a reward model \`r_φ(prompt, response)\` to predict rankings.

### Stage 3: PPO Optimization
\`\`\`mermaid
flowchart LR
  P[Prompt] --> LLM[LLM Policy π_θ]
  LLM -->|response| RM[Reward Model r_φ]
  RM -->|reward| PPO[PPO Update]
  PPO -->|update θ| LLM
  REF[Frozen Reference Policy π_ref] -.KL penalty.-> PPO
\`\`\`

The objective:

\`\`\`text
r_φ(x, y) − β · KL[π_θ(·|x) ‖ π_ref(·|x)]
\`\`\`

The KL penalty against the frozen pre-RLHF model prevents reward-hacking.

## RLHF beyond ChatGPT

- **Claude**: Constitutional AI — uses AI feedback (RLAIF)
- **Llama 2/3**: standard RLHF with two reward models (helpful + safe)
- **Gemini**: combines RLHF, distillation, and DPO

## DPO (2023) — Direct Preference Optimization
Trains the LLM directly on preference pairs **without** a separate reward model. Simpler, more stable.

## Key Concept

AlphaGo combines policy/value networks with MCTS, then improves via pure self-play — discovering strategies beyond human knowledge. RLHF aligns LLMs by training a reward model from human preferences and fine-tuning with PPO under a KL constraint. Together they powered the two most-discussed AI breakthroughs of the past decade.

## Common Pitfalls

**RLHF reward hacking** — without strong KL penalty, the model exploits reward-model weaknesses (overuse of certain phrases, sycophancy). **AlphaZero compute** — requires massive distributed self-play; can't be replicated on a laptop.

## Practice Task

Read OpenAI's InstructGPT paper (2022) and the AlphaGo Nature paper. Compare: (1) PPO's role in each, (2) reward signal differences, (3) exploration strategies.
      `,
      theory: "",
      code: `# Conceptual RLHF skeleton with TRL
# pip install trl transformers peft accelerate
from trl import PPOConfig, PPOTrainer, AutoModelForCausalLMWithValueHead
from transformers import AutoTokenizer, pipeline
import torch

MODEL = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
tokenizer.pad_token = tokenizer.eos_token
model = AutoModelForCausalLMWithValueHead.from_pretrained(MODEL)
ref_model = AutoModelForCausalLMWithValueHead.from_pretrained(MODEL)

# Reward model — sentiment as stand-in for human-trained reward
reward_pipe = pipeline("sentiment-analysis", model="lvwerra/distilbert-imdb")

def reward_fn(text):
    out = reward_pipe(text, truncation=True, max_length=512)[0]
    return out["score"] if out["label"] == "POSITIVE" else -out["score"]

ppo_config = PPOConfig(
    model_name=MODEL,
    learning_rate=1.4e-5,
    batch_size=16,
    mini_batch_size=4,
    init_kl_coef=0.2,            # KL penalty β
    target_kl=6.0,
    cliprange=0.2,
)

ppo_trainer = PPOTrainer(
    config=ppo_config,
    model=model,
    ref_model=ref_model,
    tokenizer=tokenizer,
)

prompts = ["The movie was", "I really felt that", "Honestly, the experience was"]
for epoch in range(50):
    queries = [tokenizer.encode(p, return_tensors="pt").squeeze() for p in prompts]
    response_tensors = ppo_trainer.generate(queries, max_new_tokens=30, do_sample=True, top_p=0.9)
    responses = [tokenizer.decode(r) for r in response_tensors]
    rewards = [torch.tensor(reward_fn(p + r)) for p, r in zip(prompts, responses)]
    stats = ppo_trainer.step(queries, response_tensors, rewards)
    if epoch % 10 == 0:
        mean_r = sum(r.item() for r in rewards) / len(rewards)
        print(f"Epoch {epoch} | mean reward={mean_r:.3f} | KL={stats['objective/kl']:.3f}")`,
      exercise: "",
      exerciseEn: "Implement simplified **MCTS** for Tic-Tac-Toe in pure Python (no NN). For each move, run 1000 random rollouts and pick the action with the highest win rate. Test vs random opponent — should win >95%.",
      quiz: [
        {
          question: "Key innovation of AlphaGo Zero vs AlphaGo?",
          options: ["Larger NN", "Learned purely from self-play with zero human game data", "Single GPU", "Used SARSA"],
          answer: 1,
          explanation: "AlphaGo Zero discarded human-game pretraining, starting from random weights — yet surpassed AlphaGo in 40 days.",
        },
        {
          question: "Role of KL penalty in RLHF?",
          options: ["Speeds up training", "Prevents the policy from drifting too far from pre-RLHF model and exploiting reward-model weaknesses", "Eliminates value function", "Scales gradients"],
          answer: 1,
          explanation: "Without the KL penalty, PPO over-optimizes the imperfect reward model and produces incoherent reward-hacking text.",
        },
        {
          question: "What does DPO replace in the RLHF pipeline?",
          options: ["The base LLM", "The separate reward model and PPO step (trains directly on preference pairs)", "The SFT stage", "The tokenizer"],
          answer: 1,
          explanation: "DPO derives a closed-form objective from (winning, losing) pairs — no reward model, no PPO loop.",
        },
      ],
    },
    {
      id: "rl-11-exploration",
      title: "Advanced Exploration — Beyond ε-Greedy",
      titleEn: "Advanced Exploration — Beyond ε-Greedy",
      level: 5,
      difficulty: "advanced",
      codeLanguage: "python",
      theoryEn: `
> **Prerequisites**: Lessons 3–4 (Q-Learning, DQN).

## Why ε-greedy is not enough

Random exploration scales **exponentially** badly with state-space size. In Montezuma's Revenge (the famous 1984 Atari game), an ε-greedy DQN agent scores **0** even after 200 M frames — the room with the first key requires a 100-step coordinated sequence whose probability under random exploration is ≈ 10⁻²⁰.

## The exploration zoo

\`\`\`mermaid
flowchart LR
  EG[ε-greedy] --> UCB[UCB / Optimism]
  EG --> TS[Thompson Sampling]
  EG --> NN[Noisy Networks]
  EG --> CB[Curiosity-driven]
  EG --> RND[Random Network Distillation]
\`\`\`

### 1. Upper Confidence Bound (UCB)
Pick action that maximises \`Q(s,a) + c · sqrt(log N / N(s,a))\`. The bonus shrinks as you visit (s,a) more — natural decay, no schedule needed.

### 2. Thompson Sampling
Maintain a **distribution** over Q values (e.g., Bayesian DQN). Sample from it, act greedily. Naturally trades off exploration ↔ exploitation.

### 3. Noisy Networks (Fortunato 2018)
Replace fixed weights \`W\` with \`W + σ ⊙ ε\` where \`ε\` is sampled noise. The agent **learns** how much noise to inject per layer → state-aware exploration with **zero hyperparameters**.

### 4. Intrinsic Motivation
Add a bonus \`r⁺\` to environment reward when the agent encounters something **new or surprising**. Two leading approaches in the next lesson.

## Real-world example: web crawler

A search engine crawler must discover new pages. ε-greedy revisits popular pages forever. UCB-based crawlers (Google's "Caffeine" was rumored to use Bandit-style scheduling) prioritise pages with **high uncertainty** about freshness, dramatically reducing time-to-index.

## Common Pitfalls
- **Decaying ε too fast** — agent commits before learning; lock training in a local optimum.
- **Exploration bonuses that never decay** — agent wanders forever; tasks like Atari Pong overshoot.
- **Noisy nets with batch norm** — destroys the per-sample noise; use layer norm instead.

## Practice Task
Implement UCB-1 for a 10-armed Bernoulli bandit and compare cumulative regret vs ε=0.1 greedy over 5 000 steps. Plot both curves.`,
      code: `# UCB-1 vs ε-greedy on a 10-armed bandit
import numpy as np, math

K, T = 10, 10_000
true_p = np.random.uniform(0.1, 0.9, K)        # hidden Bernoulli probs

def run(strategy):
    Q = np.zeros(K); N = np.zeros(K); reward_hist = []
    for t in range(1, T+1):
        if strategy == "egreedy":
            a = np.random.randint(K) if np.random.rand() < 0.1 else int(np.argmax(Q))
        else:                                  # UCB-1
            ucb = Q + np.sqrt(2 * math.log(t) / np.maximum(N, 1e-6))
            a = int(np.argmax(ucb))
        r = float(np.random.rand() < true_p[a])
        N[a] += 1
        Q[a] += (r - Q[a]) / N[a]              # incremental mean
        reward_hist.append(r)
    optimal = true_p.max() * T
    return optimal - np.sum(reward_hist)        # cumulative regret

print(f"ε-greedy regret: {run('egreedy'):8.1f}")
print(f"UCB-1   regret: {run('ucb'):8.1f}")
# UCB typically reaches ~30 % lower regret`,
      exercise: "Why does ε-greedy fail catastrophically on Montezuma's Revenge while curiosity-driven methods can solve it? Explain in 3 sentences referring to reward sparsity.",
      exerciseEn: "",
      quiz: [
        {
          question: "Main advantage of UCB over ε-greedy?",
          options: ["Faster compute", "Exploration bonus naturally shrinks with visit count — no manual schedule", "Works only on continuous actions", "Requires a neural network"],
          answer: 1,
          explanation: "The √(log t / N) term automatically decays for well-explored arms.",
        },
        {
          question: "Noisy Networks add learnable noise to:",
          options: ["The reward signal", "The network weights", "The replay buffer", "The discount factor γ"],
          answer: 1,
          explanation: "σ parameters control per-weight noise magnitude — the agent learns how much exploration each state needs.",
        },
        {
          question: "In Bayesian Thompson Sampling for DQN, an action is selected by:",
          options: ["Always picking the max-mean Q", "Sampling Q-values from the posterior, then acting greedily on the sample", "Random uniform sampling", "Following a fixed policy"],
          answer: 1,
          explanation: "Sampling from the posterior naturally balances confidence and uncertainty.",
        },
      ],
    },
    {
      id: "rl-12-curiosity",
      title: "Curiosity-Driven RL — RND, ICM & Empowerment",
      titleEn: "Curiosity-Driven RL — RND, ICM & Empowerment",
      level: 5,
      difficulty: "advanced",
      codeLanguage: "python",
      theoryEn: `
> **Prerequisites**: Lesson 11.

## Sparse rewards: the central problem of RL

In Montezuma's Revenge, the first reward arrives after **~100 perfect actions**. In real robotics, the only reward might be "task complete after 30 minutes". Without an extrinsic signal, the agent needs an **intrinsic** one: **be curious about novel states**.

## Three flavours of intrinsic motivation

### 1. Random Network Distillation (RND, Burda 2018)
- Initialise a **random target network** \`f̂\`. Freeze it.
- Train a **predictor network** \`f\` to predict \`f̂(s)\`.
- Intrinsic reward = \`‖f(s) − f̂(s)‖²\` → **high for novel states**, low for visited ones (predictor has learned them).

\`\`\`mermaid
flowchart LR
  S[State s] --> TGT[Random Target Network<br/>FROZEN]
  S --> PRED[Predictor Network<br/>TRAINED]
  TGT --> Y1[ŷ]
  PRED --> Y2[y]
  Y1 --> DIFF[‖y - ŷ‖² = curiosity bonus]
  Y2 --> DIFF
\`\`\`

Beautifully **simple, parameter-free, and beat human on Montezuma's Revenge**.

### 2. Intrinsic Curiosity Module (ICM, Pathak 2017)
Train a **forward model** that predicts \`s_{t+1}\` from \`(s_t, a_t)\`. Bonus = prediction error. Adds an inverse model to filter noise (TV-static problem).

### 3. Empowerment
Maximise mutual information between actions and future states: be in a state where your actions matter. Theoretically beautiful, computationally expensive.

## When to use what

| Method | Compute | Robust to noise | Best for |
|---|---|---|---|
| RND | Cheap | Excellent | Hard exploration (Atari) |
| ICM | Medium | Bad (TV-static) | Procedural environments |
| Empowerment | Expensive | Good | Open-ended skills (DIAYN) |

## Real-world example: drug discovery

Reinforcement learning agents proposing new molecules suffer from sparse reward (most molecules are useless). RND-style curiosity over molecular embeddings encourages **structural diversity**, accelerating hit-finding 4–10× over random baselines.

## Common Pitfalls
- **The "noisy TV" problem** — a TV showing static is forever novel; ICM gets stuck staring at it. RND avoids this because random targets do not depend on actions.
- **Curiosity dominates extrinsic** — anneal the bonus or extrinsic reward will be ignored.
- **Forgetting normalisation** — divide intrinsic reward by its running std; raw scale ruins PPO updates.

## Practice Task
Design a curiosity bonus for a robot vacuum cleaner. State = (room id, dirt sensor, battery). Argue whether RND or ICM is better and how you would prevent the bonus from preventing the robot from ever recharging.`,
      code: `# Minimal RND module (PyTorch)
import torch, torch.nn as nn, torch.optim as optim

class RNDNet(nn.Module):
    def __init__(self, in_dim=64, hid=256, out=128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, hid), nn.ReLU(),
            nn.Linear(hid, hid), nn.ReLU(),
            nn.Linear(hid, out),
        )
    def forward(self, x): return self.net(x)

target = RNDNet().eval()                      # frozen, random
predictor = RNDNet()                          # trained
opt = optim.Adam(predictor.parameters(), lr=1e-4)

def intrinsic_reward(states):
    with torch.no_grad():
        y_hat = target(states)
    y = predictor(states)
    err = (y - y_hat).pow(2).mean(dim=1)      # per-sample novelty
    return err.detach()                        # use as bonus

def update_predictor(states):
    with torch.no_grad():
        y_hat = target(states)
    y = predictor(states)
    loss = (y - y_hat).pow(2).mean()
    opt.zero_grad(); loss.backward(); opt.step()
    return loss.item()

# Pretend we sample random states from the env
states = torch.randn(64, 64)
print("novelty (high at first):", intrinsic_reward(states).mean().item())
for _ in range(200):
    update_predictor(states)
print("novelty (after training): ", intrinsic_reward(states).mean().item())  # → near 0`,
      exercise: "Explain the 'noisy TV' failure of ICM and why RND avoids it. Use the words 'forward model', 'random target' and 'stochastic'.",
      exerciseEn: "",
      quiz: [
        {
          question: "RND's intrinsic reward equals:",
          options: ["The environment reward × 0.1", "Prediction error of a learnable network against a frozen random network", "Action entropy", "Negative log probability of the action"],
          answer: 1,
          explanation: "As the predictor learns familiar states, error drops → bonus is high only on novel states.",
        },
        {
          question: "Why is RND robust to the noisy-TV problem?",
          options: ["It uses dropout", "Random target depends only on the state, not on stochastic future transitions", "It clips rewards", "It uses prioritized replay"],
          answer: 1,
          explanation: "Randomness in the world cannot fool a network that doesn't try to predict the future.",
        },
        {
          question: "What problem motivates Curiosity-Driven RL?",
          options: ["Continuous action spaces", "Sparse extrinsic reward", "GPU memory limits", "Catastrophic forgetting"],
          answer: 1,
          explanation: "Without intrinsic motivation, agents in sparse-reward worlds never reach the first reward.",
        },
      ],
    },
    {
      id: "rl-13-hierarchical",
      title: "Hierarchical RL — Options, HIRO & Goal-Conditioned Policies",
      titleEn: "Hierarchical RL — Options, HIRO & Goal-Conditioned Policies",
      level: 5,
      difficulty: "advanced",
      codeLanguage: "python",
      theoryEn: `
> **Prerequisites**: Lessons 4 (Policy Gradients), 7 (PPO).

## Why hierarchy?

Solving "make breakfast" as a sequence of millisecond joint torques is hopeless. Humans plan in **abstractions**: open fridge → take eggs → crack → … . Each abstraction is itself a learned policy. **Hierarchical RL** learns multiple temporal scales simultaneously.

## The Options framework (Sutton, Precup, Singh 1999)

An **option** \`ω = (I_ω, π_ω, β_ω)\` is:
- \`I_ω\`: states where the option can start
- \`π_ω\`: internal policy
- \`β_ω(s)\`: probability the option terminates in state \`s\`

The **policy over options** picks an option, runs it until termination, then picks the next option. This is a Semi-MDP — Bellman equations still hold over option-completion times.

## Modern hierarchical architectures

\`\`\`mermaid
flowchart TB
  HI[High-level Policy<br/>picks goals every k steps] --> GOAL[Goal g_t]
  GOAL --> LO[Low-level Policy<br/>conditioned on g_t]
  LO --> ACT[Atomic action a_t]
  ACT --> ENV[Environment]
  ENV --> NS[Next state]
  NS --> LO
\`\`\`

| Method | High-level output | Low-level training |
|---|---|---|
| **Feudal Networks** | Latent goal vector | Mimic goal direction |
| **HIRO (Nachum 2018)** | Subgoal state | Off-policy correction with relabelling |
| **Goal-conditioned (UVFA, HER)** | Explicit goal s_g | Hindsight relabelling |

## Hindsight Experience Replay (HER, Andrychowicz 2017)

Failed trajectories are gold mines: if the agent reached state \`s'\` instead of the goal, **relabel** the trajectory as if \`s'\` were the goal — now it is a success! HER turns sparse-reward robotics from "doesn't work" to "trains in hours".

## Real-world examples
- **Robot manipulation**: OpenAI's solved Rubik's cube (2019) used hierarchical control: high-level cube-state planner + low-level finger-policy trained with PPO.
- **AlphaStar (StarCraft II)**: high-level macro strategy + low-level unit micro-control.
- **Game NPCs**: Skyrim-style RPGs use behaviour trees that map naturally to options.

## Common Pitfalls
- **Subgoal collapse** — high-level policy proposes the same goal forever. Cure: entropy bonus on goal distribution.
- **Stale low-level policy** — when low-level changes, high-level value estimates become wrong. HIRO solves this with off-policy correction.
- **HER on stochastic environments** — relabelling can teach incorrect dynamics; use future strategy not random.

## Practice Task
For a household robot ("make tea"), define 4 reasonable options with their initiation set, internal policy goal, and termination condition. Diagram which option calls which.`,
      code: `# Tiny goal-conditioned policy with HER on a 2D grid (concept)
import numpy as np, random
from collections import deque

GRID = 8
def step(s, a):
    dx, dy = [(0,1),(0,-1),(1,0),(-1,0)][a]
    ns = (max(0,min(GRID-1,s[0]+dx)), max(0,min(GRID-1,s[1]+dy)))
    return ns

def episode(policy, goal):
    s, traj = (0,0), []
    for _ in range(20):
        a = policy(s, goal)
        ns = step(s, a)
        traj.append((s, a, ns))
        if ns == goal: return traj, True
        s = ns
    return traj, False

buffer = deque(maxlen=10000)
def random_policy(s, g): return random.randint(0,3)

# Collect 1000 episodes towards random goals
for _ in range(1000):
    g = (random.randint(0,GRID-1), random.randint(0,GRID-1))
    traj, ok = episode(random_policy, g)
    for s,a,ns in traj:
        r = 1.0 if ns == g else 0.0
        buffer.append((s, a, ns, g, r))
        # HER: also store with the *achieved* state as goal → guaranteed success!
        achieved = traj[-1][2]
        r_h = 1.0 if ns == achieved else 0.0
        buffer.append((s, a, ns, achieved, r_h))

successes = sum(1 for *_, r in buffer if r == 1.0)
print(f"Successful transitions in buffer: {successes} / {len(buffer)} "
      f"(without HER would be ≈ {successes // 2})")`,
      exercise: "Explain why HER works only when the relabelled goal is reachable by the same dynamics. What goes wrong if you relabel arbitrarily?",
      exerciseEn: "",
      quiz: [
        {
          question: "What does 'option' termination β_ω(s) control?",
          options: ["The reward signal", "The probability the option ends and control returns to the high level in state s", "Discount factor", "Learning rate"],
          answer: 1,
          explanation: "Termination conditions enable variable-length skills.",
        },
        {
          question: "Hindsight Experience Replay improves learning by:",
          options: ["Training a critic", "Relabelling failed trajectories so achieved states become 'goals'", "Doubling the network size", "Using a target network"],
          answer: 1,
          explanation: "HER converts every trajectory into a success at the achieved end-state, multiplying useful signal.",
        },
        {
          question: "Why does HIRO need off-policy correction?",
          options: ["It uses a value baseline", "Because the low-level policy changes, old high-level subgoals no longer reflect current behaviour", "GPUs require it", "TensorFlow is slow"],
          answer: 1,
          explanation: "When the worker's policy shifts, manager rewards collected with the old worker become stale.",
        },
      ],
    },
    {
      id: "rl-14-inverse-rl",
      title: "Inverse RL & Imitation Learning — Learning from Demonstrations",
      titleEn: "Inverse RL & Imitation Learning — Learning from Demonstrations",
      level: 5,
      difficulty: "advanced",
      codeLanguage: "python",
      theoryEn: `
> **Prerequisites**: Lessons 3, 4, 7.

## When the reward is unknown

Designing reward functions is **harder than the original problem**. For self-driving: reward should encode safety, comfort, lawfulness, social acceptability… any wrong weighting yields a sociopathic driver. **Inverse Reinforcement Learning (IRL)** infers the reward from expert demonstrations; **Imitation Learning** skips reward and copies expert actions directly.

## Three approaches on a continuum

\`\`\`mermaid
flowchart LR
  BC[Behavioural Cloning<br/>Supervised mimic] --> DG[DAgger<br/>Mimic + interactive correction]
  DG --> GAIL[GAIL<br/>Adversarial: discriminator vs policy]
  GAIL --> IRL[Inverse RL<br/>Learn reward, then RL]
\`\`\`

### 1. Behavioural Cloning (BC)
Treat (state → action) as supervised learning. **Fast** but suffers from **covariate shift**: tiny errors compound off-distribution → catastrophic on long horizons.

### 2. DAgger (Ross 2011)
Iteratively roll out the policy, **let the expert relabel** the visited states. Cures covariate shift at the cost of expert availability online.

### 3. GAIL (Ho & Ermon 2016)
Adversarial: a **discriminator** distinguishes expert vs policy trajectories. The policy is trained (with PPO) to **fool** the discriminator → matches the expert state-action distribution without ever defining a reward.

### 4. Inverse RL
Assume the expert is optimal under some unknown reward \`R\`. Recover \`R\` such that the expert's policy is optimal. Once you have \`R\`, you can train new agents that **transfer** to new environments — power that pure imitation lacks.

## Real-world examples
- **Self-driving (Waymo, Wayve)**: trained on millions of human-driven hours via combined BC + GAIL.
- **Surgical robots (Intuitive Surgical, MedTech start-ups)**: imitation from expert surgeons is safer than RL exploration.
- **Game AI (Forza Motorsport)**: AI opponents trained on real player races feel "human".
- **LLM alignment**: SFT before RLHF is essentially behavioural cloning of human chat data.

## Common Pitfalls
- **BC on long horizons** — error compounds linearly with horizon → quadratic regret in T.
- **GAIL mode collapse** — discriminator overpowers; policy ignores rare expert behaviours. Cure: gradient penalty (WGAIL).
- **IRL ambiguity** — many rewards explain the same behaviour. Maximum-entropy IRL picks the one with highest action entropy.

## Practice Task
You have 50 hours of expert chess gameplay logs but no engine evaluations. Compare BC, GAIL, and IRL approaches. Which would you ship to production and why?`,
      code: `# Behavioural Cloning skeleton (PyTorch) for car steering
import torch, torch.nn as nn, torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

# Suppose we have expert (image, steering_angle) pairs
# X: tensor of shape (N, 3, 64, 64)  Y: tensor of shape (N,) in [-1, 1]
N = 4096
X = torch.randn(N, 3, 64, 64)
Y = torch.randn(N)

class CNNPolicy(nn.Module):
    def __init__(self):
        super().__init__()
        self.feat = nn.Sequential(
            nn.Conv2d(3, 16, 5, 2), nn.ReLU(),
            nn.Conv2d(16, 32, 5, 2), nn.ReLU(),
            nn.Flatten(),
        )
        with torch.no_grad():
            d = self.feat(torch.zeros(1, 3, 64, 64)).shape[1]
        self.head = nn.Sequential(nn.Linear(d, 64), nn.ReLU(), nn.Linear(64, 1), nn.Tanh())
    def forward(self, x): return self.head(self.feat(x)).squeeze(-1)

policy = CNNPolicy()
opt = optim.Adam(policy.parameters(), lr=1e-3)
loss_fn = nn.MSELoss()
loader = DataLoader(TensorDataset(X, Y), batch_size=64, shuffle=True)

for epoch in range(3):
    total = 0
    for xb, yb in loader:
        pred = policy(xb)
        loss = loss_fn(pred, yb)
        opt.zero_grad(); loss.backward(); opt.step()
        total += loss.item() * len(xb)
    print(f"epoch {epoch}: avg MSE = {total/N:.4f}")
# Caveat: BC will *not* recover from off-distribution states — DAgger needed for highway driving`,
      exercise: "Explain why BC suffers from quadratic regret in horizon T while DAgger achieves linear regret. Use the term 'covariate shift'.",
      exerciseEn: "",
      quiz: [
        {
          question: "Main weakness of pure Behavioural Cloning?",
          options: ["Too slow to train", "Compounding errors push the policy off the expert distribution (covariate shift)", "Cannot use deep networks", "Requires a reward signal"],
          answer: 1,
          explanation: "Once the policy drifts off-distribution, all subsequent states look novel and errors snowball.",
        },
        {
          question: "GAIL trains the policy with which loss?",
          options: ["MSE on expert actions", "Adversarial loss with a discriminator distinguishing expert vs policy state-actions", "Cross-entropy on goal", "TD-error"],
          answer: 1,
          explanation: "GAIL = GAN + RL: the discriminator's score becomes the policy's reward.",
        },
        {
          question: "Why is Inverse RL valuable beyond imitation?",
          options: ["It is faster to train", "Recovering the reward enables transfer to new environments and agents", "It has fewer hyperparameters", "It does not require demonstrations"],
          answer: 1,
          explanation: "A learned reward can be reused — a learned policy cannot generalise across embodiments.",
        },
      ],
    },
    {
      id: "rl-15-world-models",
      title: "Model-Based RL & World Models — Dreamer, MuZero & Beyond",
      titleEn: "Model-Based RL & World Models — Dreamer, MuZero & Beyond",
      level: 5,
      difficulty: "advanced",
      codeLanguage: "python",
      theoryEn: `
> **Prerequisites**: Lessons 2 (MDP), 3 (DQN), 7 (PPO), 10 (AlphaGo).

## Sample efficiency: the Achilles' heel of model-free RL

DQN needs ~200M frames to master Atari. A **human** masters Pong in ~15 minutes. The gap is **1 000 000×** sample efficiency. Model-based RL closes most of it by **learning a world model** of the environment dynamics and planning inside it.

## The model-based pipeline

\`\`\`mermaid
flowchart LR
  REAL[Real environment] -->|few interactions| BUF[Replay buffer]
  BUF --> WM[Learn world model<br/>p(s'|s,a), r(s,a)]
  WM --> IMG[Imagine rollouts<br/>cheap, parallel, GPU]
  IMG --> POL[Train policy & value<br/>inside the dream]
  POL -->|act| REAL
\`\`\`

## Two leading families in 2024

### A. Dreamer (Hafner 2020-2023)
- **Recurrent State-Space Model (RSSM)** with deterministic + stochastic latent.
- **Actor-critic in latent space** — never touches pixels at training time → enormous compute savings.
- **DreamerV3** (2023): one set of hyperparameters solves 150+ tasks (Atari, Crafter, Minecraft diamonds in 17 days vs 20 years for prior work).

### B. MuZero (Schrittwieser 2019)
- World model is **implicit**: learns latent dynamics that only need to predict reward, value, and policy — **not pixels**.
- Combines model + MCTS — same algorithm conquered Go, Chess, Shogi, Atari, **without being told the rules**.
- Powers Alphabet's chip floorplan tool and YouTube video compression (-4 % bandwidth).

## Pixel-prediction vs reward-prediction

| Aspect | Dreamer (predict pixels) | MuZero (predict value/reward only) |
|---|---|---|
| Decoder needed | Yes | No |
| Visual inspection | Easy ("dreams") | Impossible |
| Compute | Higher | Lower |
| Sample efficiency | Excellent | Excellent |

## Real-world examples
- **DeepMind's controller for nuclear fusion plasma** (TCV tokamak, 2022): trained inside a simulator + Dreamer-style world model — sustained novel plasma shapes for the first time.
- **Tesla's "FSD V12"**: end-to-end driving leverages neural simulation of traffic.
- **Google's Genie (2024)**: a world model that turns a single image into a playable 2D platformer environment — generative RL training data.

## Why hasn't model-based replaced model-free everywhere?

- **Model bias** — small dynamics errors compound in long imagination rollouts.
- **Hard environments** — deformable objects, fluid dynamics resist accurate models.
- **Cost** — training the world model itself can dwarf the policy training.

## Common Pitfalls
- **Imagination horizon too long** — stack predictions amplify model error; usually 15–50 steps.
- **No uncertainty estimates** — without an ensemble of models the agent over-trusts the dream. Cure: ensemble disagreement as bonus or constraint.
- **Forgetting to ground** — periodically interleave with real-environment data or the policy diverges.

## Practice Task
A robotic arm has a slow simulator (5 Hz) but a perfect digital twin in PyBullet (200 Hz). Argue whether you should still bother learning a world model with Dreamer, or just train PPO inside PyBullet. Discuss reality gap.`,
      code: `# Tiny world model: predict next state + reward (PyTorch concept)
import torch, torch.nn as nn, torch.optim as optim

class WorldModel(nn.Module):
    def __init__(self, s_dim=4, a_dim=2, hid=64):
        super().__init__()
        self.trunk = nn.Sequential(
            nn.Linear(s_dim + a_dim, hid), nn.ReLU(),
            nn.Linear(hid, hid), nn.ReLU(),
        )
        self.next_state = nn.Linear(hid, s_dim)
        self.reward = nn.Linear(hid, 1)

    def forward(self, s, a):
        h = self.trunk(torch.cat([s, a], dim=-1))
        return self.next_state(h), self.reward(h).squeeze(-1)

wm = WorldModel()
opt = optim.Adam(wm.parameters(), lr=1e-3)
loss_fn = nn.MSELoss()

# Suppose we have a small batch from the real env
B = 64
s = torch.randn(B, 4); a = torch.randn(B, 2)
s_next_true = torch.randn(B, 4); r_true = torch.randn(B)

for _ in range(500):
    s_next_pred, r_pred = wm(s, a)
    loss = loss_fn(s_next_pred, s_next_true) + loss_fn(r_pred, r_true)
    opt.zero_grad(); loss.backward(); opt.step()
print(f"World-model loss after training: {loss.item():.4f}")

# Imagine a rollout: cheap, fully on GPU, no real env needed
def imagine(wm, s0, policy, horizon=20):
    s = s0; total = torch.zeros(s.size(0))
    for _ in range(horizon):
        a = policy(s)
        s, r = wm(s, a)
        total = total + r
    return total                                  # imagined return for actor update

policy = lambda s: torch.tanh(s[:, :2])           # placeholder
print("Imagined return:", imagine(wm, s, policy).mean().item())`,
      exercise: "DreamerV3 trains its actor-critic entirely inside latent imagination. Why is this dramatically more sample-efficient than model-free PPO? Discuss the trade-off if the world model is wrong by 5 % per step.",
      exerciseEn: "",
      quiz: [
        {
          question: "What does MuZero's world model predict?",
          options: ["Pixels of the next frame", "Latent quantities sufficient for value, policy and reward", "Action probabilities only", "Reward only"],
          answer: 1,
          explanation: "Skipping pixel reconstruction is what makes MuZero scale to Go, Chess, Atari with one architecture.",
        },
        {
          question: "Why limit imagination horizon to ~20–50 steps?",
          options: ["To save GPU memory only", "Model errors compound exponentially over long rollouts", "Discount factor restricts it", "PyTorch cannot backprop through more"],
          answer: 1,
          explanation: "Even small per-step model errors multiply, so plans beyond ~50 steps become unreliable.",
        },
        {
          question: "Sample efficiency advantage of model-based RL is largest when:",
          options: ["The simulator is free and infinitely fast", "Real-world interaction is expensive and a learned model is cheap", "Reward is dense", "Action space is discrete"],
          answer: 1,
          explanation: "Robotics, scientific control, healthcare — exactly where each real interaction is costly.",
        },
      ],
    },
  ],
};

export const rlModules: ExtendedProgrammingModule[] = [rlModule];
