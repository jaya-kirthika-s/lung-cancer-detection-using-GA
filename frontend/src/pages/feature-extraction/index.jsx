import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SummaryStats from './components/SummaryStats';
import FeatureTable from './components/FeatureTable';
import ProcessingProgress from './components/ProcessingProgress';

const FeatureExtraction = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  // Mock processing steps
  const processingSteps = [
    {
      id: 1,
      name: "Image Analysis",
      description: "Analyzing lung structure",
      icon: "Eye"
    },
    {
      id: 2,
      name: "Feature Detection",
      description: "Identifying key features",
      icon: "Search"
    },
    {
      id: 3,
      name: "Data Extraction",
      description: "Extracting measurements",
      icon: "Database"
    },
    {
      id: 4,
      name: "Validation",
      description: "Validating results",
      icon: "CheckCircle"
    }
  ];

  // Mock summary statistics
  const summaryStats = {
    totalFeatures: 47,
    processingConfidence: 94,
    algorithmPerformance: 1247,
    highSignificanceCount: 8,
    mediumSignificanceCount: 15,
    lowSignificanceCount: 24
  };

  // Mock feature extraction data
  const extractedFeatures = [
    {
      id: 1,
      name: "Nodule Diameter",
      description: "Maximum diameter of detected nodule",
      value: "12.4",
      unit: "mm",
      normalRange: "< 8mm",
      significance: "high",
      category: "morphology"
    },
    {
      id: 2,
      name: "Lung Volume",
      description: "Total lung capacity measurement",
      value: "4850",
      unit: "ml",
      normalRange: "4000-6000ml",
      significance: "low",
      category: "volumetric"
    },
    {
      id: 3,
      name: "Texture Entropy",
      description: "Tissue texture irregularity measure",
      value: "7.23",
      unit: "",
      normalRange: "< 6.5",
      significance: "medium",
      category: "texture"
    },
    {
      id: 4,
      name: "Contrast Enhancement",
      description: "Tissue contrast variation",
      value: "145.7",
      unit: "HU",
      normalRange: "100-120 HU",
      significance: "high",
      category: "intensity"
    },
    {
      id: 5,
      name: "Edge Sharpness",
      description: "Nodule boundary definition",
      value: "0.87",
      unit: "",
      normalRange: "> 0.9",
      significance: "medium",
      category: "morphology"
    },
    {
      id: 6,
      name: "Density Variation",
      description: "Internal density heterogeneity",
      value: "23.4",
      unit: "%",
      normalRange: "< 15%",
      significance: "high",
      category: "intensity"
    },
    {
      id: 7,
      name: "Sphericity Index",
      description: "Shape regularity measurement",
      value: "0.73",
      unit: "",
      normalRange: "> 0.8",
      significance: "medium",
      category: "morphology"
    },
    {
      id: 8,
      name: "Vascular Proximity",
      description: "Distance to nearest blood vessel",
      value: "3.2",
      unit: "mm",
      normalRange: "> 5mm",
      significance: "high",
      category: "anatomical"
    },
    {
      id: 9,
      name: "Pleural Distance",
      description: "Distance from pleural surface",
      value: "8.7",
      unit: "mm",
      normalRange: "> 10mm",
      significance: "medium",
      category: "anatomical"
    },
    {
      id: 10,
      name: "Calcification Score",
      description: "Presence of calcification patterns",
      value: "0.12",
      unit: "",
      normalRange: "< 0.1",
      significance: "low",
      category: "composition"
    },
    {
      id: 11,
      name: "Air Bronchogram",
      description: "Internal air-filled structures",
      value: "Present",
      unit: "",
      normalRange: "Absent",
      significance: "high",
      category: "morphology"
    },
    {
      id: 12,
      name: "Spiculation Index",
      description: "Irregular border projections",
      value: "0.68",
      unit: "",
      normalRange: "< 0.3",
      significance: "high",
      category: "morphology"
    },
    {
      id: 13,
      name: "Lobulation Score",
      description: "Nodule surface irregularity",
      value: "2.4",
      unit: "",
      normalRange: "< 1.5",
      significance: "medium",
      category: "morphology"
    },
    {
      id: 14,
      name: "Ground Glass Opacity",
      description: "Hazy lung opacity measurement",
      value: "15.3",
      unit: "%",
      normalRange: "< 10%",
      significance: "medium",
      category: "intensity"
    },
    {
      id: 15,
      name: "Metabolic Activity",
      description: "Tissue metabolic rate indicator",
      value: "4.2",
      unit: "SUV",
      normalRange: "< 2.5 SUV",
      significance: "high",
      category: "functional"
    }
  ];

  // Simulate processing steps
  useEffect(() => {
    const processSteps = async () => {
      for (let i = 0; i <= processingSteps?.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setCurrentStep(i);
      }
      setIsLoading(false);
    };

    processSteps();
  }, []);

  const handleExportData = () => {
    // Mock export functionality
    const exportData = {
      timestamp: new Date()?.toISOString(),
      patientId: "PATIENT-2025-001",
      features: extractedFeatures,
      statistics: summaryStats
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'feature-extraction-results.json';
    link?.click();
    URL.revokeObjectURL(url);
  };

  const handleProceedToResults = () => {
    navigate('/diagnosis-results');
  };

  const handleBackToPreprocessing = () => {
    navigate('/image-preprocessing');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            {/* Floating particles */}
            {[...Array(20)]?.map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 lg:mb-12"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Brain" size={24} color="white" strokeWidth={2.5} />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Feature Extraction Results
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Advanced AI algorithms have analyzed your medical image and extracted some key features 
                for comprehensive lung cancer detection analysis.
              </p>
            </motion.div>

            {/* Processing Progress */}
            {isLoading ? (
              <ProcessingProgress currentStep={currentStep} steps={processingSteps} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Summary Statistics */}
                <div className="mb-8">
                  <SummaryStats stats={summaryStats} />
                </div>

                {/* Feature Extraction Table */}
                <div className="mb-8">
                  <FeatureTable 
                    features={extractedFeatures} 
                    onExport={handleExportData}
                  />
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="ArrowLeft"
                    iconPosition="left"
                    onClick={handleBackToPreprocessing}
                    className="w-full sm:w-auto"
                  >
                    Back to Preprocessing
                  </Button>
                  
                  <Button
                    variant="default"
                    size="lg"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={handleProceedToResults}
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    Proceed to Diagnosis
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default FeatureExtraction;