import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProcessingProgress = ({ currentStep, steps }) => {
  return (
    <div className="glass rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Feature Extraction Progress</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Processing completed</span>
        </div>
      </div>
      {/* Desktop Progress */}
      <div className="hidden lg:flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center space-y-3">
              <motion.div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-2 transition-medical
                  ${index <= currentStep 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-muted/20 border-border text-muted-foreground'
                  }
                `}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {index < currentStep ? (
                  <Icon name="Check" size={20} strokeWidth={2.5} />
                ) : index === currentStep ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon name="Loader2" size={20} strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <Icon name={step?.icon} size={20} strokeWidth={2} />
                )}
              </motion.div>
              
              <div className="text-center">
                <div className={`text-sm font-medium ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {step?.description}
                </div>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className="flex-1 mx-4">
                <motion.div
                  className={`h-0.5 rounded-full transition-medical ${
                    index < currentStep ? 'bg-primary' : 'bg-border'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: index < currentStep ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Mobile Progress */}
      <div className="lg:hidden space-y-4">
        {steps?.map((step, index) => (
          <motion.div
            key={step?.id}
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center border-2 transition-medical flex-shrink-0
              ${index <= currentStep 
                ? 'bg-primary border-primary text-primary-foreground' 
                : 'bg-muted/20 border-border text-muted-foreground'
              }
            `}>
              {index < currentStep ? (
                <Icon name="Check" size={16} strokeWidth={2.5} />
              ) : index === currentStep ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Icon name="Loader2" size={16} strokeWidth={2.5} />
                </motion.div>
              ) : (
                <Icon name={step?.icon} size={16} strokeWidth={2} />
              )}
            </div>
            
            <div className="flex-1">
              <div className={`font-medium ${
                index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step?.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {step?.description}
              </div>
            </div>
            
            {index <= currentStep && (
              <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessingProgress;