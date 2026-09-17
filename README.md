# 🫁 Early Detection of Lung Cancer using Image Processing & Genetic Algorithm

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://lung-cancer-detection-using-ga.vercel.app/)
[![Backend Status](https://img.shields.io/badge/API_Status-Render-46E3B7?style=for-the-badge&logo=render)](https://lung-cancer-detection-using-ga-backend.onrender.com)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.16+-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![Keras](https://img.shields.io/badge/Keras-3.0+-D00000?style=for-the-badge&logo=keras&logoColor=white)](https://keras.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

An AI-powered biomedical diagnostic platform for the early detection and classification of lung cancer from chest CT scan images. Utilizes **Hybrid Feature Extraction** (DenseNet-121 Deep Transfer Learning, GLCM Texture Matrix, and LBP Local Binary Patterns), **Genetic Algorithm (GA)** feature selection, and a **Deep Neural Network (DNN)** classifier, served via a **Flask REST API** with an interactive **React + Vite** frontend.

---

## 🌐 Live Production Deployments

| Component | Cloud Host | Live Production Endpoint |
| :--- | :--- | :--- |
| **Frontend Web App** | **Vercel** | [https://lung-cancer-detection-using-ga.vercel.app/](https://lung-cancer-detection-using-ga.vercel.app/) |
| **AI Backend API** | **Render** | [https://lung-cancer-detection-using-ga-backend.onrender.com](https://lung-cancer-detection-using-ga-backend.onrender.com) |

---

## 📌 Core Features

- 🫁 **Automated CT Scan Diagnosis**: Rapid analysis of chest CT scan images to detect malignant lung nodules vs. non-cancerous/normal tissue.
- 🧬 **Hybrid Feature Extraction Pipeline**:
  - **DenseNet-121**: Pretrained deep convolutional feature extractor capturing high-level anatomical representations.
  - **GLCM (Gray-Level Co-occurrence Matrix)**: Second-order statistical spatial texture descriptors (contrast, correlation, energy, homogeneity).
  - **LBP (Local Binary Patterns)**: Surface micro-texture descriptors invariant to monotonic illumination changes.
- ⚡ **Genetic Algorithm (GA) Optimization**: Feature space optimization identifying the most discriminative biomarkers while eliminating noise and dimensionality.
- 🎯 **Deep Neural Network (DNN) Classifier**: Multi-layer neural network model predicting malignancy with real-time confidence scores.
- 🔄 **Interactive Diagnostic Stepper UI**: Step-by-step workflow covering Image Upload $\rightarrow$ Preprocessing $\rightarrow$ Feature Extraction $\rightarrow$ Diagnostic Report.
- 📊 **Detailed Clinical Results & Metrics**: Instant confidence metrics, image comparison view, and clinical next steps.

---

## 🏗️ System Architecture

```
                                  +-----------------------------+
                                  |    React 18 + Vite Frontend |
                                  | (Vercel Global Edge Network)|
                                  +--------------+--------------+
                                                 |
                                          Multipart Form / API
                                                 |
                                                 v
                                  +-----------------------------+
                                  |    Flask REST API Service   |
                                  |    (Hosted on Render)       |
                                  +--------------+--------------+
                                                 |
         +---------------------------------------+---------------------------------------+
         |                                       |                                       |
         v                                       v                                       v
+-------------------------+             +-------------------------+             +-------------------------+
|     Pre-Processing      |             | Hybrid Feature Extract  |             | DNN Classifier & Report |
|  - Grayscale / Resize   | ----------> |  - DenseNet-121 Deep Feat| ----------> |  - Scaler Normalization |
|  - Noise Filtering      |             |  - LBP Micro-Texture    |             |  - GA Feature Subset    |
|  - Format Normalization |             |  - GLCM Spatial Matrix  |             |  - Malignant Prediction |
+-------------------------+             +-------------------------+             +-------------------------+
```

---

## 🔬 AI & Machine Learning Pipeline

1. **Preprocessing**: Images are standardized, resized to $(512 \times 512)$, converted to RGB/grayscale channels, and normalized.
2. **Deep Feature Representation**: Base convolutional feature extraction through DenseNet-121 with Global Average Pooling.
3. **Texture Descriptors**:
   - **LBP**: Uniform $(P=8, R=1)$ pattern histogram bins capturing cellular texture irregularities.
   - **GLCM**: Angular offset spatial matrix extracting contrast, correlation, energy, and homogeneity.
4. **Genetic Algorithm Feature Selection**: Optimization selects optimal biomarker indices to maximize classification precision and eliminate overfitting.
5. **Inference**: Deep Neural Network (`lung_cancer_dnn.h5`) generates probabilistic class scores.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, Framer Motion, Lucide React, Recharts, Redux Toolkit
- **Backend API**: Python 3.10+, Flask, Flask-CORS, Gunicorn
- **Computer Vision & Image Processing**: OpenCV (`opencv-python-headless`), Scikit-Image (`skimage`)
- **Deep Learning & ML**: TensorFlow (`tensorflow-cpu`), Keras 3, Scikit-Learn, NumPy, Joblib
- **Cloud Hosting & CI/CD**: Vercel (Frontend Global CDN) + Render (Python Web Service)

---

## 🚀 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)

### 1. Start the Flask Backend
```bash
cd backend
pip install -r requirements.txt
python check.py
```
> Backend starts at: `http://127.0.0.1:5000`

### 2. Start the React Frontend
```bash
cd frontend
npm install
npm start
```
> Frontend launches at: `http://localhost:3000`

---

## 📁 Repository Structure

```text
├── backend/
│   ├── check.py                 # Flask REST API endpoints & prediction pipeline
│   ├── requirements.txt         # Production Python dependencies (tensorflow-cpu, gunicorn, etc.)
│   ├── .python-version          # Pinned Python version (3.10.12) for cloud hosting
│   ├── lung_cancer_dnn.h5       # Trained Deep Neural Network weights
│   ├── lung_cancer_dnn_3class.h5# Multi-class classification model
│   ├── scaler.pkl               # Standardized feature normalizer
│   ├── selected_features.pkl    # Genetic Algorithm selected feature indices
│   ├── static/uploads/          # Temp storage for uploaded CT scans
│   └── process.ipynb            # Feature extraction & training notebook
│
├── frontend/
│   ├── package.json             # React & Vite dependencies
│   ├── vite.config.mjs          # Vite bundler configuration
│   ├── public/                  # Favicons, manifests, and static images
│   └── src/
│       ├── App.jsx              # Main React application component
│       ├── Routes.jsx           # Application routing configuration
│       ├── pages/
│       │   ├── landing-page/    # Interactive project overview & modal
│       │   ├── image-upload/    # CT Scan dropzone and API submission
│       │   ├── image-preprocessing/# Preprocessing pipeline & comparison
│       │   ├── feature-extraction/ # Hybrid GLCM, LBP, DenseNet telemetry
│       │   └── diagnosis-results/  # Final diagnosis card & confidence scores
│       └── components/          # Reusable UI primitives and headers
│
├── .gitignore                   # Excludes heavy datasets and node_modules
├── .python-version              # Python version lock for Render
└── README.md                    # Project documentation
```

---

## 👤 Author

**Jaya Kirthika S**
- GitHub: [@jaya-kirthika-s](https://github.com/jaya-kirthika-s)
- Project Repository: [lung-cancer-detection-using-GA](https://github.com/jaya-kirthika-s/lung-cancer-detection-using-GA)
- Live Website: [lung-cancer-detection-using-ga.vercel.app](https://lung-cancer-detection-using-ga.vercel.app/)
