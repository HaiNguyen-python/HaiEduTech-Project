// Deep Learning curriculum - 5 expert-level lessons (English long-read)
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
    description: "From neurons to Transformers - the engine behind modern AI",
    descriptionEn: "From neurons to Transformers - the engine behind modern AI",
    course: "dl",
    lessons: [
      // ========================================================================
      // Lesson 1 - Introduction to Neural Networks
      // ========================================================================
      {
        id: "dl-1",
        title: "Introduction to Neural Networks",
        titleEn: "Introduction to Neural Networks",
        level: 4,
        difficulty: "advanced",
        theory: `> ⚠️ **Điều kiện tiên quyết** - Trước khi bắt đầu Học Sâu (Deep Learning), bạn nên nắm vững: **Các kiến thức cơ bản về Python** (hàm, mảng NumPy), **Đại số tuyến tính** (vectơ, nhân ma trận, tích vô hướng), và bài học **Hồi quy tuyến tính trong ML** trong giáo trình này.

## 1. Tại sao lại gọi là mạng "thần kinh" ("Neural")?

Về cơ bản, một mạng nơ-ron (neural network) là một **chuỗi các hồi quy tuyến tính (linear regression) được gắn kết với nhau bằng các hàm phi tuyến tính**. Phép ẩn dụ sinh học chỉ mang tính tương đối - điều thực sự quan trọng là toán học: mỗi lớp (layer) biến đầu vào của nó thành một biểu diễn phong phú hơn mà lớp tiếp theo có thể sử dụng để phát hiện các mẫu phức tạp hơn.

Một mô hình tuyến tính đơn lẻ \`y = w·x + b\` chỉ có thể vẽ một **đường thẳng**. Các vấn đề trong thế giới thực (nhận diện mèo trong ảnh, dịch từ tiếng Pháp sang tiếng Anh, dự đoán biến động chứng khoán) đòi hỏi phải có **đường cong, góc cạnh và các vùng quyết định**. Việc xếp chồng nhiều đơn vị tuyến tính nhỏ với một phi tuyến tính ở giữa sẽ mở khóa sức mạnh biểu đạt đó.

## 2. Giải phẫu của một nơ-ron đơn lẻ

Mỗi nơ-ron thực hiện **ba việc** theo thứ tự:

1. **Tổng có trọng số** - nhân mỗi đầu vào với trọng số của nó và thêm một độ chệch (bias): \`z = w₁·x₁ + w₂·x₂ + ... + wₙ·xₙ + b\`
2. **Kích hoạt** - truyền \`z\` qua một hàm phi tuyến tính \`a = σ(z)\` để tạo độ cong.
3. **Chuyển tiếp** - gửi \`a\` đến các nơ-ron ở lớp tiếp theo.

\\\`\\\`\\\`mermaid
graph LR
    X1[x1] -->|w1| S((Σ + b))
    X2[x2] -->|w2| S
    X3[x3] -->|w3| S
    S --> A[Activation σ]
    A --> O[Output a]
\\\`\\\`\\\`

## 3. Hàm kích hoạt (Activation functions) - Chìa khóa cho tính phi tuyến tính

Nếu không có hàm kích hoạt, **N lớp xếp chồng sẽ gộp lại thành một lớp tuyến tính duy nhất** (nhân ma trận của các ma trận vẫn là một ma trận). Hàm kích hoạt là thứ làm cho các mô hình sâu (deep models) trở nên *sâu*.

| Hàm | Công thức | Phạm vi đầu ra | Khi nào sử dụng |
|---|---|---|---|
| **Sigmoid** | \`1 / (1 + e^-z)\` | (0, 1) | Đầu ra phân loại nhị phân, cổng trong LSTM |
| **Tanh** | \`(eᶻ - e⁻ᶻ)/(eᶻ + e⁻ᶻ)\` | (-1, 1) | Các lớp ẩn trong các mạng RNN cũ hơn |
| **ReLU** | \`max(0, z)\` | [0, ∞) | **Mặc định cho các lớp ẩn** - nhanh, không có vấn đề gradient biến mất ở phía dương |
| **Leaky ReLU** | \`max(0.01·z, z)\` | (-∞, ∞) | Khi ReLU "chết" (các nơ-ron bị kẹt ở 0) |
| **Softmax** | \`eᶻᵢ / Σ eᶻⱼ\` | (0, 1), tổng bằng 1 | Đầu ra phân loại đa lớp |

> **Quy tắc chung (2025)**: sử dụng **ReLU** trong các lớp ẩn, **Softmax** cho đầu ra đa lớp, **Sigmoid** cho đầu ra nhị phân. Chỉ sử dụng GELU hoặc SiLU khi huấn luyện Transformers.

## 4. Các lớp (Layers) và phép truyền xuôi (forward pass)

Một mạng *kết nối đầy đủ* (fully connected - dense) chỉ đơn giản là một chuỗi các lớp. Đối với một bộ phân loại hình ảnh với 784 pixel đầu vào, 128 đơn vị ẩn và 10 lớp đầu ra:

\`Đầu vào (784) → Dense(128, ReLU) → Dense(64, ReLU) → Dense(10, Softmax)\`

Mỗi mũi tên là một phép nhân ma trận. Toàn bộ phép truyền xuôi cho một mẫu là:

\\\`\\\`\\\`
h1 = ReLU(W1 · x + b1)        # hình dạng: (128,)
h2 = ReLU(W2 · h1 + b2)       # hình dạng: (64,)
ŷ  = Softmax(W3 · h2 + b3)    # hình dạng: (10,)  - xác suất lớp
\\\`\\\`\\\`

## 5. Ví dụ thực tế - Nhận diện biển số xe Việt Nam

Một hệ thống đọc biển số xe tự động (ANPR) hiện đại được sử dụng tại các cổng đỗ xe và trạm thu phí trên khắp Việt Nam chạy **hai mạng**:

1. Một **bộ phát hiện** tìm khung giới hạn (bounding box) của biển số trong khung hình camera.
2. Một **bộ phân loại** đọc từng ký tự (0-9, A-Z, cộng với các chữ cái tiếng Việt Đ).

Cả hai đều là mạng nơ-ron. Riêng bộ phân loại chỉ cần khoảng 3 lớp dày đặc (dense layers) nếu các ký tự đã được cắt sẵn - nhưng trên thực tế chúng ta sử dụng một CNN (Bài 3) để chống nhiễu tốt hơn.

## 6. Khái niệm cốt lõi

> 🎯 **Khái niệm cốt lõi** - Một mạng nơ-ron là một **chuỗi các khối (tuyến tính → phi tuyến tính)**. Tính tuyến tính mang lại tốc độ và khả năng huấn luyện; hàm kích hoạt mang lại khả năng biểu đạt. Nếu không có hàm kích hoạt, chiều sâu (depth) sẽ vô nghĩa.`,
        theoryEn: `> ⚠️ **Prerequisites** - Before starting Deep Learning, you should be comfortable with: **Python basics** (functions, NumPy arrays), **Linear Algebra** (vectors, matrix multiplication, dot product), and the **ML Linear Regression** lesson in this curriculum.

## 1. Why "Neural" Networks?

A neural network is, at its core, a **stack of linear regressions glued together by non-linear functions**. The biological metaphor is loose - what really matters is the math: each layer turns its inputs into a richer representation that the next layer can use to spot more complex patterns.

A single linear model \`y = w·x + b\` can only draw a **straight line**. Real-world problems (recognising a cat in a photo, translating French to English, predicting stock moves) require **curves, corners, and decision regions**. Stacking many tiny linear units with a non-linearity in between unlocks that expressive power.

## 2. Anatomy of a single neuron

Each neuron does **three things** in order:

1. **Weighted sum** - multiply every input by its weight and add a bias: \`z = w₁·x₁ + w₂·x₂ + ... + wₙ·xₙ + b\`
2. **Activation** - pass \`z\` through a non-linear function \`a = σ(z)\` to introduce curvature.
3. **Forward** - send \`a\` to the neurons in the next layer.

\`\`\`mermaid
graph LR
    X1[x1] -->|w1| S((Σ + b))
    X2[x2] -->|w2| S
    X3[x3] -->|w3| S
    S --> A[Activation σ]
    A --> O[Output a]
\`\`\`

## 3. Activation functions - the key to non-linearity

Without an activation, **N stacked layers collapse into a single linear layer** (matrix multiplication of matrices is still a matrix). The activation is what makes deep models *deep*.

| Function | Formula | Output range | When to use |
|---|---|---|---|
| **Sigmoid** | \`1 / (1 + e^-z)\` | (0, 1) | Binary classification output, gates in LSTMs |
| **Tanh** | \`(eᶻ - e⁻ᶻ)/(eᶻ + e⁻ᶻ)\` | (-1, 1) | Hidden layers in older RNNs |
| **ReLU** | \`max(0, z)\` | [0, ∞) | **Default for hidden layers** - fast, no vanishing gradient on the positive side |
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
ŷ  = Softmax(W3 · h2 + b3)    # shape: (10,)  - class probabilities
\`\`\`

## 5. Real-world example - Vietnamese number-plate recognition

A modern automatic number-plate reader (ANPR) used at parking gates and toll stations across Vietnam runs **two networks**:

1. A **detector** finds the plate's bounding box in the camera frame.
2. A **classifier** reads each character (0-9, A-Z, plus Vietnamese letters Đ).

Both are neural networks. The classifier alone needs only ~3 dense layers if the characters are pre-cropped - but in practice we use a CNN (Lesson 3) for noise robustness.

## 6. Key Concept

> 🎯 **Key Concept** - A neural network is a **chain of (linear → non-linear) blocks**. Linearity gives speed and trainability; the activation gives expressivity. Without the activation, depth is meaningless.`,
        code: `# A 3-layer neural network from scratch - no frameworks, just NumPy
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
# Each row sums to 1 - these are real probabilities for class 0 and class 1.`,
        codeLanguage: "python",
        exercise: "Hãy chỉnh sửa mạng ở trên để sử dụng **Tanh** thay vì ReLU trong các lớp ẩn. Chạy và quan sát xem xác suất đầu ra thay đổi như thế nào. Sau đó thử bỏ hoàn toàn hàm kích hoạt (thay `relu(z)` bằng `z`) – điều gì xảy ra và tại sao mạng lại trở thành tương đương với một lớp tuyến tính duy nhất?",
        exerciseEn: "Modify the network above to use **Tanh** instead of ReLU in the hidden layers. Run it and observe how the output probabilities change. Then try removing the activation entirely (replace `relu(z)` with `z`) - what happens, and why does the network become equivalent to a single linear layer?",
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
            explanation: "Softmax produces a probability distribution that sums to 1 across all 10 classes - exactly what multi-class classification requires.",
          },
        ],
      },

      // ========================================================================
      // Lesson 2 - Building a Model with PyTorch
      // ========================================================================
      {
        id: "dl-2",
        title: "Building a Model with PyTorch",
        titleEn: "Building a Model with PyTorch",
        level: 4,
        difficulty: "advanced",
        theory: `> ⚠️ **Điều kiện tiên quyết** - Bài học 1 (Mạng nơ-ron) và bài học **Hồi quy tuyến tính ML**.

## 1. Tại sao lại cần một framework?

Trong bài học trước, chúng ta đã viết một phép truyền xuôi (forward pass) thủ công. Việc huấn luyện cũng cần **phép truyền ngược** (backward pass) (gradient), một **thuật toán tối ưu hóa** (optimizer) (các biến thể của gradient descent), và **tăng tốc GPU**. Viết tất cả những thứ đó bằng tay cho mỗi mô hình là không thực tế.

Một framework học sâu (deep-learning framework) cung cấp cho bạn:

- **Tensors** - Các mảng N chiều tồn tại trên CPU hoặc GPU.
- **Autograd** - Tự động tính toán gradient thông qua bất kỳ phép tính nào bạn viết.
- **Optimizers** - SGD, Adam, AdamW chỉ với một dòng mã.
- **Layers** - Các module Dense, Conv, LSTM, Attention được xây dựng sẵn.

Hai tiêu chuẩn ngành vào năm 2025-2026 là **PyTorch** (nghiên cứu, phát triển nhanh nhất trong sản xuất) và **TensorFlow / Keras** (vẫn phổ biến trong các hệ thống kế thừa và di động). Các API tương tự nhau 90%; chúng ta sử dụng PyTorch ở đây vì nó giống như ngôn ngữ Python thông thường.

## 2. Bốn bước của mọi chương trình PyTorch

\`\`\`mermaid
graph LR
    A[1. Dữ liệu] --> B[2. Mô hình]
    B --> C[3. Hàm mất mát + Thuật toán tối ưu hóa]
    C --> D[4. Vòng lặp huấn luyện]
    D -->|epoch++| C
\`\`\`

1. **Dữ liệu** - gói các đầu vào của bạn trong \`torch.tensor\` (và lý tưởng là một \`DataLoader\` để phân lô).
2. **Mô hình** - kế thừa \`nn.Module\` và triển khai \`forward(x)\`.
3. **Hàm mất mát + Thuật toán tối ưu hóa** - chọn một tiêu chí (ví dụ: \`MSELoss\` cho hồi quy) và một thuật toán tối ưu hóa (\`Adam\` là một lựa chọn an toàn mặc định).
4. **Vòng lặp huấn luyện** - lặp lại: truyền xuôi → hàm mất mát → truyền ngược → optimizer.step.

## 3. Vòng lặp huấn luyện, từng dòng

\`\`\`python
# Lặp qua số lượng epoch đã định nghĩa
for epoch in range(epochs):
    # Đặt lại gradient về 0 cho tất cả các tham số của mô hình.
    # Điều này quan trọng để tránh việc gradient tích lũy từ các bước trước.
    optimizer.zero_grad()        # reset gradients from previous step
    # Thực hiện forward pass: đưa dữ liệu đầu vào X qua mô hình
    # để nhận được dự đoán y_hat.
    y_hat = model(X)             # forward pass
    # Tính toán giá trị hàm mất mát (loss) bằng cách so sánh
    # dự đoán y_hat với giá trị thực tế y.
    loss = criterion(y_hat, y)   # compare prediction to truth
    # Thực hiện backward pass: tính toán gradient của hàm mất mát
    # đối với tất cả các tham số có thể huấn luyện được trong mô hình.
    loss.backward()              # autograd computes gradients
    # Cập nhật trọng số của mô hình dựa trên gradient đã tính toán
    # và thuật toán tối ưu hóa (optimizer) đã chọn.
    optimizer.step()             # update weights
\`\`\`

Thứ tự \`zero_grad → forward → backward → step\` là không thể thay đổi. Quên \`zero_grad()\` là **lỗi PyTorch số 1** - gradient từ các batch trước tích lũy và hàm mất mát của bạn bùng nổ.

## 4. Chọn hàm mất mát

| Nhiệm vụ | Hàm mất mát (Loss) | Lớp PyTorch |
|---|---|---|
| Hồi quy (đầu ra liên tục) | Sai số bình phương trung bình (Mean Squared Error) | \`nn.MSELoss\` |
| Phân loại nhị phân | Cross-Entropy nhị phân (Binary Cross-Entropy) | \`nn.BCEWithLogitsLoss\` |
| Phân loại đa lớp | Cross-Entropy | \`nn.CrossEntropyLoss\` |

> **Cạm bẫy**: \`CrossEntropyLoss\` đã áp dụng Softmax nội bộ. Nếu mô hình của bạn cũng kết thúc với một lớp Softmax, bạn sẽ áp dụng nó **hai lần** và quá trình huấn luyện sẽ ngầm hoạt động kém hiệu quả. Hãy xuất **logit thô** và để hàm mất mát xử lý Softmax.

## 5. Ví dụ thực tế - Dự đoán giá căn hộ Hà Nội

Bạn có một file CSV với 5 đặc trưng cho mỗi căn hộ (diện tích, số phòng ngủ, quận, tuổi, khoảng cách đến trung tâm thành phố). Vòng lặp huấn luyện dưới đây có thể áp dụng từ hồi quy đồ chơi này cho đến một LLM 100 triệu tham số - chỉ có định nghĩa mô hình thay đổi.

## 6. Khái niệm chính

> 🎯 **Khái niệm chính** - Mọi dự án PyTorch đều tuân theo mô hình **Dữ liệu → Mô hình → Hàm mất mát/Thuật toán tối ưu hóa → Vòng lặp huấn luyện**. Nắm vững vòng lặp đó và bạn có thể huấn luyện bất cứ thứ gì từ hồi quy tuyến tính đến các mô hình lớp GPT - định nghĩa mô hình thay đổi, vòng lặp thì không.`,
        theoryEn: `> ⚠️ **Prerequisites** - Lesson 1 (Neural Networks) and the **ML Linear Regression** lesson.

## 1. Why a framework?

In the previous lesson we wrote a forward pass by hand. Training also needs the **backward pass** (gradients), an **optimizer** (gradient descent variants), and **GPU acceleration**. Writing all of that by hand for every model is impractical.

A deep-learning framework gives you:

- **Tensors** - N-dimensional arrays that live on CPU or GPU.
- **Autograd** - automatic gradient computation through any computation you write.
- **Optimizers** - SGD, Adam, AdamW with one line of code.
- **Layers** - pre-built Dense, Conv, LSTM, Attention modules.

The two industry standards in 2025-2026 are **PyTorch** (research, fastest growing in production) and **TensorFlow / Keras** (still common in legacy and mobile). The APIs are 90% similar; we use PyTorch here because it reads like normal Python.

## 2. The four steps of every PyTorch program

\`\`\`mermaid
graph LR
    A[1. Data] --> B[2. Model]
    B --> C[3. Loss + Optimizer]
    C --> D[4. Train loop]
    D -->|epoch++| C
\`\`\`

1. **Data** - wrap your inputs in \`torch.tensor\` (and ideally a \`DataLoader\` for batching).
2. **Model** - subclass \`nn.Module\` and implement \`forward(x)\`.
3. **Loss + Optimizer** - pick a criterion (e.g. \`MSELoss\` for regression) and an optimizer (\`Adam\` is a safe default).
4. **Train loop** - repeat: forward → loss → backward → optimizer.step.

## 3. The training loop, line by line

\`\`\`python
# Lặp qua số lượng epoch đã định nghĩa
for epoch in range(epochs):
    # Đặt lại gradient về 0 cho tất cả các tham số của mô hình.
    # Điều này quan trọng để tránh việc gradient tích lũy từ các bước trước.
    optimizer.zero_grad()        # reset gradients from previous step
    # Thực hiện forward pass: đưa dữ liệu đầu vào X qua mô hình
    # để nhận được dự đoán y_hat.
    y_hat = model(X)             # forward pass
    # Tính toán giá trị hàm mất mát (loss) bằng cách so sánh
    # dự đoán y_hat với giá trị thực tế y.
    loss = criterion(y_hat, y)   # compare prediction to truth
    # Thực hiện backward pass: tính toán gradient của hàm mất mát
    # đối với tất cả các tham số có thể huấn luyện được trong mô hình.
    loss.backward()              # autograd computes gradients
    # Cập nhật trọng số của mô hình dựa trên gradient đã tính toán
    # và thuật toán tối ưu hóa (optimizer) đã chọn.
    optimizer.step()             # update weights
\`\`\`

The order \`zero_grad → forward → backward → step\` is non-negotiable. Forgetting \`zero_grad()\` is the **#1 PyTorch bug** - gradients from previous batches accumulate and your loss explodes.

## 4. Picking a loss function

| Task | Loss | PyTorch class |
|---|---|---|
| Regression (continuous output) | Mean Squared Error | \`nn.MSELoss\` |
| Binary classification | Binary Cross-Entropy | \`nn.BCEWithLogitsLoss\` |
| Multi-class classification | Cross-Entropy | \`nn.CrossEntropyLoss\` |

> **Trap**: \`CrossEntropyLoss\` already applies Softmax internally. If your model also ends with a Softmax layer, you'll apply it **twice** and training will silently underperform. Output **raw logits** and let the loss handle Softmax.

## 5. Real-world example - Predicting Hanoi apartment prices

You have a CSV with 5 features per apartment (area, bedrooms, district, age, distance to city centre). The same training loop below scales from this toy regression to a 100-million-parameter LLM - only the model definition changes.

## 6. Key Concept

> 🎯 **Key Concept** - Every PyTorch project follows the **Data → Model → Loss/Optimizer → Train Loop** pattern. Master that loop and you can train anything from linear regression to GPT-class models - the model definition changes, the loop does not.`,
        code: `# Linear regression in PyTorch - the smallest possible deep-learning program.
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
        exercise: "Mở rộng mô hình thành hai đặc trưng đầu vào (ví dụ: area và bedrooms) và tạo dữ liệu tổng hợp với `y = 3*x1 - 1.5*x2 + 0.5`. Xác nhận các trọng số đã huấn luyện gần với (3, -1.5) và hệ số điều chỉnh (bias) gần với 0.5. Sau đó thay đổi trình tối ưu hóa (optimizer) từ `Adam` thành `SGD(lr=0.1)` và quan sát cách đường cong tổn thất thay đổi.",
        exerciseEn: "Extend the model to **two input features** (e.g. area and bedrooms) and generate synthetic data with `y = 3*x1 - 1.5*x2 + 0.5`. Confirm the trained weights are close to (3, -1.5) and the bias is close to 0.5. Then change the optimizer from `Adam` to `SGD(lr=0.1)` and observe how the loss curve changes.",
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
      // Lesson 3 - Convolutional Neural Networks
      // ========================================================================
      {
        id: "dl-3",
        title: "Convolutional Neural Networks (CNN)",
        titleEn: "Convolutional Neural Networks (CNN)",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Điều kiện tiên quyết** - Bài học 1 và 2.

## 1. Tại sao các lớp dày đặc (dense layers) thất bại trên hình ảnh

Một bức ảnh màu 224×224 có 224·224·3 = **150.528 pixel**. Một lớp dày đặc đầu tiên với 1.000 đơn vị ẩn sẽ cần ~150 triệu trọng số *chỉ riêng cho lớp đầu tiên*. Tệ hơn nữa, các lớp dày đặc coi pixel (0,0) hoàn toàn không liên quan đến pixel (0,1) - chúng bỏ qua **cấu trúc không gian**.

Mạng nơ-ron tích chập (Convolutional Neural Networks - CNNs) giải quyết cả hai vấn đề bằng hai ý tưởng:

- **Trường tiếp nhận cục bộ (Local receptive fields)** - mỗi nơ-ron chỉ nhìn thấy một vùng nhỏ (ví dụ 3×3) của đầu vào.
- **Chia sẻ trọng số (Weight sharing)** - cùng một bộ lọc nhỏ trượt trên toàn bộ hình ảnh.

Kết quả: một bộ lọc 3×3 duy nhất chỉ có **9 + 1 = 10 trọng số**, nhưng nó có thể phát hiện (ví dụ) một cạnh dọc ở bất cứ đâu trong hình ảnh.

## 2. Thao tác tích chập (convolution operation) trong một hình ảnh

\\\`\\\`\\\`text
Input image 5x5 → 3x3 filter slides across → Feature map 3x3 → MaxPool 2x2 → Smaller, denser feature map
\\\`\\\`\\\`

Một **bộ lọc (filter)** (còn gọi là kernel) là một ma trận nhỏ. Tại mỗi vị trí, bạn nhân từng phần tử với miếng vá đầu vào bên dưới, tổng hợp kết quả và ghi nó vào **bản đồ đặc trưng (feature map)**. Trượt bộ lọc 1 pixel (bước nhảy - *stride*) và lặp lại. Các bộ lọc khác nhau chuyên biệt cho các mẫu khác nhau: cạnh, góc, vân bề mặt (textures), sau đó là - mắt, bánh xe, khuôn mặt.

## 3. Quy trình CNN tiêu chuẩn

\\\`Conv → ReLU → Conv → ReLU → MaxPool → ... → Flatten → Dense → Softmax\\\`

| Lớp | Mục đích |
|---|---|
| **Conv2d** | Trích xuất các mẫu cục bộ bằng các bộ lọc có thể học được |
| **ReLU** | Thêm tính phi tuyến tính (tương tự như trước) |
| **MaxPool2d** | Giảm mẫu bằng cách giữ lại kích hoạt mạnh nhất trong mỗi cửa sổ - giúp tăng khả năng chịu đựng dịch chuyển và giảm tính toán |
| **Flatten** | Biến bản đồ đặc trưng 2-D thành một vector 1-D |
| **Dense** | Bộ phân loại cuối cùng |

Một lớp Conv đơn sử dụng một **hàng loạt (bank)** các bộ lọc (ví dụ 32 hoặc 64). Mỗi bộ lọc tạo ra một bản đồ đặc trưng, do đó đầu ra của \\\`Conv2d(in=3, out=32)\\\` có 32 kênh.

## 4. Các kiến trúc CNN hiện đại (2025)

- **ResNet** - thêm các *kết nối bỏ qua (skip connections)* để gradient đi qua hơn 50 lớp mà không biến mất. Vẫn là công cụ chính của thị giác máy tính.
- **EfficientNet** - mở rộng độ sâu, độ rộng và độ phân giải cùng nhau để đạt được độ chính xác trên mỗi FLOP (floating point operation - phép toán dấu phẩy động) tốt nhất.
- **ConvNeXt** - chứng minh một CNN được thiết kế tốt có thể sánh ngang với Vision Transformers trên ImageNet.
- **Vision Transformers (ViT)** - được đề cập trong Bài học 5; coi một hình ảnh như một chuỗi các miếng vá.

## 5. Ví dụ thực tế - OCR biển số xe Việt Nam

Một quy trình ANPR (Automatic Number Plate Recognition - Nhận dạng biển số tự động) thực tế được sử dụng tại các bãi đỗ xe Hà Nội:

1. **YOLO** (một công cụ phát hiện dựa trên CNN) tìm các khung bao quanh biển số - chạy ở 60 fps trên Jetson Nano.
2. Một CNN thứ hai (3 khối Conv + 2 lớp Dense, ~200K tham số) phân loại từng ký tự đã cắt thành 0-9 / A-Z / Đ.
3. Toàn bộ quy trình gói gọn trong 2 MB và chạy ngoại tuyến tại cổng.

Kiểu kiến trúc tương tự làm nền tảng cho Face ID của iPhone, phát hiện làn đường Tesla Autopilot và phân loại X-quang y tế.

## 6. Khái niệm chính

> 🎯 **Khái niệm chính** - CNNs thay "mọi pixel nói chuyện với mọi nơ-ron" bằng "bộ lọc nhỏ, được trượt khắp nơi". Điều này **giảm đáng kể** các tham số trong khi vẫn giữ cấu trúc không gian - lý do thị giác máy tính bùng nổ sau năm 2012.`,
        theoryEn: `> ⚠️ **Prerequisites** - Lessons 1 and 2.

## 1. Why dense layers fail on images

A 224×224 colour photo has 224·224·3 = **150,528 pixels**. A first dense layer with 1,000 hidden units would need ~150 million weights *for the first layer alone*. Worse, dense layers treat pixel (0,0) as completely unrelated to pixel (0,1) - they ignore **spatial structure**.

Convolutional Neural Networks (CNNs) solve both problems with two ideas:

- **Local receptive fields** - each neuron sees only a small patch (e.g. 3×3) of the input.
- **Weight sharing** - the same small filter slides across the whole image.

The result: a single 3×3 filter has only **9 + 1 = 10 weights**, yet it can detect (say) a vertical edge anywhere in the image.

## 2. The convolution operation in one picture

\`\`\`text
Input image 5x5 → 3x3 filter slides across → Feature map 3x3 → MaxPool 2x2 → Smaller, denser feature map
\`\`\`

A **filter** (also called a kernel) is a small matrix. At each position you multiply element-wise with the input patch underneath, sum the result, and write it into the **feature map**. Slide the filter by 1 pixel (the *stride*) and repeat. Different filters specialise in different patterns: edges, corners, textures, then later - eyes, wheels, faces.

## 3. The standard CNN pipeline

\`Conv → ReLU → Conv → ReLU → MaxPool → ... → Flatten → Dense → Softmax\`

| Layer | Purpose |
|---|---|
| **Conv2d** | Extract local patterns with learnable filters |
| **ReLU** | Add non-linearity (same as before) |
| **MaxPool2d** | Down-sample by keeping the strongest activation in each window - gives translation tolerance and shrinks compute |
| **Flatten** | Turn the 2-D feature map into a 1-D vector |
| **Dense** | Final classifier |

A single Conv layer uses a **bank** of filters (e.g. 32 or 64). Each filter produces one feature map, so the output of \`Conv2d(in=3, out=32)\` has 32 channels.

## 4. Modern CNN architectures (2025)

- **ResNet** - adds *skip connections* so gradients flow through 50+ layers without vanishing. Still the workhorse of computer vision.
- **EfficientNet** - scales depth, width, and resolution together for the best accuracy-per-FLOP.
- **ConvNeXt** - proves a well-designed CNN can match Vision Transformers on ImageNet.
- **Vision Transformers (ViT)** - covered in Lesson 5; treat an image as a sequence of patches.

## 5. Real-world example - Vietnamese licence-plate OCR

A real ANPR pipeline used at Hanoi parking lots:

1. **YOLO** (a CNN-based detector) finds plate bounding boxes - runs at 60 fps on a Jetson Nano.
2. A second CNN (3 Conv blocks + 2 Dense layers, ~200K parameters) classifies each cropped character into 0-9 / A-Z / Đ.
3. The whole pipeline fits in 2 MB and runs offline at the gate.

The same architecture style underpins iPhone Face ID, Tesla Autopilot lane detection, and medical X-ray triage.

## 6. Key Concept

> 🎯 **Key Concept** - CNNs swap "every pixel talks to every neuron" for "small filter, slid everywhere". This **dramatically** reduces parameters while preserving spatial structure - the reason computer vision exploded after 2012.`,
        code: `# Mạng CNN nhỏ (Tiny CNN) cho các chữ số ảnh xám 28x28 kiểu MNIST - được viết bằng PyTorch.
# Kiến trúc: Tích chập (Conv) -> ReLU -> Gộp (Pool) -> Tích chập (Conv) -> ReLU -> Gộp (Pool) -> Làm phẳng (Flatten) -> Kết nối đầy đủ (Dense) -> Logits
import torch
import torch.nn as nn
import torch.nn.functional as F

# Định nghĩa lớp TinyCNN, kế thừa từ nn.Module của PyTorch để xây dựng mô hình.
class TinyCNN(nn.Module):
    # Hàm khởi tạo của mô hình.
    # Đầu vào: num_classes (số lượng lớp đầu ra, mặc định là 10 cho 10 chữ số).
    def __init__(self, num_classes: int = 10):
        # Gọi hàm khởi tạo của lớp cha (nn.Module).
        super().__init__()
        # Khối 1: Lớp tích chập đầu tiên.
        # Đầu vào: 1 kênh (ảnh xám).
        # Đầu ra: 16 bản đồ đặc trưng (feature maps).
        # Kích thước kernel: 3x3.
        # Padding: 1 để giữ nguyên kích thước ảnh sau tích chập.
        self.conv1 = nn.Conv2d(in_channels=1, out_channels=16, kernel_size=3, padding=1)
        # Khối 2: Lớp tích chập thứ hai.
        # Đầu vào: 16 kênh (từ lớp conv1).
        # Đầu ra: 32 bản đồ đặc trưng.
        # Kích thước kernel: 3x3.
        # Padding: 1 để giữ nguyên kích thước ảnh sau tích chích chập.
        self.conv2 = nn.Conv2d(in_channels=16, out_channels=32, kernel_size=3, padding=1)
        # Sau hai giai đoạn gộp (pooling) 2x2, một ảnh 28x28 sẽ trở thành 7x7 với 32 kênh.
        # Lớp kết nối đầy đủ (fully connected) đầu tiên.
        # Đầu vào: 32 kênh * 7 * 7 = 1568 phần tử (kích thước ảnh sau pooling và làm phẳng).
        # Đầu ra: 128 phần tử.
        self.fc1 = nn.Linear(in_features=32 * 7 * 7, out_features=128)
        # Lớp kết nối đầy đủ thứ hai (lớp đầu ra).
        # Đầu vào: 128 phần tử (từ lớp fc1).
        # Đầu ra: num_classes (số lượng lớp, ví dụ 10 cho 10 chữ số).
        self.fc2 = nn.Linear(in_features=128, out_features=num_classes)

    # Định nghĩa cách dữ liệu đi qua mô hình (phép truyền xuôi).
    # Đầu vào: x (tensor chứa dữ liệu ảnh).
    # Đầu ra: x (tensor chứa logits).
    def forward(self, x):
        # Áp dụng lớp tích chập conv1, sau đó là hàm kích hoạt ReLU.
        # Kích thước đầu ra: (Batch_size, 16 kênh, 28 chiều cao, 28 chiều rộng).
        x = F.relu(self.conv1(x))
        # Áp dụng lớp gộp cực đại (max pooling) với kernel_size 2x2.
        # Kích thước đầu ra: (Batch_size, 16 kênh, 14 chiều cao, 14 chiều rộng).
        x = F.max_pool2d(x, kernel_size=2)
        # Áp dụng lớp tích chập conv2, sau đó là hàm kích hoạt ReLU.
        # Kích thước đầu ra: (Batch_size, 32 kênh, 14 chiều cao, 14 chiều rộng).
        x = F.relu(self.conv2(x))
        # Áp dụng lớp gộp cực đại (max pooling) với kernel_size 2x2.
        # Kích thước đầu ra: (Batch_size, 32 kênh, 7 chiều cao, 7 chiều rộng).
        x = F.max_pool2d(x, kernel_size=2)
        # Làm phẳng tensor, bắt đầu từ chiều thứ 1 (giữ nguyên batch_size).
        # Kích thước đầu ra: (Batch_size, 32 * 7 * 7 = 1568 phần tử).
        x = torch.flatten(x, start_dim=1)
        # Áp dụng lớp kết nối đầy đủ fc1, sau đó là hàm kích hoạt ReLU.
        # Kích thước đầu ra: (Batch_size, 128 phần tử).
        x = F.relu(self.fc1(x))
        # Áp dụng lớp kết nối đầy đủ fc2 (lớp đầu ra).
        # Kích thước đầu ra: (Batch_size, 10 phần tử) - đây là các logits thô.
        # Đầu ra: Logits thô (chưa qua softmax).
        return self.fc2(x)

# Kiểm tra nhanh mô hình với một batch ảnh giả lập.
# Tạo một thể hiện của mô hình TinyCNN.
model = TinyCNN()
# Tạo một batch giả lập gồm 4 ảnh xám 28x28.
# Kích thước: (Batch_size=4, Kênh=1, Chiều cao=28, Chiều rộng=28).
fake_batch = torch.randn(4, 1, 28, 28)
# Truyền batch giả lập qua mô hình để nhận được logits.
logits = model(fake_batch)
# In ra hình dạng (shape) của đầu ra.
# Kết quả mong đợi: (4, 10) - 4 mẫu, mỗi mẫu có 10 logits.
print("Output shape:", logits.shape)
# Tính tổng số tham số (parameters) trong mô hình.
# Kết quả mong đợi: Một số nguyên dương biểu thị tổng số trọng số và bias.
print("Total parameters:", sum(p.numel() for p in model.parameters()))`,
        codeLanguage: "python",
        exercise: "Thêm khối tích chập thứ ba (`Conv 32 -> 64`, ReLU, MaxPool) trước các lớp dày đặc. Tính toán lại kích thước đầu vào của `fc1` (gợi ý: ảnh 28x28 trở thành 3x3 sau ba pool 2x2 - 28 / 8 = 3 với các tổn thất lớp đệm). Chạy mô hình trên một lô giả và báo cáo tổng số tham số mới.",
        exerciseEn: "Add a **third** convolutional block (`Conv 32 -> 64`, ReLU, MaxPool) before the dense layers. Recalculate the input size of `fc1` (hint: a 28x28 image becomes 3x3 after three 2x2 pools - 28 / 8 = 3 with padding losses). Run the model on a fake batch and report the new total parameter count.",
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
            explanation: "A 3x3 filter slid across the whole image has just 10 weights but can detect a pattern anywhere - orders of magnitude fewer parameters than a dense layer connecting every pixel to every neuron.",
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
      // Lesson 4 - RNN & LSTM
      // ========================================================================
      {
        id: "dl-4",
        title: "Recurrent Neural Networks & LSTMs",
        titleEn: "Recurrent Neural Networks & LSTMs",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** - Lessons 1 and 2.

## 1. Why dense and CNN models struggle with sequences

Text, speech, sensor streams, and stock prices share one property: **order matters**. The sentence "Cat eats fish" means the opposite of "Fish eats cat", yet a dense layer that flattens both into the same bag of words sees them as identical.

A **Recurrent Neural Network (RNN)** processes a sequence one step at a time and carries a **hidden state** \`h_t\` that summarises everything seen so far:

\`\`\`
h_t = tanh(W_x · x_t + W_h · h_{t-1} + b)
y_t = W_y · h_t + b_y
\`\`\`

The same weights \`W_x\`, \`W_h\`, \`W_y\` are reused at every timestep - exactly the *weight sharing* trick that made CNNs work, but along the **time axis** instead of space.

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

In theory an RNN can remember arbitrarily far back. In practice, gradients propagated through 20+ steps **shrink exponentially** (or, less often, explode). The network forgets the start of the sentence by the time it reaches the end - a fatal flaw for long documents or speech.

## 3. The LSTM fix - a cell with three gates

A **Long Short-Term Memory** unit replaces the bare \`tanh\` recurrence with a *cell state* \`c_t\` that flows almost untouched through time, plus three learned **gates**:

| Gate | Decides |
|---|---|
| **Forget gate** \`f\` | What to erase from the previous cell state |
| **Input gate** \`i\` | What new information to write |
| **Output gate** \`o\` | What part of the cell state to expose as the hidden state |

Because the cell state is updated by **multiplication and addition** (no repeated tanh), gradients survive hundreds of steps. **GRU** (Gated Recurrent Unit) is a simpler 2-gate variant with similar performance.

## 4. Bidirectional and stacked RNNs

- **Bidirectional** - run one RNN left-to-right and another right-to-left, then concatenate the hidden states. The model can use context from both sides of each word, which boosts accuracy on tagging and named-entity recognition.
- **Stacked** - feed the output sequence of one LSTM into another. Two-layer LSTMs were standard in NMT systems before Transformers took over.

## 5. Real-world example - Vietnamese sentiment analysis

A 2-layer bidirectional LSTM with a 128-dim hidden state and a Vietnamese word2vec embedding can classify product reviews on Shopee with ~88% accuracy. It runs in under 5 ms per review on a CPU - small enough to embed in a mobile app for real-time moderation.

The same architecture also drove early speech recognition (DeepSpeech 2), early machine translation (Seq2Seq), and time-series forecasting in finance.

## 6. Where RNNs sit in 2025-2026

Transformers (Lesson 5) have replaced RNNs for most NLP tasks. RNNs / LSTMs are still preferred when:

- Sequences are very long but local (low-power streaming sensors).
- Latency is critical and the model must run online step-by-step.
- Memory is tight (an LSTM is ~10× smaller than an equivalent Transformer).

## 7. Key Concept

> 🎯 **Key Concept** - RNNs share weights across **time** the way CNNs share them across **space**. LSTMs add a *gated cell state* so gradients survive long sequences. Transformers (next lesson) drop recurrence entirely in favour of attention - but understanding RNNs is essential for understanding *why* attention won.`,
        theoryEn: "",
        code: `# Bộ phân loại cảm xúc trên một tập dữ liệu nhỏ - sử dụng LSTM hai chiều trong PyTorch.
import torch
import torch.nn as nn

# Định nghĩa lớp mạng nơ-ron SentimentLSTM, kế thừa từ nn.Module của PyTorch.
class SentimentLSTM(nn.Module):
    # Hàm khởi tạo của mô hình.
    # Đầu vào:
    #   - vocab_size: Kích thước từ vựng (số lượng từ duy nhất).
    #   - embed_dim: Kích thước của vector nhúng (embedding) cho mỗi từ. Mặc định là 64.
    #   - hidden_dim: Kích thước của trạng thái ẩn trong LSTM. Mặc định là 128.
    #   - num_classes: Số lượng lớp đầu ra (ví dụ: 2 cho tích cực/tiêu cực). Mặc định là 2.
    def __init__(self, vocab_size: int, embed_dim: int = 64, hidden_dim: int = 128, num_classes: int = 2):
        # Gọi hàm khởi tạo của lớp cha (nn.Module).
        super().__init__()
        # Lớp Embedding: chuyển đổi các chỉ số từ thành các vector dày đặc.
        # Đầu vào: vocab_size (số lượng từ), embed_dim (kích thước vector nhúng).
        self.embedding = nn.Embedding(num_embeddings=vocab_size, embedding_dim=embed_dim)
        # Lớp LSTM: Mạng bộ nhớ dài ngắn hạn.
        # Đầu vào:
        #   - input_size: Kích thước của vector đầu vào cho LSTM (bằng embed_dim).
        #   - hidden_size: Kích thước của trạng thái ẩn.
        #   - num_layers: Số lượng lớp LSTM xếp chồng lên nhau.
        #   - batch_first: Nếu True, đầu vào/đầu ra có dạng (batch, sequence, feature).
        #   - bidirectional: Nếu True, LSTM sẽ xử lý theo cả hai chiều (tiến và lùi).
        #   - dropout: Tỷ lệ dropout để tránh overfitting.
        self.lstm = nn.LSTM(
            input_size=embed_dim,
            hidden_size=hidden_dim,
            num_layers=2,
            batch_first=True,
            bidirectional=True,
            dropout=0.3,
        )
        # LSTM hai chiều sẽ nhân đôi kích thước của trạng thái ẩn đầu ra.
        # Lớp Linear (fully connected): Chuyển đổi đầu ra của LSTM thành các điểm số (logits) cho từng lớp.
        # Đầu vào: hidden_dim * 2 (vì là LSTM hai chiều), num_classes (số lượng lớp đầu ra).
        self.fc = nn.Linear(hidden_dim * 2, num_classes)

    # Hàm forward định nghĩa cách dữ liệu đi qua mô hình.
    # Đầu vào: x - tensor chứa các chỉ số từ của một batch các câu.
    #   - x có kích thước: (batch_size, seq_len)
    def forward(self, x):
        # Bước 1: Nhúng các chỉ số từ thành vector.
        # Đầu vào x: (batch_size, seq_len)
        # Đầu ra embedded: (batch_size, seq_len, embed_dim)
        embedded = self.embedding(x)
        # Bước 2: Đưa vector nhúng qua lớp LSTM.
        # Đầu vào embedded: (batch_size, seq_len, embed_dim)
        # Đầu ra output: (batch_size, seq_len, hidden_dim * 2) - chứa tất cả các trạng thái ẩn theo thời gian.
        # h_n, c_n: trạng thái ẩn và trạng thái ô cuối cùng của tất cả các lớp.
        output, (h_n, c_n) = self.lstm(embedded)
        # Bước 3: Lấy biểu diễn của bước thời gian cuối cùng để phân loại.
        # Chúng ta chỉ quan tâm đến trạng thái cuối cùng của chuỗi.
        # last_step: (batch_size, hidden_dim * 2)
        last_step = output[:, -1, :]
        # Bước 4: Đưa biểu diễn cuối cùng qua lớp tuyến tính để có các điểm số (logits).
        # Đầu ra là các logits, chưa qua hàm softmax.
        # Đầu ra: (batch_size, num_classes)
        return self.fc(last_step)  # raw logits

# Kiểm tra nhanh mô hình (sanity check).

# Khởi tạo một mô hình SentimentLSTM với kích thước từ vựng 10,000.
model = SentimentLSTM(vocab_size=10_000)
# Tạo dữ liệu giả lập (fake_reviews) để kiểm tra.
# Đây là một batch gồm 8 câu, mỗi câu có độ dài 50 từ.
# Các từ được biểu diễn bằng các chỉ số ngẫu nhiên từ 0 đến 9,999.
fake_reviews = torch.randint(low=0, high=10_000, size=(8, 50))  # batch of 8, length 50
# Đưa dữ liệu giả lập qua mô hình để nhận được các logits.
logits = model(fake_reviews)
# In ra kích thước của đầu ra.
# Kết quả mong đợi: (8, 2) - 8 mẫu, mỗi mẫu có 2 điểm số cho 2 lớp.
print("Output shape:", logits.shape)
# In ra tổng số tham số có thể huấn luyện trong mô hình.
print("Parameters: ", sum(p.numel() for p in model.parameters()))
# Kết quả mong đợi: Output shape: torch.Size([8, 2])
# Kết quả mong đợi: Parameters:  một số nguyên lớn (ví dụ: khoảng 1.5 triệu)
`,
        codeLanguage: "python",
        exercise: "Replace `nn.LSTM` with `nn.GRU` (the API is almost identical - drop the `c_n` cell state). Compare parameter counts. Then make the model **uni-directional** (`bidirectional=False`) and update the input dimension of the final linear layer. Which version has fewer parameters, and which would you expect to perform better on long reviews?",
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
            explanation: "The cell state with multiplicative gates lets gradients flow across hundreds of timesteps without shrinking to zero - the core failure mode of vanilla RNNs.",
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
      // Lesson 5 - Transformers & LLMs
      // ========================================================================
      {
        id: "dl-5",
        title: "Transformers & Large Language Models",
        titleEn: "Transformers & Large Language Models",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** - All previous DL lessons. Familiarity with the **AI Foundation → LLM** lesson is also recommended.

## 1. Why attention replaced recurrence

RNNs process tokens one at a time - fundamentally **sequential**, which means slow training on modern GPUs. The 2017 paper *"Attention Is All You Need"* introduced the **Transformer**: a model that drops recurrence entirely and lets every token directly attend to every other token in **parallel**.

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

**Multi-head attention** runs this whole operation \`h\` times (e.g. 12 or 96) in parallel with different learned projections, then concatenates the outputs. Different heads learn to capture different relationships - syntax, coreference, long-range dependencies.

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
| **Encoder-only** | BERT, RoBERTa | Understands text - classification, embeddings, NER |
| **Decoder-only** | GPT, Llama, Claude, Gemini | Generates text - chat, code, summaries |
| **Encoder-decoder** | T5, original Transformer | Translates / transforms - input → output sequences |

The dominant LLM architecture in 2025-2026 is **decoder-only with causal masking** - each token can attend only to itself and earlier tokens, so the model can be trained to predict the next token on trillions of tokens of text.

## 5. From Transformer to LLM

A "Large Language Model" is just a Transformer scaled up dramatically:

| Knob | Small | Frontier (2025) |
|---|---|---|
| Parameters | 100 M | 100 B – 2 T |
| Context length | 512 tokens | 1 M+ tokens |
| Training data | ~1 B tokens | 10 T+ tokens |
| Compute (FLOPs) | 10¹⁹ | 10²⁵ |
| Training cost | < $100 | $50 M – $500 M |

After pre-training, the model is **fine-tuned with human feedback (RLHF/DPO)** to follow instructions, refuse unsafe requests, and adopt a helpful persona - the difference between a raw GPT-4 base and ChatGPT.

## 6. Real-world example - Vietnamese legal-document Q&A

A modern Vietnamese law-firm chatbot uses:

1. A **bilingual encoder** (e.g. multilingual-e5) to turn each clause of the Vietnamese Civil Code into an embedding stored in a vector database.
2. A **decoder LLM** (e.g. Claude 3.5 or Gemini 2.5) that, given a user question, retrieves the top-K relevant clauses and generates a grounded answer in Vietnamese - citing the article numbers.

This pattern is called **RAG (Retrieval-Augmented Generation)** and is the most common way to deploy LLMs in production today.

## 7. The 2025-2026 frontier

- **Mixture of Experts (MoE)** - only 1/8 of the parameters fire per token; massively reduces inference cost (Mixtral, Gemini 1.5, GPT-4).
- **Long context** - 1 M+ token windows let LLMs read entire codebases or books in one pass.
- **Multimodal** - the same Transformer backbone now handles text, images, audio, and video (Gemini 2.5, GPT-5, Claude 3.5).
- **Reasoning models** - separate "think before you speak" pass (o1, o3, Gemini 2.5 Pro) trades latency for dramatically higher accuracy on math, code, and logic.

## 8. Key Concept

> 🎯 **Key Concept** - Self-attention replaces recurrence with **all-to-all comparison in parallel**. Stacking dozens of attention blocks and scaling parameters, data, and compute is the entire recipe behind every modern LLM. Everything else - RAG, fine-tuning, multimodality - sits on top of this foundation.`,
        theoryEn: "",
        code: `# Mini self-attention từ đầu - toán học đằng sau mọi LLM, trong 30 dòng.
# Nhập thư viện cần thiết
import torch
import torch.nn.functional as F

# Cố định seed để kết quả có thể lặp lại
torch.manual_seed(0)

# Một "câu" mẫu: 4 token, mỗi token biểu diễn bởi embedding 8 chiều
seq_len, d_model = 4, 8
x = torch.randn(seq_len, d_model)

# Ma trận chiếu có thể học được (ở đây chỉ là ngẫu nhiên)
W_q = torch.randn(d_model, d_model)
W_k = torch.randn(d_model, d_model)
W_v = torch.randn(d_model, d_model)

# 1. Chiếu input thành Query, Key, Value
Q = x @ W_q   # (seq_len, d_model)
K = x @ W_k
V = x @ W_v

# 2. Attention tích vô hướng đã chuẩn hóa
scores = Q @ K.T / (d_model ** 0.5)   # (seq_len, seq_len)
weights = F.softmax(scores, dim=-1)   # mỗi hàng có tổng bằng 1
output = weights @ V                   # (seq_len, d_model)

# In ra ma trận trọng số attention và thông tin về output
print("Attention weight matrix (rows = queries, cols = keys):")
print(weights.round(decimals=2))
print("\\\\nEach row sums to 1.0:", weights.sum(dim=-1).round(decimals=2).tolist())
print("\\\\nOutput shape (one new vector per token):", output.shape)`,
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
            explanation: "Self-attention is a single matrix multiplication over the whole sequence - fully parallelisable on GPUs/TPUs. RNNs are forced to wait for timestep t-1 before computing t.",
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
            explanation: "The scaled dot product produces raw similarity scores; softmax turns them into a probability distribution over keys for each query - i.e. an attention weight.",
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
      // Lesson 6 - Transfer Learning & Fine-Tuning
      // ========================================================================
      {
        id: "dl-6",
        title: "Transfer Learning & Fine-Tuning",
        titleEn: "Transfer Learning & Fine-Tuning",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** - Lessons 1–3.

## 1. Why not train from scratch?

Training a modern vision model on ImageNet (1.2M images) takes **days on 8 GPUs**. Most teams reuse a network already trained on a giant dataset and adapt it - that is **transfer learning**.

The key insight: the **lower layers** of a deep CNN learn very generic features (edges, textures, shapes) useful for almost any vision problem. Only the **top layers** specialise. Keep the generic part, replace the top, and you get a powerful model with very little new training.

## 2. Two flavours

| Strategy | What you do | When to use |
|---|---|---|
| **Feature extraction** | Freeze pretrained weights, train only a new head | Small dataset (< 5 000 imgs) |
| **Fine-tuning** | Replace head AND unfreeze top layers, train with a small learning rate | Larger dataset, similar domain |

Rule of thumb: **freeze first**, validate, then unfreeze top blocks with \`lr × 0.1\`. Never unfreeze everything at the original learning rate - that destroys pretrained knowledge (catastrophic forgetting).

## 3. Real-world example - license-plate detection

You have only 2 000 labelled Vietnamese license-plate images. Training from scratch overfits massively. Instead: load **ResNet-50 pretrained on ImageNet**, replace the classifier with a 2-class head, freeze layers 1–3, fine-tune layer 4 + the head with \`lr=1e-4\`. You typically reach **>95 % accuracy in under an hour**.

## 4. Beyond vision

In 2025 transfer learning is the default in **every** subfield: BERT/Llama for NLP, Whisper for speech, wav2vec 2.0 for audio. **LoRA** and **QLoRA** update only ~1 % of parameters - making fine-tuning of multi-billion-parameter LLMs possible on a single consumer GPU.

> 💡 **Key concept** - Almost no one trains foundation models from scratch in 2025. The skill that matters is choosing the right pretrained backbone and fine-tuning it efficiently.`,
        theoryEn: "",
        code: `# Học chuyển giao (Transfer learning) với mô hình ResNet-18 đã được huấn luyện trước - đóng băng phần xương sống (backbone), huấn luyện phần đầu (head) mới
import torch
import torch.nn as nn
import torchvision.models as models

# Tải mô hình ResNet-18 đã được huấn luyện trước trên tập dữ liệu ImageNet
# Đầu vào: Không có.
# Đầu ra: Một đối tượng mô hình ResNet-18 đã được tải trọng số mặc định.
model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)

# Đóng băng tất cả các tham số của mô hình
# Điều này có nghĩa là các tham số này sẽ không được cập nhật trong quá trình huấn luyện.
# Đầu vào: Các tham số của mô hình.
# Đầu ra: Các tham số được đặt thuộc tính requires_grad = False.
for param in model.parameters():
    param.requires_grad = False

# Thay thế lớp cuối cùng (lớp phân loại) bằng một lớp mới có 2 đầu ra (chỉ lớp này sẽ được huấn luyện)
# Đầu vào: Mô hình ResNet-18 đã đóng băng.
# Đầu ra: Mô hình với lớp 'fc' (fully connected) được thay thế bằng một lớp tuyến tính mới.
num_features = model.fc.in_features # Lấy số lượng đặc trưng đầu vào của lớp cuối cùng hiện tại
model.fc = nn.Linear(num_features, 2) # Thay thế lớp cuối cùng bằng một lớp tuyến tính mới với 2 đầu ra

# Tính toán số lượng tham số có thể huấn luyện và tổng số tham số
# Đầu vào: Mô hình đã được sửa đổi.
# Đầu ra: Hai số nguyên (trainable, total) và in ra tỷ lệ phần trăm.
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad) # Đếm các tham số có requires_grad = True
total = sum(p.numel() for p in model.parameters()) # Đếm tổng số tham số
print(f"Trainable: {trainable:,} / {total:,} ({100*trainable/total:.2f}%)")
# Kết quả mong đợi: In ra số lượng tham số có thể huấn luyện, tổng số tham số và tỷ lệ phần trăm.

# Khởi tạo bộ tối ưu hóa Adam chỉ cho các tham số của lớp 'fc' mới (lớp có thể huấn luyện)
# Đầu vào: Tham số của lớp 'fc' và tốc độ học (learning rate).
# Đầu ra: Một đối tượng bộ tối ưu hóa.
optimizer = torch.optim.Adam(model.fc.parameters(), lr=1e-3)
# Khởi tạo hàm mất mát CrossEntropyLoss, thường dùng cho bài toán phân loại đa lớp
# Đầu vào: Không có.
# Đầu ra: Một đối tượng hàm mất mát.
criterion = nn.CrossEntropyLoss()

# Bước huấn luyện thử nghiệm (Toy training step)
# Tạo một batch ảnh giả lập (8 ảnh, 3 kênh màu, kích thước 224x224)
# Đầu vào: Kích thước tensor.
# Đầu ra: Một tensor chứa dữ liệu ảnh ngẫu nhiên.
imgs = torch.randn(8, 3, 224, 224)
# Tạo nhãn giả lập cho batch ảnh (8 nhãn, giá trị 0 hoặc 1)
# Đầu vào: Phạm vi giá trị và kích thước tensor.
# Đầu ra: Một tensor chứa nhãn ngẫu nhiên.
labels = torch.randint(0, 2, (8,))
# Tính toán giá trị mất mát (loss)
# Đầu vào: Đầu ra của mô hình (dự đoán) và nhãn thực tế.
# Đầu ra: Một tensor chứa giá trị mất mát.
loss = criterion(model(imgs), labels)
# Thực hiện lan truyền ngược (backpropagation) để tính gradient của loss đối với các tham số
# Đầu vào: Giá trị mất mát.
# Đầu ra: Gradient được tính và lưu trữ trong thuộc tính .grad của các tham số.
loss.backward()
# Cập nhật các tham số của mô hình dựa trên gradient đã tính và bộ tối ưu hóa
# Đầu vào: Gradient đã tính.
# Đầu ra: Các tham số của mô hình được cập nhật.
optimizer.step()
print(f"Loss: {loss.item():.4f}")
# Kết quả mong đợi: In ra giá trị mất mát sau một bước huấn luyện thử nghiệm.
`,
        codeLanguage: "python",
        exercise: "Switch to **fine-tuning** mode: also unfreeze `model.layer4`, then build an Adam optimizer with two parameter groups - `layer4` at `lr=1e-4` and `fc` at `lr=1e-3`. Print the new trainable-parameter percentage (~20–25 %).",
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
            explanation: "A small learning rate prevents catastrophic forgetting - large gradient steps would erase the useful knowledge inside the backbone.",
          },
          {
            question: "Which technique updates only ~1 % of an LLM's parameters?",
            options: ["LoRA", "Dropout", "BatchNorm", "Beam search"],
            answer: 0,
            explanation: "LoRA injects small trainable low-rank matrices into each layer, leaving the original weights frozen - making fine-tuning of multi-billion-parameter models tractable.",
          },
        ],
      },

      // ========================================================================
      // Lesson 7 - Object Detection (YOLO)
      // ========================================================================
      {
        id: "dl-7",
        title: "Object Detection & Segmentation",
        titleEn: "Object Detection & Segmentation",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** - Lessons 3 (CNN) and 6 (Transfer Learning).

## 1. Beyond classification

Classification answers "*what* is in this image?" Object detection answers two harder questions: **what** objects + **where** they are (bounding boxes \`(x, y, w, h)\`). **Semantic segmentation** labels every pixel; **instance segmentation** also distinguishes individual objects of the same class.

## 2. Two families

| Family | Examples | Idea | Speed |
|---|---|---|---|
| **Two-stage** | Faster R-CNN, Mask R-CNN | Propose regions → classify each | Slower, highest accuracy |
| **One-stage** | YOLO v8/v9/v10, RetinaNet | Predict boxes + classes in one pass | Real-time |

In 2025, **YOLO** dominates production real-time use cases - modern variants reach >50 mAP on COCO at >100 FPS.

\`\`\`text
Input image → Backbone CNN → Neck FPN: multi-scale features → Detection head → Boxes + classes + confidence
\`\`\`

## 3. Three letters every detector uses

- **Anchor boxes** - predefined shapes; the network predicts offsets to them
- **IoU** (Intersection over Union) - overlap metric; >0.5 = correct match
- **NMS** (Non-Maximum Suppression) - keeps highest-confidence box, discards overlaps

## 4. Real-world deployments

Self-driving cars, license-plate recognition (YOLO + CRNN), medical imaging (U-Net for tumour segmentation), retail analytics. With \`ultralytics/yolov8\` you can fine-tune a state-of-the-art detector on 200–500 labelled images in under an hour.

> 💡 **Key concept** - The bottleneck in 2025 is no longer the model - it's the **labelling**.`,
        theoryEn: "",
        code: `# Phát hiện vật thể trong thế giới thực chỉ với khoảng 10 dòng code sử dụng mô hình YOLOv8 đã được huấn luyện trước.
# Để chạy được code này, bạn cần cài đặt thư viện ultralytics: pip install ultralytics
from ultralytics import YOLO

# Tải mô hình YOLOv8n đã được huấn luyện trước.
# "yolov8n.pt" là phiên bản "nano" của YOLOv8, có kích thước khoảng 6 MB và chạy rất nhanh trên GPU hiện đại.
# Đầu vào: Tên file mô hình đã được huấn luyện (.pt).
# Đầu ra: Một đối tượng mô hình YOLO đã sẵn sàng để dự đoán.
model = YOLO("yolov8n.pt")  # ~6 MB, chạy với tốc độ 100+ FPS trên GPU hiện đại

# Thực hiện dự đoán trên một hình ảnh.
# Đầu vào:
#   - source: Đường dẫn đến hình ảnh hoặc video cần phát hiện (có thể là URL).
#   - conf: Ngưỡng tin cậy tối thiểu để chấp nhận một vật thể được phát hiện (từ 0 đến 1).
#   - iou: Ngưỡng IoU (Intersection over Union) cho Non-Maximum Suppression (NMS).
#          NMS giúp loại bỏ các hộp giới hạn trùng lặp cho cùng một vật thể.
#   - save: Nếu là True, hình ảnh đã được chú thích (vẽ hộp và nhãn) sẽ được lưu vào thư mục mặc định.
# Đầu ra: Một danh sách các đối tượng kết quả dự đoán, mỗi đối tượng chứa thông tin về các vật thể được phát hiện.
results = model.predict(
    source="https://ultralytics.com/images/bus.jpg",
    conf=0.25,       # ngưỡng tin cậy tối thiểu
    iou=0.45,        # ngưỡng IoU cho NMS (Non-Maximum Suppression)
    save=True,       # lưu hình ảnh đã chú thích vào ./runs/detect/predict/
)

# Lặp qua từng kết quả dự đoán (trong trường hợp dự đoán nhiều hình ảnh/video).
# Đầu vào: Danh sách các đối tượng kết quả từ model.predict().
# Đầu ra: In ra thông tin chi tiết về các vật thể được phát hiện cho mỗi hình ảnh.
for r in results:
    # In ra tổng số vật thể được phát hiện trong hình ảnh hiện tại và đường dẫn của hình ảnh.
    print(f"Detected {len(r.boxes)} objects in {r.path}")
    # Lặp qua từng hộp giới hạn (box), lớp (class) và điểm tin cậy (score) của các vật thể được phát hiện.
    # r.boxes.xyxy: Tọa độ của các hộp giới hạn (x1, y1, x2, y2).
    # r.boxes.cls: ID của lớp vật thể.
    # r.boxes.conf: Điểm tin cậy của vật thể.
    for box, cls, score in zip(r.boxes.xyxy, r.boxes.cls, r.boxes.conf):
        # Chuyển đổi tọa độ hộp giới hạn từ tensor sang danh sách Python.
        x1, y1, x2, y2 = box.tolist()
        # In thông tin chi tiết về từng vật thể: tên lớp, điểm tin cậy và tọa độ hộp giới hạn.
        # model.names[int(cls)] chuyển ID lớp thành tên lớp dễ đọc.
        # Định dạng chuỗi để căn chỉnh và làm tròn số.
        print(f"  {model.names[int(cls)]:12s} conf={score:.2f}  "
              f"box=({x1:.0f},{y1:.0f})->({x2:.0f},{y2:.0f})")

# Để huấn luyện mô hình trên tập dữ liệu của riêng bạn:
# model.train(data="my_dataset.yaml", epochs=50, imgsz=640, batch=16)
# Đầu vào:
#   - data: Đường dẫn đến file cấu hình dataset (ví dụ: my_dataset.yaml).
#   - epochs: Số lần lặp lại toàn bộ quá trình huấn luyện trên dataset.
#   - imgsz: Kích thước hình ảnh đầu vào cho mô hình.
#   - batch: Số lượng hình ảnh được xử lý cùng lúc trong mỗi bước huấn luyện.
# Đầu ra: Một mô hình đã được huấn luyện trên dữ liệu của bạn.
`,
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
      // Lesson 8 - GANs
      // ========================================================================
      {
        id: "dl-8",
        title: "Generative Adversarial Networks (GANs)",
        titleEn: "Generative Adversarial Networks (GANs)",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** - Lessons 1–3.

## 1. The two-player game

In 2014, Ian Goodfellow proposed: train **two** networks fighting each other.

- **Generator (G)** - takes random noise, produces a fake sample that looks real
- **Discriminator (D)** - receives real or fake samples, must tell which is which

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

Famously unstable - too-strong D crushes G's gradient; too-weak D gives no useful signal. Tricks like **WGAN-GP** and **spectral normalisation** stabilise training.

## 3. Variants that mattered

| Variant | Year | Contribution |
|---|---|---|
| **DCGAN** | 2015 | First convolutional GAN |
| **CycleGAN** | 2017 | Image-to-image translation **without paired data** |
| **StyleGAN** | 2019 | Photorealistic face synthesis with style control |

## 4. GANs vs Diffusion in 2025

By 2022, **diffusion models** (Stable Diffusion, DALL-E 3) overtook GANs for general image synthesis. But GANs still dominate niches: real-time generation (NVIDIA DLSS), audio synthesis (HiFi-GAN), super-resolution.

> 💡 **Key concept** - A GAN learns a distribution **implicitly** by drawing samples from it, rather than estimating its density.`,
        theoryEn: "",
        code: `# Tiny GAN học để sinh mẫu từ phân phối 1-D hai đỉnh (bimodal)
# Nhập các module cần thiết từ PyTorch
import torch
import torch.nn as nn

# Dữ liệu thực: sampler trả về các mẫu 1-D từ phân phối hai đỉnh (hai mode)
REAL_SAMPLER = lambda n: torch.cat([
    torch.randn(n // 2) * 0.5 - 2.0,   # left mode at -2
    torch.randn(n // 2) * 0.5 + 2.0,   # right mode at +2
]).unsqueeze(1)

# Định nghĩa kiến trúc mạng cho Generator và Discriminator (mạng nhỏ)
G = nn.Sequential(nn.Linear(1, 32), nn.ReLU(), nn.Linear(32, 1))
D = nn.Sequential(nn.Linear(1, 32), nn.ReLU(), nn.Linear(32, 1), nn.Sigmoid())

# Khởi tạo bộ tối ưu cho G và D và định nghĩa hàm mất mát BCE
opt_G = torch.optim.Adam(G.parameters(), lr=1e-3)
opt_D = torch.optim.Adam(D.parameters(), lr=1e-3)
bce = nn.BCELoss()

# Vòng lặp huấn luyện chính
for step in range(2000):
    # Huấn luyện discriminator
    real = REAL_SAMPLER(64)
    z = torch.randn(64, 1)
    fake = G(z).detach()
    loss_D = bce(D(real), torch.ones(64, 1)) + bce(D(fake), torch.zeros(64, 1))
    opt_D.zero_grad(); loss_D.backward(); opt_D.step()

    # Huấn luyện generator (muốn D gọi mẫu giả là 'thực')
    z = torch.randn(64, 1)
    fake = G(z)
    loss_G = bce(D(fake), torch.ones(64, 1))
    opt_G.zero_grad(); loss_G.backward(); opt_G.step()

    # In mẫu và loss mỗi 400 bước để theo dõi
    if step % 400 == 0:
        with torch.no_grad():
            samples = G(torch.randn(1000, 1)).squeeze().numpy()
        print(f"step {step:4d} | loss_D={loss_D.item():.3f} loss_G={loss_G.item():.3f} | "
              f"fake mean={samples.mean():+.2f} std={samples.std():.2f}")`,
        codeLanguage: "python",
        exercise: "Modify `REAL_SAMPLER` to a **three-mode** distribution at -3, 0, +3. Re-train and check whether the generator covers all three modes - if it suffers **mode collapse**, increase hidden size from 32 to 128.",
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
      // Lesson 9 - Diffusion Models
      // ========================================================================
      {
        id: "dl-9",
        title: "Diffusion Models - The Engine Behind Stable Diffusion",
        titleEn: "Diffusion Models - The Engine Behind Stable Diffusion",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** - Lessons 3 (CNN) and 8 (GANs).

## 1. Learn to **un-noise**

Diffusion models train on a brilliantly simple idea: instead of generating an image in one giant leap, learn to gradually **remove noise** at every noise level. Once the model can denoise, generate by starting from **pure noise** and denoising step-by-step.

Two phases:
1. **Forward (fixed)** - add Gaussian noise to a real image \`x₀\` over T steps until \`x_T\` is pure noise. No learning here.
2. **Reverse (learned)** - train a network \`ε_θ(x_t, t)\` to **predict the noise** added at step \`t\`. Loss = MSE between predicted and true noise.

\`\`\`mermaid
flowchart LR
    X0[Clean x_0] -->|+noise| X1 -->|+noise| XT[Pure noise]
    XT -->|denoise| X1b -->|denoise| X0b[Generated image]
\`\`\`

## 2. Why diffusion beat GANs

GANs need an unstable adversarial game; diffusion only needs MSE regression. Three advantages:
- **Stable training** - no mode collapse, no balancing tricks
- **Scalable** - bigger models keep getting better; GANs plateau
- **Diverse** - different noise seeds give different images

The price: **inference speed**. Vanilla DDPM needs 1 000 forward passes per image. Modern samplers (DDIM, DPM-Solver++, **Latent Consistency Models**) cut that to **4–8 steps**.

## 3. Latent diffusion - Stable Diffusion's secret

Running diffusion on 1024×1024 RGB pixels is too expensive. **Stable Diffusion** (2022) does the diffusion in a **64×64 latent space** of a pretrained autoencoder, then decodes back. That trick made photorealistic text-to-image **run on a consumer GPU**.

## 4. Conditioning: text → pictures

Condition the denoiser on a **text embedding** from CLIP/T5. **Classifier-Free Guidance** amplifies prompt influence at sample time.

> 💡 **Key concept** - A diffusion model is a **denoiser** trained at every noise level. Generation = repeatedly denoising pure noise into something meaningful. With text conditioning, this single idea powers Stable Diffusion, DALL-E 3, Midjourney, and Sora.`,
        theoryEn: "",
        code: `# Sử dụng một mô hình Stable Diffusion đã được huấn luyện trước từ Hugging Face
# Để chạy được code này, cần cài đặt các thư viện sau:
# pip install diffusers transformers accelerate torch

# Nhập thư viện torch để làm việc với tensor và GPU
import torch
# Nhập lớp StableDiffusionPipeline từ thư viện diffusers
from diffusers import StableDiffusionPipeline

# Tải mô hình Stable Diffusion đã được huấn luyện trước
# "runwayml/stable-diffusion-v1-5" là tên của mô hình trên Hugging Face
# torch_dtype=torch.float16 giúp sử dụng ít bộ nhớ hơn và tăng tốc độ tính toán trên GPU
pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16,
)
# Di chuyển mô hình lên GPU nếu có, nếu không thì dùng CPU
# Điều này giúp tăng tốc độ tạo ảnh đáng kể
pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")

# Định nghĩa câu lệnh (prompt) để mô tả hình ảnh muốn tạo
prompt = "A photorealistic cat astronaut on Mars, cinematic lighting"
# Gọi mô hình để tạo ảnh dựa trên prompt
# num_inference_steps: số bước suy luận, càng cao ảnh càng chi tiết nhưng tốn thời gian hơn
# guidance_scale: mức độ mô hình tuân thủ prompt, giá trị cao hơn sẽ tạo ảnh sát với mô tả hơn
# height, width: kích thước của ảnh đầu ra
# .images[0] lấy ra ảnh đầu tiên (và duy nhất trong trường hợp này) từ kết quả
image = pipe(
    prompt=prompt,
    num_inference_steps=30,
    guidance_scale=7.5,            # how strongly to follow the prompt
    height=512, width=512,
).images[0]

# Lưu ảnh đã tạo ra vào một tệp tin
# Đầu ra: Một tệp ảnh tên "cat_astronaut.png"
image.save("cat_astronaut.png")
# In thông báo xác nhận đã lưu ảnh
print("Saved cat_astronaut.png")

# Tạo 4 biến thể ảnh khác nhau từ cùng một prompt
# Bằng cách truyền một danh sách prompt (ở đây là prompt lặp lại 4 lần)
# Đầu ra: Một danh sách các đối tượng ảnh
images = pipe(prompt=[prompt] * 4, num_inference_steps=30).images
# Lặp qua từng ảnh trong danh sách các biến thể
# và lưu chúng với tên tệp khác nhau
for i, img in enumerate(images):
    # Lưu ảnh với tên tệp có dạng "variation_0.png", "variation_1.png", v.v.
    img.save(f"variation_{i}.png")
# Đầu ra mong đợi: 4 tệp ảnh có tên "variation_0.png", "variation_1.png", "variation_2.png", "variation_3.png"
`,
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
      // Lesson 10 - Fine-Tuning LLMs (LoRA, QLoRA, RAG)
      // ========================================================================
      {
        id: "dl-10",
        title: "Fine-Tuning LLMs - LoRA, QLoRA & RAG",
        titleEn: "Fine-Tuning LLMs - LoRA, QLoRA & RAG",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** - Lesson 5 (Transformers & LLMs) and Lesson 6 (Transfer Learning).

## 1. Three ways to make an LLM "yours"

| Technique | Cost | Latency | Best for |
|---|---|---|---|
| **Prompt engineering + few-shot** | Free | Fast | Quick wins |
| **RAG (Retrieval-Augmented Generation)** | Cheap | Medium | Up-to-date facts |
| **Fine-tuning (LoRA / QLoRA)** | Moderate | Fast | Style, format, domain reasoning |

Production systems usually **combine RAG + fine-tuning** - fine-tune for tone, retrieve for facts.

## 2. RAG in 60 seconds

\`\`\`text
  1. User question  →
  2. Embed query  →
  3. (Vector DB: Pinecone, Qdrant, pgvector)  →
  4. Top-k relevant chunks  →
  5. LLM answers using question + retrieved context  →
  6. Grounded answer + citations
\`\`\`

Knowledge updates without retraining; citations make hallucinations auditable; even a 7B model with good RAG often beats a 70B model alone on factual tasks.

## 3. LoRA - fine-tuning without breaking the bank

Full fine-tuning of a 7B Llama needs ~80 GB GPU. **LoRA** (2021): freeze \`W\`, learn a tiny **delta** \`ΔW = B · A\` where \`A\`, \`B\` are low-rank. For a 4 096×4 096 matrix with rank \`r=8\`, you train **65k params instead of 17M** - 250× reduction.

**QLoRA** (2023): load the base model in **4-bit** precision; LoRA adapters stay in float16. You can now fine-tune a **70B model on a single 24 GB consumer GPU**.

## 4. What to fine-tune for

Don't fine-tune for **facts** - that's RAG's job. Fine-tune for:
- **Output format** (JSON, citations, formal Vietnamese)
- **Tone & persona**
- **Domain reasoning**
- **Latency / cost** - a fine-tuned 1B can replace a 70B prompt and cut bills 50×

> 💡 **Key concept** - In 2025, the modern AI engineer's stack: pick a strong open-weight base, wire up RAG for facts, apply LoRA/QLoRA for format & style. No one starts from scratch.`,
        theoryEn: "",
        code: `# Fine-tuning QLoRA cho Llama-3-8B trong ~30 dòng - chạy trên 1 GPU 16 GB
# cài đặt: pip install transformers peft accelerate bitsandbytes datasets trl
# Import các thư viện cần thiết
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from datasets import load_dataset
from trl import SFTTrainer, SFTConfig

# Định danh model gốc
MODEL = "meta-llama/Meta-Llama-3-8B"

# Tải model gốc ở độ chính xác 4-bit (QLoRA)
bnb = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
)
model = AutoModelForCausalLM.from_pretrained(MODEL, quantization_config=bnb, device_map="auto")
tokenizer = AutoTokenizer.from_pretrained(MODEL)
tokenizer.pad_token = tokenizer.eos_token

# Bọc model bằng LoRA - chỉ ~0.5% tham số sẽ được huấn luyện
model = prepare_model_for_kbit_training(model)
lora = LoraConfig(
    r=16, lora_alpha=32, lora_dropout=0.05,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    bias="none", task_type="CAUSAL_LM",
)
model = get_peft_model(model, lora)
model.print_trainable_parameters()  # ví dụ 41.9M / 8.0B (0.52%)

# Tải dataset từ file jsonl
dataset = load_dataset("json", data_files="my_instructions.jsonl", split="train")

# Khởi tạo trainer cho SFT (supervised fine-tuning)
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
# Huấn luyện model
trainer.train()
trainer.save_model("llama3-lora-vi")  # adapter ~80 MB so với 16 GB model đầy đủ`,
        codeLanguage: "python",
        exercise: "Plan a fine-tuning project for a Vietnamese customer-support chatbot in 3 bullets: (1) base model + why, (2) one example instruction/response pair, (3) would you also use RAG and what would it retrieve?",
        exerciseEn: "",
        quiz: [
          {
            question: "Which problem is *RAG* the right tool for, but *fine-tuning* is not?",
            options: ["Making the model answer in JSON", "Up-to-date company documents that change weekly", "Adopting a friendly tone", "Reducing inference latency"],
            answer: 1,
            explanation: "Frequently changing facts belong in a vector DB, not in model weights - re-fine-tuning weekly is wasteful.",
          },
          {
            question: "Core trick of LoRA?",
            options: ["Quantises every weight to 4 bits", "Freezes the original weight matrix and learns a low-rank update `ΔW = B·A`", "Removes attention layers", "Replaces optimizer with SGD"],
            answer: 1,
            explanation: "LoRA trains two skinny low-rank matrices whose product approximates the needed weight update - 100–250× fewer parameters.",
          },
          {
            question: "What does *QLoRA* add on top of LoRA?",
            options: ["A new optimizer Q-Adam", "Loads the frozen base model in 4-bit so very large models fit on a single consumer GPU", "Encrypts model weights", "Removes the tokenizer"],
            answer: 1,
            explanation: "QLoRA quantises the base model to 4-bit (nf4) while keeping LoRA adapters in higher precision - unlocked single-GPU fine-tuning of 70B models.",
          },
        ],
      },
      {
        id: "dl-11",
        title: "Sequence Models - RNN, LSTM & GRU",
        titleEn: "Sequence Models - RNN, LSTM & GRU",
        level: 4,
        difficulty: "intermediate",
        theory: `> ⚠️ **Prerequisites** - Lessons 1–3 (neural nets, backprop).

## 1. Why a feed-forward net cannot read a sentence

A dense network treats inputs as an unordered bag. But "**dog bites man**" ≠ "**man bites dog**". We need a network whose hidden state \`h_t\` depends on the previous step:

\`\`\`
h_t = tanh(W_x · x_t + W_h · h_{t-1} + b)
\`\`\`

This is a **Recurrent Neural Network** (RNN) - the same weights are reused at every time step (parameter sharing across time).

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

## 3. LSTM - adding a memory highway

**Long Short-Term Memory** (Hochreiter & Schmidhuber, 1997) introduces a **cell state** \`C_t\` that flows through time with only linear interactions, gated by:

| Gate | Formula | Role |
|---|---|---|
| **Forget** \`f_t\` | σ(W_f·[h_{t-1}, x_t]) | What to drop from \`C\` |
| **Input** \`i_t\` | σ(W_i·…) | What new info to add |
| **Output** \`o_t\` | σ(W_o·…) | What to expose as \`h_t\` |

\`C_t = f_t · C_{t-1} + i_t · tanh(...)\` - additive update preserves gradients.

**GRU** (2014) is a streamlined LSTM with 2 gates instead of 3 - fewer params, similar accuracy.

## 4. Why we still teach RNNs in 2025

Transformers replaced RNNs for most NLP, but RNNs remain the right tool for: **streaming audio (Whisper distilled, RNN-T)**, **on-device keyword spotting** (~100 KB model), **time-series forecasting with very long horizons**, and as **building blocks of state-space models (Mamba)**.

## 5. Real-world example: predicting electricity demand

Vietnam's EVN forecasts hourly load 24 h ahead. A bidirectional LSTM ingesting the previous 168 hours + temperature + holiday flags reaches MAPE ≈ 1.8 % - enough to optimise thermal/hydro dispatch.

## ⚠️ Common Pitfalls
- **Forgetting to clip gradients** - exploding gradients silently produce NaNs.
- **Using RNN where attention wins** - for sequences > 500 with random access patterns, Transformers train 10× faster on GPU.
- **Ignoring sequence length padding** - pack sequences (\`pack_padded_sequence\`) or you waste compute on PAD tokens.

## 🛠️ Practice Task
Implement a character-level LSTM that generates Vietnamese poetry in the style of "Truyện Kiều". Train on the first 1 000 lines. Sample with temperatures 0.3, 0.7, and 1.2 - describe how outputs change.`,
        theoryEn: "",
        code: `# Dự đoán giá cổ phiếu ngày tiếp theo bằng mạng LSTM

# Nhập các thư viện cần thiết từ PyTorch.
# \`torch\` là thư viện chính cho các phép toán tensor.
# \`torch.nn\` chứa các lớp xây dựng mạng nơ-ron.
import torch, torch.nn as nn

# Định nghĩa lớp mạng nơ-ron PriceLSTM.
# Đây là một mô hình dự đoán giá sử dụng mạng LSTM.
class PriceLSTM(nn.Module):
    # Hàm khởi tạo của mô hình.
    # Được gọi khi tạo một đối tượng PriceLSTM mới.
    # Đầu vào:
    #   - n_features: Số lượng đặc trưng (features) cho mỗi ngày (mặc định là 5).
    #   - hidden: Số lượng đơn vị ẩn (hidden units) trong mỗi lớp LSTM (mặc định là 64).
    #   - layers: Số lượng lớp LSTM xếp chồng lên nhau (mặc định là 2).
    def __init__(self, n_features=5, hidden=64, layers=2):
        # Gọi hàm khởi tạo của lớp cha (nn.Module).
        super().__init__()
        # Định nghĩa lớp LSTM.
        # Đầu vào:
        #   - n_features: Kích thước đầu vào của mỗi bước thời gian.
        #   - hidden: Kích thước của trạng thái ẩn.
        #   - layers: Số lượng lớp LSTM.
        #   - batch_first=True: Dữ liệu đầu vào có dạng (batch, sequence, feature).
        #   - dropout=0.2: Tỷ lệ dropout để tránh overfitting.
        self.lstm = nn.LSTM(n_features, hidden, layers,
                            batch_first=True, dropout=0.2)
        # Định nghĩa lớp tuyến tính (fully connected layer) cuối cùng.
        # Lớp này sẽ chuyển đổi đầu ra từ LSTM (kích thước hidden) thành 1 giá trị (giá dự đoán).
        self.head = nn.Linear(hidden, 1)

    # Hàm forward định nghĩa cách dữ liệu đi qua mô hình.
    # Đầu vào:
    #   - x: Tensor dữ liệu đầu vào.
    #        Dạng mong đợi: (kích thước_batch, số_ngày, số_đặc_trưng)
    #        Ví dụ: (32, 30, 5) nghĩa là 32 chuỗi, mỗi chuỗi 30 ngày, mỗi ngày có 5 đặc trưng.
    # Đầu ra:
    #   - Giá dự đoán cho ngày tiếp theo.
    def forward(self, x):                  # x: (batch, 30 days, 5 features)
        # Truyền dữ liệu qua lớp LSTM.
        # \`out\` chứa đầu ra của LSTM cho tất cả các bước thời gian.
        # \`_\` chứa trạng thái ẩn và trạng thái ô nhớ cuối cùng (không dùng ở đây).
        out, _ = self.lstm(x)
        # Lấy đầu ra của bước thời gian cuối cùng từ LSTM (\`out[:, -1, :]\`).
        # Sau đó truyền qua lớp tuyến tính \`self.head\` để có được dự đoán cuối cùng.
        # Đầu ra: (kích thước_batch, 1)
        return self.head(out[:, -1, :])    # use last time step

# Khởi tạo một đối tượng mô hình PriceLSTM.
model = PriceLSTM()
# Khởi tạo bộ tối ưu hóa Adam.
# Bộ tối ưu hóa này sẽ điều chỉnh các tham số của mô hình để giảm lỗi.
# Đầu vào:
#   - model.parameters(): Các tham số (trọng số và bias) của mô hình cần tối ưu.
#   - lr: Tốc độ học (learning rate), kiểm soát mức độ thay đổi của các tham số.
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
# Định nghĩa hàm mất mát (loss function) là MSE (Mean Squared Error).
# Hàm này đo lường sự khác biệt giữa giá trị dự đoán và giá trị thực tế.
loss_fn = nn.MSELoss()

# --- Một bước huấn luyện (training step) mẫu ---

# Tạo dữ liệu đầu vào giả định (x) cho một batch.
# Dạng: (kích thước_batch, số_ngày, số_đặc_trưng)
# Ví dụ: 32 chuỗi, mỗi chuỗi 30 ngày, mỗi ngày có 5 đặc trưng.
x = torch.randn(32, 30, 5)                 # batch of 32 windows
# Tạo nhãn (y) giả định cho một batch.
# Đây là giá đóng cửa của ngày tiếp theo mà mô hình cần dự đoán.
# Dạng: (kích thước_batch, 1)
y = torch.randn(32, 1)                     # next-day close price

# Đưa dữ liệu đầu vào qua mô hình để nhận được dự đoán.
pred = model(x)
# Tính toán giá trị mất mát giữa dự đoán (pred) và nhãn thực tế (y).
loss = loss_fn(pred, y)
# Thực hiện lan truyền ngược (backpropagation).
# Tính toán gradient của hàm mất mát đối với tất cả các tham số của mô hình.
loss.backward()
# Cắt gradient (gradient clipping) để tránh hiện tượng "exploding gradients".
# Điều này giúp ổn định quá trình huấn luyện, đặc biệt quan trọng với RNN/LSTM.
# Giới hạn độ lớn của gradient không vượt quá 1.0.
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)  # critical!
# Cập nhật các tham số của mô hình dựa trên gradient đã tính toán.
opt.step()
# In giá trị mất mát của bước huấn luyện hiện tại.
# Kết quả mong đợi: Một số thập phân thể hiện mức độ lỗi của mô hình.
print(f"Loss: {loss.item():.4f}")`,
        codeLanguage: "python",
        exercise: "Why does an LSTM solve the vanishing gradient problem better than a vanilla RNN? Answer in 2 sentences referring to the cell state update rule.",
        exerciseEn: "",
        quiz: [
          {
            question: "Which gate decides what information leaves the cell state in an LSTM?",
            options: ["Input gate", "Forget gate", "Output gate", "Update gate"],
            answer: 1,
            explanation: "The forget gate f_t multiplies C_{t-1} element-wise - values close to 0 erase, close to 1 keep.",
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
            explanation: "Clipping caps the gradient norm - essential whenever you backprop through long sequences.",
          },
        ],
      },
      {
        id: "dl-12",
        title: "Self-Supervised Learning - Pretraining Without Labels",
        titleEn: "Self-Supervised Learning - Pretraining Without Labels",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** - Lesson 5 (Transformers) and Lesson 6 (Transfer Learning).

## 1. The labelling crisis

ImageNet has 1.2M labelled images and cost millions of dollars. The internet has **trillions** of unlabelled images and texts. **Self-Supervised Learning (SSL)** invents a pretext task from the raw data itself - no human labels.

## 2. The two dominant paradigms

\`\`\`mermaid
flowchart LR
    UN[Unlabelled data] --> A[Generative SSL<br/>Predict missing parts]
    UN --> B[Contrastive SSL<br/>Pull similar together,<br/>push different apart]
    A --> X[BERT, GPT, MAE]
    B --> Y[SimCLR, MoCo, CLIP]
\`\`\`

### A. Generative - "predict the missing token / patch"
- **BERT** - mask 15% of tokens, predict them (Masked Language Model).
- **GPT** - predict the next token (Causal LM).
- **MAE** (He et al. 2021) - mask 75% of image patches, reconstruct pixels.

### B. Contrastive - "same image, two augmentations → close embedding"
- **SimCLR** - InfoNCE loss; needs huge batch sizes (4096+).
- **MoCo** - momentum-encoded queue removes the giant-batch requirement.
- **CLIP** - contrastive across **modalities** (image ↔ caption); zero-shot ImageNet 76 %.

## 3. Why SSL changed everything

| Era | Approach | ImageNet top-1 with 1 % labels |
|---|---|---|
| 2018 | Supervised from scratch | 25 % |
| 2020 | SimCLR pretrain + linear head | 64 % |
| 2022 | DINOv2 pretrain | 80 % |

A foundation model trained once on 1 billion unlabelled images can be fine-tuned to dozens of downstream tasks - **the same idea that gave us GPT in NLP, applied to vision, audio, video, molecules**.

## 4. Real-world example: medical imaging

A Vietnamese hospital has 50 000 X-rays but only 800 are labelled by radiologists. SSL pretraining (MAE on the 50 k unlabelled X-rays) followed by fine-tuning on the 800 labels reaches the same accuracy as supervised training on 5 000 labels - saving radiologist hours.

## ⚠️ Common Pitfalls
- **Weak augmentations** - contrastive learning collapses if the two views are too similar.
- **Skipping linear probing** - always evaluate the frozen encoder with a linear head before fine-tuning.
- **Pretraining on the wrong domain** - SSL on natural images transfers poorly to satellite imagery.

## 🛠️ Practice Task
You have 5 000 unlabelled product photos and 200 labelled ones (10 categories). Design a 2-stage training plan and justify your choice of SSL method (contrastive vs MAE).`,
        theoryEn: "",
        code: `# Tiny SimCLR on CIFAR-10 (PyTorch)
# Nhập các thư viện cần thiết cho PyTorch và xử lý ảnh.
import torch, torch.nn as nn, torch.nn.functional as F
from torchvision import models, transforms

# Hai phép biến đổi ngẫu nhiên của cùng một ảnh → "cặp dương" (positive pair)
# Định nghĩa chuỗi các phép biến đổi ảnh (data augmentation) để tạo ra các view khác nhau của cùng một ảnh.
augment = transforms.Compose([
    # Cắt ngẫu nhiên và thay đổi kích thước ảnh về 32x32 pixel.
    # Đầu vào: ảnh PIL. Đầu ra: ảnh PIL.
    transforms.RandomResizedCrop(32, scale=(0.5, 1.0)),
    # Lật ảnh ngẫu nhiên theo chiều ngang.
    # Đầu vào: ảnh PIL. Đầu ra: ảnh PIL.
    transforms.RandomHorizontalFlip(),
    # Điều chỉnh độ sáng, độ tương phản, độ bão hòa và sắc độ ngẫu nhiên.
    # Đầu vào: ảnh PIL. Đầu ra: ảnh PIL.
    transforms.ColorJitter(0.4, 0.4, 0.4, 0.1),
    # Chuyển ảnh sang thang độ xám ngẫu nhiên với xác suất p=0.2.
    # Đầu vào: ảnh PIL. Đầu ra: ảnh PIL.
    transforms.RandomGrayscale(p=0.2),
    # Chuyển ảnh từ PIL Image hoặc NumPy array sang Tensor.
    # Đầu vào: ảnh PIL. Đầu ra: Tensor.
    transforms.ToTensor(),
])

# Khởi tạo mô hình backbone (ResNet-18) và bộ chiếu (projector).
# Sử dụng ResNet-18 làm backbone để trích xuất đặc trưng từ ảnh.
# weights=None nghĩa là không tải các trọng số đã được huấn luyện trước.
backbone = models.resnet18(weights=None)
# Thay thế lớp phân loại cuối cùng của ResNet-18 bằng một lớp Identity (không làm gì cả).
# Điều này loại bỏ phần phân loại để chỉ giữ lại phần trích xuất đặc trưng.
backbone.fc = nn.Identity()                       # loại bỏ lớp phân loại (classifier head)
# Định nghĩa bộ chiếu (projector) gồm hai lớp tuyến tính (Linear) và một hàm kích hoạt ReLU.
# Bộ chiếu này sẽ ánh xạ đặc trưng từ backbone sang một không gian chiều thấp hơn (128 chiều).
projector = nn.Sequential(
    # Lớp tuyến tính đầu tiên, ánh xạ từ 512 chiều (đầu ra của ResNet-18) sang 512 chiều.
    nn.Linear(512, 512), nn.ReLU(),
    # Lớp tuyến tính thứ hai, ánh xạ từ 512 chiều sang 128 chiều.
    # Đây là chiều của không gian chiếu (projection dimension).
    nn.Linear(512, 128),                          # chiều của không gian chiếu
)

# Định nghĩa hàm tính toán InfoNCE loss.
# Đầu vào: z1, z2 là các vector đặc trưng đã được chiếu và chuẩn hóa từ hai view của cùng một ảnh.
#          t là tham số nhiệt độ (temperature).
# Đầu ra: Giá trị InfoNCE loss.
def info_nce(z1, z2, t=0.5):
    # Chuẩn hóa các vector đặc trưng z1 và z2 về độ dài đơn vị (unit norm).
    # Điều này giúp tính toán độ tương đồng cosine dễ dàng hơn.
    z1 = F.normalize(z1, dim=1); z2 = F.normalize(z2, dim=1)
    # Ghép z1 và z2 lại với nhau theo chiều 0.
    # Nếu z1, z2 có kích thước (N, 128), thì z sẽ có kích thước (2N, 128).
    z = torch.cat([z1, z2], 0)                    # (2N, 128)
    # Tính ma trận độ tương đồng cosine giữa tất cả các cặp vector trong z.
    # sim[i, j] = cosine_similarity(z[i], z[j]) / t.
    sim = z @ z.T / t                             # ma trận độ tương đồng cosine
    # Lấy kích thước batch (số lượng ảnh) từ z1.
    n = z1.size(0)
    # Tạo nhãn cho hàm cross_entropy.
    # Các nhãn này chỉ ra rằng z1[i] tương ứng với z2[i] (và ngược lại).
    # Ví dụ: nếu n=2, labels sẽ là [2, 3, 0, 1].
    # z[0] (z1[0]) phải khớp với z[2] (z2[0]).
    # z[1] (z1[1]) phải khớp với z[3] (z2[1]).
    # z[2] (z2[0]) phải khớp với z[0] (z1[0]).
    # z[3] (z2[1]) phải khớp với z[1] (z1[1]).
    labels = torch.cat([torch.arange(n, 2*n), torch.arange(0, n)]).to(z.device)
    # Đặt giá trị trên đường chéo chính của ma trận độ tương đồng thành một số rất nhỏ.
    # Điều này loại bỏ việc một vector tự so sánh với chính nó, vì chúng ta chỉ quan tâm đến các cặp dương.
    sim.fill_diagonal_(-1e9)                      # che đi sự tự tương đồng (self-similarity)
    # Tính toán cross-entropy loss.
    # Đầu vào: sim (logits), labels (nhãn của các cặp dương).
    # Đầu ra: Giá trị loss.
    return F.cross_entropy(sim, labels)

# Một bước huấn luyện (giả sử dataloader cung cấp ảnh thô x)
# Tạo một batch ảnh giả định với kích thước (64, 3, 32, 32).
# Đầu vào: Không có. Đầu ra: Tensor ảnh ngẫu nhiên.
x = torch.randn(64, 3, 32, 32)
# Tạo view thứ nhất (v1) bằng cách áp dụng các phép biến đổi augment lên từng ảnh trong batch x.
# Chuyển Tensor sang PIL Image trước khi áp dụng augment.
# Đầu vào: batch ảnh x. Đầu ra: Tensor của các ảnh đã được biến đổi.
v1 = torch.stack([augment(transforms.functional.to_pil_image(img)) for img in x])
# Tạo view thứ hai (v2) tương tự như v1.
# Đầu vào: batch ảnh x. Đầu ra: Tensor của các ảnh đã được biến đổi.
v2 = torch.stack([augment(transforms.functional.to_pil_image(img)) for img in x])
# Đưa v1 và v2 qua backbone để trích xuất đặc trưng, sau đó qua projector để chiếu xuống không gian 128 chiều.
# z1, z2 là các vector đặc trưng đã được chiếu.
# Đầu vào: v1, v2 (Tensor ảnh). Đầu ra: z1, z2 (Tensor đặc trưng).
z1 = projector(backbone(v1)); z2 = projector(backbone(v2))
# Tính toán InfoNCE loss giữa z1 và z2.
# Đầu vào: z1, z2 (Tensor đặc trưng). Đầu ra: Giá trị loss.
loss = info_nce(z1, z2)
# In ra giá trị InfoNCE loss.
# Kết quả mong đợi: Một giá trị số thực cho loss.
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
            explanation: "InfoNCE relies on negative pairs from the batch - more negatives = sharper representation.",
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
        title: "Multimodal Models - Seeing, Reading & Listening Together",
        titleEn: "Multimodal Models - Seeing, Reading & Listening Together",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** - Lessons 5, 9 (GAN/Diffusion) and 12 (SSL).

## 1. Why multimodal?

Humans don't think in text alone - we combine vision, sound, language, and action. The frontier of AI in 2024-2025 (GPT-4o, Gemini 2.0, Claude 3.5 Sonnet vision, LLaVA) is **multimodal foundation models** that process and generate across modalities.

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

A frozen image encoder produces 256 patches; a frozen LLM has its own token space. **Q-Former** (Querying Transformer) is a tiny bridge - 32 learnable query vectors that distil the 256 patches into a sequence the LLM understands. Only Q-Former is trained → multimodal in days, not months.

## 4. Real-world examples

- **Medical**: MedPaLM-M reads X-rays + clinical notes to draft differential diagnoses.
- **E-commerce in Vietnam**: Tiki uses CLIP-style retrieval - users snap a photo, the model finds similar products in the catalog (text + image jointly).
- **Accessibility**: SeeingAI describes the world to blind users in real-time.
- **Customer support**: GPT-4o reads a screenshot + the user's voice complaint to triage tickets.

## ⚠️ Common Pitfalls
- **Modality dominance** - when training jointly, the easier modality (text) overwhelms the harder one (audio). Solution: balance losses.
- **Hallucinated grounding** - VLMs can describe objects that aren't in the image. Mitigation: chain-of-thought with bounding-box prompts.
- **Catastrophic forgetting** - fine-tuning a multimodal model on a single task often destroys other modalities.

## 🛠️ Practice Task
You want to build "Tutor Bot" - students upload a photo of a math problem and ask a question. Sketch the architecture (which encoder for the image, which LLM, how they connect) and the training data you would need.`,
        theoryEn: "",
        code: `# Visual Question Answering with BLIP-2 (Hugging Face)
# Nhập các thư viện cần thiết.
# Blip2Processor: Dùng để tiền xử lý ảnh và văn bản cho mô hình BLIP-2.
# Blip2ForConditionalGeneration: Là mô hình BLIP-2 chính, dùng để tạo câu trả lời.
# Image từ PIL: Dùng để xử lý ảnh.
# torch: Thư viện PyTorch để làm việc với tensor và GPU.
# requests: Dùng để tải ảnh từ URL.
from transformers import Blip2Processor, Blip2ForConditionalGeneration
from PIL import Image
import torch, requests

# Xác định thiết bị sẽ sử dụng (GPU nếu có, nếu không thì dùng CPU).
device = "cuda" if torch.cuda.is_available() else "cpu"
# Tải bộ xử lý (processor) đã được huấn luyện trước cho mô hình BLIP-2.
# Bộ xử lý này sẽ chuẩn bị dữ liệu đầu vào (ảnh và câu hỏi) theo định dạng mà mô hình mong đợi.
processor = Blip2Processor.from_pretrained("Salesforce/blip2-opt-2.7b")
# Tải mô hình BLIP-2 đã được huấn luyện trước.
# "Salesforce/blip2-opt-2.7b" là tên của mô hình trên Hugging Face.
# torch_dtype=torch.float16: Sử dụng kiểu dữ liệu float16 để tiết kiệm bộ nhớ và tăng tốc độ tính toán (nếu GPU hỗ trợ).
# .to(device): Chuyển mô hình sang thiết bị đã chọn (GPU hoặc CPU).
model = Blip2ForConditionalGeneration.from_pretrained(
    "Salesforce/blip2-opt-2.7b", torch_dtype=torch.float16
).to(device)

# Tải ảnh từ một URL.
# requests.get(...).raw: Lấy nội dung thô của ảnh.
# Image.open(...): Mở ảnh từ nội dung thô.
# .convert("RGB"): Chuyển đổi ảnh sang định dạng RGB (đảm bảo ảnh có 3 kênh màu).
img = Image.open(requests.get(
    "https://images.unsplash.com/photo-1574158622682-e40e69881006",
    stream=True).raw).convert("RGB")

# Định nghĩa danh sách các câu hỏi (prompts) mà chúng ta muốn hỏi mô hình về bức ảnh.
# Mỗi câu hỏi được định dạng theo cấu trúc "Question: ... Answer:".
prompts = [
    "Question: What animal is in the image? Answer:",
    "Question: How many of them are there? Answer:",
    "Question: What color is the background? Answer:",
]

# Lặp qua từng câu hỏi trong danh sách.
for q in prompts:
    # Tiền xử lý ảnh và câu hỏi để tạo ra đầu vào cho mô hình.
    # images=img: Ảnh đầu vào.
    # text=q: Câu hỏi đầu vào.
    # return_tensors="pt": Trả về kết quả dưới dạng tensor của PyTorch.
    # .to(device, torch.float16): Chuyển tensor đầu vào sang thiết bị và kiểu dữ liệu phù hợp với mô hình.
    inputs = processor(images=img, text=q, return_tensors="pt").to(device, torch.float16)
    # Tạo câu trả lời bằng cách gọi phương thức generate của mô hình.
    # **inputs: Truyền các tensor đầu vào (input_ids, attention_mask, pixel_values) cho mô hình.
    # max_new_tokens=20: Giới hạn độ dài tối đa của câu trả lời được tạo ra là 20 từ/token mới.
    out = model.generate(**inputs, max_new_tokens=20)
    # Giải mã (decode) kết quả đầu ra của mô hình thành chuỗi văn bản dễ đọc.
    # out[0]: Lấy tensor chứa các token đã tạo.
    # skip_special_tokens=True: Bỏ qua các token đặc biệt (như token bắt đầu/kết thúc câu) trong kết quả.
    # In ra câu hỏi và câu trả lời tương ứng.
    # Kết quả mong đợi: Mô hình sẽ trả lời các câu hỏi về con mèo trong ảnh.
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
            explanation: "Q-Former is the only trainable component - keeps multimodal training cheap.",
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
        title: "Edge AI - Quantization, Pruning & Distillation",
        titleEn: "Edge AI - Quantization, Pruning & Distillation",
        level: 4,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** - Lessons 1–6.

## 1. Why deploy on the edge?

Cloud inference costs scale linearly with users; latency depends on network; privacy-sensitive data (faces, voice, medical) shouldn't leave the device. **On-device inference** (smartphone, Raspberry Pi, microcontroller) solves all three - but a 7B-parameter model in float32 needs **28 GB**. We need to compress it 50–500×.

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

**PTQ** (Post-Training Quantization) is one shot - calibrate on 128 samples. **QAT** (Quantization-Aware Training) simulates rounding during training - better accuracy, slower.

### B. Pruning
**Magnitude pruning** drops weights with |w| below threshold; **structured pruning** drops whole channels/heads (faster on GPU). Lottery Ticket Hypothesis (Frankle 2018) shows you can keep 5 % of weights and retrain to full accuracy.

### C. Knowledge Distillation
Hinton 2015. Train a small **student** to match a big **teacher**'s soft probabilities (with temperature \`T\`). DistilBERT keeps 97 % of BERT accuracy at 40 % size, 60 % faster.

## 3. The deployment pipeline

PyTorch → **ONNX** → backend (TensorRT for NVIDIA, Core ML for iPhone, TFLite for Android, GGUF for CPU/llama.cpp). Each backend applies its own kernel fusion and quantization.

## 4. Real-world example: license plate recognition on traffic cameras

Vietnam's smart traffic cameras (Hà Nội, HCM) need to read 100 plates/sec on a $50 SoC. A YOLOv8-nano (3 MB INT8) detects the plate; a 5-layer CRNN (1 MB) reads it. Total: 4 MB, 35 ms per frame, no cloud.

## ⚠️ Common Pitfalls
- **Quantizing without calibration** - weights round fine, but **activations** clip → catastrophic accuracy loss. Always calibrate on representative data.
- **Pruning + retraining order** - pruning then retraining (iterative magnitude pruning) recovers accuracy; prune-only does not.
- **Forgetting embedding tables** - for LLMs, embeddings are 30 % of the size - quantize them too.

## 🛠️ Practice Task
You must deploy a sentiment classifier (BERT-base, 110M params) on a Raspberry Pi 4 (1 GB RAM). Pick a compression strategy and justify the order of operations.`,
        theoryEn: "",
        code: `# Lượng tử hóa 4-bit cho mô hình Llama bằng bitsandbytes (GPU đơn)
# Import các thư viện cần thiết
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import torch

# Cấu hình bitsandbytes cho lượng tử hóa 4-bit
bnb = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",          # Dạng NormalFloat-4
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,     # Lượng tử hóa các hằng số lượng tử hóa
)

# Chỉ định mô hình và tải tokenizer, mô hình với cấu hình lượng tử
model_id = "meta-llama/Llama-3.1-8B-Instruct"
tok = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id, quantization_config=bnb, device_map="auto"
)
# In kích thước bộ nhớ mô hình để tham khảo
print(f"Memory footprint: {model.get_memory_footprint() / 1e9:.2f} GB")
# Llama-3.1-8B với nf4 ≈ 5.4 GB → phù hợp với RTX 3060 12 GB

# Prompt ví dụ để yêu cầu mô tả ngắn
prompt = "Explain quantization in one sentence:"
# Sinh văn bản từ mô hình (không sampling)
out = model.generate(**tok(prompt, return_tensors="pt").to(model.device),
                     max_new_tokens=60, do_sample=False)
# Giải mã và in kết quả, loại bỏ token đặc biệt
print(tok.decode(out[0], skip_special_tokens=True))`,
        codeLanguage: "python",
        exercise: "Compare quantization vs distillation for compressing a 1B-parameter chatbot to run on a phone. Discuss accuracy, training cost, and inference latency.",
        exerciseEn: "",
        quiz: [
          {
            question: "Which quantization method usually preserves the highest accuracy?",
            options: ["PTQ INT4", "QAT INT8", "Magnitude pruning", "FP16 with no calibration"],
            answer: 1,
            explanation: "QAT simulates rounding during training so the model learns to compensate - best accuracy, more compute.",
          },
          {
            question: "Knowledge Distillation transfers from teacher to student through:",
            options: ["Hard labels only", "Teacher's soft probability distribution at temperature T", "Random label noise", "Quantized weights"],
            answer: 1,
            explanation: "Soft targets carry richer information than one-hot labels - that's the 'dark knowledge'.",
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
        title: "MLOps for Deep Learning - From Notebook to Production",
        titleEn: "MLOps for Deep Learning - From Notebook to Production",
        level: 5,
        difficulty: "advanced",
        theory: `> ⚠️ **Prerequisites** - All previous lessons. This is the capstone.

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

In 2020, COVID broke nearly every demand-forecasting model on the planet - concept drift at scale.

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
- **Train/serve skew** - different feature engineering in training vs production. Cure: a single feature store used by both.
- **Silent label leakage** - a feature available at training time but not at inference. Cure: simulate prod timing offline.
- **No rollback plan** - always serve the last 2 model versions behind a flag.

## 🛠️ Practice Task
Design the MLOps stack for a Vietnamese-language chatbot deployed on web + mobile, serving 10 000 RPS. List: serving framework, GPU type, monitoring metrics, retraining trigger, and rollback strategy.`,
        theoryEn: "",
        code: `# Minimal MLflow tracking + model registry workflow
# Nhập các thư viện cần thiết.
# mlflow: Thư viện chính để theo dõi và quản lý vòng đời ML.
# mlflow.pytorch: Module của MLflow để làm việc với mô hình PyTorch.
# torch: Thư viện PyTorch để xây dựng và huấn luyện mô hình.
# torch.nn: Module của PyTorch chứa các lớp cho mạng nơ-ron.
import mlflow, mlflow.pytorch, torch, torch.nn as nn

# Đặt địa chỉ URI của máy chủ MLflow Tracking.
# Đây là nơi MLflow sẽ gửi và lưu trữ thông tin về các lần chạy (runs).
mlflow.set_tracking_uri("http://mlflow.haiedu.local:5000")
# Đặt tên cho Experiment (thử nghiệm) hiện tại.
# Tất cả các lần chạy trong khối này sẽ được nhóm dưới Experiment "sentiment-vi".
mlflow.set_experiment("sentiment-vi")

# Bắt đầu một lần chạy MLflow mới.
# Mọi hoạt động ghi log (tham số, metrics, mô hình) trong khối 'with' này sẽ thuộc về lần chạy này.
# run_name: Tên hiển thị cho lần chạy cụ thể này.
with mlflow.start_run(run_name="distilbert-vi-v3") as run:
    # 1. Ghi lại các siêu tham số (hyperparameters) của mô hình.
    # params: Một từ điển chứa các tham số quan trọng của quá trình huấn luyện.
    params = {"lr": 2e-5, "batch_size": 32, "epochs": 3, "model": "distilbert-base-multilingual"}
    # Ghi lại các tham số này vào MLflow.
    # Đầu vào: Một từ điển các tham số.
    mlflow.log_params(params)

    # ... training loop here ...
    # Giả định đây là kết quả từ vòng lặp huấn luyện.
    # val_f1: Điểm F1 trên tập validation.
    val_f1 = 0.912
    # val_loss: Giá trị loss trên tập validation.
    val_loss = 0.187
    # Ghi lại các chỉ số (metrics) này vào MLflow.
    # Đầu vào: Một từ điển các chỉ số.
    mlflow.log_metrics({"val_f1": val_f1, "val_loss": val_loss})

    # 2. Ghi lại artifact mô hình đã huấn luyện và chữ ký của nó.
    # model: Tạo một mô hình PyTorch đơn giản làm chỗ giữ chỗ (placeholder).
    # Trong thực tế, đây sẽ là mô hình đã được huấn luyện.
    model = nn.Linear(768, 3)        # placeholder
    # Ghi lại mô hình PyTorch vào MLflow.
    # model: Đối tượng mô hình PyTorch cần ghi.
    # artifact_path: Đường dẫn lưu trữ mô hình trong thư mục artifact của lần chạy.
    # registered_model_name: Tên của mô hình trong Model Registry.
    # Nếu mô hình chưa tồn tại trong Registry, nó sẽ được tạo mới.
    mlflow.pytorch.log_model(
        model, artifact_path="model",
        registered_model_name="sentiment-vi",
    )

    # 3. Đẩy mô hình lên stage "Staging" nếu nó tốt hơn mô hình "champion" (mô hình tốt nhất hiện tại).
    # Khởi tạo một đối tượng MlflowClient để tương tác với MLflow Tracking Server và Model Registry.
    client = mlflow.tracking.MlflowClient()
    # Lấy phiên bản mô hình hiện đang ở stage "production" (champion).
    # Đầu vào: Tên mô hình đã đăng ký và alias "production".
    # Đầu ra: Đối tượng ModelVersion của mô hình champion.
    champion = client.get_model_version_by_alias("sentiment-vi", "production")
    # Lấy điểm F1 của mô hình champion từ các tag của nó.
    # Nếu không tìm thấy tag "val_f1", mặc định là 0.
    champion_f1 = float(champion.tags.get("val_f1", 0))
    # So sánh điểm F1 của mô hình hiện tại với mô hình champion.
    if val_f1 > champion_f1:
        # Nếu mô hình hiện tại tốt hơn, lấy phiên bản mới nhất của mô hình đã đăng ký.
        # stages=["None"]: Lấy các phiên bản chưa được gán stage nào.
        new_v = client.get_latest_versions("sentiment-vi", stages=["None"])[0]
        # Đặt alias "staging" cho phiên bản mô hình mới này.
        # Điều này có nghĩa là mô hình mới được đẩy lên stage "Staging".
        client.set_registered_model_alias("sentiment-vi", "staging", new_v.version)
        # In thông báo xác nhận việc đẩy lên staging.
        # Kết quả mong đợi: "✅ Promoted v[số_phiên_bản] to staging (F1 [val_f1] > [champion_f1])"
        print(f"✅ Promoted v{new_v.version} to staging (F1 {val_f1:.3f} > {champion_f1:.3f})")
    else:
        # Nếu mô hình champion vẫn tốt hơn hoặc bằng, không có sự thay đổi.
        # In thông báo không có sự thăng cấp.
        # Kết quả mong đợi: "⏭  Champion still wins, no promotion."
        print("⏭  Champion still wins, no promotion.")`,
        codeLanguage: "python",
        exercise: "You deploy a sentiment model. After 3 weeks, accuracy drops from 92 % to 78 %. List 4 diagnostic steps in order, naming the tool you would use at each step.",
        exerciseEn: "",
        quiz: [
          {
            question: "Which drift describes 'the world changed, so the relationship between X and Y changed'?",
            options: ["Data drift", "Concept drift", "Model drift", "Schema drift"],
            answer: 1,
            explanation: "P(y|x) changes - exactly what COVID did to demand forecasting models.",
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
