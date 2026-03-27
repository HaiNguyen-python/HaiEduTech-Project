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

Linear Regression is the simplest and most fundamental supervised learning algorithm. It models the relationship between a dependent variable (y) and one or more independent variables (X) by fitting a straight line.

---

**📐 The Model:**

**Simple Linear Regression (1 feature):**
\`y = wx + b\`
- w (weight/slope): How much y changes when x increases by 1
- b (bias/intercept): The value of y when x = 0

**Multiple Linear Regression (multiple features):**
\`y = w₁x₁ + w₂x₂ + ... + wₙxₙ + b\`

---

**📏 Loss Function — Mean Squared Error (MSE):**

\`MSE = (1/n) × Σ(yᵢ - ŷᵢ)²\`

- Measures average squared difference between predictions and actual values
- Squaring penalizes large errors more heavily
- Always ≥ 0; MSE = 0 means perfect predictions

---

**🎯 Training — Finding Optimal w and b:**

**Method 1: Closed-Form (Normal Equation)**
\`w = (XᵀX)⁻¹Xᵀy\`
- Exact solution, no iteration needed
- Computationally expensive for large datasets (matrix inversion is O(n³))

**Method 2: Gradient Descent**
- Iteratively update w and b in the direction of steepest descent
- \`w = w - lr × ∂MSE/∂w\`
- Scales better to large datasets

---

**📊 Evaluation Metrics:**

| Metric | Formula | Interpretation |
|--------|---------|---------------|
| MSE | (1/n)Σ(y-ŷ)² | Average squared error |
| RMSE | √MSE | Same units as y |
| MAE | (1/n)Σ|y-ŷ| | Average absolute error |
| R² Score | 1 - SS_res/SS_tot | % variance explained (0-1) |

**R² Score Interpretation:**
- R² = 1.0 → Perfect predictions
- R² = 0.0 → Model is no better than predicting the mean
- R² < 0.0 → Model is worse than predicting the mean

---

**📋 Assumptions of Linear Regression:**

1. **Linearity:** Relationship between X and y is linear
2. **Independence:** Observations are independent
3. **Homoscedasticity:** Constant variance of residuals
4. **Normality:** Residuals are normally distributed
5. **No multicollinearity:** Features are not highly correlated (for multiple regression)

Violating these assumptions can lead to unreliable predictions.

---

**🔧 When to Use Linear Regression:**
- Quick baseline model
- When the relationship is approximately linear
- When interpretability matters (coefficients have clear meaning)
- Feature importance analysis`,
        theoryEn: `**Linear Regression — Predicting Continuous Values**

**Model:** y = wx + b (simple) or y = w₁x₁ + w₂x₂ + ... + b (multiple).

**Loss:** MSE = (1/n)Σ(y-ŷ)². Penalizes large errors heavily.

**Training:** Closed-form (exact but expensive) or Gradient Descent (iterative, scalable).

**R² Score:** 1 = perfect, 0 = predicting mean, <0 = worse than mean.

**Assumptions:** Linearity, independence, constant variance, normal residuals, no multicollinearity.

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
          { question: "What does the weight (w) in y = wx + b represent?", options: ["The error", "How much y changes per unit increase in x", "The prediction", "The learning rate"], answer: 1, explanation: "The weight (slope) tells you: for every 1-unit increase in x, y increases by w units. It quantifies the linear relationship." }
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

Despite its name, Logistic Regression is a **classification** algorithm, not regression. It predicts the probability that an input belongs to a particular class (0 or 1).

---

**📐 The Model:**

\`P(y=1|x) = σ(wx + b) = 1 / (1 + e^(-(wx+b)))\`

The **Sigmoid function** maps any real number to the range [0, 1], interpretable as a probability.

**Decision Rule:** If P(y=1) ≥ 0.5, predict class 1; otherwise predict class 0.

**Decision Boundary:** The line/surface where P(y=1) = 0.5, i.e., wx + b = 0.

---

**📏 Loss Function — Binary Cross-Entropy:**

\`L = -(1/n) × Σ[yᵢ·log(ŷᵢ) + (1-yᵢ)·log(1-ŷᵢ)]\`

- When y=1 and ŷ≈1: loss ≈ 0 (correct, confident)
- When y=1 and ŷ≈0: loss → ∞ (wrong, confident → heavy penalty)
- MSE doesn't work well for classification because the loss surface becomes non-convex

---

**📊 Evaluation Metrics for Classification:**

| Metric | Formula | When to Use |
|--------|---------|-------------|
| Accuracy | (TP+TN)/Total | Balanced classes |
| Precision | TP/(TP+FP) | When FP is costly (spam filter) |
| Recall | TP/(TP+FN) | When FN is costly (disease detection) |
| F1 Score | 2×P×R/(P+R) | Imbalanced classes |
| AUC-ROC | Area under ROC curve | Overall model quality |

**Confusion Matrix:**
\`\`\`
              Predicted
              Pos    Neg
Actual Pos    TP     FN
Actual Neg    FP     TN
\`\`\`

---

**🔧 Threshold Tuning:**

The default threshold of 0.5 isn't always optimal:
- **High threshold (e.g., 0.8):** More conservative — higher precision, lower recall
- **Low threshold (e.g., 0.3):** More permissive — higher recall, lower precision

Choose based on the cost of false positives vs false negatives.

---

**📋 Multi-Class Extension:**

- **One-vs-Rest (OvR):** Train one classifier per class
- **Softmax Regression:** Extends logistic regression to K classes directly`,
        theoryEn: `**Logistic Regression — Binary Classification**

**Model:** P(y=1) = sigmoid(wx + b). Output is probability [0,1].

**Loss:** Binary Cross-Entropy. Heavily penalizes confident wrong predictions.

**Metrics:** Accuracy (balanced), Precision (FP costly), Recall (FN costly), F1 (imbalanced), AUC.

**Threshold:** Default 0.5; tune based on FP vs FN costs.

**Multi-class:** One-vs-Rest or Softmax Regression.`,
        code: "import numpy as np\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-np.clip(z, -500, 500)))\n\nclass LogisticRegression:\n    def __init__(self, lr=0.1, epochs=1000):\n        self.lr = lr\n        self.epochs = epochs\n\n    def fit(self, X, y):\n        self.w = np.zeros(X.shape[1])\n        self.b = 0\n        for epoch in range(self.epochs):\n            z = X @ self.w + self.b\n            pred = sigmoid(z)\n            dw = (X.T @ (pred - y)) / len(y)\n            db = np.mean(pred - y)\n            self.w -= self.lr * dw\n            self.b -= self.lr * db\n            if epoch % 200 == 0:\n                loss = -np.mean(y*np.log(pred+1e-7) + (1-y)*np.log(1-pred+1e-7))\n                print(f'  Epoch {epoch}: loss = {loss:.4f}')\n\n    def predict(self, X):\n        return (sigmoid(X @ self.w + self.b) >= 0.5).astype(int)\n\n# Sample data\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = ((X[:, 0] + X[:, 1]) > 0).astype(int)\n\nmodel = LogisticRegression(lr=0.5, epochs=1000)\nprint('Training Logistic Regression:')\nmodel.fit(X, y)\n\npreds = model.predict(X)\nacc = np.mean(preds == y)\nprint(f'\\nAccuracy: {acc:.2%}')\nprint(f'Weights: {model.w.round(3)}, Bias: {model.b:.3f}')",
        codeLanguage: "python",
        exercise: "Add Precision, Recall, F1-Score and Confusion Matrix calculation to the model above.",
        exerciseEn: "Add Precision, Recall, F1-Score and Confusion Matrix calculation to the model above.",
        quiz: [
          { question: "What does high Precision mean?", options: ["Few false negatives", "Few false positives in positive predictions", "High accuracy", "Low loss"], answer: 1, explanation: "Precision = TP/(TP+FP). High precision means when the model predicts positive, it's usually correct." },
          { question: "When is Recall more important than Precision?", options: ["When false positives are dangerous", "When missing positive cases is very dangerous (e.g., cancer diagnosis)", "Always", "When data is balanced"], answer: 1, explanation: "Recall is crucial when false negatives are costly — missing a cancer diagnosis (FN) is far worse than a false alarm (FP)." },
          { question: "Why can't we use MSE for classification?", options: ["MSE is always worse", "MSE creates a non-convex loss surface with local minima", "MSE doesn't work with probabilities", "We can, it's just convention"], answer: 1, explanation: "MSE with sigmoid creates a non-convex loss surface, making gradient descent likely to get stuck in local minima. Cross-entropy is convex and better suited." },
          { question: "What is the decision boundary in Logistic Regression?", options: ["Where loss = 0", "The surface where P(y=1) = 0.5 (wx + b = 0)", "The maximum probability", "The training data boundary"], answer: 1, explanation: "The decision boundary is where the model is equally uncertain — P(y=1) = 0.5, which occurs when wx + b = 0." },
          { question: "What does AUC-ROC measure?", options: ["Training speed", "The model's ability to distinguish classes across all thresholds", "The loss value", "The number of parameters"], answer: 1, explanation: "AUC-ROC measures how well the model separates positive and negative classes across all possible thresholds. AUC=1 is perfect, AUC=0.5 is random." }
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

Decision Trees classify data by learning a series of if/else rules from the data. They're one of the most interpretable ML models — you can literally read the decision process.

---

**🌳 How It Works:**

1. Start with all data at the root
2. Find the best feature and threshold to split
3. Create two child nodes
4. Repeat recursively until stopping criteria are met

**Analogy:** It's like playing 20 Questions — each question splits the possibilities.

---

**📏 Splitting Criteria:**

**Gini Impurity:**
\`G = 1 - Σ(pᵢ²)\`
- Measures how "mixed" a node is
- G = 0 → pure node (all same class)
- G = 0.5 → maximally impure (binary, 50/50)
- Used by scikit-learn (default), CART

**Entropy:**
\`H = -Σ(pᵢ × log₂(pᵢ))\`
- Information-theoretic measure of disorder
- H = 0 → pure, H = 1 → maximally impure (binary)
- Used by ID3, C4.5

**Information Gain:**
\`IG = H(parent) - Σ(|childᵢ|/|parent| × H(childᵢ))\`
- Measures how much impurity decreases after a split
- Best split = highest Information Gain

---

**✂️ Preventing Overfitting (Pruning):**

Decision trees without constraints will grow until each leaf is pure — memorizing the training data (overfitting).

**Pre-pruning (constraints during training):**
- max_depth: Limit tree depth
- min_samples_split: Minimum samples to split a node
- min_samples_leaf: Minimum samples in a leaf
- max_features: Random subset of features per split

**Post-pruning:**
- Grow full tree, then remove nodes that don't improve validation performance
- Cost-complexity pruning (ccp_alpha in scikit-learn)

---

**📊 Pros and Cons:**

| Pros | Cons |
|------|------|
| Highly interpretable | Prone to overfitting |
| No feature scaling needed | Unstable (small data changes → different tree) |
| Handles categorical & numerical | Can create biased trees with imbalanced data |
| Fast inference | Not great for complex boundaries |
| Feature importance built-in | Greedy (locally optimal, not globally) |`,
        theoryEn: `**Decision Trees — Intuitive Classification**

**How it works:** Recursively split data using best feature/threshold until stopping criteria.

**Splitting:** Gini Impurity (1-Σpᵢ²) or Entropy (-Σpᵢlog₂pᵢ). Best split = highest Information Gain.

**Pruning:** Pre-pruning (max_depth, min_samples) or post-pruning (remove unhelpful nodes).

**Pros:** Interpretable, no scaling needed, handles mixed types. **Cons:** Overfits, unstable, greedy.`,
        code: "import numpy as np\n\ndef gini(y):\n    classes = np.unique(y)\n    return 1 - sum((np.sum(y == c) / len(y)) ** 2 for c in classes)\n\ndef best_split(X, y):\n    best_gain, best_feat, best_thresh = -1, None, None\n    parent_gini = gini(y)\n    for feat in range(X.shape[1]):\n        thresholds = np.unique(X[:, feat])\n        for t in thresholds:\n            left = y[X[:, feat] <= t]\n            right = y[X[:, feat] > t]\n            if len(left) == 0 or len(right) == 0:\n                continue\n            gain = parent_gini - (len(left)*gini(left) + len(right)*gini(right)) / len(y)\n            if gain > best_gain:\n                best_gain, best_feat, best_thresh = gain, feat, t\n    return best_feat, best_thresh, best_gain\n\n# Sample data\nnp.random.seed(42)\nX = np.array([[2,3],[1,1],[3,2],[6,5],[7,8],[8,6],[4,4],[5,7]])\ny = np.array([0,0,0,1,1,1,0,1])\n\nfeat, thresh, gain = best_split(X, y)\nprint(f'Best split: Feature {feat}, Threshold {thresh}')\nprint(f'Information Gain: {gain:.4f}')\nprint(f'Parent Gini: {gini(y):.4f}')\n\nleft_mask = X[:, feat] <= thresh\nprint(f'\\nLeft ({sum(left_mask)} samples): Gini = {gini(y[left_mask]):.4f}')\nprint(f'Right ({sum(~left_mask)} samples): Gini = {gini(y[~left_mask]):.4f}')",
        codeLanguage: "python",
        exercise: "Implement a full Decision Tree (recursive splitting to max_depth=3). Predict on new data.",
        exerciseEn: "Implement a full Decision Tree (recursive splitting to max_depth=3). Predict on new data.",
        quiz: [
          { question: "What does Gini = 0 mean?", options: ["Empty node", "Node is perfectly pure (all one class)", "Overfitting", "Can't split further"], answer: 1, explanation: "Gini = 0 means all samples in the node belong to the same class. It's perfectly pure — no need to split further." },
          { question: "Why do Decision Trees tend to overfit?", options: ["Too few parameters", "Without constraints, they grow until each leaf is pure, memorizing training data", "They're too simple", "They ignore features"], answer: 1, explanation: "An unconstrained tree will keep splitting until every leaf contains a single class, effectively memorizing the training data including noise." },
          { question: "What is Information Gain?", options: ["How much accuracy improves", "The reduction in impurity (entropy/gini) after a split", "The number of features used", "The tree depth"], answer: 1, explanation: "Information Gain measures how much a split reduces the impurity of child nodes compared to the parent. The best split maximizes IG." },
          { question: "What is the advantage of trees over linear models?", options: ["Always more accurate", "Can capture non-linear relationships and don't need feature scaling", "Faster to train", "Fewer parameters"], answer: 1, explanation: "Trees naturally handle non-linear boundaries by combining multiple splits, and they work with raw features without normalization." },
          { question: "What does max_depth control?", options: ["Number of features", "Maximum tree depth — limits complexity to prevent overfitting", "Training speed only", "Number of classes"], answer: 1, explanation: "max_depth limits how deep the tree can grow. Shallow trees (low depth) underfit; deep trees overfit. It's the primary regularization parameter." }
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

Random Forest = many Decision Trees voting together. It's one of the most reliable and widely-used ML algorithms.

---

**🎲 Bagging (Bootstrap Aggregating):**

1. Create N bootstrap samples (random sampling with replacement)
2. Train one Decision Tree on each sample
3. Combine predictions: majority vote (classification) or average (regression)

**Why it works:** Each tree sees different data, so they make different errors. When combined, errors cancel out → lower variance.

---

**🌿 Random Feature Sampling:**

At each split, only consider a random subset of features:
- Classification: √(n_features)
- Regression: n_features / 3

**Why?** Without this, all trees would look similar (dominated by the same strong features). Random features create diversity.

---

**📊 Key Hyperparameters:**

| Parameter | Effect | Typical Range |
|-----------|--------|--------------|
| n_estimators | Number of trees | 100-500 |
| max_depth | Tree depth limit | None or 10-30 |
| max_features | Features per split | sqrt(n) or n/3 |
| min_samples_split | Min samples to split | 2-10 |

---

**🎯 Feature Importance:**

Random Forests naturally provide feature importance scores:
- **Impurity-based:** How much each feature reduces impurity across all trees
- **Permutation-based:** How much accuracy drops when a feature is randomly shuffled

---

**📋 Pros and Cons:**

| Pros | Cons |
|------|------|
| Very accurate out-of-box | Less interpretable than single tree |
| Hard to overfit (with enough trees) | Slower than single tree |
| Handles missing values | Memory-intensive |
| Built-in feature importance | Not great for very high-dimensional sparse data |
| Parallelizable | Can be biased toward features with more levels |`,
        theoryEn: `**Random Forest — Many Trees Voting Together**

**Bagging:** Bootstrap samples → Train tree each → Vote/average. Errors cancel out.

**Random Features:** Each split considers random feature subset → tree diversity.

**Key Parameters:** n_estimators (100-500), max_depth, max_features (√n), min_samples_split.

**Feature Importance:** Impurity-based or permutation-based.

**Pros:** Accurate, hard to overfit, parallelizable. **Cons:** Less interpretable, slower, memory-heavy.`,
        code: "import numpy as np\n\nclass SimpleRandomForest:\n    def __init__(self, n_trees=5, max_depth=3):\n        self.n_trees = n_trees\n        self.max_depth = max_depth\n        self.trees = []\n\n    def _bootstrap(self, X, y):\n        idx = np.random.choice(len(X), size=len(X), replace=True)\n        return X[idx], y[idx]\n\n    def _build_stump(self, X, y):\n        best_feat, best_thresh = 0, 0\n        best_gini = float('inf')\n        feat_subset = np.random.choice(X.shape[1], max(1, X.shape[1]//2), replace=False)\n        for f in feat_subset:\n            for t in np.unique(X[:, f]):\n                left = y[X[:, f] <= t]\n                right = y[X[:, f] > t]\n                if len(left) == 0 or len(right) == 0: continue\n                g = (len(left) * (1-sum((np.sum(left==c)/len(left))**2 for c in np.unique(left))) +\n                     len(right) * (1-sum((np.sum(right==c)/len(right))**2 for c in np.unique(right)))) / len(y)\n                if g < best_gini:\n                    best_gini, best_feat, best_thresh = g, f, t\n        left_class = np.bincount(y[X[:, best_feat] <= best_thresh].astype(int)).argmax() if sum(X[:, best_feat] <= best_thresh) > 0 else 0\n        right_class = np.bincount(y[X[:, best_feat] > best_thresh].astype(int)).argmax() if sum(X[:, best_feat] > best_thresh) > 0 else 0\n        return {'feat': best_feat, 'thresh': best_thresh, 'left': left_class, 'right': right_class}\n\n    def fit(self, X, y):\n        for i in range(self.n_trees):\n            X_boot, y_boot = self._bootstrap(X, y)\n            tree = self._build_stump(X_boot, y_boot)\n            self.trees.append(tree)\n            print(f'  Tree {i+1}: split feature={tree[\"feat\"]}, threshold={tree[\"thresh\"]:.2f}')\n\n    def predict(self, X):\n        preds = np.zeros((len(X), self.n_trees))\n        for j, tree in enumerate(self.trees):\n            preds[:, j] = np.where(X[:, tree['feat']] <= tree['thresh'], tree['left'], tree['right'])\n        return np.array([np.bincount(row.astype(int)).argmax() for row in preds])\n\nnp.random.seed(42)\nX = np.random.randn(80, 3)\ny = ((X[:, 0] + X[:, 1] - X[:, 2]) > 0).astype(int)\n\nrf = SimpleRandomForest(n_trees=7)\nprint('Training Random Forest:')\nrf.fit(X, y)\npreds = rf.predict(X)\nprint(f'\\nAccuracy: {np.mean(preds == y):.2%}')",
        codeLanguage: "python",
        exercise: "Add Out-of-Bag (OOB) error estimation to Random Forest.",
        exerciseEn: "Add Out-of-Bag (OOB) error estimation to Random Forest.",
        quiz: [
          { question: "Why does Random Forest overfit less than a single Decision Tree?", options: ["Uses fewer features", "Bagging + feature sampling creates diverse trees whose errors cancel out", "Trees are shallower", "Uses different loss"], answer: 1, explanation: "Bagging creates diverse training sets, and random feature selection ensures trees are different. When combined, individual errors cancel out, reducing variance." },
          { question: "What is Out-of-Bag (OOB) error?", options: ["Error on training data", "Error estimated using samples NOT used to train each tree (free validation)", "Error on test data", "Error from pruning"], answer: 1, explanation: "Each bootstrap sample leaves ~37% of data unused. These OOB samples serve as a free validation set for each tree, providing an unbiased error estimate without needing a separate test set." },
          { question: "Why does random feature sampling help?", options: ["Reduces computation", "Prevents all trees from being dominated by the same strong features", "Makes trees simpler", "Increases accuracy of each tree"], answer: 1, explanation: "Without random features, all trees would split on the same dominant features, making them highly correlated. Random feature sampling creates diversity, which is key to ensemble success." },
          { question: "How does Random Forest make predictions for classification?", options: ["Uses the first tree", "Each tree votes, majority wins", "Averages probabilities", "Uses the deepest tree"], answer: 1, explanation: "For classification, each tree in the forest makes its own prediction, and the final output is the class that receives the most votes (majority voting)." },
          { question: "What happens if you increase n_estimators?", options: ["Always overfits", "Performance improves and then plateaus (more trees rarely hurt)", "Performance gets worse", "Training gets faster"], answer: 1, explanation: "Adding more trees generally improves performance up to a point, then plateaus. Unlike single trees, more trees in a Random Forest don't cause overfitting — they just add computation." }
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

SVM finds the optimal hyperplane that separates two classes with the **maximum margin** — the widest possible gap between classes.

---

**📐 Core Concepts:**

**Hyperplane:** A decision boundary that separates classes (line in 2D, plane in 3D, hyperplane in higher dimensions).

**Margin:** Distance from the hyperplane to the nearest data point on each side. SVM maximizes this margin for better generalization.

**Support Vectors:** The data points closest to the hyperplane — they "support" and define the boundary. Only these points matter for the model.

---

**🔧 Hard vs Soft Margin:**

**Hard Margin SVM:**
- Requires perfect separation (no misclassification)
- Fails if data is not linearly separable or has noise

**Soft Margin SVM (C parameter):**
- Allows some misclassification for a wider margin
- C controls the trade-off:
  - High C → narrow margin, fewer misclassifications (risk of overfitting)
  - Low C → wide margin, more misclassifications (better generalization)

---

**🎪 The Kernel Trick:**

When data isn't linearly separable in its original space, map it to a higher dimension where it IS separable.

| Kernel | Formula | Best For |
|--------|---------|----------|
| Linear | K(x,y) = x·y | Linearly separable data |
| RBF/Gaussian | K(x,y) = exp(-γ‖x-y‖²) | Most common, works well generally |
| Polynomial | K(x,y) = (x·y + c)^d | Data with polynomial relationships |

**The "trick":** You never actually compute in the higher dimension — the kernel function computes the dot product directly, saving enormous computation.

**RBF γ parameter:**
- High γ → each point has tight influence (complex boundary, risk of overfitting)
- Low γ → broad influence (smooth boundary)

---

**📊 SVM vs Other Models:**

| Aspect | SVM | Decision Tree | Logistic Regression |
|--------|-----|---------------|-------------------|
| Boundary | Maximum margin | Axis-aligned | Linear probability |
| Interpretable | Moderate | High | High |
| Feature scaling | Required | Not needed | Recommended |
| Non-linear | Kernel trick | Natural | Feature engineering |
| Best for | Medium data, complex boundaries | Tabular data | Probabilistic output |`,
        theoryEn: `**SVM — Maximum Margin Classification**

**Hyperplane:** Decision boundary. **Margin:** Distance to nearest points (maximize). **Support Vectors:** Points defining the boundary.

**Soft Margin (C):** High C → narrow margin. Low C → wide margin.

**Kernel Trick:** Map data to higher dimension. Linear, RBF (most common), Polynomial. Never actually computes in high dimension.

**RBF γ:** High → complex boundary. Low → smooth.`,
        code: "import numpy as np\n\n# Simple linear SVM using gradient descent\nclass SimpleSVM:\n    def __init__(self, lr=0.001, C=1.0, epochs=1000):\n        self.lr = lr\n        self.C = C\n        self.epochs = epochs\n\n    def fit(self, X, y):\n        y_svm = np.where(y == 0, -1, 1)  # SVM uses -1/+1\n        self.w = np.zeros(X.shape[1])\n        self.b = 0\n\n        for epoch in range(self.epochs):\n            for i in range(len(X)):\n                margin = y_svm[i] * (X[i] @ self.w + self.b)\n                if margin >= 1:\n                    self.w -= self.lr * self.w  # regularization only\n                else:\n                    self.w -= self.lr * (self.w - self.C * y_svm[i] * X[i])\n                    self.b += self.lr * self.C * y_svm[i]\n\n            if epoch % 200 == 0:\n                loss = 0.5 * np.dot(self.w, self.w) + self.C * np.sum(np.maximum(0, 1 - y_svm * (X @ self.w + self.b)))\n                print(f'  Epoch {epoch}: loss = {loss:.4f}')\n\n    def predict(self, X):\n        return (X @ self.w + self.b >= 0).astype(int)\n\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = ((X[:, 0] + X[:, 1]) > 0).astype(int)\n\nsvm = SimpleSVM(lr=0.001, C=1.0, epochs=1000)\nprint('Training SVM:')\nsvm.fit(X, y)\nacc = np.mean(svm.predict(X) == y)\nprint(f'\\nAccuracy: {acc:.2%}')\nprint(f'Weights: {svm.w.round(3)}, Bias: {svm.b:.3f}')",
        codeLanguage: "python",
        exercise: "Implement RBF kernel: create kernel matrix and use for non-linear classification.",
        exerciseEn: "Implement RBF kernel: create kernel matrix and use for non-linear classification.",
        quiz: [
          { question: "What are Support Vectors?", options: ["All data points", "Points closest to the hyperplane that define the decision boundary", "Outliers", "Centroids"], answer: 1, explanation: "Support Vectors are the data points closest to the decision boundary. They are the only points that influence the position and orientation of the hyperplane." },
          { question: "What does the C parameter control in SVM?", options: ["Number of features", "Trade-off between wide margin and misclassification tolerance", "Learning rate", "Number of support vectors"], answer: 1, explanation: "C controls the balance: High C penalizes misclassification heavily (narrow margin), Low C allows more errors for a wider margin (better generalization)." },
          { question: "What is the Kernel Trick?", options: ["A debugging technique", "Computing dot products in higher dimensions without actually transforming the data", "A way to speed up training", "Feature selection"], answer: 1, explanation: "The kernel trick lets SVM work in high-dimensional space by computing dot products through a kernel function, without explicitly transforming the data." },
          { question: "When is RBF kernel preferred over Linear?", options: ["Always", "When data is not linearly separable", "When there's very little data", "When features are already scaled"], answer: 1, explanation: "RBF kernel can handle non-linear boundaries by implicitly mapping data to infinite-dimensional space. Linear is preferred when data is linearly separable." },
          { question: "Why does SVM require feature scaling?", options: ["It doesn't", "Features with large ranges would dominate the distance/margin calculations", "To speed up training", "Convention only"], answer: 1, explanation: "SVM relies on distances between data points. Without scaling, features with larger ranges would disproportionately influence the margin calculation." }
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

K-Means is the most popular unsupervised clustering algorithm. Unlike supervised learning, there are **no labels** — the algorithm discovers natural groupings in data.

---

**🔄 The Algorithm (Lloyd's):**

1. **Initialize:** Choose K random centroids
2. **Assign:** Each point → nearest centroid (Euclidean distance)
3. **Update:** Each centroid → mean of assigned points
4. **Repeat** steps 2-3 until centroids stop moving (convergence)

Typically converges in 10-50 iterations.

---

**🎯 Choosing K (Number of Clusters):**

**Elbow Method:**
- Run K-Means for K = 1, 2, 3, ..., 10
- Plot K vs Inertia (sum of squared distances to centroids)
- Look for the "elbow" — where adding more clusters gives diminishing returns

**Silhouette Score:**
- Measures how similar a point is to its own cluster vs nearest other cluster
- Range: [-1, 1]. Higher is better.
- s = (b - a) / max(a, b), where a = avg intra-cluster distance, b = avg nearest-cluster distance

---

**📋 Limitations:**

| Limitation | Solution |
|-----------|----------|
| Must choose K beforehand | Elbow method, silhouette analysis |
| Sensitive to initialization | K-Means++ initialization |
| Assumes spherical clusters | DBSCAN, GMM for non-spherical |
| Sensitive to outliers | Remove outliers or use K-Medoids |
| Only finds convex clusters | Use spectral clustering |

---

**🔧 K-Means++ Initialization:**

Instead of random initialization:
1. Choose first centroid randomly
2. For each remaining centroid, choose the point with highest probability proportional to distance² from nearest existing centroid
3. This spreads centroids apart, avoiding poor initializations

---

**📊 Applications:**

- Customer segmentation (marketing)
- Image compression (color quantization)
- Document clustering
- Anomaly detection (far from all centroids)
- Feature engineering (cluster as a new feature)`,
        theoryEn: `**K-Means — Unsupervised Clustering**

**Algorithm:** Initialize centroids → Assign points → Update centroids → Repeat until convergence.

**Choosing K:** Elbow Method (inertia plot) or Silhouette Score.

**K-Means++:** Smart initialization — spreads centroids apart for better results.

**Limitations:** Must choose K, assumes spherical clusters, sensitive to outliers.

**Applications:** Customer segmentation, image compression, document clustering, anomaly detection.`,
        code: "import numpy as np\n\nclass KMeans:\n    def __init__(self, k=3, max_iters=100):\n        self.k = k\n        self.max_iters = max_iters\n\n    def fit(self, X):\n        idx = np.random.choice(len(X), self.k, replace=False)\n        self.centroids = X[idx].copy()\n\n        for iteration in range(self.max_iters):\n            # Assign clusters\n            distances = np.array([np.linalg.norm(X - c, axis=1) for c in self.centroids]).T\n            self.labels = np.argmin(distances, axis=1)\n\n            # Update centroids\n            new_centroids = np.array([X[self.labels == i].mean(axis=0) if sum(self.labels == i) > 0 else self.centroids[i] for i in range(self.k)])\n\n            if np.allclose(self.centroids, new_centroids):\n                print(f'  Converged at iteration {iteration}')\n                break\n            self.centroids = new_centroids\n\n        self.inertia = sum(np.sum((X[self.labels == i] - self.centroids[i])**2) for i in range(self.k))\n        return self\n\nnp.random.seed(42)\n# Generate 3 clusters\nX = np.vstack([\n    np.random.randn(30, 2) + [0, 0],\n    np.random.randn(30, 2) + [5, 5],\n    np.random.randn(30, 2) + [10, 0],\n])\n\nkm = KMeans(k=3)\nkm.fit(X)\nprint(f'Centroids:\\n{km.centroids.round(2)}')\nprint(f'Inertia: {km.inertia:.2f}')\n\n# Elbow method\nprint('\\nElbow Method:')\nfor k in range(2, 7):\n    km = KMeans(k=k)\n    km.fit(X)\n    print(f'  K={k}: Inertia = {km.inertia:.2f}')",
        codeLanguage: "python",
        exercise: "Implement K-Means++ initialization and compare with random init over 10 runs.",
        exerciseEn: "Implement K-Means++ initialization and compare with random init over 10 runs.",
        quiz: [
          { question: "How does the Elbow Method choose K?", options: ["Largest K", "K at the 'elbow' where inertia reduction slows dramatically", "K = 2 always", "K = number of features"], answer: 1, explanation: "The elbow point is where adding more clusters provides diminishing returns in inertia reduction, forming an 'elbow' shape in the plot." },
          { question: "Why is K-Means sensitive to initialization?", options: ["It always converges", "Random initial centroids can lead to different (suboptimal) final clusters", "It doesn't use centroids", "It's deterministic"], answer: 1, explanation: "K-Means finds a local minimum, not the global one. Bad initial centroid placement can lead to suboptimal clustering. K-Means++ mitigates this." },
          { question: "What does Silhouette Score measure?", options: ["Number of clusters", "How well each point fits its cluster vs nearest other cluster", "Training speed", "Convergence rate"], answer: 1, explanation: "Silhouette Score ranges from -1 to 1. High scores mean points are well-matched to their cluster and poorly-matched to neighboring clusters." },
          { question: "When does K-Means fail?", options: ["With round clusters", "With non-spherical, overlapping, or varying-size clusters", "With normalized data", "With few features"], answer: 1, explanation: "K-Means assumes clusters are spherical and similar in size. It fails on elongated, ring-shaped, or differently-sized clusters." },
          { question: "What is inertia in K-Means?", options: ["A hyperparameter", "Sum of squared distances from each point to its cluster centroid", "Number of iterations", "Distance between centroids"], answer: 1, explanation: "Inertia measures how internally coherent clusters are. Lower inertia = tighter clusters. It always decreases as K increases." }
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

"Applied ML is basically feature engineering" — Andrew Ng. Good features matter more than complex models.

---

**📏 Feature Scaling:**

**StandardScaler (Z-score):**
\`z = (x - μ) / σ\`
- Centers to mean=0, std=1
- Best for: algorithms using gradients (linear models, neural nets, SVM)

**MinMaxScaler:**
\`x_norm = (x - min) / (max - min)\`
- Scales to [0, 1]
- Best for: when you need bounded values, image pixels

**RobustScaler:**
\`x = (x - median) / IQR\`
- Robust to outliers

**When to scale:** SVM, KNN, PCA, Neural Networks, Linear/Logistic Regression
**When NOT to scale:** Tree-based models (Decision Trees, Random Forests, XGBoost)

---

**🏷️ Categorical Encoding:**

| Method | When to Use | Example |
|--------|------------|---------|
| One-Hot | Nominal categories, few unique values | Color: R→[1,0,0], G→[0,1,0] |
| Label | Ordinal categories | Size: S→0, M→1, L→2 |
| Target | High-cardinality categoricals | ZIP code → mean of target |
| Binary | Large number of categories | Hash-based encoding |

**Caution:** One-hot encoding with many categories creates sparse, high-dimensional data (curse of dimensionality).

---

**📊 Feature Selection:**

**Filter Methods (fast, model-agnostic):**
- Correlation analysis: Remove features with low correlation to target
- Variance threshold: Remove near-constant features
- Chi-squared test: For categorical features

**Wrapper Methods (accurate, slower):**
- Forward selection: Start empty, add best feature iteratively
- Backward elimination: Start full, remove worst feature iteratively

**Embedded Methods (built into model):**
- L1 Regularization (Lasso): Shrinks unimportant feature weights to 0
- Tree-based feature importance

---

**🔨 Feature Creation:**

- **Polynomial features:** x₁², x₁×x₂ (captures non-linear relationships)
- **Log/sqrt transform:** Reduces skewness
- **Binning:** Continuous → categories (age → age_group)
- **Date features:** year, month, day_of_week, is_holiday
- **Text features:** word count, sentiment score, TF-IDF
- **Interaction features:** ratio, difference, product of features`,
        theoryEn: `**Feature Engineering — The Most Impactful ML Skill**

**Scaling:** StandardScaler (gradient-based models), MinMaxScaler (bounded values), RobustScaler (outliers).

**Encoding:** One-Hot (nominal), Label (ordinal), Target (high-cardinality).

**Selection:** Filter (correlation, variance), Wrapper (forward/backward), Embedded (L1, tree importance).

**Creation:** Polynomial, log transform, binning, date features, interactions.`,
        code: "import numpy as np\n\n# StandardScaler\ndef standard_scale(X):\n    return (X - X.mean(axis=0)) / X.std(axis=0)\n\n# MinMaxScaler\ndef minmax_scale(X):\n    return (X - X.min(axis=0)) / (X.max(axis=0) - X.min(axis=0))\n\n# One-Hot Encoding\ndef one_hot(categories, unique_cats):\n    encoded = np.zeros((len(categories), len(unique_cats)))\n    for i, cat in enumerate(categories):\n        encoded[i, unique_cats.index(cat)] = 1\n    return encoded\n\n# Demo\nX = np.array([[1, 1000], [2, 2000], [3, 3000], [4, 4000], [5, 5000]], dtype=float)\nprint('Original:')\nprint(X)\nprint('\\nStandard Scaled:')\nprint(standard_scale(X).round(3))\nprint('\\nMinMax Scaled:')\nprint(minmax_scale(X).round(3))\n\n# One-hot encoding\ncats = ['red', 'blue', 'red', 'green', 'blue']\nunique = ['red', 'blue', 'green']\nprint('\\nOne-Hot Encoding:')\nprint(f'Categories: {cats}')\nprint(one_hot(cats, unique))\n\n# Correlation\nnp.random.seed(42)\nfeatures = np.random.randn(100, 3)\nfeatures[:, 2] = features[:, 0] * 0.9 + np.random.randn(100) * 0.1\ncorr = np.corrcoef(features.T)\nprint('\\nCorrelation Matrix:')\nfor i in range(3):\n    print(f'  Feature {i}: {corr[i].round(3)}')",
        codeLanguage: "python",
        exercise: "Implement Target Encoding for categorical features. Add smoothing to prevent overfitting.",
        exerciseEn: "Implement Target Encoding for categorical features. Add smoothing to prevent overfitting.",
        quiz: [
          { question: "Why is feature scaling needed?", options: ["Makes data prettier", "Many algorithms (SVM, KNN, Neural Nets) are sensitive to feature scales", "Required by all models", "Always increases accuracy"], answer: 1, explanation: "Distance-based (KNN, SVM) and gradient-based (Neural Networks) algorithms are sensitive to scale — features with larger ranges would dominate." },
          { question: "When should you NOT scale features?", options: ["Never", "With tree-based models (Decision Trees, Random Forests, XGBoost)", "With neural networks", "With linear models"], answer: 1, explanation: "Tree-based models split on individual feature values and are not affected by feature scaling. Scaling would add unnecessary computation." },
          { question: "What is the risk of One-Hot encoding with many categories?", options: ["Loss of information", "Curse of dimensionality — creates very sparse, high-dimensional data", "It's always fine", "Data becomes smaller"], answer: 1, explanation: "A feature with 1000 unique categories becomes 1000 binary columns, creating extremely sparse and high-dimensional data that can hurt model performance." },
          { question: "What does L1 (Lasso) regularization do for feature selection?", options: ["Selects all features", "Shrinks unimportant feature weights to exactly zero, effectively removing them", "Increases all weights", "Has no effect on features"], answer: 1, explanation: "L1 regularization penalizes the absolute value of weights, pushing less important features' coefficients to exactly zero — built-in feature selection." },
          { question: "Why create polynomial features?", options: ["To reduce dimensions", "To capture non-linear relationships using linear models", "To make data linear", "To remove outliers"], answer: 1, explanation: "Adding x², x³, or x₁×x₂ as features allows linear models to fit non-linear patterns. It's a way to get non-linearity without using non-linear models." }
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

A single train/test split can give misleading results depending on which data ends up in which set. Cross-validation provides a more robust performance estimate.

---

**🔄 K-Fold Cross-Validation:**

1. Split data into K equal folds (typically K=5 or K=10)
2. For each fold i:
   - Use fold i as test set
   - Use remaining K-1 folds as training set
   - Train model and record score
3. Report mean ± std of all K scores

Every data point is used for both training and testing exactly once.

---

**📊 Variants:**

**Stratified K-Fold:** Preserves class distribution in each fold. Essential for imbalanced datasets.

**Leave-One-Out (LOO):** K = N (each sample is a test set). Very expensive but maximum use of data.

**Time Series Split:** No shuffling — always train on past, test on future. Prevents data leakage.

**Repeated K-Fold:** Run K-fold multiple times with different splits, average all results.

---

**🏗️ Train / Validation / Test Split:**

| Set | Purpose | % of Data |
|-----|---------|-----------|
| Train | Fit model parameters | 60-80% |
| Validation | Tune hyperparameters | 10-20% |
| Test | Final unbiased evaluation | 10-20% |

**Critical rule:** Test set should only be used ONCE — at the very end. Never tune anything based on test performance.

---

**⚠️ Common Mistakes:**

1. **Data leakage:** Scaling/encoding before splitting → test data influences training
2. **Evaluating on training data:** Always evaluate on held-out data
3. **Using test set for tuning:** The test set should be touched only once
4. **Not stratifying with imbalanced data:** Can get folds with no minority class`,
        theoryEn: `**Cross-Validation — Reliable Model Evaluation**

**K-Fold:** Split into K folds, rotate test fold, average scores. Every point used for training and testing.

**Variants:** Stratified (preserve class ratio), LOO (K=N), Time Series (temporal order), Repeated.

**Train/Val/Test:** Training (fit), Validation (tune), Test (final, use once).

**Mistakes:** Data leakage, evaluating on training data, using test set for tuning.`,
        code: "import numpy as np\n\ndef k_fold_split(X, y, k=5):\n    n = len(X)\n    indices = np.random.permutation(n)\n    fold_size = n // k\n    folds = []\n    for i in range(k):\n        test_idx = indices[i*fold_size:(i+1)*fold_size]\n        train_idx = np.concatenate([indices[:i*fold_size], indices[(i+1)*fold_size:]])\n        folds.append((train_idx, test_idx))\n    return folds\n\n# Simple model: predict majority class in nearest neighbors\ndef knn_predict(X_train, y_train, X_test, k=3):\n    preds = []\n    for x in X_test:\n        dists = np.linalg.norm(X_train - x, axis=1)\n        nearest = y_train[np.argsort(dists)[:k]]\n        preds.append(np.bincount(nearest.astype(int)).argmax())\n    return np.array(preds)\n\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = ((X[:, 0] + X[:, 1]) > 0).astype(int)\n\n# 5-Fold Cross Validation\nprint('5-Fold Cross Validation:')\nfolds = k_fold_split(X, y, k=5)\nscores = []\nfor i, (train_idx, test_idx) in enumerate(folds):\n    preds = knn_predict(X[train_idx], y[train_idx], X[test_idx], k=5)\n    acc = np.mean(preds == y[test_idx])\n    scores.append(acc)\n    print(f'  Fold {i+1}: Accuracy = {acc:.2%}')\n\nprint(f'\\nMean: {np.mean(scores):.2%} +/- {np.std(scores):.2%}')",
        codeLanguage: "python",
        exercise: "Implement Stratified K-Fold (maintain y=0/y=1 ratio in each fold).",
        exerciseEn: "Implement Stratified K-Fold (maintain y=0/y=1 ratio in each fold).",
        quiz: [
          { question: "Why is CV better than a single train/test split?", options: ["Faster", "Reduces variance of performance estimate by testing on multiple splits", "Always gives higher accuracy", "Uses less data"], answer: 1, explanation: "CV tests on multiple different splits, averaging out the luck/unluck of any single split, providing a more reliable estimate." },
          { question: "What is data leakage?", options: ["Data loss", "Test data influencing training (e.g., scaling before splitting)", "Missing values", "Data corruption"], answer: 1, explanation: "Data leakage occurs when information from the test set 'leaks' into training, e.g., if you scale/encode using the entire dataset before splitting." },
          { question: "Why use Stratified K-Fold for imbalanced data?", options: ["It's faster", "Ensures each fold has the same class distribution as the full dataset", "It reduces overfitting", "It increases accuracy"], answer: 1, explanation: "Without stratification, some folds might contain very few (or zero) minority class samples, giving unreliable performance estimates." },
          { question: "How often should you use the test set?", options: ["Every experiment", "Once — only for final evaluation", "For hyperparameter tuning", "Never"], answer: 1, explanation: "The test set should be used only once at the very end. Using it for tuning or repeated evaluation would bias your performance estimate." },
          { question: "What is the trade-off of increasing K in K-Fold?", options: ["No trade-off", "More reliable estimate but more expensive computation", "Less reliable estimate", "Faster training"], answer: 1, explanation: "Higher K means more training iterations (each using more data) giving a better estimate, but at K times the computational cost." }
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

Hyperparameters are set before training (not learned). The right values can dramatically impact model performance.

---

**🔍 Grid Search:**
- Define a grid of all hyperparameter values to try
- Evaluate every combination using cross-validation
- Guaranteed to find best combo within the grid
- **Con:** Exponentially expensive. 5 params × 5 values each = 5⁵ = 3125 combinations!

**🎲 Random Search:**
- Sample random combinations for N trials
- Often finds near-optimal in fewer trials than grid search
- **Why?** Most hyperparameters have unequal importance. Random search explores the important dimensions more efficiently.

**🧠 Bayesian Optimization:**
- Uses past evaluation results to choose the next point
- Builds a surrogate model (usually Gaussian Process) of the objective
- Balances exploration (trying new areas) vs exploitation (refining known good areas)
- Tools: Optuna, Hyperopt, Weights & Biases

---

**📊 Comparison:**

| Method | Trials Needed | Finds Optimal? | Best For |
|--------|--------------|----------------|----------|
| Grid | All combos | Within grid, yes | Few params |
| Random | 10-100 | Near-optimal | Many params |
| Bayesian | 20-50 | Often global | Expensive models |

---

**📋 Best Practices:**

1. Start with Random Search to find the right neighborhood
2. Narrow down with Grid Search or Bayesian Optimization
3. Always use cross-validation inside the search
4. Log every experiment (MLflow, W&B)
5. Don't tune too many parameters at once`,
        theoryEn: `**Hyperparameter Tuning**

**Grid Search:** Try all combinations. Exhaustive but exponentially expensive.

**Random Search:** Random N combinations. Often more efficient — explores important dimensions better.

**Bayesian Optimization:** Uses past results to guide search. Most efficient for expensive models.

**Best Practice:** Random search first → narrow with Grid/Bayesian. Always use CV. Log experiments.`,
        code: "import numpy as np\n\ndef evaluate_model(X, y, k_neighbors, metric='euclidean'):\n    \"\"\"Simple KNN evaluation with cross-val\"\"\"\n    np.random.seed(42)\n    indices = np.random.permutation(len(X))\n    split = int(0.8 * len(X))\n    X_train, X_test = X[indices[:split]], X[indices[split:]]\n    y_train, y_test = y[indices[:split]], y[indices[split:]]\n\n    preds = []\n    for x in X_test:\n        if metric == 'manhattan':\n            dists = np.sum(np.abs(X_train - x), axis=1)\n        else:\n            dists = np.linalg.norm(X_train - x, axis=1)\n        nearest = y_train[np.argsort(dists)[:k_neighbors]]\n        preds.append(np.bincount(nearest.astype(int)).argmax())\n    return np.mean(np.array(preds) == y_test)\n\nnp.random.seed(42)\nX = np.random.randn(200, 3)\ny = ((X[:, 0]**2 + X[:, 1]) > 0.5).astype(int)\n\n# Grid Search\nprint('Grid Search:')\nparam_grid = {'k': [1, 3, 5, 7, 9, 11], 'metric': ['euclidean', 'manhattan']}\nbest_score, best_params = 0, {}\nfor k in param_grid['k']:\n    for m in param_grid['metric']:\n        score = evaluate_model(X, y, k, m)\n        if score > best_score:\n            best_score, best_params = score, {'k': k, 'metric': m}\n        print(f'  k={k:2d}, metric={m:10s} -> {score:.2%}')\nprint(f'Best: {best_params} -> {best_score:.2%}')\n\n# Random Search\nprint('\\nRandom Search (10 trials):')\nfor trial in range(10):\n    k = np.random.choice([1,3,5,7,9,11,15,21])\n    m = np.random.choice(['euclidean', 'manhattan'])\n    score = evaluate_model(X, y, k, m)\n    print(f'  Trial {trial+1}: k={k:2d}, metric={m:10s} -> {score:.2%}')",
        codeLanguage: "python",
        exercise: "Implement simple Bayesian Optimization: use previous results to prioritize promising parameter regions.",
        exerciseEn: "Implement simple Bayesian Optimization: use previous results to prioritize promising parameter regions.",
        quiz: [
          { question: "When is Random Search better than Grid Search?", options: ["Few hyperparameters", "Many hyperparameters where Grid Search becomes exponentially expensive", "Only 1 hyperparameter", "Never"], answer: 1, explanation: "With many hyperparameters, grid search tries every combination (exponential cost), while random search explores efficiently and often finds near-optimal solutions in fewer trials." },
          { question: "What does Bayesian Optimization use to select the next trial?", options: ["Random selection", "Results from previous trials to build a model of the objective function", "Grid ordering", "Alphabetical order"], answer: 1, explanation: "Bayesian Optimization builds a surrogate model (usually Gaussian Process) from past results, then uses it to intelligently choose the next point to evaluate." },
          { question: "Why use cross-validation inside hyperparameter search?", options: ["It's faster", "To get a reliable performance estimate for each configuration", "To increase training data", "Convention only"], answer: 1, explanation: "Without CV, the score for each hyperparameter configuration could be misleading due to a lucky/unlucky train-test split." },
          { question: "What's the risk of tuning too many hyperparameters?", options: ["No risk", "Overfitting to the validation set (finding a lucky combination)", "Makes the model simpler", "Reduces accuracy"], answer: 1, explanation: "Searching over many hyperparameters increases the chance of finding a combination that works well on validation by luck, not because it generalizes well." },
          { question: "What tool is commonly used for Bayesian hyperparameter optimization?", options: ["NumPy", "Optuna", "Pandas", "Matplotlib"], answer: 1, explanation: "Optuna is a popular, state-of-the-art hyperparameter optimization framework that uses Bayesian optimization (TPE sampler) to efficiently search parameter spaces." }
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

Accuracy alone is often misleading, especially with imbalanced data. A spam filter with 99% accuracy might be terrible if it catches no spam (just predicts "not spam" always).

---

**📊 Confusion Matrix:**

\`\`\`
              Predicted
              Pos    Neg
Actual Pos    TP     FN  (Type II error)
Actual Neg    FP     TN  (Type I error)
\`\`\`

---

**📏 Key Metrics:**

| Metric | Formula | Focus |
|--------|---------|-------|
| Accuracy | (TP+TN) / Total | Overall correctness |
| Precision | TP / (TP+FP) | Quality of positive predictions |
| Recall (Sensitivity) | TP / (TP+FN) | Coverage of actual positives |
| F1 Score | 2×P×R / (P+R) | Balance P and R |
| Specificity | TN / (TN+FP) | Coverage of actual negatives |

---

**📈 ROC Curve & AUC:**

The ROC curve plots True Positive Rate (Recall) vs False Positive Rate at all thresholds.

- **AUC = 1.0:** Perfect classifier
- **AUC = 0.5:** Random (no skill)
- **AUC < 0.5:** Worse than random

AUC is threshold-independent — it evaluates the model's ability to rank positives higher than negatives.

---

**⚖️ Bias-Variance Tradeoff:**

| Problem | Symptom | Model | Solution |
|---------|---------|-------|----------|
| High Bias (Underfitting) | Low train & test scores | Too simple | More features, complex model |
| High Variance (Overfitting) | High train, low test | Too complex | More data, regularization, simpler model |

**Learning Curves:** Plot training and validation scores vs training set size.
- Gap between curves = variance
- Both low = bias

---

**📋 Choosing the Right Metric:**

| Scenario | Metric | Why |
|----------|--------|-----|
| Balanced data | Accuracy | Classes equally important |
| Imbalanced data | F1, AUC | Accuracy misleading |
| Costly false positives | Precision | Minimize wrong alerts |
| Costly false negatives | Recall | Don't miss cases |
| Ranking tasks | AUC-ROC | Threshold-independent |
| Regression | RMSE, MAE, R² | Different error sensitivity |`,
        theoryEn: `**Model Evaluation — Beyond Accuracy**

**Confusion Matrix:** TP, TN, FP, FN. Accuracy = (TP+TN)/Total.

**Key Metrics:** Precision (quality of positives), Recall (coverage of positives), F1 (balance), AUC (threshold-independent).

**Bias-Variance:** High bias = underfitting. High variance = overfitting.

**Choose metric by scenario:** Balanced → Accuracy. Imbalanced → F1/AUC. Costly FP → Precision. Costly FN → Recall.`,
        code: "import numpy as np\n\ndef confusion_matrix(y_true, y_pred):\n    tp = sum((t == 1 and p == 1) for t, p in zip(y_true, y_pred))\n    tn = sum((t == 0 and p == 0) for t, p in zip(y_true, y_pred))\n    fp = sum((t == 0 and p == 1) for t, p in zip(y_true, y_pred))\n    fn = sum((t == 1 and p == 0) for t, p in zip(y_true, y_pred))\n    return tp, tn, fp, fn\n\ndef classification_report(y_true, y_pred):\n    tp, tn, fp, fn = confusion_matrix(y_true, y_pred)\n    accuracy = (tp + tn) / len(y_true)\n    precision = tp / (tp + fp) if (tp + fp) > 0 else 0\n    recall = tp / (tp + fn) if (tp + fn) > 0 else 0\n    f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0\n\n    print('Confusion Matrix:')\n    print(f'  Predicted:  Pos  Neg')\n    print(f'  Actual Pos: {tp:3d}  {fn:3d}')\n    print(f'  Actual Neg: {fp:3d}  {tn:3d}')\n    print(f'\\nMetrics:')\n    print(f'  Accuracy:  {accuracy:.4f}')\n    print(f'  Precision: {precision:.4f}')\n    print(f'  Recall:    {recall:.4f}')\n    print(f'  F1 Score:  {f1:.4f}')\n\nnp.random.seed(42)\ny_true = np.array([1,1,1,1,1,0,0,0,0,0,1,1,0,0,1])\ny_pred = np.array([1,1,0,1,1,0,0,1,0,0,1,0,0,1,1])\n\nclassification_report(y_true, y_pred)",
        codeLanguage: "python",
        exercise: "Implement ROC curve: compute TPR, FPR at multiple thresholds and calculate AUC.",
        exerciseEn: "Implement ROC curve: compute TPR, FPR at multiple thresholds and calculate AUC.",
        quiz: [
          { question: "When is Recall more important than Precision?", options: ["When FP is dangerous", "When missing positive cases is very dangerous (medical, fraud)", "Always", "When data is balanced"], answer: 1, explanation: "Recall matters when false negatives are costly — missing a cancer diagnosis or fraud case is far worse than a false alarm." },
          { question: "What does AUC = 0.5 indicate?", options: ["Perfect model", "Model has no discriminative ability — same as random", "Model is overfitting", "Model needs more data"], answer: 1, explanation: "AUC = 0.5 means the model can't distinguish between positive and negative classes any better than random coin flipping." },
          { question: "What indicates overfitting?", options: ["Low training and test scores", "High training score but much lower test score", "Both scores are equal", "Low training score"], answer: 1, explanation: "A large gap between high training performance and low test performance indicates the model memorized training data but can't generalize." },
          { question: "Why is accuracy misleading for imbalanced data?", options: ["Accuracy is always reliable", "A model predicting only the majority class gets high accuracy without learning", "It's too hard to compute", "It doesn't work with binary data"], answer: 1, explanation: "With 99% negative data, a model that always predicts 'negative' gets 99% accuracy but catches zero positive cases — completely useless." },
          { question: "What do learning curves show?", options: ["Feature importance", "Training and validation performance vs training set size — diagnosing bias/variance", "Hyperparameter effects", "Test results"], answer: 1, explanation: "Learning curves plot performance against training set size. The gap between training and validation curves reveals variance; low overall scores reveal bias." }
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

Ensemble methods combine multiple models to achieve better performance than any individual model.

---

**📊 The Three Main Approaches:**

**1. Bagging (Parallel):**
- Train multiple models on random data subsets simultaneously
- Combine: majority vote or average
- Reduces **variance** (overfitting)
- Example: Random Forest

**2. Boosting (Sequential):**
- Train models one after another
- Each model focuses on the errors of the previous model
- Reduces **bias** (underfitting)
- Examples: AdaBoost, Gradient Boosting, XGBoost, LightGBM, CatBoost

**3. Stacking (Meta-learning):**
- Train diverse base models (e.g., SVM, RF, KNN)
- Train a meta-model that learns to combine their predictions
- Can reduce both bias and variance

---

**⚡ Boosting Algorithms:**

**AdaBoost:**
- Assigns higher weights to misclassified samples
- Next model focuses on hard examples
- Final: weighted vote based on each model's accuracy

**Gradient Boosting:**
- Each model fits the residuals (errors) of the ensemble so far
- More flexible than AdaBoost — works with any differentiable loss

**XGBoost (Extreme Gradient Boosting):**
- Optimized implementation of gradient boosting
- Key innovations: regularization (L1/L2), column subsampling, handling missing values, parallel tree construction
- **The most winning algorithm on Kaggle** for tabular data

**LightGBM:**
- Uses leaf-wise growth (vs level-wise in XGBoost)
- Faster training on large datasets
- Handles categorical features natively

**CatBoost:**
- Best handling of categorical features (target statistics)
- Less overfitting with default parameters
- Slowest to train but often best out-of-box

---

**📋 Comparison:**

| Method | Reduces | Parallelizable | Risk |
|--------|---------|---------------|------|
| Bagging | Variance | ✅ Yes | Low |
| Boosting | Bias | ❌ Sequential | Overfitting |
| Stacking | Both | Partially | Complexity |`,
        theoryEn: `**Ensemble Methods — Combining Models**

**Bagging (parallel):** Random subsets, vote/average. Reduces variance. (Random Forest)

**Boosting (sequential):** Each model fixes previous errors. Reduces bias. (XGBoost, LightGBM, CatBoost)

**Stacking:** Diverse base models + meta-model combining predictions.

**XGBoost:** Regularized gradient boosting — the Kaggle king for tabular data. LightGBM is faster; CatBoost handles categoricals best.`,
        code: "import numpy as np\n\n# Simple AdaBoost implementation\nclass SimpleAdaBoost:\n    def __init__(self, n_estimators=5):\n        self.n_estimators = n_estimators\n        self.stumps = []\n        self.alphas = []\n\n    def _best_stump(self, X, y, weights):\n        best_err, best_feat, best_thresh, best_pol = float('inf'), 0, 0, 1\n        for feat in range(X.shape[1]):\n            for thresh in np.unique(X[:, feat]):\n                for polarity in [1, -1]:\n                    pred = np.ones(len(X))\n                    if polarity == 1:\n                        pred[X[:, feat] < thresh] = -1\n                    else:\n                        pred[X[:, feat] >= thresh] = -1\n                    err = np.sum(weights * (pred != y))\n                    if err < best_err:\n                        best_err, best_feat, best_thresh, best_pol = err, feat, thresh, polarity\n        return best_feat, best_thresh, best_pol, best_err\n\n    def fit(self, X, y_orig):\n        y = np.where(y_orig == 0, -1, 1)\n        weights = np.ones(len(X)) / len(X)\n\n        for t in range(self.n_estimators):\n            feat, thresh, pol, err = self._best_stump(X, y, weights)\n            err = max(err, 1e-10)\n            alpha = 0.5 * np.log((1 - err) / err)\n\n            pred = np.ones(len(X))\n            if pol == 1:\n                pred[X[:, feat] < thresh] = -1\n            else:\n                pred[X[:, feat] >= thresh] = -1\n\n            weights *= np.exp(-alpha * y * pred)\n            weights /= weights.sum()\n\n            self.stumps.append((feat, thresh, pol))\n            self.alphas.append(alpha)\n            print(f'  Stump {t+1}: feat={feat}, thresh={thresh:.2f}, alpha={alpha:.3f}, err={err:.4f}')\n\n    def predict(self, X):\n        final = np.zeros(len(X))\n        for (feat, thresh, pol), alpha in zip(self.stumps, self.alphas):\n            pred = np.ones(len(X))\n            if pol == 1:\n                pred[X[:, feat] < thresh] = -1\n            else:\n                pred[X[:, feat] >= thresh] = -1\n            final += alpha * pred\n        return (final >= 0).astype(int)\n\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = ((X[:, 0]**2 + X[:, 1]) > 0.5).astype(int)\n\nprint('Training AdaBoost:')\nada = SimpleAdaBoost(n_estimators=10)\nada.fit(X, y)\nacc = np.mean(ada.predict(X) == y)\nprint(f'\\nAccuracy: {acc:.2%}')",
        codeLanguage: "python",
        exercise: "Implement simple Gradient Boosting: fit residuals sequentially with learning rate.",
        exerciseEn: "Implement simple Gradient Boosting: fit residuals sequentially with learning rate.",
        quiz: [
          { question: "How does Boosting differ from Bagging?", options: ["They're the same", "Boosting trains sequentially (each model focuses on errors), Bagging trains in parallel on random subsets", "Boosting uses fewer models", "Bagging is always better"], answer: 1, explanation: "Boosting builds models sequentially, with each new model correcting the errors of the previous ensemble. Bagging trains independent models in parallel on random data subsets." },
          { question: "Why is XGBoost so popular for tabular data?", options: ["Simplest algorithm", "Regularization, speed optimizations, handles missing values, and consistently wins competitions", "Only works with tabular data", "It's a neural network"], answer: 1, explanation: "XGBoost combines regularized gradient boosting with engineering optimizations (parallel tree construction, cache-aware access, handling missing values), making it both accurate and fast." },
          { question: "What does each model in Gradient Boosting fit?", options: ["The original data", "The residuals (errors) of the current ensemble", "Random data", "The best features"], answer: 1, explanation: "Each new model in Gradient Boosting is trained to predict the residuals — the difference between the current ensemble's predictions and the actual targets." },
          { question: "What is Stacking?", options: ["Stack more data", "Train diverse models, then a meta-model learns to combine their predictions", "Use more layers", "Sequential boosting"], answer: 1, explanation: "Stacking uses a meta-learner to optimally combine predictions from diverse base models (e.g., SVM, RF, KNN), often achieving better results than any single model." },
          { question: "Which ensemble method is most prone to overfitting?", options: ["Bagging", "Boosting — because it keeps trying to fit remaining errors, including noise", "Stacking", "Voting"], answer: 1, explanation: "Boosting keeps adding models to fit remaining errors, but these 'errors' may include noise. Too many boosting iterations can overfit. Use early stopping to prevent this." }
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

MLOps bridges the gap between developing ML models and deploying them reliably in production.

---

**🔄 The MLOps Lifecycle:**

1. **Data Collection & Versioning** — DVC, LakeFS, Delta Lake
2. **Feature Store** — Feast, Tecton: Centralized feature management
3. **Experiment Tracking** — MLflow, W&B, Neptune: Log hyperparameters, metrics, artifacts
4. **Model Registry** — Version models, track lineage, manage approvals
5. **Model Serving** — Deploy as APIs, batch jobs, or edge applications
6. **Monitoring** — Track performance, detect drift, trigger retraining

---

**📦 Model Serving Patterns:**

| Pattern | Latency | Use Case |
|---------|---------|----------|
| REST API (FastAPI, Flask) | ~100ms | Web applications |
| gRPC (TF Serving) | ~10ms | High-throughput systems |
| Batch Inference | Minutes-hours | Nightly predictions |
| Edge (ONNX, TensorRT) | ~1ms | Mobile, IoT |
| Serverless (Lambda) | ~200ms | Low-traffic, cost-sensitive |

---

**📊 Model Monitoring:**

**Data Drift:** Input distribution changes over time
- Example: Economic recession changes spending patterns
- Detect: Population Stability Index (PSI), KL Divergence

**Concept Drift:** The relationship between inputs and outputs changes
- Example: User preferences evolve
- Detect: Performance degradation on recent data

**Model Decay:** Gradual performance degradation
- Solution: Automated retraining triggers (schedule or drift-based)

---

**🏗️ MLOps Maturity Levels:**

| Level | Description | Tools |
|-------|-------------|-------|
| 0 | Manual everything | Jupyter notebooks |
| 1 | Automated training | MLflow, CI pipeline |
| 2 | Automated training + deployment | CI/CD, Model Registry |
| 3 | Full automation + monitoring | A/B testing, auto-retrain |

---

**📋 Best Practices:**

1. **Version everything:** Data, code, models, configs
2. **Automate testing:** Data validation, model performance tests, integration tests
3. **A/B testing:** Compare new model vs current in production
4. **Shadow mode:** Run new model alongside current without affecting users
5. **Rollback plan:** Always be able to revert to previous model
6. **Feature store:** Centralize feature computation for consistency
7. **Model cards:** Document model limitations, intended use, bias evaluations`,
        theoryEn: `**MLOps — DevOps for Machine Learning**

**Lifecycle:** Data → Features → Experiments → Registry → Serving → Monitoring → Retrain.

**Serving:** REST API, gRPC, Batch, Edge, Serverless.

**Monitoring:** Data Drift (input changes), Concept Drift (relationship changes), Model Decay (performance drops).

**Best Practices:** Version everything, automate testing, A/B testing, shadow mode, rollback plan, model cards.`,
        code: "import json\nfrom datetime import datetime\nimport numpy as np\n\nclass MLOpsSimulator:\n    def __init__(self, model_name, version):\n        self.model_name = model_name\n        self.version = version\n        self.metrics_log = []\n\n    def log_experiment(self, params, metrics):\n        experiment = {\n            'timestamp': datetime.now().isoformat(),\n            'model': self.model_name,\n            'version': self.version,\n            'params': params,\n            'metrics': metrics\n        }\n        self.metrics_log.append(experiment)\n        print(f'📊 Experiment logged: {json.dumps(experiment, indent=2)}')\n\n    def detect_drift(self, reference_data, current_data):\n        ref_mean = np.mean(reference_data)\n        cur_mean = np.mean(current_data)\n        drift_score = abs(ref_mean - cur_mean) / (np.std(reference_data) + 1e-7)\n        drifted = drift_score > 1.0\n        print(f'\\n🔍 Drift Detection:')\n        print(f'  Reference mean: {ref_mean:.4f}')\n        print(f'  Current mean: {cur_mean:.4f}')\n        print(f'  Drift score: {drift_score:.4f}')\n        print(f'  Status: {\"🚨 DRIFT DETECTED\" if drifted else \"✅ No significant drift\"}')\n        return drifted\n\n    def serve_prediction(self, input_data):\n        # Simulate model inference\n        prediction = np.mean(input_data) > 0.5\n        latency = np.random.uniform(5, 50)\n        print(f'  🔮 Prediction: {prediction} (latency: {latency:.1f}ms)')\n        return prediction\n\n# Demo\nops = MLOpsSimulator('customer_churn_v2', 'v2.1.0')\n\n# Log experiment\nops.log_experiment(\n    params={'n_estimators': 100, 'max_depth': 5, 'lr': 0.1},\n    metrics={'accuracy': 0.92, 'f1': 0.88, 'auc': 0.95}\n)\n\n# Check for drift\nnp.random.seed(42)\nref = np.random.randn(1000) * 1 + 5  # Training distribution\ncur = np.random.randn(1000) * 1.5 + 7  # Production distribution (shifted!)\nops.detect_drift(ref, cur)\n\n# Serve predictions\nprint('\\n🚀 Model Serving:')\nfor i in range(3):\n    ops.serve_prediction(np.random.randn(10))",
        codeLanguage: "python",
        exercise: "Add A/B testing: serve predictions from 2 model versions, compare performance metrics.",
        exerciseEn: "Add A/B testing: serve predictions from 2 model versions, compare performance metrics.",
        quiz: [
          { question: "What is Data Drift?", options: ["Model becomes faster", "The distribution of input data changes over time compared to training data", "Data gets deleted", "Model weights change"], answer: 1, explanation: "Data drift occurs when the statistical properties of production data differ from training data, potentially causing the model to make poor predictions." },
          { question: "Why is A/B testing important in MLOps?", options: ["It's faster", "It compares a new model against the current one in production to validate improvement", "It reduces data", "It's required by law"], answer: 1, explanation: "A/B testing splits production traffic between the old and new model, providing real-world evidence that the new model actually performs better before full deployment." },
          { question: "What should you version in MLOps?", options: ["Only code", "Everything: data, code, models, configs, and environments", "Only models", "Nothing"], answer: 1, explanation: "Versioning everything (data, code, models, configs, environments) ensures reproducibility — you can always recreate any past result or roll back to a working state." },
          { question: "What is the purpose of a Feature Store?", options: ["Store model weights", "Centralize feature computation for consistency between training and serving", "A database", "File storage"], answer: 1, explanation: "A Feature Store ensures the exact same features used during training are computed during serving, preventing training-serving skew — one of the most common production ML bugs." },
          { question: "When should you retrain a model in production?", options: ["Every day", "When monitoring detects data drift or performance degradation", "Never after deployment", "Only manually"], answer: 1, explanation: "Automated retraining should be triggered when monitoring detects significant data drift, concept drift, or performance degradation below acceptable thresholds." }
        ]
      }
    ]
  }
];
