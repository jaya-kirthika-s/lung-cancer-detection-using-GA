import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageComparisonPanel = ({ 
  originalImage, 
  segmentedImage, 
  grayscaleImage, 
  currentStep,
  onImageSelect 
}) => {
  const [selectedImage, setSelectedImage] = useState('original');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const imageTypes = [
    {
      id: 'original',
      label: 'Original',
      image: originalImage,
      description: 'Raw medical scan input',
      icon: 'FileImage',
      available: true
    },
    {
      id: 'segmented',
      label: 'Segmented Lung',
      image: segmentedImage,
      description: 'Lung region isolation',
      icon: 'Scissors',
      available: currentStep >= 1
    },
    {
      id: 'grayscale',
      label: 'Grayscale',
      image: grayscaleImage,
      description: 'Processed for analysis',
      icon: 'Palette',
      available: currentStep >= 2
    }
  ];

  const handleImageSelect = (imageType) => {
    if (imageType?.available) {
      setSelectedImage(imageType?.id);
      onImageSelect?.(imageType?.id);
    }
  };

  const getCurrentImage = () => {
    const current = imageTypes?.find(img => img?.id === selectedImage);
    return current?.image || originalImage;
  };

  const getCurrentImageData = () => {
    return imageTypes?.find(img => img?.id === selectedImage);
  };

  return (
    <div className="space-y-6">
      {/* Image Type Selector - Desktop */}
      <div className="hidden md:flex items-center justify-center space-x-4">
        {imageTypes?.map((imageType) => (
          <Button
            key={imageType?.id}
            variant={selectedImage === imageType?.id ? "default" : "outline"}
            size="sm"
            iconName={imageType?.icon}
            iconPosition="left"
            disabled={!imageType?.available}
            onClick={() => handleImageSelect(imageType)}
            className={`
              transition-medical
              ${!imageType?.available ? 'opacity-50 cursor-not-allowed' : ''}
              ${selectedImage === imageType?.id ? 'shadow-lg shadow-primary/20' : ''}
            `}
          >
            {imageType?.label}
          </Button>
        ))}
      </div>
      {/* Main Image Display */}
      <div className="relative">
        <motion.div
          layout
          className="glass rounded-xl overflow-hidden border border-border/20"
        >
          {/* Image Container */}
          <div className="relative aspect-square bg-muted/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={getCurrentImage()}
                  alt={`${getCurrentImageData()?.label} medical scan`}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Image Controls Overlay */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(true)}
                className="glass-light"
              >
                <Icon name="Maximize" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-light"
              >
                <Icon name="Download" size={16} />
              </Button>
            </div>

            {/* Processing Indicator */}
            {!getCurrentImageData()?.available && (
              <div className="absolute inset-0 flex items-center justify-center glass-light">
                <div className="text-center">
                  <Icon 
                    name="Loader" 
                    size={32} 
                    color="var(--color-primary)" 
                    className="animate-spin mx-auto mb-2" 
                  />
                  <p className="text-sm text-muted-foreground">Processing...</p>
                </div>
              </div>
            )}
          </div>

          {/* Image Info Footer */}
          <div className="p-4 border-t border-border/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  ${getCurrentImageData()?.available ? 'bg-primary/20' : 'bg-muted/20'}
                `}>
                  <Icon 
                    name={getCurrentImageData()?.icon || 'FileImage'} 
                    size={16} 
                    color={getCurrentImageData()?.available ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    {getCurrentImageData()?.label}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {getCurrentImageData()?.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Info" size={12} />
                <span>1024x1024px</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Mobile Image Type Selector */}
      <div className="md:hidden">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {imageTypes?.map((imageType) => (
            <button
              key={imageType?.id}
              onClick={() => handleImageSelect(imageType)}
              disabled={!imageType?.available}
              className={`
                flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg transition-medical
                ${selectedImage === imageType?.id 
                  ? 'bg-primary text-primary-foreground' 
                  : imageType?.available 
                    ? 'glass-light text-foreground hover:bg-muted/20' 
                    : 'glass-light text-muted-foreground/50 cursor-not-allowed'
                }
              `}
            >
              <Icon 
                name={imageType?.icon} 
                size={16} 
                color="currentColor" 
              />
              <span className="text-sm font-medium whitespace-nowrap">
                {imageType?.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e?.stopPropagation()}
            >
              <div className="glass rounded-xl overflow-hidden">
                <Image
                  src={getCurrentImage()}
                  alt={`${getCurrentImageData()?.label} medical scan - fullscreen`}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 glass-light"
              >
                <Icon name="X" size={20} />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageComparisonPanel;