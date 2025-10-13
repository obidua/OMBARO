import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { BecomePartnerPage } from './pages/BecomePartnerPage';
import { SpaMassagePage } from './pages/SpaMassagePage';
import { BridalMakeupPage } from './pages/BridalMakeupPage';
import { BeautySalonPage } from './pages/BeautySalonPage';
import { ScrollToTop } from './components/common/ScrollToTop';
import App from './App';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/become-a-partner" element={<BecomePartnerPage />} />
        <Route path="/spa-massage" element={<SpaMassagePage />} />
        <Route path="/bridal-makeup" element={<BridalMakeupPage />} />
        <Route path="/beauty-salon" element={<BeautySalonPage />} />
        <Route path="/app/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};
