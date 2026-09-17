import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SummaryStats = ({ stats }) => {
  const statCards = [
    {
      id: 'total',
      title: 'Total Features',
      value: stats?.totalFeatures,
      icon: 'Database',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Extracted features'
    },
    {
      id: 'confidence',
      title: 'Processing Confidence',
      value: `${stats?.processingConfidence}%`,
      icon: 'Target',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Algorithm accuracy'
    },
    {
      id: 'performance',
      title: 'Algorithm Performance',
      value: `${stats?.algorithmPerformance}ms`,
      icon: 'Zap',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Processing time'
    },
    {
      id: 'significance',
      title: 'High Significance',
      value: stats?.highSignificanceCount,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      description: 'Critical features'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {statCards?.map((card, index) => (
        <motion.div
          key={card?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="glass rounded-xl p-6 hover:scale-[1.02] transition-medical group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${card?.bgColor} flex items-center justify-center group-hover:scale-110 transition-medical`}>
              <Icon 
                name={card?.icon} 
                size={24} 
                className={card?.color} 
                strokeWidth={2.5}
              />
            </div>
            <div className="text-right">
              <motion.div 
                className="text-2xl lg:text-3xl font-bold text-foreground"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                {card?.value}
              </motion.div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-medical">
              {card?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {card?.description}
            </p>
          </div>

          {/* Progress indicator for confidence */}
          {card?.id === 'confidence' && (
            <div className="mt-4">
              <div className="w-full bg-muted/20 rounded-full h-2">
                <motion.div
                  className="bg-success h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats?.processingConfidence}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Performance indicator */}
          {card?.id === 'performance' && (
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5]?.map((dot, dotIndex) => (
                    <motion.div
                      key={dot}
                      className={`w-2 h-2 rounded-full ${
                        stats?.algorithmPerformance < 1000 ? 'bg-success' :
                        stats?.algorithmPerformance < 2000 ? 'bg-warning' : 'bg-error'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: dotIndex < 4 ? 1 : 0.5 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.5 + dotIndex * 0.1 }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {stats?.algorithmPerformance < 1000 ? 'Excellent' :
                   stats?.algorithmPerformance < 2000 ? 'Good' : 'Average'}
                </span>
              </div>
            </div>
          )}

          {/* Significance breakdown */}
          {card?.id === 'significance' && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">High</span>
                <span className="text-error font-medium">{stats?.highSignificanceCount}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Medium</span>
                <span className="text-warning font-medium">{stats?.mediumSignificanceCount}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Low</span>
                <span className="text-success font-medium">{stats?.lowSignificanceCount}</span>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryStats;