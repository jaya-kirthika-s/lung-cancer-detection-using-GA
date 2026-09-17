import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ImagePreview = ({ file, onRemove, onProcess, isProcessing }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'dcm':
        return 'FileImage';
      case 'jpg': case'jpeg': case'png':
        return 'Image';
      default:
        return 'File';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {/* Image Preview */}
      <div className="glass rounded-2xl overflow-hidden border border-border/20">
        <div className="aspect-video bg-muted/20 relative overflow-hidden">
          {file?.type?.startsWith('image/') ? (
            <Image
              src={URL.createObjectURL(file)}
              alt="Medical image preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name={getFileIcon(file?.name)} size={40} color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">DICOM File</h3>
                  <p className="text-muted-foreground">Medical imaging format detected</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
        </div>
      </div>
      {/* File Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl p-6 border border-border/20"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon name={getFileIcon(file?.name)} size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground truncate max-w-xs">
                  {file?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file?.size)} • {file?.type || 'Unknown format'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">File Type</p>
                <p className="font-medium text-foreground">
                  {file?.name?.split('.')?.pop()?.toUpperCase()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Upload Time</p>
                <p className="font-medium text-foreground">
                  {new Date()?.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="text-muted-foreground hover:text-error"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      </motion.div>
      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button
          variant="outline"
          size="lg"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={onRemove}
          disabled={isProcessing}
          className="sm:w-auto w-full"
        >
          Choose Different Image
        </Button>
        
        <Button
          variant="default"
          size="lg"
          iconName="Play"
          iconPosition="left"
          onClick={onProcess}
          loading={isProcessing}
          disabled={isProcessing}
          className="sm:w-auto w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          {isProcessing ? 'Processing...' : 'Process Image'}
        </Button>
      </motion.div>
      {/* Processing Status */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-xl p-6 border border-primary/30 bg-primary/5"
        >
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <Icon name="Loader2" size={20} color="var(--color-primary)" />
            </motion.div>
            <div>
              <h4 className="font-semibold text-foreground">Initializing AI Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Preparing your image for quantum-enhanced processing...
              </p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 w-full bg-muted/20 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImagePreview;