// Machine Learning curriculum — 12 modules with progressive difficulty
import type { ExtendedProgrammingModule } from "./types";

export const mlModules: ExtendedProgrammingModule[] = [
  {
    id: "ml-linear-reg",
    title: "Linear Regression",
    titleEn: "Linear Regression",
    icon: "📈",
    color: "from-teal-500 to-cyan-600",
    description: "Hồi quy tuyến tính, MSE, Gradient Descent",
    descriptionEn: "Linear regression, MSE, Gradient Descent",
    course: "ml",
    lessons: [
      {
        id: "ml-lr-1", title: "Simple Linear Regression", titleEn: "Simple Linear Regression",
        level: 1, difficulty: "beginner",
        theory: `## 1. Vấn đề đời thường

Bạn có 1 bảng dữ liệu: **diện tích nhà → giá bán** của 100 căn ở Hà Nội. Sếp hỏi: "Một căn 80 m² ước giá bao nhiêu?".

Cách thô sơ: lấy giá trung bình. Nhưng ta thấy rõ: **nhà to thì giá cao**. Vậy phải có một "công thức" liên hệ diện tích với giá. Linear Regression là cách đơn giản nhất để **vẽ một đường thẳng đi gần nhất qua tất cả các điểm dữ liệu** — rồi dùng đường đó để dự đoán giá cho mọi căn mới.

:::diagram type="linear-regression":::

> Linear Regression là thuật toán Machine Learning **đơn giản nhất, hữu dụng nhất**, và **luôn nên thử đầu tiên** trước khi nghĩ tới mô hình phức tạp.

## 2. Công thức tối thiểu — đọc 1 lần là nhớ

Với 1 đặc trưng (feature) duy nhất:

\`\`\`
y = w·x + b
\`\`\`

| Ký hiệu | Là gì? | Ví dụ giá nhà |
|---|---|---|
| **x** | đặc trưng đầu vào (input feature) | diện tích (m²) |
| **y** | giá trị cần dự đoán (target) | giá nhà (triệu VND) |
| **w** | hệ số góc (slope/weight) — *x tăng 1 đơn vị thì y tăng bao nhiêu?* | giá tăng theo m² (vd: 50 triệu/m²) |
| **b** | giao điểm với trục y (intercept/bias) — *khi x=0 thì y bằng bao nhiêu?* | giá "nền" |

**Đọc nghĩa**: nếu học được \`y = 50·x + 200\`, một căn 80 m² sẽ có giá ≈ 50·80 + 200 = **4,200 triệu**.

Khi có **nhiều đặc trưng** (diện tích + số phòng + vị trí…), công thức mở rộng: \`y = w₁·x₁ + w₂·x₂ + ... + b\`.

## 3. Làm sao biết "đường nào tốt nhất"? — MSE

Mỗi đường thẳng cho 1 dự đoán \`ŷ\` (đọc là "y mũ"). So với giá thật \`y\`, ta có **sai số** \`(y - ŷ)\`. Đo độ tốt của đường = trung bình bình phương sai số:

\`\`\`
MSE = (1/n) · Σ (y - ŷ)²
\`\`\`

Vì sao **bình phương**? Để (a) sai số dương và âm không triệt tiêu nhau, (b) **phạt nặng** sai lớn (sai 10 → đóng góp 100, sai 1 → chỉ 1).

Mục tiêu training = **tìm w và b sao cho MSE nhỏ nhất**.

> RMSE (= √MSE) thường được báo cáo thay MSE vì cùng đơn vị với y, dễ giải thích hơn ("sai trung bình ±200 triệu").

## 4. Cách máy "học" w và b — Gradient Descent (đi xuống dốc)

Hãy hình dung MSE là một **thung lũng hình chén**, w và b là toạ độ. Mục tiêu: đi tới **đáy thung lũng** (MSE thấp nhất).

**Thuật toán** (nhẹ nhàng, không công thức):
1. Bắt đầu từ một điểm bất kỳ (vd: w=0, b=0).
2. Tính độ dốc (gradient) tại điểm đó — cho biết đi hướng nào để xuống nhanh nhất.
3. Bước 1 bước nhỏ theo hướng đó. Độ dài bước gọi là **learning rate** (vd: 0.01).
4. Lặp lại 100–10,000 lần. Sau mỗi lần, MSE giảm dần.

**Mẹo về learning rate**:
- Quá lớn → nhảy qua đáy thung lũng, MSE tăng → mô hình "bùng nổ".
- Quá nhỏ → bò chậm như rùa.
- Bắt đầu từ 0.01 hoặc 0.001 là an toàn.

## 5. Đo độ tốt mô hình — R² (R bình phương)

R² trả lời câu hỏi: "Mô hình giải thích được bao nhiêu **biến thiên** trong dữ liệu?"

| R² | Ý nghĩa |
|---|---|
| 1.0 | Hoàn hảo (đáng nghi! thường là **overfitting**) |
| 0.7 – 0.9 | Tốt cho hầu hết bài toán thực tế |
| 0.0 | Mô hình tệ ngang predict luôn giá trung bình |
| < 0 | Mô hình **tệ hơn** cả predict trung bình → có lỗi |

> **Lưu ý**: R² **luôn tăng** khi thêm feature, kể cả feature vô nghĩa. Khi so 2 mô hình có số feature khác nhau, dùng **Adjusted R²** (R² hiệu chỉnh) — nó "phạt" feature thừa.

## 6. Khi nào nên / không nên dùng?

✅ **Nên dùng** khi:
- Cần một **baseline** (mức cơ sở) trước khi thử mô hình phức tạp — quy tắc số 1 của Google ML team.
- Quan hệ giữa x và y **gần tuyến tính** (vẽ scatter plot ra thấy điểm xếp gần đường thẳng).
- Cần **giải thích được** (interpretability) — vì coefficient \`w\` có nghĩa rõ ràng cho luật sư, bác sĩ, nhà quản lý.
- Cần inference **siêu nhanh** (<1 ms) — Logistic Regression của PayPal xử lý 4 tỷ giao dịch/quý.

❌ **Không nên dùng** khi:
- Quan hệ rõ phi tuyến (ảnh, văn bản thô, âm thanh) → R² < 0.3.
- Có nhiều **interaction** phức tạp giữa các feature → cần Random Forest / XGBoost.

## 7. Lỗi thường gặp (đắt tiền)

- ❌ **Tin R² cao = mô hình tốt** — phải kiểm tra trên **dữ liệu test** chưa thấy.
- ❌ **Quên scale feature** khi dùng Ridge/Lasso — feature lớn (lương VND ~10⁷) sẽ át feature nhỏ (số con ~1).
- ❌ **Multicollinearity** (2 feature tương quan cao, vd: diện tích m² và diện tích ft²) → coefficient vô nghĩa, dấu thậm chí đảo ngược. Kiểm tra bằng **VIF**, VIF > 10 là cảnh báo.
- ❌ **Dùng Linear cho dữ liệu phi tuyến rõ ràng** → lãng phí thời gian, hãy plot scatter trước.
- ❌ **Không log-transform target** khi target lệch (giá nhà, doanh thu) → R² có thể cải thiện 10–20% sau log.

## 8. Ridge & Lasso — chống overfitting

Khi có nhiều feature mà dữ liệu ít, mô hình dễ "thuộc lòng" training data (overfitting). Giải pháp: thêm hình phạt vào loss để ép w nhỏ lại.

| Tên | Hình phạt | Đặc điểm |
|---|---|---|
| **Ridge (L2)** | λ·Σw² | Ép tất cả w nhỏ dần, không về 0. Tốt khi nhiều feature đều đóng góp nhẹ. |
| **Lasso (L1)** | λ·Σ\\|w\\| | Có thể ép w về **đúng 0** → tự động chọn feature. Tốt khi chỉ vài feature thực sự quan trọng. |
| **Elastic Net** | Cả 2 | Cân bằng — best of both worlds. |

Tham số λ (lambda) điều chỉnh "mạnh tay phạt" hay không. Tune bằng cross-validation.

## 9. Ghi chú nâng cao (case study + công thức chuẩn)

**Zillow Zestimate (2006–2021)**: Linear Regression định giá 100 triệu căn nhà ở Mỹ với median error 5–7%. Năm 2021 Zillow Offers (mua nhà thật theo dự đoán) lỗ **$304 triệu** vì mô hình tuyến tính không bắt kịp biến động hậu COVID. **Bài học**: LR tốt cho **dự báo**, không tốt cho **quyết định mua/bán giá trị cao** trong thị trường biến động.

**Netflix Prize ($1M, 2009)**: đội thắng dùng **Ridge Regression** + Matrix Factorization. L2 giúp xử lý multicollinearity giữa 100 triệu rating, RMSE giảm 10.06% — đủ thắng giải. Minh chứng: Linear models vẫn cạnh tranh được với Deep Learning khi feature đã engineered tốt.

**Công thức chính xác cho người muốn đào sâu**:
- Dạng matrix: \`y = Xw + b\`
- Closed-form (Normal Equation): \`w = (XᵀX)⁻¹Xᵀy\` — chính xác tuyệt đối nhưng O(n³), chỉ dùng cho dataset nhỏ.
- Gradient: \`∂MSE/∂w = -(2/n)·Σ(y-ŷ)·x\`, \`∂MSE/∂b = -(2/n)·Σ(y-ŷ)\`.
- Variants Gradient Descent: **Batch** (toàn bộ data, mượt nhưng chậm), **SGD** (1 sample, nhanh nhưng nhiễu), **Mini-Batch** (32–256 samples, **chuẩn industry**).

**Giả định LR (assumptions)** — vi phạm = coefficient không đáng tin: (1) Linearity, (2) Independence, (3) Homoscedasticity (residual đều), (4) Normality of residuals, (5) No multicollinearity.

## 10. Liên hệ bài tiếp theo

Linear Regression dự đoán **số liên tục** (giá nhà, doanh thu). Nhưng nếu output là **phân loại** (spam/không spam, mua/không mua)? Đường thẳng có thể cho ŷ = -50 hoặc +200, không phải xác suất [0, 1]. Bài tiếp **Logistic Regression** giải vấn đề bằng hàm **sigmoid** — nén kết quả về khoảng [0, 1] để đọc như xác suất.`,
        theoryEn: `**Linear Regression — Predicting Continuous Values**

**Model:** y = wx + b (simple) or y = w₁x₁ + w₂x₂ + ... + b (multiple). Geometrically: line, plane, or hyperplane.

**Loss:** MSE = (1/n)Σ(y-ŷ)². Penalizes large errors heavily. RMSE is more interpretable (same units as y).

**Training:** Closed-form/Normal Equation (exact but O(n³)) or Gradient Descent (iterative, scalable). Variants: Batch, SGD, Mini-Batch.

**Learning Rate:** Too large → diverge. Too small → slow. Start with 0.01.

**Metrics:** MSE, RMSE, MAE, R² (0-1, % variance explained), Adjusted R² (penalizes extra features).

**Assumptions:** Linearity, independence, homoscedasticity, normality of residuals, no multicollinearity.

**Regularization:** Ridge (L2, shrinks all weights), Lasso (L1, zeros out unimportant weights), Elastic Net (both).

**Use when:** Quick baseline, linear relationships, interpretability needed.`,
        code: "import numpy as np\n\n# Generate sample data\nnp.random.seed(42)\nX = np.random.rand(50) * 10\ny = 2.5 * X + 3 + np.random.randn(50) * 2\n\n# Train linear regression from scratch\ndef linear_regression(X, y):\n    n = len(X)\n    x_mean, y_mean = X.mean(), y.mean()\n    w = np.sum((X - x_mean) * (y - y_mean)) / np.sum((X - x_mean) ** 2)\n    b = y_mean - w * x_mean\n    return w, b\n\nw, b = linear_regression(X, y)\nprint(f'Learned: y = {w:.2f}x + {b:.2f}')\nprint(f'True:    y = 2.50x + 3.00')\n\n# Predictions\ny_pred = w * X + b\nmse = np.mean((y - y_pred) ** 2)\nr2 = 1 - np.sum((y - y_pred)**2) / np.sum((y - y.mean())**2)\nprint(f'\\nMSE: {mse:.4f}')\nprint(f'R2 Score: {r2:.4f}')",
        codeLanguage: "python",
        exercise: "Implement gradient descent for linear regression. Compare with closed-form solution.",
        exerciseEn: "Implement gradient descent for linear regression. Compare with closed-form solution.",
        quiz: [
          { question: "What does R² = 1 mean?", options: ["Bad model", "Model predicts perfectly", "Overfitting", "Not enough data"], answer: 1, explanation: "R² = 1 means the model explains 100% of the variance in the data — perfect predictions." },
          { question: "What does MSE penalize more than MAE?", options: ["Small errors", "Large errors (due to squaring)", "Positive errors", "Negative errors"], answer: 1, explanation: "MSE squares errors, so a single large error (e.g., 10²=100) contributes much more than many small errors (e.g., 1²=1)." },
          { question: "What is multicollinearity?", options: ["Multiple target variables", "High correlation between input features, causing unreliable coefficients", "Multiple models", "Multiple datasets"], answer: 1, explanation: "When features are highly correlated, the model can't distinguish their individual effects, making coefficients unstable and uninterpretable." },
          { question: "When is the Normal Equation preferred over Gradient Descent?", options: ["Always", "For small datasets where matrix inversion is feasible", "For very large datasets", "Never"], answer: 1, explanation: "The Normal Equation gives an exact solution without iteration, but requires matrix inversion (O(n³)), making it impractical for large datasets." },
          { question: "What does the weight (w) in y = wx + b represent?", options: ["The error", "How much y changes per unit increase in x", "The prediction", "The learning rate"], answer: 1, explanation: "The weight (slope) tells you: for every 1-unit increase in x, y increases by w units. It quantifies the linear relationship." },
          { question: "What is the purpose of Lasso (L1) regularization?", options: ["Speed up training", "Shrink unimportant feature weights to exactly zero for automatic feature selection", "Increase model complexity", "Handle missing values"], answer: 1, explanation: "Lasso adds |w| penalty to the loss, which can drive small weights to exactly zero — effectively removing those features from the model." },
          { question: "What does Adjusted R² do differently from regular R²?", options: ["Nothing different", "Penalizes adding useless features that don't improve the model", "Always gives a higher score", "Only works for simple regression"], answer: 1, explanation: "Regular R² always increases (or stays the same) when adding features, even random ones. Adjusted R² penalizes unnecessary features, giving a more honest assessment." },
          { question: "🏢 Knowledge Check: Why did Zillow Offers (Zestimate) fail with a $304M loss in 2021?", options: ["Used too many features", "The linear regression model couldn't adapt to the post-COVID market shift; training data didn't reflect real-time market dynamics (concept drift)", "Servers were too slow", "Competitors outperformed them"], answer: 1, explanation: "Zestimate was trained on stable historical data, but the post-COVID housing market was extremely volatile (concept drift). The model lacked a real-time retraining mechanism, leading to overpaying for homes that couldn't be resold." },
          { question: "🏢 Knowledge Check: Netflix Prize ($1M, 2009) — which key Linear Regression technique did the winning team use?", options: ["A single deep neural network", "Ensemble + Ridge regression (L2) to combine 100+ models, preventing overfitting on 100M ratings", "K-means clustering", "Single decision tree"], answer: 1, explanation: "Team BellKor's Pragmatic Chaos blended hundreds of models using Ridge regression. L2 regularization handled multicollinearity between base models, achieving a 10.06% RMSE improvement." },
          { question: "🏢 Knowledge Check: In production at Uber/Lyft, why is Linear Regression still preferred for Surge Pricing despite more complex models?", options: ["Highest accuracy", "Interpretability (explainable to regulators), low latency (<10ms), and easy debugging when anomalies occur", "Cheaper", "Developers don't know other models"], answer: 1, explanation: "Surge pricing must be explainable to regulators (prices rise because demand exceeds supply). Linear coefficients allow direct auditing. Latency must be <10ms for real-time price updates. The trade-off favors explainability + speed over accuracy." }
        ]
      }
    ]
  },
  {
    id: "ml-logistic-reg",
    title: "Logistic Regression",
    titleEn: "Logistic Regression",
    icon: "🎯",
    color: "from-teal-500 to-cyan-600",
    description: "Phân loại nhị phân, Sigmoid, Decision Boundary",
    descriptionEn: "Binary classification, Sigmoid, Decision Boundary",
    course: "ml",
    lessons: [
      {
        id: "ml-log-1", title: "Binary Classification", titleEn: "Binary Classification",
        level: 2, difficulty: "beginner",
        theory: `## 1. Vấn đề đời thường

Bạn nhận 1 email. Câu hỏi: **đây là spam hay không?** Đây là bài toán **phân loại nhị phân** (binary classification): output chỉ có 2 giá trị — 1 (spam) hoặc 0 (không spam).

Linear Regression không dùng được: nó cho ra số bất kỳ (vd: -50 hoặc +200), không phải xác suất "khả năng là spam = 87%". Cần một cách **nén kết quả về khoảng [0, 1]** để đọc như xác suất. Đó là việc của **Logistic Regression**.

> **Bẫy ngôn ngữ**: tên có chữ "Regression" nhưng đây là thuật toán **phân loại**, không phải hồi quy. Tên gọi đến từ "logistic function" — hàm nén giá trị về [0, 1].

## 2. Cú pháp tối thiểu — sigmoid là chìa khóa

\`\`\`
P(y=1 | x) = σ(w·x + b)
\`\`\`

trong đó **sigmoid** là hàm hình chữ S:

\`\`\`
σ(z) = 1 / (1 + e⁻ᶻ)
\`\`\`

**Đặc tính sigmoid** (hình dung như "công tắc mềm"):

| Đầu vào z | σ(z) | Ý nghĩa |
|---|---|---|
| z = 0 | 0.5 | "50/50, không chắc" |
| z = +∞ | → 1 | "Chắc chắn là class 1" |
| z = -∞ | → 0 | "Chắc chắn là class 0" |

**Quy tắc quyết định**: Nếu P(y=1) ≥ 0.5 → predict class 1, ngược lại class 0.

## 3. 3 bước hoạt động — ví dụ email spam

Giả sử ta có 2 feature đơn giản: x₁ = số từ "free" trong email, x₂ = số dấu "!".

**Bước 1**: tính \`z = w₁·x₁ + w₂·x₂ + b\` — vd: \`z = 1.5·5 + 0.8·10 - 3 = 12.5\`.
**Bước 2**: nén qua sigmoid: \`σ(12.5) ≈ 0.9999\` → P(spam) = 99.99%.
**Bước 3**: 0.9999 ≥ 0.5 → **kết luận: SPAM**.

Mỗi w nói lên: "feature này quan trọng đến đâu trong việc xác định class". w lớn dương → đẩy mạnh về class 1. w lớn âm → đẩy về class 0.

## 4. Loss function — Binary Cross-Entropy (BCE)

Sai số được đo bằng **cross-entropy** (entropy chéo) — phạt rất nặng khi mô hình **tự tin sai**.

\`\`\`
L = -(1/n) · Σ [y·log(ŷ) + (1-y)·log(1-ŷ)]
\`\`\`

**Trực giác**:
- y=1 (thật là spam), ŷ ≈ 1 (predict đúng, tự tin) → loss ≈ 0 ✅
- y=1 nhưng ŷ ≈ 0 (predict sai, tự tin) → loss → ∞ ❌ (phạt nặng)
- y=0 (không spam), ŷ ≈ 0 → loss ≈ 0 ✅
- y=0 nhưng ŷ ≈ 1 → loss → ∞ ❌

> **Vì sao không dùng MSE?** MSE + sigmoid tạo **bề mặt loss lồi lõm** (non-convex) → gradient descent dễ kẹt ở local minimum. BCE + sigmoid tạo bề mặt **lồi hoàn hảo** (convex) → đảm bảo tìm được global minimum.

## 5. Đo độ tốt — không chỉ Accuracy!

Accuracy (tỉ lệ đúng) **không đủ**, đặc biệt khi class lệch (vd: chỉ 1% là spam, predict luôn "không spam" cho accuracy = 99% nhưng vô dụng).

**Confusion Matrix** (ma trận nhầm lẫn):

\`\`\`
                   PREDICT
                   Spam    Không spam
THẬT  Spam         TP       FN  ← bỏ sót spam
      Không spam   FP       TN  ← cảnh báo nhầm
\`\`\`

**4 metric chính**:

| Tên | Công thức | Trả lời câu hỏi |
|---|---|---|
| **Accuracy** | (TP+TN)/Tổng | "Tỉ lệ đúng tổng" — chỉ dùng khi class cân |
| **Precision** | TP/(TP+FP) | "Khi predict 'spam', có bao nhiêu % thật là spam?" |
| **Recall** | TP/(TP+FN) | "Trong tất cả spam thật, bắt được bao nhiêu %?" |
| **F1** | 2·P·R/(P+R) | "Cân bằng cả Precision và Recall" |

**Khi nào ưu tiên gì?**

| Bài toán | Ưu tiên | Vì sao |
|---|---|---|
| Lọc spam | **Precision** cao | Chặn nhầm email khách hàng = mất khách |
| Phát hiện ung thư | **Recall** cao | Bỏ sót 1 ca = mất mạng |
| Phát hiện gian lận thẻ | **F1** | Cả 2 sai đều tốn |

**AUC-ROC**: 1 con số (0–1) đánh giá mô hình ở **mọi ngưỡng**, không phụ thuộc threshold 0.5. AUC = 1 hoàn hảo, AUC = 0.5 ngẫu nhiên.

## 6. Threshold tuning — không phải lúc nào cũng 0.5

Mặc định predict class 1 khi P ≥ 0.5. Nhưng có thể chỉnh:

- **Threshold cao (0.8)**: chỉ chắc chắn 80% mới predict spam → ít FP, nhiều FN. Tốt cho lọc spam.
- **Threshold thấp (0.3)**: nghi ngờ chút là cảnh báo → nhiều FP, ít FN. Tốt cho phát hiện ung thư.

Vẽ **Precision-Recall Curve** ở các threshold khác nhau → chọn điểm phù hợp với business.

## 7. Lỗi thường gặp (đắt tiền)

- ❌ **Dùng accuracy với data lệch** — 99% accuracy có thể là vô dụng.
- ❌ **Quên cân bằng class** — khi 99% âm và 1% dương, mô hình lười predict luôn 0. Giải pháp: \`class_weight='balanced'\`, **SMOTE** (sinh sample tổng hợp), hoặc giảm threshold.
- ❌ **Quên One-Hot encoding** cho categorical (vd: tỉnh thành) — mã số 1, 2, 3 sẽ bị hiểu nhầm có thứ tự.
- ❌ **Bỏ qua calibration** — sigmoid output không phải xác suất thực nếu không calibrated. Dùng **Platt Scaling** hoặc **Isotonic Regression**.
- ❌ **Dùng cho boundary phi tuyến rõ ràng** (XOR problem) → accuracy thấp. Phải chuyển sang Decision Tree, Random Forest, hoặc Neural Network.

## 8. Multi-class (nhiều hơn 2 lớp)

Cần phân loại 10 chữ số thay vì 2 class? Có 3 cách:

1. **One-vs-Rest (OvR)**: train 10 classifier, mỗi cái phân "chữ số i vs phần còn lại". Đơn giản, phổ biến.
2. **One-vs-One (OvO)**: train K(K-1)/2 classifier cho mỗi cặp. Nhiều hơn nhưng từng cái nhỏ.
3. **Softmax Regression** (multinomial): mở rộng trực tiếp với hàm softmax → output là vector xác suất cộng = 1.

**Sigmoid vs Softmax**:
- **Sigmoid**: mỗi class độc lập, có thể cộng > 1. Dùng cho **multi-label** (1 ảnh có cả "mèo" và "ngoài trời").
- **Softmax**: cộng = 1 chính xác. Dùng cho **multi-class loại trừ** (1 ảnh chỉ là 1 chữ số duy nhất).

## 9. Ghi chú nâng cao (case study + so sánh)

**PayPal Fraud Detection**: xử lý **>4 tỷ giao dịch/quý** với Logistic Regression. Lý do chọn LogReg thay vì Deep Learning:
- Latency phải <50 ms → LogReg chỉ là 1 phép nhân ma trận.
- **Interpretability** cho compliance (luật EU PSD2 yêu cầu giải thích vì sao block).
- Retrain mỗi giờ với data mới — LogReg đào tạo cực nhanh.
- Modern hybrid: LogReg lọc thô (high recall), giao dịch nghi ngờ chuyển sang XGBoost (high accuracy).

**Stanford Pima Indians Diabetes (768 mẫu, 8 feature)**: LogReg đạt accuracy 77%, AUC 0.83. Coefficient có thể giải thích cho bệnh nhân:
- Glucose +1 mg/dL → odds tiểu đường tăng 3.5%.
- BMI +1 → odds tăng 9.4%.
- Mỗi lần mang thai → odds tăng 12.7%.

Đây là lý do **LogReg vẫn dominant trong y khoa, credit scoring, hệ thống tư pháp** — XGBoost không thể giải thích từng yếu tố cho bệnh nhân.

**So sánh nhanh**:

| Tiêu chí | LogReg | Random Forest | Neural Network |
|---|---|---|---|
| Inference speed | <1 ms | ~10 ms | 10–100 ms |
| Interpretability | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐ |
| Cần feature engineering | Cao | Thấp | Rất thấp |
| Hiệu quả với data <10K | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Production trong ngành regulated | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

## 10. Liên hệ bài tiếp theo

Logistic Regression chỉ vẽ được **đường thẳng** phân tách (linear decision boundary). Khi pattern phức tạp (vd: bài toán XOR — 2 class xếp xen kẽ), đường thẳng không tách được. Bài tiếp **Decision Trees** học các luật **if/else** linh hoạt → capture được boundary phi tuyến, không cần feature engineering nặng.`,
        theoryEn: `**Logistic Regression — Binary Classification**

**Model:** P(y=1) = sigmoid(wx + b). Output is probability [0,1]. Decision boundary is linear.

**Sigmoid:** Maps ℝ → [0,1]. σ(0)=0.5, σ(+∞)→1, σ(-∞)→0. Derivative = σ(z)(1-σ(z)).

**Loss:** Binary Cross-Entropy. Heavily penalizes confident wrong predictions. Convex (unlike MSE with sigmoid).

**Metrics:** Accuracy (balanced), Precision (FP costly), Recall (FN costly), F1 (imbalanced), AUC (threshold-independent).

**Threshold:** Default 0.5; tune based on FP vs FN costs. Use PR curve or ROC curve.

**Imbalanced classes:** Class weights, SMOTE, undersampling, threshold adjustment.

**Multi-class:** One-vs-Rest, One-vs-One, or Softmax Regression (probabilities sum to 1).`,
        code: "import numpy as np\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-np.clip(z, -500, 500)))\n\nclass LogisticRegression:\n    def __init__(self, lr=0.1, epochs=1000):\n        self.lr = lr\n        self.epochs = epochs\n\n    def fit(self, X, y):\n        self.w = np.zeros(X.shape[1])\n        self.b = 0\n        for epoch in range(self.epochs):\n            z = X @ self.w + self.b\n            pred = sigmoid(z)\n            dw = (X.T @ (pred - y)) / len(y)\n            db = np.mean(pred - y)\n            self.w -= self.lr * dw\n            self.b -= self.lr * db\n            if epoch % 200 == 0:\n                loss = -np.mean(y*np.log(pred+1e-7) + (1-y)*np.log(1-pred+1e-7))\n                print(f'  Epoch {epoch}: loss = {loss:.4f}')\n\n    def predict(self, X):\n        return (sigmoid(X @ self.w + self.b) >= 0.5).astype(int)\n\n# Sample data\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = ((X[:, 0] + X[:, 1]) > 0).astype(int)\n\nmodel = LogisticRegression(lr=0.5, epochs=1000)\nprint('Training Logistic Regression:')\nmodel.fit(X, y)\n\npreds = model.predict(X)\nacc = np.mean(preds == y)\nprint(f'\\nAccuracy: {acc:.2%}')\nprint(f'Weights: {model.w.round(3)}, Bias: {model.b:.3f}')",
        codeLanguage: "python",
        exercise: "Add Precision, Recall, F1-Score and Confusion Matrix calculation to the model above.",
        exerciseEn: "Add Precision, Recall, F1-Score and Confusion Matrix calculation to the model above.",
        quiz: [
          { question: "What does high Precision mean?", options: ["Few false negatives", "Few false positives in positive predictions", "High accuracy", "Low loss"], answer: 1, explanation: "Precision = TP/(TP+FP). High precision means when the model predicts positive, it's usually correct." },
          { question: "When is Recall more important than Precision?", options: ["When false positives are dangerous", "When missing positive cases is very dangerous (e.g., cancer diagnosis)", "Always", "When data is balanced"], answer: 1, explanation: "Recall is crucial when false negatives are costly — missing a cancer diagnosis (FN) is far worse than a false alarm (FP)." },
          { question: "Why can't we use MSE for classification?", options: ["MSE is always worse", "MSE creates a non-convex loss surface with local minima", "MSE doesn't work with probabilities", "We can, it's just convention"], answer: 1, explanation: "MSE with sigmoid creates a non-convex loss surface, making gradient descent likely to get stuck in local minima. Cross-entropy is convex and better suited." },
          { question: "What is the decision boundary in Logistic Regression?", options: ["Where loss = 0", "The surface where P(y=1) = 0.5 (wx + b = 0)", "The maximum probability", "The training data boundary"], answer: 1, explanation: "The decision boundary is where the model is equally uncertain — P(y=1) = 0.5, which occurs when wx + b = 0." },
          { question: "What does AUC-ROC measure?", options: ["Training speed", "The model's ability to distinguish classes across all thresholds", "The loss value", "The number of parameters"], answer: 1, explanation: "AUC-ROC measures how well the model separates positive and negative classes across all possible thresholds. AUC=1 is perfect, AUC=0.5 is random." },
          { question: "What is the difference between Sigmoid and Softmax?", options: ["They're the same", "Sigmoid outputs independent probabilities; Softmax outputs probabilities that sum to 1", "Softmax is faster", "Sigmoid handles multiple classes"], answer: 1, explanation: "Sigmoid treats each class independently (good for multi-label). Softmax enforces probabilities summing to 1 (good for multi-class with mutually exclusive classes)." },
          { question: "How should you handle a dataset with 99% negative and 1% positive samples?", options: ["Use accuracy as metric", "Use class weights, SMOTE, or threshold adjustment to handle the imbalance", "Remove negative samples until balanced", "Ignore the imbalance"], answer: 1, explanation: "Imbalanced data needs special handling: class weighting, oversampling (SMOTE), or threshold tuning. Accuracy is misleading here (99% accuracy by always predicting negative)." },
          { question: "🏢 Knowledge Check: Why do PayPal/Stripe still use Logistic Regression as a first-stage fraud detection filter despite having deep learning?", options: ["Complex models don't work", "Because of <5ms latency for 99% of legitimate transactions, then suspicious cases are passed to a more complex XGBoost model", "Cheap", "Legacy developers"], answer: 1, explanation: "Hybrid architecture: LogReg quickly filters millions of transactions/second (high recall, low threshold), and only ~1% of suspicious cases are escalated to deep learning. This saves 95% of inference cost while meeting SLAs." },
          { question: "🏢 Knowledge Check: Why was the COMPAS recidivism algorithm (ProPublica 2016) criticized in relation to Logistic Regression?", options: ["Too slow", "Black defendants had a False Positive Rate 2x that of white defendants — bias in training data produced unfair predictions", "Accuracy too low", "Couldn't scale"], answer: 1, explanation: "Although COMPAS achieved ~65% overall accuracy, error distribution was unfair across racial groups. This is a classic illustration of the 'fairness vs accuracy trade-off' in ML — good calibration does not guarantee fairness." },
          { question: "🏢 Knowledge Check: In medicine, why does cancer diagnosis prioritize Recall over Precision despite producing many False Positives?", options: ["To save cost", "Because missing a cancer case (FN) can be fatal, while a FP only leads to an extra biopsy — cost of FN >> FP", "Because models are easier to train", "Because the law requires it"], answer: 1, explanation: "Asymmetric cost matrix: FN = a lost life (priceless), FP = an extra biopsy (a few thousand USD). Thresholds are lowered to achieve ~99% recall, accepting lower precision. This is a core principle of medical AI." }
        ]
      }
    ]
  },
  {
    id: "ml-decision-tree",
    title: "Decision Trees",
    titleEn: "Decision Trees",
    icon: "🌳",
    color: "from-teal-500 to-cyan-600",
    description: "Gini, Entropy, pruning, visualization",
    descriptionEn: "Gini, Entropy, pruning, visualization",
    course: "ml",
    lessons: [
      {
        id: "ml-dt-1", title: "Decision Tree Classifier", titleEn: "Decision Tree Classifier",
        level: 2, difficulty: "intermediate",
        theory: `## 1. 🚦 Vấn đề đời thường

Trò chơi **20 câu hỏi**: thầy nghĩ 1 con vật, các bạn hỏi câu yes/no — "có 4 chân không?", "có lông không?", "ăn thịt không?". Mỗi câu giúp loại bớt khả năng. Sau 5-10 câu là đoán ra.

**Decision Tree** chính là vậy: hỏi từng feature theo thứ tự "quan trọng nhất trước", chia data thành nhánh, tới khi mỗi lá đủ "thuần" (cùng nhãn).

## 2. 💡 Khái niệm chính

- **Node**: 1 câu hỏi (vd: "tuổi > 30?").
- **Branch**: trả lời yes/no.
- **Leaf**: dự đoán cuối.
- **Gini / Entropy**: đo độ "loạn" — chọn split giảm loạn nhiều nhất.
- **max_depth**: giới hạn độ sâu để tránh overfit.

## 3. 🧰 Thuật toán

1. Tại mỗi node, thử mọi feature × ngưỡng.
2. Tính Gini/Entropy giảm sau split.
3. Chọn split tốt nhất → tách 2 nhánh.
4. Lặp tới khi: depth = max, samples < min_samples_split, hoặc lá thuần.

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`python
from sklearn.tree import DecisionTreeClassifier, plot_tree
import matplotlib.pyplot as plt

# Dự đoán "khách hàng có mua iPhone 16 Pro không?"
clf = DecisionTreeClassifier(
    max_depth=4,
    min_samples_leaf=20,
    criterion="gini",
    random_state=42
)
clf.fit(X_train, y_train)
print("Test acc:", clf.score(X_test, y_test))

plt.figure(figsize=(14,8))
plot_tree(clf, feature_names=feat_names, class_names=["Không","Mua"], filled=True)
plt.show()
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Không giới hạn depth** → cây học thuộc data (overfit nặng), test thảm hoạ.
> - **Imbalanced data** (95% nhãn 0): cây dự đoán toàn 0 vẫn 95% accuracy → dùng \`class_weight="balanced"\`.
> - **High-cardinality categorical** (zip code): cây thiên lệch chọn cột đó.
> - **Nhỏ vài sample đổi → cây khác hoàn toàn**: không ổn định → dùng Random Forest.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - **max_depth = 3-7** cho hầu hết bài; lớn hơn là dấu hiệu phải dùng ensemble.
> - **min_samples_leaf ≥ 1% data** để node có ý nghĩa thống kê.
> - Dùng **feature_importances_** xem cây quan tâm cột nào nhất → giải thích cho stakeholder.
> - Vẽ cây ra (plot_tree, dtreeviz) — đây là siêu năng lực: model **giải thích được**.
> - Nếu cần performance cao hơn: chuyển sang Random Forest, XGBoost, LightGBM (cùng họ).

## 7. 🤔 Khi nào dùng / không dùng

| Decision Tree hợp | Không hợp |
|---|---|
| Cần giải thích từng dự đoán | Cần accuracy cao tuyệt đối → ensemble |
| Mix data số + categorical | Data ảnh, text dài |
| Baseline nhanh, dễ debug | Quan hệ phi tuyến phức tạp |
| Audit/compliance (giải thích) | High-dimensional sparse |

## 8. 📌 Tóm tắt 30 giây

Decision Tree = trò 20 câu hỏi: chia data theo Gini/Entropy. Mạnh ở giải thích, yếu ở accuracy + ổn định. Luôn giới hạn depth, vẽ cây ra để hiểu. Khi cần accuracy cao, chuyển sang Random Forest/XGBoost.
`,
        theoryEn: `**Decision Trees — Intuitive Classification**

**How it works:** Recursively split data using best feature/threshold until stopping criteria. Each leaf predicts majority class.

**Splitting:** Gini Impurity (1-Σpᵢ²) or Entropy (-Σpᵢlog₂pᵢ). Best split = highest Information Gain.

**Pruning:** Pre-pruning (max_depth, min_samples) or post-pruning (CCP, remove unhelpful nodes). Cross-validate to find optimal depth.

**Feature Importance:** Impurity-based — total Gini decrease from each feature across all splits.

**Pros:** Interpretable, no scaling, handles mixed types, fast inference. **Cons:** Overfits, unstable, greedy, high variance.`,
        code: "import numpy as np\n\ndef gini(y):\n    classes = np.unique(y)\n    return 1 - sum((np.sum(y == c) / len(y)) ** 2 for c in classes)\n\ndef best_split(X, y):\n    best_gain, best_feat, best_thresh = -1, None, None\n    parent_gini = gini(y)\n    for feat in range(X.shape[1]):\n        thresholds = np.unique(X[:, feat])\n        for t in thresholds:\n            left = y[X[:, feat] <= t]\n            right = y[X[:, feat] > t]\n            if len(left) == 0 or len(right) == 0:\n                continue\n            gain = parent_gini - (len(left)*gini(left) + len(right)*gini(right)) / len(y)\n            if gain > best_gain:\n                best_gain, best_feat, best_thresh = gain, feat, t\n    return best_feat, best_thresh, best_gain\n\n# Sample data\nnp.random.seed(42)\nX = np.array([[2,3],[1,1],[3,2],[6,5],[7,8],[8,6],[4,4],[5,7]])\ny = np.array([0,0,0,1,1,1,0,1])\n\nfeat, thresh, gain = best_split(X, y)\nprint(f'Best split: Feature {feat}, Threshold {thresh}')\nprint(f'Information Gain: {gain:.4f}')\nprint(f'Parent Gini: {gini(y):.4f}')\n\nleft_mask = X[:, feat] <= thresh\nprint(f'\\nLeft ({sum(left_mask)} samples): Gini = {gini(y[left_mask]):.4f}')\nprint(f'Right ({sum(~left_mask)} samples): Gini = {gini(y[~left_mask]):.4f}')",
        codeLanguage: "python",
        exercise: "Implement a full Decision Tree (recursive splitting to max_depth=3). Predict on new data.",
        exerciseEn: "Implement a full Decision Tree (recursive splitting to max_depth=3). Predict on new data.",
        quiz: [
          { question: "What does Gini = 0 mean?", options: ["Empty node", "Node is perfectly pure (all one class)", "Overfitting", "Can't split further"], answer: 1, explanation: "Gini = 0 means all samples in the node belong to the same class. It's perfectly pure — no need to split further." },
          { question: "Why do Decision Trees tend to overfit?", options: ["Too few parameters", "Without constraints, they grow until each leaf is pure, memorizing training data", "They're too simple", "They ignore features"], answer: 1, explanation: "An unconstrained tree will keep splitting until every leaf contains a single class, effectively memorizing the training data including noise." },
          { question: "What is Information Gain?", options: ["How much accuracy improves", "The reduction in impurity (entropy/gini) after a split", "The number of features used", "The tree depth"], answer: 1, explanation: "Information Gain measures how much a split reduces the impurity of child nodes compared to the parent. The best split maximizes IG." },
          { question: "What is the advantage of trees over linear models?", options: ["Always more accurate", "Can capture non-linear relationships and don't need feature scaling", "Faster to train", "Fewer parameters"], answer: 1, explanation: "Trees naturally handle non-linear boundaries by combining multiple splits, and they work with raw features without normalization." },
          { question: "What does max_depth control?", options: ["Number of features", "Maximum tree depth — limits complexity to prevent overfitting", "Training speed only", "Number of classes"], answer: 1, explanation: "max_depth limits how deep the tree can grow. Shallow trees (low depth) underfit; deep trees overfit. It's the primary regularization parameter." },
          { question: "Why is a Decision Tree called a 'greedy' algorithm?", options: ["It uses all data", "It makes the locally best split at each step without considering the global optimum", "It's memory-hungry", "It trains quickly"], answer: 1, explanation: "At each node, the tree picks the best split for that node only, without considering whether a different split might lead to a better overall tree." },
          { question: "🏢 Knowledge Check: IBM Watson for Oncology ($62M failure, 2018) — why did Decision Trees + ensembles fail to accurately diagnose cancer?", options: ["Model too simple", "Training data consisted of synthetic cases created by MSKCC doctors (not real patients), causing overfitting + geographical bias", "Not enough funding", "Weak hardware"], answer: 1, explanation: "Watson was trained on hypothetical cases instead of real-world patient outcomes. The model learned MSKCC doctors' patterns rather than cancer biology — failing badly when deployed at other hospitals (South Korea, Germany)." },
          { question: "🏢 Knowledge Check: Why do banks (Capital One, JPMorgan) prefer single Decision Trees over Neural Networks for credit scoring?", options: ["Cheaper", "Interpretability is required by ECOA/FCRA law — they must explain loan rejection reasons to customers", "Higher accuracy", "Faster"], answer: 1, explanation: "The Equal Credit Opportunity Act requires an 'adverse action notice' — a specific explanation for rejection. Decision tree paths ('Income < $50K AND Debt > 40%') are easy to explain. Neural networks are black boxes, violating the law." },
          { question: "🏢 Knowledge Check: In Kaggle competitions, why does a single Decision Tree rarely win despite being a common baseline?", options: ["Too complex", "Because of high variance (severe overfitting) — small data changes produce entirely different trees. Ensembles (RF, XGBoost) are needed to reduce variance", "Only handles classification", "No GPU support"], answer: 1, explanation: "Single trees have an extreme bias-variance trade-off: shallow → underfit, deep → overfit. Kaggle winners always use ensembles (XGBoost, LightGBM) because averaging reduces variance while keeping bias low." }
        ]
      }
    ]
  },
  {
    id: "ml-random-forest",
    title: "Random Forests",
    titleEn: "Random Forests",
    icon: "🌲",
    color: "from-teal-500 to-cyan-600",
    description: "Bagging, feature sampling, ensemble voting",
    descriptionEn: "Bagging, feature sampling, ensemble voting",
    course: "ml",
    lessons: [
      {
        id: "ml-rf-1", title: "Ensemble Learning", titleEn: "Ensemble Learning",
        level: 3, difficulty: "intermediate",
        theory: `## 1. 🚦 Vấn đề đời thường

Trên Rap Việt, **1 giám khảo** dễ thiên vị. Nhưng **4 giám khảo bỏ phiếu độc lập** rồi cộng điểm — kết quả công bằng và chính xác hơn nhiều. Hơn nữa, mỗi giám khảo có "góc nhìn" khác nhau (flow, lyric, stage, cảm xúc) → bù trừ điểm yếu của nhau.

**Random Forest** chính là vậy: trồng N cây quyết định, mỗi cây xem dữ liệu hơi khác, rồi **bỏ phiếu** ra kết quả cuối.

## 2. 💡 Khái niệm chính

- **Bagging (Bootstrap Aggregating)**: mỗi cây train trên 1 mẫu bootstrap (lấy có thay thế từ data gốc).
- **Feature randomness**: tại mỗi node, chỉ xét random $\\\\sqrt{n}$ features → tăng đa dạng.
- **Voting**: classification = majority vote; regression = trung bình.
- **OOB (Out-Of-Bag)**: ~37% sample không nằm trong bootstrap → dùng làm validation miễn phí.

## 3. 🧰 Vì sao mạnh hơn 1 cây

| Vấn đề Decision Tree | Random Forest giải |
|---|---|
| Overfit nặng | Trung bình N cây → giảm variance |
| Không ổn định | Mỗi cây độc lập → ổn định |
| 1 feature lấn át | Feature randomness ép cây xét feature khác |

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`python
from sklearn.ensemble import RandomForestClassifier
import pandas as pd

rf = RandomForestClassifier(
    n_estimators=300,        # 300 cây
    max_depth=None,          # cây mọc tự do (RF không sợ overfit nặng)
    min_samples_leaf=2,
    max_features="sqrt",
    n_jobs=-1,               # train song song
    oob_score=True,          # validation miễn phí
    random_state=42
)
rf.fit(X_train, y_train)
print("OOB score:", rf.oob_score_)
print("Test acc :", rf.score(X_test, y_test))

# Feature importance
imp = pd.Series(rf.feature_importances_, index=X_train.columns).sort_values(ascending=False)
print(imp.head(10))
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **n_estimators quá ít** (10-50) → variance còn cao; **quá nhiều** (5000) → chậm gấp đôi mà ít cải thiện.
> - **Imbalanced data**: dùng \`class_weight="balanced_subsample"\` hoặc SMOTE trước.
> - **Categorical high-cardinality**: feature_importance bị thiên vị cho cột nhiều giá trị → dùng permutation importance thay thế.
> - **Tưởng RF không cần tune**: thực ra max_features, min_samples_leaf vẫn ảnh hưởng đáng kể.
> - **Predict chậm trên 1 sample** (300 cây × forward) — không phù hợp low-latency real-time nếu cây sâu.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - **n_estimators = 200-500** là sweet spot cho hầu hết bài.
> - Dùng **OOB score** thay vì cross-validation nếu data nhỏ — tiết kiệm thời gian.
> - **Permutation importance** > feature_importances_ mặc định (chính xác hơn).
> - Khi cần accuracy cao hơn nữa: chuyển sang **Gradient Boosting** (XGBoost, LightGBM, CatBoost).
> - RF là **baseline siêu mạnh** — luôn chạy đầu tiên trên tabular data trước khi thử model phức tạp.

## 7. 🤔 RF vs XGBoost

| Random Forest | XGBoost/LightGBM |
|---|---|
| Bagging (parallel) | Boosting (sequential) |
| Khó overfit | Cần tune cẩn thận |
| Train song song nhanh | Predict nhanh hơn |
| Robust với hyperparameter | Cần early stopping |
| Baseline đầu tiên | Khi cần đỉnh accuracy |

## 8. 📌 Tóm tắt 30 giây

Random Forest = N giám khảo Rap Việt bỏ phiếu. Bagging + feature randomness → ổn định, ít overfit, mạnh ngay khi default. Luôn dùng làm baseline tabular. Khi cần đỉnh accuracy, leo lên XGBoost/LightGBM.
`,
        theoryEn: `**Random Forest — Many Trees Voting Together**

**Bagging:** Bootstrap samples → Train tree each → Vote/average. ~63.2% unique data per sample, ~36.8% OOB.

**Variance Reduction:** Different data + different features → different errors → errors cancel out.

**Random Features:** Each split considers random feature subset → tree diversity → lower correlation → better ensemble.

**Key Parameters:** n_estimators (100-1000), max_depth, max_features (√n), min_samples_split.

**Feature Importance:** MDI (fast, biased), Permutation (reliable, slower), SHAP (best, expensive).

**OOB Error:** Free validation using samples not used in each tree's training.

**Pros:** Accurate, hard to overfit, parallelizable. **Cons:** Less interpretable, slower, memory-heavy, can't extrapolate.`,
        code: "import numpy as np\n\nclass SimpleRandomForest:\n    def __init__(self, n_trees=5, max_depth=3):\n        self.n_trees = n_trees\n        self.max_depth = max_depth\n        self.trees = []\n\n    def _bootstrap(self, X, y):\n        idx = np.random.choice(len(X), size=len(X), replace=True)\n        return X[idx], y[idx]\n\n    def _build_stump(self, X, y):\n        best_feat, best_thresh = 0, 0\n        best_gini = float('inf')\n        feat_subset = np.random.choice(X.shape[1], max(1, X.shape[1]//2), replace=False)\n        for f in feat_subset:\n            for t in np.unique(X[:, f]):\n                left = y[X[:, f] <= t]\n                right = y[X[:, f] > t]\n                if len(left) == 0 or len(right) == 0: continue\n                g = (len(left) * (1-sum((np.sum(left==c)/len(left))**2 for c in np.unique(left))) +\n                     len(right) * (1-sum((np.sum(right==c)/len(right))**2 for c in np.unique(right)))) / len(y)\n                if g < best_gini:\n                    best_gini, best_feat, best_thresh = g, f, t\n        left_class = np.bincount(y[X[:, best_feat] <= best_thresh].astype(int)).argmax() if sum(X[:, best_feat] <= best_thresh) > 0 else 0\n        right_class = np.bincount(y[X[:, best_feat] > best_thresh].astype(int)).argmax() if sum(X[:, best_feat] > best_thresh) > 0 else 0\n        return {'feat': best_feat, 'thresh': best_thresh, 'left': left_class, 'right': right_class}\n\n    def fit(self, X, y):\n        for i in range(self.n_trees):\n            X_boot, y_boot = self._bootstrap(X, y)\n            tree = self._build_stump(X_boot, y_boot)\n            self.trees.append(tree)\n            print(f'  Tree {i+1}: split feature={tree[\"feat\"]}, threshold={tree[\"thresh\"]:.2f}')\n\n    def predict(self, X):\n        preds = np.zeros((len(X), self.n_trees))\n        for j, tree in enumerate(self.trees):\n            preds[:, j] = np.where(X[:, tree['feat']] <= tree['thresh'], tree['left'], tree['right'])\n        return np.array([np.bincount(row.astype(int)).argmax() for row in preds])\n\nnp.random.seed(42)\nX = np.random.randn(80, 3)\ny = ((X[:, 0] + X[:, 1] - X[:, 2]) > 0).astype(int)\n\nrf = SimpleRandomForest(n_trees=7)\nprint('Training Random Forest:')\nrf.fit(X, y)\npreds = rf.predict(X)\nprint(f'\\nAccuracy: {np.mean(preds == y):.2%}')",
        codeLanguage: "python",
        exercise: "Add Out-of-Bag (OOB) error estimation to Random Forest.",
        exerciseEn: "Add Out-of-Bag (OOB) error estimation to Random Forest.",
        quiz: [
          { question: "Why does Random Forest overfit less than a single Decision Tree?", options: ["Uses fewer features", "Bagging + feature sampling creates diverse trees whose errors cancel out", "Trees are shallower", "Uses different loss"], answer: 1, explanation: "Bagging creates diverse training sets, and random feature selection ensures trees are different. When combined, individual errors cancel out, reducing variance." },
          { question: "What is Out-of-Bag (OOB) error?", options: ["Error on training data", "Error estimated using samples NOT used to train each tree (free validation)", "Error on test data", "Error from pruning"], answer: 1, explanation: "Each bootstrap sample leaves ~37% of data unused. These OOB samples serve as a free validation set for each tree, providing an unbiased error estimate without needing a separate test set." },
          { question: "Why does random feature sampling help?", options: ["Reduces computation", "Prevents all trees from being dominated by the same strong features", "Makes trees simpler", "Increases accuracy of each tree"], answer: 1, explanation: "Without random features, all trees would split on the same dominant features, making them highly correlated. Random feature sampling creates diversity, which is key to ensemble success." },
          { question: "How does Random Forest make predictions for classification?", options: ["Uses the first tree", "Each tree votes, majority wins", "Averages probabilities", "Uses the deepest tree"], answer: 1, explanation: "For classification, each tree in the forest makes its own prediction, and the final output is the class that receives the most votes (majority voting)." },
          { question: "What happens if you increase n_estimators?", options: ["Always overfits", "Performance improves and then plateaus (more trees rarely hurt)", "Performance gets worse", "Training gets faster"], answer: 1, explanation: "Adding more trees generally improves performance up to a point, then plateaus. Unlike single trees, more trees in a Random Forest don't cause overfitting — they just add computation." },
          { question: "Can Random Forest extrapolate beyond training data range?", options: ["Yes, easily", "No — it can only predict values within the range of training targets", "Only with enough trees", "Only for regression"], answer: 1, explanation: "Random Forest predictions are averages of leaf values from training data, so they cannot predict values outside the training target range. This is a key limitation for regression." },
          { question: "🏢 Knowledge Check: Why did Microsoft Kinect (2010) use Random Forest instead of Neural Networks for real-time body pose estimation?", options: ["NNs didn't exist yet", "Because RF inference is extremely fast on CPU (1ms/frame) and parallelizes well — meeting 30fps on Xbox 360 without a powerful GPU", "RF is more accurate", "Easier to code"], answer: 1, explanation: "In 2010, deep learning wasn't mainstream and the Xbox 360 had no GPU. Random Forest, with independent trees, parallelizes across multi-core CPUs. Inference time is predictable — critical for real-time gaming." },
          { question: "🏢 Knowledge Check: From 2014-2018 in Kaggle, why was Random Forest gradually overtaken by XGBoost although both are ensembles?", options: ["RF too slow", "Boosting (XGBoost) sequentially corrects errors, so it has lower bias than bagging (RF). XGBoost also has L1/L2 regularization + native handling of missing values", "RF has no Python support", "RF only does classification"], answer: 1, explanation: "RF reduces variance but not bias. XGBoost reduces both variance and bias through sequential boosting + gradient optimization. On tabular data, XGBoost typically wins 0.5-2% over RF — enough to win Kaggle." },
          { question: "🏢 Knowledge Check: At Airbnb, Random Forest is used for 'Smart Pricing' — which features matter most when inspecting feature_importances_?", options: ["Host name", "Location (lat/lng) + property_type + seasonality — RF automatically detects non-linear interactions", "Listing photo color", "Description character count"], answer: 1, explanation: "RF feature importance is based on mean decrease in impurity. Airbnb's pricing model automatically discovers location-seasonality interactions (e.g., ski resorts being expensive in winter) without manual feature engineering." }
        ]
      }
    ]
  },
  {
    id: "ml-svm",
    title: "Support Vector Machines",
    titleEn: "Support Vector Machines",
    icon: "📐",
    color: "from-teal-500 to-cyan-600",
    description: "Hyperplane, Kernel Trick, Margin",
    descriptionEn: "Hyperplane, Kernel Trick, Margin",
    course: "ml",
    lessons: [
      {
        id: "ml-svm-1", title: "SVM & Kernel Trick", titleEn: "SVM & Kernel Trick",
        level: 3, difficulty: "intermediate",
        theory: `## 1. 🚦 Vấn đề đời thường

Bàn họp dài, một bên là team Marketing, một bên là team Tech. Bạn cần kẻ một đường thẳng chia bàn sao cho **2 nhóm cách đường đó xa nhất** — ai cũng có không gian thoải mái. Đường thẳng đó chính là **SVM** (Support Vector Machine), và "khoảng cách an toàn" gọi là **margin**.

Khi 2 nhóm ngồi xen kẽ không thể kẻ đường thẳng → nhấc cả bàn lên 3D, nhìn từ trên xuống đột nhiên kẻ được. Đó là **Kernel Trick**.

## 2. 💡 Khái niệm chính

- **Hyperplane**: ranh giới phân loại (2D = đường, 3D = mặt phẳng).
- **Support Vectors**: những điểm sát đường nhất — chúng "giữ" đường ở đúng vị trí.
- **Margin**: khoảng cách từ hyperplane đến support vector → SVM tối đa hoá margin này.
- **Kernel**: hàm "nâng chiều" để dữ liệu dễ chia hơn.

## 3. 🧰 4 kernel phổ biến

| Kernel | Ý nghĩa | Khi dùng |
|--------|---------|----------|
| **Linear** | Đường thẳng | Dữ liệu chia tuyến tính, nhiều feature |
| **Polynomial** | Cong bậc n | Quan hệ đa thức |
| **RBF (Gauss)** | Cong tự do | Mặc định, hầu hết bài toán phi tuyến |
| **Sigmoid** | Như neural net | Hiếm dùng |

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`python
from sklearn.svm import SVC
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

X, y = make_moons(n_samples=300, noise=0.2, random_state=42)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3)

clf = SVC(kernel="rbf", C=1.0, gamma="scale")
clf.fit(Xtr, ytr)
print("Accuracy:", clf.score(Xte, yte))
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Quên **chuẩn hoá feature** (StandardScaler) → SVM gần như **vô dụng**. Feature có scale lớn sẽ át hết.

- Dùng RBF với dataset 1 triệu dòng → train **vài ngày** vì SVM O(n²).
- \`C\` quá lớn → overfit dữ liệu nhiễu; \`C\` quá nhỏ → underfit.
- Không tune \`gamma\` → quyết định ranh giới quá hẹp/quá rộng.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:** Luôn theo trình tự: **(1)** StandardScaler → **(2)** SVC kernel="rbf" → **(3)** GridSearch \`C ∈ {0.1, 1, 10}\`, \`gamma ∈ {0.01, 0.1, 1}\`. 90% bài đạt baseline tốt.

- Dataset > 100k dòng → đổi sang **LinearSVC** (nhanh hơn 50×) hoặc dùng **SGDClassifier**.
- Bài phân loại văn bản → kernel **linear** thường tốt nhất (TF-IDF đã sparse cao chiều).
- Vẽ **decision boundary** ở 2D để hiểu trực quan trước khi scale lên nhiều feature.

## 7. 🤔 Khi nào dùng / không dùng

- ✅ Dataset nhỏ–vừa (< 100k), nhiều feature, ranh giới phức tạp.
- ✅ Phân loại văn bản với TF-IDF → SVM linear hay vô địch.
- ❌ Big data > 1 triệu dòng → chọn Logistic Regression / GBM / Neural Net.
- ❌ Cần **xác suất** (probability) → SVM cho điểm tự tin chứ không phải xác suất chuẩn.

## 8. 📌 Tóm tắt 30 giây

SVM = **kẻ đường có margin xa nhất**. Kernel Trick giúp xử lý phi tuyến bằng cách "nâng chiều". Luôn **chuẩn hoá feature**, bắt đầu với RBF kernel, GridSearch \`C\` và \`gamma\`. Nhỏ–vừa thì vô địch, big data thì nhường sân cho người khác.
`,
        theoryEn: `**SVM — Maximum Margin Classification**

**Hyperplane:** Decision boundary. **Margin:** Distance to nearest points (maximize for robustness). **Support Vectors:** Points defining the boundary.

**Formulation:** Minimize ||w||² subject to yᵢ(w·xᵢ+b) ≥ 1. Convex optimization → global optimum guaranteed.

**Soft Margin (C):** High C → narrow margin, few errors (overfit risk). Low C → wide margin, more errors (better generalization).

**Kernel Trick:** Map data to higher dimension without computing there. Linear, RBF (most common, param γ), Polynomial, Sigmoid.

**RBF γ:** High → complex boundary (overfit). Low → smooth (underfit). Tune C and γ together via grid search.

**SVR:** Regression version — fit tube of width ε around data.

**Best for:** Medium datasets, complex boundaries, high-dimensional data. **Not ideal for:** Large datasets (O(n²-n³)).`,
        code: "import numpy as np\n\n# Simple linear SVM using gradient descent\nclass SimpleSVM:\n    def __init__(self, lr=0.001, C=1.0, epochs=1000):\n        self.lr = lr\n        self.C = C\n        self.epochs = epochs\n\n    def fit(self, X, y):\n        y_svm = np.where(y == 0, -1, 1)  # SVM uses -1/+1\n        self.w = np.zeros(X.shape[1])\n        self.b = 0\n\n        for epoch in range(self.epochs):\n            for i in range(len(X)):\n                margin = y_svm[i] * (X[i] @ self.w + self.b)\n                if margin >= 1:\n                    self.w -= self.lr * self.w  # regularization only\n                else:\n                    self.w -= self.lr * (self.w - self.C * y_svm[i] * X[i])\n                    self.b += self.lr * self.C * y_svm[i]\n\n            if epoch % 200 == 0:\n                loss = 0.5 * np.dot(self.w, self.w) + self.C * np.sum(np.maximum(0, 1 - y_svm * (X @ self.w + self.b)))\n                print(f'  Epoch {epoch}: loss = {loss:.4f}')\n\n    def predict(self, X):\n        return (X @ self.w + self.b >= 0).astype(int)\n\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = ((X[:, 0] + X[:, 1]) > 0).astype(int)\n\nsvm = SimpleSVM(lr=0.001, C=1.0, epochs=1000)\nprint('Training SVM:')\nsvm.fit(X, y)\nacc = np.mean(svm.predict(X) == y)\nprint(f'\\nAccuracy: {acc:.2%}')\nprint(f'Weights: {svm.w.round(3)}, Bias: {svm.b:.3f}')",
        codeLanguage: "python",
        exercise: "Implement RBF kernel: create kernel matrix and use for non-linear classification.",
        exerciseEn: "Implement RBF kernel: create kernel matrix and use for non-linear classification.",
        quiz: [
          { question: "What are Support Vectors?", options: ["All data points", "Points closest to the hyperplane that define the decision boundary", "Outliers", "Centroids"], answer: 1, explanation: "Support Vectors are the data points closest to the decision boundary. They are the only points that influence the position and orientation of the hyperplane." },
          { question: "What does the C parameter control in SVM?", options: ["Number of features", "Trade-off between wide margin and misclassification tolerance", "Learning rate", "Number of support vectors"], answer: 1, explanation: "C controls the balance: High C penalizes misclassification heavily (narrow margin), Low C allows more errors for a wider margin (better generalization)." },
          { question: "What is the Kernel Trick?", options: ["A fast sorting algorithm", "Computing dot products in a higher-dimensional space without explicitly mapping data there", "A regularization technique", "A data augmentation method"], answer: 1, explanation: "The Kernel Trick allows SVM to work in very high (even infinite) dimensional spaces by computing dot products via a kernel function, without ever explicitly transforming the data." },
          { question: "Which kernel should you try first?", options: ["Polynomial", "RBF (Gaussian) — it works well for most problems", "Sigmoid", "Custom kernel"], answer: 1, explanation: "RBF kernel is the default recommendation because it can handle non-linear boundaries and works well across a wide range of problems." },
          { question: "Why does SVM require feature scaling?", options: ["It doesn't", "Features with large ranges would dominate the distance/margin calculations", "To speed up training", "Convention only"], answer: 1, explanation: "SVM relies on distances between data points. Without scaling, features with larger ranges would disproportionately influence the margin calculation." },
          { question: "What is the time complexity of SVM training?", options: ["O(n)", "O(n² to n³), making it slow for large datasets", "O(n log n)", "O(1)"], answer: 1, explanation: "SVM training involves solving a quadratic optimization problem, which scales as O(n²) to O(n³) depending on the solver, making it impractical for datasets with millions of samples." },
          { question: "🏢 Knowledge Check: Why did Gmail Spam Filter (2004-2012) use SVM with a linear kernel instead of RBF?", options: ["RBF didn't work", "Because text data has millions of features (bag-of-words) — linear kernel is sufficient and scales to billions of emails, while RBF is too slow O(n²)", "Linear is easier to code", "RBF uses too much RAM"], answer: 1, explanation: "In high-dimensional sparse text (50K-1M features), data is often already linearly separable — RBF adds no benefit. Linear SVM (LIBLINEAR) trains in O(n) instead of O(n²), handling Gmail's scale." },
          { question: "🏢 Knowledge Check: Why was SVM replaced by deep learning in computer vision after 2012 (AlexNet)?", options: ["SVM too expensive", "The kernel trick doesn't scale to millions of images, and CNNs learn features better than handcrafted features (HOG, SIFT) + SVM", "SVM doesn't support color images", "Licensing issues"], answer: 1, explanation: "Pre-2012: HOG/SIFT features + SVM were SOTA on ImageNet. AlexNet 2012 reduced error from 26%→16% using end-to-end CNNs. SVM with precomputed kernel matrices requires O(n²) memory and doesn't scale to 1M+ images." },
          { question: "🏢 Knowledge Check: In bioinformatics (cancer gene classification), why is SVM still dominant today?", options: ["Tradition", "Because of high-dimensional, small-sample data (10K genes, 100 patients) — SVM with kernels handles the 'curse of dimensionality' better than deep learning, which requires big data", "Cheap", "Required by law"], answer: 1, explanation: "When p (features) >> n (samples), deep learning overfits severely. SVM maximizes margin → robust in high dimensions. Kernels enable non-linear modeling without requiring more samples. RBF/string kernels are common in genomics." }
        ]
      }
    ]
  },
  {
    id: "ml-kmeans",
    title: "K-Means Clustering",
    titleEn: "K-Means Clustering",
    icon: "🎨",
    color: "from-teal-500 to-cyan-600",
    description: "Unsupervised learning, centroids, elbow method",
    descriptionEn: "Unsupervised learning, centroids, elbow method",
    course: "ml",
    lessons: [
      {
        id: "ml-km-1", title: "K-Means Algorithm", titleEn: "K-Means Algorithm",
        level: 2, difficulty: "beginner",
        theory: `Bạn tổ chức **tiệc cưới 200 khách**, có 8 bàn. Cách nhanh nhất xếp khách: chọn 8 vị trí "trung tâm bàn", **mỗi khách ngồi vào bàn gần nhất**. Sau đó dịch chuyển bàn về **trung tâm thực** của những người đã ngồi quanh nó. Lặp lại đến khi không ai phải đổi chỗ. Đó **chính xác** là K-Means.

## 1. 🚦 Vấn đề đời thường

Tiki có 5 triệu khách hàng — không có nhãn. Marketing muốn **chia thành 4–8 nhóm** để gửi mail khác nhau:
- Nhóm "VIP shopaholic"
- Nhóm "săn sale cuối tuần"
- Nhóm "mua 1 lần rồi đi"
- …

→ Không ai gắn nhãn trước. Cần thuật toán **tự khám phá nhóm**. Đó là **clustering** — và **K-Means** là vua của clustering.

## 2. 💡 Khái niệm chính: Unsupervised Learning

Khác với supervised (có label \\\`y\\\`):
- **Supervised** = "đây là chó, đây là mèo, học đi" → predict.
- **Unsupervised** = "đây là 5 triệu khách, tự tìm pattern" → cluster.

K-Means **chia n điểm thành K cluster**, mỗi điểm thuộc cluster có **centroid (trọng tâm)** gần nhất.

## 3. 🔄 Thuật toán Lloyd — 4 bước

1. **Initialize**: chọn K centroid ngẫu nhiên (hoặc K-Means++).
2. **Assign (E-step)**: mỗi điểm → centroid gần nhất (Euclidean distance).
3. **Update (M-step)**: mỗi centroid → trung bình của các điểm thuộc nó.
4. **Lặp** bước 2–3 đến khi centroid **ngừng di chuyển** (convergence) hoặc đạt max iter.

Thường hội tụ trong 10–50 iter. Đảm bảo hội tụ — nhưng có thể vào **local minimum** (không tối ưu toàn cục).

**Time complexity**: O(n × K × d × I) — siêu nhanh.

## 4. 🎯 Chọn K — Câu hỏi triệu đô

K không tự xuất hiện — bạn phải chọn. 4 cách:

**1. Elbow Method**
- Chạy K-Means với K = 1, 2, …, 10.
- Vẽ K vs **Inertia** (tổng squared distance đến centroid).
- Tìm "khuỷu tay" — chỗ thêm cluster không giảm inertia nhiều nữa.

**2. Silhouette Score** (đáng tin cậy hơn)
- Đo: điểm gần cluster của nó cỡ nào vs cluster khác.
- Range [-1, 1]. Càng cao càng tốt.
- s ≈ 1: điểm khớp cluster của nó.
- s < 0: điểm đang ở **sai cluster**!

**3. Gap Statistic** — so inertia với data random uniform.

**4. Domain Knowledge** — đôi khi business chỉ cần 4 tier (VIP, Regular, Occasional, Inactive).

> 💡 **Mẹo của thầy Hải:** Đừng chỉ dùng Elbow — dễ chủ quan. Kết hợp **Elbow + Silhouette** sẽ ra K đáng tin nhất.

## 5. 🐍 Code mẫu

\\\`\\\`\\\`python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import numpy as np

# K-Means CỰC nhạy với scale → LUÔN scale trước
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Tìm K tối ưu
scores = []
for k in range(2, 11):
    km = KMeans(n_clusters=k, init="k-means++", n_init=10, random_state=42)
    labels = km.fit_predict(X_scaled)
    scores.append((k, km.inertia_, silhouette_score(X_scaled, labels)))

for k, inertia, sil in scores:
    print(f"K={k}: inertia={inertia:.0f}, silhouette={sil:.3f}")

# Train với K tốt nhất
best_k = 5
model = KMeans(n_clusters=best_k, init="k-means++", n_init=10, random_state=42)
clusters = model.fit_predict(X_scaled)
\\\`\\\`\\\`

## 6. ⚠️ Hạn chế và cách giải

| Hạn chế | Vì sao | Giải pháp |
|---------|--------|-----------|
| Phải chọn K | K là hyperparameter | Elbow + Silhouette |
| Nhạy với init | Random centroid → kết quả khác nhau | **K-Means++** init |
| Giả định cluster hình cầu | Dùng Euclidean | DBSCAN, GMM cho hình bất kỳ |
| Nhạy với outlier | Outlier kéo centroid lệch | Loại outlier hoặc K-Medoids |
| Nhạy với scale | Feature lớn lấn át | **LUÔN StandardScaler trước** |

## 7. ⚠️ Bẫy thường gặp & 🎯 Best practice

> ⚠️ **Cảnh báo:** Bẫy chết người: **không scale data trước K-Means**. Nếu \\\`income\\\` chạy 0–100M và \\\`age\\\` chạy 0–80, K-Means cluster gần như **chỉ theo income**. **LUÔN StandardScaler hoặc MinMaxScaler trước.**

Best practice của thầy Hải:
1. **StandardScaler trước** — không có ngoại lệ.
2. \\\`init="k-means++"\\\` mặc định — đừng dùng \\\`"random"\\\`.
3. \\\`n_init=10\\\` — chạy 10 lần với init khác nhau, chọn kết quả tốt nhất → tránh local minimum.
4. Visualize bằng **PCA 2D** — vẽ ra mới biết cluster có ý nghĩa hay không.
5. **Đặt tên** cho cluster sau khi xem profile (VIP, Casual, …) — không nói "cluster 0, 1, 2".
6. Re-cluster định kỳ (mỗi quý) — hành vi khách thay đổi.

## 8. ✅ Tóm tắt 30 giây

- K-Means = **chia n điểm thành K cluster** quanh centroid gần nhất.
- Lặp **assign → update** đến khi centroid ngừng dịch chuyển.
- Chọn K bằng **Elbow + Silhouette**.
- **LUÔN scale** data trước.
- Default: \\\`n_clusters=K, init="k-means++", n_init=10\\\`.
- Hợp với: customer segmentation, image compression, anomaly detection.
`,
        theoryEn: `**K-Means — Unsupervised Clustering**

**Algorithm:** Initialize centroids → Assign points to nearest centroid → Update centroids to cluster means → Repeat until convergence. O(n×K×d×I).

**Choosing K:** Elbow Method (inertia plot), Silhouette Score (cohesion vs separation), Gap Statistic, or domain knowledge.

**K-Means++:** Smart initialization — spreads centroids apart for better results. O(log K) competitive. Default in scikit-learn.

**Limitations:** Must choose K, assumes spherical clusters, sensitive to outliers and scales.

**Variants:** Mini-Batch (fast for large data), K-Medoids (robust to outliers), Bisecting K-Means (hierarchical).

**Applications:** Customer segmentation, image compression, document clustering, anomaly detection, feature engineering.`,
        code: "import numpy as np\n\nclass KMeans:\n    def __init__(self, k=3, max_iters=100):\n        self.k = k\n        self.max_iters = max_iters\n\n    def fit(self, X):\n        idx = np.random.choice(len(X), self.k, replace=False)\n        self.centroids = X[idx].copy()\n\n        for iteration in range(self.max_iters):\n            # Assign clusters\n            distances = np.array([np.linalg.norm(X - c, axis=1) for c in self.centroids]).T\n            self.labels = np.argmin(distances, axis=1)\n\n            # Update centroids\n            new_centroids = np.array([X[self.labels == i].mean(axis=0) if sum(self.labels == i) > 0 else self.centroids[i] for i in range(self.k)])\n\n            if np.allclose(self.centroids, new_centroids):\n                print(f'  Converged at iteration {iteration}')\n                break\n            self.centroids = new_centroids\n\n        self.inertia = sum(np.sum((X[self.labels == i] - self.centroids[i])**2) for i in range(self.k))\n        return self\n\nnp.random.seed(42)\n# Generate 3 clusters\nX = np.vstack([\n    np.random.randn(30, 2) + [0, 0],\n    np.random.randn(30, 2) + [5, 5],\n    np.random.randn(30, 2) + [10, 0],\n])\n\nkm = KMeans(k=3)\nkm.fit(X)\nprint(f'Centroids:\\n{km.centroids.round(2)}')\nprint(f'Inertia: {km.inertia:.2f}')\n\n# Elbow method\nprint('\\nElbow Method:')\nfor k in range(2, 7):\n    km = KMeans(k=k)\n    km.fit(X)\n    print(f'  K={k}: Inertia = {km.inertia:.2f}')",
        codeLanguage: "python",
        exercise: "Implement K-Means++ initialization and compare with random init over 10 runs.",
        exerciseEn: "Implement K-Means++ initialization and compare with random init over 10 runs.",
        quiz: [
          { question: "How does the Elbow Method choose K?", options: ["Largest K", "K at the 'elbow' where inertia reduction slows dramatically", "K = 2 always", "K = number of features"], answer: 1, explanation: "The elbow point is where adding more clusters provides diminishing returns in inertia reduction, forming an 'elbow' shape in the plot." },
          { question: "Why is K-Means sensitive to initialization?", options: ["It always converges", "Random initial centroids can lead to different (suboptimal) final clusters", "It doesn't use centroids", "It's deterministic"], answer: 1, explanation: "K-Means finds a local minimum, not the global one. Bad initial centroid placement can lead to suboptimal clustering. K-Means++ mitigates this." },
          { question: "What does Silhouette Score measure?", options: ["Number of clusters", "How well each point fits its cluster vs nearest other cluster", "Training speed", "Convergence rate"], answer: 1, explanation: "Silhouette Score ranges from -1 to 1. High scores mean points are well-matched to their cluster and poorly-matched to neighboring clusters." },
          { question: "When does K-Means fail?", options: ["With round clusters", "With non-spherical, overlapping, or varying-size clusters", "With normalized data", "With few features"], answer: 1, explanation: "K-Means assumes clusters are spherical and similar in size. It fails on elongated, ring-shaped, or differently-sized clusters." },
          { question: "What is inertia in K-Means?", options: ["A hyperparameter", "Sum of squared distances from each point to its cluster centroid", "Number of iterations", "Distance between centroids"], answer: 1, explanation: "Inertia measures how internally coherent clusters are. Lower inertia = tighter clusters. It always decreases as K increases." },
          { question: "Why must you scale features before K-Means?", options: ["K-Means requires it for convergence", "Euclidean distance is dominated by features with larger ranges, biasing cluster assignments", "Scaling makes K-Means faster", "It's optional"], answer: 1, explanation: "K-Means uses Euclidean distance. Without scaling, features with large ranges (e.g., income: 0-100000) completely dominate features with small ranges (e.g., age: 0-100)." },
          { question: "🏢 Knowledge Check: What does Spotify Discover Weekly use K-Means for, before applying collaborative filtering?", options: ["Classifying songs by fixed genre", "Clustering users into 'taste profiles' (e.g., indie-folk lover, late-night techno) — pre-computing this reduces collaborative filtering cost by 100x", "Generating random playlists", "Spam filtering"], answer: 1, explanation: "With 500M users, pairwise similarity (collaborative filtering) is O(n²). Spotify first clusters users into ~10K taste profiles, then computes similarity only within clusters — reducing cost from billions of ops to millions." },
          { question: "🏢 Knowledge Check: Why does Customer Segmentation at Starbucks use K-Means rather than DBSCAN, even though DBSCAN handles non-spherical clusters better?", options: ["DBSCAN is too new", "Because K-Means provides a fixed K that's interpretable for the marketing team (e.g., 5 clear segments). DBSCAN produces an uncontrolled number of clusters + outliers that are hard to act on", "DBSCAN doesn't scale", "K-Means is free"], answer: 1, explanation: "Marketing needs actionable segments with business meaning ('Gold Members', 'Weekend Warriors'). K=5 fixed, each cluster has a centroid → clear personas. DBSCAN may yield 50 clusters + 30% noise points → impossible to design campaigns around." },
          { question: "🏢 Knowledge Check: In image compression (color quantization), how is K-Means used and what is its main limitation?", options: ["Not related to images", "Cluster pixels by RGB into K representative colors (palette). Limitation: K is fixed and doesn't adapt to complex regions — causing posterization artifacts", "Used to encode JPEG", "Creates blurred images"], answer: 1, explanation: "K-Means reduces 16M colors to K colors (e.g., K=256 for GIF). Each pixel is assigned the nearest color in the palette. Smooth gradient regions (sky) get banding because K colors aren't enough — Floyd-Steinberg dithering compensates." }
        ]
      }
    ]
  },
  {
    id: "ml-feature-eng",
    title: "Feature Engineering",
    titleEn: "Feature Engineering",
    icon: "🔧",
    color: "from-teal-500 to-cyan-600",
    description: "Scaling, Encoding, Feature Selection",
    descriptionEn: "Scaling, Encoding, Feature Selection",
    course: "ml",
    lessons: [
      {
        id: "ml-fe-1", title: "Feature Preprocessing", titleEn: "Feature Preprocessing",
        level: 2, difficulty: "intermediate",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn nấu phở: thịt bò ngon nhưng chưa rửa, hành chưa nướng, gia vị chưa đúng tỉ lệ → **phở dở** dù nguyên liệu xịn. Machine Learning y hệt — model GBM mạnh đến đâu cũng vô dụng nếu **feature chưa được preprocess đúng**.

Có câu kinh điển: *"Garbage in, garbage out"*. Feature Engineering = **rửa thịt, nướng hành, cân gia vị** cho data.

## 2. 💡 4 nhóm preprocessing phải biết

| Nhóm | Mục đích | Công cụ sklearn |
|------|----------|-----------------|
| **Scaling** | Đưa feature về cùng thang | StandardScaler, MinMaxScaler |
| **Encoding** | Biến text thành số | OneHotEncoder, LabelEncoder |
| **Imputation** | Lấp giá trị thiếu | SimpleImputer, KNNImputer |
| **Transform** | Sửa phân phối lệch | log, PowerTransformer |

## 3. 🧪 Khi nào dùng cái nào?

- **StandardScaler** (mean=0, std=1): khi dùng SVM, KNN, Logistic Regression, Neural Net.
- **MinMaxScaler** (0–1): khi cần giữ giá trị dương (ảnh, pixel).
- **OneHotEncoder**: cho biến **không có thứ tự** (màu, thành phố).
- **LabelEncoder**: chỉ dùng cho **biến target**, không dùng cho feature đa lớp.

## 4. 🎯 Ví dụ Pipeline chuẩn

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression

num = ["age", "income"]
cat = ["city", "gender"]

pre = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")),
                      ("sc", StandardScaler())]), num),
    ("cat", Pipeline([("imp", SimpleImputer(strategy="most_frequent")),
                      ("oh", OneHotEncoder(handle_unknown="ignore"))]), cat),
])

model = Pipeline([("pre", pre), ("clf", LogisticRegression())])
model.fit(X_train, y_train)
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** **Data leakage** — fit \`StandardScaler\` trên **toàn bộ** X (gồm cả test) trước khi split → kết quả test ảo, deploy là sập.

- Dùng \`LabelEncoder\` cho feature \`city\` (Hà Nội=0, HCM=1, Đà Nẵng=2) → model nghĩ Đà Nẵng "lớn hơn" Hà Nội.
- Lấp NaN bằng \`mean\` cho cột thu nhập → một vài tỷ phú kéo mean lệch toàn bộ.
- OneHot cho biến có 1.000 giá trị (mã sản phẩm) → ma trận 1.000 cột → OOM.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:** **Luôn luôn đóng gói preprocess + model trong một \`Pipeline\`**. Như vậy lúc deploy chỉ cần \`model.predict(raw_data)\` — không lo "quên rescale".

- Lấp NaN số bằng **median** (an toàn hơn mean), text bằng **most_frequent**.
- Biến **categorical cardinality cao** → dùng **TargetEncoder** thay vì OneHot.
- Cột thiên lệch nặng (income, price) → \`np.log1p()\` trước khi scale.

## 7. 🤔 Khi nào không cần scale

- ✅ Tree-based models (Random Forest, XGBoost, LightGBM) → **không cần** scale.
- ✅ Distance-based (KNN, K-Means, SVM) → **bắt buộc** scale.
- ✅ Neural Net → **bắt buộc** scale, không gradient explode/vanish.

## 8. 📌 Tóm tắt 30 giây

Feature Engineering = **rửa, nướng, cân gia vị** cho data. Scaling cho distance/NN, OneHot cho category, Imputation đúng strategy, đóng gói **Pipeline** để tránh leakage. Làm tốt khâu này, model thường nhất cũng đánh bại model "xịn" nhưng feature bẩn.
`,
        theoryEn: `**Feature Engineering — The Most Impactful ML Skill**

**Scaling:** StandardScaler (gradient-based models), MinMaxScaler (bounded values), RobustScaler (outliers), MaxAbsScaler (sparse data). Fit on train only!

**Encoding:** One-Hot (nominal, few values), Label (ordinal), Target (high-cardinality, with smoothing), Binary, Frequency.

**Selection:** Filter (correlation, variance, mutual info), Wrapper (forward/backward/RFE), Embedded (L1, tree importance). Too many features → overfitting.

**Creation:** Polynomial, log transform, binning, date features, text features, interactions, aggregations, lag features, cyclic encoding.

**Pipeline:** Handle Missing → Encode → Create → Scale → Select → Model.`,
        code: "import numpy as np\n\n# StandardScaler\ndef standard_scale(X):\n    return (X - X.mean(axis=0)) / X.std(axis=0)\n\n# MinMaxScaler\ndef minmax_scale(X):\n    return (X - X.min(axis=0)) / (X.max(axis=0) - X.min(axis=0))\n\n# One-Hot Encoding\ndef one_hot(categories, unique_cats):\n    encoded = np.zeros((len(categories), len(unique_cats)))\n    for i, cat in enumerate(categories):\n        encoded[i, unique_cats.index(cat)] = 1\n    return encoded\n\n# Demo\nX = np.array([[1, 1000], [2, 2000], [3, 3000], [4, 4000], [5, 5000]], dtype=float)\nprint('Original:')\nprint(X)\nprint('\\nStandard Scaled:')\nprint(standard_scale(X).round(3))\nprint('\\nMinMax Scaled:')\nprint(minmax_scale(X).round(3))\n\n# One-hot encoding\ncats = ['red', 'blue', 'red', 'green', 'blue']\nunique = ['red', 'blue', 'green']\nprint('\\nOne-Hot Encoding:')\nprint(f'Categories: {cats}')\nprint(one_hot(cats, unique))\n\n# Correlation\nnp.random.seed(42)\nfeatures = np.random.randn(100, 3)\nfeatures[:, 2] = features[:, 0] * 0.9 + np.random.randn(100) * 0.1\ncorr = np.corrcoef(features.T)\nprint('\\nCorrelation Matrix:')\nfor i in range(3):\n    print(f'  Feature {i}: {corr[i].round(3)}')",
        codeLanguage: "python",
        exercise: "Implement Target Encoding for categorical features. Add smoothing to prevent overfitting.",
        exerciseEn: "Implement Target Encoding for categorical features. Add smoothing to prevent overfitting.",
        quiz: [
          { question: "Why is feature scaling needed?", options: ["Makes data prettier", "Many algorithms (SVM, KNN, Neural Nets) are sensitive to feature scales", "Required by all models", "Always increases accuracy"], answer: 1, explanation: "Distance-based (KNN, SVM) and gradient-based (Neural Networks) algorithms are sensitive to scale — features with larger ranges would dominate." },
          { question: "When should you NOT scale features?", options: ["Never", "With tree-based models (Decision Trees, Random Forests, XGBoost)", "With neural networks", "With linear models"], answer: 1, explanation: "Tree-based models split on individual feature values and are not affected by feature scaling. Scaling would add unnecessary computation." },
          { question: "What is the risk of One-Hot encoding with many categories?", options: ["Loss of information", "Curse of dimensionality — creates very sparse, high-dimensional data", "It's always fine", "Data becomes smaller"], answer: 1, explanation: "A feature with 1000 unique categories becomes 1000 binary columns, creating extremely sparse and high-dimensional data that can hurt model performance." },
          { question: "What does L1 (Lasso) regularization do for feature selection?", options: ["Selects all features", "Shrinks unimportant feature weights to exactly zero, effectively removing them", "Increases all weights", "Has no effect on features"], answer: 1, explanation: "L1 regularization penalizes the absolute value of weights, pushing less important features' coefficients to exactly zero — built-in feature selection." },
          { question: "Why create polynomial features?", options: ["To reduce dimensions", "To capture non-linear relationships using linear models", "To make data linear", "To remove outliers"], answer: 1, explanation: "Adding x², x³, or x₁×x₂ as features allows linear models to fit non-linear patterns. It's a way to get non-linearity without using non-linear models." },
          { question: "What is data leakage in feature engineering?", options: ["Data being deleted", "Using test set information during training (e.g., fitting scaler on full dataset)", "Features being correlated", "Missing values"], answer: 1, explanation: "Data leakage occurs when training process uses information from test data. Example: fitting StandardScaler on entire dataset (including test) before splitting — test statistics influence training." },
          { question: "🏢 Knowledge Check: Why was Amazon's hiring AI (2018) scrapped despite very thorough feature engineering?", options: ["Model too simple", "Because 10 years of CV training data was predominantly male → the model learned to penalize the word 'women's' (women's chess club) — gender bias from historical data", "Code bugs", "AWS too expensive"], answer: 1, explanation: "Amazon trained on 10 years of Amazon employees' CVs (mostly male). The model detected the 'male → hire' pattern and used proxy features (verbs, school names) to penalize women. A classic case: fairness bugs from feature engineering can't be fixed by post-hoc debiasing." },
          { question: "🏢 Knowledge Check: In the Kaggle Home Credit competition (2018), which feature engineering helped reach the top 1%?", options: ["Random features", "Aggregation features from bureau data (max, mean, std of previous loans) + ratio features (debt-to-income) — accounting for 60% of feature importance", "Drop all features", "One-hot encode names"], answer: 1, explanation: "Top winners spent 80% of their time on feature engineering rather than model tuning. Aggregations from relational tables + domain-specific ratios (DTI, payment_to_income) beat neural networks on tabular data — this is why XGBoost still dominates finance." },
          { question: "🏢 Knowledge Check: What's a concrete target leakage example in medical ML from the 'Reproducible ML' paper (Kapoor & Narayanan 2023)?", options: ["Using too much RAM", "Using the feature 'patient transferred to ICU' to predict mortality — this feature only exists after the outcome is known, producing a fake AUC of 0.99 but useless in production", "Forgetting to log", "Wrong learning rate"], answer: 1, explanation: "About 294 ML papers on COVID-19 detection were found to have target leakage: using features recorded AFTER diagnosis. Models achieved AUC 0.99 in validation but completely failed on prospective data — a temporal leakage problem." }
        ]
      }
    ]
  },
  {
    id: "ml-cross-val",
    title: "Cross-Validation",
    titleEn: "Cross-Validation",
    icon: "🔄",
    color: "from-teal-500 to-cyan-600",
    description: "K-Fold, Stratified, Train/Val/Test split",
    descriptionEn: "K-Fold, Stratified, Train/Val/Test split",
    course: "ml",
    lessons: [
      {
        id: "ml-cv-1", title: "K-Fold Cross-Validation", titleEn: "K-Fold Cross-Validation",
        level: 3, difficulty: "intermediate",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn ôn thi đại học. Làm 1 đề mẫu được 9 điểm → không có nghĩa thi thật được 9. Có thể đề đó **trùng tủ**. Phải làm **5 đề khác nhau** và tính trung bình mới biết thực lực. K-Fold Cross-Validation chính là **5 đề khác nhau** cho model.

## 2. 💡 K-Fold là gì?

Chia data thành **K phần bằng nhau**. Lặp K vòng:
- Vòng 1: Phần 1 = test, các phần còn lại = train.
- Vòng 2: Phần 2 = test, …
- …
- Cuối cùng lấy **trung bình K điểm** → ước lượng chính xác hơn.

K phổ biến: **5** hoặc **10**.

## 3. 🧰 Các biến thể quan trọng

| Loại | Khi dùng |
|------|----------|
| **K-Fold** | Bài toán thông thường |
| **Stratified K-Fold** | Phân loại — giữ tỷ lệ class trong mỗi fold |
| **TimeSeriesSplit** | Dữ liệu thời gian — không được "nhìn tương lai" |
| **GroupKFold** | Có nhóm (cùng user/cùng bệnh nhân) phải nằm cùng fold |

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`python
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.ensemble import RandomForestClassifier
import numpy as np

skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
clf = RandomForestClassifier(n_estimators=200)

scores = cross_val_score(clf, X, y, cv=skf, scoring="f1_macro")
print(f"F1: {scores.mean():.3f} ± {scores.std():.3f}")
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Dùng **K-Fold thường** cho dữ liệu chuỗi thời gian (chứng khoán, doanh thu) → model "nhìn tương lai" → backtest đẹp, live trade lỗ.

- Quên \`shuffle=True\` → nếu data đã sort theo class, fold đầu toàn class A, fold cuối toàn class B → score lệch.
- Stratified mà data **imbalance 99/1** → vẫn có fold thiếu class hiếm.
- Test các bệnh nhân trong nhiều fold cùng lúc → leakage thông tin cá nhân.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:** Báo cáo kết quả luôn ghi cả **mean ± std**. Mean cao mà std lớn = model bất ổn, đừng tin.

- Phân loại → **luôn dùng** \`StratifiedKFold\`.
- Time series → \`TimeSeriesSplit\` với \`gap\` giữa train và test để tránh leak.
- Hyperparameter tuning → dùng **nested CV** (CV trong CV) để báo cáo trung thực.

## 7. 🤔 Khi nào dùng K=mấy

- **K=5**: cân bằng tốc độ và độ tin cậy — mặc định nên dùng.
- **K=10**: dataset nhỏ, cần ước lượng chính xác hơn.
- **K=n (Leave-One-Out)**: dataset cực nhỏ (< 100 mẫu).
- ❌ Dataset > 1 triệu dòng → 1 hold-out set 20% là đủ, K-Fold quá tốn.

## 8. 📌 Tóm tắt 30 giây

K-Fold CV = **làm K đề khác nhau, lấy trung bình**. Phân loại → Stratified, time series → TimeSeriesSplit, có nhóm → GroupKFold. Báo cáo \`mean ± std\` để biết model có **ổn định** hay chỉ may. Tuning hyperparameter → nested CV để không tự lừa mình.
`,
        theoryEn: `**Cross-Validation — Reliable Model Evaluation**

**K-Fold:** Split into K folds, rotate test fold, train K times, average scores. Every point used for training and testing exactly once.

**Choosing K:** K=5 (default), K=10 (more reliable), K=n/LOO (small datasets). Higher K = lower bias, higher variance.

**Variants:** Stratified (preserve class ratio), LOO (K=N), Time Series (temporal order, no future leakage), Repeated (multiple runs), Group (same group in same fold).

**Train/Val/Test:** Training (fit parameters), Validation (tune hyperparameters), Test (final evaluation — use only once!).

**Nested CV:** Outer loop evaluates, inner loop tunes. Gold standard but expensive (K² trainings).

**Common Mistakes:** Data leakage (preprocess before split), evaluating on training data, using test set for tuning, not stratifying, shuffling time series, ignoring groups.`,
        code: "import numpy as np\n\ndef k_fold_split(X, y, k=5):\n    n = len(X)\n    indices = np.random.permutation(n)\n    fold_size = n // k\n    folds = []\n    for i in range(k):\n        test_idx = indices[i*fold_size:(i+1)*fold_size]\n        train_idx = np.concatenate([indices[:i*fold_size], indices[(i+1)*fold_size:]])\n        folds.append((train_idx, test_idx))\n    return folds\n\n# Simple model: predict majority class in nearest neighbors\ndef knn_predict(X_train, y_train, X_test, k=3):\n    preds = []\n    for x in X_test:\n        dists = np.linalg.norm(X_train - x, axis=1)\n        nearest = y_train[np.argsort(dists)[:k]]\n        preds.append(np.bincount(nearest.astype(int)).argmax())\n    return np.array(preds)\n\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = ((X[:, 0] + X[:, 1]) > 0).astype(int)\n\n# 5-Fold Cross Validation\nprint('5-Fold Cross Validation:')\nfolds = k_fold_split(X, y, k=5)\nscores = []\nfor i, (train_idx, test_idx) in enumerate(folds):\n    preds = knn_predict(X[train_idx], y[train_idx], X[test_idx], k=5)\n    acc = np.mean(preds == y[test_idx])\n    scores.append(acc)\n    print(f'  Fold {i+1}: Accuracy = {acc:.2%}')\n\nprint(f'\\nMean: {np.mean(scores):.2%} +/- {np.std(scores):.2%}')",
        codeLanguage: "python",
        exercise: "Implement Stratified K-Fold (maintain y=0/y=1 ratio in each fold).",
        exerciseEn: "Implement Stratified K-Fold (maintain y=0/y=1 ratio in each fold).",
        quiz: [
          { question: "Why is CV better than a single train/test split?", options: ["Faster", "Reduces variance of performance estimate by testing on multiple splits", "Always gives higher accuracy", "Uses less data"], answer: 1, explanation: "CV tests on multiple different splits, averaging out the luck/unluck of any single split, providing a more reliable estimate." },
          { question: "What is data leakage?", options: ["Data loss", "Test data influencing training (e.g., scaling before splitting)", "Missing values", "Data corruption"], answer: 1, explanation: "Data leakage occurs when information from the test set 'leaks' into training, e.g., if you scale/encode using the entire dataset before splitting." },
          { question: "Why use Stratified K-Fold for imbalanced data?", options: ["It's faster", "Ensures each fold has the same class distribution as the full dataset", "It reduces overfitting", "It increases accuracy"], answer: 1, explanation: "Without stratification, some folds might contain very few (or zero) minority class samples, giving unreliable performance estimates." },
          { question: "How often should you use the test set?", options: ["Every experiment", "Once — only for final evaluation", "For hyperparameter tuning", "Never"], answer: 1, explanation: "The test set should be used only once at the very end. Using it for tuning or repeated evaluation would bias your performance estimate." },
          { question: "What is the trade-off of increasing K in K-Fold?", options: ["No trade-off", "More reliable estimate but more expensive computation", "Less reliable estimate", "Faster training"], answer: 1, explanation: "Higher K means more training iterations (each using more data) giving a better estimate, but at K times the computational cost." },
          { question: "Why must you NOT shuffle time series data for cross-validation?", options: ["Shuffling is always fine", "Shuffling allows future data to leak into training, giving unrealistically high performance", "Shuffling is too slow", "Time series can't be split"], answer: 1, explanation: "Shuffling destroys temporal ordering. In production, you can never train on future data. Time Series Split ensures training only uses past data." },
          { question: "🏢 Knowledge Check: Why does Renaissance Technologies (Medallion Fund, 66% return/year) use walk-forward CV instead of K-Fold?", options: ["K-Fold too slow", "Because financial data has temporal autocorrelation and regime changes — walk-forward accurately simulates trading reality, while K-Fold causes data leakage across time", "Tradition", "Saves RAM"], answer: 1, explanation: "Trading models trade based only on past data. K-Fold lets the model 'see' future patterns in other folds → great backtest but live losses. Walk-forward (expanding window) correctly simulates: train on past → test next period → roll forward." },
          { question: "🏢 Knowledge Check: When is Stratified K-Fold most important, based on the Kaggle Credit Card Fraud case study (492 frauds / 284,807 transactions)?", options: ["When data is balanced", "When extremely imbalanced (0.17% positive) — random splits may produce folds containing zero frauds, making metrics unreliable", "When data is small", "When there are many features"], answer: 1, explanation: "With a 0.17% positive class, random K-Fold (K=10) may yield folds with 0-3 frauds — F1 variance becomes extremely high. Stratified K-Fold ensures each fold has the same class ratio, reducing CV variance from ±0.15 to ±0.02." },
          { question: "🏢 Knowledge Check: Nested Cross-Validation costs 100x more compute — when is it actually necessary?", options: ["Always", "When you need an unbiased estimate of model performance AND tune hyperparameters simultaneously (e.g., medical research, regulatory submissions)", "When data is large", "When you need speed"], answer: 1, explanation: "Standard K-Fold tuning leaks hyperparameter selection bias into the CV score. Nested CV (outer loop: estimate, inner loop: tune) provides an unbiased estimate. Required for FDA submissions and academic papers — not needed for prototyping." }
        ]
      }
    ]
  },
  {
    id: "ml-hyperparameter",
    title: "Hyperparameter Tuning",
    titleEn: "Hyperparameter Tuning",
    icon: "🎛️",
    color: "from-teal-500 to-cyan-600",
    description: "Grid Search, Random Search, Bayesian Optimization",
    descriptionEn: "Grid Search, Random Search, Bayesian Optimization",
    course: "ml",
    lessons: [
      {
        id: "ml-hp-1", title: "Grid & Random Search", titleEn: "Grid & Random Search",
        level: 3, difficulty: "intermediate",
        theory: `## 1. 🚦 Vấn đề đời thường

Nấu phở: nước dùng ninh **mấy giờ?**, cho **bao nhiêu** muối?, lửa **lớn hay nhỏ?** — mỗi tổ hợp ra một vị khác nhau. Nếu thử từng tổ hợp cho hết: thầy hết nồi trước khi tìm ra công thức ngon nhất.

Trong ML, **hyperparameter** chính là "muối, lửa, thời gian" — bạn chọn trước khi train, không học từ data. **Tuning** = tìm tổ hợp ngon nhất.

## 2. 💡 Khái niệm chính

- **Parameter**: model học được (weights). Hyperparameter: bạn chọn (learning_rate, n_estimators, max_depth).
- **Grid Search**: thử mọi tổ hợp — chắc chắn nhưng đắt.
- **Random Search**: bốc thăm — thường tốt hơn Grid khi nhiều hyperparameter.
- **Bayesian Optimization** (Optuna, Hyperopt): học từ lần thử trước để chọn lần sau thông minh hơn.

## 3. 🧰 So sánh nhanh

| Phương pháp | Số lần thử | Khi nào dùng |
|---|---|---|
| Grid Search | $K^N$ tổ hợp | ≤3 hyperparameter, mỗi cái ≤4 giá trị |
| Random Search | Tự chọn (ví dụ 50) | Nhiều hyperparameter |
| Bayesian (Optuna) | 30-100 đủ | Train đắt, muốn tối ưu thật |

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import RandomizedSearchCV
import numpy as np

param_dist = {
    "n_estimators": [100, 200, 500],
    "max_depth":    [None, 10, 20, 30],
    "min_samples_split": np.arange(2, 11),
    "max_features": ["sqrt", "log2"],
}
search = RandomizedSearchCV(
    RandomForestClassifier(random_state=42),
    param_distributions=param_dist,
    n_iter=30, cv=5, n_jobs=-1, scoring="f1", random_state=42
)
search.fit(X_train, y_train)
print(search.best_params_, search.best_score_)
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Tune trên test set** → leak! Luôn tune trên train+CV, đánh giá cuối trên test.
> - **Grid quá rộng**: 5 hp × 5 giá trị = 3125 combo × CV 5 = 15.625 fit → nửa ngày.
> - **Quên seed** → kết quả không tái lập được.
> - **Tune trước khi feature engineering** → ép model "cứu" data tệ.
> - **Chỉ nhìn best_score**: cần xem **độ chênh giữa CV folds** (cao = không ổn định).

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - **Thứ tự ưu tiên**: data sạch → feature → model phù hợp → **mới tune**. Tune cuối cùng, không phải đầu tiên.
> - Bắt đầu **Random Search 20-30 lần** để có baseline → nếu cần chính xác hơn, chuyển sang **Optuna**.
> - Dùng **early stopping** với XGBoost/LightGBM để tự động cắt khi không cải thiện.
> - Log mọi trial vào **MLflow / Weights & Biases** — đừng ghi tay vào Excel.
> - Tune trên **subset** trước (10% data) để biết khoảng nào hợp, rồi mới tune full.

## 7. 🤔 Khi nào dùng / không dùng

| Cần tune | Tạm chưa cần |
|---|---|
| Đã sạch data, chọn đúng model | Baseline đầu tiên |
| Cần đẩy từ 0.85 → 0.88 | Đang gap 0.5 → 0.8 (lo data trước) |
| Train < 1h/lần | Train mất 1 tuần (cân nhắc kỹ) |

## 8. 📌 Tóm tắt 30 giây

Hyperparameter = muối/lửa/thời gian, bạn chọn trước khi train. Random Search > Grid Search trong hầu hết trường hợp. Bayesian (Optuna) khi train đắt. Luôn tune trên CV, không trên test. Tune là **bước cuối**, không phải đầu.
`,
        theoryEn: `**Hyperparameter Tuning**

**Grid Search:** Try all combinations. Exhaustive but exponentially expensive (5 params × 5 values = 3125 combos).

**Random Search:** Random N combinations. Tests more unique values per dimension — often finds better results faster.

**Bayesian Optimization:** Uses surrogate model of past results to guide search. Balances exploration vs exploitation. Tools: Optuna, Hyperopt, W&B.

**Early Stopping (Hyperband/ASHA):** Stop bad configurations early, reallocate resources to promising ones.

**Best Practice:** Random → narrow with Grid/Bayesian. Use CV. Log experiments. Tune impactful params first. Use log-scale for learning rates.`,
        code: "import numpy as np\n\ndef evaluate_model(X, y, k_neighbors, metric='euclidean'):\n    \"\"\"Simple KNN evaluation with cross-val\"\"\"\n    np.random.seed(42)\n    indices = np.random.permutation(len(X))\n    split = int(0.8 * len(X))\n    X_train, X_test = X[indices[:split]], X[indices[split:]]\n    y_train, y_test = y[indices[:split]], y[indices[split:]]\n\n    preds = []\n    for x in X_test:\n        if metric == 'manhattan':\n            dists = np.sum(np.abs(X_train - x), axis=1)\n        else:\n            dists = np.linalg.norm(X_train - x, axis=1)\n        nearest = y_train[np.argsort(dists)[:k_neighbors]]\n        preds.append(np.bincount(nearest.astype(int)).argmax())\n    return np.mean(np.array(preds) == y_test)\n\nnp.random.seed(42)\nX = np.random.randn(200, 3)\ny = ((X[:, 0]**2 + X[:, 1]) > 0.5).astype(int)\n\n# Grid Search\nprint('Grid Search:')\nparam_grid = {'k': [1, 3, 5, 7, 9, 11], 'metric': ['euclidean', 'manhattan']}\nbest_score, best_params = 0, {}\nfor k in param_grid['k']:\n    for m in param_grid['metric']:\n        score = evaluate_model(X, y, k, m)\n        if score > best_score:\n            best_score, best_params = score, {'k': k, 'metric': m}\n        print(f'  k={k:2d}, metric={m:10s} -> {score:.2%}')\nprint(f'Best: {best_params} -> {best_score:.2%}')\n\n# Random Search\nprint('\\nRandom Search (10 trials):')\nfor trial in range(10):\n    k = np.random.choice([1,3,5,7,9,11,15,21])\n    m = np.random.choice(['euclidean', 'manhattan'])\n    score = evaluate_model(X, y, k, m)\n    print(f'  Trial {trial+1}: k={k:2d}, metric={m:10s} -> {score:.2%}')",
        codeLanguage: "python",
        exercise: "Implement simple Bayesian Optimization: use previous results to prioritize promising parameter regions.",
        exerciseEn: "Implement simple Bayesian Optimization: use previous results to prioritize promising parameter regions.",
        quiz: [
          { question: "When is Random Search better than Grid Search?", options: ["Few hyperparameters", "Many hyperparameters where Grid Search becomes exponentially expensive", "Only 1 hyperparameter", "Never"], answer: 1, explanation: "With many hyperparameters, grid search tries every combination (exponential cost), while random search explores efficiently and often finds near-optimal solutions in fewer trials." },
          { question: "What does Bayesian Optimization use to select the next trial?", options: ["Random selection", "Results from previous trials to build a model of the objective function", "Grid ordering", "Alphabetical order"], answer: 1, explanation: "Bayesian Optimization builds a surrogate model (usually Gaussian Process) from past results, then uses it to intelligently choose the next point to evaluate." },
          { question: "Why use cross-validation inside hyperparameter search?", options: ["It's faster", "To get a reliable performance estimate for each configuration", "To increase training data", "Convention only"], answer: 1, explanation: "Without CV, the score for each hyperparameter configuration could be misleading due to a lucky/unlucky train-test split." },
          { question: "What's the risk of tuning too many hyperparameters?", options: ["No risk", "Overfitting to the validation set (finding a lucky combination)", "Makes the model simpler", "Reduces accuracy"], answer: 1, explanation: "Searching over many hyperparameters increases the chance of finding a combination that works well on validation by luck, not because it generalizes well." },
          { question: "What tool is commonly used for Bayesian hyperparameter optimization?", options: ["NumPy", "Optuna", "Pandas", "Matplotlib"], answer: 1, explanation: "Optuna is a popular, state-of-the-art hyperparameter optimization framework that uses Bayesian optimization (TPE sampler) to efficiently search parameter spaces." },
          { question: "Why should learning rates be searched on a log scale?", options: ["Convention", "The impact of learning rate changes is multiplicative — 0.001 vs 0.01 is more important than 0.01 vs 0.02", "Log scale is faster", "It doesn't matter"], answer: 1, explanation: "Learning rate effects are multiplicative: the difference between 0.001 and 0.01 (10x) matters much more than 0.01 and 0.02 (2x). Log-uniform sampling reflects this." },
          { question: "🏢 Knowledge Check: OpenAI GPT-3 ($4.6M training run) — how did they tune hyperparameters before committing to the full training?", options: ["Trial and error on the full model", "Train thousands of small models (125M params) to find optimal lr and batch size, then scale up using Chinchilla scaling laws (compute-optimal)", "Random search on the 175B model", "Copy from another paper"], answer: 1, explanation: "A $4.6M full training run leaves no room for trial-and-error. OpenAI tuned on proxy models (1000x smaller), then extrapolated hyperparameters via power laws. Chinchilla (DeepMind 2022) later showed GPT-3 was actually under-trained — optimal would be 4x fewer params + 4x more data." },
          { question: "🏢 Knowledge Check: Why does Google Vizier (Bayesian Optimization) save 10x compute compared to Grid Search in production tuning?", options: ["Bayesian is cheaper", "Because Vizier uses a Gaussian Process to learn from previous trials, focusing on promising regions instead of exhaustive search — ideal for expensive objectives (training neural networks)", "Google has TPUs", "Optimized code"], answer: 1, explanation: "Grid search wastes compute on bad regions. Vizier models the objective with a GP, using acquisition functions (UCB, EI) to pick the next trial. At Google, Vizier tunes AutoML and dialog systems — 10-100x more sample-efficient than random/grid search." },
          { question: "🏢 Knowledge Check: Hyperparameter tuning has a 'reverse importance' problem — what was the example from Bergstra & Bengio (2012)?", options: ["All params are equally important", "Only ~3 hyperparameters truly matter (lr, batch size, regularization) — grid search wastes 90% of compute on unimportant params, while random search is more efficient", "Need to tune all 50+ params", "Importance is random"], answer: 1, explanation: "The Bergstra paper is a landmark: 9-D grid search with 3^9=19683 trials only slightly outperformed random search with 27 trials. Because only a few params dominate, random search covers the effective space better. This is why Random Search is recommended as a baseline." }
        ]
      }
    ]
  },
  {
    id: "ml-eval-metrics",
    title: "Model Evaluation",
    titleEn: "Model Evaluation",
    icon: "📊",
    color: "from-teal-500 to-cyan-600",
    description: "Confusion Matrix, ROC, Bias-Variance",
    descriptionEn: "Confusion Matrix, ROC, Bias-Variance",
    course: "ml",
    lessons: [
      {
        id: "ml-eval-1", title: "Evaluation Metrics", titleEn: "Evaluation Metrics",
        level: 3, difficulty: "intermediate",
        theory: `## 1. 🚦 Vấn đề đời thường

Mô hình phát hiện ung thư đạt **accuracy 99%** — nghe có vẻ tuyệt. Nhưng nếu chỉ 1% bệnh nhân thực sự bị ung thư, model **đoán "không bị" cho mọi người** cũng đạt 99%. Đây là lý do **accuracy nói dối** với data lệch — phải dùng **đúng metric**.

## 2. 💡 Confusion Matrix — gốc rễ mọi metric

|  | Dự đoán: Có | Dự đoán: Không |
|---|---|---|
| **Thực: Có** | TP (đúng) | FN (bỏ sót) |
| **Thực: Không** | FP (báo nhầm) | TN (đúng) |

Từ 4 ô này sinh ra mọi metric quan trọng.

## 3. 🎯 Các metric phải nhớ

| Metric | Công thức | Ý nghĩa | Khi quan trọng |
|--------|-----------|---------|----------------|
| **Accuracy** | (TP+TN)/all | Đoán đúng bao nhiêu % | Data cân bằng |
| **Precision** | TP/(TP+FP) | Báo "có" thì đúng bao nhiêu % | Spam (đừng báo nhầm mail thật) |
| **Recall** | TP/(TP+FN) | Bắt được bao nhiêu ca thật | Ung thư (đừng bỏ sót) |
| **F1** | 2·P·R/(P+R) | Trung bình điều hoà | Cần cân bằng P và R |
| **AUC-ROC** | Diện tích | Khả năng phân biệt | So sánh nhiều model |

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`python
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
import numpy as np

y_true = np.array([0,0,0,0,0,0,0,0,1,1])
y_pred = np.array([0,0,0,0,0,0,0,0,0,1])  # Bỏ sót 1 ca dương

print(confusion_matrix(y_true, y_pred))
print(classification_report(y_true, y_pred, digits=3))
\`\`\`

Recall của class 1 = 0.5 → bỏ sót một nửa ca bệnh, dù accuracy = 90%.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Dùng **accuracy** cho data imbalance 99/1 → model đoán toàn class lớn vẫn được 99% → vô dụng. Luôn xem **classification_report** đầy đủ.

- Tối ưu Precision **mà quên Recall** trong y tế → chết người.
- Tối ưu Recall **mà quên Precision** trong spam filter → mail thật vào junk.
- Báo F1 mà data multi-class không nói rõ \`macro\` hay \`weighted\` → so sánh sai.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:** Trước khi train, hỏi 1 câu: **"FP đắt hơn hay FN đắt hơn?"** Câu trả lời quyết định bạn tối ưu Precision hay Recall.

- Phân loại nhị phân → luôn nhìn cả **ROC-AUC** và **PR-AUC** (PR-AUC nhạy hơn với class hiếm).
- Vẽ **confusion matrix heatmap** → hiểu lỗi ở đâu.
- Điều chỉnh **threshold** (mặc định 0.5) để cân bằng P/R theo nhu cầu nghiệp vụ.

## 7. 🤔 Chọn metric theo bài toán

- **Spam / fraud**: Precision cao (đừng làm phiền user thật).
- **Y tế / an ninh**: Recall cao (đừng bỏ sót).
- **Recommend system**: NDCG, MAP@k.
- **Hồi quy**: MAE (dễ giải thích), RMSE (phạt lỗi lớn), R² (so sánh model).

## 8. 📌 Tóm tắt 30 giây

Đừng tin Accuracy khi data lệch. Confusion Matrix là gốc → từ đó suy ra **Precision (đừng báo nhầm)**, **Recall (đừng bỏ sót)**, **F1 (cân bằng)**. Chọn metric theo câu hỏi: **FP hay FN đắt hơn?** Và luôn report metric kèm threshold/average mode.
`,
        theoryEn: `**Model Evaluation — Beyond Accuracy**

**Confusion Matrix:** TP, TN, FP, FN. Foundation for all classification metrics.

**Key Metrics:** Accuracy (balanced only), Precision (FP costly), Recall (FN costly), F1 (imbalanced), F-beta (custom P/R weight), AUC-ROC (threshold-independent).

**ROC vs PR Curve:** ROC works for balanced data. PR curve is better for highly imbalanced datasets. AUC = ranking ability.

**Bias-Variance:** Total Error = Bias² + Variance + Irreducible. High bias = underfitting. High variance = overfitting. Diagnose with learning curves.

**Choose metric by scenario:** Cancer → Recall. Spam → Precision. Fraud → F1/F2. Balanced → Accuracy.

**Regression metrics:** MSE (penalizes large errors), RMSE (same units), MAE (robust), MAPE (relative), R² (% explained).`,
        code: "import numpy as np\n\ndef confusion_matrix(y_true, y_pred):\n    tp = sum((t == 1 and p == 1) for t, p in zip(y_true, y_pred))\n    tn = sum((t == 0 and p == 0) for t, p in zip(y_true, y_pred))\n    fp = sum((t == 0 and p == 1) for t, p in zip(y_true, y_pred))\n    fn = sum((t == 1 and p == 0) for t, p in zip(y_true, y_pred))\n    return tp, tn, fp, fn\n\ndef classification_report(y_true, y_pred):\n    tp, tn, fp, fn = confusion_matrix(y_true, y_pred)\n    accuracy = (tp + tn) / len(y_true)\n    precision = tp / (tp + fp) if (tp + fp) > 0 else 0\n    recall = tp / (tp + fn) if (tp + fn) > 0 else 0\n    f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0\n\n    print('Confusion Matrix:')\n    print(f'  Predicted:  Pos  Neg')\n    print(f'  Actual Pos: {tp:3d}  {fn:3d}')\n    print(f'  Actual Neg: {fp:3d}  {tn:3d}')\n    print(f'\\nMetrics:')\n    print(f'  Accuracy:  {accuracy:.4f}')\n    print(f'  Precision: {precision:.4f}')\n    print(f'  Recall:    {recall:.4f}')\n    print(f'  F1 Score:  {f1:.4f}')\n\nnp.random.seed(42)\ny_true = np.array([1,1,1,1,1,0,0,0,0,0,1,1,0,0,1])\ny_pred = np.array([1,1,0,1,1,0,0,1,0,0,1,0,0,1,1])\n\nclassification_report(y_true, y_pred)",
        codeLanguage: "python",
        exercise: "Implement ROC curve: compute TPR, FPR at multiple thresholds and calculate AUC.",
        exerciseEn: "Implement ROC curve: compute TPR, FPR at multiple thresholds and calculate AUC.",
        quiz: [
          { question: "When is Recall more important than Precision?", options: ["When FP is dangerous", "When missing positive cases is very dangerous (medical, fraud)", "Always", "When data is balanced"], answer: 1, explanation: "Recall matters when false negatives are costly — missing a cancer diagnosis or fraud case is far worse than a false alarm." },
          { question: "What does AUC = 0.5 indicate?", options: ["Perfect model", "Model has no discriminative ability — same as random", "Model is overfitting", "Model needs more data"], answer: 1, explanation: "AUC = 0.5 means the model can't distinguish between positive and negative classes any better than random coin flipping." },
          { question: "What indicates overfitting?", options: ["Low training and test scores", "High training score but much lower test score", "Both scores are equal", "Low training score"], answer: 1, explanation: "A large gap between high training performance and low test performance indicates the model memorized training data but can't generalize." },
          { question: "Why is accuracy misleading for imbalanced data?", options: ["Accuracy is always reliable", "A model predicting only the majority class gets high accuracy without learning", "It's too hard to compute", "It doesn't work with binary data"], answer: 1, explanation: "With 99% negative data, a model that always predicts 'negative' gets 99% accuracy but catches zero positive cases — completely useless." },
          { question: "What do learning curves show?", options: ["Feature importance", "Training and validation performance vs training set size — diagnosing bias/variance", "Hyperparameter effects", "Test results"], answer: 1, explanation: "Learning curves plot performance against training set size. The gap between training and validation curves reveals variance; low overall scores reveal bias." },
          { question: "When should you use PR curve instead of ROC curve?", options: ["Always", "When the dataset is highly imbalanced — PR curve is more informative than ROC", "When you need probabilities", "Never"], answer: 1, explanation: "With highly imbalanced data (e.g., 99% negative), ROC can look deceptively good because FPR stays low even with many false positives. PR curve directly shows precision-recall trade-off." },
          { question: "🏢 Knowledge Check: Google Diabetic Retinopathy AI (2018) achieved AUC 0.97 in the lab but failed at Thailand clinics — why?", options: ["The model was hacked", "Lab images were high-quality (well-lit, focused), but Thailand clinic images were blurry/dim — the model rejected 21% of cases, forcing patients to return for re-screening, losing trust", "Servers too slow", "Out of funding"], answer: 1, explanation: "A classic case of 'evaluation metric ≠ deployment success'. AUC only measures discriminative power, not: image quality variance, workflow integration, or patient experience. Lesson: multi-dimensional metrics are needed (utility, fairness, robustness)." },
          { question: "🏢 Knowledge Check: At Spotify, why do they NOT use accuracy to evaluate Discover Weekly recommendations?", options: ["Accuracy is the best metric", "Because 'click-through rate' and 'long listen rate (>30s)' better reflect business value — accuracy on implicit feedback is meaningless", "Because Spotify uses SQL", "Because the law requires it"], answer: 1, explanation: "Recommendation systems have no 'right/wrong' ground truth. Spotify uses nested metrics: CTR (engagement), 30s listen (intent), saves (preference), repeat plays (loyalty). Each metric tracks a different business goal — A/B tested in parallel." },
          { question: "🏢 Knowledge Check: Bias-Variance trade-off in production: why does Netflix prefer high-bias models for new users (cold start)?", options: ["High variance is better", "Because new users have little data (n<10), high-variance models overfit severely — high-bias models (popularity-based) generalize better for cold start", "Cheaper models", "Netflix is frugal"], answer: 1, explanation: "Cold start = small n. With n=5 ratings, complex models (deep CF) have very high variance and predict randomly. Simple models (popular within the same demographic) have higher bias but lower variance → better. Netflix gradually shifts to complex models as user data grows." }
        ]
      }
    ]
  },
  {
    id: "ml-ensemble",
    title: "Ensemble Methods",
    titleEn: "Ensemble Methods",
    icon: "🤝",
    color: "from-teal-500 to-cyan-600",
    description: "Boosting, Stacking, XGBoost concepts",
    descriptionEn: "Boosting, Stacking, XGBoost concepts",
    course: "ml",
    lessons: [
      {
        id: "ml-ens-1", title: "Boosting & Stacking", titleEn: "Boosting & Stacking",
        level: 4, difficulty: "advanced",
        theory: `## 1. 🚦 Vấn đề đời thường

Đi khám bệnh, một bác sĩ nói "viêm họng" — bạn vẫn lo. Hỏi thêm 5 bác sĩ khác, **4/5 cùng nói viêm họng** — bạn yên tâm. Đó chính là **Ensemble Learning**: nhiều model "kém" hợp lại thành 1 model "khôn".

Boosting và Stacking là **2 cách hợp tác** mạnh nhất, đang thống trị Kaggle suốt 10 năm qua.

## 2. 💡 3 trường phái Ensemble

| Trường phái | Cách kết hợp | Đại diện |
|-------------|--------------|----------|
| **Bagging** | Train song song, lấy trung bình | Random Forest |
| **Boosting** | Train tuần tự, model sau **sửa lỗi** model trước | XGBoost, LightGBM, CatBoost |
| **Stacking** | Dùng model cuối **học cách kết hợp** các model trước | Meta-learner |

## 3. 🚀 Boosting hoạt động ra sao

1. Train cây 1 → có dự đoán + sai số.
2. Train cây 2 **tập trung vào mẫu cây 1 sai**.
3. Train cây 3 **tập trung vào mẫu cây 1+2 còn sai**.
4. … Lặp 100–1000 cây. Kết quả = tổng có trọng số.

Giống như học sinh **cày bài tập sai**, sau mỗi vòng tốt hơn.

## 4. 🎯 Ví dụ XGBoost chạy được ngay

\`\`\`python
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split

Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)

clf = XGBClassifier(
    n_estimators=500, max_depth=6, learning_rate=0.05,
    subsample=0.8, colsample_bytree=0.8,
    eval_metric="logloss", early_stopping_rounds=30,
)
clf.fit(Xtr, ytr, eval_set=[(Xte, yte)], verbose=False)
print("Acc:", clf.score(Xte, yte))
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** \`learning_rate=0.3\` (mặc định cũ) + \`n_estimators=1000\` → overfit nặng. Hãy giảm \`learning_rate=0.01–0.1\` và bù lại bằng \`n_estimators\` lớn + \`early_stopping\`.

- Stacking dùng cùng data train cho cả base + meta → leakage. Phải dùng **out-of-fold predictions**.
- Quên \`early_stopping_rounds\` → train 1.000 cây trong khi 200 cây đã tối ưu.
- So sánh XGBoost vs LightGBM trên dataset 10k dòng → khác biệt không có ý nghĩa thống kê.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:** **LightGBM** thường nhanh nhất (×3 XGBoost), **CatBoost** xử lý category tự động không cần OneHot, **XGBoost** ổn định nhất cho production. Tuỳ bài toán mà chọn.

- Bộ tham số khởi đầu an toàn: \`learning_rate=0.05\`, \`max_depth=6\`, \`subsample=0.8\`, \`colsample_bytree=0.8\`.
- Tune theo thứ tự: \`max_depth\` → \`min_child_weight\` → \`subsample\`/\`colsample\` → \`learning_rate\` cuối cùng.
- Stacking: 3–5 model **đa dạng** (LR + RF + XGBoost) → meta-learner đơn giản (Logistic).

## 7. 🤔 Khi nào dùng / không dùng

- ✅ Dataset tabular (CSV) — Boosting gần như **luôn thắng**.
- ✅ Cần explainability vừa đủ → SHAP values trên XGBoost.
- ❌ Ảnh, văn bản, audio → CNN/Transformer mạnh hơn.
- ❌ Real-time inference < 1ms → 500 cây là quá chậm, đổi sang Logistic + feature tốt.

## 8. 📌 Tóm tắt 30 giây

Ensemble = **đội nhóm thắng cá nhân**. Bagging giảm variance, Boosting giảm bias, Stacking học cách kết hợp. Cho data tabular → mặc định LightGBM/XGBoost với \`learning_rate=0.05\` + \`early_stopping\`. Đây là vũ khí "mặc định win" trên Kaggle và 80% bài toán doanh nghiệp.
`,
        theoryEn: `**Ensemble Methods — Combining Models**

**Bagging (parallel):** Random subsets, vote/average. Reduces variance. Example: Random Forest.

**Boosting (sequential):** Each model fixes previous errors. Reduces bias. AdaBoost (re-weight samples), Gradient Boosting (fit residuals).

**XGBoost:** Regularized gradient boosting — Kaggle king. Regularization, column sampling, handles missing values, parallel split-finding. Key params: n_estimators, learning_rate, max_depth, subsample, colsample.

**LightGBM:** Leaf-wise growth, GOSS, EFB. 20x faster. Great for large datasets. Handles categoricals natively.

**CatBoost:** Best categorical handling, ordered boosting, least overfitting out-of-box. Slowest.

**Stacking:** Diverse base models + meta-model combining predictions. Most complex but potentially best.

**Practical:** RF (baseline) → XGBoost/LightGBM (best) → Stacking (marginal gains).`,
        code: "import numpy as np\n\n# Simple AdaBoost implementation\nclass SimpleAdaBoost:\n    def __init__(self, n_estimators=5):\n        self.n_estimators = n_estimators\n        self.stumps = []\n        self.alphas = []\n\n    def _best_stump(self, X, y, weights):\n        best_err, best_feat, best_thresh, best_pol = float('inf'), 0, 0, 1\n        for feat in range(X.shape[1]):\n            for thresh in np.unique(X[:, feat]):\n                for polarity in [1, -1]:\n                    pred = np.ones(len(X))\n                    if polarity == 1:\n                        pred[X[:, feat] < thresh] = -1\n                    else:\n                        pred[X[:, feat] >= thresh] = -1\n                    err = np.sum(weights * (pred != y))\n                    if err < best_err:\n                        best_err, best_feat, best_thresh, best_pol = err, feat, thresh, polarity\n        return best_feat, best_thresh, best_pol, best_err\n\n    def fit(self, X, y_orig):\n        y = np.where(y_orig == 0, -1, 1)\n        weights = np.ones(len(X)) / len(X)\n\n        for t in range(self.n_estimators):\n            feat, thresh, pol, err = self._best_stump(X, y, weights)\n            err = max(err, 1e-10)\n            alpha = 0.5 * np.log((1 - err) / err)\n\n            pred = np.ones(len(X))\n            if pol == 1:\n                pred[X[:, feat] < thresh] = -1\n            else:\n                pred[X[:, feat] >= thresh] = -1\n\n            weights *= np.exp(-alpha * y * pred)\n            weights /= weights.sum()\n\n            self.stumps.append((feat, thresh, pol))\n            self.alphas.append(alpha)\n            print(f'  Stump {t+1}: feat={feat}, thresh={thresh:.2f}, alpha={alpha:.3f}, err={err:.4f}')\n\n    def predict(self, X):\n        final = np.zeros(len(X))\n        for (feat, thresh, pol), alpha in zip(self.stumps, self.alphas):\n            pred = np.ones(len(X))\n            if pol == 1:\n                pred[X[:, feat] < thresh] = -1\n            else:\n                pred[X[:, feat] >= thresh] = -1\n            final += alpha * pred\n        return (final >= 0).astype(int)\n\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = ((X[:, 0]**2 + X[:, 1]) > 0.5).astype(int)\n\nprint('Training AdaBoost:')\nada = SimpleAdaBoost(n_estimators=10)\nada.fit(X, y)\nacc = np.mean(ada.predict(X) == y)\nprint(f'\\nAccuracy: {acc:.2%}')",
        codeLanguage: "python",
        exercise: "Implement simple Gradient Boosting: fit residuals sequentially with learning rate.",
        exerciseEn: "Implement simple Gradient Boosting: fit residuals sequentially with learning rate.",
        quiz: [
          { question: "How does Boosting differ from Bagging?", options: ["They're the same", "Boosting trains sequentially (each model focuses on errors), Bagging trains in parallel on random subsets", "Boosting uses fewer models", "Bagging is always better"], answer: 1, explanation: "Boosting builds models sequentially, with each new model correcting the errors of the previous ensemble. Bagging trains independent models in parallel on random data subsets." },
          { question: "Why is XGBoost so popular for tabular data?", options: ["Simplest algorithm", "Regularization, speed optimizations, handles missing values, and consistently wins competitions", "Only works with tabular data", "It's a neural network"], answer: 1, explanation: "XGBoost combines regularized gradient boosting with engineering optimizations (parallel tree construction, cache-aware access, handling missing values), making it both accurate and fast." },
          { question: "What does each model in Gradient Boosting fit?", options: ["The original data", "The residuals (errors) of the current ensemble", "Random data", "The best features"], answer: 1, explanation: "Each new model in Gradient Boosting is trained to predict the residuals — the difference between the current ensemble's predictions and the actual targets." },
          { question: "What is Stacking?", options: ["Stack more data", "Train diverse models, then a meta-model learns to combine their predictions", "Use more layers", "Sequential boosting"], answer: 1, explanation: "Stacking uses a meta-learner to optimally combine predictions from diverse base models (e.g., SVM, RF, KNN), often achieving better results than any single model." },
          { question: "Which ensemble method is most prone to overfitting?", options: ["Bagging", "Boosting — because it keeps trying to fit remaining errors, including noise", "Stacking", "Voting"], answer: 1, explanation: "Boosting keeps adding models to fit remaining errors, but these 'errors' may include noise. Too many boosting iterations can overfit. Use early stopping to prevent this." },
          { question: "When should you use LightGBM over XGBoost?", options: ["Never", "For large datasets — LightGBM is much faster due to leaf-wise growth and GOSS", "For small datasets", "When you need interpretability"], answer: 1, explanation: "LightGBM's leaf-wise growth, GOSS, and EFB make it 10-20x faster than XGBoost on large datasets, with comparable or better accuracy. Best for datasets with 100K+ rows." },
          { question: "🏢 Knowledge Check: Why did XGBoost win 60% of Kaggle competitions from 2015-2018 for tabular data?", options: ["Because XGBoost is free", "Because it combines gradient boosting + L1/L2 regularization + native missing-value handling + tree pruning + parallel compute — a sweet spot for accuracy/speed on tabular data", "Trendy", "Easy to learn"], answer: 1, explanation: "Tianqi Chen (XGBoost creator) optimized 5 factors: (1) regularized objective to prevent overfitting, (2) sparse-aware splits for missing values, (3) weighted quantile sketch to reduce memory, (4) cache-aware prefetching, (5) out-of-core computation. An engineering masterpiece." },
          { question: "🏢 Knowledge Check: BloombergGPT (2023, $2.7M training) — how does it use ensembles in financial sentiment analysis?", options: ["A single model only", "Stack BloombergGPT + FinBERT + GPT-4 with a meta-learner — each model captures a different aspect (domain knowledge, general reasoning), reducing variance on rare events", "Random ensemble", "No ensemble used"], answer: 1, explanation: "Financial events (earnings surprises, Fed decisions) are rare and high-stakes. A single model fails unpredictably. Stacking with diverse base models (domain-specific + general) produces robust predictions. Trade-off: 3x inference cost, but each false signal could cost $millions." },
          { question: "🏢 Knowledge Check: Netflix Prize winners blended 100+ models — why did Netflix NOT deploy the final ensemble in production?", options: ["The winning model was too slow", "Because ensemble inference is too complex (100+ models, blend layer) for 100M users in real-time. Netflix only cherry-picked 2-3 ideas from the winning ensemble to integrate", "Contract ended", "Licensing too expensive"], answer: 1, explanation: "A classic engineering trade-off: research win ≠ production-ready. A 10% RMSE improvement isn't worth a 100x latency increase. Netflix learned: matrix factorization + temporal dynamics, deployed individually rather than the full ensemble. A lesson for every MLOps team." }
        ]
      }
    ]
  },
  {
    id: "ml-mlops",
    title: "MLOps & Deployment",
    titleEn: "MLOps & Deployment",
    icon: "🚀",
    color: "from-teal-500 to-cyan-600",
    description: "Model serving, monitoring, CI/CD for ML",
    descriptionEn: "Model serving, monitoring, CI/CD for ML",
    course: "ml",
    lessons: [
      {
        id: "ml-ops-1", title: "MLOps Pipeline", titleEn: "MLOps Pipeline",
        level: 5, difficulty: "advanced",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn nấu được nồi phở ngon trong bếp nhà. Nhưng để bán cho 1.000 khách/ngày ở chuỗi 5 chi nhánh, cần: công thức chuẩn (versioning), nguyên liệu sạch nhập đều (data pipeline), bếp công nghiệp (training infra), kiểm phẩm trước khi ra bàn (testing), và phải biết khi nào nồi nước hôm nay lạt hơn (monitoring).

**MLOps** = đưa "nồi phở model" từ bếp jupyter notebook ra production và **giữ nó ngon mãi**.

## 2. 💡 Khái niệm chính

MLOps = DevOps + Data + Model. 4 trụ cột:

1. **Versioning**: code (Git), data (DVC), model (MLflow Registry).
2. **CI/CD/CT**: Continuous Integration, Delivery, **Training** (retrain tự động).
3. **Serving**: REST/gRPC API, batch, edge.
4. **Monitoring**: drift, performance, latency.

## 3. 🧰 Vòng đời 6 bước

| Bước | Công cụ phổ biến |
|---|---|
| 1. Data ingestion | Airflow, dbt |
| 2. Feature store | Feast, Tecton |
| 3. Training | MLflow, Kubeflow |
| 4. Registry | MLflow Model Registry |
| 5. Serving | BentoML, KServe, SageMaker |
| 6. Monitoring | Evidently, WhyLabs, Prometheus |

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`python
import mlflow, mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier

mlflow.set_experiment("churn_v2")
with mlflow.start_run():
    model = RandomForestClassifier(n_estimators=200, max_depth=10)
    model.fit(X_train, y_train)
    f1 = evaluate(model, X_val, y_val)

    mlflow.log_param("n_estimators", 200)
    mlflow.log_metric("f1", f1)
    mlflow.sklearn.log_model(model, "model",
        registered_model_name="churn-classifier")  # tự động version
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Không version data** → 6 tháng sau không tái tạo được kết quả.
> - **Train-serve skew**: feature engineering ở train (pandas) khác serve (Java) → model "ảo giác".
> - **Không monitor data drift** → model giảm dần độ chính xác mà không ai biết, đến khi khách phàn nàn.
> - **Deploy bằng pickle** thẳng vào Flask, không có rollback → sự cố là bó tay.
> - **Retrain vô tội vạ** → tốn $$$ và có thể tệ hơn model cũ.

## 6. ✅ Best practice của thầy Hải

> 💡 **Mẹo:**
> - **Bắt đầu nhỏ**: Git + MLflow + 1 endpoint REST → đủ cho 90% startup.
> - **Shadow deployment**: model mới chạy song song, log dự đoán nhưng không trả về user — so với model cũ trước khi swap.
> - **Canary**: chuyển 5% traffic → 25% → 100% qua vài ngày.
> - **Feature Store** chỉ cần khi ≥3 model dùng chung feature, không thì over-engineering.
> - Định nghĩa **trigger retrain**: theo lịch (tuần/tháng), theo drift (PSI > 0.2), theo metric drop (F1 -5%).
> - Mỗi model phải có **model card**: ai owner, train ngày nào, data nào, metric bao nhiêu, fallback là gì.

## 7. 🤔 Khi nào dùng / không dùng

| Cần MLOps đầy đủ | Tạm chưa cần |
|---|---|
| ≥1 model đang chạy production | POC, hackathon |
| ≥2 data scientist trong team | 1 người làm cả end-to-end |
| Có SLA / khách hàng trả tiền | Demo nội bộ |

## 8. 📌 Tóm tắt 30 giây

MLOps = DevOps cho model + data. 4 trụ cột: version, CI/CD/CT, serving, monitoring. Bắt đầu nhỏ với Git + MLflow + 1 endpoint. Quan trọng nhất là **monitor drift** — model nào cũng "lão hoá", không monitor là chết âm thầm.
`,
        theoryEn: `**MLOps — DevOps for Machine Learning**

**Lifecycle:** Data → Features → Training → Registry → Serving → Monitoring → Retrain.

**Feature Store:** Centralized feature computation for training-serving consistency. Online (low-latency) + Offline (historical).

**Experiment Tracking:** Log hyperparameters, metrics, artifacts. Tools: MLflow, W&B.

**Serving Patterns:** REST API, gRPC, Batch, Edge, Serverless, Streaming. Optimize via quantization, pruning, distillation.

**Monitoring:** Data Drift (input distribution changes, PSI), Concept Drift (relationship changes), Model Decay (gradual performance drop). Monitor predictions, latency, business metrics.

**Maturity Levels:** Manual (0) → Pipeline (1) → CI/CD (2) → Full Automation (3).

**Best Practices:** Version everything, A/B testing, shadow mode, canary deployment, rollback plan, model cards, alert on everything.`,
        code: "import json\nfrom datetime import datetime\nimport numpy as np\n\nclass MLOpsSimulator:\n    def __init__(self, model_name, version):\n        self.model_name = model_name\n        self.version = version\n        self.metrics_log = []\n\n    def log_experiment(self, params, metrics):\n        experiment = {\n            'timestamp': datetime.now().isoformat(),\n            'model': self.model_name,\n            'version': self.version,\n            'params': params,\n            'metrics': metrics\n        }\n        self.metrics_log.append(experiment)\n        print(f'📊 Experiment logged: {json.dumps(experiment, indent=2)}')\n\n    def detect_drift(self, reference_data, current_data):\n        ref_mean = np.mean(reference_data)\n        cur_mean = np.mean(current_data)\n        drift_score = abs(ref_mean - cur_mean) / (np.std(reference_data) + 1e-7)\n        drifted = drift_score > 1.0\n        print(f'\\n🔍 Drift Detection:')\n        print(f'  Reference mean: {ref_mean:.4f}')\n        print(f'  Current mean: {cur_mean:.4f}')\n        print(f'  Drift score: {drift_score:.4f}')\n        print(f'  Status: {\"🚨 DRIFT DETECTED\" if drifted else \"✅ No significant drift\"}')\n        return drifted\n\n    def serve_prediction(self, input_data):\n        # Simulate model inference\n        prediction = np.mean(input_data) > 0.5\n        latency = np.random.uniform(5, 50)\n        print(f'  🔮 Prediction: {prediction} (latency: {latency:.1f}ms)')\n        return prediction\n\n# Demo\nops = MLOpsSimulator('customer_churn_v2', 'v2.1.0')\n\n# Log experiment\nops.log_experiment(\n    params={'n_estimators': 100, 'max_depth': 5, 'lr': 0.1},\n    metrics={'accuracy': 0.92, 'f1': 0.88, 'auc': 0.95}\n)\n\n# Check for drift\nnp.random.seed(42)\nref = np.random.randn(1000) * 1 + 5  # Training distribution\ncur = np.random.randn(1000) * 1.5 + 7  # Production distribution (shifted!)\nops.detect_drift(ref, cur)\n\n# Serve predictions\nprint('\\n🚀 Model Serving:')\nfor i in range(3):\n    ops.serve_prediction(np.random.randn(10))",
        codeLanguage: "python",
        exercise: "Add A/B testing: serve predictions from 2 model versions, compare performance metrics.",
        exerciseEn: "Add A/B testing: serve predictions from 2 model versions, compare performance metrics.",
        quiz: [
          { question: "What is Data Drift?", options: ["Model becomes faster", "The distribution of input data changes over time compared to training data", "Data gets deleted", "Model weights change"], answer: 1, explanation: "Data drift occurs when the statistical properties of production data differ from training data, potentially causing the model to make poor predictions." },
          { question: "Why is A/B testing important in MLOps?", options: ["It's faster", "It compares a new model against the current one in production to validate improvement", "It reduces data", "It's required by law"], answer: 1, explanation: "A/B testing splits production traffic between the old and new model, providing real-world evidence that the new model actually performs better before full deployment." },
          { question: "What should you version in MLOps?", options: ["Only code", "Everything: data, code, models, configs, and environments", "Only models", "Nothing"], answer: 1, explanation: "Versioning everything (data, code, models, configs, environments) ensures reproducibility — you can always recreate any past result or roll back to a working state." },
          { question: "What is the purpose of a Feature Store?", options: ["Store model weights", "Centralize feature computation for consistency between training and serving", "A database", "File storage"], answer: 1, explanation: "A Feature Store ensures the exact same features used during training are computed during serving, preventing training-serving skew — one of the most common production ML bugs." },
          { question: "When should you retrain a model in production?", options: ["Every day", "When monitoring detects data drift or performance degradation", "Never after deployment", "Only manually"], answer: 1, explanation: "Automated retraining should be triggered when monitoring detects significant data drift, concept drift, or performance degradation below acceptable thresholds." },
          { question: "What is shadow mode deployment?", options: ["Deploying at night", "Running the new model alongside the current one without affecting users, comparing outputs", "Hiding the model", "A testing framework"], answer: 1, explanation: "Shadow mode runs the new model in parallel with production, logging its predictions without serving them to users. You can compare outputs to validate before switching." },
          { question: "🏢 Knowledge Check: Why does Uber Michelangelo (MLOps platform) separate the 'feature store' from 'model serving'?", options: ["Easier to code", "Because the same feature engineering logic must be used consistently between training and serving — any difference causes 'training-serving skew' (model accuracy drops 10-30% in production)", "Required by AWS", "For security"], answer: 1, explanation: "Training-serving skew is the #1 problem in MLOps. If training computes 'avg_purchase_30d' via SQL batch but serving computes it via Python streaming, small differences (timezone, null handling) cause drift. Feature Stores (Tecton, Feast) provide a single source of truth for features." },
          { question: "🏢 Knowledge Check: Google's 'Hidden Technical Debt in ML Systems' (2015) — what % of a production codebase is actual ML code?", options: ["80%", "Only ~5% — the rest is data pipelines, monitoring, serving infra, configuration, and glue code. This is why MLOps matters more than pure ML", "50%", "100%"], answer: 1, explanation: "The Sculley et al. landmark paper: ML code (model.fit) is just the tip of the iceberg. 95% of effort is engineering: data validation, feature pipelines, A/B testing infra, monitoring, rollback systems. Lesson: hire ML engineers (full-stack) over pure data scientists for production teams." },
          { question: "🏢 Knowledge Check: Why does Stripe keep TWO models running in parallel (champion + challenger) for fraud detection?", options: ["To burn money", "Champion serves 99% of traffic (proven), challenger serves 1% (new model). Compare metrics weekly, promote challenger if it beats champion for 2 consecutive weeks — safe rollout with quick rollback", "Stripe is rich", "The law"], answer: 1, explanation: "The Champion-Challenger pattern is the gold standard for high-stakes ML. Stripe never replaces models wholesale — there's always canary deployment. If the challenger triggers a false positive spike (blocking legitimate transactions), traffic shifts back to champion within seconds." },
          { question: "🏢 Knowledge Check: Concept drift vs Data drift — what's a concrete example from Zillow Offers ($304M loss 2021)?", options: ["They are the same thing", "Data drift: house price distribution shifted (post-COVID inflation). Concept drift: the relationship between features and price changed (work-from-home → suburban premium). Both occurred together → model deprecated within weeks", "Only data drift", "Only concept drift"], answer: 1, explanation: "Zillow's Zestimate was trained on the pre-COVID era. After COVID: (1) data drift — prices rose 20% (input distribution shift), (2) concept drift — buyer preferences changed (suburban > urban, larger homes). A single model couldn't adapt → by the time it was detected, thousands of homes had been overpaid for." }
        ]
      }
    ]
  }
];
