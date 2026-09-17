import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProcessingMetrics = ({ metrics, isProcessing }) => {
  const formatValue = (value, type) => {
    switch (type) {
      case 'percentage':
        return `${value}%`;
      case 'time':
        return `${value}s`;
      case 'size':
        return `${value}KB`;
      case 'pixels':
        return `${value}px`;
      default:
        return value;
    }
  };

  const getMetricIcon = (category) => {
    switch (category) {
      case 'performance':
        return 'Zap';
      case 'quality':
        return 'Star';
      case 'processing':
        return 'Cpu';
      case 'analysis':
        return 'BarChart3';
      default:
        return 'Info';
    }
  };

  const getMetricColor = (category) => {
    switch (category) {
      case 'performance':
        return 'text-accent';
      case 'quality':
        return 'text-warning';
      case 'processing':
        return 'text-primary';
      case 'analysis':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Processing Metrics</h2>
        {isProcessing && (
          <div className="flex items-center space-x-2 text-primary">
            <Icon name="Activity" size={16} className="animate-pulse" />
            <span className="text-sm font-medium">Live Monitoring</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics?.map((metric, index) => (
          <motion.div
            key={metric?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-4 border border-border/20 hover:border-primary/30 transition-medical"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  ${metric?.category === 'performance' ? 'bg-accent/20' :
                    metric?.category === 'quality' ? 'bg-warning/20' :
                    metric?.category === 'processing'? 'bg-primary/20' : 'bg-secondary/20'}
                `}>
                  <Icon 
                    name={getMetricIcon(metric?.category)} 
                    size={16} 
                    color={getMetricColor(metric?.category)?.replace('text-', 'var(--color-')} 
                  />
                </div>
                <h3 className="text-sm font-medium text-foreground">{metric?.label}</h3>
              </div>
              
              {metric?.trend && (
                <Icon 
                  name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                  color={metric?.trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'} 
                />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-foreground">
                  {formatValue(metric?.value, metric?.type)}
                </span>
                {metric?.unit && (
                  <span className="text-xs text-muted-foreground">{metric?.unit}</span>
                )}
              </div>

              {metric?.description && (
                <p className="text-xs text-muted-foreground">{metric?.description}</p>
              )}

              {metric?.progress !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">{metric?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric?.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`
                        h-full rounded-full
                        ${metric?.category === 'performance' ? 'bg-accent' :
                          metric?.category === 'quality' ? 'bg-warning' :
                          metric?.category === 'processing'? 'bg-primary' : 'bg-secondary'}
                      `}
                    />
                  </div>
                </div>
              )}

              {metric?.subMetrics && (
                <div className="space-y-1 pt-2 border-t border-border/20">
                  {metric?.subMetrics?.map((subMetric, subIndex) => (
                    <div key={subIndex} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{subMetric?.label}:</span>
                      <span className="text-foreground font-mono">
                        {formatValue(subMetric?.value, subMetric?.type)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isProcessing && metric?.isLive && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {/* Real-time Processing Status */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-xl p-4 border border-primary/30"
        >
          <div className="flex items-center space-x-3">
            <Icon name="Loader" size={20} color="var(--color-primary)" className="animate-spin" />
            <div>
              <h3 className="text-sm font-medium text-foreground">Real-time Processing</h3>
              <p className="text-xs text-muted-foreground">
                Metrics are updating automatically as processing continues
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProcessingMetrics;