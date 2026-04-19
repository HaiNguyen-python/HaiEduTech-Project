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
        theory: `**Linear Regression — Predicting Continuous Values**

Linear Regression is the simplest and most fundamental supervised learning algorithm. It models the relationship between a dependent variable (y) and one or more independent variables (X) by fitting a straight line. Despite its simplicity, it remains one of the most widely used algorithms in industry because of its interpretability and efficiency.

---

**📐 The Model:**

**Simple Linear Regression (1 feature):**
\`y = wx + b\`
- w (weight/slope): How much y changes when x increases by 1
- b (bias/intercept): The value of y when x = 0

**Multiple Linear Regression (multiple features):**
\`y = w₁x₁ + w₂x₂ + ... + wₙxₙ + b\`

In matrix notation: \`y = Xw + b\`, where X is the feature matrix (n samples × p features), w is the weight vector (p × 1), and b is the bias scalar.

**Geometric Interpretation:**
- In 2D (1 feature): the model is a line
- In 3D (2 features): the model is a plane
- In higher dimensions: the model is a hyperplane

---

**📏 Loss Function — Mean Squared Error (MSE):**

\`MSE = (1/n) × Σ(yᵢ - ŷᵢ)²\`

- Measures average squared difference between predictions and actual values
- Squaring penalizes large errors more heavily (a prediction off by 10 contributes 100 to the loss, while off by 1 contributes only 1)
- Always ≥ 0; MSE = 0 means perfect predictions
- Differentiable everywhere, making it suitable for optimization

**Why not use absolute error?** Mean Absolute Error (MAE = (1/n)Σ|y-ŷ|) is another option, but MSE has a smooth gradient everywhere (MAE has a discontinuity at 0), making optimization easier. However, MSE is more sensitive to outliers.

**Root Mean Squared Error (RMSE):** \`RMSE = √MSE\` — has the same units as the target variable, making it more interpretable.

---

**🎯 Training — Finding Optimal w and b:**

**Method 1: Closed-Form Solution (Normal Equation)**
\`w = (XᵀX)⁻¹Xᵀy\`
- Exact solution, no iteration needed
- Computationally expensive for large datasets (matrix inversion is O(n³))
- Requires XᵀX to be invertible (fails with multicollinearity)
- Best for small-to-medium datasets (< 10,000 features)

**Method 2: Gradient Descent**
Iteratively update w and b in the direction of steepest descent:
\`\`\`
w = w - lr × ∂MSE/∂w
b = b - lr × ∂MSE/∂b
\`\`\`

Where the gradient is:
\`\`\`
∂MSE/∂w = -(2/n) × Σ(yᵢ - ŷᵢ) × xᵢ
∂MSE/∂b = -(2/n) × Σ(yᵢ - ŷᵢ)
\`\`\`

**Gradient Descent Variants:**
- **Batch GD:** Uses all data per update. Smooth but slow for large datasets.
- **Stochastic GD (SGD):** Uses 1 sample per update. Noisy but fast. Can escape local minima.
- **Mini-Batch GD:** Uses a batch of 32-256 samples. Best of both worlds — most commonly used.

**Learning Rate (lr) — The Most Important Hyperparameter:**
- Too large → oscillation, may diverge (loss increases)
- Too small → very slow convergence
- Typical starting values: 0.01, 0.001
- Advanced: Learning rate scheduling (reduce lr over time), Adam optimizer (adaptive lr per parameter)

---

**📊 Evaluation Metrics:**

| Metric | Formula | Interpretation |
|--------|---------|---------------|
| MSE | (1/n)Σ(y-ŷ)² | Average squared error |
| RMSE | √MSE | Same units as y, more interpretable |
| MAE | (1/n)Σ|y-ŷ| | Average absolute error, robust to outliers |
| R² Score | 1 - SS_res/SS_tot | % variance explained (0-1) |
| Adjusted R² | 1 - (1-R²)(n-1)/(n-p-1) | R² penalized for number of features |

**R² Score Interpretation:**
- R² = 1.0 → Perfect predictions (suspicious — likely overfitting!)
- R² = 0.7-0.9 → Good model for most practical applications
- R² = 0.0 → Model is no better than predicting the mean
- R² < 0.0 → Model is worse than predicting the mean (something is wrong)

**Adjusted R²:** Always use this when comparing models with different numbers of features. Regular R² always increases when adding features (even useless ones). Adjusted R² penalizes unnecessary features.

---

**📋 Assumptions of Linear Regression:**

1. **Linearity:** Relationship between X and y is linear. *Check:* Residual vs fitted plot should show no pattern.
2. **Independence:** Observations are independent of each other. *Violation:* Time series data (use autoregressive models instead).
3. **Homoscedasticity:** Constant variance of residuals (residuals spread evenly). *Check:* Residual plot should show constant spread. *Fix:* Log transform the target.
4. **Normality:** Residuals are normally distributed. *Check:* Q-Q plot or Shapiro-Wilk test. *Important:* Only matters for statistical inference (confidence intervals), not for prediction.
5. **No multicollinearity:** Features are not highly correlated with each other. *Check:* VIF (Variance Inflation Factor). VIF > 10 indicates problematic collinearity. *Fix:* Remove one of the correlated features, use PCA, or use Ridge regression.

Violating these assumptions can lead to unreliable coefficients and predictions.

---

**🔧 Regularization — Preventing Overfitting:**

**Ridge Regression (L2):**
\`Loss = MSE + λ × Σwᵢ²\`
- Shrinks all weights toward zero but never to exactly zero
- Good when many features contribute a little each
- Handles multicollinearity well

**Lasso Regression (L1):**
\`Loss = MSE + λ × Σ|wᵢ|\`
- Can shrink weights to exactly zero → automatic feature selection
- Good when few features are truly important

**Elastic Net:**
\`Loss = MSE + λ₁ × Σ|wᵢ| + λ₂ × Σwᵢ²\`
- Combines L1 and L2 — best of both worlds

---

**🔧 When to Use Linear Regression:**
- Quick baseline model (always start here!)
- When the relationship is approximately linear
- When interpretability matters (coefficients have clear meaning)
- Feature importance analysis (which features affect the target most)
- When you need fast inference (milliseconds)
- **Do NOT use when:** Relationships are highly non-linear, data has complex interactions, or you need very high accuracy

---

## 🏢 Case Study: Zillow's Zestimate — Linear Regression at Scale (2006-2021)

Zillow's flagship product Zestimate ban đầu sử dụng **Linear Regression** (cùng các kỹ thuật hồi quy mở rộng) để định giá hơn 100 triệu căn nhà tại Mỹ. Mô hình dùng các đặc trưng cơ bản: diện tích, số phòng ngủ, vị trí, năm xây dựng. Median error ~5-7% — chấp nhận được nhờ tính **interpretability** (luật sư, môi giới, ngân hàng đều hiểu được).

**Bài học $304M:** Năm 2021, Zillow chuyển sang **Zillow Offers** (mua nhà thực tế dựa trên dự đoán mô hình). Linear Regression không bắt kịp biến động giá hậu COVID → công ty mất $304M, sa thải 25% nhân sự. Bài học: Linear Regression lý tưởng cho **dự báo (prediction)** chứ không phải **quyết định mua bán giá trị cao** trong thị trường biến động phi tuyến.

---

## 🏢 Case Study: Netflix Recommender — Ridge Regression (2006-2009)

Netflix Prize ($1M) — đội thắng cuộc "BellKor's Pragmatic Chaos" sử dụng **Ridge Regression** kết hợp với Matrix Factorization. Lý do chọn Ridge: dataset có 100 triệu ratings nhưng nhiều feature tương quan cao (multicollinearity giữa các bộ phim cùng thể loại). L2 regularization giúp mô hình **ổn định** mà không loại bỏ feature nào.

**RMSE giảm 10.06%** so với baseline Cinematch của Netflix → đủ để thắng giải. Đây là minh chứng kinh điển: với feature có structure rõ và yêu cầu interpretability + tốc độ, Linear models vẫn cạnh tranh được với deep learning trong nhiều bài toán production.

---

## 📋 Production Best Practices (từ Google, Uber)

✅ **Always start với Linear Regression** làm baseline trước khi thử mô hình phức tạp (Google Rules of ML, Rule #4: "Keep the first model simple")
✅ **Standardize features** trước khi dùng Ridge/Lasso — vì regularization phụ thuộc scale
✅ **Log-transform target** nếu phân phối lệch (giá nhà, doanh thu) — cải thiện R² 10-20%
✅ **Plot residuals vs fitted** sau training — phát hiện heteroscedasticity
✅ **VIF check** cho mỗi feature — VIF > 10 → loại bỏ hoặc dùng Ridge

---

## ⚠️ Anti-Patterns thường gặp

❌ Dùng R² làm metric duy nhất — R² cao có thể do overfitting (luôn check Adjusted R² + cross-validation)
❌ Bỏ qua kiểm tra **homoscedasticity** → coefficients không đáng tin cho inference
❌ Quên scale features khi dùng L1/L2 → một feature lớn (vd: salary tính bằng VND) sẽ át các feature nhỏ
❌ Thử Linear trên dữ liệu rõ ràng phi tuyến (image, text raw) → R² < 0.3, lãng phí thời gian
❌ Trust coefficients khi có multicollinearity — dấu (sign) có thể bị đảo ngược

---

## 🌉 Bridge to Next Lesson

Linear Regression giải bài toán **continuous prediction** (giá nhà, doanh thu). Nhưng nếu output là **categorical** (spam/ham, mua/không mua)? Ta không thể dự đoán xác suất bằng đường thẳng vô hạn. Bài tiếp theo: **Logistic Regression** — kéo output về khoảng [0,1] bằng hàm Sigmoid.`,
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
          { question: "🏢 Knowledge Check: Vì sao Zillow Offers (Zestimate) thất bại với khoản lỗ $304M năm 2021?", options: ["Vì dùng quá nhiều features", "Vì model linear regression không thích nghi kịp với market shift (post-COVID), training data không phản ánh real-time market dynamics", "Vì server quá chậm", "Vì đối thủ cạnh tranh"], answer: 1, explanation: "Zestimate được train trên historical data ổn định, nhưng thị trường nhà đất hậu COVID biến động cực mạnh (concept drift). Model không có cơ chế retrain real-time, dẫn đến mua nhà giá quá cao rồi không bán lại được." },
          { question: "🏢 Knowledge Check: Netflix Prize ($1M, 2009) — đội thắng đã dùng kỹ thuật chính nào liên quan đến Linear Regression?", options: ["Single deep neural network", "Ensemble + Ridge regression (L2) để combine 100+ models, tránh overfitting trên 100M ratings", "K-means clustering", "Decision trees đơn lẻ"], answer: 1, explanation: "Đội BellKor's Pragmatic Chaos đã blend hàng trăm mô hình bằng Ridge regression — L2 regularization giúp xử lý multicollinearity giữa các base models, đạt 10.06% improvement trên RMSE." },
          { question: "🏢 Knowledge Check: Trong production tại Uber/Lyft, vì sao Linear Regression vẫn được ưa dùng cho Surge Pricing dù có model phức tạp hơn?", options: ["Vì nó cho accuracy cao nhất", "Vì interpretability (giải thích được cho regulator), low latency (<10ms), và dễ debug khi anomaly xảy ra", "Vì rẻ hơn", "Vì developer không biết model khác"], answer: 1, explanation: "Surge pricing yêu cầu giải thích được với cơ quan quản lý (giá tăng vì cầu vượt cung). Linear coefficients cho phép audit trực tiếp. Latency phải <10ms để cập nhật giá real-time. Trade-off accuracy < explainability + speed." }
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
        theory: `**Logistic Regression — Binary Classification**

Despite its name, Logistic Regression is a **classification** algorithm, not regression. It predicts the probability that an input belongs to a particular class (0 or 1). It is the foundation for understanding neural networks and deep learning.

---

**📐 The Model:**

\`P(y=1|x) = σ(wx + b) = 1 / (1 + e^(-(wx+b)))\`

The **Sigmoid function** maps any real number to the range [0, 1], interpretable as a probability.

**Sigmoid Properties:**
- σ(0) = 0.5 (neutral — equal probability for both classes)
- σ(large positive) → 1 (confident positive)
- σ(large negative) → 0 (confident negative)
- Derivative: σ'(z) = σ(z) × (1 - σ(z)) — easy to compute, useful for gradient descent
- Symmetric: σ(-z) = 1 - σ(z)

**Decision Rule:** If P(y=1) ≥ 0.5, predict class 1; otherwise predict class 0.

**Decision Boundary:** The line/surface where P(y=1) = 0.5, i.e., wx + b = 0.
- In 2D: the boundary is a straight line
- In higher dimensions: a hyperplane
- Logistic Regression can ONLY create linear boundaries

---

**📏 Loss Function — Binary Cross-Entropy (BCE):**

\`L = -(1/n) × Σ[yᵢ·log(ŷᵢ) + (1-yᵢ)·log(1-ŷᵢ)]\`

**Intuition:**
- When y=1 and ŷ≈1: loss ≈ 0 (correct, confident — good!)
- When y=1 and ŷ≈0: loss → ∞ (wrong, confident → heavy penalty!)
- When y=0 and ŷ≈0: loss ≈ 0 (correct, confident — good!)
- When y=0 and ŷ≈1: loss → ∞ (wrong, confident → heavy penalty!)

**Why not use MSE for classification?** MSE with sigmoid creates a **non-convex** loss surface with many local minima, making gradient descent unreliable. Cross-entropy with sigmoid is **convex** — guaranteed single global minimum.

**Why not use accuracy as the loss?** Accuracy is not differentiable (it's a step function). We need a smooth, differentiable function for gradient-based optimization.

---

**📊 Evaluation Metrics for Classification:**

| Metric | Formula | When to Use |
|--------|---------|-------------|
| Accuracy | (TP+TN)/Total | Balanced classes only |
| Precision | TP/(TP+FP) | When FP is costly (spam filter, recommendation) |
| Recall (Sensitivity) | TP/(TP+FN) | When FN is costly (disease detection, fraud) |
| F1 Score | 2×P×R/(P+R) | Imbalanced classes |
| AUC-ROC | Area under ROC curve | Overall model quality, threshold-independent |
| Log Loss | -Σ[y·log(ŷ)+(1-y)·log(1-ŷ)] | When probability calibration matters |

**Confusion Matrix:**
\`\`\`
              Predicted
              Pos    Neg
Actual Pos    TP     FN   ← Type II error (missed positive)
Actual Neg    FP     TN   ← Type I error (false alarm)
\`\`\`

**Real-World Metric Selection:**
- **Cancer detection:** High Recall — missing a cancer case (FN) is far worse than a false alarm (FP)
- **Spam filter:** High Precision — marking a legitimate email as spam (FP) is very annoying
- **Credit card fraud:** Balance via F1 — both missing fraud (FN) and blocking legitimate transactions (FP) are costly

---

**🔧 Threshold Tuning:**

The default threshold of 0.5 isn't always optimal:
- **High threshold (e.g., 0.8):** More conservative — higher precision, lower recall
- **Low threshold (e.g., 0.3):** More permissive — higher recall, lower precision

**Precision-Recall Curve:** Plot precision vs recall at various thresholds. Choose the threshold that best fits your business need.

**ROC Curve:** Plot True Positive Rate (Recall) vs False Positive Rate at all thresholds. The area under the curve (AUC) measures overall model quality.

---

**⚖️ Handling Imbalanced Classes:**

When one class dominates (e.g., 99% negative, 1% positive):

1. **Class weights:** Increase the loss contribution of the minority class
\`\`\`python
LogisticRegression(class_weight='balanced')  # auto-adjust weights
\`\`\`

2. **Oversampling (SMOTE):** Generate synthetic minority samples
3. **Undersampling:** Remove majority class samples
4. **Threshold adjustment:** Lower the classification threshold

---

**📋 Multi-Class Extension:**

- **One-vs-Rest (OvR):** Train K binary classifiers, one per class. Each classifier separates one class from all others.
- **One-vs-One (OvO):** Train K(K-1)/2 classifiers, one per pair of classes.
- **Softmax Regression (Multinomial):** Extends logistic regression directly to K classes using softmax function:
  \`P(y=k|x) = e^(wₖx) / Σⱼ e^(wⱼx)\`

**Softmax vs Sigmoid:**
- Sigmoid: output per class is independent (can sum to > 1) — good for multi-label
- Softmax: outputs sum to exactly 1 — good for multi-class (mutually exclusive)

---

## 🏢 Case Study: Kaggle Titanic — Logistic Regression Baseline

Bài toán "ai sống sót trên Titanic" là dataset nổi tiếng nhất Kaggle (>15K submissions). **Logistic Regression** với 6 feature cơ bản (Sex, Age, Pclass, Fare, SibSp, Embarked) đạt **accuracy 78-80%** — vượt hơn 60% submissions sử dụng Random Forest hoặc XGBoost không tinh chỉnh kỹ. Lý do: dataset nhỏ (891 samples), feature interactions đơn giản → mô hình tuyến tính generalizes tốt hơn.

**Bài học:** Trong bối cảnh ít data + feature đã được engineer tốt, Logistic Regression thường đánh bại deep learning. Đây là lý do nó vẫn là **first-choice baseline** ở mọi data science team chuyên nghiệp.

---

## 🏢 Case Study: PayPal Fraud Detection — Logistic Regression Production (2010s)

PayPal dùng Logistic Regression để detect fraud transactions với volume **>4 tỷ transactions/quý**. Lý do chọn LogReg thay vì XGBoost/Neural Network:
- **Latency requirement <50ms** mỗi transaction → LogReg inference cực nhanh (1 phép nhân ma trận)
- **Interpretability cho compliance** — phải giải thích được vì sao block một transaction (luật EU PSD2)
- **Easy to update** — model retrained hourly với data mới
- Feature engineering bài bản (velocity features, graph-based features) → LogReg đạt AUC 0.92+

**Modern hybrid:** PayPal hiện kết hợp LogReg (first-stage filter, fast) với Gradient Boosted Trees (second-stage, high-accuracy) để cân bằng latency + accuracy.

---

## 🏢 Case Study: Stanford Diabetes Prediction (Pima Indians)

Dataset Pima Indians (768 samples, 8 features y khoa) — Logistic Regression đạt **accuracy 77%**, AUC 0.83. Coefficient analysis chỉ ra:
- **Glucose** (β = +0.035): tăng 1 mg/dL → odds bị tiểu đường tăng 3.5%
- **BMI** (β = +0.09): tăng 1 đơn vị → odds tăng 9.4%
- **Pregnancies** (β = +0.12): mỗi lần mang thai → odds tăng 12.7%

Bác sĩ có thể **giải thích từng yếu tố** cho bệnh nhân — điều mà XGBoost/Neural Net không thể làm. Đây là lý do Logistic Regression vẫn dominant trong **medical research, credit scoring, criminal justice**.

---

## 📊 Bảng so sánh: Logistic Regression vs alternatives

| Tiêu chí | Logistic Regression | Random Forest | Neural Network |
|---------|---------------------|---------------|----------------|
| Inference speed | <1ms | ~10ms | 10-100ms |
| Interpretability | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐ |
| Cần feature engineering | Cao | Thấp | Rất thấp |
| Hiệu quả với data nhỏ (<10K) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Calibrated probabilities | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ (cần Platt scaling) |
| Production ready (regulated) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

---

## ⚠️ Anti-Patterns

❌ Dùng **threshold mặc định 0.5** cho imbalanced data (vd: fraud chỉ 0.1%) — phải tune theo cost matrix
❌ Bỏ qua **calibration** — sigmoid output không phải xác suất thật nếu không calibrated (dùng Platt Scaling/Isotonic Regression)
❌ Dùng accuracy làm metric duy nhất khi imbalanced → 99% accuracy có thể tệ hơn predict tất cả "normal"
❌ Quên One-Hot encoding cho categorical features → mô hình hiểu sai (1, 2, 3 không có thứ tự)

---

## 🌉 Bridge to Next Lesson

Logistic Regression vẽ một **decision boundary tuyến tính** — tốt khi class tách bằng đường thẳng, nhưng thất bại với pattern phức tạp (XOR problem). Bài tiếp: **Decision Trees** — học các luật if/else linh hoạt, capture được boundary phi tuyến.`,
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
          { question: "How should you handle a dataset with 99% negative and 1% positive samples?", options: ["Use accuracy as metric", "Use class weights, SMOTE, or threshold adjustment to handle the imbalance", "Remove negative samples until balanced", "Ignore the imbalance"], answer: 1, explanation: "Imbalanced data needs special handling: class weighting, oversampling (SMOTE), or threshold tuning. Accuracy is misleading here (99% accuracy by always predicting negative)." }
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
        theory: `**Decision Trees — Intuitive Classification**

Decision Trees classify data by learning a series of if/else rules from the data. They're one of the most interpretable ML models — you can literally read the decision process. They are the foundation for powerful ensemble methods like Random Forests and Gradient Boosting.

---

**🌳 How It Works:**

1. Start with all data at the root
2. Find the best feature and threshold to split the data
3. Create two child nodes (left: condition true, right: condition false)
4. Repeat recursively until stopping criteria are met
5. Assign each leaf node the majority class of its samples

**Analogy:** It's like playing 20 Questions — each question splits the remaining possibilities into two groups. The best question is the one that gives the most information.

**Example Decision Tree for Loan Approval:**
\`\`\`
                    Income > 50K?
                   /            \\
                Yes              No
                 |                |
          Credit > 700?     Employment > 2yr?
           /      \\          /        \\
        Approve  Review   Review    Reject
\`\`\`

---

**📏 Splitting Criteria — How to Choose the Best Split:**

**Gini Impurity:**
\`G = 1 - Σ(pᵢ²)\`
- Measures how "mixed" a node is
- G = 0 → pure node (all samples belong to one class)
- G = 0.5 → maximally impure (binary classification, 50/50 split)
- Used by scikit-learn (default), CART algorithm
- Slightly faster to compute than entropy (no logarithm)

**Example:** A node with 70 positives and 30 negatives:
\`G = 1 - (0.7² + 0.3²) = 1 - (0.49 + 0.09) = 0.42\`

**Entropy (Information Entropy):**
\`H = -Σ(pᵢ × log₂(pᵢ))\`
- Information-theoretic measure of disorder/uncertainty
- H = 0 → pure node (no uncertainty)
- H = 1 → maximally impure (binary, 50/50 — maximum uncertainty)
- Used by ID3, C4.5 algorithms

**Example:** Same node (70/30):
\`H = -(0.7 × log₂(0.7) + 0.3 × log₂(0.3)) ≈ 0.88\`

**Information Gain:**
\`IG = H(parent) - Σ(|childᵢ|/|parent| × H(childᵢ))\`
- Measures how much impurity decreases after a split
- Best split = highest Information Gain
- The algorithm tries every possible feature and threshold, computing IG for each, then picks the best

**Gain Ratio (C4.5):**
Normalizes information gain by the split's own entropy, avoiding bias toward features with many unique values.

---

**✂️ Preventing Overfitting (Pruning):**

Decision trees without constraints will grow until each leaf is pure — memorizing the training data (overfitting). This is like memorizing exam answers instead of understanding the material.

**Pre-pruning (constraints during training):**
- \`max_depth\`: Limit tree depth (most important hyperparameter)
- \`min_samples_split\`: Minimum samples required to split a node (default 2)
- \`min_samples_leaf\`: Minimum samples required in each leaf node
- \`max_features\`: Random subset of features considered per split
- \`max_leaf_nodes\`: Maximum number of leaf nodes allowed

**Post-pruning (after growing full tree):**
- Grow the complete tree first, then remove nodes that don't improve validation performance
- **Cost-complexity pruning (CCP):** \`ccp_alpha\` in scikit-learn. Higher alpha = more aggressive pruning.
- **Reduced Error Pruning:** Remove each node if validation accuracy doesn't decrease

**How to choose max_depth?**
- Use cross-validation: try max_depth = [3, 5, 7, 10, 15, None]
- Plot training and validation accuracy vs max_depth
- Choose the depth where validation accuracy peaks

---

**📊 Feature Importance:**

Decision Trees naturally provide feature importance scores:
- **Impurity-based importance:** How much each feature reduces impurity across all splits
- Calculated as: total Gini decrease from splits using that feature, weighted by the proportion of samples
- **Limitation:** Biased toward features with many unique values (high cardinality)

---

**📋 Pros and Cons:**

| Pros | Cons |
|------|------|
| Highly interpretable (readable rules) | Prone to overfitting without pruning |
| No feature scaling needed | Unstable — small data changes → very different tree |
| Handles categorical & numerical features | Can create biased trees with imbalanced data |
| Fast inference (O(log n) depth) | Not great for complex, non-axis-aligned boundaries |
| Feature importance built-in | Greedy algorithm (locally optimal, not globally) |
| Handles missing values (some implementations) | High variance model |

**When to use Decision Trees:**
- When interpretability is critical (regulatory requirements, explainability)
- As a building block for ensemble methods (Random Forest, XGBoost)
- For quick prototyping and data exploration
- **Do NOT use alone** for production models with high accuracy requirements — use ensembles instead

---

## 🏢 Case Study: FICO Credit Score — Decision Trees in Banking (1989-nay)

FICO Score (300-850) ảnh hưởng đến >90% quyết định cho vay tại Mỹ. Mô hình gốc kết hợp **Decision Trees + Logistic Regression**. Lý do chọn Decision Trees:
- **Tuân thủ Fair Credit Reporting Act (FCRA)**: phải giải thích được lý do từ chối cho vay → tree có thể trace path từ root → leaf
- **No assumption về phân phối data** — credit history không tuân theo Gaussian
- **Handle missing values** tự nhiên — nhiều người không có credit history dài

**Hệ quả:** Khi consumer bị từ chối thẻ tín dụng, FICO gửi "Adverse Action Notice" liệt kê 4 yếu tố chính → đây chính là 4 splits đầu tiên của tree.

---

## 🏢 Case Study: IBM Watson Oncology Failure ($62M, 2018)

IBM Watson for Oncology dùng Decision Trees + NLP để gợi ý điều trị ung thư. **Thảm họa:** trees được train trên **synthetic data** từ Memorial Sloan Kettering (không phải dữ liệu thực), dẫn đến gợi ý "unsafe and incorrect" — vd: gợi ý drug gây xuất huyết cho bệnh nhân đang xuất huyết. MD Anderson Cancer Center hủy hợp đồng $62M.

**Bài học:** Decision Trees **memorize** training data — nếu train data biased/synthetic, tree sẽ tự tin sai. Luôn cần **clinical validation + pruning aggressive** cho high-stakes domains.

---

## 🏢 Case Study: Microsoft Kinect Body Pose (2011) — Random Decision Forests

Kinect's body pose recognition (chạy real-time trên Xbox 360, hardware yếu) dùng **ensemble of Decision Trees** — chính là Random Forest. Mỗi pixel được classify thành 1 trong 31 body parts qua ~20 trees, depth ~20. Inference: **5ms cho cả frame 640×480** trên CPU consumer.

**Tại sao trees thắng deep learning ở đây (2011)?** GPU consumer chưa đủ mạnh cho CNN real-time. Trees inference cực nhanh (chỉ traverse), parallelize được trên CPU multicore.

---

## 📋 Best Practices (từ scikit-learn maintainers)

✅ **Always set max_depth ≤ 10** cho production trees — ngoài đó là overfitting
✅ **min_samples_leaf ≥ 5%** total samples — tránh leaves dựa trên outliers
✅ **Visualize tree** với \`plot_tree()\` hoặc \`dtreeviz\` — debug logic
✅ **class_weight='balanced'** cho imbalanced data — tránh tree predict toàn class lớn
✅ **Cross-validate ccp_alpha** cho post-pruning — thường alpha ∈ [0.001, 0.05]

---

## ⚠️ Anti-Patterns

❌ Dùng single Decision Tree cho production (instability cao) — luôn dùng Random Forest/XGBoost
❌ Trust feature importance khi feature có **high cardinality** (zip codes, IDs) — bias mạnh về features có nhiều unique values
❌ Quên prune → tree có 10000 nodes, không generalize
❌ Dùng Decision Tree cho **regression với continuous target** mượt → bậc thang khó chấp nhận về mặt thẩm mỹ

---

## 🌉 Bridge to Next Lesson

Single Decision Tree dễ overfit và bất ổn. Giải pháp: **Random Forest** — train hàng trăm trees trên random subsets data, sau đó vote/average. Sức mạnh của ensemble!`,
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
          { question: "Why is a Decision Tree called a 'greedy' algorithm?", options: ["It uses all data", "It makes the locally best split at each step without considering the global optimum", "It's memory-hungry", "It trains quickly"], answer: 1, explanation: "At each node, the tree picks the best split for that node only, without considering whether a different split might lead to a better overall tree." }
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
        theory: `**Random Forest — The Power of Many Trees**

Random Forest = many Decision Trees voting together. It's one of the most reliable and widely-used ML algorithms, consistently producing strong results with minimal tuning. It addresses the single Decision Tree's biggest weakness: high variance.

---

**🎲 Bagging (Bootstrap Aggregating):**

The core idea: "Many weak learners together make a strong learner."

1. Create N bootstrap samples (random sampling **with replacement** from the training data)
   - Each bootstrap sample is the same size as the original data
   - On average, each sample contains ~63.2% of unique original data points (due to replacement)
   - The remaining ~36.8% are called Out-of-Bag (OOB) samples
2. Train one Decision Tree on each bootstrap sample
3. Combine predictions:
   - **Classification:** Majority vote (each tree gets one vote)
   - **Regression:** Average of all tree predictions

**Why it works (Variance Reduction):**
Each tree sees different data, so they learn slightly different patterns and make different errors. When combined, these errors tend to cancel out. Mathematically, if individual trees have variance σ² and correlation ρ:
\`Var(forest) = ρσ² + (1-ρ)σ²/N\`

The second term shrinks with more trees (N), so the key is keeping correlation (ρ) low — which is where random feature sampling comes in.

---

**🌿 Random Feature Sampling:**

At each split, only consider a random subset of features:
- **Classification:** √(n_features) — e.g., with 100 features, each split considers only 10
- **Regression:** n_features / 3

**Why?** Without this, all trees would look very similar — dominated by the same strong features. This high correlation between trees limits the variance reduction benefit. Random feature sampling ensures diversity:
- Tree 1 might split on income (feature 5)
- Tree 2 might split on age (feature 2)
- Tree 3 might split on education (feature 8)

Each tree captures different aspects of the data, making the ensemble more robust.

---

**📊 Key Hyperparameters:**

| Parameter | Effect | Typical Range | Guidelines |
|-----------|--------|--------------|------------|
| n_estimators | Number of trees | 100-1000 | More is usually better (diminishing returns after ~500) |
| max_depth | Tree depth limit | None, 10-30 | None for classification, limit for regression |
| max_features | Features per split | sqrt(n), n/3, log2(n) | sqrt for classification, n/3 for regression |
| min_samples_split | Min samples to split | 2-10 | Higher = more regularization |
| min_samples_leaf | Min samples in leaf | 1-5 | Higher = smoother predictions |
| bootstrap | Use bootstrapping? | True | False = use all data (pasting) |
| oob_score | Use OOB evaluation? | True | Free validation — no need for separate val set |

**Rule of thumb:** Start with defaults, then tune n_estimators (more is better) and max_features.

---

**🎯 Feature Importance:**

Random Forests naturally provide feature importance scores:

**1. Impurity-based (Mean Decrease Impurity - MDI):**
- How much each feature reduces impurity across all trees, averaged
- Fast to compute (calculated during training)
- **Limitation:** Biased toward high-cardinality features and correlated features

**2. Permutation-based (Mean Decrease Accuracy - MDA):**
- Randomly shuffle one feature, measure how much accuracy drops
- More reliable than impurity-based (no bias toward high cardinality)
- **Limitation:** Slower to compute (requires predictions on shuffled data)
- Can be computed on training or test data (test data preferred for unbiased estimate)

**3. SHAP values:**
- Game-theoretic approach to feature importance
- Provides per-prediction explanations (not just global importance)
- Computationally expensive but most theoretically sound

---

**📦 Out-of-Bag (OOB) Error:**

Each bootstrap sample leaves ~36.8% of data unused. These OOB samples serve as a free validation set:
- For each sample, average predictions from trees that did NOT train on it
- OOB error ≈ cross-validation error, but at no additional cost
- Use \`oob_score=True\` in scikit-learn

---

**📋 Pros and Cons:**

| Pros | Cons |
|------|------|
| Very accurate out-of-box (minimal tuning) | Less interpretable than single tree |
| Hard to overfit (with enough trees) | Slower than single tree (N trees) |
| Handles missing values (some impls) | Memory-intensive (stores all trees) |
| Built-in feature importance | Not great for very high-dimensional sparse data |
| Parallelizable (trees are independent) | Can be biased toward features with more levels |
| OOB error = free validation | Cannot extrapolate beyond training data range |

**When to use Random Forest:**
- Default first choice for tabular data (before trying XGBoost)
- When you need reliable predictions with minimal tuning
- When you need feature importance
- **Not ideal for:** Very large datasets (slow), streaming data, or when interpretability is critical

---

## 🏢 Case Study: Kaggle Competitions — Random Forest Era (2010-2014)

Trước khi XGBoost thống trị, **Random Forest** là vua các Kaggle competitions tabular data. Ví dụ:
- **Otto Group Product Classification (2015)**: Top 10% sử dụng RF với ~500 trees, đạt log-loss 0.45
- **Allstate Claim Prediction**: RF baseline đạt top 30% chỉ với feature engineering nhẹ
- **Microsoft Malware**: RF với 1000 trees được dùng trong winning solutions

Lý do thành công: RF là **"thuốc generic" của ML** — gần như không cần tune, chạy out-of-the-box, **rất khó overfit** nhờ randomness kép (bootstrap + feature subsampling).

---

## 🏢 Case Study: Twitter Spam Detection (2012)

Twitter dùng Random Forest để phát hiện spam accounts với feature: số follower, tỉ lệ follower/following, tần suất tweet, ratio @mentions, độ dài URL. Dataset: 500K accounts, ~5% spam.

**Kết quả:** Precision 0.99, Recall 0.95 — đủ để **block automatically** mà không cần human review. RF chạy **trên 200M accounts** mỗi ngày. Lý do RF thắng SVM/Neural Net: feature highly heterogeneous (numeric + counts + ratios), RF không cần normalize.

**Hạn chế:** RF **không adapt nhanh** với spam evolution — Twitter chuyển sang **online learning** (Vowpal Wabbit) sau 2014.

---

## 🏢 Case Study: Airbnb Search Ranking — Bagging Trees (2014-2017)

Airbnb dùng **Gradient Boosting + Bagging Trees** để rank search results. Họ phát hiện: đơn lẻ 1 tree biased về vị trí (top results luôn cùng style); 100 trees với bootstrap → diversity tăng → CTR tăng **5.6%** so với baseline.

**Bài học operational:** RF predictions có thể được **parallelized hoàn toàn** (mỗi tree độc lập) → scale horizontally trên Spark/Dask. Đây là lợi thế lớn so với Neural Net (sequential layers).

---

## 📊 Random Forest vs XGBoost vs Neural Net (tabular data)

| Aspect | Random Forest | XGBoost | Neural Net |
|--------|---------------|---------|------------|
| Training speed | Trung bình | Nhanh hơn (with GPU) | Chậm |
| Inference speed | Chậm (nhiều trees) | Nhanh | Nhanh |
| Hyperparameter tuning | Ít cần (~5 params) | Nhiều (~15 params) | Rất nhiều |
| Overfitting risk | Thấp | Trung bình (cần early stop) | Cao |
| Categorical features | Native | Cần encoding | Cần embedding |
| Missing values | Native | Native | Cần impute |
| Best for | Quick prototype, robust | Competitions, structured | Image, text, sequences |

---

## 📋 Production Best Practices

✅ **n_estimators = 100-500** thường đủ — thêm trees không làm tệ nhưng tốn memory
✅ **max_features = sqrt(p)** classification, **p/3** regression (default scikit-learn)
✅ **Use OOB score** thay cross-validation cho estimate nhanh
✅ **Permutation importance** thay vì Gini importance — chính xác hơn cho high-cardinality features
✅ **Save model với joblib** — serialize nhanh hơn pickle 5-10x

---

## ⚠️ Anti-Patterns

❌ Dùng RF cho dataset rất lớn (>10M rows) — training và inference đều chậm. Dùng LightGBM
❌ Train RF với **n_estimators = 10000** — diminishing returns, lãng phí RAM
❌ Quên kiểm tra **out-of-bag error** — đây là free validation set
❌ Trust Gini feature importance khi có high-cardinality feature — luôn double-check với SHAP

---

## 🌉 Bridge to Next Lesson

RF là **bagging** (parallel, reduce variance). Nhưng còn **boosting** (sequential, reduce bias) — mỗi tree sửa lỗi của tree trước. Đó là lý do XGBoost, LightGBM, CatBoost thống trị competitions hiện nay. Trước đó, ta cần hiểu một mô hình hoàn toàn khác: **SVM với kernel trick**.`,
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
          { question: "Can Random Forest extrapolate beyond training data range?", options: ["Yes, easily", "No — it can only predict values within the range of training targets", "Only with enough trees", "Only for regression"], answer: 1, explanation: "Random Forest predictions are averages of leaf values from training data, so they cannot predict values outside the training target range. This is a key limitation for regression." }
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
        theory: `**Support Vector Machines — Maximum Margin Classification**

SVM finds the optimal hyperplane that separates two classes with the **maximum margin** — the widest possible gap between classes. This principle of maximum margin gives SVM strong generalization ability.

---

**📐 Core Concepts:**

**Hyperplane:** A decision boundary that separates classes:
- In 2D: a line (w₁x₁ + w₂x₂ + b = 0)
- In 3D: a plane
- In n-D: a hyperplane

**Margin:** Distance from the hyperplane to the nearest data point on each side. The margin width is 2/||w||. SVM maximizes this margin for better generalization.

**Why maximize margin?** A wider margin means the model is more confident about its classification. Points near the boundary are the hardest to classify — by pushing the boundary as far as possible from all points, we get a more robust classifier.

**Support Vectors:** The data points closest to the hyperplane — they "support" and define the boundary. Key insight: only these points matter for the model. You could remove all other points and the boundary wouldn't change!

**Mathematical Formulation:**
\`\`\`
Minimize: (1/2)||w||²
Subject to: yᵢ(w·xᵢ + b) ≥ 1 for all i
\`\`\`
This is a convex optimization problem (quadratic objective, linear constraints) — guaranteed to find the global optimum.

---

**🔧 Hard vs Soft Margin:**

**Hard Margin SVM:**
- Requires **perfect separation** (no misclassification allowed)
- Fails if data is not linearly separable or has noise/outliers
- Extremely sensitive to outliers — a single noisy point can dramatically change the boundary

**Soft Margin SVM (C parameter):**
\`Minimize: (1/2)||w||² + C × Σξᵢ\`
where ξᵢ (slack variables) represent the degree of misclassification

- Allows some misclassification for a wider, more robust margin
- C controls the trade-off:
  - **High C (e.g., 1000):** "I hate misclassification" → narrow margin, few errors → risk of **overfitting** (fitting noise)
  - **Low C (e.g., 0.01):** "I prefer a wide margin" → wide margin, more errors allowed → better **generalization**
  - C = 0 → ignores data completely (useless)
  - C = ∞ → hard margin (no errors allowed)

**How to choose C?** Cross-validation! Try C = [0.001, 0.01, 0.1, 1, 10, 100, 1000].

---

**🎪 The Kernel Trick — The Magic of SVM:**

When data isn't linearly separable in its original space, the Kernel Trick maps it to a higher dimension where it IS separable.

**Example:** In 2D, points arranged in concentric circles cannot be separated by a line. But if we add a 3rd dimension z = x₁² + x₂², the circles lift into 3D where they CAN be separated by a plane.

| Kernel | Formula | Best For | Key Parameter |
|--------|---------|----------|---------------|
| Linear | K(x,y) = x·y | Linearly separable data, text (high-dim) | None |
| RBF/Gaussian | K(x,y) = exp(-γ‖x-y‖²) | Most common, works well generally | γ |
| Polynomial | K(x,y) = (x·y + c)^d | Polynomial relationships | degree d |
| Sigmoid | K(x,y) = tanh(αx·y + c) | Neural network approximation | α, c |

**The "trick":** You never actually compute in the higher dimension — the kernel function computes the dot product directly, saving enormous computation. This is called the "kernel trick" and it's what makes SVM practical for infinite-dimensional spaces.

**RBF γ (gamma) parameter:**
- **High γ → Tight influence radius:** Each point only affects nearby points → complex, wiggly boundary → risk of **overfitting**
- **Low γ → Broad influence radius:** Each point affects distant points → smooth, simple boundary → risk of **underfitting**
- **Typical range:** Try γ = [0.001, 0.01, 0.1, 1, 10]

**The C-γ Interaction:**
Both C and γ control model complexity. You should tune them together (Grid Search over C × γ grid). A common approach:
1. Coarse grid: C ∈ [0.1, 1, 10, 100], γ ∈ [0.01, 0.1, 1]
2. Fine grid around the best coarse result

---

**📊 SVM for Regression (SVR):**

SVM can also do regression! Instead of finding a margin with no points inside, SVR finds a tube of width ε that contains as many points as possible:
- Points inside the tube: no error
- Points outside: penalized by distance to the tube
- Parameter ε controls the tube width

---

**📋 SVM vs Other Models:**

| Aspect | SVM | Decision Tree | Logistic Regression | Neural Network |
|--------|-----|---------------|-------------------|----------------|
| Boundary | Maximum margin | Axis-aligned splits | Linear probability | Any shape |
| Interpretable | Moderate | High | High | Low |
| Feature scaling | **Required** | Not needed | Recommended | Required |
| Non-linear | Kernel trick | Natural splits | Feature engineering | Architecture |
| Large datasets | Slow (O(n²-n³)) | Fast | Fast | Fast (GPU) |
| Best for | Medium data, complex boundaries | Tabular data | Probabilistic output | Large data, complex patterns |

**When to use SVM:**
- Medium-sized datasets (1K-100K samples)
- When the decision boundary is complex
- High-dimensional data (text classification, genomics)
- When you need strong generalization guarantees
- **Not ideal for:** Very large datasets (slow), when probability outputs are needed (SVM gives distances, not probabilities), or when interpretability is critical

---

## 🏢 Case Study: NIST Handwritten Digits — SVM thắng Neural Net (1998)

Trước CNN deep learning, **SVM với RBF kernel** là state-of-the-art trên MNIST. Yann LeCun's LeNet-5 đạt 0.95% error rate năm 1998, nhưng **SVM với polynomial kernel đạt 0.56% error** (DeCoste & Schölkopf, 2002) — tốt hơn neural net cùng thời. Đây là lý do SVM dominate ML từ 1995-2010 trước khi deep learning bùng nổ với ImageNet 2012.

---

## 🏢 Case Study: Bioinformatics — Protein Classification

SVM là **default tool** cho protein structure prediction (Rost & Sander, 2000s). Dữ liệu: amino acid sequences (20 ký tự, độ dài 100-1000), output: 1 trong 1000+ protein family.

**Tại sao SVM thắng?** RBF kernel xử lý được high-dimensional + small sample size (chỉ vài nghìn proteins được labeled) — tình huống mà neural net overfit nghiêm trọng. SVM đạt **80-90% accuracy** trên SCOP database, vẫn dùng đến nay trong các pipeline UniProt.

---

## 🏢 Case Study: Spam Detection — SpamAssassin (2000s)

SpamAssassin (open-source spam filter dùng cho ~500M email accounts) sử dụng **Linear SVM** trên ~1000 features (word presence, header patterns, URL stats). Lý do chọn SVM thay Naive Bayes:
- **Robust với feature correlation** (nhiều spam keyword đi cùng nhau)
- **Maximum margin** → generalizes tốt với spam mới chưa thấy
- **Sparse weight vector** → fast inference (~10μs per email)

Accuracy: 99.9% precision, 95% recall sau khi tune ~1 năm.

---

## 📊 Kernel Selection Guide (kinh nghiệm thực chiến)

| Kernel | Khi nào dùng | Hyperparameters chính | Thời gian training |
|--------|--------------|----------------------|---------------------|
| Linear | Dữ liệu high-dimensional sparse (text, genomics) | C | Nhanh nhất O(n) |
| RBF (Gaussian) | Default cho small/medium dataset | C, γ | O(n²) - O(n³) |
| Polynomial | Khi nghi ngờ feature interactions bậc cao | C, degree, γ | O(n²) |
| Sigmoid | Hiếm dùng (như shallow neural net) | C, γ, coef0 | O(n²) |

**Rule of thumb (Hsu, Chang & Lin):** Bắt đầu với RBF, tune (C, γ) qua grid search, fallback Linear nếu dataset rất lớn.

---

## 📋 Best Practices

✅ **Always scale features** trước khi train SVM (StandardScaler hoặc MinMaxScaler)
✅ **Grid search C ∈ [0.1, 1, 10, 100]** và **γ ∈ [0.001, 0.01, 0.1, 1]** (log scale)
✅ **Class_weight='balanced'** cho imbalanced data
✅ **LinearSVC** cho dataset > 10K samples (nhanh hơn SVC nhiều lần)
✅ **CalibratedClassifierCV** wrapping SVM nếu cần probability output

---

## ⚠️ Anti-Patterns

❌ Dùng RBF kernel cho dataset > 100K samples → training vài giờ/ngày
❌ Quên scale features → kernel distance bị thống trị bởi feature lớn
❌ Lấy \`decision_function()\` làm probability — nó là signed distance, không phải xác suất
❌ Set C quá cao → overfitting; quá thấp → underfitting (luôn cross-validate)
❌ Dùng SVM cho image raw pixels — CNN tốt hơn nhiều lần

---

## 🌉 Bridge to Next Lesson

SVM, Logistic Regression, Decision Trees đều là **supervised** (cần labels). Nhưng phần lớn data thực tế **không có label** — image, customer behavior, transactions. Bài tiếp: **K-Means Clustering** — tìm structure ẩn không cần labels.`,
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
          { question: "What is the time complexity of SVM training?", options: ["O(n)", "O(n² to n³), making it slow for large datasets", "O(n log n)", "O(1)"], answer: 1, explanation: "SVM training involves solving a quadratic optimization problem, which scales as O(n²) to O(n³) depending on the solver, making it impractical for datasets with millions of samples." }
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
        theory: `**K-Means Clustering — Unsupervised Learning**

K-Means is the most popular unsupervised clustering algorithm. Unlike supervised learning, there are **no labels** — the algorithm discovers natural groupings in data. It partitions n data points into K clusters where each point belongs to the cluster with the nearest centroid.

---

**🔄 The Algorithm (Lloyd's Algorithm):**

1. **Initialize:** Choose K random centroids (or use K-Means++)
2. **Assign (E-step):** Each point → nearest centroid (Euclidean distance)
3. **Update (M-step):** Each centroid → mean of all assigned points
4. **Repeat** steps 2-3 until centroids stop moving (convergence) or max iterations reached

Typically converges in 10-50 iterations. The algorithm is guaranteed to converge, but may converge to a local minimum (not necessarily the global optimum).

**Convergence Proof:** Each step can only decrease (or maintain) the total within-cluster sum of squares (WCSS/inertia). Since WCSS is bounded below by 0, the algorithm must converge.

**Time Complexity:** O(n × K × d × I), where n = samples, K = clusters, d = dimensions, I = iterations. Very efficient!

---

**🎯 Choosing K (Number of Clusters):**

**1. Elbow Method:**
- Run K-Means for K = 1, 2, 3, ..., 10
- Plot K vs Inertia (sum of squared distances to centroids, aka WCSS)
- Look for the "elbow" — where adding more clusters gives diminishing returns
- **Limitation:** The elbow isn't always clear; subjective interpretation

**2. Silhouette Score:**
- Measures how similar a point is to its own cluster vs nearest other cluster
- For each point:
  - a = average distance to points in same cluster (cohesion)
  - b = average distance to points in nearest other cluster (separation)
  - s = (b - a) / max(a, b)
- Range: [-1, 1]. Higher is better.
  - s ≈ 1: Point is well-matched to its cluster
  - s ≈ 0: Point is on the boundary between clusters
  - s < 0: Point is probably in the wrong cluster!
- Plot average silhouette score for each K — choose the K with the highest score

**3. Gap Statistic:**
- Compares WCSS of your clustering against WCSS of random uniform data
- The optimal K is where the gap is largest
- More rigorous than elbow method but more computationally expensive

**4. Domain Knowledge:**
- Sometimes you know K from the business context
- E.g., customer segments: "We want 4 tiers: VIP, Regular, Occasional, Inactive"

---

**📋 Limitations and Solutions:**

| Limitation | Why It Happens | Solution |
|-----------|----------------|----------|
| Must choose K beforehand | K is a hyperparameter | Elbow, silhouette, gap statistic |
| Sensitive to initialization | Random centroids → different results | K-Means++ initialization |
| Assumes spherical clusters | Uses Euclidean distance | DBSCAN, GMM for non-spherical |
| Sensitive to outliers | Outliers pull centroids | Remove outliers first, or use K-Medoids |
| Only finds convex clusters | Can't handle ring/moon shapes | Spectral clustering, DBSCAN |
| Sensitive to feature scales | Large-range features dominate | Always standardize features first! |
| Equal-size cluster bias | Minimizes total WCSS | Use GMM for varying-size clusters |

---

**🔧 K-Means++ Initialization:**

The standard K-Means initialization (random centroids) can lead to poor results. K-Means++ provides a smarter initialization:

1. Choose first centroid randomly from data points
2. For each remaining centroid:
   - Compute D(x) = distance from each point to its nearest existing centroid
   - Choose next centroid with probability proportional to D(x)²
   - Points far from existing centroids are more likely to be chosen
3. This spreads centroids apart, avoiding poor initializations

**Result:** K-Means++ guarantees O(log K) competitive approximation ratio and is the default in scikit-learn.

---

**🔄 Variants of K-Means:**

**Mini-Batch K-Means:**
- Uses random mini-batches instead of full dataset for each update
- Much faster for large datasets (100K+ samples)
- Slightly lower quality but negligible difference in practice

**K-Medoids (PAM):**
- Uses actual data points as cluster centers (medoids) instead of means
- More robust to outliers
- Slower than K-Means (O(n²))

**Bisecting K-Means:**
- Start with 1 cluster, repeatedly split the worst cluster into 2
- Hierarchical approach, less sensitive to initialization

---

**📊 Applications:**

- **Customer segmentation** (marketing) — group customers by behavior for targeted campaigns
- **Image compression** (color quantization) — reduce colors by clustering pixel values
- **Document clustering** — group articles by topic
- **Anomaly detection** — points far from all centroids may be anomalies
- **Feature engineering** — use cluster membership as a new feature for supervised models
- **Data preprocessing** — initialize GMM parameters, find representative samples
- **Geographic clustering** — group locations for delivery route optimization

---

## 🏢 Case Study: Spotify Discover Weekly — User Clustering (2015-nay)

Spotify Discover Weekly (gửi cho 100M+ users mỗi thứ Hai) dùng **K-Means clustering** trên 250M users với feature: listening history, playlist composition, time-of-day patterns. K = 1000-2000 (lượng "taste profiles").

**Pipeline:**
1. Mỗi user → vector 1000 chiều (engagement với mỗi cluster nhạc)
2. K-Means group users với taste tương tự
3. Khi user A nghe bài mới → recommend cho users cùng cluster

**Kết quả:** Discover Weekly tạo ra **2.3 tỷ stream** từ song không quen thuộc trong 2 năm đầu — tăng monthly retention 30%. K-Means chạy hàng tuần trên Spark cluster, mỗi run ~6 giờ.

---

## 🏢 Case Study: Amazon Customer Segmentation — RFM + K-Means

Amazon segment customers bằng **Recency-Frequency-Monetary (RFM) + K-Means**:
- **R**: Bao lâu kể từ purchase gần nhất
- **F**: Số purchase trong 12 tháng qua
- **M**: Tổng tiền chi

K=8 cụm điển hình: "Champions", "Loyal Customers", "Big Spenders", "At Risk", "Lost", "New", "Promising", "Need Attention".

**Action:** Mỗi cluster nhận email campaign khác nhau. "At Risk" → discount 20%; "Champions" → early access. CTR tăng **2.8x** so với mass email.

---

## 🏢 Case Study: Netflix Image Personalization (2017)

Netflix phát hiện: cùng 1 phim, hiển thị **thumbnail khác nhau** cho user khác nhau → CTR tăng **20-30%**. Họ dùng K-Means để cluster users theo art preferences (colorful vs minimalist, character close-up vs scenery). Mỗi phim có 5-10 thumbnail variants, K-Means quyết định show variant nào cho cluster nào.

**Bài học:** Clustering không chỉ cho marketing — nó là **personalization engine** đằng sau hầu hết tech products.

---

## 📊 Choosing K — Methods Comparison

| Method | Cách dùng | Ưu điểm | Hạn chế |
|--------|-----------|---------|---------|
| Elbow Method | Plot inertia vs K, tìm "elbow" | Trực quan, đơn giản | Subjective, không có elbow rõ ràng |
| Silhouette Score | Max silhouette ∈ [-1, 1] | Định lượng, có ngưỡng | Tốn O(n²), chậm |
| Gap Statistic | So inertia với uniform random | Thống kê chặt chẽ | Phức tạp implement |
| Domain knowledge | Business yêu cầu (vd: 10 segments) | Actionable | Không tối ưu math |

**Best practice:** Combine 2-3 methods. Nếu Elbow tại K=5, Silhouette max tại K=5 → confidence cao.

---

## 📋 Best Practices

✅ **Always use K-Means++** initialization (default scikit-learn) — tránh local minima
✅ **n_init = 10** — chạy nhiều random init, pick best
✅ **Standardize features** — K-Means dùng Euclidean distance, scale matters
✅ **Visualize với t-SNE/UMAP** sau cluster để verify structure
✅ **Use MiniBatchKMeans** cho dataset > 100K samples — nhanh hơn 10-100x

---

## ⚠️ Anti-Patterns

❌ Dùng K-Means trên categorical features → distance không có nghĩa. Dùng K-Modes thay thế
❌ Không scale features → feature range lớn dominate clustering
❌ Pick K random — luôn dùng Elbow + Silhouette + business sense
❌ Trust K-Means trên data có **non-spherical clusters** (vd: 2 vòng đồng tâm) → DBSCAN tốt hơn
❌ Ignore outliers → 1 outlier xa có thể tạo "cluster" 1 phần tử

---

## 🌉 Bridge to Next Lesson

Clustering + Linear/Logistic/Trees đều phụ thuộc vào **chất lượng features**. Một feature xấu có thể phá hỏng mô hình tốt nhất. Bài tiếp: **Feature Engineering** — kỹ năng quan trọng nhất của data scientist (Andrew Ng nói: "Coming up with features is difficult, time-consuming, requires expert knowledge").`,
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
          { question: "Why must you scale features before K-Means?", options: ["K-Means requires it for convergence", "Euclidean distance is dominated by features with larger ranges, biasing cluster assignments", "Scaling makes K-Means faster", "It's optional"], answer: 1, explanation: "K-Means uses Euclidean distance. Without scaling, features with large ranges (e.g., income: 0-100000) completely dominate features with small ranges (e.g., age: 0-100)." }
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
        theory: `**Feature Engineering — The Most Impactful ML Skill**

"Applied ML is basically feature engineering" — Andrew Ng. In practice, good features matter more than complex models. Feature engineering is the art of transforming raw data into features that better represent the underlying problem, leading to improved model performance.

---

**📏 Feature Scaling — Making Features Comparable:**

**Why scale?** Many algorithms (SVM, KNN, Neural Networks, PCA, Gradient Descent-based) are sensitive to feature magnitudes. A feature ranging 0-100000 (income) would dominate a feature ranging 0-1 (probability) in distance calculations.

**StandardScaler (Z-score Normalization):**
\`z = (x - μ) / σ\`
- Centers to mean=0, std=1
- Preserves outlier information
- Best for: Gradient-based algorithms (linear models, neural nets, SVM)
- Assumes approximately normal distribution

**MinMaxScaler:**
\`x_norm = (x - min) / (max - min)\`
- Scales to [0, 1] (or any specified range)
- Best for: When you need bounded values (image pixels, probability inputs)
- **Caution:** Very sensitive to outliers — one extreme value compresses everything else

**RobustScaler:**
\`x = (x - median) / IQR\`
- Uses median and interquartile range instead of mean and std
- Robust to outliers
- Best for: Data with significant outliers that you want to keep

**MaxAbsScaler:**
\`x_scaled = x / max(|x|)\`
- Scales to [-1, 1] without centering
- Best for: Sparse data (doesn't destroy sparsity)

**When to scale:** SVM, KNN, PCA, Neural Networks, Linear/Logistic Regression, K-Means
**When NOT to scale:** Tree-based models (Decision Trees, Random Forests, XGBoost, LightGBM) — they split on individual feature values and are invariant to monotonic transformations

**Important:** Always fit the scaler on training data only, then transform both training and test data. Never fit on test data (data leakage!).

---

**🏷️ Categorical Encoding — Making Categories Numeric:**

| Method | When to Use | Example | Pros | Cons |
|--------|------------|---------|------|------|
| One-Hot | Nominal, few unique values | Color: R→[1,0,0], G→[0,1,0] | No ordinal assumption | High dimensionality |
| Label/Ordinal | Ordinal categories | Size: S→0, M→1, L→2 | Compact | Implies order |
| Target Encoding | High-cardinality | ZIP code → mean of target | Powerful | Overfitting risk |
| Binary | Many categories | Hash-based binary encoding | Compact | Information loss |
| Frequency | High-cardinality | Category → count/frequency | Simple | Ties between categories |

**One-Hot Encoding Pitfalls:**
- **Curse of dimensionality:** 1000 unique values → 1000 new columns (sparse, slow)
- **Dummy variable trap:** Use \`drop_first=True\` to avoid perfect multicollinearity
- **New categories at inference:** Handle unseen categories gracefully (map to 'unknown' or zeros)

**Target Encoding Best Practice:**
- Use leave-one-out or K-fold target encoding to prevent overfitting
- Add smoothing: \`encoded = (count × mean + global_count × global_mean) / (count + global_count)\`

---

**📊 Feature Selection — Keeping Only What Matters:**

Too many features → overfitting, slow training, noise. Feature selection identifies the most relevant features.

**Filter Methods (fast, model-agnostic):**
- **Correlation analysis:** Remove features with |correlation| < 0.05 to target. Also remove features with |correlation| > 0.95 to each other (redundant)
- **Variance threshold:** Remove near-constant features (variance ≈ 0)
- **Chi-squared test:** For categorical features vs categorical target
- **Mutual Information:** Captures non-linear relationships (unlike correlation)
- **ANOVA F-test:** For numerical features vs categorical target

**Wrapper Methods (accurate, slower):**
- **Forward selection:** Start with 0 features, add the best one iteratively until performance plateaus
- **Backward elimination:** Start with all features, remove the worst iteratively
- **Recursive Feature Elimination (RFE):** Train model, remove least important features, repeat
- These use the actual model performance as the criterion — more accurate but computationally expensive

**Embedded Methods (built into model training):**
- **L1 Regularization (Lasso):** Shrinks unimportant feature weights to exactly 0 → automatic selection
- **Tree-based feature importance:** Random Forest or XGBoost importance scores
- **Elastic Net:** Combines L1 and L2, good for correlated features

---

**🔨 Feature Creation — Engineering New Features:**

The most creative part of ML — domain knowledge is king here.

- **Polynomial features:** x₁², x₁×x₂ (captures non-linear relationships for linear models)
  - **Caution:** Number of features explodes combinatorially (100 features → 5150 with degree=2)
- **Log/sqrt/Box-Cox transform:** Reduces right skewness (common in financial data)
- **Binning:** Continuous → categories (age → [0-18, 18-30, 30-50, 50+]) — reduces noise but loses granularity
- **Date features:** year, month, day_of_week, is_weekend, is_holiday, quarter, days_since_event
- **Text features:** word count, sentence count, sentiment score, TF-IDF vectors
- **Interaction features:** ratio (price/sqft), difference (max-min), product (qty × price)
- **Aggregation features:** For grouped data — mean, std, min, max, count per group
- **Lag features:** For time series — value at t-1, t-7, rolling mean, rolling std
- **Cyclic encoding:** For cyclical features (hour, month): sin(2π×hour/24), cos(2π×hour/24)

**Feature Engineering Pipeline:**
\`\`\`
Raw Data → Handle Missing → Encode Categories → Create Features → Scale → Select → Model
\`\`\`

**Pro Tips:**
1. Start with domain knowledge — what would an expert look at?
2. Look at feature distributions — transform skewed features
3. Check for interactions — plot feature1 vs feature2 colored by target
4. Use target encoding for high-cardinality categoricals
5. For time series, always create lag and rolling features

---

## 🏢 Case Study: Kaggle Grandmasters — "Feature Engineering wins competitions"

Phân tích 50 Kaggle winning solutions (2015-2020): **80% mention feature engineering** là yếu tố quyết định, chỉ 20% nhắc đến model architecture. Owen Zhang (Kaggle #1 historic): *"My best model is XGBoost with 1500 features I engineered, not the fancy neural net I tried."*

**Ví dụ điển hình — Walmart Sales Forecasting:**
- Raw features: 15 columns (date, store, item, price, etc.)
- Top solution: **3000+ engineered features** (rolling means 7d/14d/30d, lag features, holiday flags, weather joins, store-item interactions)
- RMSE giảm từ 4500 (baseline) → 2300 (winner)

---

## 🏢 Case Study: Airbnb Search — "Feature Crosses" (2014)

Airbnb tăng search booking rate **18%** chỉ bằng việc tạo features cross:
- \`days_until_checkin × price\` (giá thay đổi theo timing)
- \`host_response_rate × days_listed\` (host mới response cao chưa chứng minh)
- \`guest_count / max_capacity\` (occupancy rate)
- \`distance_to_city_center × neighborhood_score\`

**Bài học:** Mô hình không tự tìm ra interactions phức tạp — bạn phải **design** chúng từ business knowledge.

---

## 🏢 Case Study: Stripe Fraud Detection — Velocity Features

Stripe phát hiện fraud chiếm 0.05% transactions nhưng gây **$1.7B thiệt hại/năm** cho merchants. Key features (engineered, không có sẵn):
- **Velocity (1h, 24h, 7d)**: số transactions từ cùng card/IP/email trong các time window
- **Geographic distance**: km giữa shipping address và IP location
- **Amount anomaly**: ratio với 30-day median của cùng card
- **Time-of-day patterns**: deviation từ user's normal hours

Features velocity tăng AUC từ **0.85 → 0.95** — giảm $200M/năm thiệt hại.

---

## 📊 Feature Engineering Techniques — When to use

| Technique | Khi dùng | Ví dụ thực tế |
|-----------|----------|---------------|
| One-Hot Encoding | Categorical < 50 values | Country, gender, product_category |
| Target Encoding | High-cardinality categorical | zip_code (40K), user_id |
| Binning | Continuous features có thresholds | age_group (18-25, 26-35...) |
| Log Transform | Right-skewed data | Income, prices, view counts |
| Polynomial | Capture non-linearity | x, x², x³ for physics models |
| Interaction (cross) | Domain-driven combinations | price × demand_score |
| Rolling stats | Time series | 7-day moving avg sales |
| Lag features | Time series | sales_lag_1, sales_lag_7 |
| Embeddings | Text, categorical | Word2Vec, Entity Embeddings |

---

## 📋 Best Practices

✅ **Domain knowledge first** — talk to business expert trước khi engineer
✅ **Validate với holdout set** — feature mới phải improve validation, không chỉ training
✅ **Avoid leakage** — không dùng future info để predict past (vd: \`total_purchases\` include cả prediction date)
✅ **Document mỗi feature** — tên, công thức, business meaning, last_updated
✅ **Feature store** (Feast, Tecton) cho production ML — share features across teams

---

## ⚠️ Anti-Patterns

❌ Tạo 10000 features tự động (autofeat, featuretools) mà không hiểu chúng → overfitting + maintenance nightmare
❌ **Data leakage** — feature dùng future info (target itself, post-prediction events) → 100% accuracy lúc validation, 50% production
❌ Quên áp dụng cùng transformation trên test/production (always use sklearn Pipeline!)
❌ Dùng mean imputation cho missing values khi missingness có ý nghĩa (vd: "didn't apply for loan" ≠ "applied with $0")
❌ One-hot encode categorical với 10000 values → matrix nổ tung, dùng Target/Frequency encoding

---

## 🌉 Bridge to Next Lesson

Có features tốt rồi, làm sao **đánh giá model tin cậy**? Train/test split đơn giản có thể misleading nếu data nhỏ hoặc imbalanced. Bài tiếp: **Cross-Validation** — kỹ thuật standard để estimate true model performance.`,
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
          { question: "What is data leakage in feature engineering?", options: ["Data being deleted", "Using test set information during training (e.g., fitting scaler on full dataset)", "Features being correlated", "Missing values"], answer: 1, explanation: "Data leakage occurs when training process uses information from test data. Example: fitting StandardScaler on entire dataset (including test) before splitting — test statistics influence training." }
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
        theory: `**Cross-Validation — Reliable Model Evaluation**

A single train/test split can give misleading results depending on which data ends up in which set. One lucky split might show 95% accuracy while another shows 85%. Cross-validation provides a more robust and reliable performance estimate by testing on multiple different splits.

---

**🔄 K-Fold Cross-Validation:**

1. Split data into K equal folds (typically K=5 or K=10)
2. For each fold i (i = 1, 2, ..., K):
   - Use fold i as the test set
   - Use remaining K-1 folds as the training set
   - Train model on training set, evaluate on test set
   - Record the score
3. Report: mean ± standard deviation of all K scores

**Key property:** Every data point is used for both training and testing exactly once. No data is wasted.

**Example with K=5:**
\`\`\`
Fold 1: [TEST] [train] [train] [train] [train] → Score₁
Fold 2: [train] [TEST] [train] [train] [train] → Score₂
Fold 3: [train] [train] [TEST] [train] [train] → Score₃
Fold 4: [train] [train] [train] [TEST] [train] → Score₄
Fold 5: [train] [train] [train] [train] [TEST] → Score₅
Final: mean(Score₁..₅) ± std(Score₁..₅)
\`\`\`

**Choosing K:**
- K=5: Good balance of speed and reliability. Default recommendation.
- K=10: Slightly more reliable, 2x slower.
- K=n (LOO): Most reliable but very expensive. Use for very small datasets (<100 samples).
- Higher K → more training data per fold → lower bias, higher variance of estimate.

---

**📊 Variants:**

**Stratified K-Fold:**
- Preserves the class distribution in each fold
- **Essential** for imbalanced datasets
- Without stratification: a fold might contain 0% of the minority class → useless evaluation
- Example: If dataset is 90% negative, 10% positive → each fold has ~90/10 split

**Leave-One-Out (LOO):**
- K = N (each sample is a test set of size 1)
- Maximum use of training data (N-1 samples per fold)
- Very expensive: N model trainings
- Very high variance of estimate
- Use only for very small datasets where every sample matters

**Time Series Split:**
- **Critical:** Never shuffle time series data! Future data must not leak into training.
\`\`\`
Split 1: [TRAIN] [TEST]
Split 2: [TRAIN   TRAIN] [TEST]
Split 3: [TRAIN   TRAIN   TRAIN] [TEST]
\`\`\`
- Training set grows with each split; test set slides forward
- Respects temporal ordering

**Repeated K-Fold:**
- Run K-fold multiple times with different random splits
- Example: 5-fold × 3 repeats = 15 scores
- Average all results for the most stable estimate
- Good for small datasets where variance is high

**Group K-Fold:**
- Ensures that samples from the same group are never in both train and test
- Example: Medical data — all samples from the same patient must be in the same fold
- Prevents data leakage from correlated samples

---

**🏗️ Train / Validation / Test Split — The Three-Way Split:**

| Set | Purpose | % of Data | When Used |
|-----|---------|-----------|-----------|
| Train | Fit model parameters | 60-70% | Every training iteration |
| Validation | Tune hyperparameters, select model | 15-20% | After each training run |
| Test | Final unbiased evaluation | 15-20% | **Once only** — at the very end |

**Why three sets?** If you use the test set to select hyperparameters, you're essentially "training" on it — the final score becomes optimistically biased. The test set must be completely untouched until the final evaluation.

**Nested Cross-Validation (Gold Standard):**
\`\`\`
Outer loop: K-fold CV to estimate generalization performance
  Inner loop: K-fold CV to tune hyperparameters
\`\`\`
- Outer loop evaluates overall model performance
- Inner loop selects the best hyperparameters for each outer fold
- Most unbiased estimate, but K² model trainings!

---

**⚠️ Common Mistakes (Critical to Avoid!):**

1. **Data leakage via preprocessing:** Scaling/encoding on full data before splitting → test data influences scaler parameters → optimistic results. **Fix:** Always fit preprocessors on training fold only.

2. **Evaluating on training data:** "My model has 99% accuracy!" (on training data). Always evaluate on held-out data.

3. **Using test set for tuning:** Testing multiple models/hyperparameters on the test set and reporting the best → optimistic estimate. **Fix:** Use validation set for tuning, test set only once.

4. **Not stratifying with imbalanced data:** Random splits can create folds with no minority class samples → misleading accuracy.

5. **Shuffling time series data:** Random shuffling allows future data to leak into training → artificially high performance. **Fix:** Use time-series split.

6. **Ignoring group structure:** If samples within a group are correlated (e.g., same patient), random splitting overestimates performance. **Fix:** Use Group K-Fold.

---

## 🏢 Case Study: Netflix Prize — Cross-Validation Pitfalls ($1M lesson)

Netflix Prize 2009: nhiều teams đạt RMSE thấp trên **public leaderboard** (test set 50%) nhưng tệ trên **private leaderboard** (test set 50% còn lại) → mất giải. Nguyên nhân: họ tune hyperparameters dựa trên public leaderboard score, dẫn đến **overfit lên test set** (a.k.a. "leaderboard probing").

**Solution của winner BellKor:** Dùng **5-fold cross-validation** trên training data làm decision metric, chỉ submit cuối cùng → robust với private leaderboard. Bài học: **không bao giờ tune trên test set**, kể cả "indirectly".

---

## 🏢 Case Study: Time Series CV — Uber's Demand Forecasting

Uber forecast ride demand cho mỗi city/hour. **Critical bug:** team đầu dùng **standard K-Fold CV** → MAPE 8% trên CV, nhưng 25% trên production. Lý do: K-Fold shuffle data → model train trên **future** rồi predict **past** → unrealistic.

**Fix:** Chuyển sang **TimeSeriesSplit** (forward chaining):
- Fold 1: train [Jan-Jun], test [Jul]
- Fold 2: train [Jan-Jul], test [Aug]
- Fold 3: train [Jan-Aug], test [Sep]
- ...

CV MAPE giảm xuống 22% → matching production. Đây là **bài học vàng**: CV strategy phải match production deployment.

---

## 🏢 Case Study: Medical AI — Patient-Level CV

Stanford radiology AI cho phát hiện pneumonia từ X-ray. **Wrong:** standard 5-fold CV cho random samples → AUC 0.97. **Right:** **GroupKFold theo patient_id** (1 patient có nhiều X-rays) → AUC giảm xuống **0.83**. Sự khác biệt: nếu cùng 1 patient ở cả train + test, model "nhận diện" patient thay vì học pattern bệnh.

**Bài học:** Khi data có **groups** (patients, customers, sessions), phải đảm bảo group không bị split giữa train/test. FDA approval rejection nếu không tuân thủ.

---

## 📊 Cross-Validation Strategies — Choose Wisely

| Strategy | Khi dùng | Ưu điểm | Cảnh báo |
|----------|----------|---------|----------|
| K-Fold (k=5,10) | IID data, regression | Standard, dễ hiểu | Không phù hợp time series |
| Stratified K-Fold | Classification imbalanced | Giữ class ratio mỗi fold | Default cho classification |
| TimeSeriesSplit | Time series | Forward chain, realistic | Folds không bằng nhau |
| GroupKFold | Có grouping (patients, users) | Tránh leakage | Cần group_id rõ ràng |
| LeaveOneOut | Dataset rất nhỏ (<100) | Không bias estimate | Cực chậm, variance cao |
| Nested CV | Hyperparameter tuning + eval | Unbiased performance estimate | Tốn time × outer × inner folds |

---

## 📋 Best Practices

✅ **Stratify** cho mọi classification task (đảm bảo class ratio đồng đều mỗi fold)
✅ **k=5 cho dataset > 1K**, **k=10 cho dataset 100-1K**, **LOO cho < 100**
✅ **Set random_state** để reproducible
✅ **Report mean ± std** không chỉ mean (variance quan trọng)
✅ **Nested CV** khi tuning hyperparameters cộng với eval — tránh overestimate

---

## ⚠️ Anti-Patterns

❌ Tune hyperparameters trên CV folds, sau đó eval trên **cùng** CV folds — biased estimate
❌ Standard K-Fold cho time series → leakage, model không thể có ngoài đời thực
❌ Quên scale features **bên trong** CV pipeline → leakage từ test fold vào training
❌ Trust 1 single split (train_test_split) cho dataset nhỏ → estimate không ổn định ±10%
❌ K=2 cho dataset lớn → high bias estimate (không tận dụng đủ data)

---

## 🌉 Bridge to Next Lesson

Cross-validation cho biết model hiện tại tốt thế nào. Nhưng làm sao **tìm hyperparameters tốt nhất** một cách hệ thống? Manual tuning là chậm và không systematic. Bài tiếp: **Hyperparameter Tuning** — Grid Search, Random Search, Bayesian Optimization.`,
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
          { question: "Why must you NOT shuffle time series data for cross-validation?", options: ["Shuffling is always fine", "Shuffling allows future data to leak into training, giving unrealistically high performance", "Shuffling is too slow", "Time series can't be split"], answer: 1, explanation: "Shuffling destroys temporal ordering. In production, you can never train on future data. Time Series Split ensures training only uses past data." }
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
        theory: `**Hyperparameter Tuning — Finding the Best Configuration**

**Parameters vs Hyperparameters:**
- **Parameters** are learned during training (weights, biases) — the model figures these out
- **Hyperparameters** are set before training (learning rate, max_depth, C, n_estimators) — YOU choose these

The right hyperparameter values can dramatically impact model performance — the difference between 80% and 95% accuracy.

---

**🔍 Grid Search — Exhaustive Search:**

Define a grid of all hyperparameter values to try, then evaluate EVERY combination using cross-validation.

\`\`\`python
param_grid = {
    'max_depth': [3, 5, 7, 10],
    'n_estimators': [50, 100, 200],
    'learning_rate': [0.01, 0.1, 0.3]
}
# Total: 4 × 3 × 3 = 36 combinations
# With 5-fold CV: 36 × 5 = 180 model trainings!
\`\`\`

**Pros:** Guaranteed to find the best combination within the grid.
**Cons:** Exponentially expensive. 5 params × 5 values each = 5⁵ = 3125 combinations! With 5-fold CV = 15,625 model trainings.

**When to use:** Few hyperparameters (2-3), narrow value ranges, fast model training.

---

**🎲 Random Search — Smarter Exploration:**

Instead of trying all combinations, randomly sample N combinations from the hyperparameter distributions.

\`\`\`python
param_distributions = {
    'max_depth': randint(3, 15),           # uniform integer distribution
    'n_estimators': randint(50, 500),
    'learning_rate': loguniform(0.001, 1),  # log-uniform for learning rates
    'min_samples_split': randint(2, 20)
}
# Try 50 random combinations instead of all possibilities
\`\`\`

**Why Random Search often wins:**
Bergstra & Bengio (2012) showed that most hyperparameters have **unequal importance**. In a 2-param grid:
\`\`\`
Grid Search (9 trials):     Random Search (9 trials):
[x] [x] [x]                [x]    [x]   [x]
[x] [x] [x]                    [x]     [x]
[x] [x] [x]                [x]    [x]  [x]  [x]
\`\`\`
Grid only tests 3 values per dimension, while Random tests 9 unique values per dimension! If only one parameter matters, Random Search explores it more thoroughly.

**When to use:** Many hyperparameters (4+), wide value ranges, limited compute budget.

---

**🧠 Bayesian Optimization — Learning from Past Trials:**

Uses past evaluation results to intelligently choose the next combination to try.

**How it works:**
1. Start with a few random trials
2. Build a **surrogate model** (usually Gaussian Process or Tree-Parzen Estimator) of the objective function
3. Use an **acquisition function** to balance:
   - **Exploration:** Try new, unexplored areas of the parameter space
   - **Exploitation:** Refine around known good areas
4. Evaluate the next point, update the surrogate model, repeat

**Tools:**
- **Optuna** (recommended): Modern, flexible, efficient. Uses TPE (Tree-Parzen Estimator).
- **Hyperopt:** Another TPE-based framework.
- **Weights & Biases (W&B):** Cloud-based experiment tracking + Bayesian sweeps.
- **BOHB:** Combines Bayesian optimization with early stopping (Hyperband).

**Optuna Example:**
\`\`\`python
import optuna

def objective(trial):
    params = {
        'max_depth': trial.suggest_int('max_depth', 3, 15),
        'learning_rate': trial.suggest_float('lr', 0.001, 1, log=True),
        'n_estimators': trial.suggest_int('n_estimators', 50, 500),
    }
    model = XGBClassifier(**params)
    score = cross_val_score(model, X, y, cv=5).mean()
    return score

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=50)
print(f'Best params: {study.best_params}')
\`\`\`

**When to use:** Expensive model training (each trial takes minutes/hours), moderate number of hyperparameters (3-10).

---

**⏱️ Early Stopping (Hyperband/ASHA):**

Why train bad configurations to completion? Stop them early and reallocate resources!

**Successive Halving (SHA):**
1. Start N configurations with a small budget (e.g., 10 epochs)
2. Evaluate all, keep the top 50%
3. Double the budget, repeat until 1 configuration remains

**ASHA (Asynchronous SHA):** Same idea but doesn't wait for all configurations to finish — starts evaluating new ones as soon as resources are freed.

---

**📊 Comparison:**

| Method | Trials Needed | Finds Optimal? | Best For | Intelligence |
|--------|--------------|----------------|----------|-------------|
| Grid | All combos (exponential) | Within grid, yes | Few params (2-3) | None |
| Random | 10-100 | Near-optimal | Many params (4+) | None |
| Bayesian | 20-50 | Often global | Expensive models | Uses past results |
| Hyperband | Variable | Good enough | Any | Budget-aware |

---

**📋 Best Practices:**

1. **Start with Random Search** to find the right neighborhood of good values
2. **Narrow down with Grid Search or Bayesian** around the promising area
3. **Always use cross-validation** inside the search (never evaluate on a single split)
4. **Log every experiment** — you'll want to revisit past results (MLflow, W&B, Neptune)
5. **Don't tune too many parameters at once** — risk of overfitting to validation data
6. **Use log-scale for learning rates:** [0.001, 0.01, 0.1] not [0.001, 0.002, 0.003]
7. **Set a compute budget** and stick to it — diminishing returns after a point
8. **Tune the most impactful parameters first** (usually learning_rate, n_estimators, max_depth)

---

## 🏢 Case Study: Google AutoML — Bayesian Optimization Wins

Google AutoML (2017) tự động tune hyperparameters cho neural architecture. So sánh 3 methods trên CIFAR-10:
- **Grid Search**: 10000 trials, accuracy 91.2%, 200 GPU-hours
- **Random Search**: 1000 trials, accuracy 91.5%, 20 GPU-hours
- **Bayesian Optimization (Vizier)**: 200 trials, accuracy 92.1%, **5 GPU-hours**

**Bài học (Bergstra & Bengio, 2012):** Random Search consistently beats Grid Search vì hầu hết hyperparameters không quan trọng — Grid lãng phí trials trên unimportant axes. Bayesian optimization còn tốt hơn nhờ **học từ trials trước**.

---

## 🏢 Case Study: OpenAI GPT-3 — $4.6M Single Training Run

OpenAI training GPT-3 175B params chỉ chạy **1 lần** (không thể afford retry) → hyperparameters phải đúng từ đầu. Họ:
1. Train **smaller models** (125M, 350M, 760M, 1.3B, 2.7B, 6.7B, 13B) với hyperparameter sweeps mở rộng
2. **Fit scaling laws** cho mỗi hyperparameter (lr, batch size, warmup steps)
3. Extrapolate optimal values cho 175B — dự đoán lr_optimal ≈ 0.6e-4
4. Single 175B run thành công ngay lần đầu

Đây là **scaling-aware hyperparameter selection** — kỹ thuật mới của LLM era.

---

## 🏢 Case Study: Kaggle Microsoft Malware — XGBoost Tuning

Winning solution Microsoft Malware 2019 (Kaggle): tune XGBoost với **Optuna** (Bayesian framework). 500 trials, 50 CPU-hours. Kết quả vs default:
- **default XGBoost**: AUC 0.694
- **Tuned (Optuna)**: AUC 0.712 (+1.8 points)

1.8 points không lớn nhưng đủ để move từ rank 200 → rank 5 trong leaderboard. **Tuning matters at the margin** — đặc biệt trong competitions.

---

## 📊 Method Comparison

| Method | Số trials cần | Best for | Tools |
|--------|--------------|----------|-------|
| Grid Search | Exponential O(n^p) | < 4 hyperparams, discrete | sklearn GridSearchCV |
| Random Search | Hundreds | 4-20 hyperparams | sklearn RandomizedSearchCV |
| Bayesian Opt | Tens to hundreds | Expensive evaluations | Optuna, Hyperopt, scikit-optimize |
| Hyperband | Hundreds | Many configs, early stopping | Ray Tune |
| Population-Based | Thousands | Neural net training | DeepMind's PBT |
| AutoML | Thousands | Automated end-to-end | Google AutoML, AutoKeras, H2O |

**Practical rule:** Với <4 params dùng Grid; 4-20 params dùng Random + Bayesian; deep learning dùng Hyperband.

---

## 📋 Best Practices

✅ **Define search space** với domain knowledge (vd: lr ∈ [1e-5, 1e-1] log-uniform, không linear)
✅ **Log-uniform sampling** cho lr, regularization (covers magnitudes)
✅ **Early stopping** trong mỗi trial (validation plateau → kill)
✅ **Save all trials** (Optuna trial database) — phân tích sau
✅ **Use validation set tách biệt** — không tune trên test set!

---

## ⚠️ Anti-Patterns

❌ **Grid search với 10 params** — 10^10 combinations, không chạy nổi
❌ **Tune trên test set** → biased optimistic estimate. Always train/val/test 3-way split
❌ **Tune trên 1 fold** (no CV) → variance cao, picks lucky config
❌ **Tune random_state** — đây không phải hyperparameter thật! Đôi khi seed giúp +2% nhưng không generalize
❌ **Tune mà không log** — sau 1 tuần không nhớ config nào đã thử

---

## 🌉 Bridge to Next Lesson

Tuning hoàn hảo cũng vô ích nếu chọn **sai metric**. Accuracy 99% có thể là disaster nếu data imbalanced 99:1. Bài tiếp: **Model Evaluation Metrics** — chọn metric phù hợp business problem.`,
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
          { question: "Why should learning rates be searched on a log scale?", options: ["Convention", "The impact of learning rate changes is multiplicative — 0.001 vs 0.01 is more important than 0.01 vs 0.02", "Log scale is faster", "It doesn't matter"], answer: 1, explanation: "Learning rate effects are multiplicative: the difference between 0.001 and 0.01 (10x) matters much more than 0.01 and 0.02 (2x). Log-uniform sampling reflects this." }
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
        theory: `**Model Evaluation — Beyond Accuracy**

Accuracy alone is often misleading, especially with imbalanced data. A spam filter with 99% accuracy might be terrible if it catches no spam (just predicts "not spam" always). Choosing the right evaluation metric is as important as choosing the right model.

---

**📊 Confusion Matrix — The Foundation:**

\`\`\`
                     Predicted
                     Pos         Neg
Actual Pos      TP (Hit)     FN (Miss)       ← Type II error
Actual Neg      FP (False    TN (Correct     ← Type I error
                  alarm)      rejection)
\`\`\`

**Memory trick:**
- **TP (True Positive):** "Yes" and correct → patient has disease, test says disease ✅
- **FP (False Positive):** "Yes" but wrong → patient is healthy, test says disease ❌ (false alarm)
- **FN (False Negative):** "No" but wrong → patient has disease, test says healthy ❌ (missed!)
- **TN (True Negative):** "No" and correct → patient is healthy, test says healthy ✅

---

**📏 Key Metrics — When to Use Each:**

| Metric | Formula | Focus | Use When |
|--------|---------|-------|----------|
| Accuracy | (TP+TN) / Total | Overall correctness | Balanced classes only |
| Precision | TP / (TP+FP) | Quality of positive predictions | FP is costly |
| Recall (Sensitivity) | TP / (TP+FN) | Coverage of actual positives | FN is costly |
| Specificity | TN / (TN+FP) | Coverage of actual negatives | FP is costly (from negative perspective) |
| F1 Score | 2×P×R / (P+R) | Harmonic mean of P and R | Imbalanced classes |
| F-beta | ((1+β²)×P×R) / (β²×P+R) | Weighted P-R balance | Custom P/R tradeoff |

**F1 vs F2 vs F0.5:**
- **F1:** Equal weight to Precision and Recall
- **F2 (β=2):** Weights Recall 2× more than Precision → good when missing positives is very bad
- **F0.5 (β=0.5):** Weights Precision 2× more than Recall → good when false alarms are very bad

**Real-World Metric Selection:**
| Scenario | Primary Metric | Why |
|----------|---------------|-----|
| Cancer screening | Recall (sensitivity) | Missing cancer (FN) is life-threatening |
| Spam filter | Precision | Losing important email (FP) is very bad |
| Credit card fraud | F1 or F2 | Both missing fraud and blocking cards are costly |
| Search engine ranking | Precision@K, NDCG | Top results must be relevant |
| Recommendation system | Recall@K | Don't miss items the user would like |

---

**📈 ROC Curve & AUC:**

The **ROC curve** plots True Positive Rate (Recall) vs False Positive Rate (FPR = FP/(FP+TN)) at ALL possible classification thresholds.

- **AUC = 1.0:** Perfect classifier — separates classes perfectly
- **AUC = 0.5:** Random classifier — no discriminative ability (diagonal line)
- **AUC < 0.5:** Worse than random — flip your predictions!

**AUC Interpretation:**
- AUC = probability that a randomly chosen positive sample has a higher predicted score than a randomly chosen negative sample
- **Threshold-independent** — evaluates the model's ranking ability, not its classification at a specific threshold

**Precision-Recall (PR) Curve:**
- Better than ROC for highly imbalanced datasets
- Plots Precision vs Recall at all thresholds
- **AUC-PR:** Area under PR curve. Higher is better.
- When 99% of data is negative, ROC can look deceptively good. PR curve reveals the truth.

---

**⚖️ Bias-Variance Tradeoff — The Central Tension in ML:**

\`Total Error = Bias² + Variance + Irreducible Error\`

| Problem | Symptom | Model Type | Solution |
|---------|---------|------------|----------|
| **High Bias (Underfitting)** | Both train & test scores are LOW | Too simple (linear model for non-linear data) | More features, complex model, less regularization |
| **High Variance (Overfitting)** | Train score HIGH, test score LOW (big gap) | Too complex (deep tree, too many features) | More data, regularization, simpler model, dropout |
| **Good fit** | Both train & test scores are HIGH and close | Goldilocks zone | Keep it! |

**Diagnosing with Learning Curves:**
Plot training and validation scores vs training set size:
\`\`\`
High Bias:                    High Variance:
Score                         Score
  │ _____ train               │ ‾‾‾‾‾ train
  │ _____ val (both low)      │
  │                           │ _____ val (big gap)
  └───────────────            └───────────────
       Training size               Training size
\`\`\`
- If both curves converge at a low score → bias problem
- If big gap between curves → variance problem
- If gap doesn't close with more data → need a different model, not more data

**Validation Curve:** Plot train/test scores vs a hyperparameter (e.g., max_depth). Find the sweet spot where test score peaks.

---

**📊 Regression Metrics:**

| Metric | Formula | Interpretation |
|--------|---------|---------------|
| MSE | (1/n)Σ(y-ŷ)² | Penalizes large errors heavily |
| RMSE | √MSE | Same units as target, most common |
| MAE | (1/n)Σ\|y-ŷ\| | Robust to outliers |
| MAPE | (100/n)Σ\|y-ŷ\|/\|y\| | Percentage error, scale-independent |
| R² | 1 - SS_res/SS_tot | % variance explained |

**Choosing regression metrics:**
- RMSE: Default choice, penalizes large errors
- MAE: When outlier resistance matters
- MAPE: When relative error matters (but fails when y=0)
- R²: For interpretability ("model explains 85% of variance")

---

## 🏢 Case Study: COVID-19 X-Ray Detection — Accuracy Paradox

Đầu 2020, hàng trăm papers công bố models phát hiện COVID từ chest X-ray với **accuracy 95-99%**. Phân tích sau (Roberts et al., Nature 2021): **không một model nào** đủ chất lượng dùng clinical. Lý do:
- Dataset imbalanced (99% normal, 1% COVID) → model predict toàn "normal" đạt 99% accuracy
- Confounding: COVID images từ Italy (chụp portable), normal từ children dataset → model học **device type**, không phải bệnh
- Right metric: **Sensitivity (Recall)** + **Specificity**, không phải Accuracy

**Bài học:** Accuracy tệ hại với imbalanced data. Always **report Confusion Matrix + per-class metrics**.

---

## 🏢 Case Study: Netflix Churn Prediction — Choosing the Right Threshold

Netflix muốn predict users sắp hủy subscription để retention team gọi. Model XGBoost output probability, default threshold 0.5:
- **Threshold 0.5**: Precision 80%, Recall 30% → bỏ sót 70% churners
- **Threshold 0.3**: Precision 50%, Recall 70% → bắt được 70% nhưng 50% là false alarm

**Cost-based decision:**
- False Negative cost = $120/user (lost subscription)
- False Positive cost = $5/user (unnecessary call)
- Optimal threshold = solve cost equation → **0.28**

**Kết quả:** Saved $50M/năm bằng cách chỉnh threshold thay vì retrain model. **Threshold tuning** thường impact business hơn cả model improvement.

---

## 🏢 Case Study: Google Search — Click-Through Rate (CTR) AUC

Google's CTR prediction model (cho ads ranking) tối ưu **AUC**, không Accuracy. Lý do: ranking matters, absolute prediction không. AUC measures: với 1 cặp (ad clicked, ad not clicked), model rank đúng cặp này bao nhiêu % thời gian.

**Improvement 0.001 AUC** → **$millions revenue** vì traffic cực lớn. Đây là lý do Google invest hundreds of engineers vào improving model với marginal gains.

---

## 📊 Metrics Cheat Sheet

| Metric | Khi dùng | Công thức | Caveat |
|--------|----------|-----------|--------|
| Accuracy | Balanced data | (TP+TN)/All | Misleading khi imbalanced |
| Precision | Cost của FP cao (spam, fraud alerts) | TP/(TP+FP) | Trade-off với Recall |
| Recall (Sensitivity) | Cost của FN cao (cancer, COVID) | TP/(TP+FN) | Trade-off với Precision |
| F1 Score | Balance Precision + Recall | 2PR/(P+R) | Harmonic mean, không weight |
| ROC AUC | Ranking quan trọng (search, ads) | Area under TPR vs FPR curve | Chỉ binary, có thể misleading khi imbalanced |
| PR AUC | Imbalanced classification | Area under Precision-Recall curve | Tốt hơn ROC cho imbalanced |
| Log Loss | Calibrated probabilities | -Σ(y log p + (1-y) log(1-p)) | Penalize confident wrong predictions |
| MSE/RMSE | Regression, penalize large errors | Σ(y-ŷ)²/n | Sensitive to outliers |
| MAE | Regression, robust | Σ|y-ŷ|/n | Equal weight to all errors |
| MAPE | Forecasting, % error | Σ|y-ŷ|/y × 100/n | Bias when y near 0 |

---

## 📋 Best Practices

✅ **Always report 3+ metrics** (vd: Accuracy + F1 + AUC) — cho cái nhìn toàn diện
✅ **Confusion Matrix** cho mọi classification report
✅ **Per-class metrics** (precision/recall) cho multi-class
✅ **Calibration plot** cho probabilistic predictions
✅ **Cost-sensitive evaluation** — define cost matrix cho FN/FP

---

## ⚠️ Anti-Patterns

❌ Dùng Accuracy cho imbalanced data (>70/30 ratio) → meaningless
❌ Optimize F1 mặc định → giả định Precision = Recall importance, business hiếm khi đúng
❌ Report metric trên **training set** → wildly optimistic
❌ Quên statistical significance — improvement 0.5% có thể là noise
❌ Trust 1 metric — model có thể tốt theo 1 metric, tệ theo khác

---

## 🌉 Bridge to Next Lesson

Một model tốt là khởi đầu. **Ensemble nhiều models** thường vượt single best model — đó là cách hầu hết Kaggle competitions thắng. Bài tiếp: **Ensemble Methods** — Bagging, Boosting, Stacking, Blending.`,
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
          { question: "When should you use PR curve instead of ROC curve?", options: ["Always", "When the dataset is highly imbalanced — PR curve is more informative than ROC", "When you need probabilities", "Never"], answer: 1, explanation: "With highly imbalanced data (e.g., 99% negative), ROC can look deceptively good because FPR stays low even with many false positives. PR curve directly shows precision-recall trade-off." }
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
        theory: `**Ensemble Methods — Combining Models for Superior Performance**

Ensemble methods combine multiple models to achieve better performance than any individual model. The key insight: diverse models make different errors, and combining them reduces overall error.

**"Wisdom of the crowd"** — a group of average individuals often makes better decisions than a single expert.

---

**📊 The Three Main Approaches:**

**1. Bagging (Parallel — reduces VARIANCE):**
- Train multiple models **independently** on random bootstrap samples
- Combine: majority vote (classification) or average (regression)
- Reduces **variance** → prevents overfitting
- Each model is a "strong learner" (e.g., deep tree)
- Example: **Random Forest**
- Models trained in parallel → easy to scale

**2. Boosting (Sequential — reduces BIAS):**
- Train models **one after another**, each correcting the previous model's errors
- Reduces **bias** → improves underfitting
- Each model is a "weak learner" (e.g., shallow tree/stump)
- Final prediction: weighted combination of all models
- Examples: **AdaBoost, Gradient Boosting, XGBoost, LightGBM, CatBoost**
- Models trained sequentially → harder to parallelize

**3. Stacking (Meta-learning — reduces BOTH):**
- Train diverse **base models** (e.g., SVM, RF, KNN, Linear)
- Train a **meta-model** (often Logistic Regression or Ridge) to learn how to optimally combine base model predictions
- Can reduce both bias and variance
- Most complex to implement

---

**⚡ Boosting Algorithms in Detail:**

**AdaBoost (Adaptive Boosting):**
1. Initialize equal weights for all samples: wᵢ = 1/n
2. Train a weak learner (stump) on weighted data
3. Compute weighted error: ε = Σwᵢ × I(wrong prediction)
4. Compute learner weight: α = 0.5 × ln((1-ε)/ε)
5. Update sample weights:
   - Correctly classified: wᵢ × e^(-α) (decrease weight)
   - Misclassified: wᵢ × e^(α) (increase weight)
6. Normalize weights to sum to 1
7. Repeat for T rounds
8. Final: sign(Σ αₜ × hₜ(x)) — weighted vote

**Gradient Boosting:**
Instead of re-weighting samples, each new model directly fits the **residuals** (errors) of the current ensemble:
1. Start with initial prediction F₀(x) = mean(y)
2. Compute residuals: rᵢ = yᵢ - F₀(xᵢ)
3. Fit a tree to the residuals
4. Update: F₁(x) = F₀(x) + lr × tree₁(x)
5. Compute new residuals and repeat

**Learning rate (shrinkage):** Scales each tree's contribution. Lower lr (0.01-0.1) needs more trees but generalizes better. Always use lr < 1.

**XGBoost (Extreme Gradient Boosting):**
The most winning algorithm on Kaggle for tabular data. Key innovations:
- **L1 and L2 regularization** on tree weights → prevents overfitting
- **Column subsampling** (like Random Forest) → tree diversity
- **Handling missing values** natively → automatic direction for missing splits
- **Parallel tree construction** → faster training (parallelizes at split-finding level)
- **Histogram-based binning** → faster split finding
- **Cache-aware access** → hardware-optimized
- **Approximate greedy algorithm** → handles very large datasets

**Key XGBoost Hyperparameters:**
| Parameter | Meaning | Typical Range |
|-----------|---------|---------------|
| n_estimators | Number of boosting rounds | 100-1000 |
| learning_rate (eta) | Shrinkage per step | 0.01-0.3 |
| max_depth | Tree depth | 3-10 |
| subsample | Row sampling ratio | 0.5-1.0 |
| colsample_bytree | Column sampling ratio | 0.5-1.0 |
| reg_alpha (L1) | L1 regularization | 0-10 |
| reg_lambda (L2) | L2 regularization | 0-10 |
| min_child_weight | Min sum of weights in leaf | 1-10 |

**LightGBM (Light Gradient Boosting Machine):**
- Uses **leaf-wise** growth (vs level-wise in XGBoost) → deeper trees, potentially better fit
- **GOSS** (Gradient-based One-Side Sampling): Keeps all large-gradient samples, randomly samples small-gradient → faster training
- **EFB** (Exclusive Feature Bundling): Bundles mutually exclusive features → reduces dimensions
- Handles categorical features **natively** (no one-hot encoding needed)
- 20x faster than XGBoost on some benchmarks
- **Caution:** Can overfit on small datasets (leaf-wise growth is aggressive)

**CatBoost (Categorical Boosting):**
- Best handling of **categorical features** using target statistics (ordered encoding)
- **Ordered boosting:** Prevents target leakage during training
- Less overfitting with default parameters — best "out-of-box" performance
- Slowest to train among the three
- Best for: Datasets with many categorical features

---

**🏗️ Stacking — The Meta-Learning Approach:**

\`\`\`
Level 0 (Base models):
  SVM → pred₁
  RF → pred₂
  KNN → pred₃
  XGBoost → pred₄

Level 1 (Meta-model):
  [pred₁, pred₂, pred₃, pred₄] → Meta-model → Final prediction
\`\`\`

**Training process:**
1. Split data using K-fold CV
2. For each fold, train base models on K-1 folds, predict on held-out fold
3. Collect all out-of-fold predictions → these become features for the meta-model
4. Train meta-model on these features + optionally the original features
5. For inference: run all base models, then the meta-model

**Why it works:** Different model types capture different patterns. The meta-model learns which model to trust for which type of input.

**Tips:** Use diverse base models (don't stack 5 Random Forests). Simple meta-model (Logistic Regression, Ridge) to avoid overfitting.

---

**📋 Comparison:**

| Method | Reduces | Parallelizable | Overfitting Risk | Interpretability |
|--------|---------|---------------|-----------------|-----------------|
| Bagging | Variance | ✅ Yes | Low | Moderate |
| Boosting | Bias (and some variance) | ❌ Sequential | **Higher** (use early stopping) | Low |
| Stacking | Both | Partially | Moderate | Very Low |

**Practical Recommendation for Tabular Data:**
1. Start with Random Forest (baseline)
2. Try XGBoost/LightGBM (usually best)
3. If you need every 0.1% improvement: stacking
4. For categorical-heavy data: CatBoost

---

## 🏢 Case Study: Netflix Prize — Ensemble of 107 Models Wins $1M

BellKor's Pragmatic Chaos (winner Netflix Prize 2009) là **ensemble của 107 models** khác nhau: SVD variations, k-NN, RBMs, neural networks, regression. Final blend dùng **linear regression** trên 107 predictions.

- Best single model: RMSE 0.8800
- Ensemble of 107: RMSE **0.8567** (+10% improvement)

Bài học kinh điển: **diversity** quan trọng hơn **individual strength**. 107 mediocre models đa dạng beat 1 super model.

---

## 🏢 Case Study: XGBoost — Why It Dominates Tabular Data

Tianqi Chen (UW PhD) phát hành XGBoost 2014. Trong 2015-2017, **XGBoost thắng 17 trên 29 Kaggle competitions** với prize > $5K. Key innovations:
- **Gradient boosting** (sequential, mỗi tree fix lỗi tree trước)
- **Regularization** (L1+L2 trên leaf weights)
- **Sparsity-aware** (handle missing tự động)
- **Parallel histogram** (training nhanh 10x so với GBM truyền thống)

**Companies dùng XGBoost production:**
- **Airbnb** — search ranking
- **Uber** — ETA prediction
- **DeepMind** — protein folding (one of components)
- **Microsoft** — Bing Ads CTR

---

## 🏢 Case Study: Stacking — Otto Group Kaggle Winner

Otto Group Product Classification (2015): winning solution dùng **3-level stacking**:
- **Level 0**: 35 base models (XGBoost, RF, NN, SVM, KNN, LR)
- **Level 1**: 5 meta-models (LR, NN với base predictions làm input)
- **Level 2**: Average of 5 meta-models

Log-loss giảm từ 0.45 (best single) → **0.38** (stacked) → secured #1 trong 3514 teams.

---

## 📊 Bagging vs Boosting vs Stacking

| Method | Cách hoạt động | Reduce | Ví dụ | Khi dùng |
|--------|----------------|--------|-------|----------|
| Bagging | Parallel, bootstrap samples | Variance | Random Forest | Models high-variance (deep trees) |
| Boosting | Sequential, fix previous errors | Bias | XGBoost, LightGBM, AdaBoost | Default cho tabular data |
| Stacking | Meta-model học từ base predictions | Both | Custom blends | Final 1-2% improvement (competitions) |
| Voting | Simple average/majority | Variance | sklearn VotingClassifier | Quick ensemble baseline |

---

## 📊 XGBoost vs LightGBM vs CatBoost

| Aspect | XGBoost | LightGBM | CatBoost |
|--------|---------|----------|----------|
| Speed | Fast | **Fastest** (10x XGBoost on large data) | Slower training |
| Accuracy | Excellent | Excellent | **Best for categorical** |
| Categorical handling | Cần encoding | Native (better than XGB) | **Best native** |
| Memory | High | **Low** (histogram-based) | Medium |
| Default hyperparams | OK | Good | **Best out-of-box** |
| Best for | Default choice | Large datasets | Heavy categorical features |

**Modern recommendation:** Try LightGBM first (speed), CatBoost second (categorical), XGBoost third (familiarity).

---

## 📋 Best Practices

✅ **n_estimators = 1000 + early_stopping_rounds = 50** — XGBoost auto-stops
✅ **learning_rate = 0.01-0.1** — lower = better but slower
✅ **max_depth = 4-8** — sâu hơn dễ overfit
✅ **subsample = 0.8, colsample_bytree = 0.8** — randomness chống overfit
✅ **Validate ensemble** carefully — easy to overfit blends

---

## ⚠️ Anti-Patterns

❌ Ensemble **highly correlated models** → no diversity benefit, just slower
❌ Stack trên **same training data** → meta-model overfits. Always use out-of-fold predictions
❌ Average models với **wildly different scales** (probability + raw scores) → cần normalize
❌ Dùng XGBoost với learning_rate=0.3, n_estimators=10000 → overfit nghiêm trọng
❌ Quên \`eval_metric\` trong XGBoost → default sai cho problem (vd: dùng RMSE cho classification)

---

## 🌉 Bridge to Next Lesson

Bạn đã có model tốt nhất qua ensemble + tuning. Nhưng **deploy nó đến production** mới là 80% công việc thực sự. Model decay, data drift, monitoring, A/B testing... Bài tiếp: **MLOps & Deployment** — DevOps cho Machine Learning.`,
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
          { question: "When should you use LightGBM over XGBoost?", options: ["Never", "For large datasets — LightGBM is much faster due to leaf-wise growth and GOSS", "For small datasets", "When you need interpretability"], answer: 1, explanation: "LightGBM's leaf-wise growth, GOSS, and EFB make it 10-20x faster than XGBoost on large datasets, with comparable or better accuracy. Best for datasets with 100K+ rows." }
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
        theory: `**MLOps — DevOps for Machine Learning**

MLOps bridges the gap between developing ML models and deploying them reliably in production. Only ~15% of ML projects make it to production (Gartner) — MLOps aims to change that.

**The MLOps challenge:** Deploying a model is easy. Keeping it working reliably in production is hard. Data changes, user behavior evolves, model performance degrades. MLOps provides the tools and practices to manage this lifecycle.

---

**🔄 The MLOps Lifecycle:**

\`\`\`
1. Data Collection → 2. Feature Engineering → 3. Model Training
       ↑                                              ↓
7. Retraining ← 6. Monitoring ← 5. Serving ← 4. Registry
\`\`\`

**1. Data Collection & Versioning:**
- DVC (Data Version Control): Git for data files
- LakeFS: Git-like operations for data lakes
- Delta Lake: ACID transactions on data lake
- Track: Which data was used for which model version

**2. Feature Store — Centralized Feature Management:**
- **Problem it solves:** Training and serving use different code to compute features → inconsistencies → bugs
- **Solution:** Compute features once, store centrally, serve consistently
- Tools: Feast (open-source), Tecton, Amazon SageMaker Feature Store
- Online store (low latency, real-time features) + Offline store (historical, training)

**3. Experiment Tracking:**
- Log hyperparameters, metrics, artifacts, code versions for every training run
- Compare experiments side-by-side
- Tools: MLflow (most popular), W&B (Weights & Biases), Neptune, Comet

**4. Model Registry:**
- Version models (v1.0, v1.1, v2.0)
- Track model lineage: which data, code, hyperparameters produced this model
- Manage approvals: Staging → Production transitions
- Store model metadata: performance metrics, training date, owner

**5. Model Serving — Making Predictions Available:**
- Covered in detail below

**6. Monitoring — Detecting Problems:**
- Covered in detail below

**7. Automated Retraining:**
- Triggered by: schedule (weekly), drift detection, or performance degradation
- Retrain → evaluate → if better → register → deploy

---

**📦 Model Serving Patterns:**

| Pattern | Latency | Throughput | Use Case | Tools |
|---------|---------|------------|----------|-------|
| REST API | ~50-200ms | Medium | Web apps, mobile | FastAPI, Flask, BentoML |
| gRPC | ~5-20ms | High | Microservices, internal | TensorFlow Serving, Triton |
| Batch Inference | Minutes-Hours | Very High | Nightly predictions, reports | Spark, Airflow |
| Edge/Embedded | ~1-5ms | Low | Mobile, IoT, offline | ONNX, TensorRT, CoreML |
| Serverless | ~200-500ms | Variable | Low-traffic, cost-sensitive | Lambda, Cloud Functions |
| Streaming | ~10-50ms | Continuous | Real-time features | Kafka + model service |

**FastAPI Example:**
\`\`\`python
from fastapi import FastAPI
import joblib

app = FastAPI()
model = joblib.load("model.pkl")

@app.post("/predict")
async def predict(features: dict):
    X = preprocess(features)
    prediction = model.predict(X)
    return {"prediction": prediction.tolist()}
\`\`\`

**Model Optimization for Serving:**
- **Quantization:** Float32 → Int8 (4x smaller, faster, slight accuracy loss)
- **Pruning:** Remove unnecessary weights/neurons
- **Distillation:** Train a small model to mimic a large model
- **ONNX:** Framework-agnostic model format for portable deployment

---

**📊 Model Monitoring — The Most Neglected Part:**

**Data Drift:** Input distribution changes over time
- Example: COVID changed spending patterns → credit score model broke
- Detect: Population Stability Index (PSI), Kolmogorov-Smirnov test, JS divergence
- PSI > 0.25 → significant drift → investigate

**Concept Drift:** The relationship between inputs and outputs changes
- Example: User preferences evolve; what was spam 5 years ago isn't today
- Detect: Monitor prediction performance on labeled data (if available)
- Harder to detect than data drift because you need ground truth labels

**Model Decay:** Gradual performance degradation over time
- Root cause: usually data drift or concept drift
- Solution: Automated retraining triggers (schedule + drift-based)

**Prediction Monitoring:**
- Track prediction distribution (are outputs shifting?)
- Monitor latency (is the model slowing down?)
- Track error rates (are exceptions increasing?)
- Business metrics (is the model still providing value?)

---

**🏗️ MLOps Maturity Levels (Google's Framework):**

| Level | Description | Characteristics |
|-------|-------------|----------------|
| 0 — Manual | Data scientists train manually in notebooks | No automation, no monitoring, no reproducibility |
| 1 — ML Pipeline | Automated training pipeline | Reproducible training, experiment tracking |
| 2 — CI/CD for ML | Automated testing and deployment | Automated testing, staged deployment, model registry |
| 3 — Full Automation | Continuous training + monitoring | Auto-retrain on drift, A/B testing, full observability |

Most organizations are at Level 0-1. The goal is to reach Level 2-3.

---

**📋 Best Practices:**

1. **Version everything:** Data (DVC), code (Git), models (MLflow), configs (YAML), environments (Docker)
2. **Automate testing:** Data validation, model performance tests, integration tests, load tests
3. **A/B testing:** Compare new model vs current in production with real traffic (50/50 or 90/10 split)
4. **Shadow mode (dark launch):** Run new model alongside current without affecting users — compare outputs
5. **Canary deployment:** Route 5% of traffic to new model, monitor, then gradually increase
6. **Rollback plan:** Always be able to revert to the previous model instantly
7. **Feature store:** Centralize feature computation for consistency between training and serving
8. **Model cards:** Document model limitations, intended use, bias evaluations, performance per subgroup
9. **Alert on everything:** Data drift, prediction drift, latency, error rates, business metrics
10. **Keep it simple:** Don't over-engineer. Start with batch prediction, evolve to real-time when needed

---

## 🏢 Case Study: Google's Hidden Technical Debt Paper (2015)

Google Research công bố paper "Hidden Technical Debt in Machine Learning Systems" — **classic** trong MLOps. Phát hiện chính: **ML code chỉ chiếm 5% codebase** của ML systems thực tế. 95% còn lại là:
- Configuration (10%)
- Data Collection (15%)
- Feature Extraction (12%)
- Data Verification (8%)
- Process Management (6%)
- Analysis Tools (12%)
- Monitoring (8%)
- Serving Infrastructure (15%)
- Resource Management (9%)

**Bài học:** "Doing ML" ≠ "Doing notebooks". Production ML là **software engineering** với layers phức tạp.

---

## 🏢 Case Study: Uber Michelangelo — End-to-End MLOps Platform (2017)

Uber xây Michelangelo để serve **>10000 ML models** in production. Components:
- **Feature Store** — share features giữa training và serving (tránh skew)
- **Model Registry** — version control cho models
- **Auto-retraining** — pipeline chạy daily
- **Online prediction** — Cassandra-backed feature lookups <10ms
- **Monitoring** — drift detection, latency, accuracy tracking

**Impact:** Time-to-deploy mới từ 6 tuần → 3 ngày. Models active từ 50 → 10000+.

---

## 🏢 Case Study: Zillow Zestimate Disaster ($304M, 2021)

Zillow Offers (mua nhà dựa trên model) lost $304M, sa thải 25% staff. Nguyên nhân:
- **Data drift** không được detect — COVID thay đổi housing market patterns
- **Model retraining** quá chậm (quarterly) — không bắt kịp shifts
- **No A/B testing** trên model versions trong production
- **Over-trust model** — tin model 100%, không có human-in-loop cho high-value decisions

**Bài học:** Monitoring + drift detection không phải nice-to-have, là **survival**.

---

## 📊 MLOps Maturity Levels (Google)

| Level | Tên | Đặc điểm | Phù hợp với |
|-------|-----|----------|-------------|
| 0 | Manual | Notebooks, deploy bằng tay | Prototype, research |
| 1 | ML Pipeline Automation | CI/CD cho data + model | Startup, single product |
| 2 | CI/CD Pipeline Automation | Auto-retrain, auto-deploy, monitoring | Scale-up, multiple models |
| 3 | Full MLOps | A/B testing, canary, automated rollback | Enterprise (Netflix, Uber) |

**Reality check:** 87% data science projects **never reach production** (Gartner 2019). Lý do chính: gap giữa Level 0 và Level 1.

---

## 📊 Essential MLOps Tools

| Category | Open Source | Commercial |
|----------|-------------|-----------|
| Experiment Tracking | MLflow, Weights & Biases | Neptune.ai, Comet |
| Feature Store | Feast | Tecton, Hopsworks |
| Model Serving | TorchServe, BentoML, Triton | SageMaker, Vertex AI |
| Pipeline Orchestration | Airflow, Prefect, Kubeflow | Databricks, Dagster Cloud |
| Monitoring | Evidently AI, WhyLabs | Arize, Fiddler |
| Model Registry | MLflow Models | Vertex AI Model Registry |

---

## 📋 Best Practices

✅ **Version everything**: code (git), data (DVC), models (MLflow), configs (Hydra)
✅ **CI/CD cho ML**: tests cho data quality, model performance, integration tests
✅ **Shadow deployment** trước canary: chạy model mới song song không ảnh hưởng users
✅ **Drift monitoring**: PSI (Population Stability Index), KL divergence trên features
✅ **Rollback plan**: luôn có thể revert về previous model trong <5 phút
✅ **Latency SLA**: P99 latency, không chỉ mean

---

## ⚠️ Anti-Patterns (từ Sculley et al. Google paper)

❌ **Glue code** — 95% codebase chỉ để adapt 5% ML library
❌ **Pipeline jungles** — data flows chằng chịt, không ai hiểu
❌ **Dead experimental codepaths** — code experiments bỏ lại trong production
❌ **Configuration debt** — 1000+ config flags, không ai biết default nào đúng
❌ **Training-serving skew** — features tính khác nhau giữa train (Pandas) vs serve (Java) → silent failure
❌ **No monitoring** — phát hiện model hỏng từ customer complaints, không phải dashboards

---

## 🎓 Career Path: ML Engineer (FAANG salaries)

| Vị trí | Skills cần | TC range US (2024) |
|--------|-----------|---------------------|
| ML Engineer (entry) | Python + PyTorch + AWS basics | $150-220K |
| Senior ML Engineer | + System design + MLOps tools | $250-400K |
| Staff ML Engineer | + Architecture + cross-team leadership | $400-600K+ |
| Principal/Distinguished | + Industry impact + research | $700K-1M+ |

**Vietnam TC (2024):** ML Engineer mid-level $40-80K, Senior $80-150K.

---

## 🌉 Bridge to Next Steps

Bạn đã hoàn thành 12 modules ML thuần (regression → MLOps). Roadmap tiếp theo:
1. **Deep Learning** (Neural Networks → Transformers) — cho image, text, audio
2. **AI Foundation** (LLMs, RAG, Ethics) — wave hiện tại
3. **Data Engineering** (Spark, Airflow, Kafka) — đảm bảo data flow stable
4. **Cloud Engineering** (AWS/GCP/Azure ML services) — production deployment

Chúc mừng đã hoàn thành ML core!`,
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
          { question: "What is shadow mode deployment?", options: ["Deploying at night", "Running the new model alongside the current one without affecting users, comparing outputs", "Hiding the model", "A testing framework"], answer: 1, explanation: "Shadow mode runs the new model in parallel with production, logging its predictions without serving them to users. You can compare outputs to validate before switching." }
        ]
      }
    ]
  }
];
