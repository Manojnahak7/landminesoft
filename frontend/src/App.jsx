// import { BrowserRouter, Routes, Route, Navigate,  useLocation,useNavigate} from "react-router-dom";
// import React from "react";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import Footer from "./components/Footer/Footer";
// import Hero from "./components/Hero/Hero";
// import { Nav } from "./components/Nav/Nav";
// import ServicesSection from "./components/Services/ServicesSection";
// import StrategicPath from "./components/Strategy/StrategicPath";
// import { TopNav } from "./components/Topnav/TopNav";
// import WhyLandmineSoft from "./components/Whylandmine/WhyLandmineSoft";
// import CareersSection from "./components/Career/CareersSection";
// import AboutSection from "./components/Aboutsection/AboutSection";
// import AuthPage from "./components/auth/AuthPage";
// import ProfilePage from "./components/profile/ProfilePage";
// import AdminDashboard from "./components/Admin/AdminDashboard";
// import ContactUs from "./components/Contact/ContactUs";
// import Support from "./components/Support/Support";
// import GetDemo from "./components/Demo/GetDemo";
// import ScheduleFreeConsultation from "./components/Schedule/ScheduleFreeConsultation";
// import ViewProject from "./components/Viewproject/ViewProject";

// // 👈 LOADING SPINNER
// export const LoadingSpinner = () => (
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100vh",
//       fontSize: "18px",
//       color: "#666",
//     }}
//   >
//     Loading your session...
//   </div>
// );

// // const HostBasedRedirect = () => {
// //   const location = useLocation();

// //   if (
// //     window.location.host === "careers.landminesoft.com" &&
// //     location.pathname !== "/careers"
// //   ) {
// //     return <Navigate to="/careers" replace />;
// //   }

// //   return null;
// // };

// const HostBasedRedirect = () => {
//   const location = useLocation();
//   const navigate = useNavigate(); 
//   const [checked, setChecked] = React.useState(false);

//   React.useEffect(() => {
//     if (!checked && window.location.host === "careers.landminesoft.com") {
//       if (location.pathname === "/") {
//         // React Router se navigate karo
//         navigate("/careers", { replace: true });
//       }
//       setChecked(true);
//     }
//   }, [checked, location.pathname, navigate]);

//   return null;
// };




// // 👈 PROTECTED ROUTE (loading + auth check)
// export const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <LoadingSpinner />;
//   return user ? children : <Navigate to="/auth" replace />;
// };

// // 👈 ADMIN PROTECTED ROUTE
// export const AdminProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <LoadingSpinner />;
//   return user?.role === "ADMIN" ? children : <Navigate to="/auth" replace />;
// };

// // 👈 PAGE COMPONENTS
// export const HomePage = () => (
//   <>
//     <TopNav />
//     <Nav />
//     <Hero />
//     <StrategicPath />
//     <ServicesSection />
//     <WhyLandmineSoft />
//     <Footer />
//   </>
// );

// export const CareersPage = () => (
//   <>
//     <TopNav />
//     <Nav />
//     <CareersSection />
//     <Footer />
//   </>
// );

// export const AboutPage = () => (
//   <>
//     <TopNav />
//     <Nav />
//     <AboutSection />
//     <Footer />
//   </>
// );

// export const ContactPage = () => (
//   <>
//     <TopNav />
//     <Nav />
//     <ContactUs />
//     <Footer />
//   </>
// );
// export const SupportPage = () => (
//   <>
//     <TopNav />
//     <Nav />
//     <Support />
//     <Footer />
//   </>
// );
// export const ProfileRoute = () => (
//   <>
//     <TopNav />
//     <Nav />
//     <ProfilePage />
//     <Footer />
//   </>
// );

// export const DemoPage = () => (
//   <>
//     <TopNav />
//     <Nav />
//     <GetDemo />
//     <Footer />
//   </>
// );

// export const ServicesPage = () => (
//   <>
//     <TopNav />
//     <Nav />
//     <ServicesSection />
//     <Footer />
//   </>
// );

// export const SchedulePage = () => (
//   <>
//     <TopNav />
//     <Nav />
//     <ScheduleFreeConsultation />
//     <Footer />
//   </>
// );

// export const ViewPage = () => (
//   <>
//     <TopNav />
//     <Nav />
//     <ViewProject />
//     <Footer />
//   </>
// );

// // 👈 MAIN APP CONTENT - NAMED EXPORT
// export const AppContent = () => {
//   return (
//     <BrowserRouter>
//       <HostBasedRedirect />
//       <Routes>
//         {/* 👈 PUBLIC ROUTES */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/careers" element={<CareersPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/support" element={<SupportPage />} />
//         <Route path="/getdemo" element={<DemoPage />} />
//         <Route path="/services" element={<ServicesPage />} />
//         <Route path="/schedule" element={<SchedulePage />} />
//         <Route path="/view" element={<ViewPage />} />

//         <Route
//           path="/auth/reset-password"
//           element={
//             <>
//               <TopNav />
//               <Nav />
//               <AuthPage />
//               <Footer />
//             </>
//           }
//         />
//         <Route
//           path="/auth/forgot-password"
//           element={
//             <>
//               <TopNav />
//               <Nav />
//               <AuthPage />
//               <Footer />
//             </>
//           }
//         />

//         {/* 👈 PROTECTED ROUTES */}
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <ProfileRoute />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin"
//           element={
//             <AdminProtectedRoute>
//               <AdminDashboard />
//             </AdminProtectedRoute>
//           }
//         />

//         {/* 👈 AUTH ROUTE */}
//         <Route
//           path="/auth"
//           element={
//             <>
//               <TopNav />
//               <Nav />
//               <AuthPage />
//               <Footer />
//             </>
//           }
//         />

//         {/* 👈 CATCH ALL */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// // 👈 ROOT APP - NAMED EXPORT (AuthProvider WRAP)
// export const App = () => {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// };


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import { Nav } from "./components/Nav/Nav";
import ServicesSection from "./components/Services/ServicesSection";
import StrategicPath from "./components/Strategy/StrategicPath";
import { TopNav } from "./components/Topnav/TopNav";
import WhyLandmineSoft from "./components/Whylandmine/WhyLandmineSoft";
import CareersSection from "./components/Career/CareersSection";
import AboutSection from "./components/Aboutsection/AboutSection";
import AuthPage from "./components/auth/AuthPage";
import ProfilePage from "./components/profile/ProfilePage";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ContactUs from "./components/Contact/ContactUs";
import Support from "./components/Support/Support";
import GetDemo from "./components/Demo/GetDemo";
import ScheduleFreeConsultation from "./components/Schedule/ScheduleFreeConsultation";
import ViewProject from "./components/Viewproject/ViewProject";

// 👈 LOADING SPINNER
export const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "18px",
      color: "#666",
    }}
  >
    Loading your session...
  </div>
);

// 👈 IMPROVED PROTECTED ROUTE (Saves intended location)
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation(); // 🔥 Previous location save karne ke liye

  if (loading) return <LoadingSpinner />;
  
  // 🔥 Not logged in? Auth pe redirect + location save kar
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

// 👈 ADMIN PROTECTED ROUTE
export const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return user.role === "ADMIN" ? children : <Navigate to="/" replace />;
};

// 👈 HostBasedRedirect (unchanged)
const HostBasedRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!checked && window.location.host === "careers.landminesoft.com") {
      if (location.pathname === "/") {
        navigate("/careers", { replace: true });
      }
      setChecked(true);
    }
  }, [checked, location.pathname, navigate]);

  return null;
};

// 👈 PAGE COMPONENTS (unchanged)
export const HomePage = () => (
  <>
    <TopNav />
    <Nav />
    <Hero />
    <StrategicPath />
    <ServicesSection />
    <WhyLandmineSoft />
    <Footer />
  </>
);

export const CareersPage = () => (
  <>
    <TopNav />
    <Nav />
    <CareersSection />
    <Footer />
  </>
);

export const AboutPage = () => (
  <>
    <TopNav />
    <Nav />
    <AboutSection />
    <Footer />
  </>
);

export const ContactPage = () => (
  <>
    <TopNav />
    <Nav />
    <ContactUs />
    <Footer />
  </>
);

export const SupportPage = () => (
  <>
    <TopNav />
    <Nav />
    <Support />
    <Footer />
  </>
);

export const ProfileRoute = () => (
  <>
    <TopNav />
    <Nav />
    <ProfilePage />
    <Footer />
  </>
);

export const DemoPage = () => (
  <>
    <TopNav />
    <Nav />
    <GetDemo />
    <Footer />
  </>
);

export const ServicesPage = () => (
  <>
    <TopNav />
    <Nav />
    <ServicesSection />
    <Footer />
  </>
);

export const SchedulePage = () => (
  <>
    <TopNav />
    <Nav />
    <ScheduleFreeConsultation />
    <Footer />
  </>
);

export const ViewPage = () => (
  <>
    <TopNav />
    <Nav />
    <ViewProject />
    <Footer />
  </>
);

// 👈 MAIN APP CONTENT
export const AppContent = () => {
  return (
    <BrowserRouter>
      <HostBasedRedirect />
      <Routes>
        {/* 👈 PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/getdemo" element={<DemoPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/view" element={<ViewPage />} />

        {/* 👈 AUTH ROUTES */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/reset-password" element={<AuthPage />} />
        <Route path="/auth/forgot-password" element={<AuthPage />} />

        {/* 👈 PROTECTED ROUTES */}
        <Route path="/profile" element={<ProtectedRoute><ProfileRoute /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />

        {/* 👈 CATCH ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

// 👈 ROOT APP
export const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

