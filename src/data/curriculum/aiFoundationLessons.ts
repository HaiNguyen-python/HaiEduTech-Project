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
        theory: "**Lịch sử AI qua các giai đoạn:**\n\n- 🧮 1950: Alan Turing đề xuất \"Turing Test\"\n- 🤖 1956: Hội nghị Dartmouth — thuật ngữ AI ra đời\n- ❄️ 1970-80: AI Winter — kỳ vọng thất bại\n- 🧠 1986: Backpropagation — Neural Networks hồi sinh\n- 🎮 1997: Deep Blue thắng Kasparov\n- 📱 2012: AlexNet — Deep Learning bùng nổ\n- 💬 2022: ChatGPT — LLMs thay đổi thế giới",
        theoryEn: "**History of AI through eras:**\n\n- 🧮 1950: Alan Turing proposes the \"Turing Test\"\n- 🤖 1956: Dartmouth Conference — AI term coined\n- ❄️ 1970-80: AI Winter — unmet expectations\n- 🧠 1986: Backpropagation revives Neural Networks\n- 🎮 1997: Deep Blue defeats Kasparov\n- 📱 2012: AlexNet — Deep Learning explosion\n- 💬 2022: ChatGPT — LLMs change the world",
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
        exercise: "Thêm 5 sự kiện AI quan trọng khác vào timeline và tạo biểu đồ phân loại theo thập kỷ.",
        exerciseEn: "Add 5 more important AI events and create a chart categorized by decade.",
        quiz: [
          { question: "AI Winter là gì?", options: ["AI hoạt động tốt nhất mùa đông", "Giai đoạn AI thất bại, giảm đầu tư", "Thuật toán tối ưu", "Phiên bản AI mới"], answer: 1, explanation: "AI Winter là giai đoạn nghiên cứu AI suy giảm do kỳ vọng quá cao mà kết quả không đạt." },
          { question: "Transformer ra đời năm nào?", options: ["2012", "2015", "2017", "2020"], answer: 2, explanation: "Paper 'Attention Is All You Need' được Google công bố năm 2017, tạo nền tảng cho GPT, BERT." }
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
        theory: "**Perceptron** — đơn vị cơ bản của Neural Network:\n\n1. Nhận inputs (x₁, x₂, ...)\n2. Nhân với weights (w₁, w₂, ...)\n3. Cộng bias (b)\n4. Áp dụng activation function\n\n**Công thức:** output = activation(Σ(xᵢ × wᵢ) + b)\n\n**Multi-layer Network:**\n- Input Layer → Hidden Layers → Output Layer\n- Mỗi layer chứa nhiều neurons\n- Forward propagation: tính output từ input qua từng layer",
        theoryEn: "**Perceptron** — the basic unit of a Neural Network:\n\n1. Receive inputs (x₁, x₂, ...)\n2. Multiply by weights (w₁, w₂, ...)\n3. Add bias (b)\n4. Apply activation function\n\n**Formula:** output = activation(Σ(xᵢ × wᵢ) + b)\n\n**Multi-layer Network:**\n- Input Layer → Hidden Layers → Output Layer\n- Each layer contains multiple neurons\n- Forward propagation: compute output from input through each layer",
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
        exercise: "Xây dựng mạng 3 layer (2 input → 4 hidden → 1 output) và test với nhiều inputs khác nhau.",
        exerciseEn: "Build a 3-layer network (2 input → 4 hidden → 1 output) and test with different inputs.",
        quiz: [
          { question: "Perceptron tính output bằng cách nào?", options: ["Chỉ cộng inputs", "Nhân weights + bias + activation", "Random", "Chỉ dùng bias"], answer: 1, explanation: "Perceptron: z = Σ(xᵢ × wᵢ) + b, rồi áp dụng activation function lên z." }
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
        theory: "**Activation Functions** thêm tính phi tuyến vào mạng:\n\n- **Sigmoid:** σ(x) = 1/(1+e⁻ˣ) → output [0,1]\n- **Tanh:** tanh(x) → output [-1,1]\n- **ReLU:** max(0,x) → phổ biến nhất, nhanh\n- **Leaky ReLU:** max(0.01x, x) → tránh \"dying ReLU\"\n- **Softmax:** chuyển vector thành xác suất (tổng = 1)\n\n**Khi nào dùng gì:**\n- Hidden layers: ReLU (mặc định)\n- Binary output: Sigmoid\n- Multi-class output: Softmax\n- RNN: Tanh",
        theoryEn: "**Activation Functions** add non-linearity to networks:\n\n- **Sigmoid:** σ(x) = 1/(1+e⁻ˣ) → output [0,1]\n- **Tanh:** tanh(x) → output [-1,1]\n- **ReLU:** max(0,x) → most popular, fast\n- **Leaky ReLU:** max(0.01x, x) → avoids dying ReLU\n- **Softmax:** converts vector to probabilities (sum = 1)\n\n**When to use what:**\n- Hidden layers: ReLU (default)\n- Binary output: Sigmoid\n- Multi-class output: Softmax\n- RNN: Tanh",
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
        exercise: "Vẽ đồ thị so sánh tất cả activation functions trên khoảng [-5, 5] bằng print art.",
        exerciseEn: "Draw a comparison chart of all activation functions over [-5, 5] using print art.",
        quiz: [
          { question: "Tại sao ReLU phổ biến hơn Sigmoid cho hidden layers?", options: ["Output đẹp hơn", "Tính nhanh hơn và tránh vanishing gradient", "Luôn cho kết quả chính xác", "Dễ viết code"], answer: 1, explanation: "ReLU tính toán nhanh (chỉ so sánh với 0) và gradient không bị triệt tiêu như Sigmoid ở giá trị lớn." }
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
        theory: "**Loss Function** đo lường sai số giữa dự đoán và thực tế:\n\n- **MSE:** Mean Squared Error — cho regression\n  L = (1/n) Σ(yᵢ - ŷᵢ)²\n- **Binary Cross-Entropy:** cho binary classification\n  L = -[y·log(ŷ) + (1-y)·log(1-ŷ)]\n- **Categorical Cross-Entropy:** cho multi-class\n\n**Gradient Descent:**\n- Tính đạo hàm (gradient) của Loss theo weights\n- Cập nhật: w = w - lr × gradient\n- Learning rate (lr) quyết định bước di chuyển\n\n**Variants:** SGD, Mini-batch, Adam (phổ biến nhất)",
        theoryEn: "**Loss Function** measures error between prediction and actual:\n\n- **MSE:** Mean Squared Error — for regression\n- **Binary Cross-Entropy:** for binary classification\n- **Categorical Cross-Entropy:** for multi-class\n\n**Gradient Descent:**\n- Compute gradient of Loss w.r.t. weights\n- Update: w = w - lr × gradient\n- Learning rate determines step size\n\n**Variants:** SGD, Mini-batch, Adam (most popular)",
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
        exercise: "Implement gradient descent cho hàm f(x,y) = x² + 2y². Tìm minimum từ điểm (5, 3).",
        exerciseEn: "Implement gradient descent for f(x,y) = x² + 2y². Find minimum starting from (5, 3).",
        quiz: [
          { question: "Learning rate quá lớn gây ra gì?", options: ["Hội tụ nhanh", "Overshooting — không hội tụ", "Không ảnh hưởng", "Luôn tốt hơn"], answer: 1, explanation: "Learning rate quá lớn khiến bước nhảy quá xa, vượt qua điểm tối ưu và có thể phân kỳ." }
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
        theory: "**Backpropagation** tính gradient cho mọi weight trong mạng.\n\n**Quy tắc chuỗi (Chain Rule):**\n- ∂L/∂w = ∂L/∂ŷ × ∂ŷ/∂z × ∂z/∂w\n\n**Quy trình:**\n1. Forward pass: tính output\n2. Tính loss\n3. Backward pass: tính gradient từ output → input\n4. Cập nhật weights\n\n**Vanishing Gradient:** Gradient quá nhỏ ở layers sâu → dùng ReLU, BatchNorm, Skip Connections",
        theoryEn: "**Backpropagation** computes gradients for all weights.\n\n**Chain Rule:**\n- ∂L/∂w = ∂L/∂ŷ × ∂ŷ/∂z × ∂z/∂w\n\n**Process:**\n1. Forward pass: compute output\n2. Compute loss\n3. Backward pass: compute gradients output → input\n4. Update weights\n\n**Vanishing Gradient:** Gradients too small in deep layers → use ReLU, BatchNorm, Skip Connections",
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
        exercise: "Thêm batch normalization vào MiniNN và so sánh tốc độ hội tụ có/không có BN.",
        exerciseEn: "Add batch normalization to MiniNN and compare convergence speed with/without BN.",
        quiz: [
          { question: "Chain Rule trong backprop dùng để làm gì?", options: ["Tạo network mới", "Tính gradient qua nhiều layers", "Khởi tạo weights", "Chọn learning rate"], answer: 1, explanation: "Chain Rule cho phép tính đạo hàm của loss theo weight ở bất kỳ layer nào bằng cách nhân chuỗi đạo hàm." }
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
        theory: "**CNN** chuyên xử lý dữ liệu dạng lưới (ảnh, video).\n\n**Convolution Layer:**\n- Kernel/Filter trượt qua ảnh\n- Phát hiện features: edges, corners, textures\n- Output: Feature Map\n\n**Pooling Layer:**\n- Giảm kích thước (downsampling)\n- Max Pooling: lấy giá trị lớn nhất\n- Average Pooling: lấy trung bình\n\n**Kiến trúc phổ biến:**\n- Conv → ReLU → Pool → Conv → ReLU → Pool → Flatten → Dense → Output\n- VGG, ResNet, EfficientNet",
        theoryEn: "**CNN** specializes in grid-like data (images, video).\n\n**Convolution Layer:**\n- Kernel/Filter slides over image\n- Detects features: edges, corners, textures\n\n**Pooling Layer:**\n- Reduces size (downsampling)\n- Max Pooling / Average Pooling\n\n**Popular architectures:** VGG, ResNet, EfficientNet",
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
        exercise: "Implement max pooling 2x2 và stride 2. So sánh kích thước trước/sau pooling.",
        exerciseEn: "Implement 2x2 max pooling with stride 2. Compare sizes before/after pooling.",
        quiz: [
          { question: "Convolution layer phát hiện gì?", options: ["Màu sắc", "Đặc trưng trực quan (edges, textures)", "Kích thước ảnh", "Metadata"], answer: 1, explanation: "Convolution filters phát hiện các đặc trưng trực quan: cạnh, góc, textures ở các layers đầu, và patterns phức tạp hơn ở layers sâu." }
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
        theory: "**RNN** xử lý dữ liệu tuần tự (text, time series).\n\n**Vanilla RNN:**\n- hₜ = tanh(Wₓx_t + Wₕhₜ₋₁ + b)\n- Vấn đề: Vanishing/Exploding gradient\n\n**LSTM (Long Short-Term Memory):**\n- Forget Gate: quyết định thông tin nào bỏ\n- Input Gate: thông tin mới nào thêm vào\n- Output Gate: output là gì\n- Cell State: bộ nhớ dài hạn\n\n**GRU:** Phiên bản đơn giản hơn LSTM (2 gates thay vì 3)",
        theoryEn: "**RNN** processes sequential data (text, time series).\n\n**Vanilla RNN:** hₜ = tanh(Wₓxₜ + Wₕhₜ₋₁ + b)\n- Problem: Vanishing/Exploding gradient\n\n**LSTM:** Forget Gate, Input Gate, Output Gate, Cell State\n\n**GRU:** Simplified LSTM (2 gates instead of 3)",
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
        exercise: "Implement next-character prediction: train RNN trên chuỗi 'abcabc' để dự đoán ký tự tiếp theo.",
        exerciseEn: "Implement next-character prediction: train RNN on 'abcabc' to predict the next character.",
        quiz: [
          { question: "LSTM giải quyết vấn đề gì của RNN?", options: ["Tốc độ chậm", "Vanishing gradient — khó nhớ long-term", "Quá nhiều parameters", "Không xử lý text"], answer: 1, explanation: "LSTM dùng Cell State và gates để giữ thông tin dài hạn, giải quyết vanishing gradient." }
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
        theory: "**Transformer** — kiến trúc nền tảng cho GPT, BERT, LLMs.\n\n**Self-Attention:**\n- Q (Query), K (Key), V (Value) từ input\n- Attention(Q,K,V) = softmax(QKᵀ/√d) × V\n- Mỗi token \"chú ý\" đến tất cả tokens khác\n\n**Multi-Head Attention:**\n- Chạy nhiều attention song song\n- Mỗi head học pattern khác nhau\n\n**Positional Encoding:** Thêm thông tin vị trí (sin/cos)\n\n**Architecture:** Input → Embedding → [Multi-Head Attention → FFN] × N → Output",
        theoryEn: "**Transformer** — foundation architecture for GPT, BERT, LLMs.\n\n**Self-Attention:**\n- Q (Query), K (Key), V (Value) from input\n- Attention(Q,K,V) = softmax(QKᵀ/√d) × V\n\n**Multi-Head Attention:** Run multiple attention in parallel\n\n**Positional Encoding:** Add position info (sin/cos)",
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
        exercise: "Implement Multi-Head Attention với 2 heads. So sánh attention patterns giữa các heads.",
        exerciseEn: "Implement Multi-Head Attention with 2 heads. Compare attention patterns between heads.",
        quiz: [
          { question: "Self-Attention cho phép mỗi token làm gì?", options: ["Chỉ nhìn token trước", "Nhìn tất cả tokens khác trong sequence", "Bỏ qua context", "Chỉ nhìn token gần nhất"], answer: 1, explanation: "Self-Attention cho phép mỗi token tính attention score với TẤT CẢ tokens khác, nắm bắt quan hệ xa." }
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
        theory: "**Prompt Engineering** — nghệ thuật viết prompt hiệu quả.\n\n**Kỹ thuật cơ bản:**\n- Zero-shot: Hỏi trực tiếp\n- Few-shot: Cho ví dụ mẫu\n- Chain-of-Thought: \"Hãy suy nghĩ từng bước\"\n- Role prompting: \"Bạn là chuyên gia...\"\n\n**Template tốt:**\n- Context: Bối cảnh rõ ràng\n- Task: Yêu cầu cụ thể\n- Format: Định dạng output\n- Constraints: Ràng buộc\n\n**Anti-patterns:**\n- Prompt quá dài và mơ hồ\n- Không cho ví dụ\n- Yêu cầu mâu thuẫn",
        theoryEn: "**Prompt Engineering** — the art of writing effective prompts.\n\n**Basic techniques:** Zero-shot, Few-shot, Chain-of-Thought, Role prompting\n\n**Good template:** Context, Task, Format, Constraints\n\n**Anti-patterns:** Vague prompts, no examples, contradictory requirements",
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
        exercise: "Xây dựng Prompt Template Engine: nhận input (role, task, format, examples) và tạo prompt tối ưu.",
        exerciseEn: "Build a Prompt Template Engine: take input (role, task, format, examples) and generate an optimized prompt.",
        quiz: [
          { question: "Few-shot prompting là gì?", options: ["Hỏi ít câu", "Cho AI vài ví dụ mẫu trước khi hỏi", "Giới hạn output", "Chỉ 1 lần hỏi"], answer: 1, explanation: "Few-shot cung cấp 2-5 ví dụ mẫu (input → output) để AI hiểu pattern trước khi xử lý câu hỏi mới." }
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
        theory: "**Transfer Learning:** Dùng kiến thức từ model đã train sẵn.\n\n**Các chiến lược:**\n- Feature Extraction: Đóng băng layers, chỉ train output\n- Fine-tuning: Unfreeze một số layers để train tiếp\n- Full Fine-tuning: Train lại toàn bộ\n\n**LoRA (Low-Rank Adaptation):**\n- Thêm trainable matrices nhỏ vào layers\n- Giảm parameters cần train: 1000x ít hơn\n- Phổ biến cho LLMs\n\n**Khi nào dùng:**\n- Ít dữ liệu → Feature Extraction\n- Dữ liệu vừa → Fine-tune top layers\n- Nhiều dữ liệu + khác domain → Full fine-tune",
        theoryEn: "**Transfer Learning:** Use knowledge from pre-trained models.\n\n**Strategies:** Feature Extraction, Fine-tuning, Full Fine-tuning\n\n**LoRA:** Low-Rank Adaptation — adds small trainable matrices, 1000x fewer parameters\n\n**When to use:** Few data → Feature Extraction; Medium → Fine-tune top; Lots + different domain → Full",
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
        exercise: "Implement LoRA hoàn chỉnh: thêm LoRA adapters vào 2-layer network và train trên data mới.",
        exerciseEn: "Implement full LoRA: add LoRA adapters to a 2-layer network and train on new data.",
        quiz: [
          { question: "LoRA giảm gì so với full fine-tuning?", options: ["Accuracy", "Số parameters trainable (giữ chất lượng)", "Tốc độ inference", "Kích thước dữ liệu"], answer: 1, explanation: "LoRA thêm ma trận rank thấp, chỉ train ~0.1% parameters gốc mà vẫn đạt chất lượng gần full fine-tuning." }
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
        theory: "**RAG** kết hợp retrieval + generation để trả lời chính xác.\n\n**Pipeline:**\n1. Indexing: Chia tài liệu → chunks → embeddings → Vector DB\n2. Retrieval: Query → embedding → tìm chunks tương tự\n3. Generation: Prompt = query + retrieved chunks → LLM → answer\n\n**Components:**\n- Embeddings: vector biểu diễn ngữ nghĩa\n- Vector DB: Pinecone, Weaviate, ChromaDB\n- Chunking: Fixed-size, Semantic, Recursive\n\n**Ưu điểm so với fine-tuning:**\n- Không cần train lại model\n- Dữ liệu luôn cập nhật\n- Trích dẫn nguồn được",
        theoryEn: "**RAG** combines retrieval + generation for accurate answers.\n\n**Pipeline:** Indexing → Retrieval → Generation\n\n**Components:** Embeddings, Vector DB, Chunking strategies\n\n**Advantages over fine-tuning:** No retraining, always up-to-date, citable sources",
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
        exercise: "Implement chunking strategy: chia 1 đoạn văn dài thành chunks 100 ký tự với overlap 20.",
        exerciseEn: "Implement chunking strategy: split a long text into 100-char chunks with 20-char overlap.",
        quiz: [
          { question: "RAG cần gì để hoạt động?", options: ["Chỉ LLM", "Vector DB + LLM + Embeddings", "Chỉ database SQL", "Fine-tuned model"], answer: 1, explanation: "RAG cần 3 thành phần: Embedding model để tạo vectors, Vector DB để lưu/tìm kiếm, và LLM để tạo câu trả lời." }
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
        theory: "**AI Ethics** — đảm bảo AI công bằng, minh bạch, có trách nhiệm.\n\n**Các loại Bias:**\n- Data Bias: Dữ liệu train không đại diện\n- Algorithmic Bias: Model học pattern sai\n- Deployment Bias: Dùng sai context\n\n**Fairness Metrics:**\n- Demographic Parity: Output đồng đều giữa nhóm\n- Equal Opportunity: Cùng true positive rate\n- Calibration: Xác suất dự đoán chính xác\n\n**Regulations:**\n- EU AI Act: Phân loại rủi ro AI\n- GDPR: Quyền giải thích quyết định AI\n- IEEE: Ethically Aligned Design",
        theoryEn: "**AI Ethics** — ensuring AI is fair, transparent, accountable.\n\n**Types of Bias:** Data, Algorithmic, Deployment\n\n**Fairness Metrics:** Demographic Parity, Equal Opportunity, Calibration\n\n**Regulations:** EU AI Act, GDPR, IEEE Standards",
        code: `import numpy as np

# Bias Audit Tool
def audit_model(predictions, demographics):
    groups = set(demographics)
    print("⚖️ Fairness Audit Report")
    print("=" * 50)
    
    rates = {}
    for group in sorted(groups):
        mask = [d == group for d in demographics]
        group_preds = [p for p, m in zip(predictions, mask) if m]
        pos_rate = sum(group_preds) / len(group_preds)
        rates[group] = pos_rate
        print(f"  Group '{group}': Positive rate = {pos_rate:.2%} ({sum(group_preds)}/{len(group_preds)})")
    
    # Demographic Parity check
    max_rate = max(rates.values())
    min_rate = min(rates.values())
    ratio = min_rate / max_rate if max_rate > 0 else 0
    
    print(f"\\n📊 Demographic Parity Ratio: {ratio:.3f}")
    print(f"   {'✅ FAIR' if ratio >= 0.8 else '⚠️ BIASED'} (threshold: 0.8)")
    
    return ratio

# Simulated hiring model
np.random.seed(42)
n = 100
demographics = np.random.choice(["Group A", "Group B"], n)
# Biased model: Group A gets 70% positive, Group B gets 40%
predictions = []
for d in demographics:
    if d == "Group A":
        predictions.append(1 if np.random.random() < 0.7 else 0)
    else:
        predictions.append(1 if np.random.random() < 0.4 else 0)

audit_model(predictions, demographics)`,
        codeLanguage: "python",
        exercise: "Xây dựng công cụ Bias Mitigation: cân bằng positive rate giữa các nhóm bằng threshold tuning.",
        exerciseEn: "Build a Bias Mitigation tool: balance positive rates across groups using threshold tuning.",
        quiz: [
          { question: "Demographic Parity yêu cầu gì?", options: ["100% accuracy", "Tỷ lệ dự đoán positive đồng đều giữa các nhóm", "Loại bỏ tất cả bias", "Chỉ dùng dữ liệu balanced"], answer: 1, explanation: "Demographic Parity yêu cầu tỷ lệ positive predictions phải tương tự nhau giữa các demographic groups." }
        ]
      }
    ]
  }
];
