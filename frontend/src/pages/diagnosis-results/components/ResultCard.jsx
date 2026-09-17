import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ResultCard = ({ result, confidence }) => {
  const isPositive = "Malignant" === window.localStorage.getItem("prediction");

  console.log(window.localStorage.getItem("prediction"))
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        relative overflow-hidden rounded-2xl p-8 glass border-2 transition-medical
        ${isPositive 
          ? 'border-error/30 bg-gradient-to-br from-error/5 to-error/10' :'border-success/30 bg-gradient-to-br from-success/5 to-success/10'
        }
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4">
          <Icon 
            name={isPositive ? "AlertTriangle" : "CheckCircle"} 
            size={120} 
            color={isPositive ? "var(--color-error)" : "var(--color-success)"} 
          />
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${isPositive ? 'bg-error/20' : 'bg-success/20'}
            `}>
              <Icon 
                name={isPositive ? "AlertTriangle" : "CheckCircle"} 
                size={24} 
                color={isPositive ? "var(--color-error)" : "var(--color-success)"} 
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground">
                Diagnosis Result
              </h3>
              <p className="text-sm text-muted-foreground/70">
                AI-Powered Analysis
              </p>
            </div>
          </div>
          
          {/* <div className="text-right">
            <div className="text-sm text-muted-foreground">Confidence</div>
            <div className={`
              text-2xl font-bold
              ${isPositive ? 'text-error' : 'text-success'}
            `}>
              {window.localStorage.getItem("confidence")}%
            </div>
          </div> */}
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`
              text-4xl md:text-5xl font-bold mb-2
              ${isPositive ? 'text-error' : 'text-success'}
            `}
          >
            {window.localStorage.getItem("prediction")}
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-muted-foreground text-lg"
          >
            {isPositive 
              ? "Potential malignant tissue detected. Immediate medical consultation recommended." :"No malignant tissue detected. Continue regular screening as advised."
            }
          </motion.p>
        </div>

        {/* Recommendation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className={`
            mt-6 p-4 rounded-lg border
            ${isPositive 
              ? 'bg-error/10 border-error/20 text-error' :'bg-success/10 border-success/20 text-success'
            }
          `}
        >
          <div className="flex items-center space-x-2">
            <Icon 
              name={isPositive ? "AlertCircle" : "Info"} 
              size={16} 
              color="currentColor" 
            />
            <span className="font-medium text-sm">
              {isPositive 
                ? "High Priority: Schedule immediate follow-up" :"Normal Result: Continue routine monitoring"
              }
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultCard;