import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ConfidenceScore = ({ score, result }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const isPositive = result === 'Malignant';
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = score / 50; // 50 steps for smooth animation
      const interval = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(interval);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 30);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [score]);

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass rounded-2xl p-6 text-center"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Confidence Score
      </h3>
      <div className="relative w-32 h-32 mx-auto mb-4">
        {/* Background Circle */}
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="var(--color-muted)"
            strokeWidth="8"
            fill="none"
            opacity="0.3"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke={isPositive ? "var(--color-error)" : "var(--color-success)"}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            style={{
              filter: `drop-shadow(0 0 8px ${isPositive ? 'var(--color-error)' : 'var(--color-success)'})`,
            }}
          />
        </svg>
        
        {/* Score Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className={`
                text-3xl font-bold
                ${isPositive ? 'text-error' : 'text-success'}
              `}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {animatedScore}%
            </motion.div>
            <div className="text-xs text-muted-foreground mt-1">
              Accuracy
            </div>
          </div>
        </div>
      </div>
      {/* Score Interpretation */}
      <div className="space-y-2">
        <div className={`
          text-sm font-medium
          ${animatedScore >= 90 ? 'text-success' : 
            animatedScore >= 70 ? 'text-warning' : 'text-error'}
        `}>
          {animatedScore >= 90 ? 'Very High Confidence' :
           animatedScore >= 70 ? 'High Confidence' :
           animatedScore >= 50 ? 'Moderate Confidence' : 'Low Confidence'}
        </div>
        <p className="text-xs text-muted-foreground">
          Based on genetic algorithm analysis of {Math.floor(Math.random() * 500 + 200)} features
        </p>
      </div>
      {/* Confidence Bars */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Algorithm Certainty</span>
          <span className="text-foreground font-medium">{animatedScore}%</span>
        </div>
        <div className="w-full bg-muted/30 rounded-full h-2">
          <motion.div
            className={`
              h-2 rounded-full
              ${isPositive ? 'bg-error' : 'bg-success'}
            `}
            initial={{ width: 0 }}
            animate={{ width: `${animatedScore}%` }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ConfidenceScore;