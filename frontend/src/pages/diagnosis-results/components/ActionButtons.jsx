import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtons = ({ analysisData }) => {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsExporting(false);
    setExportSuccess(true);
    
    // Reset success state after 3 seconds
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const handleSaveToRecords = async () => {
    setIsSaving(true);
    
    // Simulate saving to medical records
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setSaveSuccess(true);
    
    // Reset success state after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAnalyzeAnother = () => {
    navigate('/image-upload');
  };

  const handleBackToHome = () => {
    navigate('/landing-page');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
          <Icon name="Zap" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Next Actions
          </h3>
          <p className="text-sm text-muted-foreground">
            Export results or continue analysis
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Primary Actions */}
        <div className="space-y-3">
          <Button
            variant={exportSuccess ? "success" : "default"}
            fullWidth
            loading={isExporting}
            iconName={exportSuccess ? "CheckCircle" : "Download"}
            iconPosition="left"
            onClick={handleExportPDF}
            disabled={exportSuccess}
            className="h-12"
          >
            {exportSuccess ? "PDF Exported!" : isExporting ? "Generating PDF..." : "Export PDF Report"}
          </Button>

          <Button
            variant={saveSuccess ? "success" : "outline"}
            fullWidth
            loading={isSaving}
            iconName={saveSuccess ? "CheckCircle" : "Save"}
            iconPosition="left"
            onClick={handleSaveToRecords}
            disabled={saveSuccess}
            className="h-12"
          >
            {saveSuccess ? "Saved to Records!" : isSaving ? "Saving..." : "Save to Medical Records"}
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="space-y-3">
          <Button
            variant="secondary"
            fullWidth
            iconName="Upload"
            iconPosition="left"
            onClick={handleAnalyzeAnother}
            className="h-12"
          >
            Analyze Another Image
          </Button>

          <Button
            variant="ghost"
            fullWidth
            iconName="Home"
            iconPosition="left"
            onClick={handleBackToHome}
            className="h-12"
          >
            Back to Home
          </Button>
        </div>
      </div>
      {/* Export Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="mt-6 p-4 rounded-lg bg-muted/10 border border-border/20"
      >
        <div className="flex items-start space-x-3">
          <Icon name="FileText" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Report Contents
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Complete diagnostic analysis and confidence scores</li>
              <li>• Detailed feature extraction results and algorithm insights</li>
              <li>• Medical compliance information and recommendations</li>
              <li>• Processing metadata and audit trail information</li>
            </ul>
          </div>
        </div>
      </motion.div>
      {/* Success Animations */}
      {exportSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm"
        >
          <div className="glass rounded-2xl p-8 text-center max-w-sm mx-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="CheckCircle" size={32} color="var(--color-success)" />
            </motion.div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              PDF Report Generated!
            </h3>
            <p className="text-sm text-muted-foreground">
              Your diagnostic report has been successfully generated and downloaded.
            </p>
          </div>
        </motion.div>
      )}
      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm"
        >
          <div className="glass rounded-2xl p-8 text-center max-w-sm mx-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="Save" size={32} color="var(--color-success)" />
            </motion.div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Saved to Records!
            </h3>
            <p className="text-sm text-muted-foreground">
              Analysis has been successfully saved to medical records system.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ActionButtons;