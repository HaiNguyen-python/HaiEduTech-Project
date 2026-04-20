// Deep Learning curriculum — 5 expert-level lessons (English long-read)
// Targets: Neural Networks → CNN → RNN/LSTM → Transformers/LLMs
// Prerequisites: Python Basics, Linear Algebra, ML Fundamentals
import type { ExtendedProgrammingModule } from "./types";

export const dlModules: ExtendedProgrammingModule[] = [
  {
    id: "dl-foundations",
    title: "Deep Learning",
    titleEn: "Deep Learning",
    icon: "🧠",
    color: "from-pink-500 to-rose-600",
    description: "From neurons to Transformers — the engine behind modern AI",
    descriptionEn: "From neurons to Transformers — the engine behind modern AI",
    course: "dl",
    lessons: [
      // ========================================================================
      // Lesson 1 — Introduction to Neural Networks
      // ========================================================================
      {
        id: "dl-1",
        title: "Introduction to Neural Networks",
        titleEn: "Introduction to Neural Networks",
        level: 4,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — Before starting Deep Learning, you should be comfortable with: **Python basics** (functions, NumPy arrays), **Linear Algebra** (vectors, matrix multiplication, dot product), and the **ML Linear Regression** lesson in this curriculum.

## 1. Why "Neural" Networks?

A neural network is, at its core, a **stack of linear regressions glued together by non-linear functions**. The biological metaphor is loose — what really matters is the math: each layer turns its inputs into a richer representation that the next layer can use to spot more complex patterns.

A single linear model \`y = w·x + b\` can only draw a **straight line**. Real-world problems (recognising a cat in a photo, translating French to English, predicting stock moves) require **curves, corners, and decision regions**. Stacking many tiny linear units with a non-linearity in between unlocks that expressive power.

## 2. Anatomy of a single neuron

Each neuron does **three things** in order:

1. **Weighted sum** — multiply every input by its weight and add a bias: \`z = w₁·x₁ + w₂·x₂ + ... + wₙ·xₙ + b\`
2. **Activation** — pass \`z\` through a non-linear function \`a = σ(z)\` to introduce curvature.
3. **Forward** — send \`a\` to the neurons in the next layer.

\`\`\`mermaid
graph LR
    X1[x1] -->|w1| S((Σ + b))
    X2[x2] -->|w2| S
    X3[x3] -->|w3| S
    S --> A[Activation σ]
    A --> O[Output a]
\`\`\`

## 3. Activation functions — the key to non-linearity

Without an activation, **N stacked layers collapse into a single linear layer** (matrix multiplication of matrices is still a matrix). The activation is what makes deep models *deep*.

| Function | Formula | Output range | When to use |
|---|---|---|---|
| **Sigmoid** | \`1 / (1 + e^-z)\` | (0, 1) | Binary classification output, gates in LSTMs |
| **Tanh** | \`(eᶻ - e⁻ᶻ)/(eᶻ + e⁻ᶻ)\` | (-1, 1) | Hidden layers in older RNNs |
| **ReLU** | \`max(0, z)\` | [0, ∞) | **Default for hidden layers** — fast, no vanishing gradient on the positive side |
| **Leaky ReLU** | \`max(0.01·z, z)\` | (-∞, ∞) | When ReLU "dies" (neurons stuck at 0) |
| **Softmax** | \`eᶻᵢ / Σ eᶻⱼ\` | (0, 1), sums to 1 | Multi-class classification output |

> **Rule of thumb (2025)**: use **ReLU** in hidden layers, **Softmax** for multi-class output, **Sigmoid** for binary output. Reach for GELU or SiLU only when training Transformers.

## 4. Layers and the forward pass

A *fully connected* (dense) network is just a sequence of layers. For an image classifier with 784 input pixels, 128 hidden units, and 10 output classes:

\`Input (784) → Dense(128, ReLU) → Dense(64, ReLU) → Dense(10, Softmax)\`

Every arrow is a matrix multiplication. The whole forward pass for one sample is:

\`\`\`
h1 = ReLU(W1 · x + b1)        # shape: (128,)
h2 = ReLU(W2 · h1 + b2)       # shape: (64,)
ŷ  = Softmax(W3 · h2 + b3)    # shape: (10,)  — class probabilities
\`\`\`

## 5. Real-world example — Vietnamese number-plate recognition

A modern automatic number-plate reader (ANPR) used at parking gates and toll stations across Vietnam runs **two networks**:

1. A **detector** finds the plate's bounding box in the camera frame.
2. A **classifier** reads each character (0-9, A-Z, plus Vietnamese letters Đ).

Both are neural networks. The classifier alone needs only ~3 dense layers if the characters are pre-cropped — but in practice we use a CNN (Lesson 3) for noise robustness.

## 6. Key Concept

> 🎯 **Key Concept** — A neural network is a **chain of (linear → non-linear) blocks**. Linearity gives speed and trainability; the activation gives expressivity. Without the activation, depth is meaningless.`,
        theoryEn: "",
        code: `# A 3-layer neural network from scratch — no frameworks, just NumPy
# This shows what PyTorch/TensorFlow do under the hood for you.
import numpy as np

def relu(z):
    return np.maximum(0, z)

def softmax(z):
    # Numerically stable softmax (subtract max to avoid overflow)
    e = np.exp(z - np.max(z, axis=1, keepdims=True))
    return e / np.sum(e, axis=1, keepdims=True)

# Toy data: 4 samples, 3 features each, 2 output classes
X = np.array([[0.5, 0.1, -0.3],
              [0.9, -0.4, 0.2],
              [-0.1, 0.8, 0.7],
              [0.3, 0.5, -0.6]])

# Random weights (in real training these are learned via backprop)
np.random.seed(42)
W1, b1 = np.random.randn(3, 4) * 0.1, np.zeros(4)   # 3 -> 4 hidden
W2, b2 = np.random.randn(4, 3) * 0.1, np.zeros(3)   # 4 -> 3 hidden
W3, b3 = np.random.randn(3, 2) * 0.1, np.zeros(2)   # 3 -> 2 output

# Forward pass
h1 = relu(X @ W1 + b1)
h2 = relu(h1 @ W2 + b2)
y_hat = softmax(h2 @ W3 + b3)

print("Predicted class probabilities:")
print(y_hat.round(3))
# Each row sums to 1 — these are real probabilities for class 0 and class 1.`,
        codeLanguage: "python",
        exercise: "Modify the network above to use **Tanh** instead of ReLU in the hidden layers. Run it and observe how the output probabilities change. Then try removing the activation entirely (replace `relu(z)` with `z`) — what happens, and why does the network become equivalent to a single linear layer?",
        exerciseEn: "",
        quiz: [
          {
            question: "Why is a non-linear activation function essential between dense layers?",
            options: [
              "It speeds up matrix multiplication",
              "Without it, stacking layers collapses into a single linear transformation",
              "It removes the need for a bias term",
              "It guarantees the loss is convex",
            ],
            answer: 1,
            explanation: "Stacked linear operations remain linear (W₂(W₁x + b₁) + b₂ is still affine). The non-linearity is what gives a deep network its expressive power.",
          },
          {
            question: "Which activation is the modern default for hidden layers in feed-forward networks?",
            options: ["Sigmoid", "Tanh", "ReLU", "Softmax"],
            answer: 2,
            explanation: "ReLU is fast (just `max(0, z)`), avoids vanishing gradients on the positive side, and trains well in practice. Sigmoid/Tanh saturate; Softmax is for the output layer of multi-class problems.",
          },
          {
            question: "An image classifier outputs probabilities for 10 classes. Which final-layer activation should you use?",
            options: ["ReLU", "Sigmoid", "Tanh", "Softmax"],
            answer: 3,
            explanation: "Softmax produces a probability distribution that sums to 1 across all 10 classes — exactly what multi-class classification requires.",
          },
        ],
      },

      // ========================================================================
      // Lesson 2 — Building a Model with PyTorch
      // ========================================================================
      {
        id: "dl-2",
        title: "Building a Model with PyTorch",
        titleEn: "Building a Model with PyTorch",
        level: 4,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — Lesson 1 (Neural Networks) and the **ML Linear Regression** lesson.

## 1. Why a framework?

In the previous lesson we wrote a forward pass by hand. Training also needs the **backward pass** (gradients), an **optimizer** (gradient descent variants), and **GPU acceleration**. Writing all of that by hand for every model is impractical.

A deep-learning framework gives you:

- **Tensors** — N-dimensional arrays that live on CPU or GPU.
- **Autograd** — automatic gradient computation through any computation you write.
- **Optimizers** — SGD, Adam, AdamW with one line of code.
- **Layers** — pre-built Dense, Conv, LSTM, Attention modules.

The two industry standards in 2025-2026 are **PyTorch** (research, fastest growing in production) and **TensorFlow / Keras** (still common in legacy and mobile). The APIs are 90% similar; we use PyTorch here because it reads like normal Python.

## 2. The four steps of every PyTorch program

\`\`\`mermaid
graph LR
    A[1. Data] --> B[2. Model]
    B --> C[3. Loss + Optimizer]
    C --> D[4. Train loop]
    D -->|epoch++| C
\`\`\`

1. **Data** — wrap your inputs in \`torch.tensor\` (and ideally a \`DataLoader\` for batching).
2. **Model** — subclass \`nn.Module\` and implement \`forward(x)\`.
3. **Loss + Optimizer** — pick a criterion (e.g. \`MSELoss\` for regression) and an optimizer (\`Adam\` is a safe default).
4. **Train loop** — repeat: forward → loss → backward → optimizer.step.

## 3. The training loop, line by line

\`\`\`python
for epoch in range(epochs):
    optimizer.zero_grad()        # reset gradients from previous step
    y_hat = model(X)             # forward pass
    loss = criterion(y_hat, y)   # compare prediction to truth
    loss.backward()              # autograd computes gradients
    optimizer.step()             # update weights
\`\`\`

The order \`zero_grad → forward → backward → step\` is non-negotiable. Forgetting \`zero_grad()\` is the **#1 PyTorch bug** — gradients from previous batches accumulate and your loss explodes.

## 4. Picking a loss function

| Task | Loss | PyTorch class |
|---|---|---|
| Regression (continuous output) | Mean Squared Error | \`nn.MSELoss\` |
| Binary classification | Binary Cross-Entropy | \`nn.BCEWithLogitsLoss\` |
| Multi-class classification | Cross-Entropy | \`nn.CrossEntropyLoss\` |

> **Trap**: \`CrossEntropyLoss\` already applies Softmax internally. If your model also ends with a Softmax layer, you'll apply it **twice** and training will silently underperform. Output **raw logits** and let the loss handle Softmax.

## 5. Real-world example — Predicting Hanoi apartment prices

You have a CSV with 5 features per apartment (area, bedrooms, district, age, distance to city centre). The same training loop below scales from this toy regression to a 100-million-parameter LLM — only the model definition changes.

## 6. Key Concept

> 🎯 **Key Concept** — Every PyTorch project follows the **Data → Model → Loss/Optimizer → Train Loop** pattern. Master that loop and you can train anything from linear regression to GPT-class models — the model definition changes, the loop does not.`,
        theoryEn: "",
        code: `# Linear regression in PyTorch — the smallest possible deep-learning program.
# Prediction target: y = 2x + 1  (we let the network learn 2 and 1 from data).
import torch
import torch.nn as nn

# 1. Data ----------------------------------------------------------------
torch.manual_seed(0)
X = torch.linspace(-1, 1, 100).unsqueeze(1)    # shape: (100, 1)
y = 2 * X + 1 + 0.1 * torch.randn_like(X)      # noisy ground truth

# 2. Model ---------------------------------------------------------------
class LinearModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(in_features=1, out_features=1)

    def forward(self, x):
        return self.fc(x)

model = LinearModel()

# 3. Loss + Optimizer ----------------------------------------------------
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.05)

# 4. Train loop ----------------------------------------------------------
for epoch in range(200):
    optimizer.zero_grad()
    y_hat = model(X)
    loss = criterion(y_hat, y)
    loss.backward()
    optimizer.step()
    if epoch % 50 == 0:
        print(f"Epoch {epoch:3d} | loss = {loss.item():.4f}")

# Inspect what the network learned
w = model.fc.weight.item()
b = model.fc.bias.item()
print(f"\\nLearned: y = {w:.3f} * x + {b:.3f}    (true: y = 2.000 * x + 1.000)")`,
        codeLanguage: "python",
        exercise: "Extend the model to **two input features** (e.g. area and bedrooms) and generate synthetic data with `y = 3*x1 - 1.5*x2 + 0.5`. Confirm the trained weights are close to (3, -1.5) and the bias is close to 0.5. Then change the optimizer from `Adam` to `SGD(lr=0.1)` and observe how the loss curve changes.",
        exerciseEn: "",
        quiz: [
          {
            question: "What is the correct order of calls inside a PyTorch training step?",
            options: [
              "forward → optimizer.step → loss → backward → zero_grad",
              "zero_grad → forward → loss → backward → optimizer.step",
              "backward → forward → zero_grad → optimizer.step → loss",
              "loss → forward → backward → optimizer.step → zero_grad",
            ],
            answer: 1,
            explanation: "Always reset gradients first, then forward pass, compute the loss, backpropagate, and finally update weights. Forgetting `zero_grad` is the most common PyTorch bug.",
          },
          {
            question: "You are training a 10-class image classifier. Which combination is correct?",
            options: [
              "Final layer: Softmax + loss: CrossEntropyLoss",
              "Final layer: raw logits (no activation) + loss: CrossEntropyLoss",
              "Final layer: ReLU + loss: MSELoss",
              "Final layer: Sigmoid + loss: CrossEntropyLoss",
            ],
            answer: 1,
            explanation: "`nn.CrossEntropyLoss` applies log-softmax internally, so the model should output raw logits. Adding Softmax yourself doubles the operation and harms training.",
          },
          {
            question: "What does `loss.backward()` do?",
            options: [
              "Updates the weights using gradient descent",
              "Computes gradients of the loss with respect to every learnable parameter",
              "Resets gradients to zero",
              "Runs the model in evaluation mode",
            ],
            answer: 1,
            explanation: "`backward()` only **computes** gradients (autograd). The weights are then updated by `optimizer.step()`.",
          },
        ],
      },

      // ========================================================================
      // Lesson 3 — Convolutional Neural Networks
      // ========================================================================
      {
        id: "dl-3",
        title: "Convolutional Neural Networks (CNN)",
        titleEn: "Convolutional Neural Networks (CNN)",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — Lessons 1 and 2.

## 1. Why dense layers fail on images

A 224×224 colour photo has 224·224·3 = **150,528 pixels**. A first dense layer with 1,000 hidden units would need ~150 million weights *for the first layer alone*. Worse, dense layers treat pixel (0,0) as completely unrelated to pixel (0,1) — they ignore **spatial structure**.

Convolutional Neural Networks (CNNs) solve both problems with two ideas:

- **Local receptive fields** — each neuron sees only a small patch (e.g. 3×3) of the input.
- **Weight sharing** — the same small filter slides across the whole image.

The result: a single 3×3 filter has only **9 + 1 = 10 weights**, yet it can detect (say) a vertical edge anywhere in the image.

## 2. The convolution operation in one picture

\`\`\`mermaid
graph LR
    I[Input image<br/>5x5] --> C[3x3 filter<br/>slides across]
    C --> F[Feature map<br/>3x3]
    F --> P[MaxPool 2x2]
    P --> D[Smaller, denser<br/>feature map]
\`\`\`

A **filter** (also called a kernel) is a small matrix. At each position you multiply element-wise with the input patch underneath, sum the result, and write it into the **feature map**. Slide the filter by 1 pixel (the *stride*) and repeat. Different filters specialise in different patterns: edges, corners, textures, then later — eyes, wheels, faces.

## 3. The standard CNN pipeline

\`Conv → ReLU → Conv → ReLU → MaxPool → ... → Flatten → Dense → Softmax\`

| Layer | Purpose |
|---|---|
| **Conv2d** | Extract local patterns with learnable filters |
| **ReLU** | Add non-linearity (same as before) |
| **MaxPool2d** | Down-sample by keeping the strongest activation in each window — gives translation tolerance and shrinks compute |
| **Flatten** | Turn the 2-D feature map into a 1-D vector |
| **Dense** | Final classifier |

A single Conv layer uses a **bank** of filters (e.g. 32 or 64). Each filter produces one feature map, so the output of \`Conv2d(in=3, out=32)\` has 32 channels.

## 4. Modern CNN architectures (2025)

- **ResNet** — adds *skip connections* so gradients flow through 50+ layers without vanishing. Still the workhorse of computer vision.
- **EfficientNet** — scales depth, width, and resolution together for the best accuracy-per-FLOP.
- **ConvNeXt** — proves a well-designed CNN can match Vision Transformers on ImageNet.
- **Vision Transformers (ViT)** — covered in Lesson 5; treat an image as a sequence of patches.

## 5. Real-world example — Vietnamese licence-plate OCR

A real ANPR pipeline used at Hanoi parking lots:

1. **YOLO** (a CNN-based detector) finds plate bounding boxes — runs at 60 fps on a Jetson Nano.
2. A second CNN (3 Conv blocks + 2 Dense layers, ~200K parameters) classifies each cropped character into 0-9 / A-Z / Đ.
3. The whole pipeline fits in 2 MB and runs offline at the gate.

The same architecture style underpins iPhone Face ID, Tesla Autopilot lane detection, and medical X-ray triage.

## 6. Key Concept

> 🎯 **Key Concept** — CNNs swap "every pixel talks to every neuron" for "small filter, slid everywhere". This **dramatically** reduces parameters while preserving spatial structure — the reason computer vision exploded after 2012.`,
        theoryEn: "",
        code: `# Tiny CNN for MNIST-style 28x28 grayscale digits — written in PyTorch.
# Architecture: Conv -> ReLU -> Pool -> Conv -> ReLU -> Pool -> Flatten -> Dense -> Logits
import torch
import torch.nn as nn
import torch.nn.functional as F

class TinyCNN(nn.Module):
    def __init__(self, num_classes: int = 10):
        super().__init__()
        # Block 1: 1 input channel -> 16 feature maps
        self.conv1 = nn.Conv2d(in_channels=1, out_channels=16, kernel_size=3, padding=1)
        # Block 2: 16 -> 32 feature maps
        self.conv2 = nn.Conv2d(in_channels=16, out_channels=32, kernel_size=3, padding=1)
        # After two 2x2 pooling stages, a 28x28 image becomes 7x7 with 32 channels
        self.fc1 = nn.Linear(in_features=32 * 7 * 7, out_features=128)
        self.fc2 = nn.Linear(in_features=128, out_features=num_classes)

    def forward(self, x):
        x = F.relu(self.conv1(x))           # (B, 16, 28, 28)
        x = F.max_pool2d(x, kernel_size=2)  # (B, 16, 14, 14)
        x = F.relu(self.conv2(x))           # (B, 32, 14, 14)
        x = F.max_pool2d(x, kernel_size=2)  # (B, 32, 7, 7)
        x = torch.flatten(x, start_dim=1)   # (B, 1568)
        x = F.relu(self.fc1(x))             # (B, 128)
        return self.fc2(x)                  # (B, 10)  raw logits

# Quick sanity check on a fake batch of 4 grayscale images
model = TinyCNN()
fake_batch = torch.randn(4, 1, 28, 28)
logits = model(fake_batch)
print("Output shape:", logits.shape)        # (4, 10)
print("Total parameters:", sum(p.numel() for p in model.parameters()))`,
        codeLanguage: "python",
        exercise: "Add a **third** convolutional block (`Conv 32 -> 64`, ReLU, MaxPool) before the dense layers. Recalculate the input size of `fc1` (hint: a 28x28 image becomes 3x3 after three 2x2 pools — 28 / 8 = 3 with padding losses). Run the model on a fake batch and report the new total parameter count.",
        exerciseEn: "",
        quiz: [
          {
            question: "Why are CNNs preferred over fully connected networks for images?",
            options: [
              "They have more parameters and therefore higher accuracy",
              "They use weight sharing and local receptive fields, which exploit spatial structure with far fewer parameters",
              "They eliminate the need for activation functions",
              "They only work on grayscale images",
            ],
            answer: 1,
            explanation: "A 3x3 filter slid across the whole image has just 10 weights but can detect a pattern anywhere — orders of magnitude fewer parameters than a dense layer connecting every pixel to every neuron.",
          },
          {
            question: "What is the role of MaxPooling in a CNN?",
            options: [
              "Add non-linearity",
              "Down-sample feature maps and provide a small amount of translation tolerance",
              "Increase the number of channels",
              "Compute gradients during backpropagation",
            ],
            answer: 1,
            explanation: "MaxPool keeps the strongest activation in each window, halving the spatial dimensions and making the representation slightly invariant to small shifts in the input.",
          },
          {
            question: "After applying `Conv2d(in=3, out=32)` followed by ReLU to a 64x64 RGB image (with padding=1, stride=1), what is the output shape (channels, height, width)?",
            options: ["(3, 64, 64)", "(32, 62, 62)", "(32, 64, 64)", "(64, 32, 32)"],
            answer: 2,
            explanation: "Padding=1 with a 3x3 kernel preserves the spatial size, and `out=32` produces 32 feature maps. So the output is (32, 64, 64).",
          },
        ],
      },

      // ========================================================================
      // Lesson 4 — RNN & LSTM
      // ========================================================================
      {
        id: "dl-4",
        title: "Recurrent Neural Networks & LSTMs",
        titleEn: "Recurrent Neural Networks & LSTMs",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — Lessons 1 and 2.

## 1. Why dense and CNN models struggle with sequences

Text, speech, sensor streams, and stock prices share one property: **order matters**. The sentence "Cat eats fish" means the opposite of "Fish eats cat", yet a dense layer that flattens both into the same bag of words sees them as identical.

A **Recurrent Neural Network (RNN)** processes a sequence one step at a time and carries a **hidden state** \`h_t\` that summarises everything seen so far:

\`\`\`
h_t = tanh(W_x · x_t + W_h · h_{t-1} + b)
y_t = W_y · h_t + b_y
\`\`\`

The same weights \`W_x\`, \`W_h\`, \`W_y\` are reused at every timestep — exactly the *weight sharing* trick that made CNNs work, but along the **time axis** instead of space.

\`\`\`mermaid
graph LR
    X1[x1] --> H1[h1]
    H1 --> H2[h2]
    X2[x2] --> H2
    H2 --> H3[h3]
    X3[x3] --> H3
    H3 --> Y[output]
\`\`\`

## 2. The vanishing-gradient problem

In theory an RNN can remember arbitrarily far back. In practice, gradients propagated through 20+ steps **shrink exponentially** (or, less often, explode). The network forgets the start of the sentence by the time it reaches the end — a fatal flaw for long documents or speech.

## 3. The LSTM fix — a cell with three gates

A **Long Short-Term Memory** unit replaces the bare \`tanh\` recurrence with a *cell state* \`c_t\` that flows almost untouched through time, plus three learned **gates**:

| Gate | Decides |
|---|---|
| **Forget gate** \`f\` | What to erase from the previous cell state |
| **Input gate** \`i\` | What new information to write |
| **Output gate** \`o\` | What part of the cell state to expose as the hidden state |

Because the cell state is updated by **multiplication and addition** (no repeated tanh), gradients survive hundreds of steps. **GRU** (Gated Recurrent Unit) is a simpler 2-gate variant with similar performance.

## 4. Bidirectional and stacked RNNs

- **Bidirectional** — run one RNN left-to-right and another right-to-left, then concatenate the hidden states. The model can use context from both sides of each word, which boosts accuracy on tagging and named-entity recognition.
- **Stacked** — feed the output sequence of one LSTM into another. Two-layer LSTMs were standard in NMT systems before Transformers took over.

## 5. Real-world example — Vietnamese sentiment analysis

A 2-layer bidirectional LSTM with a 128-dim hidden state and a Vietnamese word2vec embedding can classify product reviews on Shopee with ~88% accuracy. It runs in under 5 ms per review on a CPU — small enough to embed in a mobile app for real-time moderation.

The same architecture also drove early speech recognition (DeepSpeech 2), early machine translation (Seq2Seq), and time-series forecasting in finance.

## 6. Where RNNs sit in 2025-2026

Transformers (Lesson 5) have replaced RNNs for most NLP tasks. RNNs / LSTMs are still preferred when:

- Sequences are very long but local (low-power streaming sensors).
- Latency is critical and the model must run online step-by-step.
- Memory is tight (an LSTM is ~10× smaller than an equivalent Transformer).

## 7. Key Concept

> 🎯 **Key Concept** — RNNs share weights across **time** the way CNNs share them across **space**. LSTMs add a *gated cell state* so gradients survive long sequences. Transformers (next lesson) drop recurrence entirely in favour of attention — but understanding RNNs is essential for understanding *why* attention won.`,
        theoryEn: "",
        code: `# Sentiment classifier on a tiny toy dataset — bidirectional LSTM in PyTorch.
import torch
import torch.nn as nn

class SentimentLSTM(nn.Module):
    def __init__(self, vocab_size: int, embed_dim: int = 64, hidden_dim: int = 128, num_classes: int = 2):
        super().__init__()
        self.embedding = nn.Embedding(num_embeddings=vocab_size, embedding_dim=embed_dim)
        self.lstm = nn.LSTM(
            input_size=embed_dim,
            hidden_size=hidden_dim,
            num_layers=2,
            batch_first=True,
            bidirectional=True,
            dropout=0.3,
        )
        # Bidirectional doubles the hidden dim
        self.fc = nn.Linear(hidden_dim * 2, num_classes)

    def forward(self, x):
        # x: (batch, seq_len)  -> (batch, seq_len, embed_dim)
        embedded = self.embedding(x)
        # output: (batch, seq_len, hidden_dim * 2)
        output, (h_n, c_n) = self.lstm(embedded)
        # Use the last timestep's representation for classification
        last_step = output[:, -1, :]
        return self.fc(last_step)  # raw logits

# Sanity check
model = SentimentLSTM(vocab_size=10_000)
fake_reviews = torch.randint(low=0, high=10_000, size=(8, 50))  # batch of 8, length 50
logits = model(fake_reviews)
print("Output shape:", logits.shape)  # (8, 2)
print("Parameters: ", sum(p.numel() for p in model.parameters()))`,
        codeLanguage: "python",
        exercise: "Replace `nn.LSTM` with `nn.GRU` (the API is almost identical — drop the `c_n` cell state). Compare parameter counts. Then make the model **uni-directional** (`bidirectional=False`) and update the input dimension of the final linear layer. Which version has fewer parameters, and which would you expect to perform better on long reviews?",
        exerciseEn: "",
        quiz: [
          {
            question: "What problem do LSTMs primarily solve compared to vanilla RNNs?",
            options: [
              "They are much faster to train on GPUs",
              "They mitigate vanishing gradients on long sequences thanks to a gated cell state",
              "They eliminate the need for backpropagation through time",
              "They process the input in parallel",
            ],
            answer: 1,
            explanation: "The cell state with multiplicative gates lets gradients flow across hundreds of timesteps without shrinking to zero — the core failure mode of vanilla RNNs.",
          },
          {
            question: "How many gates does a standard LSTM cell have?",
            options: ["1 (update)", "2 (input, output)", "3 (forget, input, output)", "4 (forget, input, output, reset)"],
            answer: 2,
            explanation: "Forget, input, and output. GRU is the 2-gate variant.",
          },
          {
            question: "When would you still pick an LSTM over a Transformer in 2025?",
            options: [
              "When you need state-of-the-art accuracy on long documents",
              "When you train on tens of billions of tokens with massive GPUs",
              "When latency, memory, and online step-by-step inference matter (e.g. on-device speech)",
              "Whenever the task is classification rather than generation",
            ],
            answer: 2,
            explanation: "Transformers dominate large-scale NLP, but LSTMs remain attractive for low-latency streaming and memory-constrained devices.",
          },
        ],
      },

      // ========================================================================
      // Lesson 5 — Transformers & LLMs
      // ========================================================================
      {
        id: "dl-5",
        title: "Transformers & Large Language Models",
        titleEn: "Transformers & Large Language Models",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — All previous DL lessons. Familiarity with the **AI Foundation → LLM** lesson is also recommended.

## 1. Why attention replaced recurrence

RNNs process tokens one at a time — fundamentally **sequential**, which means slow training on modern GPUs. The 2017 paper *"Attention Is All You Need"* introduced the **Transformer**: a model that drops recurrence entirely and lets every token directly attend to every other token in **parallel**.

The result is the architecture behind ChatGPT, Claude, Gemini, Llama, and effectively every state-of-the-art language model since 2020.

## 2. Self-attention in one picture

For each token in the sequence, the model computes three vectors: a **Query** (what am I looking for?), a **Key** (what do I offer?), and a **Value** (what would I contribute?). The attention weight from token i to token j is the dot product of i's Query with j's Key, scaled and softmaxed. The output for token i is the weighted sum of all Values.

\`\`\`
Attention(Q, K, V) = softmax(Q · Kᵀ / √d_k) · V
\`\`\`

\`\`\`mermaid
graph LR
    T1[Token 1] --> Q1[Q1, K1, V1]
    T2[Token 2] --> Q2[Q2, K2, V2]
    T3[Token 3] --> Q3[Q3, K3, V3]
    Q1 --> A[Attention<br/>softmax QK / sqrt d]
    Q2 --> A
    Q3 --> A
    A --> O[Weighted V<br/>per token]
\`\`\`

**Multi-head attention** runs this whole operation \`h\` times (e.g. 12 or 96) in parallel with different learned projections, then concatenates the outputs. Different heads learn to capture different relationships — syntax, coreference, long-range dependencies.

## 3. The full Transformer block

A Transformer **encoder** block is just:

\`\`\`
x = x + MultiHeadAttention(LayerNorm(x))
x = x + FeedForward(LayerNorm(x))
\`\`\`

The **residual connections** (\`x + ...\`) and **LayerNorm** are what make stacking 100+ blocks trainable. The **FeedForward** is a 2-layer dense network applied independently to each token.

## 4. Encoder, decoder, and decoder-only

| Variant | Used by | What it does |
|---|---|---|
| **Encoder-only** | BERT, RoBERTa | Understands text — classification, embeddings, NER |
| **Decoder-only** | GPT, Llama, Claude, Gemini | Generates text — chat, code, summaries |
| **Encoder-decoder** | T5, original Transformer | Translates / transforms — input → output sequences |

The dominant LLM architecture in 2025-2026 is **decoder-only with causal masking** — each token can attend only to itself and earlier tokens, so the model can be trained to predict the next token on trillions of tokens of text.

## 5. From Transformer to LLM

A "Large Language Model" is just a Transformer scaled up dramatically:

| Knob | Small | Frontier (2025) |
|---|---|---|
| Parameters | 100 M | 100 B – 2 T |
| Context length | 512 tokens | 1 M+ tokens |
| Training data | ~1 B tokens | 10 T+ tokens |
| Compute (FLOPs) | 10¹⁹ | 10²⁵ |
| Training cost | < $100 | $50 M – $500 M |

After pre-training, the model is **fine-tuned with human feedback (RLHF/DPO)** to follow instructions, refuse unsafe requests, and adopt a helpful persona — the difference between a raw GPT-4 base and ChatGPT.

## 6. Real-world example — Vietnamese legal-document Q&A

A modern Vietnamese law-firm chatbot uses:

1. A **bilingual encoder** (e.g. multilingual-e5) to turn each clause of the Vietnamese Civil Code into an embedding stored in a vector database.
2. A **decoder LLM** (e.g. Claude 3.5 or Gemini 2.5) that, given a user question, retrieves the top-K relevant clauses and generates a grounded answer in Vietnamese — citing the article numbers.

This pattern is called **RAG (Retrieval-Augmented Generation)** and is the most common way to deploy LLMs in production today.

## 7. The 2025-2026 frontier

- **Mixture of Experts (MoE)** — only 1/8 of the parameters fire per token; massively reduces inference cost (Mixtral, Gemini 1.5, GPT-4).
- **Long context** — 1 M+ token windows let LLMs read entire codebases or books in one pass.
- **Multimodal** — the same Transformer backbone now handles text, images, audio, and video (Gemini 2.5, GPT-5, Claude 3.5).
- **Reasoning models** — separate "think before you speak" pass (o1, o3, Gemini 2.5 Pro) trades latency for dramatically higher accuracy on math, code, and logic.

## 8. Key Concept

> 🎯 **Key Concept** — Self-attention replaces recurrence with **all-to-all comparison in parallel**. Stacking dozens of attention blocks and scaling parameters, data, and compute is the entire recipe behind every modern LLM. Everything else — RAG, fine-tuning, multimodality — sits on top of this foundation.`,
        theoryEn: "",
        code: `# Mini self-attention from scratch — the math behind every LLM, in 30 lines.
import torch
import torch.nn.functional as F

torch.manual_seed(0)

# A toy "sentence": 4 tokens, each represented as a 8-dim embedding
seq_len, d_model = 4, 8
x = torch.randn(seq_len, d_model)

# Learnable projection matrices (here just random)
W_q = torch.randn(d_model, d_model)
W_k = torch.randn(d_model, d_model)
W_v = torch.randn(d_model, d_model)

# 1. Project the input into Queries, Keys, Values
Q = x @ W_q   # (seq_len, d_model)
K = x @ W_k
V = x @ W_v

# 2. Scaled dot-product attention
scores = Q @ K.T / (d_model ** 0.5)   # (seq_len, seq_len)
weights = F.softmax(scores, dim=-1)   # each row sums to 1
output = weights @ V                   # (seq_len, d_model)

print("Attention weight matrix (rows = queries, cols = keys):")
print(weights.round(decimals=2))
print("\\nEach row sums to 1.0:", weights.sum(dim=-1).round(decimals=2).tolist())
print("\\nOutput shape (one new vector per token):", output.shape)`,
        codeLanguage: "python",
        exercise: "Add **causal masking** so that token i cannot attend to tokens with index > i (the trick that turns this encoder-style attention into a GPT-style decoder). Hint: build an upper-triangular matrix with `torch.triu(torch.ones(seq_len, seq_len), diagonal=1).bool()` and set those positions in `scores` to `-inf` *before* the softmax. Verify that the resulting weight matrix is lower-triangular.",
        exerciseEn: "",
        quiz: [
          {
            question: "Why are Transformers faster to train than RNNs on long sequences?",
            options: [
              "They use fewer parameters",
              "All tokens are processed in parallel instead of one after another",
              "They do not need any non-linearities",
              "They run on CPU rather than GPU",
            ],
            answer: 1,
            explanation: "Self-attention is a single matrix multiplication over the whole sequence — fully parallelisable on GPUs/TPUs. RNNs are forced to wait for timestep t-1 before computing t.",
          },
          {
            question: "What does the `softmax(QKᵀ / √d_k)` term compute?",
            options: [
              "The model parameters after training",
              "How much each query token should attend to every other key token",
              "The final output of the network",
              "The loss for this batch",
            ],
            answer: 1,
            explanation: "The scaled dot product produces raw similarity scores; softmax turns them into a probability distribution over keys for each query — i.e. an attention weight.",
          },
          {
            question: "Which architecture variant powers ChatGPT, Llama, and Claude?",
            options: [
              "Encoder-only Transformer",
              "Decoder-only Transformer with causal masking",
              "Encoder-decoder Transformer like the original 2017 paper",
              "A bidirectional LSTM with attention",
            ],
            answer: 1,
            explanation: "Modern chat-style LLMs are decoder-only with causal masking, trained to predict the next token on trillions of tokens of text and then aligned via RLHF/DPO.",
          },
        ],
      },

      // ========================================================================
      // Lesson 6 — Transfer Learning & Fine-Tuning
      // ========================================================================
      {
        id: "dl-6",
        title: "Transfer Learning & Fine-Tuning",
        titleEn: "Transfer Learning & Fine-Tuning",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — Lessons 1–3.

## 1. Why not train from scratch?

Training a modern vision model on ImageNet (1.2M images) takes **days on 8 GPUs**. Most teams reuse a network already trained on a giant dataset and adapt it — that is **transfer learning**.

The key insight: the **lower layers** of a deep CNN learn very generic features (edges, textures, shapes) useful for almost any vision problem. Only the **top layers** specialise. Keep the generic part, replace the top, and you get a powerful model with very little new training.

## 2. Two flavours

| Strategy | What you do | When to use |
|---|---|---|
| **Feature extraction** | Freeze pretrained weights, train only a new head | Small dataset (< 5 000 imgs) |
| **Fine-tuning** | Replace head AND unfreeze top layers, train with a small learning rate | Larger dataset, similar domain |

Rule of thumb: **freeze first**, validate, then unfreeze top blocks with \`lr × 0.1\`. Never unfreeze everything at the original learning rate — that destroys pretrained knowledge (catastrophic forgetting).

## 3. Real-world example — license-plate detection

You have only 2 000 labelled Vietnamese license-plate images. Training from scratch overfits massively. Instead: load **ResNet-50 pretrained on ImageNet**, replace the classifier with a 2-class head, freeze layers 1–3, fine-tune layer 4 + the head with \`lr=1e-4\`. You typically reach **>95 % accuracy in under an hour**.

## 4. Beyond vision

In 2025 transfer learning is the default in **every** subfield: BERT/Llama for NLP, Whisper for speech, wav2vec 2.0 for audio. **LoRA** and **QLoRA** update only ~1 % of parameters — making fine-tuning of multi-billion-parameter LLMs possible on a single consumer GPU.

> 💡 **Key concept** — Almost no one trains foundation models from scratch in 2025. The skill that matters is choosing the right pretrained backbone and fine-tuning it efficiently.`,
        theoryEn: "",
        code: `# Transfer learning with a pretrained ResNet-18 — freeze backbone, train new head
import torch
import torch.nn as nn
import torchvision.models as models

# Load ResNet-18 pretrained on ImageNet
model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)

# Freeze every parameter
for param in model.parameters():
    param.requires_grad = False

# Replace the final layer with a 2-class head (only this gets trained)
num_features = model.fc.in_features
model.fc = nn.Linear(num_features, 2)

trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
total = sum(p.numel() for p in model.parameters())
print(f"Trainable: {trainable:,} / {total:,} ({100*trainable/total:.2f}%)")

optimizer = torch.optim.Adam(model.fc.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

# Toy training step
imgs = torch.randn(8, 3, 224, 224)
labels = torch.randint(0, 2, (8,))
loss = criterion(model(imgs), labels)
loss.backward()
optimizer.step()
print(f"Loss: {loss.item():.4f}")`,
        codeLanguage: "python",
        exercise: "Switch to **fine-tuning** mode: also unfreeze `model.layer4`, then build an Adam optimizer with two parameter groups — `layer4` at `lr=1e-4` and `fc` at `lr=1e-3`. Print the new trainable-parameter percentage (~20–25 %).",
        exerciseEn: "",
        quiz: [
          {
            question: "Why freeze early layers of a pretrained CNN when transfer-learning?",
            options: ["They are too large to fit in memory", "They learn generic features (edges, textures) that transfer well", "They contain task-specific classification logic", "Frozen layers run faster on CPU"],
            answer: 1,
            explanation: "Lower convolutional layers detect universal patterns like edges and colour blobs. Reusing them avoids re-learning these concepts and prevents overfitting on small target datasets.",
          },
          {
            question: "Recommended learning rate when fine-tuning unfrozen pretrained layers?",
            options: ["Much higher than the head's lr", "Roughly 10× smaller than the head's lr", "Exactly zero", "It does not matter"],
            answer: 1,
            explanation: "A small learning rate prevents catastrophic forgetting — large gradient steps would erase the useful knowledge inside the backbone.",
          },
          {
            question: "Which technique updates only ~1 % of an LLM's parameters?",
            options: ["LoRA", "Dropout", "BatchNorm", "Beam search"],
            answer: 0,
            explanation: "LoRA injects small trainable low-rank matrices into each layer, leaving the original weights frozen — making fine-tuning of multi-billion-parameter models tractable.",
          },
        ],
      },

      // ========================================================================
      // Lesson 7 — Object Detection (YOLO)
      // ========================================================================
      {
        id: "dl-7",
        title: "Object Detection & Segmentation",
        titleEn: "Object Detection & Segmentation",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — Lessons 3 (CNN) and 6 (Transfer Learning).

## 1. Beyond classification

Classification answers "*what* is in this image?" Object detection answers two harder questions: **what** objects + **where** they are (bounding boxes \`(x, y, w, h)\`). **Semantic segmentation** labels every pixel; **instance segmentation** also distinguishes individual objects of the same class.

## 2. Two families

| Family | Examples | Idea | Speed |
|---|---|---|---|
| **Two-stage** | Faster R-CNN, Mask R-CNN | Propose regions → classify each | Slower, highest accuracy |
| **One-stage** | YOLO v8/v9/v10, RetinaNet | Predict boxes + classes in one pass | Real-time |

In 2025, **YOLO** dominates production real-time use cases — modern variants reach >50 mAP on COCO at >100 FPS.

\`\`\`mermaid
flowchart LR
    IMG[Input image] --> CNN[Backbone CNN]
    CNN --> NECK[Neck FPN: multi-scale features]
    NECK --> HEAD[Detection head]
    HEAD --> OUT[Boxes + classes + confidence]
\`\`\`

## 3. Three letters every detector uses

- **Anchor boxes** — predefined shapes; the network predicts offsets to them
- **IoU** (Intersection over Union) — overlap metric; >0.5 = correct match
- **NMS** (Non-Maximum Suppression) — keeps highest-confidence box, discards overlaps

## 4. Real-world deployments

Self-driving cars, license-plate recognition (YOLO + CRNN), medical imaging (U-Net for tumour segmentation), retail analytics. With \`ultralytics/yolov8\` you can fine-tune a state-of-the-art detector on 200–500 labelled images in under an hour.

> 💡 **Key concept** — The bottleneck in 2025 is no longer the model — it's the **labelling**.`,
        theoryEn: "",
        code: `# Real-world object detection in ~10 lines using a pretrained YOLOv8
# pip install ultralytics
from ultralytics import YOLO

model = YOLO("yolov8n.pt")  # ~6 MB, runs at 100+ FPS on a modern GPU

results = model.predict(
    source="https://ultralytics.com/images/bus.jpg",
    conf=0.25,       # min confidence
    iou=0.45,        # NMS IoU threshold
    save=True,       # writes annotated image to ./runs/detect/predict/
)

for r in results:
    print(f"Detected {len(r.boxes)} objects in {r.path}")
    for box, cls, score in zip(r.boxes.xyxy, r.boxes.cls, r.boxes.conf):
        x1, y1, x2, y2 = box.tolist()
        print(f"  {model.names[int(cls)]:12s} conf={score:.2f}  "
              f"box=({x1:.0f},{y1:.0f})->({x2:.0f},{y2:.0f})")

# Fine-tune on your own dataset:
# model.train(data="my_dataset.yaml", epochs=50, imgsz=640, batch=16)`,
        codeLanguage: "python",
        exercise: "Run on a different image, then change `conf=0.25` to `conf=0.7` and observe how many fewer boxes you get. Count distinct classes detected using a Python `set` over `r.boxes.cls`.",
        exerciseEn: "",
        quiz: [
          {
            question: "What does Non-Maximum Suppression (NMS) do?",
            options: ["Maximises the loss during training", "Removes duplicate, overlapping boxes referring to the same object", "Up-samples small images", "Applies dropout to box predictions"],
            answer: 1,
            explanation: "NMS keeps the highest-confidence box and discards every other box whose IoU with it exceeds a threshold.",
          },
          {
            question: "Why are YOLO-style models called *one-stage* detectors?",
            options: ["They train on one class only", "They predict classes and boxes in a single forward pass with no separate region-proposal step", "They use only one channel", "They have one convolutional layer"],
            answer: 1,
            explanation: "One-stage detectors skip the region-proposal stage of two-stage detectors (Faster R-CNN), enabling real-time inference.",
          },
          {
            question: "What does *instance* segmentation provide that *semantic* segmentation does not?",
            options: ["Higher resolution masks", "Distinguishes individual objects of the same class", "Runs faster", "No training data needed"],
            answer: 1,
            explanation: "Semantic segmentation labels all person pixels as `person`. Instance segmentation tells you *which* pixels belong to *person 1* vs *person 2*.",
          },
        ],
      },

      // ========================================================================
      // Lesson 8 — GANs
      // ========================================================================
      {
        id: "dl-8",
        title: "Generative Adversarial Networks (GANs)",
        titleEn: "Generative Adversarial Networks (GANs)",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — Lessons 1–3.

## 1. The two-player game

In 2014, Ian Goodfellow proposed: train **two** networks fighting each other.

- **Generator (G)** — takes random noise, produces a fake sample that looks real
- **Discriminator (D)** — receives real or fake samples, must tell which is which

A *minimax* game. As D improves at spotting fakes, G is forced to make more realistic ones. At equilibrium, G's outputs are indistinguishable from real data.

\`\`\`mermaid
flowchart LR
    Z[Random noise z] --> G[Generator G]
    G --> FAKE[Fake sample]
    REAL[Real sample] --> D[Discriminator D]
    FAKE --> D
    D --> OUT[Real or Fake?]
\`\`\`

## 2. Training loop

For each batch:
1. **Train D**: reals (label 1) and fakes from G (label 0). Minimise BCE.
2. **Train G**: feed noise, push fakes through D, push it to label them as **real**.

Famously unstable — too-strong D crushes G's gradient; too-weak D gives no useful signal. Tricks like **WGAN-GP** and **spectral normalisation** stabilise training.

## 3. Variants that mattered

| Variant | Year | Contribution |
|---|---|---|
| **DCGAN** | 2015 | First convolutional GAN |
| **CycleGAN** | 2017 | Image-to-image translation **without paired data** |
| **StyleGAN** | 2019 | Photorealistic face synthesis with style control |

## 4. GANs vs Diffusion in 2025

By 2022, **diffusion models** (Stable Diffusion, DALL-E 3) overtook GANs for general image synthesis. But GANs still dominate niches: real-time generation (NVIDIA DLSS), audio synthesis (HiFi-GAN), super-resolution.

> 💡 **Key concept** — A GAN learns a distribution **implicitly** by drawing samples from it, rather than estimating its density.`,
        theoryEn: "",
        code: `# Tiny GAN learns to generate samples from a 1-D bimodal distribution
import torch
import torch.nn as nn

REAL_SAMPLER = lambda n: torch.cat([
    torch.randn(n // 2) * 0.5 - 2.0,   # left mode at -2
    torch.randn(n // 2) * 0.5 + 2.0,   # right mode at +2
]).unsqueeze(1)

G = nn.Sequential(nn.Linear(1, 32), nn.ReLU(), nn.Linear(32, 1))
D = nn.Sequential(nn.Linear(1, 32), nn.ReLU(), nn.Linear(32, 1), nn.Sigmoid())

opt_G = torch.optim.Adam(G.parameters(), lr=1e-3)
opt_D = torch.optim.Adam(D.parameters(), lr=1e-3)
bce = nn.BCELoss()

for step in range(2000):
    # Train discriminator
    real = REAL_SAMPLER(64)
    z = torch.randn(64, 1)
    fake = G(z).detach()
    loss_D = bce(D(real), torch.ones(64, 1)) + bce(D(fake), torch.zeros(64, 1))
    opt_D.zero_grad(); loss_D.backward(); opt_D.step()

    # Train generator (wants D to call fakes "real")
    z = torch.randn(64, 1)
    fake = G(z)
    loss_G = bce(D(fake), torch.ones(64, 1))
    opt_G.zero_grad(); loss_G.backward(); opt_G.step()

    if step % 400 == 0:
        with torch.no_grad():
            samples = G(torch.randn(1000, 1)).squeeze().numpy()
        print(f"step {step:4d} | loss_D={loss_D.item():.3f} loss_G={loss_G.item():.3f} | "
              f"fake mean={samples.mean():+.2f} std={samples.std():.2f}")`,
        codeLanguage: "python",
        exercise: "Modify `REAL_SAMPLER` to a **three-mode** distribution at -3, 0, +3. Re-train and check whether the generator covers all three modes — if it suffers **mode collapse**, increase hidden size from 32 to 128.",
        exerciseEn: "",
        quiz: [
          {
            question: "What does the **generator** try to maximise?",
            options: ["The discriminator's accuracy on real samples", "The probability that D labels its fakes as real", "Reconstruction error", "KL-divergence to noise"],
            answer: 1,
            explanation: "G is rewarded when D outputs a high probability of `real` for G's fake samples.",
          },
          {
            question: "What is *mode collapse* in GAN training?",
            options: ["Discriminator loss explodes", "Generator produces only a small subset of possible outputs", "GPU runs out of memory", "Dataset is too small"],
            answer: 1,
            explanation: "Mode collapse: G finds one output that fools D and stops exploring the rest of the data distribution.",
          },
          {
            question: "Which family overtook GANs as the go-to for high-quality image synthesis around 2022?",
            options: ["VAEs", "Restricted Boltzmann Machines", "Diffusion models (Stable Diffusion, DALL-E 3)", "Normalising flows"],
            answer: 2,
            explanation: "Diffusion models train more stably, scale better, and produce more diverse, higher-fidelity samples.",
          },
        ],
      },

      // ========================================================================
      // Lesson 9 — Diffusion Models
      // ========================================================================
      {
        id: "dl-9",
        title: "Diffusion Models — The Engine Behind Stable Diffusion",
        titleEn: "Diffusion Models — The Engine Behind Stable Diffusion",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — Lessons 3 (CNN) and 8 (GANs).

## 1. Learn to **un-noise**

Diffusion models train on a brilliantly simple idea: instead of generating an image in one giant leap, learn to gradually **remove noise** at every noise level. Once the model can denoise, generate by starting from **pure noise** and denoising step-by-step.

Two phases:
1. **Forward (fixed)** — add Gaussian noise to a real image \`x₀\` over T steps until \`x_T\` is pure noise. No learning here.
2. **Reverse (learned)** — train a network \`ε_θ(x_t, t)\` to **predict the noise** added at step \`t\`. Loss = MSE between predicted and true noise.

\`\`\`mermaid
flowchart LR
    X0[Clean x_0] -->|+noise| X1 -->|+noise| XT[Pure noise]
    XT -->|denoise| X1b -->|denoise| X0b[Generated image]
\`\`\`

## 2. Why diffusion beat GANs

GANs need an unstable adversarial game; diffusion only needs MSE regression. Three advantages:
- **Stable training** — no mode collapse, no balancing tricks
- **Scalable** — bigger models keep getting better; GANs plateau
- **Diverse** — different noise seeds give different images

The price: **inference speed**. Vanilla DDPM needs 1 000 forward passes per image. Modern samplers (DDIM, DPM-Solver++, **Latent Consistency Models**) cut that to **4–8 steps**.

## 3. Latent diffusion — Stable Diffusion's secret

Running diffusion on 1024×1024 RGB pixels is too expensive. **Stable Diffusion** (2022) does the diffusion in a **64×64 latent space** of a pretrained autoencoder, then decodes back. That trick made photorealistic text-to-image **run on a consumer GPU**.

## 4. Conditioning: text → pictures

Condition the denoiser on a **text embedding** from CLIP/T5. **Classifier-Free Guidance** amplifies prompt influence at sample time.

> 💡 **Key concept** — A diffusion model is a **denoiser** trained at every noise level. Generation = repeatedly denoising pure noise into something meaningful. With text conditioning, this single idea powers Stable Diffusion, DALL-E 3, Midjourney, and Sora.`,
        theoryEn: "",
        code: `# Use a pretrained Stable Diffusion model from Hugging Face
# pip install diffusers transformers accelerate torch
import torch
from diffusers import StableDiffusionPipeline

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16,
)
pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")

prompt = "A photorealistic cat astronaut on Mars, cinematic lighting"
image = pipe(
    prompt=prompt,
    num_inference_steps=30,
    guidance_scale=7.5,            # how strongly to follow the prompt
    height=512, width=512,
).images[0]

image.save("cat_astronaut.png")
print("Saved cat_astronaut.png")

# Generate 4 variations from the same prompt
images = pipe(prompt=[prompt] * 4, num_inference_steps=30).images
for i, img in enumerate(images):
    img.save(f"variation_{i}.png")`,
        codeLanguage: "python",
        exercise: "Try `guidance_scale=3.0` then `15.0`. Describe how the prompt-faithfulness vs creativity trade-off changes. Then add `negative_prompt='blurry, low quality, watermark'` and observe the quality improvement.",
        exerciseEn: "",
        quiz: [
          {
            question: "What does the network in a diffusion model actually predict at each step?",
            options: ["Next pixel value", "The noise that was added at that step", "A class label", "Real vs fake"],
            answer: 1,
            explanation: "The denoiser is trained with MSE between its prediction and the actual Gaussian noise added during the forward process.",
          },
          {
            question: "Why does Stable Diffusion run diffusion in a *latent* space?",
            options: ["Pixels can only represent integers", "Diffusing in 64×64 latents is dramatically cheaper than 512×512 pixels", "GANs cannot operate on latents", "The autoencoder learns to denoise"],
            answer: 1,
            explanation: "Latent diffusion moves the expensive denoising loop into a small latent grid produced by a pretrained VAE.",
          },
          {
            question: "How does a text prompt steer diffusion output?",
            options: ["Text is rasterised as letters", "A text encoder produces an embedding that conditions the denoising network at every step", "The model trains a new network for each prompt", "Prompt becomes a class index"],
            answer: 1,
            explanation: "Text is encoded once (e.g. by CLIP); that embedding feeds into cross-attention layers in the denoiser.",
          },
        ],
      },

      // ========================================================================
      // Lesson 10 — Fine-Tuning LLMs (LoRA, QLoRA, RAG)
      // ========================================================================
      {
        id: "dl-10",
        title: "Fine-Tuning LLMs — LoRA, QLoRA & RAG",
        titleEn: "Fine-Tuning LLMs — LoRA, QLoRA & RAG",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — Lesson 5 (Transformers & LLMs) and Lesson 6 (Transfer Learning).

## 1. Three ways to make an LLM "yours"

| Technique | Cost | Latency | Best for |
|---|---|---|---|
| **Prompt engineering + few-shot** | Free | Fast | Quick wins |
| **RAG (Retrieval-Augmented Generation)** | Cheap | Medium | Up-to-date facts |
| **Fine-tuning (LoRA / QLoRA)** | Moderate | Fast | Style, format, domain reasoning |

Production systems usually **combine RAG + fine-tuning** — fine-tune for tone, retrieve for facts.

## 2. RAG in 60 seconds

\`\`\`mermaid
flowchart LR
    Q[User question] --> EMB[Embed query]
    EMB --> VDB[(Vector DB:<br/>Pinecone, Qdrant, pgvector)]
    VDB --> CTX[Top-k relevant chunks]
    CTX --> LLM[LLM answers using<br/>question + retrieved context]
    LLM --> A[Grounded answer + citations]
\`\`\`

Knowledge updates without retraining; citations make hallucinations auditable; even a 7B model with good RAG often beats a 70B model alone on factual tasks.

## 3. LoRA — fine-tuning without breaking the bank

Full fine-tuning of a 7B Llama needs ~80 GB GPU. **LoRA** (2021): freeze \`W\`, learn a tiny **delta** \`ΔW = B · A\` where \`A\`, \`B\` are low-rank. For a 4 096×4 096 matrix with rank \`r=8\`, you train **65k params instead of 17M** — 250× reduction.

**QLoRA** (2023): load the base model in **4-bit** precision; LoRA adapters stay in float16. You can now fine-tune a **70B model on a single 24 GB consumer GPU**.

## 4. What to fine-tune for

Don't fine-tune for **facts** — that's RAG's job. Fine-tune for:
- **Output format** (JSON, citations, formal Vietnamese)
- **Tone & persona**
- **Domain reasoning**
- **Latency / cost** — a fine-tuned 1B can replace a 70B prompt and cut bills 50×

> 💡 **Key concept** — In 2025, the modern AI engineer's stack: pick a strong open-weight base, wire up RAG for facts, apply LoRA/QLoRA for format & style. No one starts from scratch.`,
        theoryEn: "",
        code: `# QLoRA fine-tuning of Llama-3-8B in ~30 lines — runs on a single 16 GB GPU
# pip install transformers peft accelerate bitsandbytes datasets trl
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from datasets import load_dataset
from trl import SFTTrainer, SFTConfig

MODEL = "meta-llama/Meta-Llama-3-8B"

# Load base model in 4-bit precision (QLoRA)
bnb = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
)
model = AutoModelForCausalLM.from_pretrained(MODEL, quantization_config=bnb, device_map="auto")
tokenizer = AutoTokenizer.from_pretrained(MODEL)
tokenizer.pad_token = tokenizer.eos_token

# Wrap with LoRA — only ~0.5 % of params will be trained
model = prepare_model_for_kbit_training(model)
lora = LoraConfig(
    r=16, lora_alpha=32, lora_dropout=0.05,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    bias="none", task_type="CAUSAL_LM",
)
model = get_peft_model(model, lora)
model.print_trainable_parameters()  # e.g. 41.9M / 8.0B (0.52%)

dataset = load_dataset("json", data_files="my_instructions.jsonl", split="train")

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    args=SFTConfig(
        output_dir="llama3-lora-vi",
        num_train_epochs=1,
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        learning_rate=2e-4,
        bf16=True,
        logging_steps=10,
    ),
)
trainer.train()
trainer.save_model("llama3-lora-vi")  # adapter is ~80 MB vs 16 GB full model`,
        codeLanguage: "python",
        exercise: "Plan a fine-tuning project for a Vietnamese customer-support chatbot in 3 bullets: (1) base model + why, (2) one example instruction/response pair, (3) would you also use RAG and what would it retrieve?",
        exerciseEn: "",
        quiz: [
          {
            question: "Which problem is *RAG* the right tool for, but *fine-tuning* is not?",
            options: ["Making the model answer in JSON", "Up-to-date company documents that change weekly", "Adopting a friendly tone", "Reducing inference latency"],
            answer: 1,
            explanation: "Frequently changing facts belong in a vector DB, not in model weights — re-fine-tuning weekly is wasteful.",
          },
          {
            question: "Core trick of LoRA?",
            options: ["Quantises every weight to 4 bits", "Freezes the original weight matrix and learns a low-rank update `ΔW = B·A`", "Removes attention layers", "Replaces optimizer with SGD"],
            answer: 1,
            explanation: "LoRA trains two skinny low-rank matrices whose product approximates the needed weight update — 100–250× fewer parameters.",
          },
          {
            question: "What does *QLoRA* add on top of LoRA?",
            options: ["A new optimizer Q-Adam", "Loads the frozen base model in 4-bit so very large models fit on a single consumer GPU", "Encrypts model weights", "Removes the tokenizer"],
            answer: 1,
            explanation: "QLoRA quantises the base model to 4-bit (nf4) while keeping LoRA adapters in higher precision — unlocked single-GPU fine-tuning of 70B models.",
          },
        ],
      },
      {
        id: "dl-11",
        title: "Sequence Models — RNN, LSTM & GRU",
        titleEn: "Sequence Models — RNN, LSTM & GRU",
        level: 4,
        difficulty: "intermediate",
        theory: `> ⚠️ **Prerequisites** — Lessons 1–3 (neural nets, backprop).

## 1. Why a feed-forward net cannot read a sentence

A dense network treats inputs as an unordered bag. But "**dog bites man**" ≠ "**man bites dog**". We need a network whose hidden state \`h_t\` depends on the previous step:

\`\`\`
h_t = tanh(W_x · x_t + W_h · h_{t-1} + b)
\`\`\`

This is a **Recurrent Neural Network** (RNN) — the same weights are reused at every time step (parameter sharing across time).

\`\`\`mermaid
flowchart LR
  X1[x₁] --> H1[h₁]
  H1 --> H2[h₂]
  X2[x₂] --> H2
  H2 --> H3[h₃]
  X3[x₃] --> H3
  H3 --> Y[Output]
\`\`\`

## 2. The vanishing gradient problem

Backprop through 100 time steps multiplies 100 Jacobians. If each has spectral radius < 1, gradients **vanish** → the network forgets long-range dependencies. If > 1, they **explode** → NaNs.

## 3. LSTM — adding a memory highway

**Long Short-Term Memory** (Hochreiter & Schmidhuber, 1997) introduces a **cell state** \`C_t\` that flows through time with only linear interactions, gated by:

| Gate | Formula | Role |
|---|---|---|
| **Forget** \`f_t\` | σ(W_f·[h_{t-1}, x_t]) | What to drop from \`C\` |
| **Input** \`i_t\` | σ(W_i·…) | What new info to add |
| **Output** \`o_t\` | σ(W_o·…) | What to expose as \`h_t\` |

\`C_t = f_t · C_{t-1} + i_t · tanh(...)\` — additive update preserves gradients.

**GRU** (2014) is a streamlined LSTM with 2 gates instead of 3 — fewer params, similar accuracy.

## 4. Why we still teach RNNs in 2025

Transformers replaced RNNs for most NLP, but RNNs remain the right tool for: **streaming audio (Whisper distilled, RNN-T)**, **on-device keyword spotting** (~100 KB model), **time-series forecasting with very long horizons**, and as **building blocks of state-space models (Mamba)**.

## 5. Real-world example: predicting electricity demand

Vietnam's EVN forecasts hourly load 24 h ahead. A bidirectional LSTM ingesting the previous 168 hours + temperature + holiday flags reaches MAPE ≈ 1.8 % — enough to optimise thermal/hydro dispatch.

## ⚠️ Common Pitfalls
- **Forgetting to clip gradients** — exploding gradients silently produce NaNs.
- **Using RNN where attention wins** — for sequences > 500 with random access patterns, Transformers train 10× faster on GPU.
- **Ignoring sequence length padding** — pack sequences (\`pack_padded_sequence\`) or you waste compute on PAD tokens.

## 🛠️ Practice Task
Implement a character-level LSTM that generates Vietnamese poetry in the style of "Truyện Kiều". Train on the first 1 000 lines. Sample with temperatures 0.3, 0.7, and 1.2 — describe how outputs change.`,
        theoryEn: "",
        code: `# Stock-price next-day forecaster with LSTM
import torch, torch.nn as nn

class PriceLSTM(nn.Module):
    def __init__(self, n_features=5, hidden=64, layers=2):
        super().__init__()
        self.lstm = nn.LSTM(n_features, hidden, layers,
                            batch_first=True, dropout=0.2)
        self.head = nn.Linear(hidden, 1)

    def forward(self, x):                  # x: (batch, 30 days, 5 features)
        out, _ = self.lstm(x)
        return self.head(out[:, -1, :])    # use last time step

model = PriceLSTM()
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.MSELoss()

# One training step
x = torch.randn(32, 30, 5)                 # batch of 32 windows
y = torch.randn(32, 1)                     # next-day close price
pred = model(x)
loss = loss_fn(pred, y)
loss.backward()
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)  # critical!
opt.step()
print(f"Loss: {loss.item():.4f}")`,
        codeLanguage: "python",
        exercise: "Why does an LSTM solve the vanishing gradient problem better than a vanilla RNN? Answer in 2 sentences referring to the cell state update rule.",
        exerciseEn: "",
        quiz: [
          {
            question: "Which gate decides what information leaves the cell state in an LSTM?",
            options: ["Input gate", "Forget gate", "Output gate", "Update gate"],
            answer: 1,
            explanation: "The forget gate f_t multiplies C_{t-1} element-wise — values close to 0 erase, close to 1 keep.",
          },
          {
            question: "Main reason GRUs were proposed?",
            options: ["Better accuracy than LSTM on every task", "Fewer parameters and faster training with comparable accuracy", "Built-in attention", "Support multimodal input"],
            answer: 1,
            explanation: "GRU merges forget+input into a single update gate → ~25 % fewer parameters than LSTM.",
          },
          {
            question: "What does gradient clipping prevent?",
            options: ["Vanishing gradients", "Exploding gradients (NaN losses)", "Overfitting", "Slow data loading"],
            answer: 1,
            explanation: "Clipping caps the gradient norm — essential whenever you backprop through long sequences.",
          },
        ],
      },
      {
        id: "dl-12",
        title: "Self-Supervised Learning — Pretraining Without Labels",
        titleEn: "Self-Supervised Learning — Pretraining Without Labels",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — Lesson 5 (Transformers) and Lesson 6 (Transfer Learning).

## 1. The labelling crisis

ImageNet has 1.2M labelled images and cost millions of dollars. The internet has **trillions** of unlabelled images and texts. **Self-Supervised Learning (SSL)** invents a pretext task from the raw data itself — no human labels.

## 2. The two dominant paradigms

\`\`\`mermaid
flowchart LR
    UN[Unlabelled data] --> A[Generative SSL<br/>Predict missing parts]
    UN --> B[Contrastive SSL<br/>Pull similar together,<br/>push different apart]
    A --> X[BERT, GPT, MAE]
    B --> Y[SimCLR, MoCo, CLIP]
\`\`\`

### A. Generative — "predict the missing token / patch"
- **BERT** — mask 15% of tokens, predict them (Masked Language Model).
- **GPT** — predict the next token (Causal LM).
- **MAE** (He et al. 2021) — mask 75% of image patches, reconstruct pixels.

### B. Contrastive — "same image, two augmentations → close embedding"
- **SimCLR** — InfoNCE loss; needs huge batch sizes (4096+).
- **MoCo** — momentum-encoded queue removes the giant-batch requirement.
- **CLIP** — contrastive across **modalities** (image ↔ caption); zero-shot ImageNet 76 %.

## 3. Why SSL changed everything

| Era | Approach | ImageNet top-1 with 1 % labels |
|---|---|---|
| 2018 | Supervised from scratch | 25 % |
| 2020 | SimCLR pretrain + linear head | 64 % |
| 2022 | DINOv2 pretrain | 80 % |

A foundation model trained once on 1 billion unlabelled images can be fine-tuned to dozens of downstream tasks — **the same idea that gave us GPT in NLP, applied to vision, audio, video, molecules**.

## 4. Real-world example: medical imaging

A Vietnamese hospital has 50 000 X-rays but only 800 are labelled by radiologists. SSL pretraining (MAE on the 50 k unlabelled X-rays) followed by fine-tuning on the 800 labels reaches the same accuracy as supervised training on 5 000 labels — saving radiologist hours.

## ⚠️ Common Pitfalls
- **Weak augmentations** — contrastive learning collapses if the two views are too similar.
- **Skipping linear probing** — always evaluate the frozen encoder with a linear head before fine-tuning.
- **Pretraining on the wrong domain** — SSL on natural images transfers poorly to satellite imagery.

## 🛠️ Practice Task
You have 5 000 unlabelled product photos and 200 labelled ones (10 categories). Design a 2-stage training plan and justify your choice of SSL method (contrastive vs MAE).`,
        theoryEn: "",
        code: `# Tiny SimCLR on CIFAR-10 (PyTorch)
import torch, torch.nn as nn, torch.nn.functional as F
from torchvision import models, transforms

# Two random augmentations of the same image → "positive pair"
augment = transforms.Compose([
    transforms.RandomResizedCrop(32, scale=(0.5, 1.0)),
    transforms.RandomHorizontalFlip(),
    transforms.ColorJitter(0.4, 0.4, 0.4, 0.1),
    transforms.RandomGrayscale(p=0.2),
    transforms.ToTensor(),
])

backbone = models.resnet18(weights=None)
backbone.fc = nn.Identity()                       # remove classifier head
projector = nn.Sequential(
    nn.Linear(512, 512), nn.ReLU(),
    nn.Linear(512, 128),                          # projection dim
)

def info_nce(z1, z2, t=0.5):
    z1 = F.normalize(z1, dim=1); z2 = F.normalize(z2, dim=1)
    z = torch.cat([z1, z2], 0)                    # (2N, 128)
    sim = z @ z.T / t                             # cosine similarity matrix
    n = z1.size(0)
    labels = torch.cat([torch.arange(n, 2*n), torch.arange(0, n)]).to(z.device)
    sim.fill_diagonal_(-1e9)                      # mask self-similarity
    return F.cross_entropy(sim, labels)

# One step (assuming dataloader yields raw images x)
x = torch.randn(64, 3, 32, 32)
v1 = torch.stack([augment(transforms.functional.to_pil_image(img)) for img in x])
v2 = torch.stack([augment(transforms.functional.to_pil_image(img)) for img in x])
z1 = projector(backbone(v1)); z2 = projector(backbone(v2))
loss = info_nce(z1, z2)
print(f"InfoNCE: {loss.item():.4f}")`,
        codeLanguage: "python",
        exercise: "Explain in 3 sentences why CLIP can classify a class it has never seen during training (zero-shot). What role does the text encoder play?",
        exerciseEn: "",
        quiz: [
          {
            question: "What is the pretext task in BERT?",
            options: ["Predict the next sentence", "Reconstruct masked tokens", "Translate English → German", "Generate captions"],
            answer: 1,
            explanation: "BERT masks 15 % of tokens and asks the model to predict them (MLM).",
          },
          {
            question: "Why does SimCLR need very large batch sizes?",
            options: ["GPU vendors require it", "Larger batches give more in-batch negative examples", "It speeds up data loading", "It reduces overfitting"],
            answer: 1,
            explanation: "InfoNCE relies on negative pairs from the batch — more negatives = sharper representation.",
          },
          {
            question: "What makes CLIP suitable for *zero-shot* classification?",
            options: ["It is trained on labelled ImageNet", "Its text encoder lets you describe a class in natural language at inference", "It uses a bigger ResNet", "It fine-tunes itself on every new class"],
            answer: 1,
            explanation: "Compute embeddings of class prompts ('a photo of a {label}'); pick the class whose embedding is closest to the image embedding.",
          },
        ],
      },
      {
        id: "dl-13",
        title: "Multimodal Models — Seeing, Reading & Listening Together",
        titleEn: "Multimodal Models — Seeing, Reading & Listening Together",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — Lessons 5, 9 (GAN/Diffusion) and 12 (SSL).

## 1. Why multimodal?

Humans don't think in text alone — we combine vision, sound, language, and action. The frontier of AI in 2024-2025 (GPT-4o, Gemini 2.0, Claude 3.5 Sonnet vision, LLaVA) is **multimodal foundation models** that process and generate across modalities.

## 2. The three architectural patterns

\`\`\`mermaid
flowchart TB
    subgraph "1. Late Fusion (Two-Tower)"
      I1[Image encoder] --> S1[Cosine similarity]
      T1[Text encoder] --> S1
    end
    subgraph "2. Early Fusion (Cross-Attention)"
      I2[Image patches] --> CA[Cross-attention layers]
      T2[Text tokens] --> CA
      CA --> O2[Joint representation]
    end
    subgraph "3. Unified Token Stream"
      I3[Image patches as tokens] --> TR[Transformer]
      T3[Text tokens] --> TR
      A3[Audio tokens] --> TR
      TR --> O3[Generates any modality]
    end
\`\`\`

| Pattern | Example | Strength |
|---|---|---|
| **Two-tower** | CLIP, ALIGN | Fast retrieval; zero-shot classification |
| **Cross-attention** | Flamingo, BLIP-2 | Visual question answering |
| **Unified tokens** | GPT-4o, Gemini, Chameleon | Generates text + images + audio |

## 3. The "Q-Former" trick (BLIP-2)

A frozen image encoder produces 256 patches; a frozen LLM has its own token space. **Q-Former** (Querying Transformer) is a tiny bridge — 32 learnable query vectors that distil the 256 patches into a sequence the LLM understands. Only Q-Former is trained → multimodal in days, not months.

## 4. Real-world examples

- **Medical**: MedPaLM-M reads X-rays + clinical notes to draft differential diagnoses.
- **E-commerce in Vietnam**: Tiki uses CLIP-style retrieval — users snap a photo, the model finds similar products in the catalog (text + image jointly).
- **Accessibility**: SeeingAI describes the world to blind users in real-time.
- **Customer support**: GPT-4o reads a screenshot + the user's voice complaint to triage tickets.

## ⚠️ Common Pitfalls
- **Modality dominance** — when training jointly, the easier modality (text) overwhelms the harder one (audio). Solution: balance losses.
- **Hallucinated grounding** — VLMs can describe objects that aren't in the image. Mitigation: chain-of-thought with bounding-box prompts.
- **Catastrophic forgetting** — fine-tuning a multimodal model on a single task often destroys other modalities.

## 🛠️ Practice Task
You want to build "Tutor Bot" — students upload a photo of a math problem and ask a question. Sketch the architecture (which encoder for the image, which LLM, how they connect) and the training data you would need.`,
        theoryEn: "",
        code: `# Visual Question Answering with BLIP-2 (Hugging Face)
from transformers import Blip2Processor, Blip2ForConditionalGeneration
from PIL import Image
import torch, requests

device = "cuda" if torch.cuda.is_available() else "cpu"
processor = Blip2Processor.from_pretrained("Salesforce/blip2-opt-2.7b")
model = Blip2ForConditionalGeneration.from_pretrained(
    "Salesforce/blip2-opt-2.7b", torch_dtype=torch.float16
).to(device)

img = Image.open(requests.get(
    "https://images.unsplash.com/photo-1574158622682-e40e69881006",
    stream=True).raw).convert("RGB")

prompts = [
    "Question: What animal is in the image? Answer:",
    "Question: How many of them are there? Answer:",
    "Question: What color is the background? Answer:",
]

for q in prompts:
    inputs = processor(images=img, text=q, return_tensors="pt").to(device, torch.float16)
    out = model.generate(**inputs, max_new_tokens=20)
    print(q, "->", processor.decode(out[0], skip_special_tokens=True))`,
        codeLanguage: "python",
        exercise: "List 3 differences between CLIP-style two-tower models and unified-token models like GPT-4o. For each difference, name a use-case where one wins.",
        exerciseEn: "",
        quiz: [
          {
            question: "Which architecture is best for billion-scale image search by text query?",
            options: ["Cross-attention BLIP-2", "Two-tower CLIP", "Unified token GPT-4o", "Diffusion model"],
            answer: 1,
            explanation: "Two-tower models pre-compute image embeddings; only the text query is encoded online → millisecond retrieval.",
          },
          {
            question: "What does Q-Former in BLIP-2 do?",
            options: ["Trains the LLM from scratch", "Bridges a frozen image encoder and frozen LLM with 32 learnable queries", "Generates images", "Compresses audio"],
            answer: 1,
            explanation: "Q-Former is the only trainable component — keeps multimodal training cheap.",
          },
          {
            question: "What is 'modality dominance' in multimodal training?",
            options: ["The model uses GPU memory aggressively", "The easier modality overshadows the harder one in the loss", "User selects the dominant input", "A trademark issue"],
            answer: 1,
            explanation: "Loss balancing or temperature scaling prevents text from drowning out vision/audio signals.",
          },
        ],
      },
      {
        id: "dl-14",
        title: "Edge AI — Quantization, Pruning & Distillation",
        titleEn: "Edge AI — Quantization, Pruning & Distillation",
        level: 4,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — Lessons 1–6.

## 1. Why deploy on the edge?

Cloud inference costs scale linearly with users; latency depends on network; privacy-sensitive data (faces, voice, medical) shouldn't leave the device. **On-device inference** (smartphone, Raspberry Pi, microcontroller) solves all three — but a 7B-parameter model in float32 needs **28 GB**. We need to compress it 50–500×.

## 2. The compression toolbox

\`\`\`mermaid
flowchart LR
    BIG[FP32 Model<br/>~28 GB] --> Q[Quantization<br/>FP32 → INT8 / INT4]
    BIG --> P[Pruning<br/>Drop near-zero weights]
    BIG --> D[Distillation<br/>Small student mimics big teacher]
    Q --> SMALL[Small Model<br/>~500 MB → MCU-friendly]
    P --> SMALL
    D --> SMALL
\`\`\`

### A. Quantization
| Format | Bits | Size of Llama-7B | Quality drop |
|---|---|---|---|
| FP32 | 32 | 28 GB | baseline |
| FP16 | 16 | 14 GB | ~0 % |
| INT8 (PTQ) | 8 | 7 GB | < 1 % |
| INT4 (GPTQ/AWQ) | 4 | 3.5 GB | 1–3 % |
| 1.58-bit (BitNet) | 1.58 | 1.3 GB | active research |

**PTQ** (Post-Training Quantization) is one shot — calibrate on 128 samples. **QAT** (Quantization-Aware Training) simulates rounding during training — better accuracy, slower.

### B. Pruning
**Magnitude pruning** drops weights with |w| below threshold; **structured pruning** drops whole channels/heads (faster on GPU). Lottery Ticket Hypothesis (Frankle 2018) shows you can keep 5 % of weights and retrain to full accuracy.

### C. Knowledge Distillation
Hinton 2015. Train a small **student** to match a big **teacher**'s soft probabilities (with temperature \`T\`). DistilBERT keeps 97 % of BERT accuracy at 40 % size, 60 % faster.

## 3. The deployment pipeline

PyTorch → **ONNX** → backend (TensorRT for NVIDIA, Core ML for iPhone, TFLite for Android, GGUF for CPU/llama.cpp). Each backend applies its own kernel fusion and quantization.

## 4. Real-world example: license plate recognition on traffic cameras

Vietnam's smart traffic cameras (Hà Nội, HCM) need to read 100 plates/sec on a $50 SoC. A YOLOv8-nano (3 MB INT8) detects the plate; a 5-layer CRNN (1 MB) reads it. Total: 4 MB, 35 ms per frame, no cloud.

## ⚠️ Common Pitfalls
- **Quantizing without calibration** — weights round fine, but **activations** clip → catastrophic accuracy loss. Always calibrate on representative data.
- **Pruning + retraining order** — pruning then retraining (iterative magnitude pruning) recovers accuracy; prune-only does not.
- **Forgetting embedding tables** — for LLMs, embeddings are 30 % of the size — quantize them too.

## 🛠️ Practice Task
You must deploy a sentiment classifier (BERT-base, 110M params) on a Raspberry Pi 4 (1 GB RAM). Pick a compression strategy and justify the order of operations.`,
        theoryEn: "",
        code: `# 4-bit quantize a Llama model with bitsandbytes (single GPU)
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import torch

bnb = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",          # NormalFloat-4
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,     # quantize the quantization constants
)

model_id = "meta-llama/Llama-3.1-8B-Instruct"
tok = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id, quantization_config=bnb, device_map="auto"
)
print(f"Memory footprint: {model.get_memory_footprint() / 1e9:.2f} GB")
# Llama-3.1-8B in nf4 ≈ 5.4 GB → fits a single RTX 3060 12 GB

prompt = "Explain quantization in one sentence:"
out = model.generate(**tok(prompt, return_tensors="pt").to(model.device),
                     max_new_tokens=60, do_sample=False)
print(tok.decode(out[0], skip_special_tokens=True))`,
        codeLanguage: "python",
        exercise: "Compare quantization vs distillation for compressing a 1B-parameter chatbot to run on a phone. Discuss accuracy, training cost, and inference latency.",
        exerciseEn: "",
        quiz: [
          {
            question: "Which quantization method usually preserves the highest accuracy?",
            options: ["PTQ INT4", "QAT INT8", "Magnitude pruning", "FP16 with no calibration"],
            answer: 1,
            explanation: "QAT simulates rounding during training so the model learns to compensate — best accuracy, more compute.",
          },
          {
            question: "Knowledge Distillation transfers from teacher to student through:",
            options: ["Hard labels only", "Teacher's soft probability distribution at temperature T", "Random label noise", "Quantized weights"],
            answer: 1,
            explanation: "Soft targets carry richer information than one-hot labels — that's the 'dark knowledge'.",
          },
          {
            question: "Why do we calibrate before INT8 PTQ?",
            options: ["To compress weights more", "To estimate activation ranges so we don't clip them", "To speed up training", "It is required by ONNX"],
            answer: 1,
            explanation: "Activations have wide dynamic range; calibration picks the scale that minimizes clipping error.",
          },
        ],
      },
      {
        id: "dl-15",
        title: "MLOps for Deep Learning — From Notebook to Production",
        titleEn: "MLOps for Deep Learning — From Notebook to Production",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** — All previous lessons. This is the capstone.

## 1. Why "it works in my notebook" isn't enough

A model that wins a Kaggle leaderboard is **5 %** of a real ML system. The other 95 % is data pipelines, monitoring, retraining, A/B testing, rollback, compliance. **MLOps** = DevOps + the unique problems of data and models.

## 2. The end-to-end lifecycle

\`\`\`mermaid
flowchart LR
    DATA[Data ingestion<br/>Airflow, Kafka] --> FS[Feature Store<br/>Feast, Tecton]
    FS --> EXP[Experimentation<br/>MLflow, W&B]
    EXP --> REG[Model Registry<br/>versions + metadata]
    REG --> CICD[CI/CD<br/>GitHub Actions, Argo]
    CICD --> SERVE[Serving<br/>Triton, TorchServe, vLLM]
    SERVE --> MON[Monitoring<br/>latency + drift + cost]
    MON --> RETRAIN[Trigger retrain]
    RETRAIN --> EXP
\`\`\`

## 3. Three drift types you must monitor

| Drift | Symptom | Detection |
|---|---|---|
| **Data drift** | Input distribution shifts | KS-test, PSI, embedding distance |
| **Concept drift** | P(y\\|x) shifts (world changes) | Drop in online metrics |
| **Model drift** | Predictions become biased | Calibration plots, fairness audits |

In 2020, COVID broke nearly every demand-forecasting model on the planet — concept drift at scale.

## 4. Serving patterns

| Pattern | Use case | Latency |
|---|---|---|
| **Batch** | Daily reports, recommendations | Hours |
| **Online (REST)** | Chatbot, fraud check | < 100 ms |
| **Streaming** | Real-time bidding | < 10 ms |
| **Edge** | On-device, offline | 1 ms, no network |

For LLMs specifically, **vLLM** + paged attention serves 5–24× more requests/sec than naive Hugging Face inference.

## 5. Real-world example: Grab's surge pricing

Grab serves >1B predictions/day across SE-Asia. Stack: feature store (DynamoDB), models (XGBoost + DL), Triton on GPU, online metrics (latency p99 < 50 ms, business KPI = driver acceptance rate). Drift detected → automatic retrain on yesterday's data → A/B vs current champion → promote if win.

## 6. Reproducibility checklist

1. **Pin** every dependency (uv, poetry, conda-lock).
2. **Hash** the training data (DVC, LakeFS).
3. **Log** all hyperparameters and the **git commit** of the training run.
4. **Containerize** the inference image; tag with model version + framework version.
5. **Save** the calibration data used for quantization.

## ⚠️ Common Pitfalls
- **Train/serve skew** — different feature engineering in training vs production. Cure: a single feature store used by both.
- **Silent label leakage** — a feature available at training time but not at inference. Cure: simulate prod timing offline.
- **No rollback plan** — always serve the last 2 model versions behind a flag.

## 🛠️ Practice Task
Design the MLOps stack for a Vietnamese-language chatbot deployed on web + mobile, serving 10 000 RPS. List: serving framework, GPU type, monitoring metrics, retraining trigger, and rollback strategy.`,
        theoryEn: "",
        code: `# Minimal MLflow tracking + model registry workflow
import mlflow, mlflow.pytorch, torch, torch.nn as nn

mlflow.set_tracking_uri("http://mlflow.haiedu.local:5000")
mlflow.set_experiment("sentiment-vi")

with mlflow.start_run(run_name="distilbert-vi-v3") as run:
    # 1. Log hyperparameters
    params = {"lr": 2e-5, "batch_size": 32, "epochs": 3, "model": "distilbert-base-multilingual"}
    mlflow.log_params(params)

    # ... training loop here ...
    val_f1 = 0.912
    val_loss = 0.187
    mlflow.log_metrics({"val_f1": val_f1, "val_loss": val_loss})

    # 2. Log the trained model artifact + signature
    model = nn.Linear(768, 3)        # placeholder
    mlflow.pytorch.log_model(
        model, artifact_path="model",
        registered_model_name="sentiment-vi",
    )

    # 3. Promote to "Staging" if it beats the champion
    client = mlflow.tracking.MlflowClient()
    champion = client.get_model_version_by_alias("sentiment-vi", "production")
    champion_f1 = float(champion.tags.get("val_f1", 0))
    if val_f1 > champion_f1:
        new_v = client.get_latest_versions("sentiment-vi", stages=["None"])[0]
        client.set_registered_model_alias("sentiment-vi", "staging", new_v.version)
        print(f"✅ Promoted v{new_v.version} to staging (F1 {val_f1:.3f} > {champion_f1:.3f})")
    else:
        print("⏭  Champion still wins, no promotion.")`,
        codeLanguage: "python",
        exercise: "You deploy a sentiment model. After 3 weeks, accuracy drops from 92 % to 78 %. List 4 diagnostic steps in order, naming the tool you would use at each step.",
        exerciseEn: "",
        quiz: [
          {
            question: "Which drift describes 'the world changed, so the relationship between X and Y changed'?",
            options: ["Data drift", "Concept drift", "Model drift", "Schema drift"],
            answer: 1,
            explanation: "P(y|x) changes — exactly what COVID did to demand forecasting models.",
          },
          {
            question: "Best cure for train/serve skew?",
            options: ["Train longer", "Use the same feature store online and offline", "Increase batch size", "Switch to PyTorch Lightning"],
            answer: 1,
            explanation: "A single source of feature definitions guarantees identical computation in training and inference.",
          },
          {
            question: "Why use vLLM for LLM serving?",
            options: ["It writes the model code for you", "Paged attention serves many more concurrent requests on the same GPU", "It quantizes models automatically", "It is the only framework that supports HuggingFace"],
            answer: 1,
            explanation: "vLLM's paged KV-cache enables 5–24× throughput vs naive HF generate().",
          },
        ],
      },
    ],
  },
];
