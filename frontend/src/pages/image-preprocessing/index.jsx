import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProcessingStepper from './components/ProcessingStepper';
import ImageComparisonPanel from './components/ImageComparisonPanel';
import ProcessingStepCard from './components/ProcessingStepCard';
import ProcessingMetrics from './components/ProcessingMetrics';

const ImagePreprocessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
   const prediction = location?.state?.prediction;
  const confidence = location?.state?.confidence;
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState('original');
  const [processingComplete, setProcessingComplete] = useState(false);

  // Mock uploaded image from previous step
  const uploadedImage =
  location?.state?.uploadedImage ||
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=800&fit=crop";
  // Processing steps configuration
  const processingSteps = [
    {
      id: 'noise-reduction',
      title: 'Noise Reduction',
      subtitle: 'Cleaning image',
      description: 'Removing artifacts and noise from the medical scan',
      icon: 'Filter',
      activeIcon: 'Loader'
    },
    {
      id: 'lung-segmentation',
      title: 'Lung Segmentation',
      subtitle: 'Isolating lung region',
      description: 'Identifying and extracting lung boundaries',
      icon: 'Scissors',
      activeIcon: 'Loader'
    },
    {
      id: 'grayscale-conversion',
      title: 'Grayscale Conversion',
      subtitle: 'Optimizing for analysis',
      description: 'Converting to optimal format for feature extraction',
      icon: 'Palette',
      activeIcon: 'Loader'
    },
    {
      id: 'enhancement',
      title: 'Image Enhancement',
      subtitle: 'Improving clarity',
      description: 'Enhancing contrast and sharpness for better analysis',
      icon: 'Sparkles',
      activeIcon: 'Loader'
    }
  ];

  // Mock processed images
  const processedImages = {
    original: uploadedImage,
    segmented: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=800&fit=crop",
    grayscale: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=800&fit=crop"
  };

  // Processing step details
  const stepDetails = [
    {
      title: "Noise Reduction",
      description: "Applying Gaussian filter to reduce image noise",
      status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'processing' : 'pending',
      progress: currentStep > 0 ? 100 : currentStep === 0 ? 75 : 0,
      icon: "Filter",
      processingTime: "2.3s",
      technicalDetails: [
        { label: "Filter Type", value: "Gaussian 5x5" },
        { label: "Sigma", value: "1.2" },
        { label: "Kernel Size", value: "5x5" }
      ]
    },
    {
      title: "Lung Segmentation",
      description: "Isolating lung regions using advanced algorithms",
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'processing' : 'pending',
      progress: currentStep > 1 ? 100 : currentStep === 1 ? 60 : 0,
      icon: "Scissors",
      processingTime: "4.1s",
      technicalDetails: [
        { label: "Algorithm", value: "U-Net CNN" },
        { label: "Accuracy", value: "97.8%" },
        { label: "Threshold", value: "0.85" }
      ]
    },
    {
      title: "Grayscale Conversion",
      description: "Converting to optimal grayscale format",
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'processing' : 'pending',
      progress: currentStep > 2 ? 100 : currentStep === 2 ? 90 : 0,
      icon: "Palette",
      processingTime: "1.2s",
      technicalDetails: [
        { label: "Method", value: "Weighted RGB" },
        { label: "Bit Depth", value: "8-bit" },
        { label: "Histogram", value: "Equalized" }
      ]
    },
    {
      title: "Image Enhancement",
      description: "Enhancing contrast and sharpness",
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'processing' : 'pending',
      progress: currentStep > 3 ? 100 : currentStep === 3 ? 45 : 0,
      icon: "Sparkles",
      processingTime: "3.7s",
      technicalDetails: [
        { label: "CLAHE", value: "Applied" },
        { label: "Sharpening", value: "Unsharp Mask" },
        { label: "Contrast", value: "+15%" }
      ]
    }
  ];

  // Processing metrics
  const processingMetrics = [
    {
      id: 'processing-speed',
      label: 'Processing Speed',
      value: 847,
      type: 'number',
      unit: 'ms/step',
      category: 'performance',
      description: 'Average time per processing step',
      progress: 85,
      trend: 'up',
      isLive: true
    },
    {
      id: 'image-quality',
      label: 'Image Quality Score',
      value: 94.2,
      type: 'percentage',
      category: 'quality',
      description: 'Overall image quality after processing',
      progress: 94,
      subMetrics: [
        { label: 'Sharpness', value: 96.1, type: 'percentage' },
        { label: 'Contrast', value: 92.8, type: 'percentage' },
        { label: 'Noise Level', value: 5.2, type: 'percentage' }
      ]
    },
    {
      id: 'cpu-usage',
      label: 'CPU Usage',
      value: 67,
      type: 'percentage',
      category: 'processing',
      description: 'Current system resource utilization',
      progress: 67,
      isLive: true
    },
    {
      id: 'memory-usage',
      label: 'Memory Usage',
      value: 2.4,
      type: 'number',
      unit: 'GB',
      category: 'processing',
      description: 'RAM consumption during processing',
      progress: 48
    },
    {
      id: 'segmentation-accuracy',
      label: 'Segmentation Accuracy',
      value: 97.8,
      type: 'percentage',
      category: 'analysis',
      description: 'Lung boundary detection precision',
      progress: 98,
      subMetrics: [
        { label: 'Precision', value: 98.2, type: 'percentage' },
        { label: 'Recall', value: 97.4, type: 'percentage' },
        { label: 'F1-Score', value: 97.8, type: 'percentage' }
      ]
    },
    {
      id: 'file-size',
      label: 'Processed Size',
      value: 1.2,
      type: 'number',
      unit: 'MB',
      category: 'performance',
      description: 'Final processed image size',
      subMetrics: [
        { label: 'Original', value: 2.8, type: 'number', unit: 'MB' },
        { label: 'Compressed', value: 57, type: 'percentage' }
      ]
    }
  ];

  // Auto-progress simulation
  useEffect(() => {
    if (isProcessing && currentStep < processingSteps?.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          if (next >= processingSteps?.length) {
            setIsProcessing(false);
            setProcessingComplete(true);
          }
          return next;
        });
      }, 3000); // 3 seconds per step

      return () => clearTimeout(timer);
    }
  }, [isProcessing, currentStep, processingSteps?.length]);

  // Start processing automatically on mount
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsProcessing(true);
    }, 1000);

    return () => clearTimeout(startTimer);
  }, []);

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep) {
      // Allow navigation to completed or current steps
      setCurrentStep(stepIndex);
    }
  };

  const handleImageSelect = (imageType) => {
    setSelectedImage(imageType);
  };

  const handleProceedToFeatureExtraction = () => {
    navigate('/feature-extraction', {
      state: {
        processedImages,
        processingMetrics: processingMetrics?.filter(m => m?.category === 'analysis')
        
      }
    });
  };

  const handleBackToUpload = () => {
    navigate('/image-upload');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Image Preprocessing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI algorithms are processing your medical scan to optimize it for accurate lung cancer detection analysis.
            </p>
          </motion.div>

          {/* Processing Stepper */}
          <div className="mb-8">
            <ProcessingStepper
              currentStep={currentStep}
              steps={processingSteps}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Image Comparison Panel */}
            <div className="xl:col-span-2">
              <ImageComparisonPanel
                originalImage={processedImages?.original}
                segmentedImage={processedImages?.segmented}
                grayscaleImage={processedImages?.grayscale}
                currentStep={currentStep}
                onImageSelect={handleImageSelect}
              />
            </div>

            {/* Processing Steps Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">Processing Details</h2>
              {stepDetails?.map((step, index) => (
                <ProcessingStepCard
                  key={step?.title}
                  title={step?.title}
                  description={step?.description}
                  status={step?.status}
                  progress={step?.progress}
                  icon={step?.icon}
                  isActive={index === currentStep}
                  isCompleted={index < currentStep}
                  processingTime={step?.processingTime}
                  technicalDetails={step?.technicalDetails}
                />
              ))}
            </div>
          </div>

          {/* Processing Metrics */}
          <div className="mb-8">
            <ProcessingMetrics
              metrics={processingMetrics}
              isProcessing={isProcessing}
            />
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button
              variant="outline"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={handleBackToUpload}
              className="w-full sm:w-auto"
            >
              Back to Upload
            </Button>

            <div className="flex items-center space-x-4">
              {isProcessing && (
                <div className="flex items-center space-x-2 text-primary">
                  <Icon name="Loader" size={16} className="animate-spin" />
                  <span className="text-sm font-medium">
                    Processing Step {currentStep + 1} of {processingSteps?.length}
                  </span>
                </div>
              )}

              <AnimatePresence>
                {processingComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Button
                      variant="default"
                      iconName="ArrowRight"
                      iconPosition="right"
                      onClick={handleProceedToFeatureExtraction}
                      className="shadow-lg shadow-primary/20"
                    >
                      Proceed to Feature Extraction
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Processing Complete Notification */}
          <AnimatePresence>
            {processingComplete && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-6 right-6 glass rounded-xl p-4 border border-success/30 shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Processing Complete!</h3>
                    <p className="text-xs text-muted-foreground">
                      Your image is ready for feature extraction
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default ImagePreprocessing;