import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ResultCard from './components/ResultCard';
import ConfidenceScore from './components/ConfidenceScore';
import ResultsSummary from './components/ResultsSummary';
import DetailedAnalysis from './components/DetailedAnalysis';
import ActionButtons from './components/ActionButtons';

const DiagnosisResults = () => {
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    // Simulate receiving analysis results
    const mockAnalysisData = {
      result: Math.random() > 0.3 ? 'Benign' : 'Malignant', // 70% chance of benign for demo
      confidence: Math.floor(Math.random() * 20 + 80), // 80-99% confidence
      processingTime: "2.34 seconds",
      imageResolution: "512 x 512 px",
      featuresCount: "247 features",
      algorithmVersion: "v2.1.3",
      processingId: "LCA-" + Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase(),
      timestamp: new Date()?.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    // Simulate loading delay
    const timer = setTimeout(() => {
      setAnalysisData(mockAnalysisData);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="glass rounded-2xl p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-muted-foreground">Processing analysis results...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Diagnosis Results - LungCancer AI Detector</title>
        <meta name="description" content="View comprehensive lung cancer detection results with AI-powered analysis and confidence scoring." />
      </Helmet>
      <Header />
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full" />
        <div className="absolute top-40 right-20 w-24 h-24 border border-secondary/20 rounded-full" />
        <div className="absolute bottom-40 left-20 w-28 h-28 border border-accent/20 rounded-full" />
        <div className="absolute bottom-20 right-10 w-20 h-20 border border-success/20 rounded-full" />
      </div>
      <main className="pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Diagnosis Results
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              AI-powered lung cancer detection analysis complete. Review the comprehensive 
              diagnostic findings and confidence metrics below.
            </p>
          </motion.div>

          {/* Main Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Primary Result Card - Spans 2 columns on large screens */}
            <div className="lg:col-span-2">
              <ResultCard 
                result={analysisData?.result} 
                confidence={analysisData?.confidence} 
              />
            </div>

            {/* Confidence Score */}
            <div className="lg:col-span-1">
              <ConfidenceScore 
                score={analysisData?.confidence} 
                result={analysisData?.result} 
              />
            </div>
          </div>

          {/* Secondary Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Results Summary */}
            <ResultsSummary analysisData={analysisData} />

            {/* Action Buttons */}
            <ActionButtons analysisData={analysisData} />
          </div>

          {/* Detailed Analysis - Full Width */}
          <div className="mb-8">
            <DetailedAnalysis analysisData={analysisData} />
          </div>

          {/* Medical Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="glass rounded-2xl p-6 border-warning/20 bg-warning/5"
          >
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-1">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚠️
                </motion.div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-warning mb-2">
                  Important Medical Disclaimer
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This AI-powered analysis is designed to assist healthcare professionals and should not 
                  replace professional medical judgment. All results must be reviewed and interpreted by 
                  qualified radiologists or pulmonologists. For any concerning findings, please consult 
                  with your healthcare provider immediately. This tool is intended for educational and 
                  research purposes and should not be used as the sole basis for clinical decisions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DiagnosisResults;