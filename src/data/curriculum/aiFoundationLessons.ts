// AI Foundation curriculum — 12 modules with progressive difficulty
import type { ExtendedProgrammingModule } from "./types";

export const aiFoundationModules: ExtendedProgrammingModule[] = [
  {
    id: "ai-history",
    title: "Lịch sử AI",
    titleEn: "History of AI",
    icon: "📜",
    color: "from-rose-500 to-pink-600",
    description: "Từ Turing đến GPT — hành trình phát triển AI",
    descriptionEn: "From Turing to GPT — the evolution of AI",
    course: "data-ai",
    lessons: [
      {
        id: "ai-hist-1", title: "Từ Turing đến Deep Learning", titleEn: "From Turing to Deep Learning",
        level: 1, difficulty: "beginner",
        theory: `**History of Artificial Intelligence — A Comprehensive Overview**

Artificial Intelligence (AI) has evolved through several distinct eras, each marked by breakthroughs, setbacks, and paradigm shifts. Understanding this history is essential for any AI practitioner.

---

**🧮 The Birth of AI (1940s-1950s)**

- **1943:** Warren McCulloch & Walter Pitts create the first mathematical model of a neural network.
- **1950:** Alan Turing publishes *"Computing Machinery and Intelligence"*, proposing the famous **Turing Test** — a benchmark for machine intelligence. The core question: "Can machines think?"
- **1956:** The **Dartmouth Conference** — organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon — officially coins the term "Artificial Intelligence." This is considered the founding moment of AI as a field.

**Key Insight:** Early AI researchers were incredibly optimistic. Herbert Simon predicted that within 20 years, machines would be capable of doing any work a man can do.

---

**🤖 The Golden Age (1960s)**

- **1961:** UNIMATE, the first industrial robot, begins work at GM.
- **1964:** ELIZA, created by Joseph Weizenbaum at MIT, becomes the first chatbot — simulating a psychotherapist using simple pattern matching.
- **1966:** SHRDLU demonstrates natural language understanding in a blocks world.
- Expert systems begin development — rule-based AI that encodes human expertise.

---

**❄️ AI Winter (1970s-1980s)**

The field experienced two major "winters" — periods of reduced funding and interest:

- **First AI Winter (1974-1980):** The Lighthill Report (1973) in the UK criticized AI's failure to achieve its "grandiose objectives." DARPA cut funding drastically.
- **Expert Systems Boom (1980-1987):** Expert systems like MYCIN and R1/XCON briefly revived interest, with companies investing billions.
- **Second AI Winter (1987-1993):** Expert systems proved brittle, expensive to maintain, and couldn't scale. The AI market collapsed.

**Why did AI winters happen?**
1. Over-promising and under-delivering
2. Computational limitations of the era
3. Lack of sufficient training data
4. Theoretical limitations (e.g., XOR problem for perceptrons)

---

**🧠 The Neural Network Renaissance (1986-2010)**

- **1986:** Geoffrey Hinton, David Rumelhart, and Ronald Williams publish the **Backpropagation** algorithm, enabling training of multi-layer neural networks.
- **1997:** IBM's **Deep Blue** defeats world chess champion Garry Kasparov — a landmark moment for AI.
- **1998:** Yann LeCun develops **LeNet-5**, a CNN for handwritten digit recognition.
- **2006:** Hinton coins **"Deep Learning"** and demonstrates deep belief networks.

---

**📱 The Deep Learning Revolution (2012-Present)**

- **2012:** **AlexNet** (by Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton) wins ImageNet with a massive margin, proving deep CNNs on GPUs are game-changers.
- **2014:** **GANs** (Generative Adversarial Networks) invented by Ian Goodfellow.
- **2016:** **AlphaGo** (DeepMind) defeats world Go champion Lee Sedol — a feat thought to be decades away.
- **2017:** Google publishes **"Attention Is All You Need"** — introducing the **Transformer** architecture, the foundation for modern LLMs.
- **2018:** **BERT** (Google) and **GPT-1** (OpenAI) demonstrate the power of pre-trained language models.
- **2020:** **GPT-3** shows emergent abilities with 175 billion parameters.
- **2022:** **ChatGPT** reaches 100 million users in 2 months, making AI mainstream.
- **2023-2024:** GPT-4, Claude, Gemini, open-source LLMs (Llama, Mistral) proliferate. Multi-modal AI becomes reality.

---

**📊 Key Themes Across AI History:**

| Era | Approach | Limitation |
|-----|----------|------------|
| 1950-1970 | Symbolic AI / Logic | Can't handle uncertainty |
| 1980-1990 | Expert Systems | Brittle, expensive |
| 2000-2010 | Statistical ML | Feature engineering bottleneck |
| 2012-2020 | Deep Learning | Data + compute hungry |
| 2020+ | Foundation Models | Alignment, hallucination |

Understanding these cycles helps us avoid repeating past mistakes and appreciate why modern AI works the way it does.`,
        theoryEn: `**History of Artificial Intelligence — A Comprehensive Overview**

Artificial Intelligence (AI) has evolved through several distinct eras, each marked by breakthroughs, setbacks, and paradigm shifts. Understanding this history is essential for any AI practitioner.

---

**🧮 The Birth of AI (1940s-1950s)**

- **1943:** Warren McCulloch & Walter Pitts create the first mathematical model of a neural network.
- **1950:** Alan Turing publishes *"Computing Machinery and Intelligence"*, proposing the famous **Turing Test** — a benchmark for machine intelligence.
- **1956:** The **Dartmouth Conference** officially coins the term "Artificial Intelligence." This is considered the founding moment of AI as a field.

**Key Insight:** Early AI researchers were incredibly optimistic — predicting human-level AI within 20 years.

---

**🤖 The Golden Age (1960s)**

- **1961:** UNIMATE, the first industrial robot.
- **1964:** ELIZA — the first chatbot, simulating a psychotherapist using pattern matching.
- Expert systems begin development — rule-based AI encoding human expertise.

---

**❄️ AI Winter (1970s-1980s)**

Two major periods of reduced funding and interest:

- **First AI Winter (1974-1980):** Over-promising led to funding cuts.
- **Expert Systems Boom & Bust (1980-1993):** Expensive, brittle systems that couldn't scale.

**Root causes:** Over-promising, computational limits, insufficient data, theoretical limitations.

---

**🧠 Neural Network Renaissance (1986-2010)**

- **1986:** **Backpropagation** algorithm enables multi-layer neural networks.
- **1997:** IBM's **Deep Blue** defeats world chess champion Kasparov.
- **1998:** Yann LeCun's **LeNet-5** for digit recognition.
- **2006:** Hinton coins "Deep Learning."

---

**📱 The Deep Learning Revolution (2012-Present)**

- **2012:** **AlexNet** wins ImageNet, proving deep CNNs on GPUs.
- **2014:** **GANs** invented by Ian Goodfellow.
- **2016:** **AlphaGo** defeats world Go champion.
- **2017:** **"Attention Is All You Need"** — the Transformer architecture.
- **2022:** **ChatGPT** reaches 100M users in 2 months.
- **2023-2024:** GPT-4, Claude, Gemini, open-source LLMs proliferate.

---

**📊 Key Themes:** Symbolic AI → Expert Systems → Statistical ML → Deep Learning → Foundation Models. Each era had its own approach, strengths, and limitations.`,
        code: `# AI Timeline Visualization
timeline = [
    (1950, "Turing Test", "Alan Turing proposes machine intelligence test"),
    (1956, "AI Born", "Dartmouth Conference coins 'Artificial Intelligence'"),
    (1966, "ELIZA", "First chatbot by Joseph Weizenbaum"),
    (1986, "Backprop", "Backpropagation enables multi-layer neural networks"),
    (1997, "Deep Blue", "IBM's computer defeats chess champion Kasparov"),
    (2012, "AlexNet", "CNN wins ImageNet, Deep Learning revolution begins"),
    (2017, "Transformer", "Attention Is All You Need paper by Google"),
    (2022, "ChatGPT", "OpenAI's LLM reaches 100M users in 2 months"),
]

print("🤖 AI Timeline")
print("=" * 60)
for year, event, desc in timeline:
    bar = "█" * ((year - 1945) // 5)
    print(f"  {year} | {bar} {event}")
    print(f"       └─ {desc}")
print(f"\\n📊 {len(timeline)} milestones spanning {timeline[-1][0] - timeline[0][0]} years")`,
        codeLanguage: "python",
        exercise: "Add 5 more important AI events and create a chart categorized by decade.",
        exerciseEn: "Add 5 more important AI events and create a chart categorized by decade.",
        quiz: [
          { question: "What is AI Winter?", options: ["AI works best in winter", "A period of reduced AI funding and interest due to unmet expectations", "An optimization algorithm", "A new version of AI"], answer: 1, explanation: "AI Winter refers to periods when AI research funding and interest declined because overly ambitious promises failed to materialize." },
          { question: "When was the Transformer architecture introduced?", options: ["2012", "2015", "2017", "2020"], answer: 2, explanation: "The paper 'Attention Is All You Need' was published by Google in 2017, laying the foundation for GPT, BERT, and modern LLMs." },
          { question: "What made AlexNet (2012) so significant?", options: ["It was the first AI", "It proved deep CNNs on GPUs could dramatically outperform traditional methods", "It replaced all expert systems", "It was the first chatbot"], answer: 1, explanation: "AlexNet won the ImageNet competition by a massive margin, proving that deep convolutional neural networks trained on GPUs were a game-changer for computer vision." },
          { question: "What was the Dartmouth Conference (1956)?", options: ["A competition for robots", "The event that officially coined the term 'Artificial Intelligence'", "The first AI Winter conference", "A neural network workshop"], answer: 1, explanation: "The Dartmouth Conference, organized by John McCarthy and others, is considered the founding event of AI as an academic discipline." },
          { question: "What is the main cause of AI Winters?", options: ["Too much data", "Over-promising and under-delivering, leading to funding cuts", "Hardware too fast", "Too many researchers"], answer: 1, explanation: "AI Winters occurred when researchers over-promised capabilities that couldn't be delivered with existing technology, leading to disappointment and dramatic funding cuts." }
        ]
      }
    ]
  },
  {
    id: "ai-neural-basics",
    title: "Neural Network cơ bản",
    titleEn: "Neural Network Basics",
    icon: "🧠",
    color: "from-rose-500 to-pink-600",
    description: "Perceptron, layers, forward propagation",
    descriptionEn: "Perceptron, layers, forward propagation",
    course: "data-ai",
    lessons: [
      {
        id: "ai-nn-1", title: "Perceptron & Forward Pass", titleEn: "Perceptron & Forward Pass",
        level: 2, difficulty: "beginner",
        theory: `**Neural Networks — The Foundation of Modern AI**

Neural networks are computing systems inspired by biological neural networks in the brain. They form the backbone of deep learning and modern AI.

---

**🔵 The Perceptron — The Simplest Neural Unit**

A perceptron is the most basic building block of a neural network. It works in 4 steps:

1. **Receive inputs** (x₁, x₂, ..., xₙ) — these are your features/data
2. **Multiply by weights** (w₁, w₂, ..., wₙ) — weights determine importance
3. **Add bias** (b) — shifts the decision boundary
4. **Apply activation function** — introduces non-linearity

**Mathematical Formula:**
\`output = activation(Σ(xᵢ × wᵢ) + b)\`

Think of it like a voting system: each input "votes" (weighted by importance), and the activation function decides if the total vote passes a threshold.

---

**🏗️ Multi-Layer Networks (MLPs)**

Real neural networks stack multiple layers of neurons:

- **Input Layer:** Receives raw data (e.g., pixel values, features)
- **Hidden Layers:** Extract increasingly abstract features
- **Output Layer:** Produces final prediction

**Why multiple layers?**
A single perceptron can only learn **linear** boundaries (straight lines). Multiple layers can learn **non-linear** complex patterns — curves, shapes, abstract concepts.

**Universal Approximation Theorem:** A neural network with at least one hidden layer and sufficient neurons can approximate *any* continuous function. This is why neural networks are so powerful.

---

**➡️ Forward Propagation**

Forward propagation is how data flows through the network:

\`\`\`
Input → Layer 1 → Activation → Layer 2 → Activation → ... → Output
\`\`\`

At each layer:
1. Compute **z = W·x + b** (linear transformation)
2. Apply **activation function** a = σ(z)
3. Pass **a** as input to next layer

This produces a prediction, which is then compared to the actual target to compute the loss.

---

**🎯 Key Concepts:**

| Term | Description |
|------|-------------|
| Weight | How important an input is (learned during training) |
| Bias | Allows the neuron to shift its activation (like y-intercept) |
| Layer | A collection of neurons at the same depth |
| Depth | Number of layers (more depth = "deeper" network) |
| Width | Number of neurons per layer |

---

**⚠️ Common Misconceptions:**
- Neural networks don't "think" — they perform matrix multiplications
- More layers ≠ always better (risk of overfitting, vanishing gradients)
- The architecture design (how many layers, neurons) is crucial and often more art than science`,
        theoryEn: `**Neural Networks — The Foundation of Modern AI**

Neural networks are computing systems inspired by biological brain networks, forming the backbone of deep learning.

---

**🔵 The Perceptron**

The simplest neural unit works in 4 steps:
1. Receive inputs (x₁, x₂, ..., xₙ)
2. Multiply by weights (w₁, w₂, ..., wₙ)
3. Add bias (b)
4. Apply activation function

**Formula:** \`output = activation(Σ(xᵢ × wᵢ) + b)\`

---

**🏗️ Multi-Layer Networks**

- **Input Layer:** Raw data
- **Hidden Layers:** Extract abstract features
- **Output Layer:** Final prediction

**Universal Approximation Theorem:** A network with one hidden layer can approximate any continuous function.

---

**➡️ Forward Propagation**

Data flows: Input → Layer 1 → Activation → Layer 2 → ... → Output

Each layer: z = W·x + b → a = σ(z) → pass to next layer.

---

**Key Terms:** Weights (importance), Bias (shift), Depth (layers), Width (neurons per layer).`,
        code: `import numpy as np

class Perceptron:
    def __init__(self, n_inputs):
        self.weights = np.random.randn(n_inputs) * 0.1
        self.bias = 0.0

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    def forward(self, x):
        z = np.dot(x, self.weights) + self.bias
        return self.sigmoid(z)

# Create a simple neuron
neuron = Perceptron(3)
print(f"Weights: {neuron.weights}")
print(f"Bias: {neuron.bias}")

# Forward pass
inputs = np.array([0.5, 0.3, 0.8])
output = neuron.forward(inputs)
print(f"\\nInput: {inputs}")
print(f"Output: {output:.4f}")

# Simple 2-layer network
class SimpleNetwork:
    def __init__(self):
        self.hidden = [Perceptron(2) for _ in range(3)]
        self.output = Perceptron(3)

    def forward(self, x):
        h = np.array([n.forward(x) for n in self.hidden])
        return self.output.forward(h)

net = SimpleNetwork()
result = net.forward(np.array([1.0, 0.5]))
print(f"\\n🧠 Network output: {result:.4f}")`,
        codeLanguage: "python",
        exercise: "Build a 3-layer network (2 input → 4 hidden → 1 output) and test with different inputs.",
        exerciseEn: "Build a 3-layer network (2 input → 4 hidden → 1 output) and test with different inputs.",
        quiz: [
          { question: "How does a Perceptron compute its output?", options: ["Only adds inputs", "Multiplies inputs by weights, adds bias, applies activation", "Random output", "Uses only bias"], answer: 1, explanation: "A Perceptron computes z = Σ(xᵢ × wᵢ) + b, then applies an activation function to z." },
          { question: "What is the role of bias in a neural network?", options: ["Makes training faster", "Shifts the activation function, allowing better fitting", "Prevents overfitting", "Adds noise for regularization"], answer: 1, explanation: "Bias allows the neuron to shift its activation function left or right, similar to the y-intercept in a linear equation." },
          { question: "Why do we need multiple layers?", options: ["Single layer is too fast", "Multiple layers can learn non-linear, complex patterns", "More layers = less computation", "It's just convention"], answer: 1, explanation: "A single perceptron can only learn linear boundaries. Multiple layers enable the network to learn complex, non-linear patterns." },
          { question: "What does the Universal Approximation Theorem state?", options: ["Deep networks always beat shallow ones", "A network with one hidden layer can approximate any continuous function", "Neural networks can solve any problem", "More neurons = more accuracy"], answer: 1, explanation: "The theorem states that a feedforward network with a single hidden layer containing enough neurons can approximate any continuous function to arbitrary accuracy." },
          { question: "What flows through a neural network during forward propagation?", options: ["Gradients from output to input", "Data from input through layers to output", "Random noise", "Only weights"], answer: 1, explanation: "Forward propagation passes input data through each layer sequentially, computing weighted sums and activations until reaching the output." }
        ]
      }
    ]
  },
  {
    id: "ai-activation",
    title: "Activation Functions",
    titleEn: "Activation Functions",
    icon: "📈",
    color: "from-rose-500 to-pink-600",
    description: "Sigmoid, ReLU, Tanh, Softmax",
    descriptionEn: "Sigmoid, ReLU, Tanh, Softmax",
    course: "data-ai",
    lessons: [
      {
        id: "ai-act-1", title: "Các hàm kích hoạt", titleEn: "Activation Functions Deep Dive",
        level: 2, difficulty: "intermediate",
        theory: `**Activation Functions — Adding Non-Linearity to Neural Networks**

Without activation functions, a neural network would just be a series of linear transformations — essentially a fancy linear regression. Activation functions introduce **non-linearity**, allowing networks to learn complex patterns.

---

**📐 Sigmoid (Logistic Function)**

\`σ(x) = 1 / (1 + e⁻ˣ)\`

- **Output range:** [0, 1]
- **Shape:** Smooth S-curve
- **Use case:** Binary classification output layer, gates in LSTM
- **Pros:** Output interpretable as probability
- **Cons:** 
  - **Vanishing gradient:** For very large/small x, gradient ≈ 0 → deep layers stop learning
  - **Not zero-centered:** Outputs are always positive, causing zig-zag gradient updates
  - **Computationally expensive:** Involves exponentiation

---

**📊 Tanh (Hyperbolic Tangent)**

\`tanh(x) = (eˣ - e⁻ˣ) / (eˣ + e⁻ˣ)\`

- **Output range:** [-1, 1]
- **Advantage over Sigmoid:** Zero-centered → smoother gradient updates
- **Use case:** RNNs, hidden layers in older architectures
- **Cons:** Still suffers from vanishing gradient

---

**⚡ ReLU (Rectified Linear Unit)**

\`ReLU(x) = max(0, x)\`

- **Output range:** [0, ∞)
- **The most popular activation function today**
- **Pros:**
  - Extremely fast to compute (just a comparison)
  - No vanishing gradient for positive values
  - Promotes sparse activations (many neurons output 0)
- **Cons:**
  - **Dying ReLU problem:** Neurons that output 0 for all inputs stop learning permanently
  - Not zero-centered

---

**🔧 Leaky ReLU & Variants**

\`LeakyReLU(x) = max(αx, x)\` where α = 0.01

- Fixes the dying ReLU problem by allowing small negative gradients
- **PReLU (Parametric):** α is learned during training
- **ELU:** Smooth version: \`α(eˣ - 1)\` for x < 0
- **GELU:** Used in Transformers (BERT, GPT): \`x · Φ(x)\`
- **SiLU/Swish:** \`x · σ(x)\` — used in modern architectures

---

**🎯 Softmax**

\`Softmax(xᵢ) = eˣⁱ / Σ(eˣʲ)\`

- Converts a vector of real numbers into a **probability distribution** (all values sum to 1)
- **Use case:** Multi-class classification output layer
- Not used in hidden layers

---

**📋 Quick Reference — When to Use What:**

| Layer Type | Recommended Activation |
|-----------|----------------------|
| Hidden layers (default) | ReLU |
| Hidden layers (modern) | GELU, SiLU |
| Binary output | Sigmoid |
| Multi-class output | Softmax |
| RNN hidden | Tanh |
| GAN generator output | Tanh |
| Regression output | None (linear) |

---

**⚠️ Key Takeaway:** The choice of activation function significantly impacts training speed, convergence, and final performance. ReLU is the safe default for hidden layers, but modern architectures increasingly use GELU or SiLU.`,
        theoryEn: `**Activation Functions — Adding Non-Linearity to Neural Networks**

Without activation functions, a neural network is just linear regression. Activation functions introduce **non-linearity**.

---

**Sigmoid:** σ(x) = 1/(1+e⁻ˣ) → [0,1]. Good for binary output, but vanishing gradient.

**Tanh:** [-1,1]. Zero-centered, but still vanishing gradient.

**ReLU:** max(0,x) → most popular. Fast, no vanishing gradient for positives. Dying ReLU problem.

**Leaky ReLU:** max(0.01x, x) → fixes dying ReLU. Variants: PReLU, ELU, GELU, SiLU.

**Softmax:** Converts vector to probabilities (sum=1). For multi-class output.

---

**Quick Reference:** Hidden layers → ReLU/GELU. Binary output → Sigmoid. Multi-class → Softmax. RNN → Tanh.`,
        code: `import numpy as np

def sigmoid(x): return 1 / (1 + np.exp(-x))
def tanh(x): return np.tanh(x)
def relu(x): return np.maximum(0, x)
def leaky_relu(x, alpha=0.01): return np.where(x > 0, x, alpha * x)
def softmax(x):
    e = np.exp(x - np.max(x))
    return e / e.sum()

x = np.array([-2, -1, 0, 1, 2])
print("Input:     ", x)
print("Sigmoid:   ", np.round(sigmoid(x.astype(float)), 3))
print("Tanh:      ", np.round(tanh(x.astype(float)), 3))
print("ReLU:      ", relu(x))
print("LeakyReLU: ", np.round(leaky_relu(x.astype(float)), 3))

logits = np.array([2.0, 1.0, 0.1])
print(f"\\nSoftmax({logits}) = {np.round(softmax(logits), 3)}")
print(f"Sum = {softmax(logits).sum():.4f}")`,
        codeLanguage: "python",
        exercise: "Draw a comparison chart of all activation functions over [-5, 5] using print art.",
        exerciseEn: "Draw a comparison chart of all activation functions over [-5, 5] using print art.",
        quiz: [
          { question: "Why is ReLU more popular than Sigmoid for hidden layers?", options: ["Prettier output", "Faster computation and avoids vanishing gradient", "Always gives accurate results", "Easier to code"], answer: 1, explanation: "ReLU computes instantly (just max(0,x)) and its gradient doesn't vanish for positive values, unlike Sigmoid." },
          { question: "What is the 'dying ReLU' problem?", options: ["ReLU is too slow", "Neurons permanently output 0 and stop learning", "ReLU causes overflow", "ReLU outputs are too large"], answer: 1, explanation: "When a neuron's weights push all inputs to negative values, ReLU always outputs 0, making its gradient 0, so the neuron never updates again." },
          { question: "When should you use Softmax?", options: ["Hidden layers", "Binary classification output", "Multi-class classification output", "Regression"], answer: 2, explanation: "Softmax converts logits into a probability distribution where all values sum to 1, perfect for multi-class classification." },
          { question: "What advantage does Tanh have over Sigmoid?", options: ["Faster computation", "Zero-centered output, leading to smoother gradients", "No vanishing gradient", "Larger output range"], answer: 1, explanation: "Tanh outputs range from [-1, 1], making them zero-centered. This leads to smoother gradient updates compared to Sigmoid's always-positive outputs." },
          { question: "Which activation function is used in modern Transformers (GPT, BERT)?", options: ["Sigmoid", "ReLU", "GELU", "Tanh"], answer: 2, explanation: "GELU (Gaussian Error Linear Unit) is the standard activation in Transformer architectures like BERT and GPT due to its smooth approximation of ReLU." }
        ]
      }
    ]
  },
  {
    id: "ai-loss-opt",
    title: "Loss Functions & Optimization",
    titleEn: "Loss Functions & Optimization",
    icon: "📉",
    color: "from-rose-500 to-pink-600",
    description: "MSE, Cross-Entropy, Gradient Descent",
    descriptionEn: "MSE, Cross-Entropy, Gradient Descent",
    course: "data-ai",
    lessons: [
      {
        id: "ai-loss-1", title: "Loss Functions & Gradient Descent", titleEn: "Loss Functions & Gradient Descent",
        level: 3, difficulty: "intermediate",
        theory: `**Loss Functions & Optimization — How Neural Networks Learn**

Training a neural network is essentially an optimization problem: find the weights that minimize the loss function. The loss function measures how "wrong" our predictions are.

---

**📏 Loss Functions for Regression**

**Mean Squared Error (MSE):**
\`L = (1/n) × Σ(yᵢ - ŷᵢ)²\`

- Penalizes large errors heavily (squared term)
- Sensitive to outliers
- Always non-negative, 0 = perfect prediction

**Mean Absolute Error (MAE):**
\`L = (1/n) × Σ|yᵢ - ŷᵢ|\`

- More robust to outliers than MSE
- Gradient is constant (doesn't decrease near minimum)

**Huber Loss:** Combines MSE (near 0) and MAE (far from 0) — best of both worlds.

---

**📊 Loss Functions for Classification**

**Binary Cross-Entropy (Log Loss):**
\`L = -[y·log(ŷ) + (1-y)·log(1-ŷ)]\`

- For binary classification (0 or 1)
- Heavily penalizes confident wrong predictions
- Example: If true label is 1 and model predicts 0.01, loss is very high (-log(0.01) ≈ 4.6)

**Categorical Cross-Entropy:**
\`L = -Σ yᵢ·log(ŷᵢ)\`

- For multi-class classification
- Used with Softmax output layer

**Sparse Categorical Cross-Entropy:** Same as above but takes integer labels instead of one-hot vectors.

---

**📉 Gradient Descent — The Core Optimization Algorithm**

Gradient Descent finds the minimum of the loss function by iteratively moving in the direction of steepest descent:

**Update Rule:** \`w = w - lr × ∂L/∂w\`

Where:
- \`lr\` (learning rate) controls step size
- \`∂L/∂w\` is the gradient (slope) of loss w.r.t. weight

**Analogy:** Imagine you're blindfolded on a mountain. You feel the slope under your feet and take a step downhill. Repeat until you reach the valley.

---

**🔄 Variants of Gradient Descent:**

| Variant | Batch Size | Pros | Cons |
|---------|-----------|------|------|
| Batch GD | All data | Stable convergence | Slow, memory-heavy |
| SGD | 1 sample | Fast updates | Very noisy |
| Mini-batch GD | 32-512 | Good balance | Need to tune batch size |

---

**🚀 Advanced Optimizers:**

- **Momentum:** Adds "velocity" — accelerates in consistent gradient direction
- **RMSProp:** Adapts learning rate per parameter
- **Adam:** Combines Momentum + RMSProp. **The most popular optimizer** — good defaults, works well for most problems
- **AdamW:** Adam + weight decay (better regularization)

**Learning Rate Scheduling:**
- Start high, decrease over time
- Cosine annealing, warm restarts
- Learning rate warmup (common in Transformers)

---

**⚠️ Common Problems:**

1. **Learning rate too high:** Loss oscillates or diverges (overshooting)
2. **Learning rate too low:** Training is extremely slow, may get stuck
3. **Local minima:** In practice, saddle points are more problematic than local minima
4. **Gradient explosion:** Gradients become huge → use gradient clipping`,
        theoryEn: `**Loss Functions & Optimization — How Neural Networks Learn**

---

**Regression Losses:** MSE (penalizes large errors), MAE (robust to outliers), Huber (best of both).

**Classification Losses:** Binary Cross-Entropy (binary), Categorical Cross-Entropy (multi-class).

---

**Gradient Descent:** w = w - lr × ∂L/∂w. Move in direction of steepest descent.

**Variants:** Batch GD (all data), SGD (1 sample), Mini-batch (32-512).

**Optimizers:** SGD → Momentum → RMSProp → **Adam** (most popular, combines Momentum + RMSProp).

**Problems:** LR too high → diverge. LR too low → slow. Saddle points. Gradient explosion.`,
        code: `import numpy as np

# Loss Functions
def mse(y_true, y_pred):
    return np.mean((y_true - y_pred) ** 2)

def binary_cross_entropy(y_true, y_pred):
    y_pred = np.clip(y_pred, 1e-7, 1 - 1e-7)
    return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

# Gradient Descent demo
print("📉 Gradient Descent: Finding minimum of f(x) = x²")
x = 5.0
lr = 0.3
history = []

for epoch in range(20):
    gradient = 2 * x  # derivative of x²
    x = x - lr * gradient
    loss = x ** 2
    history.append((epoch, round(x, 4), round(loss, 6)))
    if epoch < 8 or epoch >= 18:
        print(f"  Epoch {epoch:2d}: x = {x:8.4f}, loss = {loss:.6f}")

print(f"\\n✅ Converged to x ≈ {x:.6f} (optimal: 0)")`,
        codeLanguage: "python",
        exercise: "Implement gradient descent for f(x,y) = x² + 2y². Find minimum starting from (5, 3).",
        exerciseEn: "Implement gradient descent for f(x,y) = x² + 2y². Find minimum starting from (5, 3).",
        quiz: [
          { question: "What happens when learning rate is too high?", options: ["Converges faster", "Overshooting — loss oscillates or diverges", "No effect", "Always better"], answer: 1, explanation: "A high learning rate causes the optimizer to 'jump' too far, potentially overshooting the minimum and causing divergence." },
          { question: "Why is Adam the most popular optimizer?", options: ["It's the simplest", "It combines Momentum and RMSProp with adaptive learning rates", "It requires no hyperparameters", "It always finds global minimum"], answer: 1, explanation: "Adam combines the benefits of Momentum (acceleration) and RMSProp (adaptive per-parameter learning rates), working well out of the box for most problems." },
          { question: "What does Binary Cross-Entropy penalize most?", options: ["Small errors", "Confident wrong predictions", "Correct predictions", "Predictions near 0.5"], answer: 1, explanation: "If the model predicts 0.01 for a true label of 1, the loss is -log(0.01) ≈ 4.6, which is extremely high. Confident wrong predictions are penalized severely." },
          { question: "What is the difference between MSE and MAE?", options: ["They're identical", "MSE penalizes large errors more and is sensitive to outliers", "MAE is always better", "MSE works only for classification"], answer: 1, explanation: "MSE squares the errors, so a single large error contributes disproportionately. MAE treats all errors linearly, making it more robust to outliers." },
          { question: "What is Mini-batch Gradient Descent?", options: ["Uses all data per update", "Uses 1 sample per update", "Uses a small batch (32-512) per update — balances speed and stability", "Uses no data"], answer: 2, explanation: "Mini-batch GD updates weights using a subset of data (typically 32-512 samples), balancing the stability of batch GD and the speed of SGD." }
        ]
      }
    ]
  },
  {
    id: "ai-backprop",
    title: "Backpropagation",
    titleEn: "Backpropagation",
    icon: "🔙",
    color: "from-rose-500 to-pink-600",
    description: "Chain rule, backward pass, weight updates",
    descriptionEn: "Chain rule, backward pass, weight updates",
    course: "data-ai",
    lessons: [
      {
        id: "ai-bp-1", title: "Thuật toán Backpropagation", titleEn: "Backpropagation Algorithm",
        level: 3, difficulty: "intermediate",
        theory: `**Backpropagation — How Neural Networks Learn from Mistakes**

Backpropagation (back-propagation of errors) is the algorithm that makes deep learning possible. It efficiently computes gradients for all weights in a network, enabling gradient descent to update them.

---

**🔗 The Chain Rule — Mathematical Foundation**

The chain rule from calculus allows us to compute derivatives of composed functions:

If \`y = f(g(x))\`, then \`dy/dx = (dy/dg) × (dg/dx)\`

In neural networks, the loss depends on weights through multiple layers:

\`∂L/∂w₁ = ∂L/∂ŷ × ∂ŷ/∂z₂ × ∂z₂/∂a₁ × ∂a₁/∂z₁ × ∂z₁/∂w₁\`

Each term is simple to compute individually; the chain rule connects them.

---

**🔄 The Complete Training Process:**

1. **Forward Pass:** Input → compute output through all layers
2. **Compute Loss:** Compare prediction to target
3. **Backward Pass:** Compute gradients from output back to input using chain rule
4. **Update Weights:** w = w - lr × gradient

This 4-step loop repeats for thousands of iterations until loss converges.

---

**📐 Step-by-Step Example (1 Hidden Layer):**

Given: Input x → Hidden z₁ = w₁x + b₁ → a₁ = σ(z₁) → Output z₂ = w₂a₁ + b₂ → ŷ = σ(z₂)

**Forward:**
- z₁ = w₁ × x + b₁
- a₁ = σ(z₁)
- z₂ = w₂ × a₁ + b₂
- ŷ = σ(z₂)

**Backward (computing gradients):**
- ∂L/∂ŷ = -(y/ŷ) + (1-y)/(1-ŷ) [from cross-entropy]
- ∂L/∂z₂ = ŷ - y [simplified for sigmoid + cross-entropy]
- ∂L/∂w₂ = (ŷ - y) × a₁
- ∂L/∂a₁ = (ŷ - y) × w₂
- ∂L/∂z₁ = ∂L/∂a₁ × σ'(z₁)
- ∂L/∂w₁ = ∂L/∂z₁ × x

---

**⚠️ Common Problems:**

**Vanishing Gradient:**
- In deep networks, gradients multiply through many layers
- If each gradient < 1, the product → 0 exponentially
- Layers close to input barely learn
- **Solutions:** ReLU activation, BatchNorm, Skip Connections (ResNet), careful initialization

**Exploding Gradient:**
- Gradients > 1 multiply to become huge
- Weights update wildly, loss becomes NaN
- **Solutions:** Gradient clipping, proper initialization (Xavier/He), BatchNorm

---

**🏗️ Modern Improvements:**

- **Batch Normalization:** Normalizes layer outputs, stabilizes training
- **Skip/Residual Connections:** Allow gradients to flow directly through shortcuts (ResNet)
- **Layer Normalization:** Used in Transformers, normalizes across features
- **Xavier/He Initialization:** Initialize weights properly to maintain gradient magnitude
- **Gradient Clipping:** Cap gradient magnitude to prevent explosion`,
        theoryEn: `**Backpropagation — How Neural Networks Learn from Mistakes**

---

**Chain Rule:** Computes derivatives through composed functions. In NNs: ∂L/∂w = chain of partial derivatives through all layers.

**Training Loop:** Forward pass → Compute loss → Backward pass → Update weights. Repeat thousands of times.

**Vanishing Gradient:** Gradients shrink in deep networks → early layers don't learn. Fix: ReLU, BatchNorm, Skip Connections.

**Exploding Gradient:** Gradients grow huge → NaN. Fix: Gradient clipping, proper initialization.

**Modern Improvements:** BatchNorm, Skip Connections, Layer Norm, Xavier/He initialization.`,
        code: `import numpy as np

class MiniNN:
    def __init__(self):
        np.random.seed(42)
        self.w1 = np.random.randn(2, 4) * 0.5
        self.b1 = np.zeros(4)
        self.w2 = np.random.randn(4, 1) * 0.5
        self.b2 = np.zeros(1)

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    def forward(self, X):
        self.z1 = X @ self.w1 + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = self.a1 @ self.w2 + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2

    def backward(self, X, y, lr=0.5):
        m = X.shape[0]
        dz2 = self.a2 - y
        dw2 = self.a1.T @ dz2 / m
        db2 = dz2.mean(axis=0)
        dz1 = (dz2 @ self.w2.T) * self.a1 * (1 - self.a1)
        dw1 = X.T @ dz1 / m
        db1 = dz1.mean(axis=0)
        self.w2 -= lr * dw2
        self.b2 -= lr * db2
        self.w1 -= lr * dw1
        self.b1 -= lr * db1

# XOR problem
X = np.array([[0,0],[0,1],[1,0],[1,1]])
y = np.array([[0],[1],[1],[0]])

nn = MiniNN()
print("🧠 Training Neural Network on XOR")
for epoch in range(2000):
    out = nn.forward(X)
    loss = np.mean((y - out) ** 2)
    nn.backward(X, y)
    if epoch % 400 == 0:
        print(f"  Epoch {epoch}: loss = {loss:.4f}")

print(f"\\n✅ Predictions: {nn.forward(X).flatten().round(2)}")
print(f"   Expected:    {y.flatten()}")`,
        codeLanguage: "python",
        exercise: "Add batch normalization to MiniNN and compare convergence speed with/without BN.",
        exerciseEn: "Add batch normalization to MiniNN and compare convergence speed with/without BN.",
        quiz: [
          { question: "What does the Chain Rule do in backpropagation?", options: ["Creates new networks", "Computes gradients through multiple layers by multiplying partial derivatives", "Initializes weights", "Selects learning rate"], answer: 1, explanation: "The chain rule allows us to compute the derivative of the loss with respect to any weight by multiplying the chain of partial derivatives through all intermediate layers." },
          { question: "What causes vanishing gradients?", options: ["Learning rate too high", "Gradients multiply through many layers, each < 1, product → 0", "Too much data", "Using ReLU"], answer: 1, explanation: "When gradients at each layer are less than 1, multiplying them through many layers causes the product to shrink exponentially toward zero." },
          { question: "How do Skip Connections (ResNet) help?", options: ["Make networks smaller", "Allow gradients to flow directly through shortcuts, preventing vanishing", "Remove the need for backprop", "Speed up forward pass only"], answer: 1, explanation: "Skip connections provide a direct path for gradients to flow back through the network, bypassing layers that might diminish the gradient." },
          { question: "What is the correct order of the training loop?", options: ["Backward → Forward → Loss → Update", "Forward → Loss → Backward → Update", "Update → Forward → Backward → Loss", "Loss → Forward → Update → Backward"], answer: 1, explanation: "The training loop is: Forward pass (compute predictions) → Compute loss → Backward pass (compute gradients) → Update weights." },
          { question: "What does gradient clipping prevent?", options: ["Vanishing gradients", "Exploding gradients — caps gradient magnitude", "Overfitting", "Underfitting"], answer: 1, explanation: "Gradient clipping limits the maximum magnitude of gradients, preventing them from growing too large and causing numerical instability." }
        ]
      }
    ]
  },
  {
    id: "ai-cnn",
    title: "CNNs (Convolutional Neural Networks)",
    titleEn: "CNNs",
    icon: "🖼️",
    color: "from-rose-500 to-pink-600",
    description: "Convolution, Pooling, Image Recognition",
    descriptionEn: "Convolution, Pooling, Image Recognition",
    course: "data-ai",
    lessons: [
      {
        id: "ai-cnn-1", title: "Convolution & Pooling", titleEn: "Convolution & Pooling",
        level: 3, difficulty: "intermediate",
        theory: `**Convolutional Neural Networks (CNNs) — Vision AI**

CNNs are specialized neural networks designed for processing grid-like data, especially images. They have revolutionized computer vision since AlexNet (2012).

---

**🔍 Why CNNs Instead of Regular Networks?**

A 224×224 RGB image has 224 × 224 × 3 = **150,528** pixels. A fully connected layer would need millions of parameters just for the first layer — impractical and prone to overfitting.

CNNs solve this with three key ideas:
1. **Local connectivity:** Each neuron connects to a small region, not the entire image
2. **Weight sharing:** The same filter is applied across the entire image
3. **Translation invariance:** A cat is a cat regardless of its position in the image

---

**📦 Convolution Layer**

A convolution layer applies small filters (kernels) that slide across the input:

- **Kernel/Filter:** A small matrix (e.g., 3×3) of learnable weights
- **Stride:** How many pixels the filter moves at each step (default: 1)
- **Padding:** Adding zeros around the border to control output size
  - "valid" (no padding): output shrinks
  - "same" (zero padding): output same size as input
- **Output: Feature Map** — highlights specific patterns

**What kernels detect:**
- Early layers: edges, corners, colors, textures
- Middle layers: parts (eyes, wheels, curves)
- Deep layers: objects, faces, scenes

**Parameters:** A 3×3 kernel on 3-channel input = 3 × 3 × 3 + 1(bias) = **28 parameters** — dramatically fewer than fully connected.

---

**🏊 Pooling Layer**

Pooling reduces spatial dimensions (downsampling):

- **Max Pooling:** Takes the maximum value in each window
  - Preserves the strongest feature activation
  - Most common: 2×2 with stride 2 (halves dimensions)
- **Average Pooling:** Takes the mean value
  - Smoother, preserves overall patterns
- **Global Average Pooling:** Reduces entire feature map to a single value (used before final classification)

**Why pool?**
- Reduces computation for subsequent layers
- Provides translation invariance
- Prevents overfitting by reducing parameters

---

**🏗️ Classic CNN Architecture:**

\`Input → [Conv → ReLU → Pool] × N → Flatten → Dense → Output\`

**Famous Architectures:**
| Architecture | Year | Key Innovation |
|-------------|------|---------------|
| LeNet-5 | 1998 | Pioneer CNN for digits |
| AlexNet | 2012 | Deep CNN + GPU training |
| VGGNet | 2014 | Very deep (16-19 layers) with 3×3 filters |
| GoogLeNet | 2014 | Inception modules (parallel filters) |
| ResNet | 2015 | Skip connections (152 layers!) |
| EfficientNet | 2019 | Compound scaling |
| Vision Transformer | 2020 | Applies Transformer to images |

---

**📊 Key Formulas:**

Output size = (Input - Kernel + 2×Padding) / Stride + 1

Example: Input 32×32, Kernel 5×5, Padding 0, Stride 1:
Output = (32 - 5 + 0) / 1 + 1 = **28×28**`,
        theoryEn: `**CNNs — Vision AI**

CNNs process grid-like data (images) using local connectivity, weight sharing, and translation invariance.

**Convolution:** Small learnable filters slide across input, detecting patterns (edges → parts → objects).

**Pooling:** Downsamples spatial dimensions. Max Pooling (strongest activation), Average Pooling (smooth).

**Architecture:** Input → [Conv → ReLU → Pool] × N → Flatten → Dense → Output.

**Famous models:** LeNet → AlexNet → VGG → ResNet → EfficientNet → Vision Transformer.

**Output formula:** (Input - Kernel + 2×Padding) / Stride + 1.`,
        code: `import numpy as np

image = np.array([
    [0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0],
    [0,1,0,0,0,0,1,0],
    [0,1,0,1,1,0,1,0],
    [0,1,0,0,0,0,1,0],
    [0,0,1,1,1,1,0,0],
    [0,0,0,0,0,0,0,0],
])

kernels = {
    "Edge": np.array([[-1,-1,-1],[-1,8,-1],[-1,-1,-1]]),
    "Blur": np.ones((3,3)) / 9,
    "Sharpen": np.array([[0,-1,0],[-1,5,-1],[0,-1,0]]),
}

def convolve2d(img, kernel):
    h, w = img.shape
    kh, kw = kernel.shape
    out = np.zeros((h-kh+1, w-kw+1))
    for i in range(out.shape[0]):
        for j in range(out.shape[1]):
            out[i,j] = np.sum(img[i:i+kh, j:j+kw] * kernel)
    return np.clip(out, 0, 1)

print("📷 Original (7x8):")
for row in image:
    print("  " + " ".join("⬛" if p else "⬜" for p in row))

for name, kernel in kernels.items():
    result = convolve2d(image.astype(float), kernel)
    print(f"\\n🔍 After {name}:")
    for row in result:
        print("  " + " ".join("⬛" if p > 0.3 else "⬜" for p in row))`,
        codeLanguage: "python",
        exercise: "Implement 2x2 max pooling with stride 2. Compare sizes before/after pooling.",
        exerciseEn: "Implement 2x2 max pooling with stride 2. Compare sizes before/after pooling.",
        quiz: [
          { question: "What do convolution layers detect?", options: ["Colors only", "Visual features (edges, textures, patterns) at increasing abstraction", "Image size", "Metadata"], answer: 1, explanation: "Conv filters detect visual features: edges and textures in early layers, parts in middle layers, and complex objects in deep layers." },
          { question: "Why use pooling layers?", options: ["To add more parameters", "To reduce spatial dimensions, computation, and prevent overfitting", "To increase image resolution", "To change colors"], answer: 1, explanation: "Pooling reduces the spatial size of feature maps, decreasing computation for subsequent layers, providing translation invariance, and helping prevent overfitting." },
          { question: "What is the output size of a 32×32 input with 5×5 kernel, no padding, stride 1?", options: ["32×32", "28×28", "27×27", "30×30"], answer: 1, explanation: "Output = (32 - 5 + 2×0) / 1 + 1 = 28. So the output is 28×28." },
          { question: "What key innovation did ResNet introduce?", options: ["Bigger kernels", "Skip/residual connections allowing 152+ layers", "Dropout", "Batch normalization"], answer: 1, explanation: "ResNet introduced skip connections that allow gradients to flow directly through shortcuts, enabling training of extremely deep networks (152+ layers)." },
          { question: "Why do CNNs use weight sharing?", options: ["To increase parameters", "The same filter detects the same pattern anywhere in the image, reducing parameters", "To make training slower", "Convention only"], answer: 1, explanation: "A single filter slides across the entire image, detecting the same pattern (e.g., edges) regardless of position. This dramatically reduces the number of parameters." }
        ]
      }
    ]
  },
  {
    id: "ai-rnn",
    title: "RNNs & Sequences",
    titleEn: "RNNs & Sequences",
    icon: "🔁",
    color: "from-rose-500 to-pink-600",
    description: "Recurrent Networks, LSTM, GRU",
    descriptionEn: "Recurrent Networks, LSTM, GRU",
    course: "data-ai",
    lessons: [
      {
        id: "ai-rnn-1", title: "RNN & LSTM", titleEn: "RNN & LSTM",
        level: 4, difficulty: "advanced",
        theory: `**Recurrent Neural Networks — Processing Sequential Data**

RNNs are designed for data where **order matters**: text, time series, audio, video frames.

---

**🔄 Vanilla RNN**

Unlike feedforward networks, RNNs have a **hidden state** that acts as "memory":

\`hₜ = tanh(Wₓ·xₜ + Wₕ·hₜ₋₁ + b)\`

- \`xₜ\`: input at time step t
- \`hₜ₋₁\`: hidden state from previous step
- \`hₜ\`: new hidden state (combines current input + past memory)

The same weights (Wₓ, Wₕ) are shared across all time steps.

**Problem:** Vanilla RNNs struggle with **long-range dependencies** due to vanishing/exploding gradients. They effectively "forget" information from many steps ago.

---

**🧠 LSTM (Long Short-Term Memory)**

LSTMs solve the long-term memory problem with a sophisticated gating mechanism:

**Cell State (Cₜ):** The "highway" that carries information across many time steps with minimal modification.

**Three Gates (all learned during training):**

1. **Forget Gate (fₜ):** Decides what to remove from cell state
   - \`fₜ = σ(Wf·[hₜ₋₁, xₜ] + bf)\`
   - Output ∈ [0,1] for each cell state element
   - 0 = completely forget, 1 = completely keep

2. **Input Gate (iₜ):** Decides what new information to add
   - \`iₜ = σ(Wi·[hₜ₋₁, xₜ] + bi)\`
   - \`C̃ₜ = tanh(Wc·[hₜ₋₁, xₜ] + bc)\` — candidate new values

3. **Output Gate (oₜ):** Decides what to output as hidden state
   - \`oₜ = σ(Wo·[hₜ₋₁, xₜ] + bo)\`
   - \`hₜ = oₜ × tanh(Cₜ)\`

**Cell State Update:**
\`Cₜ = fₜ × Cₜ₋₁ + iₜ × C̃ₜ\`

**Analogy:** Think of LSTM as a conveyor belt:
- Forget gate: removes items from the belt
- Input gate: adds new items
- Output gate: selects what to show

---

**⚡ GRU (Gated Recurrent Unit)**

A simplified version of LSTM with 2 gates instead of 3:

- **Reset Gate (rₜ):** Controls how much past information to forget
- **Update Gate (zₜ):** Controls how much to update the hidden state

\`hₜ = (1 - zₜ) × hₜ₋₁ + zₜ × h̃ₜ\`

**GRU vs LSTM:**
- GRU has ~33% fewer parameters
- Performance is often comparable
- GRU trains faster
- LSTM may be better for very long sequences

---

**📊 Applications:**

| Application | Type | Example |
|------------|------|---------|
| Language Modeling | Many-to-Many | Next word prediction |
| Sentiment Analysis | Many-to-One | Review → positive/negative |
| Machine Translation | Seq-to-Seq | English → French |
| Speech Recognition | Many-to-Many | Audio → text |
| Time Series Forecasting | Many-to-One | Stock price prediction |

---

**⚠️ Note:** While RNNs/LSTMs were the gold standard for sequence tasks, **Transformers** have largely replaced them due to their ability to process sequences in parallel and capture long-range dependencies more effectively.`,
        theoryEn: `**RNNs — Processing Sequential Data**

**Vanilla RNN:** Hidden state hₜ = tanh(Wₓxₜ + Wₕhₜ₋₁ + b). Problem: vanishing gradients → can't remember long-term.

**LSTM:** Cell state + 3 gates (Forget, Input, Output) solve long-term memory. Cell state is a "highway" for information flow.

**GRU:** Simplified LSTM with 2 gates. Fewer parameters, comparable performance, trains faster.

**Applications:** Language modeling, translation, sentiment analysis, speech recognition, time series.

**Note:** Transformers have largely replaced RNNs/LSTMs for most sequence tasks.`,
        code: `import numpy as np

class SimpleRNN:
    def __init__(self, input_size, hidden_size):
        self.Wx = np.random.randn(input_size, hidden_size) * 0.1
        self.Wh = np.random.randn(hidden_size, hidden_size) * 0.1
        self.b = np.zeros(hidden_size)
        self.hidden_size = hidden_size

    def forward(self, sequence):
        h = np.zeros(self.hidden_size)
        states = []
        for x in sequence:
            h = np.tanh(x @ self.Wx + h @ self.Wh + self.b)
            states.append(h.copy())
        return states, h

# Text encoding demo
vocab = {'hello': 0, 'world': 1, 'AI': 2, 'is': 3, 'great': 4}
embed_size = 3
embeddings = np.random.randn(len(vocab), embed_size) * 0.5

sentence = ['hello', 'world', 'AI', 'is', 'great']
encoded = np.array([embeddings[vocab[w]] for w in sentence])

rnn = SimpleRNN(input_size=embed_size, hidden_size=4)
states, final = rnn.forward(encoded)

print("🔁 RNN Processing Sequence")
for i, word in enumerate(sentence):
    print(f"  Step {i}: '{word}' → hidden = {np.round(states[i], 3)}")
print(f"\\n🎯 Final hidden state: {np.round(final, 3)}")`,
        codeLanguage: "python",
        exercise: "Implement next-character prediction: train RNN on 'abcabc' to predict the next character.",
        exerciseEn: "Implement next-character prediction: train RNN on 'abcabc' to predict the next character.",
        quiz: [
          { question: "What problem does LSTM solve that vanilla RNN cannot?", options: ["Speed", "Long-term memory — vanishing gradient", "Too many parameters", "Can't process text"], answer: 1, explanation: "LSTM uses Cell State and gates to maintain information over long sequences, solving the vanishing gradient problem that prevents vanilla RNNs from learning long-range dependencies." },
          { question: "How many gates does an LSTM cell have?", options: ["1", "2", "3 (Forget, Input, Output)", "4"], answer: 2, explanation: "LSTM has 3 gates: Forget Gate (what to remove), Input Gate (what to add), and Output Gate (what to output)." },
          { question: "What is the advantage of GRU over LSTM?", options: ["Always more accurate", "Fewer parameters (~33% less), trains faster, comparable performance", "Can handle longer sequences", "No gates needed"], answer: 1, explanation: "GRU combines the forget and input gates into a single update gate, reducing parameters by ~33% while achieving comparable performance to LSTM." },
          { question: "Why have Transformers largely replaced RNNs?", options: ["Transformers are simpler", "Transformers process sequences in parallel and capture long-range dependencies better", "RNNs are obsolete in all cases", "Transformers use less memory"], answer: 1, explanation: "RNNs must process sequences step-by-step (sequential), while Transformers process all positions simultaneously (parallel), making them faster and better at capturing distant relationships." },
          { question: "What role does the Cell State play in LSTM?", options: ["Stores the output", "Acts as a 'highway' carrying information across many time steps with minimal change", "Controls the learning rate", "Stores the input only"], answer: 1, explanation: "The Cell State is the key innovation of LSTM — it runs through the entire sequence with only linear interactions (multiply and add), allowing information to flow unchanged across many steps." }
        ]
      }
    ]
  },
  {
    id: "ai-transformer",
    title: "Transformers & Attention",
    titleEn: "Transformers & Attention",
    icon: "⚡",
    color: "from-rose-500 to-pink-600",
    description: "Self-Attention, Multi-Head, Positional Encoding",
    descriptionEn: "Self-Attention, Multi-Head, Positional Encoding",
    course: "data-ai",
    lessons: [
      {
        id: "ai-trans-1", title: "Self-Attention Mechanism", titleEn: "Self-Attention Mechanism",
        level: 4, difficulty: "advanced",
        theory: `**Transformers — The Architecture Behind Modern AI**

The Transformer, introduced in "Attention Is All You Need" (2017), is arguably the most important architecture in AI history. It powers GPT, BERT, T5, Claude, Gemini, and virtually all modern language models.

---

**🎯 The Problem Transformers Solve**

RNNs process sequences step-by-step, creating a bottleneck:
- Slow (can't parallelize)
- Long-range dependencies are hard to learn (information must pass through every step)

Transformers eliminate this by processing **all positions simultaneously** using **self-attention**.

---

**🔑 Self-Attention Mechanism**

Self-attention lets each token "look at" every other token to determine relevance.

**Three Projections from Each Input Token:**
- **Q (Query):** "What am I looking for?"
- **K (Key):** "What do I contain?"
- **V (Value):** "What information do I provide?"

**Computation:**
\`Attention(Q, K, V) = softmax(QKᵀ / √dₖ) × V\`

- \`QKᵀ\`: Dot product measures similarity between query and key
- \`√dₖ\`: Scaling factor prevents dot products from growing too large
- \`softmax\`: Converts scores to attention weights (probabilities)
- \`× V\`: Weighted sum of values using attention weights

**Example:** In "The cat sat on the mat":
- "sat" pays high attention to "cat" (who sat?) and "mat" (where?)
- "the" pays moderate attention to nearby nouns

---

**👥 Multi-Head Attention**

Instead of one attention computation, run **h parallel attention heads**:

- Each head has its own Q, K, V weight matrices
- Each head learns different patterns:
  - Head 1 might learn syntactic relationships
  - Head 2 might learn semantic similarity
  - Head 3 might learn positional proximity

\`MultiHead(Q,K,V) = Concat(head₁, ..., headₕ) × Wₒ\`

Typical configurations: 8 heads (BERT), 12 heads (GPT-2), 96 heads (GPT-3).

---

**📍 Positional Encoding**

Since Transformers process all positions simultaneously, they have no inherent notion of order. Positional encodings are added to give position information:

**Sinusoidal Encoding (original):**
- \`PE(pos, 2i) = sin(pos / 10000^(2i/d))\`
- \`PE(pos, 2i+1) = cos(pos / 10000^(2i/d))\`

**Learned Positional Embeddings:** Used in GPT, BERT — learn position representations during training.

**RoPE (Rotary Positional Encoding):** Used in modern LLMs (Llama) — encodes relative positions.

---

**🏗️ Full Transformer Architecture:**

**Encoder (BERT-style):**
\`Input → Embedding + PosEnc → [Multi-Head Attention → Add&Norm → FFN → Add&Norm] × N → Output\`

**Decoder (GPT-style):**
\`Input → Embedding + PosEnc → [Masked Multi-Head Attention → Add&Norm → FFN → Add&Norm] × N → Output\`

**Key Components:**
- **Add & Norm:** Residual connection + Layer Normalization (stabilizes training)
- **FFN:** Feed-Forward Network (2 linear layers with activation between)
- **Masked Attention:** Prevents looking at future tokens during generation

---

**📊 Transformer Family:**

| Model | Type | Innovation |
|-------|------|-----------|
| BERT | Encoder-only | Masked language modeling, bidirectional |
| GPT | Decoder-only | Autoregressive generation |
| T5 | Encoder-Decoder | Text-to-text framework |
| ViT | Vision | Applies Transformer to image patches |`,
        theoryEn: `**Transformers — The Architecture Behind Modern AI**

**Self-Attention:** Each token looks at all other tokens. Q·Kᵀ measures similarity, softmax normalizes, multiply by V.

**Multi-Head Attention:** Multiple parallel attention heads, each learning different patterns.

**Positional Encoding:** Gives position information (sinusoidal, learned, or RoPE).

**Architecture:** [Multi-Head Attention → Add&Norm → FFN → Add&Norm] × N.

**Family:** BERT (encoder), GPT (decoder), T5 (encoder-decoder), ViT (vision).`,
        code: `import numpy as np

def softmax(x, axis=-1):
    e = np.exp(x - np.max(x, axis=axis, keepdims=True))
    return e / e.sum(axis=axis, keepdims=True)

def self_attention(X, d_model):
    Wq = np.random.randn(d_model, d_model) * 0.1
    Wk = np.random.randn(d_model, d_model) * 0.1
    Wv = np.random.randn(d_model, d_model) * 0.1

    Q = X @ Wq
    K = X @ Wk
    V = X @ Wv

    scores = Q @ K.T / np.sqrt(d_model)
    attention_weights = softmax(scores)
    output = attention_weights @ V
    return output, attention_weights

# Simulate tokens
tokens = ["The", "cat", "sat", "on", "mat"]
d_model = 4
X = np.random.randn(len(tokens), d_model)

output, weights = self_attention(X, d_model)

print("⚡ Self-Attention")
print(f"Input shape: {X.shape}")
print(f"Output shape: {output.shape}")
print(f"\\n🔍 Attention Matrix:")
print(f"{'':>6}", end="")
for t in tokens: print(f"{t:>6}", end="")
print()
for i, t in enumerate(tokens):
    print(f"{t:>6}", end="")
    for j in range(len(tokens)):
        print(f"{weights[i,j]:6.2f}", end="")
    print()`,
        codeLanguage: "python",
        exercise: "Implement Multi-Head Attention with 2 heads. Compare attention patterns between heads.",
        exerciseEn: "Implement Multi-Head Attention with 2 heads. Compare attention patterns between heads.",
        quiz: [
          { question: "What allows each token in Self-Attention to do?", options: ["Only see previous token", "Look at all other tokens in the sequence", "Ignore context", "Only see the nearest token"], answer: 1, explanation: "Self-Attention computes attention scores between every pair of tokens, allowing each token to consider the entire sequence." },
          { question: "Why divide by √dₖ in the attention formula?", options: ["Makes computation faster", "Prevents dot products from growing too large, stabilizing softmax", "Reduces parameters", "Purely aesthetic"], answer: 1, explanation: "As dimension d grows, dot products grow in magnitude, pushing softmax into regions with tiny gradients. Dividing by √dₖ keeps values in a reasonable range." },
          { question: "What is the purpose of Multi-Head Attention?", options: ["Speed up training", "Each head learns different relationship patterns (syntax, semantics, proximity)", "Reduce parameters", "Replace positional encoding"], answer: 1, explanation: "Multiple heads allow the model to simultaneously attend to different types of relationships — one head might capture syntax while another captures meaning." },
          { question: "How does GPT differ from BERT architecturally?", options: ["GPT uses encoder, BERT uses decoder", "GPT uses decoder (autoregressive), BERT uses encoder (bidirectional)", "They're identical", "GPT doesn't use attention"], answer: 1, explanation: "GPT is decoder-only (generates left-to-right with masked attention), while BERT is encoder-only (sees entire sequence bidirectionally)." },
          { question: "Why do Transformers need Positional Encoding?", options: ["To reduce computation", "They process all positions simultaneously and need explicit position information", "To handle different languages", "To prevent overfitting"], answer: 1, explanation: "Unlike RNNs that inherently process sequences step-by-step, Transformers see all positions at once and need positional encodings to know word order." }
        ]
      }
    ]
  },
  {
    id: "ai-llm-prompt",
    title: "LLMs & Prompt Engineering",
    titleEn: "LLMs & Prompt Engineering",
    icon: "💬",
    color: "from-rose-500 to-pink-600",
    description: "Tokenization, Prompting, Few-shot, Chain-of-Thought",
    descriptionEn: "Tokenization, Prompting, Few-shot, Chain-of-Thought",
    course: "data-ai",
    lessons: [
      {
        id: "ai-llm-1", title: "Prompt Engineering", titleEn: "Prompt Engineering",
        level: 2, difficulty: "beginner",
        theory: `**Prompt Engineering — The Art of Communicating with AI**

Prompt Engineering is the practice of designing effective inputs (prompts) to get desired outputs from Large Language Models. It's one of the most practical and immediately useful AI skills.

---

**📝 Core Prompting Techniques:**

**1. Zero-Shot Prompting**
Ask the model directly without examples:
> "Classify this review as positive or negative: 'The food was amazing!'"

Best when: The task is straightforward and well-defined.

**2. Few-Shot Prompting**
Provide 2-5 examples before your question:
> "'Love it!' → positive
> 'Terrible!' → negative
> 'Broke after 1 day' → ?"

Best when: The task needs pattern demonstration. The model learns the format from examples.

**3. Chain-of-Thought (CoT)**
Ask the model to reason step by step:
> "Let's think step by step: If there are 3 boxes with 12 items each, and we sell 15..."

This dramatically improves performance on math, logic, and complex reasoning tasks. Studies show it can improve accuracy by 20-40% on reasoning tasks.

**4. Role Prompting**
Assign a specific role/persona:
> "You are a senior Python developer with 15 years of experience. Review this code..."

The model adapts its language, depth, and perspective to match the role.

**5. Self-Consistency**
Ask the same question multiple times with CoT, then take the majority answer. Reduces errors from a single reasoning chain.

---

**🏗️ Anatomy of a Great Prompt:**

| Component | Description | Example |
|-----------|-------------|---------|
| **Context** | Background information | "Given a dataset of customer reviews..." |
| **Role** | Who the AI should be | "As a data scientist..." |
| **Task** | What to do | "Classify each review as positive/negative" |
| **Format** | Expected output structure | "Return JSON with 'sentiment' and 'confidence'" |
| **Constraints** | Limitations | "Use only the provided data. Max 100 words." |
| **Examples** | Input/output pairs | "Example: 'Great!' → positive" |

---

**⚠️ Anti-Patterns to Avoid:**

1. **Vague prompts:** "Tell me about AI" → Too broad, unfocused response
2. **No format specification:** Get inconsistent output formats
3. **Contradictory instructions:** "Be brief. Include all details." → Model confused
4. **Assuming context:** Model doesn't know your project/codebase unless you tell it
5. **Single long prompt:** Break complex tasks into steps

---

**🔧 Advanced Techniques:**

- **ReAct (Reasoning + Acting):** Model reasons, then takes action, then observes results
- **Tree of Thought:** Explores multiple reasoning paths
- **Structured Output:** Force JSON/XML output for programmatic use
- **System Prompts:** Set persistent behavior for an entire conversation
- **Temperature Control:** Low (0.1) = deterministic/factual, High (0.9) = creative/varied

---

**💡 Tokenization — How LLMs See Text:**

LLMs don't read characters or words — they read **tokens**:
- "Hello" → 1 token
- "Artificial Intelligence" → 2 tokens
- "supercalifragilistic" → 4+ tokens

**Why it matters:**
- API pricing is per token
- Context window limits are in tokens (e.g., 128K tokens for GPT-4)
- Rare words use more tokens → may be understood less well`,
        theoryEn: `**Prompt Engineering — Communicating with AI**

**Techniques:** Zero-shot (direct ask), Few-shot (with examples), Chain-of-Thought (step by step), Role prompting (assign persona).

**Great Prompt = Context + Role + Task + Format + Constraints + Examples.**

**Anti-Patterns:** Vague prompts, no format spec, contradictory instructions.

**Advanced:** ReAct, Tree of Thought, Structured Output, Temperature control.

**Tokenization:** LLMs read tokens, not words. Pricing and context limits are in tokens.`,
        code: `# Prompt Engineering Patterns
prompts = {
    "zero_shot": "Classify this review as positive or negative: 'Great product!'",
    "few_shot": """Classify reviews:
'Love it!' → positive
'Terrible quality' → negative
'Works perfectly' → positive
'Broke after 1 day' → ?""",
    "chain_of_thought": """Solve step by step:
Q: If a store has 3 boxes with 12 items each, and sells 15 items, how many remain?
A: Let me think step by step:
1. Total items: 3 × 12 = 36
2. Items sold: 15
3. Remaining: 36 - 15 = 21
Answer: 21 items""",
    "role": "You are a senior Python developer. Review this code for bugs, performance issues, and security vulnerabilities.",
}

for name, prompt in prompts.items():
    print(f"📝 {name.upper()}")
    print(f"   {prompt[:80]}...")
    print()

# Prompt scoring
def score_prompt(prompt):
    score = 0
    checks = [
        ("Has context", any(w in prompt.lower() for w in ["you are", "context", "given"])),
        ("Has specific task", any(w in prompt.lower() for w in ["classify", "generate", "analyze", "review"])),
        ("Has format spec", any(w in prompt.lower() for w in ["json", "list", "table", "format"])),
        ("Has examples", "→" in prompt or "example" in prompt.lower()),
    ]
    for label, passed in checks:
        score += 25 if passed else 0
        print(f"  {'✅' if passed else '❌'} {label}")
    return score

print("🎯 Prompt Quality Score:")
print(f"   Score: {score_prompt(prompts['few_shot'])}%")`,
        codeLanguage: "python",
        exercise: "Build a Prompt Template Engine: take input (role, task, format, examples) and generate an optimized prompt.",
        exerciseEn: "Build a Prompt Template Engine: take input (role, task, format, examples) and generate an optimized prompt.",
        quiz: [
          { question: "What is Few-Shot prompting?", options: ["Asking few questions", "Providing the AI with example input-output pairs before the actual question", "Limiting output length", "Single question only"], answer: 1, explanation: "Few-shot provides 2-5 examples of input→output so the AI learns the pattern before processing your actual question." },
          { question: "Why does Chain-of-Thought improve accuracy?", options: ["Makes the prompt shorter", "Forces the model to reason step-by-step, reducing errors on complex tasks", "Uses more tokens", "Changes the model"], answer: 1, explanation: "CoT prompting makes the model break down complex problems into intermediate steps, improving accuracy by 20-40% on reasoning tasks." },
          { question: "What temperature value makes AI output most deterministic?", options: ["1.0", "0.5", "0.1 (low = deterministic)", "2.0"], answer: 2, explanation: "Low temperature (0.1) makes the model more deterministic and factual, while high temperature (0.9+) increases creativity and randomness." },
          { question: "What are tokens in LLMs?", options: ["Gold coins", "Sub-word units that LLMs read — not characters or full words", "Programming variables", "API keys"], answer: 1, explanation: "LLMs break text into tokens (sub-word units). Common words are 1 token, rare words may be split into multiple tokens. Pricing and context limits are measured in tokens." },
          { question: "Which prompting anti-pattern should you avoid?", options: ["Using examples", "Specifying output format", "Giving vague instructions without clear task or format", "Assigning a role"], answer: 2, explanation: "Vague prompts like 'Tell me about AI' produce unfocused responses. Good prompts have clear context, task, format, and constraints." }
        ]
      }
    ]
  },
  {
    id: "ai-finetuning",
    title: "Fine-tuning & Transfer Learning",
    titleEn: "Fine-tuning & Transfer Learning",
    icon: "🎯",
    color: "from-rose-500 to-pink-600",
    description: "Fine-tune pre-trained models, LoRA, PEFT",
    descriptionEn: "Fine-tune pre-trained models, LoRA, PEFT",
    course: "data-ai",
    lessons: [
      {
        id: "ai-ft-1", title: "Transfer Learning & Fine-tuning", titleEn: "Transfer Learning & Fine-tuning",
        level: 4, difficulty: "advanced",
        theory: `**Transfer Learning & Fine-tuning — Standing on the Shoulders of Giants**

Training a large neural network from scratch requires massive data and compute. Transfer Learning lets us leverage pre-trained models and adapt them to specific tasks with minimal effort.

---

**🔄 What is Transfer Learning?**

Instead of training from scratch, start with a model already trained on a large dataset (e.g., ImageNet for vision, Common Crawl for language) and adapt it to your specific task.

**Why it works:** Early layers learn universal features (edges, grammar patterns) that are useful across many tasks. Only the task-specific layers need to be retrained.

---

**📋 Three Strategies:**

**1. Feature Extraction (Freeze Everything)**
- Freeze all pre-trained layers
- Only train a new output head
- Best when: Very little data, task similar to pre-training
- Example: Use BERT embeddings as fixed features for text classification

**2. Fine-tuning (Partial Unfreezing)**
- Freeze early layers, unfreeze later layers + new head
- Early layers keep general features, later layers adapt
- Best when: Moderate data, somewhat different task
- Common pattern: Unfreeze top 2-3 layers

**3. Full Fine-tuning**
- Unfreeze all layers, train everything
- Use small learning rate to avoid catastrophic forgetting
- Best when: Lots of data, very different domain

---

**📊 Strategy Decision Matrix:**

| Data Amount | Task Similarity | Strategy |
|------------|----------------|----------|
| Very little | Similar | Feature Extraction |
| Moderate | Somewhat similar | Fine-tune top layers |
| Lots | Different domain | Full fine-tuning |
| Lots | Similar | Fine-tune or Feature Extraction |

---

**🔧 LoRA (Low-Rank Adaptation)**

The breakthrough technique for efficiently fine-tuning LLMs:

**Problem:** GPT-3 has 175B parameters. Full fine-tuning requires enormous GPU memory.

**LoRA Solution:**
- Instead of updating the full weight matrix W (d × d), add two small matrices:
  - A (d × r) and B (r × d), where rank r << d (typically r = 8-64)
- W_new = W_frozen + A × B
- Only train A and B — **99.9% fewer trainable parameters**

**Why LoRA works:** Weight updates during fine-tuning tend to be low-rank (not all dimensions change equally). LoRA captures this efficiently.

**QLoRA:** Combines LoRA with 4-bit quantization, enabling fine-tuning of 65B+ models on a single GPU.

---

**🛠️ PEFT (Parameter-Efficient Fine-Tuning) Methods:**

| Method | Approach | Parameters Added |
|--------|----------|-----------------|
| LoRA | Low-rank weight matrices | 0.1-1% |
| Adapter Layers | Small bottleneck layers between existing layers | 1-5% |
| Prefix Tuning | Learnable prefix tokens | 0.1% |
| Prompt Tuning | Learnable soft prompt embeddings | 0.01% |

---

**⚠️ Key Considerations:**

- **Catastrophic Forgetting:** Fine-tuning can make the model forget pre-trained knowledge. Use low learning rate and early stopping.
- **Data Quality > Quantity:** 1000 high-quality examples often beats 100K noisy ones.
- **Evaluation:** Always compare fine-tuned model against the base model and prompt engineering baseline.`,
        theoryEn: `**Transfer Learning — Standing on the Shoulders of Giants**

**Strategies:** Feature Extraction (freeze all), Fine-tuning (partial unfreeze), Full Fine-tuning (unfreeze all).

**LoRA:** Adds small trainable matrices (rank r), reducing trainable parameters by 99.9%. W_new = W_frozen + A×B.

**QLoRA:** LoRA + 4-bit quantization → fine-tune 65B+ models on a single GPU.

**PEFT Methods:** LoRA, Adapter Layers, Prefix Tuning, Prompt Tuning.

**Key:** Avoid catastrophic forgetting (low LR), quality > quantity, always evaluate against baseline.`,
        code: `import numpy as np

# Simulated Transfer Learning
class PretrainedModel:
    def __init__(self):
        np.random.seed(42)
        self.layer1 = np.random.randn(4, 8)  # general features
        self.layer2 = np.random.randn(8, 6)  # mid features
        self.layer3 = np.random.randn(6, 3)  # task-specific
        self.frozen = [True, True, False]

    def summary(self):
        layers = [self.layer1, self.layer2, self.layer3]
        total = sum(l.size for l in layers)
        trainable = sum(l.size for l, f in zip(layers, self.frozen) if not f)
        print(f"📊 Model Summary:")
        for i, (l, f) in enumerate(zip(layers, self.frozen)):
            status = "❄️ frozen" if f else "🔥 trainable"
            print(f"  Layer {i+1}: {l.shape} — {status} ({l.size} params)")
        print(f"  Total: {total} params | Trainable: {trainable} ({trainable/total*100:.1f}%)")

# Feature extraction (freeze all but last)
model = PretrainedModel()
model.summary()

# LoRA simulation
print("\\n🎯 LoRA Adaptation:")
rank = 2
lora_A = np.random.randn(6, rank) * 0.01  # down projection
lora_B = np.random.randn(rank, 3) * 0.01  # up projection
lora_params = lora_A.size + lora_B.size
original_params = model.layer3.size
print(f"  Original layer3: {original_params} params")
print(f"  LoRA adapters: {lora_params} params ({lora_params/original_params*100:.1f}%)")
print(f"  Reduction: {original_params/lora_params:.1f}x fewer trainable params")`,
        codeLanguage: "python",
        exercise: "Implement full LoRA: add LoRA adapters to a 2-layer network and train on new data.",
        exerciseEn: "Implement full LoRA: add LoRA adapters to a 2-layer network and train on new data.",
        quiz: [
          { question: "What does LoRA reduce compared to full fine-tuning?", options: ["Accuracy", "Number of trainable parameters (by 99.9%) while maintaining quality", "Inference speed", "Data requirements"], answer: 1, explanation: "LoRA adds small low-rank matrices, training only ~0.1% of original parameters while achieving quality close to full fine-tuning." },
          { question: "When should you use Feature Extraction instead of Full Fine-tuning?", options: ["When you have lots of data", "When you have very little data and the task is similar to pre-training", "When you want best accuracy", "Always"], answer: 1, explanation: "With little data, full fine-tuning risks overfitting. Feature extraction keeps proven pre-trained features and only trains a simple output head." },
          { question: "What is catastrophic forgetting?", options: ["Forgetting to save the model", "Fine-tuning makes the model forget its pre-trained knowledge", "Running out of memory", "Data loss"], answer: 1, explanation: "When fine-tuned aggressively, a model can lose the general knowledge it learned during pre-training. Use low learning rates and early stopping to prevent this." },
          { question: "What does QLoRA add on top of LoRA?", options: ["More parameters", "4-bit quantization, enabling fine-tuning of huge models on a single GPU", "Better accuracy", "Faster training always"], answer: 1, explanation: "QLoRA quantizes the base model to 4-bit precision, dramatically reducing memory requirements so that 65B+ parameter models can be fine-tuned on a single consumer GPU." },
          { question: "Why does Transfer Learning work?", options: ["Pre-trained models are always better", "Early layers learn universal features (edges, grammar) reusable across tasks", "It's faster to download", "Random initialization is bad"], answer: 1, explanation: "Models pre-trained on large datasets learn general features in early layers (edges for vision, grammar patterns for text) that transfer well to many downstream tasks." }
        ]
      }
    ]
  },
  {
    id: "ai-rag",
    title: "RAG Systems",
    titleEn: "RAG Systems",
    icon: "🔗",
    color: "from-rose-500 to-pink-600",
    description: "Retrieval-Augmented Generation, Embeddings, Vector DB",
    descriptionEn: "Retrieval-Augmented Generation, Embeddings, Vector DB",
    course: "data-ai",
    lessons: [
      {
        id: "ai-rag-1", title: "RAG Pipeline", titleEn: "RAG Pipeline",
        level: 5, difficulty: "advanced",
        theory: `**RAG (Retrieval-Augmented Generation) — Grounding AI in Facts**

RAG is one of the most important practical AI patterns. It combines the knowledge retrieval capabilities of search engines with the language generation abilities of LLMs to produce accurate, up-to-date, and verifiable answers.

---

**❓ Why RAG?**

LLMs have limitations:
- **Knowledge cutoff:** Training data has a date limit
- **Hallucination:** May generate plausible but incorrect information
- **No source citation:** Can't point to where information came from
- **Domain specificity:** Don't know your company's internal documents

RAG solves all of these by retrieving relevant documents first, then generating answers based on retrieved context.

---

**🔄 The RAG Pipeline — Three Phases:**

**Phase 1: Indexing (Offline — done once)**
1. **Collect documents** (PDFs, web pages, databases, internal docs)
2. **Chunk** documents into smaller pieces (100-500 tokens each)
3. **Embed** each chunk into a vector using an embedding model
4. **Store** vectors in a Vector Database (Pinecone, Weaviate, ChromaDB, Qdrant)

**Phase 2: Retrieval (At query time)**
1. **Embed** the user's query using the same embedding model
2. **Search** the vector database for the most similar chunks
3. **Retrieve** top-k most relevant chunks (typically k=3-10)
4. **Re-rank** (optional) — use a cross-encoder to improve relevance

**Phase 3: Generation**
1. **Construct prompt:** System instructions + Retrieved chunks + User question
2. **Send to LLM** for answer generation
3. **Post-process:** Add citations, format output

---

**🧩 Key Components Explained:**

**Embeddings:**
- Dense vector representations of text meaning
- Similar texts → similar vectors (close in vector space)
- Models: OpenAI text-embedding-3, Cohere embed, BGE, E5
- Dimension: typically 768-3072

**Vector Databases:**
- Specialized databases for similarity search (not SQL)
- Use approximate nearest neighbor (ANN) algorithms: HNSW, IVF, ScaNN
- Managed: Pinecone, Weaviate Cloud
- Open-source: ChromaDB, Qdrant, Milvus, FAISS (library)

**Chunking Strategies:**
| Strategy | Description | Best For |
|----------|-------------|----------|
| Fixed-size | Split every N characters/tokens | Simple documents |
| Recursive | Split by headers, paragraphs, sentences | Structured docs |
| Semantic | Split at topic boundaries | Long articles |
| Sliding window | Overlapping chunks | Dense content |

---

**📊 RAG vs Fine-tuning:**

| Aspect | RAG | Fine-tuning |
|--------|-----|-------------|
| Data updates | Real-time (just re-index) | Need to retrain |
| Source citation | ✅ Can point to source | ❌ Not possible |
| Hallucination | Reduced (grounded) | Can still hallucinate |
| Cost | Lower (no training) | Higher (GPU time) |
| Best for | Q&A, knowledge bases | Style/behavior changes |

---

**⚠️ Common Pitfalls:**
- **Chunk size too large:** Retrieval includes irrelevant info
- **Chunk size too small:** Loses context
- **Poor embedding model:** Retrieval quality degrades
- **No re-ranking:** Top similarity ≠ most relevant
- **Stuffing too much context:** Exceeds context window, LLM gets confused`,
        theoryEn: `**RAG — Grounding AI in Facts**

**Why RAG?** LLMs hallucinate, have knowledge cutoffs, and can't cite sources. RAG fixes this by retrieving relevant documents before generating.

**Pipeline:** Indexing (chunk → embed → store) → Retrieval (query → search → rank) → Generation (context + query → LLM → answer).

**Components:** Embeddings (text → vectors), Vector DBs (Pinecone, ChromaDB), Chunking (fixed, recursive, semantic).

**RAG vs Fine-tuning:** RAG for knowledge/Q&A (real-time updates, citations). Fine-tuning for style/behavior changes.

**Pitfalls:** Bad chunk size, poor embeddings, no re-ranking, too much context.`,
        code: `import numpy as np

# Simple RAG simulation
class SimpleVectorDB:
    def __init__(self):
        self.documents = []
        self.embeddings = []

    def embed(self, text):
        np.random.seed(hash(text) % 2**31)
        return np.random.randn(8)

    def add(self, doc):
        self.documents.append(doc)
        self.embeddings.append(self.embed(doc))

    def search(self, query, top_k=2):
        q_emb = self.embed(query)
        scores = []
        for i, emb in enumerate(self.embeddings):
            sim = np.dot(q_emb, emb) / (np.linalg.norm(q_emb) * np.linalg.norm(emb))
            scores.append((sim, i))
        scores.sort(reverse=True)
        return [(self.documents[i], round(s, 3)) for s, i in scores[:top_k]]

# Build knowledge base
db = SimpleVectorDB()
docs = [
    "Python is a high-level programming language created by Guido van Rossum.",
    "Machine Learning uses algorithms to learn patterns from data.",
    "SQL is used to query and manage relational databases.",
    "Neural Networks are inspired by biological brain neurons.",
    "Data Engineering focuses on building data pipelines and infrastructure.",
]

for doc in docs:
    db.add(doc)

# RAG query
query = "What is machine learning?"
results = db.search(query, top_k=2)

print("🔗 RAG Pipeline Demo")
print(f"📝 Query: {query}")
print(f"\\n🔍 Retrieved ({len(results)} chunks):")
for doc, score in results:
    print(f"  [{score:+.3f}] {doc}")

# Generate answer with context
context = "\\n".join([doc for doc, _ in results])
print(f"\\n🤖 Generated Answer (using context):")
print(f"  Based on the retrieved information: {results[0][0]}")`,
        codeLanguage: "python",
        exercise: "Implement chunking strategy: split a long text into 100-char chunks with 20-char overlap.",
        exerciseEn: "Implement chunking strategy: split a long text into 100-char chunks with 20-char overlap.",
        quiz: [
          { question: "What does RAG need to work?", options: ["Only an LLM", "Vector DB + LLM + Embedding Model", "Only a SQL database", "A fine-tuned model"], answer: 1, explanation: "RAG needs 3 components: an Embedding model to create vectors, a Vector DB to store and search them, and an LLM to generate answers from retrieved context." },
          { question: "What is the main advantage of RAG over fine-tuning for knowledge tasks?", options: ["RAG is always more accurate", "RAG can update knowledge in real-time and cite sources", "RAG is cheaper to run", "RAG doesn't need data"], answer: 1, explanation: "RAG can be updated by simply re-indexing documents (no retraining needed) and can point to the exact source of information — key advantages for knowledge-intensive tasks." },
          { question: "What happens if chunks are too large?", options: ["Better accuracy", "Retrieved context includes too much irrelevant information", "Faster retrieval", "No effect"], answer: 1, explanation: "Large chunks mix relevant and irrelevant information, making it harder for the LLM to find the actual answer within the retrieved context." },
          { question: "What is the purpose of re-ranking in RAG?", options: ["Make retrieval slower", "Improve relevance of retrieved documents beyond vector similarity", "Remove all documents", "Change the query"], answer: 1, explanation: "Vector similarity isn't always the best measure of relevance. Re-rankers (cross-encoders) score query-document pairs more accurately to improve the final set of retrieved documents." },
          { question: "How are embeddings used in RAG?", options: ["To generate text", "To convert text into vectors for similarity search", "To tokenize text", "To fine-tune models"], answer: 1, explanation: "Embedding models convert text into dense vector representations where semantically similar texts are close in vector space, enabling efficient similarity search." }
        ]
      }
    ]
  },
  {
    id: "ai-ethics-gov",
    title: "AI Ethics & Governance",
    titleEn: "AI Ethics & Governance",
    icon: "⚖️",
    color: "from-rose-500 to-pink-600",
    description: "Bias, Fairness, Transparency, Regulations",
    descriptionEn: "Bias, Fairness, Transparency, Regulations",
    course: "data-ai",
    lessons: [
      {
        id: "ai-eth-1", title: "Bias Detection & Fairness", titleEn: "Bias Detection & Fairness",
        level: 3, difficulty: "intermediate",
        theory: `**AI Ethics & Governance — Building Responsible AI**

As AI systems increasingly make decisions that affect people's lives (hiring, loans, medical diagnosis, criminal justice), ensuring they are fair, transparent, and accountable is not just ethical — it's a business and legal requirement.

---

**🔍 Types of AI Bias:**

**1. Data Bias (most common)**
- Training data doesn't represent the real-world population
- Example: A hiring AI trained mostly on male resumes learns to penalize female applicants
- Historical bias: Past discrimination encoded in historical data

**2. Algorithmic Bias**
- The model amplifies existing biases in data
- Feedback loops: biased predictions → biased data collection → more bias

**3. Measurement Bias**
- Features used as proxies for protected characteristics
- Example: ZIP code as proxy for race in lending decisions

**4. Deployment Bias**
- Model used in a context different from what it was designed for
- Example: Facial recognition trained on one demographic deployed globally

---

**📏 Fairness Metrics:**

No single metric captures all aspects of fairness. Different metrics can even contradict each other.

**Demographic Parity:**
- All groups receive positive predictions at equal rates
- P(ŷ=1 | Group A) = P(ŷ=1 | Group B)
- Limitation: Ignores actual base rates

**Equal Opportunity:**
- All groups have equal True Positive Rates
- P(ŷ=1 | y=1, Group A) = P(ŷ=1 | y=1, Group B)
- "If you deserve it, you get it regardless of group"

**Equalized Odds:**
- Equal TPR *and* FPR across groups
- Stronger than Equal Opportunity

**Calibration:**
- Predicted probabilities match actual outcomes across groups
- "When the model says 80% chance, it should be right 80% of the time for all groups"

**Impossibility Theorem:** You generally cannot satisfy all fairness metrics simultaneously. Choose the most appropriate metric for your use case.

---

**📜 Regulations & Standards:**

| Regulation | Region | Key Requirements |
|-----------|--------|-----------------|
| **EU AI Act** | EU | Risk-based classification (Unacceptable, High, Limited, Minimal) |
| **GDPR** | EU | Right to explanation of automated decisions |
| **NYC Local Law 144** | NYC | Audits required for AI hiring tools |
| **NIST AI RMF** | US | Risk management framework |
| **IEEE 7000** | Global | Ethical design standard |

---

**🔒 Explainability & Transparency:**

- **LIME (Local Interpretable Model-agnostic Explanations):** Explains individual predictions
- **SHAP (SHapley Additive exPlanations):** Game-theory based feature importance
- **Attention Visualization:** Shows which input parts the model focuses on
- **Model Cards:** Documentation describing model limitations, intended use, and bias evaluations

---

**🛡️ Best Practices:**

1. **Diverse training data:** Audit and balance representation
2. **Regular bias audits:** Test across demographic groups
3. **Human oversight:** AI recommends, humans decide (for high-stakes)
4. **Documentation:** Model cards, data sheets, impact assessments
5. **Monitoring:** Continuous bias tracking in production
6. **Red teaming:** Adversarial testing for harmful outputs
7. **Feedback mechanisms:** Allow affected individuals to contest decisions`,
        theoryEn: `**AI Ethics — Building Responsible AI**

**Bias Types:** Data bias (unrepresentative), Algorithmic (amplifies bias), Measurement (proxy features), Deployment (wrong context).

**Fairness Metrics:** Demographic Parity (equal rates), Equal Opportunity (equal TPR), Equalized Odds, Calibration. No single metric captures all fairness — choose based on context.

**Regulations:** EU AI Act (risk-based), GDPR (right to explanation), NYC Law 144 (hiring audits).

**Explainability:** LIME, SHAP, Attention visualization, Model Cards.

**Best Practices:** Diverse data, regular audits, human oversight, documentation, monitoring, red teaming.`,
        code: `import numpy as np

# Bias Audit Tool
def audit_model(predictions, demographics):
    groups = set(demographics)
    print("⚖️ Fairness Audit Report")
    print("=" * 50)
    
    rates = {}
    for group in groups:
        mask = [d == group for d in demographics]
        group_preds = [p for p, m in zip(predictions, mask) if m]
        rate = sum(group_preds) / len(group_preds) if group_preds else 0
        rates[group] = rate
        print(f"  {group}: positive rate = {rate:.2%} ({sum(group_preds)}/{len(group_preds)})")
    
    # Demographic parity check
    max_rate = max(rates.values())
    min_rate = min(rates.values())
    disparity = max_rate - min_rate
    threshold = 0.1
    
    print(f"\\n📊 Demographic Parity:")
    print(f"  Disparity: {disparity:.2%}")
    print(f"  Threshold: {threshold:.2%}")
    print(f"  Status: {'✅ PASS' if disparity <= threshold else '❌ FAIL'}")
    
    return rates

# Simulate biased model
np.random.seed(42)
n = 200
demographics = np.random.choice(["Group_A", "Group_B"], n)
# Intentionally biased: Group_A gets higher positive rate
predictions = []
for d in demographics:
    if d == "Group_A":
        predictions.append(int(np.random.random() < 0.7))
    else:
        predictions.append(int(np.random.random() < 0.4))

rates = audit_model(predictions, demographics)

# Mitigation: threshold adjustment
print("\\n🔧 Mitigation: Threshold Adjustment")
target_rate = np.mean(predictions)
print(f"  Target rate: {target_rate:.2%}")`,
        codeLanguage: "python",
        exercise: "Build a bias mitigation tool that implements threshold adjustment and resampling strategies.",
        exerciseEn: "Build a bias mitigation tool that implements threshold adjustment and resampling strategies.",
        quiz: [
          { question: "What is the most common source of AI bias?", options: ["Bad algorithms", "Training data that doesn't represent the real-world population", "Too many parameters", "Using Python"], answer: 1, explanation: "Data bias is the most common source — when training data doesn't represent all groups equally, the model learns and amplifies these disparities." },
          { question: "Why can't you satisfy all fairness metrics simultaneously?", options: ["Not enough compute", "The Impossibility Theorem — different metrics can contradict each other", "It's always possible", "Regulations prevent it"], answer: 1, explanation: "The Impossibility Theorem shows that certain fairness metrics (like Demographic Parity and Calibration) are mathematically incompatible — improving one can worsen another." },
          { question: "What does the EU AI Act classify?", options: ["Programming languages", "AI systems by risk level (Unacceptable, High, Limited, Minimal)", "Data formats", "Cloud providers"], answer: 1, explanation: "The EU AI Act categorizes AI systems into risk tiers: Unacceptable (banned), High (strict requirements), Limited (transparency), Minimal (no restrictions)." },
          { question: "What is SHAP used for in AI ethics?", options: ["Training models", "Explaining which features contributed to a specific prediction", "Collecting data", "Deploying models"], answer: 1, explanation: "SHAP (SHapley Additive exPlanations) uses game theory to explain how each feature contributes to an individual prediction, enabling transparency and accountability." },
          { question: "What is a feedback loop in the context of AI bias?", options: ["A type of neural network", "Biased predictions create biased data, which further biases the model", "A training technique", "A debugging tool"], answer: 1, explanation: "When a biased model's predictions are used to collect new training data (e.g., biased policing → more arrests in certain areas → more data → more bias), the bias compounds over time." }
        ]
      }
    ]
  }
];
