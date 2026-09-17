import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const HeroSection = ({ onUploadClick, onAboutClick }) => {
  return (
    <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="glass rounded-2xl p-8 md:p-12 border border-primary/20 shadow-xl">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="relative">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Icon name="Brain" size={32} color="white" strokeWidth={2} />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-pulse">
                <Icon name="Zap" size={16} color="var(--color-accent-foreground)" strokeWidth={3} />
              </div>
            </div>
          </motion.div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Early Detection
            </span>
            <br />
            <span className="text-foreground">of Lung Cancer</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-2"
          >
            using Image Processing & Genetic Algorithm
          </motion.p>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto max-w-md"
          />
        </div>
      </motion.div>
      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <motion.button
          onClick={onUploadClick}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative glass-light rounded-xl px-8 py-4 border border-primary/30 hover:border-primary/60 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Icon name="Upload" size={20} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <div className="text-left">
              <div className="text-lg font-semibold text-foreground">Upload Image</div>
              <div className="text-sm text-muted-foreground">Start diagnosis</div>
            </div>
          </div>
        </motion.button>

        <motion.button
          onClick={onAboutClick}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative glass-light rounded-xl px-8 py-4 border border-secondary/30 hover:border-secondary/60 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
              <Icon name="Info" size={20} color="var(--color-secondary)" strokeWidth={2} />
            </div>
            <div className="text-left">
              <div className="text-lg font-semibold text-foreground">About Project</div>
              <div className="text-sm text-muted-foreground">Learn more</div>
            </div>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroSection;