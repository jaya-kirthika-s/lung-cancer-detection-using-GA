import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

// Components
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/HeroSection';
import ProjectDescription from './components/ProjectDescription';
import AboutProjectModal from './components/AboutProjectModal';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Handle navigation to upload page
  const handleUploadClick = () => {
    navigate('/image-upload');
  };

  // Handle about modal
  const handleAboutClick = () => {
    setIsAboutModalOpen(true);
  };

  const handleCloseAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isAboutModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAboutModalOpen]);

  return (
    <>
      <Helmet>
        <title>LungCancer AI Detector - Early Detection using AI & Quantum Computing</title>
        <meta 
          name="description" 
          content="Advanced medical diagnostic platform for early lung cancer detection using image processing and quantum annealing algorithms. HIPAA-compliant, FDA-guided medical AI technology." 
        />
        <meta name="keywords" content="lung cancer detection, medical AI, quantum computing, image processing, healthcare technology, early diagnosis" />
        <meta property="og:title" content="LungCancer AI Detector - Revolutionary Medical Diagnostic Platform" />
        <meta property="og:description" content="Cutting-edge AI technology for early lung cancer detection with 94.7% accuracy rate" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated Particle Background */}
        <ParticleBackground />

        {/* Main Content */}
        <main className="relative z-10 pt-20 pb-16">
          {/* Hero Section */}
          <section className="min-h-[80vh] flex items-center justify-center">
            <HeroSection 
              onUploadClick={handleUploadClick}
              onAboutClick={handleAboutClick}
            />
          </section>

          {/* Project Description Section */}
          <section className="py-16">
            <ProjectDescription />
          </section>

          {/* Footer Section */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="relative z-10 mt-16 border-t border-border/20"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="glass-light rounded-xl p-6 border border-border/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Medical Compliance</h4>
                    <p className="text-sm text-muted-foreground">
                      HIPAA compliant • FDA guidelines • ISO 27001 certified
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Support</h4>
                    <p className="text-sm text-muted-foreground">
                      24/7 technical support • Clinical consultation • Training resources
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Research</h4>
                    <p className="text-sm text-muted-foreground">
                      Peer-reviewed • Continuously updated • Evidence-based
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border/20 text-center">
                  <p className="text-sm text-muted-foreground">
                    © {new Date()?.getFullYear()} LungCancer AI Detector. All rights reserved. 
                    <span className="mx-2">•</span>
                    For research and clinical use only.
                  </p>
                </div>
              </div>
            </div>
          </motion.footer>
        </main>

        {/* About Project Modal */}
        <AboutProjectModal 
          isOpen={isAboutModalOpen}
          onClose={handleCloseAboutModal}
        />
      </div>
    </>
  );
};

export default LandingPage;