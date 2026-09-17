import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import FeatureExtraction from "./pages/feature-extraction";
import LandingPage from "./pages/landing-page";
import DiagnosisResults from "./pages/diagnosis-results";
import ImagePreprocessing from "./pages/image-preprocessing";
import ImageUpload from "./pages/image-upload";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/diagnosis" element={<DiagnosisResults />} />
          <Route path="/feature-extraction" element={<FeatureExtraction />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/diagnosis-results" element={<DiagnosisResults />} />
          <Route path="/image-preprocessing" element={<ImagePreprocessing />} />
          <Route path="/image-upload" element={<ImageUpload />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
