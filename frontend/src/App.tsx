// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnterName from "./pages/EnterName";
import { HeroSection } from "./pages/HeroSection";
import About from "./pages/About";
import AuthPage from "./pages/AuthPage";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import CustomizationLayout from "./context/CustomizationContext";
import Builder from "./pages/Builder";
import ConfirmEmailSent from "./pages/ConfirmEmail";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route element={<CustomizationLayout />}>
              <Route path="/" element={<EnterName />} />
              {/* <Route path="/home" element={<HeroSection />} /> */}
              <Route path="/:ownerName" element={<HeroSection />} />
              <Route path="/builder" element={<Builder />} />
            </Route>

            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/confirmed" element={<ConfirmEmailSent />} />

            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
