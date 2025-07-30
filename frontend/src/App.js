import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Components
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import LoginForm from './components/LoginForm';

// Main Portfolio Page
const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToProjects = () => {
    setActiveSection('projects');
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header activeSection={activeSection} onSectionChange={handleSectionChange} />
          
          <main>
            <section id="home">
              <HeroSection onScrollToProjects={handleScrollToProjects} />
            </section>
            
            <section id="projects">
              <ProjectsSection />
            </section>
            
            <section id="services" className="about-section">
              <ServicesSection />
            </section>
            
            <section id="contact">
              <ContactSection />
            </section>
          </main>

          {/* Footer */}
          <footer className="bg-black py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-gray-400">
                  © 2025 صبره سوفت. جميع الحقوق محفوظة.
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  تصميم وتطوير بواسطة فريق صبره سوفت
                </p>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

// Admin Route Component
const AdminRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  if (showLogin && !isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <AdminPanel onLogout={handleLogout} />;
};

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;