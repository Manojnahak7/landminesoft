// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔥 LOAD USER FROM localStorage (7 days expiry)
//   useEffect(() => {
//     const loadUserFromStorage = () => {
//       try {
//         const storedUser = localStorage.getItem("landmine_user");
//         const storedExpiry = localStorage.getItem("landmine_expiry");

//         if (storedUser && storedExpiry) {
//           const expiryTime = new Date(storedExpiry);
//           if (new Date() < expiryTime) {
//             const userData = JSON.parse(storedUser);
//             setUser(userData);
//             // console.log(
//             //   "🔍 SESSION RESTORED:",
//             //   userData.role || "USER",
//             //   "ID:",
//             //   userData.id
//             // );
//             return;
//           }
//         }

//         // Clear expired/invalid data
//         localStorage.removeItem("landmine_user");
//         localStorage.removeItem("landmine_expiry");
//       } catch (err) {
//         console.error("❌ localStorage error:", err);
//         localStorage.clear();
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUserFromStorage();
//   }, []);

//   // ✅ FIXED LOGIN - Just saves user data (NO API CALL!)
//   const login = (userData, token = null) => {
//     setUser(userData);

//     const expiryTime = new Date();
//     expiryTime.setDate(expiryTime.getDate() + 7); // 7 days

//     localStorage.setItem("landmine_user", JSON.stringify(userData));
//     localStorage.setItem("landmine_expiry", expiryTime.toISOString());

//     if (token) {
//       localStorage.setItem("token", token);
//     }

//     // console.log(
//     //   "💾 SAVED USER:",
//     //   userData.role || "USER",
//     //   "ID:",
//     //   userData.id,
//     //   "Token:",
//     //   !!token
//     // );
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.clear();
//     // console.log("🚪 COMPLETE LOGOUT");
//   };

//   const value = {
//     user,
//     login, // ✅ Passes userData + token
//     logout,
//     loading,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// };


import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";  // 👈 YE IMPORT ADD

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();      // 👈 YE ADD
  const location = useLocation();      // 👈 YE ADD

  // 🔥 LOAD USER FROM localStorage (7 days expiry)
  useEffect(() => {
    const loadUserFromStorage = () => {
      // ... existing code same ...
    };

    loadUserFromStorage();
  }, []);

  // ✅ FIXED LOGIN WITH REDIRECT
  const login = (userData, token = null) => {
    setUser(userData);

    const expiryTime = new Date();
    expiryTime.setDate(expiryTime.getDate() + 7);

    localStorage.setItem("landmine_user", JSON.stringify(userData));
    localStorage.setItem("landmine_expiry", expiryTime.toISOString());

    if (token) {
      localStorage.setItem("token", token);
    }

    // 👈 PERFECT REDIRECT LOGIC!
    if (location.state?.from === '/careers') {
      navigate('/careers', { 
        state: { openJobId: location.state.jobId },  // 👈 Modal open rahega
        replace: true 
      });
    } else {
      navigate('/', { replace: true });  // Normal home
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  // 👈 AUTO REDIRECT ON LOGIN (backup)
  useEffect(() => {
    if (user && location.state?.from === '/careers') {
      navigate('/careers', { 
        state: { openJobId: location.state.jobId },
        replace: true 
      });
    }
  }, [user, location.state, navigate]);

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

