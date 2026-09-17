import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProcessingStepCard = ({ 
  title, 
  description, 
  status, 
  progress, 
  icon, 
  isActive, 
  isCompleted,
  processingTime,
  technicalDetails 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'processing':
        return 'text-primary';
      case 'pending':
        return 'text-muted-foreground';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'processing':
        return 'Loader';
      case 'pending':
        return 'Clock';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        glass rounded-xl p-6 border transition-medical
        ${isActive ? 'border-primary/50 shadow-lg shadow-primary/20' : 'border-border/20'}
        ${isCompleted ? 'border-success/30' : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`
            w-10 h-10 rounded-lg flex items-center justify-center transition-medical
            ${isActive ? 'bg-primary/20 border border-primary/30' : 
              isCompleted ? 'bg-success/20 border border-success/30': 'bg-muted/20 border border-border/20'}
          `}>
            <Icon 
              name={icon} 
              size={20} 
              color={isActive ? 'var(--color-primary)' : 
                     isCompleted ? 'var(--color-success)': 'var(--color-muted-foreground)'} 
              className={status === 'processing' ? 'animate-spin' : ''}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon 
            name={getStatusIcon()} 
            size={16} 
            color={getStatusColor()?.replace('text-', 'var(--color-')} 
            className={status === 'processing' ? 'animate-spin' : ''}
          />
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
          </span>
        </div>
      </div>
      {/* Progress Bar */}
      {(status === 'processing' || status === 'completed') && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-foreground">{progress}%</span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`
                h-full rounded-full transition-medical
                ${status === 'completed' ? 'bg-success' : 'bg-primary'}
              `}
            />
          </div>
        </div>
      )}
      {/* Processing Time */}
      {processingTime && (
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">
            Processing time: {processingTime}
          </span>
        </div>
      )}
      {/* Technical Details */}
      {technicalDetails && technicalDetails?.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground mb-2">Technical Details</h4>
          {technicalDetails?.map((detail, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{detail?.label}:</span>
              <span className="text-foreground font-mono">{detail?.value}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProcessingStepCard;