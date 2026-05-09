import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Works from "./pages/Works"
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <HashRouter>

    <Navbar />

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/works" element={<Works />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/services" element={<Services />} />
      
      <Route path="/admin" element={<AdminLogin />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />

    </Routes>

    </HashRouter>
  );
}

export default App;
