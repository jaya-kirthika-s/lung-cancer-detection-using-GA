import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProjectDescription = () => {
  const features = [
    {
      icon: 'Brain',
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze lung images with quantum annealing optimization for enhanced accuracy.'
    },
    {
      icon: 'Zap',
      title: 'Genetic Algorithm',
      description: 'Leverages genetic algorithm techniques to solve complex optimization problems in medical image classification.'
    },
    {
      icon: 'Shield',
      title: 'Medical Grade Security',
      description: 'HIPAA-compliant data handling with end-to-end encryption ensuring patient privacy and data security.'
    },
    {
      icon: 'Target',
      title: 'Early Detection',
      description: 'Identifies potential lung cancer indicators in early stages when treatment options are most effective.'
    },
    {
      icon: 'Activity',
      title: 'Real-time Results',
      description: 'Instant processing and analysis with confidence scoring and detailed diagnostic reports.'
    },
    {
      icon: 'FileText',
      title: 'Comprehensive Reports',
      description: 'Detailed PDF reports with visual analysis, confidence metrics, and clinical recommendations.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="relative z-10 max-w-7xl mx-auto px-6 mt-16"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Advanced Medical AI Technology
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-lg text-muted-foreground max-w-3xl mx-auto"
        >
          Our cutting-edge diagnostic platform combines traditional image processing with quantum computing principles to deliver unprecedented accuracy in lung cancer detection, empowering healthcare professionals with reliable early-stage screening capabilities.
        </motion.p>
      </div>
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features?.map((feature, index) => (
          <motion.div
            key={feature?.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group glass-light rounded-xl p-6 border border-border/20 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                  <Icon 
                    name={feature?.icon} 
                    size={24} 
                    color="var(--color-primary)" 
                    strokeWidth={2} 
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature?.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Technical Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="mt-16 glass rounded-xl p-8 border border-border/20"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">Technical Specifications</h3>
          <p className="text-muted-foreground">Built with cutting-edge technology stack</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Supported Formats', value: 'JPG, PNG, DICOM', icon: 'Image' },
            { label: 'Processing Time', value: '< 30 seconds', icon: 'Clock' },
            { label: 'Accuracy Rate', value: '94.7%', icon: 'Target' },
            { label: 'Compliance', value: 'HIPAA, FDA', icon: 'Shield' }
          ]?.map((spec, index) => (
            <div key={spec?.label} className="text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mx-auto mb-3">
                <Icon name={spec?.icon} size={20} color="var(--color-accent)" strokeWidth={2} />
              </div>
              <div className="text-lg font-semibold text-foreground">{spec?.value}</div>
              <div className="text-sm text-muted-foreground">{spec?.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDescription;