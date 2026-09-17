import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFileSelect, selectedFile, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const supportedFormats = ['.jpg', '.jpeg', '.png', '.dcm'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const validateFile = (file) => {
    const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
    
    if (!supportedFormats?.includes(fileExtension)) {
      return `Unsupported file format. Please upload ${supportedFormats?.join(', ')} files only.`;
    }
    
    if (file?.size > maxFileSize) {
      return 'File size too large. Please upload files smaller than 50MB.';
    }
    
    return null;
  };

  const handleFileSelection = (file) => {
    setUploadError('');
    const error = validateFile(file);
    
    if (error) {
      setUploadError(error);
      return;
    }
    
    onFileSelect(file);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    if (files?.length > 0) {
      handleFileSelection(files?.[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e?.target?.files);
    if (files?.length > 0) {
      handleFileSelection(files?.[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className={`
          relative glass rounded-2xl border-2 border-dashed transition-all duration-300
          ${isDragOver 
            ? 'border-accent shadow-lg shadow-accent/20 bg-accent/5' 
            : selectedFile 
              ? 'border-success shadow-lg shadow-success/20 bg-success/5'
              : 'border-border/40 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10'
          }
          ${isUploading ? 'pointer-events-none opacity-75' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-12 text-center">
          <AnimatePresence mode="wait">
            {isUploading ? (
              <motion.div
                key="uploading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon name="Loader2" size={32} color="var(--color-primary)" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Processing Upload...</h3>
                  <p className="text-muted-foreground">Please wait while we validate your image</p>
                </div>
              </motion.div>
            ) : selectedFile ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                  <Icon name="CheckCircle" size={32} color="var(--color-success)" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-success">Upload Successful!</h3>
                  <p className="text-muted-foreground">Your medical image is ready for processing</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Icon name="Upload" size={40} color="var(--color-primary)" strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    Upload Medical Image
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Drag and drop your lung image here, or click to browse files
                  </p>
                </div>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="FolderOpen"
                    iconPosition="left"
                    onClick={handleBrowseClick}
                    className="mx-auto"
                  >
                    Browse Files
                  </Button>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Supported formats: JPG, PNG, DICOM (.dcm)</p>
                    <p>Maximum file size: 50MB</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Drag overlay */}
        <AnimatePresence>
          {isDragOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-accent/10 rounded-2xl flex items-center justify-center backdrop-blur-sm"
            >
              <div className="text-center space-y-2">
                <Icon name="Download" size={48} color="var(--color-accent)" />
                <p className="text-lg font-semibold text-accent">Drop image here</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Error Message */}
      <AnimatePresence>
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 glass rounded-lg border border-error/30 bg-error/5"
          >
            <div className="flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" />
              <p className="text-error font-medium">{uploadError}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={supportedFormats?.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default UploadZone;