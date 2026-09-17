import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProcessingStepper = ({ currentStep, steps, onStepClick }) => {
  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'active') return step?.activeIcon || step?.icon;
    return step?.icon;
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'var(--color-success)';
      case 'active':
        return 'var(--color-primary)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Stepper */}
      <div className="hidden md:block">
        <div className="glass rounded-xl p-6 border border-border/20">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-muted/30 -z-10 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ 
                  width: `${steps?.length > 1 ? (Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100 : 0}%` 
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-primary rounded-full"
              />
            </div>

            {steps?.map((step, index) => {
              const status = getStepStatus(index);
              const isClickable = index <= currentStep;

              return (
                <motion.div
                  key={step?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center space-y-3 relative z-10"
                >
                  {/* Step Circle */}
                  <button
                    onClick={() => isClickable && onStepClick?.(index)}
                    disabled={!isClickable}
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-medical
                      ${status === 'completed' 
                        ? 'bg-success text-success-foreground shadow-lg shadow-success/20' 
                        : status === 'active' ?'bg-primary text-primary-foreground shadow-lg shadow-primary/20 animate-pulse' :'bg-muted/20 text-muted-foreground border border-border/30'
                      }
                      ${isClickable ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}
                    `}
                  >
                    <Icon 
                      name={getStepIcon(step, status)} 
                      size={20} 
                      color="currentColor"
                      className={status === 'active' && step?.activeIcon === 'Loader' ? 'animate-spin' : ''}
                    />
                  </button>
                  {/* Step Label */}
                  <div className="text-center max-w-24">
                    <h3 className={`
                      text-sm font-medium
                      ${status === 'active' ? 'text-primary' : 
                        status === 'completed'? 'text-success' : 'text-muted-foreground'}
                    `}>
                      {step?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {step?.subtitle}
                    </p>
                  </div>
                  {/* Active Step Indicator */}
                  {status === 'active' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-2 w-2 h-2 bg-primary rounded-full"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Mobile Stepper */}
      <div className="md:hidden">
        <div className="glass rounded-xl p-4 border border-border/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Processing Steps</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps?.length}
              </span>
              <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(((currentStep + 1) / steps?.length) * 100, 100)}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Current Step Display */}
          <div className="flex items-center space-x-4">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${getStepStatus(currentStep) === 'active' ?'bg-primary text-primary-foreground shadow-lg shadow-primary/20' :'bg-success text-success-foreground shadow-lg shadow-success/20'
              }
            `}>
              <Icon 
                name={getStepIcon(steps?.[currentStep], getStepStatus(currentStep))} 
                size={20} 
                color="currentColor"
                className={steps?.[currentStep]?.activeIcon === 'Loader' ? 'animate-spin' : ''}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-foreground">
                {steps?.[currentStep]?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {steps?.[currentStep]?.subtitle}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {steps?.[currentStep]?.description}
              </p>
            </div>
          </div>

          {/* Mini Steps Indicator */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            {steps?.map((_, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-medical
                  ${index <= currentStep ? 'bg-primary' : 'bg-muted/30'}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStepper;