import os
import cv2
import numpy as np
import tensorflow as tf
import joblib
from flask import Flask, request, jsonify, url_for
from flask_cors import CORS

from keras.applications.densenet import DenseNet121, preprocess_input
from keras.models import Model
from keras.layers import GlobalAveragePooling2D

from skimage.feature import local_binary_pattern
from skimage.feature import graycomatrix, graycoprops


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# # ===============================
# # Load trained model
# # ===============================

# model = tf.keras.models.load_model("lung_cancer_dnn.h5")
# scaler = joblib.load("scaler.pkl")
# selected_features = joblib.load("selected_features.pkl")

# print("✅ Model loaded successfully")


# # ===============================
# # DenseNet Feature Extractor
# # ===============================

# base_model = DenseNet121(
#     weights="imagenet",
#     include_top=False,
#     input_shape=(512, 512, 3)
# )

# x = base_model.output
# x = GlobalAveragePooling2D()(x)

# feature_model = Model(inputs=base_model.input, outputs=x)


# # ===============================
# # Feature Extraction
# # ===============================

# def extract_densenet_features(img_path):

#     img = cv2.imread(img_path)
#     img = cv2.resize(img, (512, 512))
#     img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

#     img = preprocess_input(img)
#     img = np.expand_dims(img, axis=0)

#     features = feature_model.predict(img, verbose=0)

#     return features.flatten()


# def extract_lbp_features(img_path):

#     img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
#     img = cv2.resize(img, (512, 512))

#     lbp = local_binary_pattern(img, P=8, R=1, method="uniform")

#     hist, _ = np.histogram(
#         lbp.ravel(),
#         bins=np.arange(0, 59),
#         density=True
#     )

#     return hist


# def extract_glcm_features(img_path):

#     img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
#     img = cv2.resize(img, (512, 512))

#     glcm = graycomatrix(
#         img,
#         distances=[1],
#         angles=[0],
#         levels=256,
#         symmetric=True,
#         normed=True
#     )

#     return np.array([
#         graycoprops(glcm, 'contrast')[0, 0],
#         graycoprops(glcm, 'correlation')[0, 0],
#         graycoprops(glcm, 'energy')[0, 0],
#         graycoprops(glcm, 'homogeneity')[0, 0]
#     ])


# def extract_hybrid_features(img_path):

#     f1 = extract_densenet_features(img_path)
#     f2 = extract_lbp_features(img_path)
#     f3 = extract_glcm_features(img_path)

#     return np.concatenate([f1, f2, f3])


# # ===============================
# # Prediction Function
# # ===============================

# def predict_image(img_path):

#     features = extract_hybrid_features(img_path)

#     features = scaler.transform([features])
#     features = features[:, selected_features]

#     pred = model.predict(features)[0][0]

#     if pred > 0.5:
#         predicted_class = "Malignant"
#         confidence = pred
#     else:
#         predicted_class = "Non-Cancer (Normal / Benign)"
#         confidence = 1 - pred

#     return predicted_class, round(confidence * 100, 2)


# ===============================
# API Route
# ===============================

@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({"error": "No file uploaded"})

    file = request.files["image"]

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    image_url = url_for('static', filename=f"uploads/{file.filename}", _external=True)
    # prediction, confidence = predict_image(filepath)
    return jsonify({
        "prediction": "Malignant",
        "confidence": "90",
        "uploadedImage": image_url
    })
    # return jsonify({
    #     "prediction": prediction,
    #     "confidence": confidence,
    #       "uploadedImage": image_url
    # })



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)