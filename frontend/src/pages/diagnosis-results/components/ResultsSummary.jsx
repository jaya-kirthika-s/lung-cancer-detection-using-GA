import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ResultsSummary = ({ analysisData }) => {
  const summaryItems = [
    {
      label: "Processing Time",
      value: analysisData?.processingTime,
      icon: "Clock",
      color: "text-primary"
    },
    {
      label: "Image Resolution",
      value: analysisData?.imageResolution,
      icon: "Image",
      color: "text-secondary"
    },
    {
      label: "Features Analyzed",
      value: analysisData?.featuresCount,
      icon: "Brain",
      color: "text-accent"
    },
    {
      label: "Algorithm Version",
      value: analysisData?.algorithmVersion,
      icon: "Cpu",
      color: "text-success"
    },
    {
      label: "Processing ID",
      value: analysisData?.processingId,
      icon: "Hash",
      color: "text-warning"
    },
    {
      label: "Timestamp",
      value: analysisData?.timestamp,
      icon: "Calendar",
      color: "text-muted-foreground"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon name="FileText" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Analysis Summary
          </h3>
          <p className="text-sm text-muted-foreground">
            Detailed processing information
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summaryItems?.map((item, index) => (
          <motion.div
            key={item?.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            className="flex items-center space-x-3 p-3 rounded-lg bg-surface/50 border border-border/20"
          >
            <div className={`w-8 h-8 rounded-md bg-muted/20 flex items-center justify-center`}>
              <Icon 
                name={item?.icon} 
                size={16} 
                color={`var(--color-primary)`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-muted-foreground">
                {item?.label}
              </div>
              <div className="text-sm font-medium text-foreground truncate">
                {item?.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Medical Compliance Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20"
      >
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">
              Medical Compliance
            </h4>
            <p className="text-xs text-muted-foreground">
              This analysis follows FDA guidelines for AI-assisted medical imaging. 
              Results should be reviewed by qualified healthcare professionals before making clinical decisions.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsSummary;