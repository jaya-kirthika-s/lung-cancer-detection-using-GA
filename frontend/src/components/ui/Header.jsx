import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const workflowSteps = [
    { path: '/', label: 'Home', icon: 'Home' },
    { path: '/image-upload', label: 'Upload', icon: 'Upload' },
    { path: '/image-preprocessing', label: 'Processing', icon: 'Settings' },
    { path: '/feature-extraction', label: 'Analysis', icon: 'Brain' },
    { path: '/diagnosis-results', label: 'Results', icon: 'FileText' }
  ];

  const currentStepIndex = workflowSteps?.findIndex(step => step?.path === location?.pathname);
  const isWorkflowActive = currentStepIndex !== -1;

  const handleStepClick = (step, index) => {
    if (index <= currentStepIndex || step?.path === '/landing-page') {
      navigate(step?.path);
    }
  };

  const handleLogoClick = () => {
    navigate('/landing-page');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div 
          className="flex items-center space-x-3 cursor-pointer transition-medical hover-scale"
          onClick={handleLogoClick}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
              <Icon name="Stethoscope" size={24} color="white" strokeWidth={2.5} />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Zap" size={10} color="var(--color-accent-foreground)" strokeWidth={3} />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-foreground">LungCancer AI</h1>
            <p className="text-xs text-muted-foreground -mt-1">Detector</p>
          </div>
        </div>

        {/* Workflow Progress Stepper - Desktop */}
        {isWorkflowActive && (
          <div className="hidden lg:flex items-center space-x-1 glass-light rounded-lg p-2">
            {workflowSteps?.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isAccessible = index <= currentStepIndex || step?.path === '/landing-page';

              return (
                <React.Fragment key={step?.path}>
                  <button
                    onClick={() => handleStepClick(step, index)}
                    disabled={!isAccessible}
                    className={`
                      flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-medical
                      ${isCurrent 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : isCompleted 
                          ? 'text-success hover:bg-success/10 cursor-pointer' 
                          : isAccessible
                            ? 'text-muted-foreground hover:bg-muted/10 cursor-pointer'
                            : 'text-muted-foreground/50 cursor-not-allowed'
                      }
                    `}
                  >
                    <Icon 
                      name={step?.icon} 
                      size={16} 
                      color={isCurrent ? 'currentColor' : isCompleted ? 'var(--color-success)' : 'currentColor'} 
                    />
                    <span className="hidden xl:inline">{step?.label}</span>
                  </button>
                  {index < workflowSteps?.length - 1 && (
                    <div className="w-8 h-px bg-border/30 mx-1" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Mobile Workflow Indicator */}
        {isWorkflowActive && (
          <div className="lg:hidden flex items-center space-x-2 glass-light rounded-lg px-3 py-2">
            <Icon name={workflowSteps?.[currentStepIndex]?.icon} size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-foreground">
              {currentStepIndex + 1}/{workflowSteps?.length}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Results Export - Only show on results page */}
          {location?.pathname === '/diagnosis-results' && (
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Export PDF
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>

          {/* Desktop Secondary Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="HelpCircle"
              iconPosition="left"
              onClick={() => {/* Handle help */}}
            >
              Help
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              onClick={() => {/* Handle settings */}}
            >
              Settings
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-light border-t border-border/20 animate-slide-in">
          <div className="px-6 py-4 space-y-3">
            {/* Mobile Workflow Steps */}
            {isWorkflowActive && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Diagnostic Workflow
                </h3>
                {workflowSteps?.map((step, index) => {
                  const isCompleted = index < currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const isAccessible = index <= currentStepIndex || step?.path === '/landing-page';

                  return (
                    <button
                      key={step?.path}
                      onClick={() => {
                        handleStepClick(step, index);
                        setIsMobileMenuOpen(false);
                      }}
                      disabled={!isAccessible}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-medical
                        ${isCurrent 
                          ? 'bg-primary text-primary-foreground' 
                          : isCompleted 
                            ? 'text-success hover:bg-success/10' 
                            : isAccessible
                              ? 'text-foreground hover:bg-muted/10'
                              : 'text-muted-foreground/50 cursor-not-allowed'
                        }
                      `}
                    >
                      <Icon 
                        name={step?.icon} 
                        size={18} 
                        color={isCurrent ? 'currentColor' : isCompleted ? 'var(--color-success)' : 'currentColor'} 
                      />
                      <span className="font-medium">{step?.label}</span>
                      {isCurrent && (
                        <div className="ml-auto w-2 h-2 bg-accent rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Mobile Actions */}
            <div className="pt-3 border-t border-border/20 space-y-2">
              {location?.pathname === '/diagnosis-results' && (
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Export PDF Report
                </Button>
              )}
              <Button
                variant="ghost"
                fullWidth
                iconName="HelpCircle"
                iconPosition="left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Help & Support
              </Button>
              <Button
                variant="ghost"
                fullWidth
                iconName="Settings"
                iconPosition="left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;