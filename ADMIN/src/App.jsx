import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer"; // ✅ Import Footer
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";


const App = () => {
  return (
    <>
      <Toaster position="top-right" />
    
        <Navbar />
     
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
        
          </Routes>
     
        <Footer />   {/* ✅ Add footer here */}
        
 
    </>
  );
};

export default App;
