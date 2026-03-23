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
        theory: "**Linear Regression** dự đoán giá trị liên tục.\n\n**Công thức:** y = wx + b\n- w: weight (hệ số góc)\n- b: bias (hệ số chặn)\n\n**Loss Function:** MSE = (1/n) * sum((y_true - y_pred)^2)\n\n**Training:** Tìm w, b sao cho MSE nhỏ nhất\n- Closed-form: w = (X^T X)^(-1) X^T y\n- Gradient Descent: cập nhật iteratively",
        theoryEn: "**Linear Regression** predicts continuous values.\n\n**Formula:** y = wx + b\n\n**Loss:** MSE = (1/n) * sum((y_true - y_pred)^2)\n\n**Training:** Find w, b that minimize MSE",
        code: "import numpy as np\n\n# Generate sample data\nnp.random.seed(42)\nX = np.random.rand(50) * 10\ny = 2.5 * X + 3 + np.random.randn(50) * 2\n\n# Train linear regression from scratch\ndef linear_regression(X, y):\n    n = len(X)\n    x_mean, y_mean = X.mean(), y.mean()\n    w = np.sum((X - x_mean) * (y - y_mean)) / np.sum((X - x_mean) ** 2)\n    b = y_mean - w * x_mean\n    return w, b\n\nw, b = linear_regression(X, y)\nprint(f'Learned: y = {w:.2f}x + {b:.2f}')\nprint(f'True:    y = 2.50x + 3.00')\n\n# Predictions\ny_pred = w * X + b\nmse = np.mean((y - y_pred) ** 2)\nr2 = 1 - np.sum((y - y_pred)**2) / np.sum((y - y.mean())**2)\nprint(f'\\nMSE: {mse:.4f}')\nprint(f'R2 Score: {r2:.4f}')",
        codeLanguage: "python",
        exercise: "Implement gradient descent cho linear regression. So sánh kết quả với closed-form.",
        exerciseEn: "Implement gradient descent for linear regression. Compare with closed-form solution.",
        quiz: [
          { question: "R2 = 1 nghĩa là gì?", options: ["Model tệ", "Model dự đoán hoàn hảo", "Overfitting", "Không đủ dữ liệu"], answer: 1, explanation: "R2 = 1 nghĩa là model giải thích 100% variance trong dữ liệu, dự đoán hoàn hảo." }
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
        theory: "**Logistic Regression** phân loại nhị phân (0/1).\n\n**Sigmoid:** sigma(z) = 1 / (1 + e^(-z))\n- Output: xác suất [0, 1]\n- Decision boundary: 0.5\n\n**Loss:** Binary Cross-Entropy\n- L = -[y*log(p) + (1-y)*log(1-p)]\n\n**Metrics:**\n- Accuracy, Precision, Recall, F1-Score\n- Confusion Matrix\n- ROC Curve & AUC",
        theoryEn: "**Logistic Regression** for binary classification.\n\n**Sigmoid:** Maps to [0,1] probability\n**Loss:** Binary Cross-Entropy\n**Metrics:** Accuracy, Precision, Recall, F1, AUC",
        code: "import numpy as np\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-np.clip(z, -500, 500)))\n\nclass LogisticRegression:\n    def __init__(self, lr=0.1, epochs=1000):\n        self.lr = lr\n        self.epochs = epochs\n\n    def fit(self, X, y):\n        self.w = np.zeros(X.shape[1])\n        self.b = 0\n        for epoch in range(self.epochs):\n            z = X @ self.w + self.b\n            pred = sigmoid(z)\n            dw = (X.T @ (pred - y)) / len(y)\n            db = np.mean(pred - y)\n            self.w -= self.lr * dw\n            self.b -= self.lr * db\n            if epoch % 200 == 0:\n                loss = -np.mean(y*np.log(pred+1e-7) + (1-y)*np.log(1-pred+1e-7))\n                print(f'  Epoch {epoch}: loss = {loss:.4f}')\n\n    def predict(self, X):\n        return (sigmoid(X @ self.w + self.b) >= 0.5).astype(int)\n\n# Sample data\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = ((X[:, 0] + X[:, 1]) > 0).astype(int)\n\nmodel = LogisticRegression(lr=0.5, epochs=1000)\nprint('Training Logistic Regression:')\nmodel.fit(X, y)\n\npreds = model.predict(X)\nacc = np.mean(preds == y)\nprint(f'\\nAccuracy: {acc:.2%}')\nprint(f'Weights: {model.w.round(3)}, Bias: {model.b:.3f}')",
        codeLanguage: "python",
        exercise: "Thêm tính toán Precision, Recall, F1-Score và Confusion Matrix cho model trên.",
        exerciseEn: "Add Precision, Recall, F1-Score and Confusion Matrix calculation to the model above.",
        quiz: [
          { question: "Precision cao nghĩa là gì?", options: ["Ít false negatives", "Ít false positives trong dự đoán positive", "Accuracy cao", "Loss thấp"], answer: 1, explanation: "Precision = TP/(TP+FP). Precision cao nghĩa là khi model dự đoán positive, nó thường đúng." }
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
        theory: "**Decision Tree** phân loại bằng chuỗi câu hỏi if/else.\n\n**Splitting Criteria:**\n- Gini Impurity: G = 1 - sum(p_i^2)\n- Entropy: H = -sum(p_i * log2(p_i))\n- Information Gain: IG = H(parent) - sum(H(child))\n\n**Ưu điểm:** Dễ hiểu, dễ visualize, không cần normalize\n**Nhược điểm:** Dễ overfit\n\n**Pruning:** Cắt tỉa cây để tránh overfit\n- Max depth, min samples per leaf",
        theoryEn: "**Decision Tree** classifies using if/else questions.\n\n**Splitting:** Gini Impurity, Entropy, Information Gain\n**Pros:** Interpretable, no normalization needed\n**Cons:** Prone to overfitting\n**Pruning:** Limit tree to prevent overfitting",
        code: "import numpy as np\n\ndef gini(y):\n    classes = np.unique(y)\n    return 1 - sum((np.sum(y == c) / len(y)) ** 2 for c in classes)\n\ndef best_split(X, y):\n    best_gain, best_feat, best_thresh = -1, None, None\n    parent_gini = gini(y)\n    for feat in range(X.shape[1]):\n        thresholds = np.unique(X[:, feat])\n        for t in thresholds:\n            left = y[X[:, feat] <= t]\n            right = y[X[:, feat] > t]\n            if len(left) == 0 or len(right) == 0:\n                continue\n            gain = parent_gini - (len(left)*gini(left) + len(right)*gini(right)) / len(y)\n            if gain > best_gain:\n                best_gain, best_feat, best_thresh = gain, feat, t\n    return best_feat, best_thresh, best_gain\n\n# Sample data\nnp.random.seed(42)\nX = np.array([[2,3],[1,1],[3,2],[6,5],[7,8],[8,6],[4,4],[5,7]])\ny = np.array([0,0,0,1,1,1,0,1])\n\nfeat, thresh, gain = best_split(X, y)\nprint(f'Best split: Feature {feat}, Threshold {thresh}')\nprint(f'Information Gain: {gain:.4f}')\nprint(f'Parent Gini: {gini(y):.4f}')\n\nleft_mask = X[:, feat] <= thresh\nprint(f'\\nLeft ({sum(left_mask)} samples): Gini = {gini(y[left_mask]):.4f}')\nprint(f'Right ({sum(~left_mask)} samples): Gini = {gini(y[~left_mask]):.4f}')",
        codeLanguage: "python",
        exercise: "Implement full Decision Tree (recursive splitting đến max_depth=3). Predict trên data mới.",
        exerciseEn: "Implement a full Decision Tree (recursive splitting to max_depth=3). Predict on new data.",
        quiz: [
          { question: "Gini = 0 nghĩa là gì?", options: ["Node rỗng", "Node hoàn toàn thuần (1 class)", "Overfit", "Không thể split"], answer: 1, explanation: "Gini = 0 khi tất cả samples thuộc cùng 1 class. Node đã pure, không cần split thêm." }
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
        theory: "**Random Forest** = nhiều Decision Trees vote cùng nhau.\n\n**Bagging (Bootstrap Aggregating):**\n- Mỗi tree train trên random subset (with replacement)\n- Giảm variance, tránh overfit\n\n**Feature Sampling:**\n- Mỗi split chỉ xét sqrt(n_features) random features\n- Tạo đa dạng giữa các trees\n\n**Prediction:**\n- Classification: majority vote\n- Regression: average\n\n**Hyperparameters:**\n- n_estimators: số trees (100-500)\n- max_depth, min_samples_split",
        theoryEn: "**Random Forest** = multiple Decision Trees voting together.\n\n**Bagging:** Each tree trains on random subset\n**Feature Sampling:** Each split considers random features\n**Prediction:** Majority vote (classification) or average (regression)",
        code: "import numpy as np\n\nclass SimpleRandomForest:\n    def __init__(self, n_trees=5, max_depth=3):\n        self.n_trees = n_trees\n        self.max_depth = max_depth\n        self.trees = []\n\n    def _bootstrap(self, X, y):\n        idx = np.random.choice(len(X), size=len(X), replace=True)\n        return X[idx], y[idx]\n\n    def _build_stump(self, X, y):\n        # Simple: find best single split\n        best_feat, best_thresh = 0, 0\n        best_gini = float('inf')\n        feat_subset = np.random.choice(X.shape[1], max(1, X.shape[1]//2), replace=False)\n        for f in feat_subset:\n            for t in np.unique(X[:, f]):\n                left = y[X[:, f] <= t]\n                right = y[X[:, f] > t]\n                if len(left) == 0 or len(right) == 0: continue\n                g = (len(left) * (1-sum((np.sum(left==c)/len(left))**2 for c in np.unique(left))) +\n                     len(right) * (1-sum((np.sum(right==c)/len(right))**2 for c in np.unique(right)))) / len(y)\n                if g < best_gini:\n                    best_gini, best_feat, best_thresh = g, f, t\n        left_class = np.bincount(y[X[:, best_feat] <= best_thresh].astype(int)).argmax() if sum(X[:, best_feat] <= best_thresh) > 0 else 0\n        right_class = np.bincount(y[X[:, best_feat] > best_thresh].astype(int)).argmax() if sum(X[:, best_feat] > best_thresh) > 0 else 0\n        return {'feat': best_feat, 'thresh': best_thresh, 'left': left_class, 'right': right_class}\n\n    def fit(self, X, y):\n        for i in range(self.n_trees):\n            X_boot, y_boot = self._bootstrap(X, y)\n            tree = self._build_stump(X_boot, y_boot)\n            self.trees.append(tree)\n            print(f'  Tree {i+1}: split feature={tree[\"feat\"]}, threshold={tree[\"thresh\"]:.2f}')\n\n    def predict(self, X):\n        preds = np.zeros((len(X), self.n_trees))\n        for j, tree in enumerate(self.trees):\n            preds[:, j] = np.where(X[:, tree['feat']] <= tree['thresh'], tree['left'], tree['right'])\n        return np.array([np.bincount(row.astype(int)).argmax() for row in preds])\n\nnp.random.seed(42)\nX = np.random.randn(80, 3)\ny = ((X[:, 0] + X[:, 1] - X[:, 2]) > 0).astype(int)\n\nrf = SimpleRandomForest(n_trees=7)\nprint('Training Random Forest:')\nrf.fit(X, y)\npreds = rf.predict(X)\nprint(f'\\nAccuracy: {np.mean(preds == y):.2%}')",
        codeLanguage: "python",
        exercise: "Thêm Out-of-Bag (OOB) error estimation vào Random Forest.",
        exerciseEn: "Add Out-of-Bag (OOB) error estimation to Random Forest.",
        quiz: [
          { question: "Tại sao Random Forest ít overfit hơn Decision Tree?", options: ["Dùng ít features", "Bagging + feature sampling tạo đa dạng, giảm variance", "Trees nhỏ hơn", "Dùng loss khác"], answer: 1, explanation: "Bagging (random data subsets) + random feature selection tạo nhiều trees đa dạng, khi vote cùng nhau giảm variance." }
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
        theory: "**SVM** tìm hyperplane tối ưu phân tách 2 classes.\n\n**Margin:** Khoảng cách từ hyperplane đến điểm gần nhất\n- Maximize margin = mô hình tốt hơn\n- Support Vectors: điểm gần hyperplane nhất\n\n**Kernel Trick:**\n- Linear: K(x,y) = x.y\n- RBF: K(x,y) = exp(-gamma * ||x-y||^2)\n- Polynomial: K(x,y) = (x.y + c)^d\n- Biến đổi không gian → separable\n\n**Soft Margin:** Cho phép misclassification (C parameter)",
        theoryEn: "**SVM** finds optimal hyperplane separating classes.\n\n**Margin:** Distance from hyperplane to nearest point\n**Kernel Trick:** Transform space to make data separable\n**Soft Margin:** Allow misclassification (C parameter)",
        code: "import numpy as np\n\n# Simple linear SVM using gradient descent\nclass SimpleSVM:\n    def __init__(self, lr=0.001, C=1.0, epochs=1000):\n        self.lr = lr\n        self.C = C\n        self.epochs = epochs\n\n    def fit(self, X, y):\n        y_svm = np.where(y == 0, -1, 1)  # SVM uses -1/+1\n        self.w = np.zeros(X.shape[1])\n        self.b = 0\n\n        for epoch in range(self.epochs):\n            for i in range(len(X)):\n                margin = y_svm[i] * (X[i] @ self.w + self.b)\n                if margin >= 1:\n                    self.w -= self.lr * self.w  # regularization only\n                else:\n                    self.w -= self.lr * (self.w - self.C * y_svm[i] * X[i])\n                    self.b += self.lr * self.C * y_svm[i]\n\n            if epoch % 200 == 0:\n                loss = 0.5 * np.dot(self.w, self.w) + self.C * np.sum(np.maximum(0, 1 - y_svm * (X @ self.w + self.b)))\n                print(f'  Epoch {epoch}: loss = {loss:.4f}')\n\n    def predict(self, X):\n        return (X @ self.w + self.b >= 0).astype(int)\n\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = ((X[:, 0] + X[:, 1]) > 0).astype(int)\n\nsvm = SimpleSVM(lr=0.001, C=1.0, epochs=1000)\nprint('Training SVM:')\nsvm.fit(X, y)\nacc = np.mean(svm.predict(X) == y)\nprint(f'\\nAccuracy: {acc:.2%}')\nprint(f'Weights: {svm.w.round(3)}, Bias: {svm.b:.3f}')",
        codeLanguage: "python",
        exercise: "Implement RBF kernel: tạo kernel matrix và dùng cho non-linear classification.",
        exerciseEn: "Implement RBF kernel: create kernel matrix and use for non-linear classification.",
        quiz: [
          { question: "Support Vectors là gì?", options: ["Tất cả data points", "Điểm gần hyperplane nhất, quyết định biên", "Outliers", "Centroids"], answer: 1, explanation: "Support Vectors là các điểm nằm gần hyperplane nhất, chúng quyết định vị trí và hướng của hyperplane." }
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
        theory: "**K-Means** — phân cụm không giám sát.\n\n**Thuật toán:**\n1. Chọn K centroids ngẫu nhiên\n2. Gán mỗi điểm vào centroid gần nhất\n3. Cập nhật centroids = trung bình các điểm trong cụm\n4. Lặp lại 2-3 cho đến hội tụ\n\n**Chọn K:**\n- Elbow Method: chọn K tại điểm gãy\n- Silhouette Score: đo chất lượng clustering\n\n**Nhược điểm:**\n- Phải chọn K trước\n- Nhạy với khởi tạo → dùng K-Means++",
        theoryEn: "**K-Means** — unsupervised clustering.\n\n**Algorithm:** Random centroids → Assign → Update → Repeat\n**Choosing K:** Elbow Method, Silhouette Score\n**Limitations:** Must choose K, sensitive to initialization",
        code: "import numpy as np\n\nclass KMeans:\n    def __init__(self, k=3, max_iters=100):\n        self.k = k\n        self.max_iters = max_iters\n\n    def fit(self, X):\n        idx = np.random.choice(len(X), self.k, replace=False)\n        self.centroids = X[idx].copy()\n\n        for iteration in range(self.max_iters):\n            # Assign clusters\n            distances = np.array([np.linalg.norm(X - c, axis=1) for c in self.centroids]).T\n            self.labels = np.argmin(distances, axis=1)\n\n            # Update centroids\n            new_centroids = np.array([X[self.labels == i].mean(axis=0) if sum(self.labels == i) > 0 else self.centroids[i] for i in range(self.k)])\n\n            if np.allclose(self.centroids, new_centroids):\n                print(f'  Converged at iteration {iteration}')\n                break\n            self.centroids = new_centroids\n\n        self.inertia = sum(np.sum((X[self.labels == i] - self.centroids[i])**2) for i in range(self.k))\n        return self\n\nnp.random.seed(42)\n# Generate 3 clusters\nX = np.vstack([\n    np.random.randn(30, 2) + [0, 0],\n    np.random.randn(30, 2) + [5, 5],\n    np.random.randn(30, 2) + [10, 0],\n])\n\nkm = KMeans(k=3)\nkm.fit(X)\nprint(f'Centroids:\\n{km.centroids.round(2)}')\nprint(f'Inertia: {km.inertia:.2f}')\n\n# Elbow method\nprint('\\nElbow Method:')\nfor k in range(2, 7):\n    km = KMeans(k=k)\n    km.fit(X)\n    print(f'  K={k}: Inertia = {km.inertia:.2f}')",
        codeLanguage: "python",
        exercise: "Implement K-Means++ initialization và so sánh với random init trên 10 runs.",
        exerciseEn: "Implement K-Means++ initialization and compare with random init over 10 runs.",
        quiz: [
          { question: "Elbow Method chọn K tại đâu?", options: ["K lớn nhất", "Điểm gãy nơi inertia giảm chậm lại", "K = 2 luôn tốt", "K = số features"], answer: 1, explanation: "Elbow point là nơi thêm K không giảm inertia đáng kể nữa — tạo hình gãy khuỷu tay." }
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
        theory: "**Feature Engineering** — biến đổi raw data thành features tốt cho ML.\n\n**Scaling:**\n- StandardScaler: z = (x - mean) / std\n- MinMaxScaler: x_norm = (x - min) / (max - min)\n\n**Encoding:**\n- One-Hot: categories → binary columns\n- Label: categories → numbers\n- Target: categories → mean of target\n\n**Feature Selection:**\n- Correlation analysis\n- Variance threshold\n- Feature importance (from tree models)\n\n**Feature Creation:**\n- Polynomial features\n- Log/sqrt transforms\n- Date features (day, month, weekday)",
        theoryEn: "**Feature Engineering** — transform raw data into good ML features.\n\n**Scaling:** StandardScaler, MinMaxScaler\n**Encoding:** One-Hot, Label, Target Encoding\n**Selection:** Correlation, Variance, Feature Importance",
        code: "import numpy as np\n\n# StandardScaler\ndef standard_scale(X):\n    return (X - X.mean(axis=0)) / X.std(axis=0)\n\n# MinMaxScaler\ndef minmax_scale(X):\n    return (X - X.min(axis=0)) / (X.max(axis=0) - X.min(axis=0))\n\n# One-Hot Encoding\ndef one_hot(categories, unique_cats):\n    encoded = np.zeros((len(categories), len(unique_cats)))\n    for i, cat in enumerate(categories):\n        encoded[i, unique_cats.index(cat)] = 1\n    return encoded\n\n# Demo\nX = np.array([[1, 1000], [2, 2000], [3, 3000], [4, 4000], [5, 5000]], dtype=float)\nprint('Original:')\nprint(X)\nprint('\\nStandard Scaled:')\nprint(standard_scale(X).round(3))\nprint('\\nMinMax Scaled:')\nprint(minmax_scale(X).round(3))\n\n# One-hot encoding\ncats = ['red', 'blue', 'red', 'green', 'blue']\nunique = ['red', 'blue', 'green']\nprint('\\nOne-Hot Encoding:')\nprint(f'Categories: {cats}')\nprint(one_hot(cats, unique))\n\n# Correlation\nnp.random.seed(42)\nfeatures = np.random.randn(100, 3)\nfeatures[:, 2] = features[:, 0] * 0.9 + np.random.randn(100) * 0.1\ncorr = np.corrcoef(features.T)\nprint('\\nCorrelation Matrix:')\nfor i in range(3):\n    print(f'  Feature {i}: {corr[i].round(3)}')",
        codeLanguage: "python",
        exercise: "Implement Target Encoding cho categorical features. Thêm smoothing để tránh overfit.",
        exerciseEn: "Implement Target Encoding for categorical features. Add smoothing to prevent overfitting.",
        quiz: [
          { question: "Tại sao cần scaling features?", options: ["Đẹp hơn", "Nhiều algorithms nhạy cảm với scale (SVM, KNN, Neural Net)", "Bắt buộc", "Tăng accuracy luôn"], answer: 1, explanation: "Algorithms dựa trên khoảng cách (KNN, SVM) hoặc gradient (Neural Networks) rất nhạy với scale. Features lớn sẽ dominate." }
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
        theory: "**Cross-Validation** — đánh giá model chính xác hơn.\n\n**Train/Test Split:** Đơn giản nhưng variance cao\n\n**K-Fold CV:**\n1. Chia data thành K folds\n2. Mỗi lần: 1 fold test, K-1 folds train\n3. Lặp K lần, lấy trung bình scores\n\n**Stratified K-Fold:** Giữ tỉ lệ classes trong mỗi fold\n\n**Leave-One-Out (LOO):** K = N (mỗi sample test 1 lần)\n\n**Train/Validation/Test:**\n- Train: huấn luyện model\n- Validation: tuning hyperparameters\n- Test: đánh giá cuối cùng (chỉ dùng 1 lần)",
        theoryEn: "**Cross-Validation** — more accurate model evaluation.\n\n**K-Fold:** Split into K folds, rotate test fold\n**Stratified:** Maintain class ratios\n**Train/Val/Test:** Training, tuning, final evaluation",
        code: "import numpy as np\n\ndef k_fold_split(X, y, k=5):\n    n = len(X)\n    indices = np.random.permutation(n)\n    fold_size = n // k\n    folds = []\n    for i in range(k):\n        test_idx = indices[i*fold_size:(i+1)*fold_size]\n        train_idx = np.concatenate([indices[:i*fold_size], indices[(i+1)*fold_size:]])\n        folds.append((train_idx, test_idx))\n    return folds\n\n# Simple model: predict majority class in nearest neighbors\ndef knn_predict(X_train, y_train, X_test, k=3):\n    preds = []\n    for x in X_test:\n        dists = np.linalg.norm(X_train - x, axis=1)\n        nearest = y_train[np.argsort(dists)[:k]]\n        preds.append(np.bincount(nearest.astype(int)).argmax())\n    return np.array(preds)\n\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = ((X[:, 0] + X[:, 1]) > 0).astype(int)\n\n# 5-Fold Cross Validation\nprint('5-Fold Cross Validation:')\nfolds = k_fold_split(X, y, k=5)\nscores = []\nfor i, (train_idx, test_idx) in enumerate(folds):\n    preds = knn_predict(X[train_idx], y[train_idx], X[test_idx], k=5)\n    acc = np.mean(preds == y[test_idx])\n    scores.append(acc)\n    print(f'  Fold {i+1}: Accuracy = {acc:.2%}')\n\nprint(f'\\nMean: {np.mean(scores):.2%} +/- {np.std(scores):.2%}')",
        codeLanguage: "python",
        exercise: "Implement Stratified K-Fold (giữ tỉ lệ y=0/y=1 trong mỗi fold).",
        exerciseEn: "Implement Stratified K-Fold (maintain y=0/y=1 ratio in each fold).",
        quiz: [
          { question: "Tại sao CV tốt hơn single train/test split?", options: ["Nhanh hơn", "Giảm variance của ước lượng performance", "Luôn cho accuracy cao hơn", "Dùng ít data hơn"], answer: 1, explanation: "CV đánh giá trên nhiều splits khác nhau, giảm variance do lucky/unlucky split. Ước lượng performance đáng tin hơn." }
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
        theory: "**Hyperparameters** — tham số không được model tự học.\n\n**Grid Search:**\n- Thử tất cả tổ hợp hyperparameters\n- Ưu: Toàn diện. Nhược: Chậm exponentially\n\n**Random Search:**\n- Thử ngẫu nhiên N tổ hợp\n- Thường hiệu quả hơn Grid Search\n- Tìm được \"good enough\" nhanh hơn\n\n**Bayesian Optimization:**\n- Dùng kết quả trước để chọn điểm thử tiếp\n- Thông minh hơn random\n- Tools: Optuna, Hyperopt",
        theoryEn: "**Hyperparameters** — parameters not learned by the model.\n\n**Grid Search:** Try all combinations\n**Random Search:** Try random N combinations\n**Bayesian:** Use previous results to guide next trial",
        code: "import numpy as np\n\ndef evaluate_model(X, y, k_neighbors, metric='euclidean'):\n    \"\"\"Simple KNN evaluation with cross-val\"\"\"\n    np.random.seed(42)\n    indices = np.random.permutation(len(X))\n    split = int(0.8 * len(X))\n    X_train, X_test = X[indices[:split]], X[indices[split:]]\n    y_train, y_test = y[indices[:split]], y[indices[split:]]\n\n    preds = []\n    for x in X_test:\n        if metric == 'manhattan':\n            dists = np.sum(np.abs(X_train - x), axis=1)\n        else:\n            dists = np.linalg.norm(X_train - x, axis=1)\n        nearest = y_train[np.argsort(dists)[:k_neighbors]]\n        preds.append(np.bincount(nearest.astype(int)).argmax())\n    return np.mean(np.array(preds) == y_test)\n\nnp.random.seed(42)\nX = np.random.randn(200, 3)\ny = ((X[:, 0]**2 + X[:, 1]) > 0.5).astype(int)\n\n# Grid Search\nprint('Grid Search:')\nparam_grid = {'k': [1, 3, 5, 7, 9, 11], 'metric': ['euclidean', 'manhattan']}\nbest_score, best_params = 0, {}\nfor k in param_grid['k']:\n    for m in param_grid['metric']:\n        score = evaluate_model(X, y, k, m)\n        if score > best_score:\n            best_score, best_params = score, {'k': k, 'metric': m}\n        print(f'  k={k:2d}, metric={m:10s} -> {score:.2%}')\nprint(f'Best: {best_params} -> {best_score:.2%}')\n\n# Random Search\nprint('\\nRandom Search (10 trials):')\nfor trial in range(10):\n    k = np.random.choice([1,3,5,7,9,11,15,21])\n    m = np.random.choice(['euclidean', 'manhattan'])\n    score = evaluate_model(X, y, k, m)\n    print(f'  Trial {trial+1}: k={k:2d}, metric={m:10s} -> {score:.2%}')",
        codeLanguage: "python",
        exercise: "Implement simple Bayesian Optimization: dùng kết quả trước để ưu tiên vùng tham số tốt.",
        exerciseEn: "Implement simple Bayesian Optimization: use previous results to prioritize promising parameter regions.",
        quiz: [
          { question: "Random Search thường tốt hơn Grid Search khi nào?", options: ["Ít hyperparameters", "Nhiều hyperparameters (high-dimensional)", "Chỉ 1 hyperparameter", "Không bao giờ"], answer: 1, explanation: "Với nhiều hyperparameters, Grid Search phải thử exponentially nhiều tổ hợp. Random Search explore hiệu quả hơn." }
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
        theory: "**Classification Metrics:**\n- Accuracy: (TP+TN) / Total\n- Precision: TP / (TP+FP) — khi dự đoán positive, bao nhiêu đúng?\n- Recall: TP / (TP+FN) — trong actual positive, tìm được bao nhiêu?\n- F1: 2 * P * R / (P + R) — harmonic mean\n\n**Confusion Matrix:** TP, TN, FP, FN\n\n**ROC Curve:** True Positive Rate vs False Positive Rate\n- AUC: Area Under Curve (0.5 = random, 1 = perfect)\n\n**Bias-Variance Tradeoff:**\n- High Bias: underfitting (model quá đơn giản)\n- High Variance: overfitting (model quá phức tạp)",
        theoryEn: "**Classification:** Accuracy, Precision, Recall, F1, AUC\n**Confusion Matrix:** TP, TN, FP, FN\n**Bias-Variance:** Underfitting vs Overfitting",
        code: "import numpy as np\n\ndef confusion_matrix(y_true, y_pred):\n    tp = sum((t == 1 and p == 1) for t, p in zip(y_true, y_pred))\n    tn = sum((t == 0 and p == 0) for t, p in zip(y_true, y_pred))\n    fp = sum((t == 0 and p == 1) for t, p in zip(y_true, y_pred))\n    fn = sum((t == 1 and p == 0) for t, p in zip(y_true, y_pred))\n    return tp, tn, fp, fn\n\ndef classification_report(y_true, y_pred):\n    tp, tn, fp, fn = confusion_matrix(y_true, y_pred)\n    accuracy = (tp + tn) / len(y_true)\n    precision = tp / (tp + fp) if (tp + fp) > 0 else 0\n    recall = tp / (tp + fn) if (tp + fn) > 0 else 0\n    f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0\n\n    print('Confusion Matrix:')\n    print(f'  Predicted:  Pos  Neg')\n    print(f'  Actual Pos: {tp:3d}  {fn:3d}')\n    print(f'  Actual Neg: {fp:3d}  {tn:3d}')\n    print(f'\\nMetrics:')\n    print(f'  Accuracy:  {accuracy:.4f}')\n    print(f'  Precision: {precision:.4f}')\n    print(f'  Recall:    {recall:.4f}')\n    print(f'  F1 Score:  {f1:.4f}')\n\nnp.random.seed(42)\ny_true = np.array([1,1,1,1,1,0,0,0,0,0,1,1,0,0,1])\ny_pred = np.array([1,1,0,1,1,0,0,1,0,0,1,0,0,1,1])\n\nclassification_report(y_true, y_pred)",
        codeLanguage: "python",
        exercise: "Implement ROC curve: tính TPR, FPR tại nhiều thresholds và tính AUC.",
        exerciseEn: "Implement ROC curve: compute TPR, FPR at multiple thresholds and calculate AUC.",
        quiz: [
          { question: "Khi nào Recall quan trọng hơn Precision?", options: ["Khi false positives nguy hiểm", "Khi bỏ sót positive rất nguy hiểm (y tế, fraud)", "Luôn luôn", "Khi data balanced"], answer: 1, explanation: "Recall quan trọng khi miss positive rất nguy hiểm: chẩn đoán ung thư (bỏ sót bệnh nhân), phát hiện fraud." }
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
        theory: "**Ensemble Methods** kết hợp nhiều models.\n\n**Bagging (parallel):** Random Forest\n- Giảm variance\n\n**Boosting (sequential):**\n- Mỗi model tập trung vào errors của model trước\n- AdaBoost: tăng weight cho misclassified samples\n- Gradient Boosting: fit residuals\n- XGBoost: optimized gradient boosting\n\n**Stacking:**\n- Train nhiều base models\n- Dùng meta-model học cách combine predictions\n\n**Voting:**\n- Hard voting: majority vote\n- Soft voting: average probabilities",
        theoryEn: "**Ensemble Methods** combine multiple models.\n\n**Bagging:** Parallel, reduces variance\n**Boosting:** Sequential, focuses on errors\n**Stacking:** Meta-model combines base predictions\n**Voting:** Majority vote or average probabilities",
        code: "import numpy as np\n\n# Simple AdaBoost implementation\nclass SimpleAdaBoost:\n    def __init__(self, n_estimators=5):\n        self.n_estimators = n_estimators\n        self.stumps = []\n        self.alphas = []\n\n    def _best_stump(self, X, y, weights):\n        best_err, best_feat, best_thresh, best_pol = float('inf'), 0, 0, 1\n        for feat in range(X.shape[1]):\n            for thresh in np.unique(X[:, feat]):\n                for polarity in [1, -1]:\n                    pred = np.ones(len(X))\n                    if polarity == 1:\n                        pred[X[:, feat] < thresh] = -1\n                    else:\n                        pred[X[:, feat] >= thresh] = -1\n                    err = np.sum(weights * (pred != y))\n                    if err < best_err:\n                        best_err, best_feat, best_thresh, best_pol = err, feat, thresh, polarity\n        return best_feat, best_thresh, best_pol, best_err\n\n    def fit(self, X, y_orig):\n        y = np.where(y_orig == 0, -1, 1)\n        weights = np.ones(len(X)) / len(X)\n\n        for t in range(self.n_estimators):\n            feat, thresh, pol, err = self._best_stump(X, y, weights)\n            err = max(err, 1e-10)\n            alpha = 0.5 * np.log((1 - err) / err)\n\n            pred = np.ones(len(X))\n            if pol == 1:\n                pred[X[:, feat] < thresh] = -1\n            else:\n                pred[X[:, feat] >= thresh] = -1\n\n            weights *= np.exp(-alpha * y * pred)\n            weights /= weights.sum()\n\n            self.stumps.append((feat, thresh, pol))\n            self.alphas.append(alpha)\n            print(f'  Stump {t+1}: feat={feat}, thresh={thresh:.2f}, alpha={alpha:.3f}, err={err:.4f}')\n\n    def predict(self, X):\n        final = np.zeros(len(X))\n        for (feat, thresh, pol), alpha in zip(self.stumps, self.alphas):\n            pred = np.ones(len(X))\n            if pol == 1:\n                pred[X[:, feat] < thresh] = -1\n            else:\n                pred[X[:, feat] >= thresh] = -1\n            final += alpha * pred\n        return (final >= 0).astype(int)\n\nnp.random.seed(42)\nX = np.random.randn(100, 2)\ny = ((X[:, 0]**2 + X[:, 1]) > 0.5).astype(int)\n\nprint('Training AdaBoost:')\nada = SimpleAdaBoost(n_estimators=10)\nada.fit(X, y)\nacc = np.mean(ada.predict(X) == y)\nprint(f'\\nAccuracy: {acc:.2%}')",
        codeLanguage: "python",
        exercise: "Implement simple Gradient Boosting: fit residuals sequentially với learning rate.",
        exerciseEn: "Implement simple Gradient Boosting: fit residuals sequentially with learning rate.",
        quiz: [
          { question: "Boosting khác Bagging ở điểm nào?", options: ["Giống nhau", "Boosting sequential, focus errors; Bagging parallel, random subsets", "Boosting dùng ít models", "Bagging luôn tốt hơn"], answer: 1, explanation: "Boosting train models tuần tự, mỗi model focus vào errors của model trước. Bagging train song song trên random subsets." }
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
        theory: "**MLOps** — DevOps cho Machine Learning.\n\n**Pipeline:**\n1. Data Collection & Versioning (DVC)\n2. Feature Store (Feast)\n3. Training & Experiment Tracking (MLflow, W&B)\n4. Model Registry & Versioning\n5. Serving (FastAPI, TF Serving)\n6. Monitoring (data drift, model decay)\n\n**Model Serving:**\n- Batch inference: offline predictions\n- Real-time API: REST/gRPC endpoint\n- Edge deployment: mobile/IoT\n\n**Monitoring:**\n- Data Drift: input distribution changes\n- Concept Drift: relationship changes\n- Model Decay: performance degrades over time",
        theoryEn: "**MLOps** — DevOps for Machine Learning.\n\n**Pipeline:** Data → Features → Training → Registry → Serving → Monitoring\n\n**Serving:** Batch, Real-time API, Edge\n**Monitoring:** Data Drift, Concept Drift, Model Decay",
        code: "import json\nfrom datetime import datetime\nimport numpy as np\n\nclass MLPipeline:\n    def __init__(self, name, version='1.0'):\n        self.name = name\n        self.version = version\n        self.metrics_log = []\n        self.model = None\n\n    def train(self, X, y):\n        # Simple model\n        self.model = {'mean': y.mean(), 'weights': np.random.randn(X.shape[1])}\n        pred = X @ self.model['weights']\n        mse = np.mean((y - pred) ** 2)\n        self.metrics_log.append({\n            'stage': 'training',\n            'timestamp': datetime.now().isoformat(),\n            'mse': round(float(mse), 4),\n            'samples': len(X)\n        })\n        print(f'  Trained v{self.version}: MSE = {mse:.4f}')\n\n    def predict(self, X):\n        if self.model is None:\n            raise ValueError('Model not trained!')\n        return X @ self.model['weights']\n\n    def monitor(self, X_new, y_new):\n        pred = self.predict(X_new)\n        mse = np.mean((y_new - pred) ** 2)\n        # Data drift detection (simple: compare means)\n        drift_score = abs(X_new.mean() - 0)  # compare to training mean\n        self.metrics_log.append({\n            'stage': 'monitoring',\n            'timestamp': datetime.now().isoformat(),\n            'mse': round(float(mse), 4),\n            'drift_score': round(float(drift_score), 4),\n            'alert': drift_score > 1.0\n        })\n        print(f'  Monitor: MSE = {mse:.4f}, Drift = {drift_score:.4f}',\n              '⚠️ ALERT' if drift_score > 1.0 else '✅ OK')\n\n    def export_metrics(self):\n        print(f'\\nMetrics Log ({len(self.metrics_log)} entries):')\n        for m in self.metrics_log:\n            print(f'  {json.dumps(m)}')\n\nnp.random.seed(42)\nX_train = np.random.randn(100, 3)\ny_train = X_train @ np.array([1, 2, -1]) + np.random.randn(100) * 0.5\n\npipeline = MLPipeline('student_predictor', version='1.0')\nprint('MLOps Pipeline Demo')\nprint('=' * 50)\npipeline.train(X_train, y_train)\n\n# Normal data\nX_test = np.random.randn(20, 3)\ny_test = X_test @ np.array([1, 2, -1]) + np.random.randn(20) * 0.5\npipeline.monitor(X_test, y_test)\n\n# Drifted data\nX_drift = np.random.randn(20, 3) + 3  # shifted distribution\ny_drift = X_drift @ np.array([1, 2, -1])\npipeline.monitor(X_drift, y_drift)\n\npipeline.export_metrics()",
        codeLanguage: "python",
        exercise: "Thêm A/B testing: so sánh 2 model versions trên cùng data và tự động chọn model tốt hơn.",
        exerciseEn: "Add A/B testing: compare 2 model versions on same data and auto-select the better one.",
        quiz: [
          { question: "Data Drift là gì?", options: ["Model bị lỗi", "Phân phối dữ liệu đầu vào thay đổi theo thời gian", "Dữ liệu bị mất", "Training quá lâu"], answer: 1, explanation: "Data Drift xảy ra khi phân phối của dữ liệu production khác với dữ liệu training, khiến model dự đoán kém đi." }
        ]
      }
    ]
  }
];
