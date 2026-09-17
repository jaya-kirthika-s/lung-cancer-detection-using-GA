import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const UploadInstructions = () => {
  const instructions = [
    {
      icon: 'FileImage',
      title: 'Medical Image Formats',
      description: 'Upload lung X-rays, CT scans, or MRI images in JPG, PNG, or DICOM format',
      color: 'var(--color-primary)'
    },
    {
      icon: 'Shield',
      title: 'Secure Processing',
      description: 'Your medical data is processed securely with end-to-end encryption',
      color: 'var(--color-success)'
    },
    {
      icon: 'Zap',
      title: 'AI-Powered Analysis',
      description: 'Advanced quantum annealing algorithms provide accurate cancer detection',
      color: 'var(--color-accent)'
    },
    {
      icon: 'Clock',
      title: 'Fast Results',
      description: 'Get comprehensive analysis results within minutes of upload',
      color: 'var(--color-secondary)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-foreground mb-3"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-muted-foreground max-w-2xl mx-auto"
        >
          Our AI-powered system analyzes medical images using advanced genetic algorithm techniques 
          to provide accurate lung cancer detection with high confidence scores.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {instructions?.map((instruction, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            className="glass rounded-xl p-6 border border-border/20 hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${instruction?.color}20` }}
              >
                <Icon 
                  name={instruction?.icon} 
                  size={24} 
                  color={instruction?.color} 
                  strokeWidth={2}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-lg">
                  {instruction?.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {instruction?.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Technical Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 glass rounded-xl p-6 border border-border/20"
      >
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Info" size={20} color="var(--color-primary)" />
            <h3 className="font-semibold text-foreground">Technical Specifications</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Supported Formats</p>
              <p className="font-medium text-foreground">JPG, PNG, DICOM</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Maximum File Size</p>
              <p className="font-medium text-foreground">50 MB</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Processing Time</p>
              <p className="font-medium text-foreground">2-5 minutes</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UploadInstructions;