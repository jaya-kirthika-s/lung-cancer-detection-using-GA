import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/ui/Header";
import UploadZone from "./components/UploadZone";
import ImagePreview from "./components/ImagePreview";
import UploadInstructions from "./components/UploadInstructions";

const ImageUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (file) => {
    setIsUploading(true);

    // Simulate upload validation process
    await new Promise((resolve) =>
      setTimeout(resolve, 1500));

    setSelectedFile(file);
    setIsUploading(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setIsProcessing(false);
  };

  const handleProcessImage = async () => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const backendBaseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
      const response = await fetch(`${backendBaseUrl}/predict`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      window.localStorage.setItem("prediction",data.prediction)
      window.localStorage.setItem("confidence",data.confidence)
      

      // Navigate to result page with prediction data
      navigate("/image-preprocessing", {
        state: {
          prediction: data.prediction,
          confidence: data.confidence,
          uploadedImage: data.uploadedImage
        }
      });

    } catch (error) {
      console.error("Processing error:", error);
    }

    setIsProcessing(false);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pt-20 pb-12 px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Upload Medical Image
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Begin your AI-powered lung cancer detection analysis by uploading
              a high-quality medical image. Our genetic algorithms will
              process your image with precision and provide comprehensive
              diagnostic insights.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Upload Section */}
            <motion.section
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {selectedFile ? (
                  <ImagePreview
                    key="preview"
                    file={selectedFile}
                    onRemove={handleRemoveFile}
                    onProcess={handleProcessImage}
                    isProcessing={isProcessing}
                  />
                ) : (
                  <UploadZone
                    key="upload"
                    onFileSelect={handleFileSelect}
                    selectedFile={selectedFile}
                    isUploading={isUploading}
                  />
                )}
              </AnimatePresence>
            </motion.section>

            {/* Instructions Section - Only show when no file is selected */}
            <AnimatePresence>
              {!selectedFile && !isUploading && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <UploadInstructions />
                </motion.section>
              )}
            </AnimatePresence>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="glass rounded-xl p-6 border border-border/20 max-w-4xl mx-auto"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-success)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                      <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                      <path d="M3 12c0 4.97 4.03 9 9 9s9-4.03 9-9" />
                    </svg>
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">
                    HIPAA Compliant & Secure
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Your medical images are processed with bank-level encryption
                    and are never stored permanently. All data is handled in
                    compliance with HIPAA regulations and medical privacy
                    standards. Images are automatically deleted after analysis
                    completion.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(6)]?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
