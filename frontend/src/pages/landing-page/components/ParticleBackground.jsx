import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ParticleBackground = () => {
  const containerRef = useRef(null);

  const medicalIcons = [
    'Stethoscope', 'Heart', 'Activity', 'Brain', 'Zap', 'Shield', 
    'Target', 'Microscope', 'Pill', 'Cross', 'Plus', 'Search'
  ];

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    icon: medicalIcons?.[i % medicalIcons?.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 12,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1
  }));

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles?.map((particle) => (
        <motion.div
          key={particle?.id}
          className="absolute"
          initial={{ 
            x: `${particle?.x}vw`, 
            y: `${particle?.y}vh`,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: [`${particle?.x}vw`, `${(particle?.x + 20) % 100}vw`, `${particle?.x}vw`],
            y: [`${particle?.y}vh`, `${(particle?.y + 15) % 100}vh`, `${particle?.y}vh`],
            opacity: [0, particle?.opacity, 0],
            scale: [0, 1, 0],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: particle?.duration,
            delay: particle?.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm" />
            <Icon 
              name={particle?.icon} 
              size={particle?.size} 
              color="var(--color-primary)" 
              strokeWidth={1.5}
              className="relative z-10"
            />
          </div>
        </motion.div>
      ))}
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
    </div>
  );
};

export default ParticleBackground;