import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "../Career/CareersSection.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const fallbackRoles = [
  {
    id: 1,
    title: "Junior Full‑Stack Developer",
    type: "Full‑time · On‑site / Hybrid",
    location: "Hyderabad, India",
    salary: "₹6-12 LPA",
    experience: "0-2 Years",
    summary: "Work with our core team on AI‑driven web apps using React, Spring Boot, and cloud‑native APIs.",
    createdAt: "2025-12-20T10:30:00Z",
  },
  {
    id: 2,
    title: "AI / ML Engineer",
    type: "Full‑time · Remote Friendly",
    location: "Hyderabad / Remote",
    salary: "₹15-25 LPA",
    experience: "2-5 Years",
    summary: "Build and deploy ML models, RAG pipelines, and LLM integrations for real client projects.",
    createdAt: "2025-12-22T14:15:00Z",
  },
  {
    id: 3,
    title: "Backend Developer (Java)",
    type: "Full‑time",
    location: "Hyderabad, India",
    salary: "₹10-18 LPA",
    experience: "1-4 Years",
    summary: "Design secure, scalable backend services, REST APIs, and data layers for our platforms.",
    createdAt: "2025-12-23T09:45:00Z",
  },
  {
    id: 4,
    title: "Software Engineering Intern",
    type: "Internship · Full‑time",
    location: "Hyderabad, India",
    salary: "0",
    experience: "0-1 Years",
    summary: "Hands-on experience building real web apps with React + Spring Boot. Perfect for freshers!",
    createdAt: "2025-12-25T09:00:00Z",
  },
];

const perks = [
  "Real project ownership from day one",
  "Modern stack: React, Java/Spring, Python, cloud & AI tools",
  "Mentorship from experienced engineers",
  "Clear growth path and regular feedback",
];

const CareersSection = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyModal, setApplyModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [openJobId, setOpenJobId] = useState(null);


  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!jobsLoading && user && location.state?.openJobId) {
      const jobIdToOpen = location.state.openJobId;
      const job = jobs.find((j) => j.id === jobIdToOpen);

      if (job) {
        setSelectedJob(job);
        setFormData({
          fullName: user.fullName || "",
          email: user.email || "",
          phone: user.phone || "",
          location: user.location || "",
          collegeName: user.collegeName || "",
          city: user.city || "",
          cgpa: user.cgpa || "",
          currentCompany: user.currentCompany || "",
          currentSalary: user.currentSalary || "",
          expectedSalary: "",
        });
        setApplyModal(true);
        navigate("/careers", { replace: true });
      }
    }
  }, [jobsLoading, user, location.state, jobs, navigate]);



  const fetchJobs = async () => {
    try {
      setJobsLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/jobs`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setJobs(fallbackRoles);
      setError("Using demo jobs (backend unavailable)");
    } finally {
      setJobsLoading(false);
    }
  };

  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days === 0) {
      if (hours === 0) return `${minutes}m ago`;
      return `${hours}h ago`;
    }
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isInternship = (job) => {
    return job.salary === "0" || job.salary === 0 || !job.salary;
  };

  const handleApply = async (job) => {
    if (!user) {
    // 🔥 PASS JOB ID TO LOGIN PAGE
    navigate("/auth", { 
      state: { 
        from: "/careers", 
        jobId: job.id  // ← CRITICAL: Specific job ID
      } 
    });
    return;
  }
    setSelectedJob(job);
    setApplyModal(true);
    setFormData({
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      collegeName: user.collegeName || "",
      city: user.city || "",
      cgpa: user.cgpa || "",
      currentCompany: user.currentCompany || "",
      currentSalary: user.currentSalary || "",
      expectedSalary: "",
    });
    setApplyModal(true);
  };

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      alert("❌ Please upload your resume!");
      return;
    }

    if (!user?.email) {
      alert("❌ Please login first!");
      window.location.href = "/login";
      return;
    }

    setApplying(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("jobId", selectedJob.id.toString());
      formDataToSend.append("resume", resumeFile);
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("collegeName", formData.collegeName);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("cgpa", formData.cgpa);
      formDataToSend.append("currentCompany", formData.currentCompany || "");
      formDataToSend.append("currentSalary", formData.currentSalary || "");
      formDataToSend.append("expectedSalary", formData.expectedSalary || "");

      const res = await fetch(`${API_BASE}/api/auth/jobs/apply`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `HTTP ${res.status}`);
      }

      setApplySuccess(true);

      setTimeout(() => {
        setApplyModal(false);
        setApplySuccess(false);
        setResumeFile(null);
        setFormData({});
        setSelectedJob(null);
      }, 3000);
    } catch (err) {
      console.error("❌ Apply error:", err);
      alert("❌ " + err.message);
    } finally {
      setApplying(false);
    }
  };

  const handleCloseModal = () => {
    setApplyModal(false);
    setResumeFile(null);
    setFormData({});
    setSelectedJob(null);
  };

  if (authLoading)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>🔄 Loading...</div>
    );

  return (
    <section className="careers">
      <div className="careers-header">
        <p className="careers-eyebrow">CAREERS</p>
        <h2 className="careers-title">Build the future with Landmine Soft</h2>
        <p className="careers-subtitle">
          Join a small, focused engineering team working on AI‑powered products,
          modern web platforms, and cloud solutions for global clients.
        </p>
        {error && (
          <p style={{ color: "#ef4444", fontSize: "14px", marginTop: "10px" }}>
            {error}
          </p>
        )}
        {!user && (
          <p style={{ color: "#f59e0b", fontSize: "14px", marginTop: "10px" }}>
            👤 <Link to="/auth">Login</Link> to apply for jobs
          </p>
        )}
      </div>

      <div className="careers-layout">
        <div className="careers-left">
          <h3 className="careers-left-title">Why work with us?</h3>
          <ul className="careers-perks">
            {perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
          <p className="careers-note">
            Don't see the right role? Send your CV to{" "}
            <span>careers@landminesoft.com</span>
          </p>
        </div>

        <div className="careers-right">
          {jobsLoading ? (
            <div style={{ fontSize: "18px", margin: "2rem 0" }}>
              🔄 Loading jobs...
            </div>
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "48px", marginBottom: "1rem" }}>📭</div>
              <h3>No jobs available</h3>
            </div>
          ) : (
            jobs.map((role) => (
              <div key={role.id || role.title} className="career-card">
                <div className="career-card-top">
                  <h3 className="career-role">{role.title}</h3>
                  <p className="career-type">{role.type}</p>
                </div>
                <p className="career-location">{role.location}</p>

                <div className="career-meta">
                  <span className="career-salary">💰 {role.salary}</span>
                  <span className="career-experience">
                    📈 {role.experience}
                  </span>
                  <span className="career-posted">
                    📅 {timeAgo(role.createdAt)}
                  </span>
                </div>

                <p className="career-summary">{role.summary}</p>
               {/* <button
  className="career-cta"
onClick={() => {
    console.log("🔥 Button clicked! User:", user, "Job:", role.id); // 👈 Debug
    handleApply(role);
  }}
                 disabled={!user || openJobId === role.id} // 👈 Loading disable
               

  style={{ 
    opacity: user ? 1 : 0.6,
    cursor: openJobId === role.id ? 'wait' : 'pointer'
  }}
>
  {openJobId === role.id 
    ? "Opening..." 
    : user 
      ? "View details & apply →" 
      : "Login to apply →"
  }
</button> */}

  <button   
  className="career-cta"
  style={{ 
    pointerEvents: "auto !important",     // 👈 YE ADD
    zIndex: 9999,                        // 👈 YE ADD  
    opacity: user ? 1 : 0.6,
    cursor: openJobId === role.id ? 'wait' : 'pointer'
  }}
  onClick={() => {
    console.log("✅ WORKING! User:", user, "Job:", role.id);
    handleApply(role);
  }}
  disabled={!user || openJobId === role.id}
>
  {openJobId === role.id 
    ? "Opening..." 
    : user 
      ? "View details & apply →" 
      : "Login to apply →"
  }
</button>



              </div>
            ))
          )}
        </div>
      </div>

      {applyModal && selectedJob && (
        <div className="apply-modal-overlay" onClick={handleCloseModal}>
          <div className="apply-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📋 Apply for {selectedJob.title}</h3>
              <span className="job-id">Job ID: #{selectedJob.id}</span>
              <button className="close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              {applySuccess ? (
                <div className="success-message">
                  <div style={{ fontSize: "48px", marginBottom: "1rem" }}>
                    ✅
                  </div>
                  <h3>You've successfully applied!</h3>
                  <p className="success-job-title">{selectedJob.title}</p>
                  <p style={{ color: "#6b7280" }}>
                    We'll review your application soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="apply-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName || ""}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location || ""}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>College Name *</label>
                      <input
                        type="text"
                        name="collegeName"
                        value={formData.collegeName || ""}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city || ""}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>CGPA *</label>
                      <input
                        type="text"
                        name="cgpa"
                        value={formData.cgpa || ""}
                        onChange={handleFormChange}
                        placeholder="e.g. 8.5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Current Company</label>
                      <input
                        type="text"
                        name="currentCompany"
                        value={formData.currentCompany || ""}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  {!isInternship(selectedJob) && (
                    <div className="form-row">
                      <div className="form-group">
                        <label>Current CTC</label>
                        <input
                          type="text"
                          name="currentSalary"
                          value={formData.currentSalary || ""}
                          onChange={handleFormChange}
                          placeholder="e.g. ₹8 LPA"
                        />
                      </div>
                      <div className="form-group">
                        <label>Expected CTC *</label>
                        <input
                          type="text"
                          name="expectedSalary"
                          value={formData.expectedSalary || ""}
                          onChange={handleFormChange}
                          placeholder="e.g. ₹12 LPA"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {isInternship(selectedJob) && (
                    <div
                      style={{
                        background: "#f0f9ff",
                        border: "1px solid #0ea5e9",
                        borderRadius: "8px",
                        padding: "1rem",
                        marginBottom: "1rem",
                        fontSize: "14px"
                      }}
                    >
                      💡 <strong>Internship Opportunity:</strong> No salary. Focus on gaining real project experience!
                    </div>
                  )}

                  <div className="form-group">
                    <label>Upload Resume * (PDF/DOC)</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      required
                    />
                    {resumeFile && (
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#6b7280",
                          marginTop: "4px",
                        }}
                      >
                        ✅ {resumeFile.name}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={applying || !resumeFile}
                    className="apply-submit-btn"
                  >
                    {applying
                      ? "Applying..."
                      : `Apply for ${selectedJob.title}`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CareersSection;
