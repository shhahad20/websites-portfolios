// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeroSection } from './pages/HeroSection';
import About from './pages/About';
import AuthPage from './pages/AuthPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
