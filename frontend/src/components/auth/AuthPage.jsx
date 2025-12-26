import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../auth/AuthPage.css";
import { useAuth } from "../../context/AuthContext";

// const API_BASE = "http://localhost:7689";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    fullName: "",
    location: "",
    city: "",
    pincode: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    collegeName: "",
    degree: "",
    yearOfPassing: "",
    cgpa: "",
    currentCompany: "",
    currentPosition: "",
    currentSalary: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // 🔥 Auto detect reset token
  // useEffect(() => {
  //   const token = searchParams.get("token");
  //   if (token) {
  //     setMode("reset-password-confirm");
  //     console.log("🔑 Reset token detected");
  //   }
  // }, [searchParams]);

  // // 🔥 AuthPage.jsx ke useEffect ko replace kar
  // useEffect(() => {
  //   const token = searchParams.get("token");
  //   console.log("🔍 URL:", window.location.pathname, "Token:", token); // DEBUG

  //   if (token) {
  //     if (window.location.pathname.includes("reset-password")) {
  //       setMode("reset-password-confirm");
  //       console.log("✅ Reset form mode set!");
  //     }
  //   }
  // }, [searchParams]);

  useEffect(() => {
    const token = searchParams.get("token");
    // console.log("🔍 URL:", window.location.pathname, "Token:", token);

    if (token) {
      // 🔥 ANY PATH pe token detect kar (auth OR reset-password)
      setMode("reset-password-confirm");
      // console.log("✅ Reset form activated!");
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 🔥 VALIDATE REQUIRED FIELDS
  const validateRequiredFields = () => {
    const required = {
      fullName: form.fullName,
      location: form.location,
      city: form.city,
      pincode: form.pincode,
      phone: form.phone,
      email: form.email,
      password: form.password,
      collegeName: form.collegeName,
      degree: form.degree,
      yearOfPassing: form.yearOfPassing,
      cgpa: form.cgpa,
    };

    for (const [field, value] of Object.entries(required)) {
      if (!value || !value.trim()) {
        return field;
      }
    }
    return null;
  };

  // 🔥 FIXED LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Invalid email or password");
      }

      const data = await res.json();
      // console.log("🔍 LOGIN SUCCESS:", data);

      // 🔥 PASS USER DATA to AuthContext
      const userData = {
        id: data.userId,
        fullName: data.fullName,
        email: data.email,
        location: data.location || "",
        city: data.city || "",
        pincode: data.pincode || "",
        phone: data.phone || "",
        collegeName: data.collegeName || "",
        degree: data.degree || "",
        yearOfPassing: data.yearOfPassing || "",
        cgpa: data.cgpa || "",
        currentCompany: data.currentCompany || "",
        currentPosition: data.currentPosition || "",
        currentSalary: data.currentSalary || "",
        role: data.role || "USER",
      };

      login(userData, null); // Backend JWT token nahi bhej raha

      if (data.role === "ADMIN") {
        alert("👑 Welcome Admin!");
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FIXED REGISTER - All 14 fields + validation
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ VALIDATE ALL REQUIRED FIELDS
    const missingField = validateRequiredFields();
    if (missingField) {
      setError(
        `Please fill ${missingField.replace(/([A-Z])/g, " $1").toLowerCase()}`
      );
      setLoading(false);
      return;
    }

    try {
      const registerData = {
        fullName: form.fullName.trim(),
        location: form.location.trim(),
        city: form.city.trim(),
        pincode: form.pincode.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        password: form.password,
        collegeName: form.collegeName.trim(),
        degree: form.degree.trim(),
        yearOfPassing: form.yearOfPassing.trim(),
        cgpa: form.cgpa.trim(),
        currentCompany: form.currentCompany?.trim() || "",
        currentPosition: form.currentPosition?.trim() || "",
        currentSalary: form.currentSalary?.trim() || "",
      };

      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Register error:", data);
        throw new Error(data.message || "Registration failed");
      }

      const data = await res.json();
      // console.log("✅ REGISTER SUCCESS:", data);
      // alert("✅ Registered successfully! You can now log in.");
      // setMode("login");
      setSuccess("✅ Account created successfully!");
      setMode("login");

      // Clear form but keep email for convenience
      setForm({
        ...form,
        fullName: "",
        location: "",
        city: "",
        pincode: "",
        phone: "",
        password: "",
        confirmPassword: "",
        collegeName: "",
        degree: "",
        yearOfPassing: "",
        cgpa: "",
        currentCompany: "",
        currentPosition: "",
        currentSalary: "",
      });
    } catch (err) {
      console.error("Register error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send reset email");
      }

      const data = await res.json();
      // alert(data.message || "✅ Reset link sent to your email!");
      setSuccess(data.message || "✅ Reset link sent to your email!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordConfirm = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = searchParams.get("token");
      const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: form.password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Reset failed");
      }

      // alert("✅ Password reset successfully! You can now log in.");
      // setMode("login");
      setSuccess("✅ Password reset successfully! You can now log in.");
      setMode("login");
      setForm({ ...form, password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <div className="auth-header">
          <h2>
            {mode === "login"
              ? "Log in to Landmine Soft"
              : mode === "register"
              ? "Create your account"
              : mode === "reset"
              ? "Reset your password"
              : "Set new password"}
          </h2>
          <p>
            {mode === "login"
              ? "Access your applications, profile, and project updates."
              : mode === "register"
              ? "Join thousands of developers applying for top roles."
              : mode === "reset"
              ? "Enter your email and we'll send you a password reset link."
              : "Enter your new password below."}
          </p>
        </div>

        {success && <div className="auth-success">{success}</div>}

        {/* 🔥 Error Message */}
        {/* {error && <div className="auth-error">{error}</div>} */}

        {error && <div className="auth-error">{error}</div>}

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="auth-form">
            <label>
              Email <span className="required">*</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Password <span className="required">*</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>
            <button
              type="submit"
              className="auth-primary-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
            <p className="auth-switch">
              New to Landmine Soft?{" "}
              <button type="button" onClick={() => setMode("register")}>
                Create an account
              </button>
            </p>
            <p className="auth-switch">
              <button type="button" onClick={() => setMode("reset")}>
                Forgot password?
              </button>
            </p>
          </form>
        ) : mode === "register" ? (
          <form
            onSubmit={handleRegister}
            className="auth-form auth-register-grid"
          >
            {/* LEFT COLUMN */}
            <div>
              <label>
                Full name <span className="required">*</span>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email <span className="required">*</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Password <span className="required">*</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Phone <span className="required">*</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Location <span className="required">*</span>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Telangana"
                  required
                />
              </label>
            </div>

            {/* RIGHT COLUMN */}
            <div>
              <label>
                College <span className="required">*</span>
                <input
                  name="collegeName"
                  value={form.collegeName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Degree <span className="required">*</span>
                <input
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech"
                  required
                />
              </label>
              <label>
                Year of Passing <span className="required">*</span>
                <input
                  name="yearOfPassing"
                  value={form.yearOfPassing}
                  onChange={handleChange}
                  placeholder="e.g. 2023"
                  required
                />
              </label>
              <label>
                CGPA <span className="required">*</span>
                <input
                  name="cgpa"
                  value={form.cgpa}
                  onChange={handleChange}
                  placeholder="e.g. 8.5"
                  required
                />
              </label>
              <label>
                City <span className="required">*</span>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Hyderabad"
                  required
                />
              </label>
              <label>
                Pincode <span className="required">*</span>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="e.g. 500001"
                  required
                />
              </label>
            </div>

            {/* OPTIONAL WORK FIELDS */}
            <div className="work-fields">
              <label>
                Current Company (Optional)
                <input
                  name="currentCompany"
                  value={form.currentCompany}
                  onChange={handleChange}
                  placeholder="e.g. TalVoy Partners"
                />
              </label>
              <label>
                Current Position (Optional)
                <input
                  name="currentPosition"
                  value={form.currentPosition}
                  onChange={handleChange}
                  placeholder="e.g. Developer"
                />
              </label>
              <label>
                Current Salary (Optional)
                <input
                  name="currentSalary"
                  value={form.currentSalary}
                  onChange={handleChange}
                  placeholder="e.g. 5 LPA"
                />
              </label>
            </div>

            <button
              type="submit"
              className="auth-primary-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
            <p className="auth-switch">
              Already have account?{" "}
              <button type="button" onClick={() => setMode("login")}>
                Log in
              </button>
            </p>
          </form>
        ) : mode === "reset" ? (
          <form onSubmit={handleResetPassword} className="auth-form">
            <label>
              Email <span className="required">*</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <button
              type="submit"
              className="auth-primary-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <p className="auth-switch">
              <button type="button" onClick={() => setMode("login")}>
                Back to login
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleResetPasswordConfirm} className="auth-form">
            <label>
              New Password <span className="required">*</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoFocus
              />
            </label>
            <label>
              Confirm Password <span className="required">*</span>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>
            <button
              type="submit"
              className="auth-primary-btn"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            <p className="auth-switch">
              <button type="button" onClick={() => setMode("login")}>
                Back to login
              </button>
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
