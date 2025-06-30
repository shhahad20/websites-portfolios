// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EnterName from './pages/EnterName';
import { HeroSection } from './pages/HeroSection';
import About from './pages/About';
import AuthPage from './pages/AuthPage';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnterName />} />
        <Route path="/home" element={<HeroSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
