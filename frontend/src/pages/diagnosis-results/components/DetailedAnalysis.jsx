import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const DetailedAnalysis = ({ analysisData }) => {
  const [activeTab, setActiveTab] = useState('features');

  const tabs = [
    { id: 'features', label: 'Key Features', icon: 'Target' },
    { id: 'algorithm', label: 'Algorithm Insights', icon: 'Brain' },
    { id: 'comparison', label: 'Comparative Analysis', icon: 'BarChart3' }
  ];

  const keyFeatures = [
    { name: "Nodule Density", value: "142.3 HU", status: "elevated", importance: "high" },
    { name: "Texture Heterogeneity", value: "0.847", status: "abnormal", importance: "high" },
    { name: "Edge Irregularity", value: "0.623", status: "moderate", importance: "medium" },
    { name: "Vascular Involvement", value: "Present", status: "positive", importance: "high" },
    { name: "Pleural Attachment", value: "None", status: "normal", importance: "low" },
    { name: "Calcification Pattern", value: "Absent", status: "concerning", importance: "medium" }
  ];

  const algorithmInsights = [
    {
      step: "Image Preprocessing",
      description: "Applied noise reduction and contrast enhancement using ImageNet",
      confidence: 98,
      status: "completed"
    },
    {
      step: "Feature Extraction",
      description: "Identified 508 radiological features using deep learning models (DenseNet121, LBP and GLCM)",
      confidence: 94,
      status: "completed"
    },
    {
      step: "Genetic Algorithm",
      description: "Optimized feature selection using Genetic Algorithm",
      confidence: 91,
      status: "completed"
    },
    {
      step: "Classification",
      description: "Binary classification using Deep Learning models",
      confidence: analysisData?.confidence,
      status: "completed"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'elevated': case'abnormal': case'positive': case'concerning':
        return 'text-error';
      case 'moderate':
        return 'text-warning';
      case 'normal':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getImportanceIcon = (importance) => {
    switch (importance) {
      case 'high':
        return { icon: 'AlertTriangle', color: 'var(--color-error)' };
      case 'medium':
        return { icon: 'AlertCircle', color: 'var(--color-warning)' };
      case 'low':
        return { icon: 'Info', color: 'var(--color-success)' };
      default:
        return { icon: 'Circle', color: 'var(--color-muted-foreground)' };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
          <Icon name="Microscope" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Detailed Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            In-depth diagnostic insights
          </p>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted/20 rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-medical
              ${activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'features' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {keyFeatures?.map((feature, index) => {
              const importance = getImportanceIcon(feature?.importance);
              return (
                <motion.div
                  key={feature?.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-surface/50 border border-border/20"
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={importance?.icon} 
                      size={16} 
                      color={importance?.color} 
                    />
                    <div>
                      <div className="font-medium text-foreground">
                        {feature?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {feature?.importance} importance
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${getStatusColor(feature?.status)}`}>
                      {feature?.value}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {feature?.status}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'algorithm' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {algorithmInsights?.map((step, index) => (
              <motion.div
                key={step?.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-surface/50 border border-border/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{step?.step}</h4>
                      <div className="text-sm text-success">Completed</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {step?.confidence}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Confidence
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground pl-11">
                  {step?.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'comparison' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-surface/50 border border-border/20">
                <h4 className="font-medium text-foreground mb-3">
                  Population Comparison
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Age Group (50-65)</span>
                    <span className="text-warning">Higher Risk</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gender (Male)</span>
                    <span className="text-warning">Higher Risk</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Smoking History</span>
                    <span className="text-error">Significant Risk</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-surface/50 border border-border/20">
                <h4 className="font-medium text-foreground mb-3">
                  Similar Cases
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Database Matches</span>
                    <span className="text-foreground">847 cases</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Malignant Rate</span>
                    <span className="text-error">23.4%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Early Detection</span>
                    <span className="text-success">89.2%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-start space-x-3">
                <Icon name="TrendingUp" size={16} color="var(--color-primary)" className="mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-primary mb-1">
                    Statistical Context
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    This result falls within the {analysisData?.result === 'Malignant' ? 'higher' : 'lower'} risk 
                    category based on analysis of over 50,000 similar lung imaging cases in our database.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DetailedAnalysis;