// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EnterName from './pages/EnterName';
import { HeroSection } from './pages/HeroSection';
import About from './pages/About';
import AuthPage from './pages/AuthPage';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import { CustomizationProvider } from './context/CustomizationContext';
import Builder from './pages/Builder';

function App() {
  return (
    <CustomizationProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <BrowserRouter>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path="/" element={<EnterName />} />
              <Route path="/home" element={<HeroSection />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/builder" element={<Builder />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </CustomizationProvider>
  );
}

export default App;
