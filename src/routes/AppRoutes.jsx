import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Public Pages
import LandingPage from "../pages/Landingpage";
import Home from "../pages/Home";
import Register from "../pages/register";
import Login from "../pages/login";
import Donate from "../pages/Donate";
import RequestBlood from "../pages/RequestBlood";
import AboutUs from "../pages/aboutus";
import FindDonor from "../pages/findDonor";
import Contact from "../pages/contactus";
import BloodDrive from "../pages/blooddrive";

// Layout Components
import Navbar from "../components/navbar";
import Footer from "../components/footer";

// Admin Pages
import AdminLoginPage from "../admin_dashboard/components/AdminLoginPage.jsx";
import AdminDashboard from "../admin_dashboard/adminDashboardPage.jsx";
import Profile from "../components/profile";

const AppContent = () => {
  const location = useLocation();

  // Define routes where Navbar/Footer should be hidden
  const hideLayoutPaths = ["/admin/login", "/admin", "/admin/overview", "/admin/blood-stock", "/admin/requests", "/admin/donors", "/admin/drives", "/admin/statistics", "/admin/messages"];
  const hideLayout = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register" || hideLayoutPaths.some((path) => location.pathname.startsWith(path));
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Donate" element={<Donate />} />
        <Route path="/RequestBlood" element={<RequestBlood />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/search" element={<FindDonor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blooddrive" element={<BloodDrive />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

function AppRoutes() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default AppRoutes;
