// AI Foundation curriculum - 12 modules with progressive difficulty
import type { ExtendedProgrammingModule } from "./types";

export const aiFoundationModules: ExtendedProgrammingModule[] = [
  {
    id: "ai-history",
    title: "History of AI",
    titleEn: "History of AI",
    icon: "📜",
    color: "from-rose-500 to-pink-600",
    description: "From Turing to GPT - the journey to AI development",
    descriptionEn: "From Turing to GPT - the evolution of AI",
    course: "data-ai",
    lessons: [
      {
        id: "ai-hist-1", title: "From Turing to Deep Learning", titleEn: "From Turing to Deep Learning",
        level: 1, difficulty: "beginner",
        theory: `## 1. 🚦 Vấn đề đời thường

70 năm trước, "AI" còn là chuyện viễn tưởng - nay điện thoại trong túi bạn dịch tiếng Việt-Anh, gợi ý đường, vẽ tranh trong 3 giây. Hành trình đó không phải "đùng cái có" - mà là chuỗi 70 năm "winter" + "spring" với những bước nhảy thay đổi thế giới. Hiểu lịch sử AI giúp bạn đoán được bước tiếp theo.

## 2. 💡 Cột mốc cốt lõi

| Năm | Sự kiện | Ý nghĩa |
|---|---|---|
| 1950 | **Turing Test** | "Máy có suy nghĩ?" - đặt câu hỏi nền tảng |
| 1956 | **Dartmouth Conference** | Thuật ngữ "Artificial Intelligence" ra đời |
| 1958 | **Perceptron** (Rosenblatt) | Neural net đầu tiên |
| 1969-80 | **AI Winter 1** | Perceptron bị chứng minh không học XOR |
| 1986 | **Backpropagation** (Rumelhart) | Cứu neural net |
| 1997 | **Deep Blue thắng Kasparov** | AI thắng cờ vua |
| 2012 | **AlexNet** (ImageNet) | Deep Learning bùng nổ |
| 2017 | **Transformer** ("Attention is all you need") | Nền móng GPT/BERT |
| 2020 | **GPT-3** (175B params) | LLM đại chúng |
| 2022 | **ChatGPT** | AI vào mọi nhà |
| 2024+ | **Multimodal + Agents** | AI hành động, không chỉ nói |

## 3. 🧰 Ba làn sóng

1. **Symbolic AI** (1950-80): viết tay luật if-then. Mạnh logic, dở perception.
2. **Machine Learning** (1990-2010): học từ data, cần feature engineering.
3. **Deep Learning** (2012-nay): tự học feature qua nhiều lớp neural.

## 4. 🎯 Ví dụ trực quan

\\\`\\\`\\\`python
# Symbolic: "Nếu nhiệt độ > 38 → sốt"
def is_fever(t): return t > 38

# ML: học từ data
from sklearn.tree import DecisionTreeClassifier
clf = DecisionTreeClassifier().fit(X, y)

# Deep Learning: nhiều lớp tự học feature
import torch.nn as nn
model = nn.Sequential(nn.Linear(10,64), nn.ReLU(), nn.Linear(64,1))
\\\`\\\`\\\`

## 5. ⚠️ Hiểu nhầm thường gặp

> ⚠️ **Cảnh báo:**
> - "AI = Deep Learning" - sai. DL là 1 nhánh, ML rộng hơn, AI rộng hơn nữa.
> - "ChatGPT là AI thông minh thật" - nó là LLM dự đoán token, không có ý thức.
> - "AI Winter sẽ không quay lại" - chưa chắc; mỗi lần kỳ vọng vượt thực tế là 1 winter.
> - "GPU là lý do duy nhất AI bùng nổ" - thật ra là **GPU + Big Data + Backprop + Transformer + Internet**, đủ 5 yếu tố.

## 6. ✅ Best practice

> 💡 **Mẹo:**
> - Học AI nên đi theo **trình tự lịch sử**: Perceptron → MLP → CNN → RNN → Transformer. Mỗi bước trả lời 1 câu "tại sao cần cái sau?".
> - Đọc lại bài báo gốc ngắn (Turing 1950, Attention is all you need 2017) - nhiều thuật ngữ ngày nay vẫn từ đó.
> - Theo dõi 2 nguồn: **arXiv sanity** (paper mới), **Papers with Code** (paper + repo).

## 7. 🤔 Áp dụng

Khi đọc 1 paper/sản phẩm mới, hỏi:
1. Đây thuộc làn sóng nào? (symbolic / ML / DL)
2. Vấn đề "winter" trước đây nó giải quyết là gì?
3. Có rủi ro hype lần này không?

## 8. 📌 Tóm tắt 30 giây

AI 70 năm = 3 làn sóng (symbolic → ML → DL), 2 mùa đông và nhiều bước nhảy: Perceptron, Backprop, AlexNet, Transformer, ChatGPT. Hiểu lịch sử = đoán được tương lai và tránh hype.
`,
        theoryEn: `**History of Artificial Intelligence - A Comprehensive Overview**

Artificial Intelligence (AI) has evolved through several distinct eras, each marked by breakthroughs, setbacks, and paradigm shifts. Understanding this history is essential for any AI practitioner.

---

**🧮 The Birth of AI (1940s-1950s)**

- **1943:** Warren McCulloch & Walter Pitts create the first mathematical model of a neural network.
- **1950:** Alan Turing publishes *"Computing Machinery and Intelligence"*, proposing the famous **Turing Test** - a benchmark for machine intelligence.
- **1956:** The **Dartmouth Conference** officially coins the term "Artificial Intelligence." This is considered the founding moment of AI as a field.

**Key Insight:** Early AI researchers were incredibly optimistic - predicting human-level AI within 20 years.

---

**🤖 The Golden Age (1960s)**

- **1961:** UNIMATE, the first industrial robot.
- **1964:** ELIZA - the first chatbot, simulating a psychotherapist using pattern matching.
- Expert systems begin development - rule-based AI encoding human expertise.

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
- **2017:** **"Attention Is All You Need"** - the Transformer architecture.
- **2022:** **ChatGPT** reaches 100M users in 2 months.
- **2023-2024:** GPT-4, Claude, Gemini, open-source LLMs proliferate.

---

**📊 Key Themes:** Symbolic AI → Expert Systems → Statistical ML → Deep Learning → Foundation Models. Each era had its own approach, strengths, and limitations.`,
        code: `# Trực quan hóa dòng thời gian AI
# Dữ liệu: danh sách mốc thời gian (năm, tiêu đề, mô tả)
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
# Hiển thị tiêu đề và dòng phân cách
print("🤖 AI Timeline")
print("=" * 60)
# Duyệt từng mốc và in thanh biểu diễn theo năm
for year, event, desc in timeline:
    bar = "█" * ((year - 1945) // 5)
    print(f"  {year} | {bar} {event}")
    print(f"       └─ {desc}")
# In tổng số mốc và tổng số năm giữa mốc đầu và mốc cuối
print(f"\\\\n📊 {len(timeline)} milestones spanning {timeline[-1][0] - timeline[0][0]} years")`,
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
    title: "Basic Neural Network",
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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn quyết định **đi xem phim hay không** dựa trên 3 yếu tố: phim hay (8/10), giá vé (rẻ hay không), bạn rủ (có hay không). Não bạn cân từng yếu tố theo "weights" - phim hay quan trọng nhất, sau đó bạn rủ, cuối cùng là giá. Cộng lại > ngưỡng → đi.

Đó **chính xác** là một **Perceptron**: input × weight + bias → activation → output.

## 2. 💡 Khái niệm chính

- **Perceptron** = neural unit nhỏ nhất: $y = f(w_1 x_1 + w_2 x_2 + ... + b)$
- **Weight (w)**: tầm quan trọng của input.
- **Bias (b)**: ngưỡng "nỗ lực tối thiểu" để kích hoạt.
- **Activation (f)**: hàm bẻ cong linear → phi tuyến (sigmoid, ReLU).
- **Forward pass**: tính output từ input qua nhiều lớp.

## 3. 🧰 Cấu trúc tối thiểu

\\\`\\\`\\\`
Input layer  →  Hidden layer(s)  →  Output layer
   x1,x2,x3       w·x + b → ReLU       softmax/sigmoid
\\\`\\\`\\\`

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`python
import numpy as np

def sigmoid(z): return 1 / (1 + np.exp(-z))

# Perceptron 1 đơn vị: dự đoán "đi xem phim"
x = np.array([0.8, 0.0, 1.0])         # phim hay, vé đắt, có bạn rủ
w = np.array([0.6, -0.4, 0.5])        # weights học được
b = -0.3

z = np.dot(w, x) + b                  # 0.48 + 0 + 0.5 - 0.3 = 0.68
y = sigmoid(z)                        # 0.664 → đi (>0.5)
print(f"P(đi xem phim) = {y:.3f}")
\\\`\\\`\\\`

\\\`\\\`\\\`python
# Multi-layer Perceptron với PyTorch (forward pass)
import torch.nn as nn, torch
mlp = nn.Sequential(
    nn.Linear(3, 8), nn.ReLU(),
    nn.Linear(8, 1), nn.Sigmoid()
)
print(mlp(torch.tensor([[0.8, 0.0, 1.0]])))
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Không có activation phi tuyến** → dù bao nhiêu lớp cũng = 1 lớp linear (vô dụng).
> - **Không scale input** (giá nhà 1 tỷ vs số phòng 3) → gradient nổ hoặc chết.
> - **Bias = 0 và init random** → mọi neuron học giống nhau (symmetry breaking fail).
> - **Quên softmax/sigmoid ở output** → loss tính sai.

## 6. ✅ Best practice

> 💡 **Mẹo:**
> - Vẽ kiến trúc trước khi code: input shape → các lớp → output shape.
> - **He init** cho ReLU, **Xavier init** cho sigmoid/tanh.
> - Bắt đầu **MLP nhỏ** (1-2 hidden layer, 32-128 neuron) - đừng chồng 10 lớp ngay.
> - Khi forward pass ra NaN: kiểm tra learning rate quá cao, input chưa scale, hoặc log(0).

## 7. 🤔 Khi nào dùng MLP

| Hợp | Không hợp (dùng kiến trúc khác) |
|---|---|
| Tabular structured data | Ảnh → CNN |
| Embedding đã có | Chuỗi/text → RNN/Transformer |
| Baseline nhanh | Graph → GNN |

## 8. 📌 Tóm tắt 30 giây

Perceptron = "cân nhắc theo weights": $y = f(\\\\sum w_i x_i + b)$. Nhiều perceptron xếp lớp = MLP. Phải có activation phi tuyến, phải scale input, phải init đúng. Đây là viên gạch đầu tiên của mọi kiến trúc neural net khác.
`,
        theoryEn: `**Neural Networks - The Foundation of Modern AI**

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
        code: `# Nhập library numpy để xử lý toán học và mảng
import numpy as np

# Define Perceptron (một neuron đơn giản)
class Perceptron:
    # Initialize weights và bias cho perceptron
    def __init__(self, n_inputs):
        self.weights = np.random.randn(n_inputs) * 0.1
        self.bias = 0.0

    # Hàm kích hoạt sigmoid với clipping để tránh overflow
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    # Tính đầu ra neuron: z = w·x + b rồi qua sigmoid
    def forward(self, x):
        z = np.dot(x, self.weights) + self.bias
        return self.sigmoid(z)

# Create a neuron đơn giản
neuron = Perceptron(3)
print(f"Weights: {neuron.weights}")
print(f"Bias: {neuron.bias}")

# Thực hiện một lần truyền tiến (forward pass)
inputs = np.array([0.5, 0.3, 0.8])
output = neuron.forward(inputs)
print(f"\\\\nInput: {inputs}")
print(f"Output: {output:.4f}")

# Mạng đơn giản 2 lớp
class SimpleNetwork:
    # Create lớp mạng 2 lớp: 3 neuron ẩn và 1 neuron đầu ra
    def __init__(self):
        # Initialize 3 neuron cho lớp ẩn bằng list comprehension
        self.hidden = [Perceptron(2) for _ in range(3)]
        # Neuron đầu ra nhận 3 đầu vào từ lớp ẩn
        self.output = Perceptron(3)

    # Chạy mạng: tính đầu ra của lớp ẩn rồi đầu ra cuối cùng
    def forward(self, x):
        # Tính đầu ra mỗi neuron ẩn (sử dụng list comprehension)
        h = np.array([n.forward(x) for n in self.hidden])
        return self.output.forward(h)

# Create mạng và chạy một ví dụ đầu vào
net = SimpleNetwork()
result = net.forward(np.array([1.0, 0.5]))
print(f"\\\\n🧠 Network output: {result:.4f}")`,
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
        id: "ai-act-1", title: "Activation functions", titleEn: "Activation Functions Deep Dive",
        level: 2, difficulty: "intermediate",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn vào phòng tối, công tắc đèn có 2 trạng thái: **bật** hoặc **tắt**. Nhưng đèn dimmer thì có "mờ → sáng dần → chói loà" - uyển chuyển hơn. Trong neural net, **activation function** chính là công tắc / dimmer quyết định "neuron này có cháy không và cháy mạnh thế nào".

Không có activation phi tuyến, neural net dù 100 lớp cũng chỉ bằng 1 phép cộng linear - vô dụng.

## 2. 💡 Khái niệm chính

| Hàm | Công thức | Output | Vai trò |
|---|---|---|---|
| **Sigmoid** | $1/(1+e^{-x})$ | (0,1) | Output xác suất nhị phân |
| **Tanh** | $(e^x-e^{-x})/(e^x+e^{-x})$ | (-1,1) | Sigmoid xoay tâm về 0 |
| **ReLU** | $\\\\max(0,x)$ | $[0,\\\\infty)$ | **Mặc định cho hidden** |
| **Leaky ReLU** | $\\\\max(0.01x, x)$ | $\\\\mathbb{R}$ | Tránh "dying ReLU" |
| **GELU** | $x \\\\cdot \\\\Phi(x)$ | $\\\\mathbb{R}$ | Transformer/GPT |
| **Softmax** | $e^{x_i}/\\\\sum e^{x_j}$ | (0,1), tổng=1 | Output classification nhiều lớp |

## 3. 🧰 Khi nào dùng cái nào

- **Hidden layer**: ReLU (default) → GELU (transformer) → Leaky ReLU (nếu thấy nhiều neuron chết).
- **Output binary**: Sigmoid.
- **Output multi-class**: Softmax.
- **Output regression**: Không activation (linear).

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`python
import torch, torch.nn as nn
x = torch.tensor([-2., -0.5, 0., 1., 3.])

print("ReLU   :", torch.relu(x))           # [0, 0, 0, 1, 3]
print("Leaky  :", nn.LeakyReLU(0.01)(x))   # [-0.02, -0.005, 0, 1, 3]
print("Sigmoid:", torch.sigmoid(x))        # (0,1)
print("Tanh   :", torch.tanh(x))           # (-1,1)
print("Softmax:", torch.softmax(x, dim=0)) # tổng = 1
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Sigmoid trong hidden layer sâu** → vanishing gradient (đạo hàm tối đa 0.25, nhân nhau qua nhiều lớp → ~0).
> - **Dying ReLU**: với learning rate cao, neuron có thể "chết" - output luôn 0 mãi mãi.
> - **Quên softmax + dùng CrossEntropyLoss**: PyTorch \`nn.CrossEntropyLoss\` đã tích hợp softmax - đừng softmax 2 lần.
> - **Tanh chưa chuẩn hoá input**: dễ bão hoà ở -1 hoặc 1 → gradient ~0.

## 6. ✅ Best practice

> 💡 **Mẹo:**
> - **Mặc định ReLU**, đổi GELU nếu làm transformer, Leaky/PReLU nếu thấy nhiều neuron chết.
> - **Sigmoid/Tanh chỉ dùng ở output layer** (binary / bounded regression).
> - Theo dõi **% neuron có activation = 0** - > 50% là dấu hiệu dying ReLU.
> - **He init** cho ReLU/Leaky, **Xavier init** cho sigmoid/tanh.
> - Đừng đổi activation lung tung khi loss không giảm - kiểm tra learning rate, init, data trước.

## 7. 🤔 So sánh tốc độ

ReLU > Leaky > GELU > Tanh > Sigmoid (về tốc độ tính + gradient ổn định).

## 8. 📌 Tóm tắt 30 giây

Activation = công tắc bật neuron, biến linear → phi tuyến. **ReLU mặc định cho hidden, Sigmoid/Softmax cho output**. Tránh sigmoid trong hidden sâu (vanishing), tránh learning rate quá cao (dying ReLU). Không có activation phi tuyến = neural net chỉ là 1 lớp.
`,
        theoryEn: `**Activation Functions - Adding Non-Linearity to Neural Networks**

Without activation functions, a neural network is just linear regression. Activation functions introduce **non-linearity**.

---

**Sigmoid:** σ(x) = 1/(1+e⁻ˣ) → [0,1]. Good for binary output, but vanishing gradient.

**Tanh:** [-1,1]. Zero-centered, but still vanishing gradient.

**ReLU:** max(0,x) → most popular. Fast, no vanishing gradient for positives. Dying ReLU problem.

**Leaky ReLU:** max(0.01x, x) → fixes dying ReLU. Variants: PReLU, ELU, GELU, SiLU.

**Softmax:** Converts vector to probabilities (sum=1). For multi-class output.

---

**Quick Reference:** Hidden layers → ReLU/GELU. Binary output → Sigmoid. Multi-class → Softmax. RNN → Tanh.`,
        code: `# Nhập library NumPy để làm việc với các mảng số.
import numpy as np

# Define hàm sigmoid.
# Hàm này thường dùng để nén giá trị đầu vào về khoảng (0, 1).
# Input: x (một số hoặc mảng số).
# Output: Giá trị sigmoid của x.
def sigmoid(x): return 1 / (1 + np.exp(-x))
# Define hàm tanh (tangent hyperbolic).
# Hàm này nén giá trị đầu vào về khoảng (-1, 1).
# Input: x (một số hoặc mảng số).
# Output: Giá trị tanh của x.
def tanh(x): return np.tanh(x)
# Define hàm ReLU (Rectified Linear Unit).
# Hàm này trả về 0 nếu x âm, và trả về x nếu x dương.
# Input: x (một số hoặc mảng số).
# Output: Giá trị ReLU của x.
def relu(x): return np.maximum(0, x)
# Define hàm Leaky ReLU.
# Tương tự ReLU nhưng cho phép một lượng nhỏ gradient khi x âm (tránh "chết" neuron).
# Input: x (một số hoặc mảng số), alpha (hệ số cho phần âm, mặc định 0.01).
# Output: Giá trị Leaky ReLU của x.
def leaky_relu(x, alpha=0.01): return np.where(x > 0, x, alpha * x)
# Define hàm softmax.
# Hàm này chuyển đổi một vector các số thực thành một phân phối xác suất.
# Tổng các phần tử đầu ra sẽ bằng 1.
# Input: x (một mảng số).
# Output: Mảng các giá trị xác suất.
def softmax(x):
    # Trừ đi giá trị lớn nhất để tránh tràn số (overflow) khi tính np.exp.
    e = np.exp(x - np.max(x))
    # Chia cho tổng của các giá trị đã tính để chuẩn hóa thành xác suất.
    return e / e.sum()

# Initialize một mảng NumPy làm dữ liệu đầu vào.
x = np.array([-2, -1, 0, 1, 2])
# Print mảng đầu vào.
# Expected result: Input:      [-2 -1  0  1  2]
print("Input:     ", x)
# Áp dụng hàm sigmoid cho mảng x, chuyển đổi kiểu dữ liệu sang float trước.
# Làm tròn kết quả đến 3 chữ số thập phân.
# Expected result: Sigmoid:    [0.119 0.269 0.5   0.731 0.881]
print("Sigmoid:   ", np.round(sigmoid(x.astype(float)), 3))
# Áp dụng hàm tanh cho mảng x, chuyển đổi kiểu dữ liệu sang float trước.
# Làm tròn kết quả đến 3 chữ số thập phân.
# Expected result: Tanh:       [-0.964 -0.762  0.    0.762  0.964]
print("Tanh:      ", np.round(tanh(x.astype(float)), 3))
# Áp dụng hàm ReLU cho mảng x.
# Expected result: ReLU:       [0 0 0 1 2]
print("ReLU:      ", relu(x))
# Áp dụng hàm Leaky ReLU cho mảng x, chuyển đổi kiểu dữ liệu sang float trước.
# Làm tròn kết quả đến 3 chữ số thập phân.
# Expected result: LeakyReLU:  [-0.02  -0.01   0.     1.     2.   ]
print("LeakyReLU: ", np.round(leaky_relu(x.astype(float)), 3))

# Initialize một mảng logits (đầu ra thô từ một lớp mạng nơ-ron) để kiểm tra softmax.
logits = np.array([2.0, 1.0, 0.1])
# Áp dụng hàm softmax cho mảng logits và in kết quả, làm tròn đến 3 chữ số thập phân.
# Expected result: \\nSoftmax([2.  1.  0.1]) = [0.659 0.242 0.099]
print(f"\\\\nSoftmax({logits}) = {np.round(softmax(logits), 3)}")
# Tính tổng của các giá trị sau khi áp dụng softmax và in ra.
# Tổng này phải xấp xỉ 1.0.
# Expected result: Sum = 1.0000
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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn tập ném phi tiêu vào hồng tâm. Mỗi lần ném lệch, bạn **đo khoảng cách** trượt mục tiêu (loss), rồi **điều chỉnh tay** để lần sau gần hơn. Càng nhiều lần thử + điều chỉnh đúng hướng, càng gần tâm.

Đó chính là **Loss + Gradient Descent**: đo sai số, tính hướng sửa, bước theo hướng đó - lặp lại tới khi loss đủ nhỏ.

## 2. 💡 Khái niệm chính

- **Loss function**: con số đo "sai bao nhiêu" so với ground truth.
- **Gradient**: đạo hàm của loss theo từng weight - chỉ "đi hướng nào loss giảm nhanh nhất".
- **Gradient Descent**: $w \\\\leftarrow w - \\\\eta \\\\cdot \\\\nabla L$ ($\\\\eta$ = learning rate).

## 3. 🧰 Loss phổ biến

| Bài toán | Loss | Lý do |
|---|---|---|
| Regression | **MSE** $(y-\\\\hat y)^2$ | Phạt sai lớn nặng |
| Regression có outlier | **MAE / Huber** | Bớt nhạy outlier |
| Binary | **BCE** | Khớp với sigmoid |
| Multi-class | **CrossEntropy** | Khớp với softmax |
| Imbalanced | **Focal Loss** | Tập trung sample khó |

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`python
import torch, torch.nn as nn
x = torch.tensor([1., 2., 3., 4.])
y = torch.tensor([2., 4., 6., 8.])              # y = 2x

w = torch.tensor([0.5], requires_grad=True)
optim = torch.optim.SGD([w], lr=0.05)
loss_fn = nn.MSELoss()

for step in range(50):
    y_hat = w * x
    loss = loss_fn(y_hat, y)
    optim.zero_grad()
    loss.backward()                              # tính gradient
    optim.step()                                 # cập nhật w
print(f"w = {w.item():.4f}")                     # ~ 2.0
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Learning rate quá cao** → loss nhảy lung tung, bay qua điểm tốt nhất.
> - **Quá thấp** → train 10h mới giảm 1 chút.
> - **Quên \`optim.zero_grad()\`** → gradient cộng dồn → cập nhật sai.
> - **Loss = NaN**: thường do log(0), chia 0, lr quá cao, hoặc input chưa scale.
> - **Chỉ nhìn train loss**: cần xem cả validation - train loss giảm mà val tăng = overfit.

## 6. ✅ Best practice

> 💡 **Mẹo:**
> - **Bắt đầu lr = 1e-3** (Adam) hoặc 1e-2 (SGD), rồi điều chỉnh theo loss curve.
> - Dùng **Learning Rate Finder** (fastai, lr_finder) để tìm lr tối ưu trong 1 phút.
> - **Optimizer**: Adam cho hầu hết bài toán; SGD + momentum cho CV cuối cùng (thường tổng quát hoá tốt hơn).
> - **Gradient clipping** ($\\\\|g\\\\| \\\\le 1.0$) cho RNN/Transformer để tránh nổ gradient.
> - Vẽ **loss curve** mỗi epoch - nó nói cho bạn biết mọi vấn đề.

## 7. 🤔 Variants của GD

| Tên | Đặc điểm |
|---|---|
| Batch GD | Dùng toàn bộ data → chậm, ổn định |
| **SGD** | 1 sample → nhanh, nhiễu |
| **Mini-batch SGD** | Batch 32-256 → cân bằng (chuẩn ngày nay) |
| Momentum | Có "đà" → vượt qua local minima |
| Adam | Adaptive lr cho từng weight (default ngày nay) |

## 8. 📌 Tóm tắt 30 giây

Loss = đo sai; Gradient = chỉ hướng sửa; GD = bước theo hướng đó. Chọn loss đúng bài toán (MSE/CE/BCE), chọn lr vừa phải, dùng Adam mặc định. Luôn vẽ loss curve và theo dõi cả val loss để bắt overfit sớm.
`,
        theoryEn: `**Loss Functions & Optimization - How Neural Networks Learn**

---

**Regression Losses:** MSE (penalizes large errors), MAE (robust to outliers), Huber (best of both).

**Classification Losses:** Binary Cross-Entropy (binary), Categorical Cross-Entropy (multi-class).

---

**Gradient Descent:** w = w - lr × ∂L/∂w. Move in direction of steepest descent.

**Variants:** Batch GD (all data), SGD (1 sample), Mini-batch (32-512).

**Optimizers:** SGD → Momentum → RMSProp → **Adam** (most popular, combines Momentum + RMSProp).

**Problems:** LR too high → diverge. LR too low → slow. Saddle points. Gradient explosion.`,
        code: `# Nhập library NumPy để xử lý mảng và phép toán số
import numpy as np

# Hàm mất mát (loss functions)
# Hàm MSE: sai số bình phương trung bình
def mse(y_true, y_pred):
    return np.mean((y_true - y_pred) ** 2)

# Hàm BCE: binary cross-entropy cho bài toán classification nhị phân
def binary_cross_entropy(y_true, y_pred):
    y_pred = np.clip(y_pred, 1e-7, 1 - 1e-7)
    return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

# Minh họa Gradient Descent
print("📉 Gradient Descent: Finding minimum of f(x) = x²")
x = 5.0
lr = 0.3
history = []

# Vòng lặp tối ưu hóa: cập nhật x theo gradient descent
for epoch in range(20):
    gradient = 2 * x  # đạo hàm của x²
    x = x - lr * gradient
    loss = x ** 2
    history.append((epoch, round(x, 4), round(loss, 6)))
    # In một vài epoch đầu và cuối để theo dõi tiến trình
    if epoch < 8 or epoch >= 18:
        print(f"  Epoch {epoch:2d}: x = {x:8.4f}, loss = {loss:.6f}")

print(f"\\\\n✅ Converged to x ≈ {x:.6f} (optimal: 0)")`,
        codeLanguage: "python",
        exercise: "Implement gradient descent for f(x,y) = x² + 2y². Find minimum starting from (5, 3).",
        exerciseEn: "Implement gradient descent for f(x,y) = x² + 2y². Find minimum starting from (5, 3).",
        quiz: [
          { question: "What happens when learning rate is too high?", options: ["Converges faster", "Overshooting - loss oscillates or diverges", "No effect", "Always better"], answer: 1, explanation: "A high learning rate causes the optimizer to 'jump' too far, potentially overshooting the minimum and causing divergence." },
          { question: "Why is Adam the most popular optimizer?", options: ["It's the simplest", "It combines Momentum and RMSProp with adaptive learning rates", "It requires no hyperparameters", "It always finds global minimum"], answer: 1, explanation: "Adam combines the benefits of Momentum (acceleration) and RMSProp (adaptive per-parameter learning rates), working well out of the box for most problems." },
          { question: "What does Binary Cross-Entropy penalize most?", options: ["Small errors", "Confident wrong predictions", "Correct predictions", "Predictions near 0.5"], answer: 1, explanation: "If the model predicts 0.01 for a true label of 1, the loss is -log(0.01) ≈ 4.6, which is extremely high. Confident wrong predictions are penalized severely." },
          { question: "What is the difference between MSE and MAE?", options: ["They're identical", "MSE penalizes large errors more and is sensitive to outliers", "MAE is always better", "MSE works only for classification"], answer: 1, explanation: "MSE squares the errors, so a single large error contributes disproportionately. MAE treats all errors linearly, making it more robust to outliers." },
          { question: "What is Mini-batch Gradient Descent?", options: ["Uses all data per update", "Uses 1 sample per update", "Uses a small batch (32-512) per update - balances speed and stability", "Uses no data"], answer: 2, explanation: "Mini-batch GD updates weights using a subset of data (typically 32-512 samples), balancing the stability of batch GD and the speed of SGD." }
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
        id: "ai-bp-1", title: "Backpropagation algorithm", titleEn: "Backpropagation Algorithm",
        level: 3, difficulty: "intermediate",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn nướng bánh sai vị. Bạn truy ngược: vị mặn → muối nhiều → đong sai cốc → cốc bị mẻ. Mỗi nguyên nhân **đóng góp một phần** vào kết quả sai cuối cùng.

**Backpropagation** = truy ngược "mỗi weight đóng góp bao nhiêu vào loss" để biết phải sửa weight nào nhiều, weight nào ít.

## 2. 💡 Khái niệm chính

- **Forward pass**: tính output từ input qua từng lớp.
- **Loss**: so output với ground truth.
- **Backward pass (backprop)**: dùng **chain rule** truy ngược gradient từ loss về từng weight.
- **Update**: $w \\\\leftarrow w - \\\\eta \\\\cdot \\\\partial L / \\\\partial w$.

## 3. 🧰 Chain rule trong 30 giây

Nếu $L = f(g(h(w)))$, thì:
$$\\\\frac{\\\\partial L}{\\\\partial w} = \\\\frac{\\\\partial L}{\\\\partial f} \\\\cdot \\\\frac{\\\\partial f}{\\\\partial g} \\\\cdot \\\\frac{\\\\partial g}{\\\\partial h} \\\\cdot \\\\frac{\\\\partial h}{\\\\partial w}$$

Backprop = áp dụng chain rule từ output về input, lưu lại gradient ở mỗi node (computation graph).

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`python
import torch
# Mạng siêu nhỏ: y = w2 * relu(w1 * x + b1) + b2
x  = torch.tensor([2.0])
y_true = torch.tensor([10.0])

w1 = torch.tensor([3.0], requires_grad=True)
b1 = torch.tensor([1.0], requires_grad=True)
w2 = torch.tensor([2.0], requires_grad=True)
b2 = torch.tensor([0.5], requires_grad=True)

# Forward
h = torch.relu(w1 * x + b1)        # 7
y = w2 * h + b2                    # 14.5
loss = (y - y_true) ** 2           # 20.25

# Backward - PyTorch tự chạy chain rule
loss.backward()
print("dL/dw1 =", w1.grad.item())  # autograd cho ra số chính xác
print("dL/dw2 =", w2.grad.item())
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Vanishing gradient**: nhiều lớp sigmoid → gradient ~0 ở các lớp đầu → không học. Giải: ReLU + BatchNorm + ResNet skip connection.
> - **Exploding gradient**: gradient lớn dần → NaN. Giải: gradient clipping, init đúng.
> - **Quên \`loss.backward()\`** → optim.step() không có gì để cập nhật.
> - **Quên \`optim.zero_grad()\`** → gradient cộng dồn qua các batch.
> - **\`requires_grad=False\`** trên tensor cần học → "model không học".

## 6. ✅ Best practice

> 💡 **Mẹo:**
> - **Tin vào autograd** - đừng tự code backward trừ khi viết custom layer.
> - Dùng **gradient checking** khi tự viết: so gradient autograd với gradient tính bằng numerical $(L(w+\\\\epsilon) - L(w-\\\\epsilon)) / 2\\\\epsilon$.
> - In **gradient norm** mỗi epoch → quá nhỏ là vanishing, quá lớn là exploding.
> - Skip connection (ResNet) là phát minh "cứu rỗi" backprop sâu - luôn cân nhắc.
> - **Mixed precision** (fp16) tăng tốc 2-3x nhưng dễ NaN - dùng \`torch.cuda.amp\` đúng cách.

## 7. 🤔 Tại sao quan trọng

Backprop là **bước nhảy năm 1986** đưa neural net thoát AI Winter. Mọi framework (PyTorch, TF, JAX) đều xoay quanh autograd = backprop tự động.

## 8. 📌 Tóm tắt 30 giây

Backprop = chain rule truy ngược: từ loss về từng weight, biết phải sửa cái nào bao nhiêu. PyTorch/TF lo backward tự động - bạn chỉ cần forward + \`.backward()\` + \`optim.step()\`. Cảnh giác vanishing/exploding gradient.
`,
        theoryEn: `**Backpropagation - How Neural Networks Learn from Mistakes**

---

**Chain Rule:** Computes derivatives through composed functions. In NNs: ∂L/∂w = chain of partial derivatives through all layers.

**Training Loop:** Forward pass → Compute loss → Backward pass → Update weights. Repeat thousands of times.

**Vanishing Gradient:** Gradients shrink in deep networks → early layers don't learn. Fix: ReLU, BatchNorm, Skip Connections.

**Exploding Gradient:** Gradients grow huge → NaN. Fix: Gradient clipping, proper initialization.

**Modern Improvements:** BatchNorm, Skip Connections, Layer Norm, Xavier/He initialization.`,
        code: `# Nhập library numpy để làm việc với mảng và ma trận
import numpy as np

# Define lớp mạng nơ-ron nhỏ
class MiniNN:
    # Initialize weights và bias ngẫu nhiên với seed để tái lập kết quả
    def __init__(self):
        np.random.seed(42)
        self.w1 = np.random.randn(2, 4) * 0.5
        self.b1 = np.zeros(4)
        self.w2 = np.random.randn(4, 1) * 0.5
        self.b2 = np.zeros(1)

    # Hàm kích hoạt sigmoid (cắt giá trị để tránh overflow)
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    # Lan truyền tiến: tính đầu vào và đầu ra cho từng lớp
    def forward(self, X):
        self.z1 = X @ self.w1 + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = self.a1 @ self.w2 + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2

    # Lan truyền ngược: tính gradient và cập nhật parameters bằng learning rate
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

# Bài toán XOR
X = np.array([[0,0],[0,1],[1,0],[1,1]])
y = np.array([[0],[1],[1],[0]])

# Create đối tượng mạng nơ-ron
nn = MiniNN()
# Thông báo bắt đầu training
print("🧠 Training Neural Network on XOR")
# Train trong 2000 epoch, in loss mỗi 400 epoch
for epoch in range(2000):
    out = nn.forward(X)
    loss = np.mean((y - out) ** 2)
    nn.backward(X, y)
    if epoch % 400 == 0:
        print(f"  Epoch {epoch}: loss = {loss:.4f}")

# In dự đoán cuối cùng và giá trị mong đợi
print(f"\\\\n✅ Predictions: {nn.forward(X).flatten().round(2)}")
print(f"   Expected:    {y.flatten()}")`,
        codeLanguage: "python",
        exercise: "Add batch normalization to MiniNN and compare convergence speed with/without BN.",
        exerciseEn: "Add batch normalization to MiniNN and compare convergence speed with/without BN.",
        quiz: [
          { question: "What does the Chain Rule do in backpropagation?", options: ["Creates new networks", "Computes gradients through multiple layers by multiplying partial derivatives", "Initializes weights", "Selects learning rate"], answer: 1, explanation: "The chain rule allows us to compute the derivative of the loss with respect to any weight by multiplying the chain of partial derivatives through all intermediate layers." },
          { question: "What causes vanishing gradients?", options: ["Learning rate too high", "Gradients multiply through many layers, each < 1, product → 0", "Too much data", "Using ReLU"], answer: 1, explanation: "When gradients at each layer are less than 1, multiplying them through many layers causes the product to shrink exponentially toward zero." },
          { question: "How do Skip Connections (ResNet) help?", options: ["Make networks smaller", "Allow gradients to flow directly through shortcuts, preventing vanishing", "Remove the need for backprop", "Speed up forward pass only"], answer: 1, explanation: "Skip connections provide a direct path for gradients to flow back through the network, bypassing layers that might diminish the gradient." },
          { question: "What is the correct order of the training loop?", options: ["Backward → Forward → Loss → Update", "Forward → Loss → Backward → Update", "Update → Forward → Backward → Loss", "Loss → Forward → Update → Backward"], answer: 1, explanation: "The training loop is: Forward pass (compute predictions) → Compute loss → Backward pass (compute gradients) → Update weights." },
          { question: "What does gradient clipping prevent?", options: ["Vanishing gradients", "Exploding gradients - caps gradient magnitude", "Overfitting", "Underfitting"], answer: 1, explanation: "Gradient clipping limits the maximum magnitude of gradients, preventing them from growing too large and causing numerical instability." }
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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn nhận diện mèo trong ảnh thế nào? Mắt bạn không nhìn từng pixel - bạn nhìn **đặc điểm cục bộ**: tai nhọn, ria mép, mắt tròn. Sau đó ghép các đặc điểm lại → "à, mèo!". CNN bắt chước đúng quy trình đó: **cửa sổ trượt** quét tìm đặc điểm, rồi **tổng hợp**.

CNN là lý do AI biết phân biệt mèo với chó, biết đọc biển số xe, biết chẩn đoán X-quang.

## 2. 💡 Convolution là gì

Một **kernel** (ma trận nhỏ 3×3) trượt khắp ảnh. Tại mỗi vị trí, nó nhân-cộng các pixel → ra 1 số. Số đó cho biết "có đặc điểm kernel đang tìm tại đây không".

- Kernel cạnh ngang → phát hiện đường ngang.
- Kernel cạnh chéo → phát hiện đường chéo.
- Kernel học được tự động qua backprop - **không phải đặt tay**.

## 3. 🧰 4 thành phần một CNN

| Tầng | Vai trò | Ví dụ |
|------|---------|-------|
| **Conv** | Tìm đặc điểm | 32 kernel 3×3 |
| **ReLU** | Loại tín hiệu âm | max(0, x) |
| **Pooling** | Thu nhỏ, giữ tinh hoa | MaxPool 2×2 |
| **Fully Connected** | Quyết định cuối | Dense 10 (10 lớp) |

## 4. 🎯 Ví dụ Keras chạy được ngay

\`\`\`python
# Nhập các lớp của Keras cần thiết để xây dựng model CNN
from tensorflow.keras import layers, models
# Xây dựng model tuần tự gồm các lớp tích chập, pooling, flatten và dense
model = models.Sequential([
    layers.Conv2D(32, 3, activation="relu", input_shape=(28,28,1)),
    layers.MaxPooling2D(2),
    layers.Conv2D(64, 3, activation="relu"),
    layers.MaxPooling2D(2),
    layers.Flatten(),
    layers.Dense(64, activation="relu"),
    layers.Dense(10, activation="softmax"),
])
# Biên dịch model với optimizer, loss function và metric
model.compile(optimizer="adam", loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])
\`\`\`

Mạng này đạt > 99% trên MNIST chỉ với vài dòng.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Quên **chuẩn hoá pixel về [0,1]** (\`x / 255\`) → loss phát nổ, train không hội tụ. Đây là lỗi phổ biến nhất của người mới.

- Kernel quá lớn (7×7) ở tầng đầu → mất chi tiết nhỏ.
- Không dùng **data augmentation** (lật, xoay, crop) → overfit ngay với < 5k ảnh.
- Train CNN từ đầu cho 1.000 ảnh → thua xa Transfer Learning từ ResNet.

## 6. ✅ Best practice

> 💡 **Mẹo:** **Đừng train CNN từ đầu** trừ khi bạn có > 100k ảnh. Dùng **Transfer Learning** từ ResNet50/EfficientNet đã train trên ImageNet - chỉ cần thay tầng cuối.

- Bộ parameters an toàn: optimizer **Adam** lr=1e-3, batch 32, augmentation random flip + rotation 15°.
- Bật **callback EarlyStopping** + **ReduceLROnPlateau** để không train phí.
- Dùng **Grad-CAM** để xem CNN "nhìn vào đâu" khi quyết định → debug bias.

## 7. 🤔 Khi nào dùng / không dùng

- ✅ Mọi bài toán có **dữ liệu dạng lưới**: ảnh, video, ảnh y tế, satellite.
- ✅ Audio dạng spectrogram cũng coi như "ảnh" → CNN hoạt động tốt.
- ❌ Dữ liệu tabular → dùng XGBoost/LightGBM, đừng phí công CNN.
- ❌ Văn bản tuần tự → dùng Transformer, RNN - không phải CNN (trừ TextCNN cho task ngắn).

## 8. 📌 Tóm tắt 30 giây

CNN = **kernel trượt tìm đặc điểm** → ReLU lọc → Pooling thu nhỏ → Dense quyết định. Luôn chuẩn hoá pixel \`/255\`, dùng augmentation, ưu tiên **Transfer Learning** thay vì train từ đầu. Đây là kiến trúc đã thay đổi computer vision và là nền tảng cho mọi model ảnh hiện đại.
`,
        theoryEn: `**CNNs - Vision AI**

CNNs process grid-like data (images) using local connectivity, weight sharing, and translation invariance.

**Convolution:** Small learnable filters slide across input, detecting patterns (edges → parts → objects).

**Pooling:** Downsamples spatial dimensions. Max Pooling (strongest activation), Average Pooling (smooth).

**Architecture:** Input → [Conv → ReLU → Pool] × N → Flatten → Dense → Output.

**Famous models:** LeNet → AlexNet → VGG → ResNet → EfficientNet → Vision Transformer.

**Output formula:** (Input - Kernel + 2×Padding) / Stride + 1.`,
        code: `# Nhập library NumPy để làm việc với mảng (array) và các phép toán số học.
import numpy as np

# Define một ma trận (mảng 2 chiều) đại diện cho một hình ảnh.
# Các giá trị 0 và 1 có thể tượng trưng cho các điểm ảnh đen và trắng.
image = np.array([
    [0,0,0,0,0,0,0,0],
    [0,0,1,1,1,1,0,0],
    [0,1,0,0,0,0,1,0],
    [0,1,0,1,1,0,1,0],
    [0,1,0,0,0,0,1,0],
    [0,0,1,1,1,1,0,0],
    [0,0,0,0,0,0,0,0],
])

# Define một từ điển chứa các "kernel" (mặt nạ) khác nhau.
# Mỗi kernel là một ma trận nhỏ dùng để áp dụng các hiệu ứng khác nhau lên hình ảnh.
kernels = {
    # Kernel "Edge" (phát hiện cạnh): Làm nổi bật các đường biên trong ảnh.
    "Edge": np.array([[-1,-1,-1],[-1,8,-1],[-1,-1,-1]]),
    # Kernel "Blur" (làm mờ): Làm mịn ảnh bằng cách lấy trung bình các điểm ảnh lân cận.
    "Blur": np.ones((3,3)) / 9,
    # Kernel "Sharpen" (làm sắc nét): Tăng cường độ tương phản của các cạnh.
    "Sharpen": np.array([[0,-1,0],[-1,5,-1],[0,-1,0]]),
}

# Define hàm \`convolve2d\` để thực hiện phép chập 2D.
# Phép chập là một phép toán cơ bản trong xử lý ảnh để áp dụng kernel lên ảnh.
# Input:
#   - img: Ma trận hình ảnh đầu vào.
#   - kernel: Ma trận kernel (mặt nạ) sẽ được áp dụng.
# Output:
#   - Ma trận hình ảnh đã được xử lý sau khi áp dụng kernel.
def convolve2d(img, kernel):
    # Get size chiều cao (h) và chiều rộng (w) của ảnh đầu vào.
    h, w = img.shape
    # Get size chiều cao (kh) và chiều rộng (kw) của kernel.
    kh, kw = kernel.shape
    # Create a ma trận \`out\` có size phù hợp để lưu kết quả.
    # Kích thước của ảnh đầu ra sẽ nhỏ hơn ảnh gốc một chút do phép chập.
    # Các giá trị ban đầu được khởi tạo bằng 0.
    out = np.zeros((h-kh+1, w-kw+1))
    # Lặp qua từng hàng của ma trận kết quả.
    for i in range(out.shape[0]):
        # Lặp qua từng cột của ma trận kết quả.
        for j in range(out.shape[1]):
            # Thực hiện phép chập tại vị trí (i, j):
            # 1. Get một phần nhỏ của ảnh gốc có size bằng kernel (vùng img[i:i+kh, j:j+kw]).
            # 2. Nhân từng phần tử của vùng ảnh này với từng phần tử tương ứng của kernel.
            # 3. Tính tổng tất cả các kết quả nhân đó.
            # 4. Gán tổng này vào vị trí (i, j) của ma trận kết quả \`out\`.
            out[i,j] = np.sum(img[i:i+kh, j:j+kw] * kernel)
    # Giới hạn các giá trị trong ma trận kết quả \`out\` trong khoảng từ 0 đến 1.
    # Điều này giúp đảm bảo các giá trị điểm ảnh hợp lệ (ví dụ: không âm hoặc quá lớn).
    # Output: Ma trận ảnh đã được xử lý, với các giá trị được kẹp trong khoảng [0, 1].
    return np.clip(out, 0, 1)

# Print hình ảnh gốc.
print("📷 Original (7x8):")
# Lặp qua từng hàng của ma trận \`image\`.
for row in image:
    # Print mỗi hàng, chuyển đổi các giá trị 0 thành "⬜" (ô vuông trắng) và 1 thành "⬛" (ô vuông đen).
    # Kết quả: Hiển thị hình ảnh gốc dưới dạng các ký tự unicode.
    print("  " + " ".join("⬛" if p else "⬜" for p in row))

# Lặp qua từng kernel trong từ điển \`kernels\`.
# \`name\` là tên của kernel (ví dụ: "Edge", "Blur"), \`kernel\` là ma trận kernel tương ứng.
for name, kernel in kernels.items():
    # Áp dụng hàm \`convolve2d\` lên ảnh gốc.
    # Chuyển đổi \`image\` sang kiểu float để tránh lỗi khi nhân với kernel có số thực (ví dụ: kernel Blur).
    # Input: ảnh gốc (kiểu float), kernel hiện tại.
    # Output: \`result\` là ma trận ảnh đã được xử lý.
    result = convolve2d(image.astype(float), kernel)
    # Print tên của hiệu ứng đã được áp dụng.
    print(f"\\\\n🔍 After {name}:")
    # Lặp qua từng hàng của ma trận kết quả \`result\`.
    for row in result:
        # Print mỗi hàng, chuyển đổi các giá trị điểm ảnh.
        # Nếu giá trị điểm ảnh lớn hơn 0.3, hiển thị "⬛" (đen), ngược lại hiển thị "⬜" (trắng).
        # Ngưỡng 0.3 được chọn để phân biệt các điểm ảnh sau khi xử lý.
        # Kết quả: Hiển thị hình ảnh đã được xử lý dưới dạng các ký tự unicode.
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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn đọc câu: *"Tôi sinh ra ở Hà Nội nên tiếng mẹ đẻ là …"* - não bạn nhớ "Hà Nội" để đoán ra "tiếng Việt". Mạng feedforward thường **không có trí nhớ** giữa các từ → không hiểu được. RNN sinh ra để **nhớ những gì đã thấy**.

LSTM là phiên bản RNN có **bộ não thông minh hơn**, biết quên cái không cần và giữ cái quan trọng.

## 2. 💡 RNN hoạt động ra sao

Tại mỗi bước thời gian:
- Nhận input mới (từ thứ t).
- Nhận **hidden state** từ bước trước (trí nhớ).
- Trộn cả hai → tính output + hidden state mới.
- Đẩy hidden state sang bước sau.

Như đọc sách trang đầu rồi mang **ghi chép tóm tắt** sang trang sau.

## 3. 🧠 LSTM: 3 cánh cửa thông minh

| Cổng | Quyết định | Ví dụ |
|------|-----------|-------|
| **Forget gate** | Bỏ thông tin cũ nào | Quên giới tính nhân vật cũ |
| **Input gate** | Nhận thông tin mới nào | Ghi nhớ địa điểm mới |
| **Output gate** | Đưa ra thông tin gì | Trả lời "ở đâu?" |

LSTM giải quyết được **vanishing gradient** mà RNN thường mắc khi câu dài.

## 4. 🎯 Ví dụ Keras chạy được ngay

\`\`\`python
from tensorflow.keras import layers, models

model = models.Sequential([
    layers.Embedding(input_dim=10000, output_dim=64),
    layers.LSTM(128, return_sequences=False),
    layers.Dropout(0.3),
    layers.Dense(1, activation="sigmoid"),  # classification sentiment
])
model.compile(optimizer="adam", loss="binary_crossentropy",
              metrics=["accuracy"])
\`\`\`

Đây là baseline classification cảm xúc review hoạt động tốt.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Câu đầu vào quá dài (> 500 token) → LSTM **quên đầu nhớ đuôi**. Hãy chia nhỏ hoặc chuyển sang Transformer.

- Quên \`padding\`/\`masking\` → padding token làm hỏng tính toán.
- Dùng RNN thường (không LSTM/GRU) cho câu > 30 từ → vanishing gradient ngay.
- Train LSTM 5 lớp deep → siêu chậm và không cải thiện nhiều so với 2 lớp.

## 6. ✅ Best practice

> 💡 **Mẹo:** **GRU** = LSTM rút gọn, ít parameters hơn 25%, nhanh hơn, kết quả tương đương trên hầu hết task. Luôn thử GRU trước khi chọn LSTM.

- **Bidirectional LSTM** (đọc xuôi + ngược) → tăng accuracy đáng kể cho NER, sentiment.
- Dùng pretrained embedding (Word2Vec, FastText, PhoW2V cho tiếng Việt) → tiết kiệm data.
- Với task hiện đại (translation, summarization) → **chuyển hẳn sang Transformer**, RNN đã lỗi thời ở đây.

## 7. 🤔 Khi nào dùng / không dùng

- ✅ Time series (dự báo bán hàng, chứng khoán) - LSTM vẫn rất tốt.
- ✅ Phân loại text ngắn, NER, POS tagging với resource hạn chế.
- ❌ Dịch máy, summarization, chatbot lớn → Transformer/BERT/GPT.
- ❌ Câu rất dài (> 500 token) → Transformer xử lý attention song song nhanh hơn.

## 8. 📌 Tóm tắt 30 giây

RNN = **mạng có trí nhớ** xử lý chuỗi tuần tự. LSTM thêm 3 cổng (Forget/Input/Output) để xử lý chuỗi dài. Mặc định nên thử **Bidirectional GRU** trước. Cho time series RNN vẫn tốt; cho NLP hiện đại - Transformer đã chiếm sân. Hiểu RNN là hiểu được "trước Transformer" thế giới NLP làm gì.
`,
        theoryEn: `**RNNs - Processing Sequential Data**

**Vanilla RNN:** Hidden state hₜ = tanh(Wₓxₜ + Wₕhₜ₋₁ + b). Problem: vanishing gradients → can't remember long-term.

**LSTM:** Cell state + 3 gates (Forget, Input, Output) solve long-term memory. Cell state is a "highway" for information flow.

**GRU:** Simplified LSTM with 2 gates. Fewer parameters, comparable performance, trains faster.

**Applications:** Language modeling, translation, sentiment analysis, speech recognition, time series.

**Note:** Transformers have largely replaced RNNs/LSTMs for most sequence tasks.`,
        code: `# Nhập library NumPy để xử lý số và ma trận
import numpy as np

# Lớp RNN đơn giản lưu weights và thực hiện lan truyền tiến
class SimpleRNN:
    # Initialize weights Wx, Wh và bias b
    def __init__(self, input_size, hidden_size):
        self.Wx = np.random.randn(input_size, hidden_size) * 0.1
        self.Wh = np.random.randn(hidden_size, hidden_size) * 0.1
        self.b = np.zeros(hidden_size)
        self.hidden_size = hidden_size

    # Hàm forward nhận một chuỗi embedding và trả về các trạng thái ẩn
    def forward(self, sequence):
        h = np.zeros(self.hidden_size)
        states = []
        # Lặp qua từng vector đầu vào trong chuỗi
        for x in sequence:
            h = np.tanh(x @ self.Wx + h @ self.Wh + self.b)
            states.append(h.copy())
        return states, h

# Ví dụ mã hoá văn bản thành embedding
vocab = {'hello': 0, 'world': 1, 'AI': 2, 'is': 3, 'great': 4}
embed_size = 3
embeddings = np.random.randn(len(vocab), embed_size) * 0.5

sentence = ['hello', 'world', 'AI', 'is', 'great']
encoded = np.array([embeddings[vocab[w]] for w in sentence])

# Create RNN và chạy forward trên chuỗi mã hoá
rnn = SimpleRNN(input_size=embed_size, hidden_size=4)
states, final = rnn.forward(encoded)

print("🔁 RNN Processing Sequence")
# In trạng thái ẩn sau mỗi bước
for i, word in enumerate(sentence):
    print(f"  Step {i}: '{word}' → hidden = {np.round(states[i], 3)}")
print(f"\\\\n🎯 Final hidden state: {np.round(final, 3)}")`,
        codeLanguage: "python",
        exercise: "Implement next-character prediction: train RNN on 'abcabc' to predict the next character.",
        exerciseEn: "Implement next-character prediction: train RNN on 'abcabc' to predict the next character.",
        quiz: [
          { question: "What problem does LSTM solve that vanilla RNN cannot?", options: ["Speed", "Long-term memory - vanishing gradient", "Too many parameters", "Can't process text"], answer: 1, explanation: "LSTM uses Cell State and gates to maintain information over long sequences, solving the vanishing gradient problem that prevents vanilla RNNs from learning long-range dependencies." },
          { question: "How many gates does an LSTM cell have?", options: ["1", "2", "3 (Forget, Input, Output)", "4"], answer: 2, explanation: "LSTM has 3 gates: Forget Gate (what to remove), Input Gate (what to add), and Output Gate (what to output)." },
          { question: "What is the advantage of GRU over LSTM?", options: ["Always more accurate", "Fewer parameters (~33% less), trains faster, comparable performance", "Can handle longer sequences", "No gates needed"], answer: 1, explanation: "GRU combines the forget and input gates into a single update gate, reducing parameters by ~33% while achieving comparable performance to LSTM." },
          { question: "Why have Transformers largely replaced RNNs?", options: ["Transformers are simpler", "Transformers process sequences in parallel and capture long-range dependencies better", "RNNs are obsolete in all cases", "Transformers use less memory"], answer: 1, explanation: "RNNs must process sequences step-by-step (sequential), while Transformers process all positions simultaneously (parallel), making them faster and better at capturing distant relationships." },
          { question: "What role does the Cell State play in LSTM?", options: ["Stores the output", "Acts as a 'highway' carrying information across many time steps with minimal change", "Controls the learning rate", "Stores the input only"], answer: 1, explanation: "The Cell State is the key innovation of LSTM - it runs through the entire sequence with only linear interactions (multiply and add), allowing information to flow unchanged across many steps." }
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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn đọc câu: *"Con mèo ngồi trên thảm vì **nó** mệt."* - não bạn lập tức biết "**nó**" = "con mèo" chứ không phải "thảm". Bạn làm điều đó bằng cách **chú ý** vào các từ liên quan trong câu, dù chúng cách xa.

**Self-Attention** dạy máy làm đúng việc đó: với mỗi từ, **chấm điểm liên quan** với mọi từ khác trong câu, rồi tổng hợp có weights. Đây là phát minh đứng sau ChatGPT, BERT, Gemini.

## 2. 💡 Self-Attention 3 bước

Mỗi từ tạo ra 3 vector:
- **Query (Q)**: "Tôi đang tìm gì?"
- **Key (K)**: "Tôi chứa thông tin gì?"
- **Value (V)**: "Nội dung thật của tôi."

Công thức gọn: \`Attention(Q,K,V) = softmax(QKᵀ / √d) · V\`

Hiểu đơn giản: **so Q với mọi K → ra điểm liên quan → softmax → trộn V theo điểm đó**.

## 3. 🧠 Multi-Head Attention

1 head = 1 góc nhìn. **8 head song song** = 8 góc nhìn khác nhau (cú pháp, ngữ nghĩa, đại từ, thời gian…). Concat lại → bức tranh đầy đủ. Đây là lý do Transformer mạnh.

## 4. 🎯 Ví dụ PyTorch tối giản

\`\`\`python
import torch, torch.nn as nn

mha = nn.MultiheadAttention(embed_dim=128, num_heads=8, batch_first=True)

x = torch.randn(2, 10, 128)  # batch=2, seq_len=10, dim=128
out, attn = mha(x, x, x)     # self-attention: Q=K=V=x
print(out.shape)             # torch.Size([2, 10, 128])
print(attn.shape)            # torch.Size([2, 10, 10]) - ma trận chú ý
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Attention có độ phức tạp **O(n²)** theo độ dài câu. Câu 10.000 token → ma trận 100 triệu phần tử → OOM. Phải dùng **Flash Attention** hoặc **sliding window**.

- Quên **positional encoding** → Transformer không biết thứ tự từ → output toàn rác.
- Quên **mask** trong decoder → nhìn lén tương lai → train ảo, inference sập.
- Train Transformer từ đầu với 10k câu → thua BiLSTM. Phải pretrained.

## 6. ✅ Best practice

> 💡 **Mẹo:** **Đừng bao giờ tự cài Transformer từ con số 0** cho production. Dùng **HuggingFace Transformers** + model pretrained (BERT, RoBERTa, PhoBERT cho tiếng Việt) → fine-tune 1 giờ là có model production.

- Kích thước embedding 128/256 cho task nhỏ, 768 (BERT-base) hoặc 1024 (BERT-large) cho task lớn.
- Số head = 8 hoặc 12 là chuẩn ngành - không cần sáng tạo.
- Khi sequence dài → **Longformer**, **BigBird**, hoặc **Flash Attention 2**.

## 7. 🤔 Khi nào dùng / không dùng

- ✅ NLP hiện đại: dịch, summarize, QA, chatbot, RAG.
- ✅ Vision Transformer (ViT) cho ảnh khi data lớn (> 1 triệu).
- ✅ Time series dài có pattern phức tạp.
- ❌ Câu rất ngắn (< 20 từ), data nhỏ → Logistic + TF-IDF còn nhanh và đủ tốt.
- ❌ Real-time edge device - Transformer nặng, dùng DistilBERT/TinyBERT.

## 8. 📌 Tóm tắt 30 giây

Self-Attention = **mỗi từ tự chấm điểm liên quan với mọi từ khác** rồi tổng hợp. Multi-Head = nhiều góc nhìn. Đây là kiến trúc đứng sau **mọi LLM hiện đại** từ ChatGPT đến Gemini. Đừng tự cài - dùng HuggingFace + pretrained là đường nhanh nhất ra production.
`,
        theoryEn: `**Transformers - The Architecture Behind Modern AI**

**Self-Attention:** Each token looks at all other tokens. Q·Kᵀ measures similarity, softmax normalizes, multiply by V.

**Multi-Head Attention:** Multiple parallel attention heads, each learning different patterns.

**Positional Encoding:** Gives position information (sinusoidal, learned, or RoPE).

**Architecture:** [Multi-Head Attention → Add&Norm → FFN → Add&Norm] × N.

**Family:** BERT (encoder), GPT (decoder), T5 (encoder-decoder), ViT (vision).`,
        code: `# Nhập library NumPy để làm việc với các mảng số.
import numpy as np

# Define hàm softmax.
# Hàm này chuyển đổi một vector số thực thành một phân phối xác suất.
# Input:
#   - x: Mảng (hoặc vector) các số.
#   - axis: Trục mà dọc theo đó hàm softmax sẽ được tính toán. Mặc định là trục cuối cùng.
# Output:
#   - Một mảng có cùng hình dạng với x, với các giá trị đã được chuẩn hóa thành xác suất (tổng bằng 1 trên mỗi trục).
def softmax(x, axis=-1):
    # Trừ đi giá trị lớn nhất trên mỗi hàng (hoặc cột) để tránh tràn số khi tính e^x.
    # np.max(x, axis=axis, keepdims=True) tìm giá trị lớn nhất và giữ nguyên số chiều.
    e = np.exp(x - np.max(x, axis=axis, keepdims=True))
    # Chia cho tổng của các giá trị e^x để chuẩn hóa thành xác suất.
    # e.sum(axis=axis, keepdims=True) tính tổng và giữ nguyên số chiều.
    return e / e.sum(axis=axis, keepdims=True)

# Define hàm self_attention (tự chú ý).
# Đây là một thành phần cốt lõi trong các model Transformer.
# Input:
#   - X: Ma trận đầu vào, đại diện cho các nhúng (embeddings) của các token.
#        Mỗi hàng là một nhúng của một token.
#   - d_model: Kích thước của không gian model (size của mỗi nhúng).
# Output:
#   - output: Ma trận đầu ra đã được "chú ý", có cùng hình dạng với X.
#   - attention_weights: Ma trận weights chú ý, cho biết mức độ tương tác giữa các token.
def self_attention(X, d_model):
    # Initialize ngẫu nhiên các ma trận weights Wq, Wk, Wv.
    # Các ma trận này sẽ biến đổi đầu vào X thành Query (Q), Key (K), Value (V).
    # Nhân với 0.1 để giữ cho các giá trị khởi tạo nhỏ.
    Wq = np.random.randn(d_model, d_model) * 0.1
    Wk = np.random.randn(d_model, d_model) * 0.1
    Wv = np.random.randn(d_model, d_model) * 0.1

    # Compute các ma trận Query (Q), Key (K), Value (V).
    # Q = X @ Wq: Query được tạo ra bằng cách nhân X với ma trận weights Wq.
    # K = X @ Wk: Key được tạo ra bằng cách nhân X với ma trận weights Wk.
    # V = X @ Wv: Value được tạo ra bằng cách nhân X với ma trận weights Wv.
    Q = X @ Wq
    K = X @ Wk
    V = X @ Wv

    # Compute điểm số chú ý (attention scores).
    # scores = Q @ K.T: Tích vô hướng giữa Query và Key chuyển vị.
    # Chia cho căn bậc hai của d_model để chuẩn hóa, giúp ổn định quá trình training.
    scores = Q @ K.T / np.sqrt(d_model)
    # Áp dụng hàm softmax lên các điểm số để có được weights chú ý.
    # Các weights này cho biết mức độ "quan tâm" của mỗi token đến các token khác.
    attention_weights = softmax(scores)
    # Compute đầu ra cuối cùng bằng cách nhân weights chú ý với ma trận Value.
    # Đây là tổng có weights của các vector Value, nơi weights được xác định bởi attention_weights.
    output = attention_weights @ V
    # Trả về đầu ra đã được chú ý và ma trận weights chú ý.
    return output, attention_weights

# Mô phỏng các token đầu vào.
tokens = ["The", "cat", "sat", "on", "mat"]
# Define size của không gian model (size của mỗi nhúng).
d_model = 4
# Create ma trận đầu vào X ngẫu nhiên.
# Mỗi hàng đại diện cho một token, mỗi cột là một chiều của nhúng.
# len(tokens) là số lượng token, d_model là size của nhúng.
X = np.random.randn(len(tokens), d_model)

# Gọi hàm self_attention với đầu vào X và d_model.
# output sẽ chứa các nhúng đã được chú ý.
# weights sẽ chứa ma trận weights chú ý.
output, weights = self_attention(X, d_model)

# Print tiêu đề.
print("⚡ Self-Attention")
# Print hình dạng (size) của ma trận đầu vào.
# Expected result: Input shape: (5, 4)
print(f"Input shape: {X.shape}")
# Print hình dạng (size) của ma trận đầu ra.
# Expected result: Output shape: (5, 4)
print(f"Output shape: {output.shape}")
# Print tiêu đề cho ma trận chú ý.
print(f"\\\\n🔍 Attention Matrix:")
# Print khoảng trắng để căn chỉnh tiêu đề cột.
print(f"{'':>6}", end="")
# Print các token làm tiêu đề cột của ma trận chú ý.
for t in tokens: print(f"{t:>6}", end="")
print()
# Duyệt qua từng hàng của ma trận weights chú ý.
for i, t in enumerate(tokens):
    # Print token hiện tại làm tiêu đề hàng.
    print(f"{t:>6}", end="")
    # Duyệt qua từng cột của ma trận weights chú ý.
    for j in range(len(tokens)):
        # Print giá trị weights chú ý, định dạng 2 chữ số thập phân.
        print(f"{weights[i,j]:6.2f}", end="")
    print()
# Expected result: Một bảng hiển thị weights chú ý giữa các token.
# Ví dụ:
#        The   cat   sat    on   mat
# The   0.20  0.15  0.25  0.10  0.30
# cat   0.18  0.22  0.19  0.21  0.20
# ...',
        codeLanguage: "python",
        exercise: "Implement Multi-Head Attention with 2 heads. Compare attention patterns between heads.",
        exerciseEn: "Implement Multi-Head Attention with 2 heads. Compare attention patterns between heads.",
        quiz: [
          { question: "What allows each token in Self-Attention to do?", options: ["Only see previous token", "Look at all other tokens in the sequence", "Ignore context", "Only see the nearest token"], answer: 1, explanation: "Self-Attention computes attention scores between every pair of tokens, allowing each token to consider the entire sequence." },
          { question: "Why divide by √dₖ in the attention formula?", options: ["Makes computation faster", "Prevents dot products from growing too large, stabilizing softmax", "Reduces parameters", "Purely aesthetic"], answer: 1, explanation: "As dimension d grows, dot products grow in magnitude, pushing softmax into regions with tiny gradients. Dividing by √dₖ keeps values in a reasonable range." },
          { question: "What is the purpose of Multi-Head Attention?", options: ["Speed up training", "Each head learns different relationship patterns (syntax, semantics, proximity)", "Reduce parameters", "Replace positional encoding"], answer: 1, explanation: "Multiple heads allow the model to simultaneously attend to different types of relationships - one head might capture syntax while another captures meaning." },
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
        theory: `Có 2 người cùng bảo ChatGPT *"viết email cho khách"* - một người nhận lại 5 dòng vô nghĩa, một người nhận lại email 4 đoạn chuyên nghiệp gửi luôn cho khách được. Khác biệt **không nằm ở model** - mà ở **cách hỏi**. Đó là **Prompt Engineering**.

## 1. 🚦 Vấn đề đời thường

Bạn dùng ChatGPT/Claude để: viết email, debug code, tóm tắt bài báo, tạo SQL. Cùng 1 model, người dùng giỏi nhanh gấp **5 lần** người dùng dở. Lý do: **biết hỏi đúng cách**.

→ Prompt Engineering là kỹ năng AI **giá trị nhất** mà mọi người (lập trình viên, marketer, học sinh) đều dùng được ngay hôm nay.

## 2. 💡 5 kỹ thuật prompt cốt lõi

**1. Zero-shot** - hỏi thẳng, không ví dụ.
> *"Phân loại review sau là tích cực hay tiêu cực: 'Đồ ăn quá ngon!'"*

**2. Few-shot** - đưa 2–5 ví dụ trước khi hỏi.
> *"'Tuyệt vời!' → tích cực*
> *'Tệ hại!' → tiêu cực*
> *'Hỏng sau 1 ngày' → ?"*

**3. Chain-of-Thought (CoT)** - bảo model **suy nghĩ từng bước**.
> *"Hãy nghĩ từng bước: nếu có 3 hộp, mỗi hộp 12 quả, bán 15 quả thì còn lại bao nhiêu?"*

→ CoT cải thiện **20–40%** độ chính xác cho các bài toán logic/math.

**4. Role prompting** - gán vai cho model.
> *"Bạn là senior Python developer 15 năm kinh nghiệm. Review code sau…"*

**5. Self-consistency** - hỏi cùng câu với CoT 5 lần, chọn đáp án đa số. Giảm sai sót so với chain duy nhất.

## 3. 🏗️ Giải phẫu một prompt tốt

| Thành phần | Vai trò | Ví dụ |
|-----------|---------|-------|
| **Context** | Bối cảnh | "Cho dataset review khách hàng…" |
| **Role** | Vai của AI | "Là một data scientist…" |
| **Task** | Việc cần làm | "Phân loại tích cực/tiêu cực" |
| **Format** | Cấu trúc output | "Trả JSON với 'sentiment' và 'confidence'" |
| **Constraint** | Giới hạn | "Tối đa 100 từ. Chỉ dùng data đã cho." |
| **Example** | Ví dụ I/O | "VD: 'Tuyệt!' → tích cực" |

## 4. 📝 Template chuẩn

\\\`\\\`\\\`
[Role]
You are a senior product manager fluent in Vietnamese.

[Context]
We are launching a fintech app for Vietnamese students.

[Task]
Suggest 5 onboarding screens with copy.

[Constraints]
- Output in Vietnamese.
- Each screen ≤ 30 words.
- Tone: friendly, no jargon.

[Format]
Return as numbered markdown list. Each item: bold title + 1 line copy.

[Example]
1. **Chào Long!** - Tài khoản đầu tiên dành riêng cho sinh viên Việt.
\\\`\\\`\\\`

→ Áp template này vào *bất kỳ* model nào, kết quả nhảy vọt.

## 5. ⚠️ 4 anti-pattern cần tránh

> ⚠️ **Cảnh báo:** Đừng hỏi *"Tell me about AI"* - vague prompt cho ra vague answer. Càng cụ thể, càng tốt.

1. **Vague**: "Tell me about AI" → câu trả lời lan man.
2. **Không spec format**: nhận output mỗi lần một kiểu, không parse được.
3. **Hướng dẫn mâu thuẫn**: "Hãy ngắn gọn. Bao gồm mọi chi tiết." → model bối rối.
4. **Giả định context**: model không biết project bạn nếu bạn không nói.

## 6. 🛠️ Kỹ thuật nâng cao

- **ReAct (Reason + Act)** - model **suy nghĩ** rồi **gọi tool** (search, calculator, code) → cốt lõi của AI agent.
- **Tree of Thoughts** - model khám phá nhiều nhánh suy nghĩ song song, chọn nhánh tốt nhất.
- **Prompt Chaining** - chia bài toán lớn thành nhiều prompt nhỏ, output cái này = input cái kia.

## 7. 🎯 Best practice

1. **Always specify output format** - nhất là khi parse bằng code.
2. **Đưa 1–3 ví dụ tốt** > giải thích bằng lời.
3. Với task khó → bật **CoT** ("hãy nghĩ từng bước").
4. **Test prompt với 10 input đa dạng** trước khi đưa lên production.
5. Lưu prompt trong **Git**, version như code.

> 💡 **Mẹo:** Khi prompt không ra kết quả mong muốn, đừng đổ lỗi cho model. Hỏi: *"Mình đã spec context, role, task, format, constraint chưa?"* - 90% lần thiếu 1 trong 5 cái.

## 8. ✅ Tóm tắt 30 giây

- 5 kỹ thuật cốt lõi: **zero-shot, few-shot, CoT, role, self-consistency**.
- Prompt tốt = **Context + Role + Task + Format + Constraint + Example**.
- Tránh: vague, không format, mâu thuẫn, giả định context.
- Production: **test 10 input đa dạng, lưu prompt vào Git**.
`,
        theoryEn: `**Prompt Engineering - Communicating with AI**

**Techniques:** Zero-shot (direct ask), Few-shot (with examples), Chain-of-Thought (step by step), Role prompting (assign persona).

**Great Prompt = Context + Role + Task + Format + Constraints + Examples.**

**Anti-Patterns:** Vague prompts, no format spec, contradictory instructions.

**Advanced:** ReAct, Tree of Thought, Structured Output, Temperature control.

**Tokenization:** LLMs read tokens, not words. Pricing and context limits are in tokens.`,
        code: `# Các mẫu kỹ thuật nhắc lệnh (Prompt Engineering Patterns)
# Define một từ điển (dictionary) để lưu trữ các ví dụ về các loại prompt khác nhau.
# Mỗi khóa là tên của mẫu prompt, mỗi giá trị là chuỗi (string) chứa nội dung của prompt đó.
prompts = {
    # Ví dụ về prompt "zero_shot" (không có ví dụ trong prompt).
    # Input: Một câu hỏi hoặc yêu cầu trực tiếp.
    # Output: Model AI sẽ trả lời dựa trên kiến thức đã học.
    "zero_shot": "Classify this review as positive or negative: 'Great product!'",
    # Ví dụ về prompt "few_shot" (có vài ví dụ trong prompt).
    # Input: Một vài cặp ví dụ (input -> output) để hướng dẫn model.
    # Output: Model AI sẽ đưa ra câu trả lời theo định dạng của các ví dụ.
    "few_shot": """Classify reviews:
'Love it!' → positive
'Terrible quality' → negative
'Works perfectly' → positive
'Broke after 1 day' → ?""",
    # Ví dụ về prompt "chain_of_thought" (chuỗi suy nghĩ).
    # Input: Một vấn đề phức tạp và yêu cầu model giải thích từng bước suy luận.
    # Output: Model AI sẽ đưa ra các bước giải quyết vấn đề và câu trả lời cuối cùng.
    "chain_of_thought": """Solve step by step:
Q: If a store has 3 boxes with 12 items each, and sells 15 items, how many remain?
A: Let me think step by step:
1. Total items: 3 × 12 = 36
2. Items sold: 15
3. Remaining: 36 - 15 = 21
Answer: 21 items""",
    # Ví dụ về prompt "role" (gán vai trò).
    # Input: Gán một vai trò cụ thể cho model AI.
    # Output: Model AI sẽ phản hồi theo vai trò được gán.
    "role": "You are a senior Python developer. Review this code for bugs, performance issues, and security vulnerabilities.",
}

# Lặp qua từng cặp khóa-giá trị (tên prompt và nội dung prompt) trong từ điển 'prompts'.
# Input: Từ điển 'prompts'.
# Output: Print tên và một phần nội dung của mỗi prompt.
for name, prompt in prompts.items():
    # In tên của mẫu prompt, chuyển sang chữ in hoa.
    print(f"📝 {name.upper()}")
    # In 80 ký tự đầu tiên của nội dung prompt, sau đó thêm "..."
    print(f"   {prompt[:80]}...")
    # In một dòng trống để dễ đọc.
    print()

# Đánh giá chất lượng prompt (Prompt scoring)
# Define một hàm để tính điểm chất lượng của một prompt.
# Input: prompt (chuỗi) - nội dung của prompt cần đánh giá.
# Output: score (số nguyên) - điểm chất lượng của prompt.
def score_prompt(prompt):
    # Initialize điểm ban đầu là 0.
    score = 0
    # Define các tiêu chí kiểm tra và điều kiện để đạt tiêu chí.
    # Mỗi tiêu chí là một tuple (nhãn, điều kiện kiểm tra).
    checks = [
        # Kiểm tra xem prompt có chứa các từ khóa liên quan đến ngữ cảnh không.
        ("Has context", any(w in prompt.lower() for w in ["you are", "context", "given"])),
        # Kiểm tra xem prompt có chứa các từ khóa chỉ định một nhiệm vụ cụ thể không.
        ("Has specific task", any(w in prompt.lower() for w in ["classify", "generate", "analyze", "review"])),
        # Kiểm tra xem prompt có yêu cầu định dạng đầu ra cụ thể không.
        ("Has format spec", any(w in prompt.lower() for w in ["json", "list", "table", "format"])),
        # Kiểm tra xem prompt có chứa ví dụ (ký tự '→' hoặc từ 'example') không.
        ("Has examples", "→" in prompt or "example" in prompt.lower()),
    ]
    # Lặp qua từng tiêu chí kiểm tra.
    # Input: Danh sách 'checks'.
    # Output: Cập nhật 'score' và in trạng thái của từng tiêu chí.
    for label, passed in checks:
        # Nếu tiêu chí được đáp ứng, cộng 25 điểm vào tổng điểm.
        score += 25 if passed else 0
        # In trạng thái của tiêu chí (✅ nếu đạt, ❌ nếu không đạt) và nhãn của tiêu chí.
        print(f"  {'✅' if passed else '❌'} {label}")
    # Trả về tổng điểm.
    return score

# In tiêu đề cho phần đánh giá chất lượng prompt.
print("🎯 Prompt Quality Score:")
# Tính và in điểm chất lượng cho prompt "few_shot".
# Input: Nội dung của prompt "few_shot" từ từ điển 'prompts'.
# Output: Điểm chất lượng của prompt "few_shot" (ví dụ: "Score: 100%").
print(f"   Score: {score_prompt(prompts['few_shot'])}%")
# Expected result: Print các dấu kiểm tra cho từng tiêu chí và tổng điểm.
# Ví dụ:
#   ✅ Has context
#   ✅ Has specific task
#   ✅ Has format spec
#   ✅ Has examples
#    Score: 100%',
        codeLanguage: "python",
        exercise: "Build a Prompt Template Engine: take input (role, task, format, examples) and generate an optimized prompt.",
        exerciseEn: "Build a Prompt Template Engine: take input (role, task, format, examples) and generate an optimized prompt.",
        quiz: [
          { question: "What is Few-Shot prompting?", options: ["Asking few questions", "Providing the AI with example input-output pairs before the actual question", "Limiting output length", "Single question only"], answer: 1, explanation: "Few-shot provides 2-5 examples of input→output so the AI learns the pattern before processing your actual question." },
          { question: "Why does Chain-of-Thought improve accuracy?", options: ["Makes the prompt shorter", "Forces the model to reason step-by-step, reducing errors on complex tasks", "Uses more tokens", "Changes the model"], answer: 1, explanation: "CoT prompting makes the model break down complex problems into intermediate steps, improving accuracy by 20-40% on reasoning tasks." },
          { question: "What temperature value makes AI output most deterministic?", options: ["1.0", "0.5", "0.1 (low = deterministic)", "2.0"], answer: 2, explanation: "Low temperature (0.1) makes the model more deterministic and factual, while high temperature (0.9+) increases creativity and randomness." },
          { question: "What are tokens in LLMs?", options: ["Gold coins", "Sub-word units that LLMs read - not characters or full words", "Programming variables", "API keys"], answer: 1, explanation: "LLMs break text into tokens (sub-word units). Common words are 1 token, rare words may be split into multiple tokens. Pricing and context limits are measured in tokens." },
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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn đã biết tiếng Anh giỏi. Giờ học tiếng Pháp - bạn không học lại từ đầu (chữ A, B, C, ngữ pháp cơ bản) mà tận dụng nền tảng đã có (cấu trúc câu, từ gốc Latin) → học nhanh hơn 5 lần.

**Transfer Learning** chính là vậy: lấy model đã train sẵn trên data khổng lồ (ImageNet, GPT trên 10TB text), rồi **fine-tune** trên data riêng nhỏ của bạn.

## 2. 💡 Khái niệm chính

- **Pre-trained model**: model gốc (ResNet, BERT, GPT, Llama) đã học general knowledge.
- **Fine-tuning**: train tiếp với data riêng + learning rate nhỏ.
- **LoRA / QLoRA**: chỉ train thêm 1% weight (matrix rank thấp) → tiết kiệm GPU 10-100x.
- **Adapter / Prompt tuning**: thêm module nhỏ, freeze model gốc.

## 3. 🧰 Các chiến lược

| Chiến lược | Khi dùng | Chi phí |
|---|---|---|
| **Feature extraction** (freeze toàn bộ, chỉ train head) | Data <500 sample | Rẻ nhất |
| **Fine-tune full** | Data 5K-100K | Đắt, cần GPU lớn |
| **LoRA** | LLM, ít data | Trung bình |
| **QLoRA** (4-bit) | Llama 70B trên 1 GPU 24GB | Rất rẻ |

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`python
# Fine-tune ResNet50 cho classification 5 loại trái cây VN
import torch, torchvision.models as models
from torch import nn

model = models.resnet50(weights="IMAGENET1K_V2")
for p in model.parameters(): p.requires_grad = False     # freeze
model.fc = nn.Linear(model.fc.in_features, 5)            # đổi head 5 lớp

optim = torch.optim.Adam(model.fc.parameters(), lr=1e-3)
# train head trước 5 epoch, sau đó unfreeze layer4 + train tiếp với lr=1e-5
\\\`\\\`\\\`

\\\`\\\`\\\`python
# LoRA fine-tune Llama (peft)
from peft import LoraConfig, get_peft_model
config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj","v_proj"], lora_dropout=0.05)
model = get_peft_model(base_model, config)               # chỉ train ~0.5% params
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Catastrophic forgetting**: train full với lr cao → quên hết kiến thức gốc.
> - **Data leak**: data fine-tune trùng với data pre-train → metric ảo.
> - **Pre-process khác**: mean/std của ImageNet ≠ data của bạn → kết quả tệ.
> - **Domain quá khác**: pre-train trên ảnh tự nhiên, dùng cho ảnh X-ray → tăng marginal nhỏ, đôi khi train lại từ đầu tốt hơn.
> - **LoRA rank quá thấp** (r=2) → không học đủ; quá cao (r=128) → mất lợi thế tiết kiệm.

## 6. ✅ Best practice

> 💡 **Mẹo:**
> - **2 phase**: phase 1 train head (lr 1e-3), phase 2 unfreeze + lr nhỏ 10-100 lần (1e-5).
> - **Discriminative LR**: layer cuối lr cao, layer gốc lr nhỏ (fastai pattern).
> - LoRA r=8-16 là "sweet spot" cho hầu hết LLM task.
> - Fine-tune LLM: chuẩn bị **dataset chất lượng** (200-2000 ví dụ ChatML format) > tăng số sample bừa bãi.
> - **Đánh giá trước khi fine-tune**: nhiều trường hợp prompt engineering + RAG đã đủ, không cần fine-tune.

## 7. 🤔 Khi nào fine-tune vs không

| Fine-tune hợp | Tạm chưa cần |
|---|---|
| Domain-specific (y khoa, luật) | General Q&A → RAG đủ |
| Cần style/format nhất quán | Few-shot prompt được |
| Có ≥500 sample chất lượng | Có < 50 sample |
| Latency nhạy cảm | Có thể chấp nhận prompt dài |

## 8. 📌 Tóm tắt 30 giây

Transfer Learning = đứng trên vai người khổng lồ. Freeze + train head cho data nhỏ; full fine-tune cho data vừa; LoRA/QLoRA cho LLM tiết kiệm GPU. Trước khi fine-tune, hãy thử **prompt engineering + RAG** - thường đã đủ.
`,
        theoryEn: `**Transfer Learning - Standing on the Shoulders of Giants**

**Strategies:** Feature Extraction (freeze all), Fine-tuning (partial unfreeze), Full Fine-tuning (unfreeze all).

**LoRA:** Adds small trainable matrices (rank r), reducing trainable parameters by 99.9%. W_new = W_frozen + A×B.

**QLoRA:** LoRA + 4-bit quantization → fine-tune 65B+ models on a single GPU.

**PEFT Methods:** LoRA, Adapter Layers, Prefix Tuning, Prompt Tuning.

**Key:** Avoid catastrophic forgetting (low LR), quality > quantity, always evaluate against baseline.`,
        code: `# Nhập library numpy để xử lý mảng và số học
import numpy as np

# Mô phỏng Transfer Learning
# Define model giả lập với các lớp và trạng thái đóng băng
class PretrainedModel:
    # Initialize weights và trạng thái đóng băng
    def __init__(self):
        np.random.seed(42)
        self.layer1 = np.random.randn(4, 8)  # đặc trưng chung
        self.layer2 = np.random.randn(8, 6)  # đặc trưng giữa
        self.layer3 = np.random.randn(6, 3)  # đặc trưng nhiệm vụ
        self.frozen = [True, True, False]

    # In tóm tắt model và tính parameters trainable
    def summary(self):
        layers = [self.layer1, self.layer2, self.layer3]
        total = sum(l.size for l in layers)
        trainable = sum(l.size for l, f in zip(layers, self.frozen) if not f)
        print(f"📊 Model Summary:")
        # Hiển thị trạng thái từng lớp (đóng băng hoặc trainable)
        for i, (l, f) in enumerate(zip(layers, self.frozen)):
            status = "❄️ frozen" if f else "🔥 trainable"
            print(f"  Layer {i+1}: {l.shape} - {status} ({l.size} params)")
        print(f"  Total: {total} params | Trainable: {trainable} ({trainable/total*100:.1f}%)")

# Trích xuất đặc trưng (đóng băng tất cả trừ lớp cuối)
model = PretrainedModel()
model.summary()

# Mô phỏng LoRA
print("\\\\n🎯 LoRA Adaptation:")
rank = 2
lora_A = np.random.randn(6, rank) * 0.01  # chiếu xuống
lora_B = np.random.randn(rank, 3) * 0.01  # chiếu lên
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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn hỏi ChatGPT: "Quy chế nội bộ công ty mình về OT là gì?" - nó bịa ra (hallucinate) vì chưa từng thấy tài liệu công ty bạn. Nhưng nếu bạn **đưa kèm file PDF quy chế** trong câu hỏi, nó trả lời chính xác.

**RAG (Retrieval-Augmented Generation)** chính là tự động: lúc user hỏi, hệ thống **lấy đoạn tài liệu liên quan nhất** từ kho riêng → ghép vào prompt → LLM trả lời có dẫn chứng.

## 2. 💡 Khái niệm chính

RAG = **Retrieval** (tìm tài liệu) + **Augmentation** (ghép vào prompt) + **Generation** (LLM trả lời).

Pipeline 5 bước:
1. **Chunk**: chẻ tài liệu thành đoạn 200-500 token.
2. **Embed**: biến mỗi chunk thành vector (OpenAI embeddings, BGE, E5).
3. **Index**: lưu vào vector DB (Pinecone, Qdrant, Chroma, pgvector).
4. **Retrieve**: query câu hỏi → vector → top-K chunk gần nhất (cosine).
5. **Generate**: prompt = "Dựa vào [chunks], trả lời: [câu hỏi]" → LLM.

## 3. 🧰 Stack phổ biến

| Tầng | Lựa chọn |
|---|---|
| Embedding | OpenAI text-embedding-3, BGE-M3 |
| Vector DB | Pinecone, Qdrant, pgvector, Weaviate |
| LLM | GPT-4o, Claude, Llama 3, Gemini |
| Framework | LangChain, LlamaIndex, Haystack |

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`python
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter

# 1. Chunk + embed + index
docs = load_pdfs("./company_docs/")
chunks = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50).split_documents(docs)
db = Chroma.from_documents(chunks, OpenAIEmbeddings())

# 2. Query
q = "Chính sách nghỉ thai sản công ty mình thế nào?"
hits = db.similarity_search(q, k=4)
context = "\\\\n\\\\n".join(d.page_content for d in hits)

prompt = f"""Dựa CHỈ vào các đoạn sau, trả lời. Nếu không có thông tin, nói "Không tìm thấy".

Đoạn:
{context}

Câu hỏi: {q}"""
print(ChatOpenAI(model="gpt-4o").invoke(prompt).content)
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Chunk size quá lớn** (2000 token): retrieval kém chính xác. Quá nhỏ (50): mất ngữ cảnh.
> - **Quên overlap** giữa chunks → câu cắt giữa, mất nghĩa.
> - **Chỉ dùng vector search** → bỏ lọt từ khoá chính xác (mã sản phẩm, số hiệu). Dùng **hybrid: vector + BM25**.
> - **Không re-rank**: top-10 vector có thể không phải top-10 đúng nhất → dùng cross-encoder rerank.
> - **Prompt không bắt cite**: LLM bịa số liệu → bắt nó "trích nguyên văn" + show source.

## 6. ✅ Best practice

> 💡 **Mẹo:**
> - **Chunk 300-500 token, overlap 50** là baseline tốt cho text VN.
> - **Hybrid search** (BGE + BM25) tăng recall 15-30% so với vector-only.
> - **Rerank top-20 → top-5** bằng cross-encoder (Cohere Rerank, BGE-reranker).
> - Luôn **show source** + đường link → user verify được, tăng trust.
> - **Evaluate**: dùng RAGAS / TruLens để đo faithfulness (LLM có bịa không) + answer relevancy.
> - Cập nhật index khi tài liệu thay đổi - đừng để stale.

## 7. 🤔 RAG vs Fine-tune

| RAG | Fine-tune |
|---|---|
| Data thay đổi liên tục | Style/format cố định |
| Cần cite source | Cần performance + speed |
| Setup nhanh (vài giờ) | Tốn GPU, vài ngày |
| Dễ update | Phải re-train mỗi lần |

Nhiều khi **kết hợp cả hai** mới là đỉnh.

## 8. 📌 Tóm tắt 30 giây

RAG = Retrieve + Augment + Generate. Pipeline: chunk → embed → vector DB → query → top-K → prompt LLM. Luôn hybrid search + rerank + show source. Trước khi fine-tune, hãy thử RAG - rẻ hơn 100 lần và thường đủ.
`,
        theoryEn: `**RAG - Grounding AI in Facts**

**Why RAG?** LLMs hallucinate, have knowledge cutoffs, and can't cite sources. RAG fixes this by retrieving relevant documents before generating.

**Pipeline:** Indexing (chunk → embed → store) → Retrieval (query → search → rank) → Generation (context + query → LLM → answer).

**Components:** Embeddings (text → vectors), Vector DBs (Pinecone, ChromaDB), Chunking (fixed, recursive, semantic).

**RAG vs Fine-tuning:** RAG for knowledge/Q&A (real-time updates, citations). Fine-tuning for style/behavior changes.

**Pitfalls:** Bad chunk size, poor embeddings, no re-ranking, too much context.`,
        code: `import numpy as np

# Simple RAG simulation
# Define một lớp (class) để mô phỏng cơ sở dữ liệu vector đơn giản.
# Lớp này sẽ lưu trữ các tài liệu và biểu diễn vector (embeddings) của chúng.
class SimpleVectorDB:
    # Phương thức khởi tạo (constructor) của lớp.
    # Được gọi khi tạo một đối tượng mới từ lớp này.
    def __init__(self):
        # Initialize một danh sách rỗng để lưu trữ các tài liệu gốc (chuỗi văn bản).
        self.documents = []
        # Initialize một danh sách rỗng để lưu trữ các biểu diễn vector (embeddings) của tài liệu.
        self.embeddings = []

    # Phương thức này tạo ra một vector nhúng (embedding) cho một đoạn văn bản.
    # Trong ví dụ này, nó tạo ra một vector ngẫu nhiên để đơn giản hóa.
    # Input: text (chuỗi văn bản).
    # Output: Một mảng numpy (vector) biểu diễn văn bản.
    def embed(self, text):
        # Đặt seed cho bộ sinh số ngẫu nhiên để đảm bảo cùng một văn bản luôn tạo ra cùng một embedding.
        # Sử dụng hash của văn bản để tạo seed.
        np.random.seed(hash(text) % 2**31)
        # Trả về một mảng numpy gồm 8 số ngẫu nhiên theo phân phối chuẩn.
        return np.random.randn(8)

    # Phương thức để thêm một tài liệu mới vào cơ sở dữ liệu.
    # Input: doc (chuỗi văn bản của tài liệu).
    def add(self, doc):
        # Thêm tài liệu gốc vào danh sách documents.
        self.documents.append(doc)
        # Create embedding cho tài liệu và thêm vào danh sách embeddings.
        self.embeddings.append(self.embed(doc))

    # Phương thức để tìm kiếm các tài liệu tương tự nhất với một truy vấn.
    # Input: query (chuỗi văn bản truy vấn), top_k (số lượng tài liệu tương tự nhất muốn lấy).
    # Output: Một danh sách các cặp (tài liệu, điểm tương đồng) được sắp xếp theo điểm tương đồng giảm dần.
    def search(self, query, top_k=2):
        # Create embedding cho truy vấn.
        q_emb = self.embed(query)
        # Initialize danh sách để lưu trữ điểm số tương đồng.
        scores = []
        # Lặp qua tất cả các embedding trong cơ sở dữ liệu.
        for i, emb in enumerate(self.embeddings):
            # Compute độ tương đồng cosine giữa embedding truy vấn và embedding tài liệu.
            # Công thức: (A . B) / (||A|| * ||B||)
            sim = np.dot(q_emb, emb) / (np.linalg.norm(q_emb) * np.linalg.norm(emb))
            # Lưu điểm tương đồng và chỉ số của tài liệu.
            scores.append((sim, i))
        # Sắp xếp danh sách điểm số theo thứ tự giảm dần (tài liệu tương đồng nhất lên đầu).
        scores.sort(reverse=True)
        # Trả về top_k tài liệu cùng với điểm tương đồng đã làm tròn.
        # Output mong đợi: [("Tài liệu 1", 0.987), ("Tài liệu 2", 0.954)]
        return [(self.documents[i], round(s, 3)) for s, i in scores[:top_k]]

# Build knowledge base
# Xây dựng cơ sở tri thức bằng cách thêm các tài liệu vào VectorDB.

# Create a đối tượng cơ sở dữ liệu vector.
db = SimpleVectorDB()
# Define danh sách các tài liệu (chuỗi văn bản) sẽ được thêm vào cơ sở dữ liệu.
docs = [
    "Python is a high-level programming language created by Guido van Rossum.",
    "Machine Learning uses algorithms to learn patterns from data.",
    "SQL is used to query and manage relational databases.",
    "Neural Networks are inspired by biological brain neurons.",
    "Data Engineering focuses on building data pipelines and infrastructure.",
]

# Lặp qua từng tài liệu trong danh sách và thêm chúng vào cơ sở dữ liệu.
for doc in docs:
    db.add(doc)

# RAG query
# Thực hiện một truy vấn RAG (Retrieval-Augmented Generation).

# Define câu truy vấn.
query = "What is machine learning?"
# Tìm kiếm các tài liệu liên quan đến truy vấn trong cơ sở dữ liệu, lấy 2 tài liệu hàng đầu.
# Output: Một danh sách các cặp (tài liệu, điểm tương đồng).
results = db.search(query, top_k=2)

# Print tiêu đề của demo.
print("🔗 RAG Pipeline Demo")
# Print câu truy vấn.
print(f"📝 Query: {query}")
# Print số lượng tài liệu đã được truy xuất.
print(f"\\\\n🔍 Retrieved ({len(results)} chunks):")
# Lặp qua các tài liệu đã truy xuất và in chúng ra cùng với điểm tương đồng.
# Output mong đợi:
#   [+0.987] Machine Learning uses algorithms to learn patterns from data.
#   [+0.123] Python is a high-level programming language created by Guido van Rossum.
for doc, score in results:
    print(f"  [{score:+.3f}] {doc}")

# Generate answer with context
# Create câu trả lời dựa trên ngữ cảnh (các tài liệu đã truy xuất).

# Nối các tài liệu đã truy xuất thành một chuỗi duy nhất để làm ngữ cảnh.
context = "\\\\n".join([doc for doc, _ in results])
# Print tiêu đề cho phần trả lời.
print(f"\\\\n🤖 Generated Answer (using context):")
# Print một câu trả lời đơn giản dựa trên tài liệu đầu tiên được truy xuất.
# Trong một hệ thống RAG thực tế, một model ngôn ngữ lớn (LLM) sẽ sử dụng 'context' để tạo ra câu trả lời chi tiết hơn.
# Output mong đợi:
#   Based on the retrieved information: Machine Learning uses algorithms to learn patterns from data.
print(f"  Based on the retrieved information: {results[0][0]}")`,
        codeLanguage: "python",
        exercise: "Implement chunking strategy: split a long text into 100-char chunks with 20-char overlap.",
        exerciseEn: "Implement chunking strategy: split a long text into 100-char chunks with 20-char overlap.",
        quiz: [
          { question: "What does RAG need to work?", options: ["Only an LLM", "Vector DB + LLM + Embedding Model", "Only a SQL database", "A fine-tuned model"], answer: 1, explanation: "RAG needs 3 components: an Embedding model to create vectors, a Vector DB to store and search them, and an LLM to generate answers from retrieved context." },
          { question: "What is the main advantage of RAG over fine-tuning for knowledge tasks?", options: ["RAG is always more accurate", "RAG can update knowledge in real-time and cite sources", "RAG is cheaper to run", "RAG doesn't need data"], answer: 1, explanation: "RAG can be updated by simply re-indexing documents (no retraining needed) and can point to the exact source of information - key advantages for knowledge-intensive tasks." },
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
        theory: `## 1. 🚦 Vấn đề đời thường

Một công ty Mỹ từng xài AI tuyển dụng, kết quả: ưu tiên ứng viên nam, loại CV có chữ "women's chess club". Lý do? Data train là 10 năm CV cũ - đa số đậu là nam. AI không "kỳ thị" - nó học **đúng mẫu lệch** từ data lệch.

**Bias & Fairness** = phát hiện và sửa các thiên lệch ẩn trong AI để không gây hại cho nhóm yếu thế.

## 2. 💡 Các loại bias phổ biến

| Loại | Ví dụ |
|---|---|
| **Sampling bias** | Chỉ thu data ở Hà Nội → model sai ở miền Tây |
| **Label bias** | Người gán nhãn có định kiến |
| **Historical bias** | Data quá khứ phản ánh xã hội bất công |
| **Measurement bias** | Đo điểm tín dụng theo tiêu chí thiên lệch |
| **Confirmation bias** | Chọn metric "đẹp", giấu cái xấu |

## 3. 🧰 Metrics đo Fairness

| Metric | Ý nghĩa |
|---|---|
| **Demographic parity** | Tỉ lệ "duyệt" giống nhau giữa các nhóm |
| **Equal opportunity** | True Positive Rate giống nhau |
| **Equalized odds** | Cả TPR và FPR giống nhau |
| **Disparate impact** | Tỉ lệ chấp nhận nhóm yếu / nhóm mạnh ≥ 0.8 (rule 4/5) |

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`python
# Đo bias bằng Fairlearn
from fairlearn.metrics import MetricFrame, selection_rate, true_positive_rate

mf = MetricFrame(
    metrics={"selection_rate": selection_rate, "tpr": true_positive_rate},
    y_true=y_test, y_pred=preds,
    sensitive_features=df_test["gender"]   # cột nhạy cảm
)
print(mf.by_group)
print("Disparity:", mf.difference())       # càng gần 0 càng công bằng
\\\`\\\`\\\`

\\\`\\\`\\\`python
# Mitigate bằng Reweighing trước khi train
from fairlearn.reductions import ExponentiatedGradient, DemographicParity
mitigator = ExponentiatedGradient(base_clf, constraints=DemographicParity())
mitigator.fit(X, y, sensitive_features=A)
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **"Bỏ cột giới tính/chủng tộc là xong"** - sai. Model vẫn học qua proxy (mã bưu điện, tên trường).
> - **Chỉ tối ưu accuracy** → bỏ qua nhóm thiểu số (chiếm ít, sai cũng không kéo accuracy nhiều).
> - **Không tài liệu hoá** → không ai biết model có rủi ro gì 6 tháng sau.
> - **"Không thể vừa fair vừa accurate"**: đôi khi đúng - phải chọn trade-off có ý thức.

## 6. ✅ Best practice

> 💡 **Mẹo:**
> - **Audit bias ở cả 3 giai đoạn**: pre-process (data), in-process (training), post-process (output).
> - Viết **Model Card** + **Datasheet for Datasets** cho mỗi model production.
> - **Diverse team**: team đa dạng giới/vùng miền dễ phát hiện bias hơn.
> - Khi có sensitive groups, luôn report **metric per group** (không chỉ overall).
> - Tham chiếu khung: **EU AI Act**, **NIST AI RMF**, **ISO/IEC 42001**.
> - **Human-in-the-loop** với quyết định high-stakes (tuyển dụng, tín dụng, y tế).

## 7. 🤔 Khi nào quan tâm nhiều nhất

| Cao | Thấp |
|---|---|
| Tuyển dụng, tín dụng, bảo hiểm | Phân loại email spam |
| Y tế, tư pháp | Recommendation âm nhạc |
| Có sensitive attribute | Không liên quan người |

## 8. 📌 Tóm tắt 30 giây

AI không tự kỳ thị - nó học từ data lệch. Đo bằng demographic parity, equal opportunity. Mitigate ở cả 3 giai đoạn. Bỏ cột nhạy cảm KHÔNG đủ - proxy vẫn tồn tại. High-stakes decisions luôn cần human-in-the-loop.
`,
        theoryEn: `**AI Ethics - Building Responsible AI**

**Bias Types:** Data bias (unrepresentative), Algorithmic (amplifies bias), Measurement (proxy features), Deployment (wrong context).

**Fairness Metrics:** Demographic Parity (equal rates), Equal Opportunity (equal TPR), Equalized Odds, Calibration. No single metric captures all fairness - choose based on context.

**Regulations:** EU AI Act (risk-based), GDPR (right to explanation), NYC Law 144 (hiring audits).

**Explainability:** LIME, SHAP, Attention visualization, Model Cards.

**Best Practices:** Diverse data, regular audits, human oversight, documentation, monitoring, red teaming.`,
        code: `# Nhập library numpy để xử lý mảng và toán xác suất
import numpy as np

# Công cụ kiểm toán thiên vị
def audit_model(predictions, demographics):
    groups = set(demographics)
    print("⚖️ Fairness Audit Report")
    print("=" * 50)
    
    rates = {}
    # Lặp qua mỗi nhóm dân số để tính tỷ lệ dự đoán dương
    for group in groups:
        mask = [d == group for d in demographics]
        group_preds = [p for p, m in zip(predictions, mask) if m]
        rate = sum(group_preds) / len(group_preds) if group_preds else 0
        rates[group] = rate
        print(f"  {group}: positive rate = {rate:.2%} ({sum(group_preds)}/{len(group_preds)})")
    
    # Kiểm tra công bằng theo dân số (demographic parity)
    max_rate = max(rates.values())
    min_rate = min(rates.values())
    disparity = max_rate - min_rate
    threshold = 0.1
    
    print(f"\\\\n📊 Demographic Parity:")
    print(f"  Disparity: {disparity:.2%}")
    print(f"  Threshold: {threshold:.2%}")
    print(f"  Status: {'✅ PASS' if disparity <= threshold else '❌ FAIL'}")
    
    return rates

# Mô phỏng model có thiên vị
np.random.seed(42)
n = 200
demographics = np.random.choice(["Group_A", "Group_B"], n)
# Có thiên vị cố ý: Group_A có tỷ lệ dương cao hơn
predictions = []
# Duyệt từng cá thể để tạo dự đoán
for d in demographics:
    # Nếu thuộc Group_A, xác suất dương cao hơn
    if d == "Group_A":
        predictions.append(int(np.random.random() < 0.7))
    else:
        predictions.append(int(np.random.random() < 0.4))

# Chạy hàm kiểm toán với dự đoán và dân số
rates = audit_model(predictions, demographics)

# Biện pháp giảm thiểu: điều chỉnh ngưỡng
print("\\\\n🔧 Mitigation: Threshold Adjustment")
target_rate = np.mean(predictions)
print(f"  Target rate: {target_rate:.2%}")`,
        codeLanguage: "python",
        exercise: "Build a bias mitigation tool that implements threshold adjustment and resampling strategies.",
        exerciseEn: "Build a bias mitigation tool that implements threshold adjustment and resampling strategies.",
        quiz: [
          { question: "What is the most common source of AI bias?", options: ["Bad algorithms", "Training data that doesn't represent the real-world population", "Too many parameters", "Using Python"], answer: 1, explanation: "Data bias is the most common source - when training data doesn't represent all groups equally, the model learns and amplifies these disparities." },
          { question: "Why can't you satisfy all fairness metrics simultaneously?", options: ["Not enough compute", "The Impossibility Theorem - different metrics can contradict each other", "It's always possible", "Regulations prevent it"], answer: 1, explanation: "The Impossibility Theorem shows that certain fairness metrics (like Demographic Parity and Calibration) are mathematically incompatible - improving one can worsen another." },
          { question: "What does the EU AI Act classify?", options: ["Programming languages", "AI systems by risk level (Unacceptable, High, Limited, Minimal)", "Data formats", "Cloud providers"], answer: 1, explanation: "The EU AI Act categorizes AI systems into risk tiers: Unacceptable (banned), High (strict requirements), Limited (transparency), Minimal (no restrictions)." },
          { question: "What is SHAP used for in AI ethics?", options: ["Training models", "Explaining which features contributed to a specific prediction", "Collecting data", "Deploying models"], answer: 1, explanation: "SHAP (SHapley Additive exPlanations) uses game theory to explain how each feature contributes to an individual prediction, enabling transparency and accountability." },
          { question: "What is a feedback loop in the context of AI bias?", options: ["A type of neural network", "Biased predictions create biased data, which further biases the model", "A training technique", "A debugging tool"], answer: 1, explanation: "When a biased model's predictions are used to collect new training data (e.g., biased policing → more arrests in certain areas → more data → more bias), the bias compounds over time." }
        ]
      }
    ]
  }
];
