import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "../Admin/AdminDashboard.css";

// const API_BASE = "http://localhost:7689";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const AdminDashboard = () => {
  // const { user, logout } = useAuth();
  const { user, token, logout } = useAuth(); // YE EK HI LINE

  const [activeTab, setActiveTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [tickets, setTickets] = useState([]); // NEW: support tickets

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingContactId, setDeletingContactId] = useState(null);
  const [deletingTicketId, setDeletingTicketId] = useState(null); // NEW
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [viewModal, setViewModal] = useState(false);
  const [appModal, setAppModal] = useState(false);
  const [jobModal, setJobModal] = useState(false);

  const [consultations, setConsultations] = useState([]);
  const [deletingConsultationId, setDeletingConsultationId] = useState(null);

  const [demoRequests, setDemoRequests] = useState([]);
  const [deletingDemoId, setDeletingDemoId] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    type: "",
    location: "",
    summary: "",
    salary: "",
    experience: "",
  });
  const [postingJob, setPostingJob] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      Promise.all([
        fetchUsers(),
        fetchApplications(),
        fetchJobs(),
        fetchContacts(),
        fetchTickets(), // NEW
        fetchDemoRequests(),
        fetchConsultations(),
      ])
        .then(() => setLoading(false))
        .catch(console.error);
    }
  }, [user]);

  useEffect(() => {
    if (activeTab !== "postjob") {
      setJobForm({
        title: "",
        type: "",
        location: "",
        summary: "",
        salary: "",
        experience: "",
      });
      setEditingJobId(null);
    }
  }, [activeTab]);

  const fetchConsultations = async () => {
    try {
      // const res = await fetch("http://localhost:7689/api/consultations");
            const res = await fetch(`${API_BASE}/api/consultations`);

      if (!res.ok) throw new Error("Failed to fetch consultations");
      const data = await res.json();
      setConsultations(data);
    } catch (err) {
      console.error("Consultations error:", err);
    }
  };

  const fetchDemoRequests = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/demo-requests`);
      if (!res.ok) throw new Error("Failed to fetch demo requests");
      const data = await res.json();
      setDemoRequests(data);
    } catch (err) {
      console.error("Demo requests error:", err);
    }
  };

  const handleDeleteConsultation = async (consultationId) => {
    if (!window.confirm("Delete this consultation request?")) return;

    setDeletingConsultationId(consultationId);
    try {
      const res = await fetch(
        `${API_BASE}/api/consultations/${consultationId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt ? txt : "Failed to delete consultation");
      }

      setConsultations((prev) => prev.filter((c) => c.id !== consultationId));
      alert("Consultation deleted successfully!");
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setDeletingConsultationId(null);
    }
  };

  const handleDeleteDemoRequest = async (id) => {
    if (!window.confirm("Delete this demo request?")) return;

    setDeletingDemoId(id);
    try {
      const res = await fetch(`${API_BASE}/api/demo-requests/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to delete demo request");
      }
      setDemoRequests((prev) => prev.filter((d) => d.id !== id));
      alert("✅ Demo request deleted successfully!");
    } catch (err) {
      alert("❌ Delete failed: " + err.message);
    } finally {
      setDeletingDemoId(null);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/admin/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Users error:", err);
    }
  };

  // const fetchApplications = async () => {
  //   try {
  //     const res = await fetch(`${API_BASE}/api/auth/admin/applications`);
  //     if (!res.ok) throw new Error("Failed to fetch applications");
  //     const data = await res.json();
  //     setApplications(data);
  //   } catch (err) {
  //     console.error("Applications error:", err);
  //   }
  // };

  
  const fetchApplications = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/auth/admin/applications`);
    if (!res.ok) throw new Error("Failed to fetch applications");
    const allApps = await res.json();
    
    // 🔥 Sirf PENDING + IN_PROGRESS
    const filteredApps = allApps.filter(app => 
      ['PENDING', 'IN_PROGRESS'].includes(app.status?.toUpperCase())
    );
    
    setApplications(filteredApps);  // ✅ Ab length = 3
  } catch (err) {
    console.error("Applications error:", err);
  }
};

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/jobs`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Jobs error:", err);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/contact/all`);
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Contacts error:", err);
    }
  };

  // NEW: fetch support tickets
  const fetchTickets = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/support/tickets`);
      if (!res.ok) throw new Error("Failed to fetch support tickets");
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error("Support tickets error:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setDeletingId(userId);
    try {
      const res = await fetch(`${API_BASE}/api/auth/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setUsers(users.filter((u) => u.id !== userId));
      alert("✅ User deleted successfully!");
    } catch (err) {
      alert("❌ Delete failed: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = (userData) => {
    setSelectedUser(userData);
    setViewModal(true);
  };

  const closeModal = () => {
    setViewModal(false);
    setSelectedUser(null);
  };

  const handleViewApp = (appData) => {
    setSelectedApp(appData);
    setAppModal(true);
  };

  const closeAppModal = () => {
    setAppModal(false);
    setSelectedApp(null);
  };

  const handleViewJob = (jobData) => {
    setSelectedJob(jobData);
    setJobModal(true);
  };

  const closeJobModal = () => {
    setJobModal(false);
    setSelectedJob(null);
    setEditingJobId(null);
  };

  const handleEditJob = (job) => {
    if (job && job.id) {
      setJobForm({
        title: job.title || "",
        type: job.type || "",
        location: job.location || "",
        summary: job.summary || "",
        salary: job.salary || "",
        experience: job.experience || "",
      });
      setEditingJobId(job.id);
      setActiveTab("postjob");
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this job? This will remove it from Careers page."
      )
    )
      return;

    try {
      const res = await fetch(`${API_BASE}/api/auth/admin/jobs/${jobId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to delete job");
      }

      setJobs(jobs.filter((j) => j.id !== jobId));
      alert("✅ Job deleted successfully!");
    } catch (err) {
      console.error("Delete job error:", err);
      alert("❌ Delete failed: " + err.message);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (
      !window.confirm("Are you sure you want to delete this contact message?")
    ) {
      return;
    }

    setDeletingContactId(contactId);
    try {
      const res = await fetch(`${API_BASE}/api/contact/${contactId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to delete contact");
      }

      setContacts((prev) => prev.filter((c) => c.id !== contactId));
      alert("✅ Contact deleted successfully!");
    } catch (err) {
      alert("❌ Delete failed: " + err.message);
    } finally {
      setDeletingContactId(null);
    }
  };

  // NEW: delete support ticket
  const handleDeleteTicket = async (ticketId) => {
    if (!window.confirm("Delete this support ticket?")) return;

    setDeletingTicketId(ticketId);
    try {
      const res = await fetch(`${API_BASE}/api/support/tickets/${ticketId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to delete ticket");
      }
      setTickets((prev) => prev.filter((t) => t.id !== ticketId));
      alert("✅ Ticket deleted successfully!");
    } catch (err) {
      alert("❌ Delete failed: " + err.message);
    } finally {
      setDeletingTicketId(null);
    }
  };
  // const handleStatusUpdate = async (id, newStatus) => {
  //   if (newStatus === "REJECTED") {
  //     if (
  //       !window.confirm(
  //         "Reject this application? Rejection email will be sent!"
  //       )
  //     )
  //       return;
  //   }

  //   setUpdatingStatus(id);

  //   try {
  //     const res = await fetch(
  //       `${API_BASE}/api/auth/admin/applications/${id}/status`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" }, // NO TOKEN
  //         body: JSON.stringify({ status: newStatus }),
  //       }
  //     );

  //     const data = await res.json();

  //     if (data.success || res.ok) {
  //       alert(
  //         newStatus === "REJECTED"
  //           ? `✅ REJECTED! Email sent to candidate.`
  //           : `✅ Status updated to ${newStatus}`
  //       );
  //       fetchApplications(); // Refresh
  //     } else {
  //       alert("❌ " + (data.message || "Update failed"));
  //     }
  //   } catch (err) {
  //     alert("❌ Network error");
  //   } finally {
  //     setUpdatingStatus(null);
  //   }

  // };

  const handleStatusUpdate = async (id, newStatus) => {
    if (newStatus === "REJECTED") {
      if (
        !window.confirm(
          "Reject this application? Rejection email will be sent!"
        )
      )
        return;
    }

    setUpdatingStatus(id);

    try {
      const res = await fetch(
        `${API_BASE}/api/auth/admin/applications/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" }, // NO TOKEN
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (data.success || res.ok) {
        alert(
          newStatus === "REJECTED"
            ? `✅ REJECTED! Email sent to candidate.`
            : `✅ Status updated to ${newStatus}`
        );

        if (newStatus === "REJECTED") {
          setApplications((prev) => prev.filter((app) => app.id !== id));
        } else {
          setApplications((prev) =>
            prev.map((app) =>
              app.id === id ? { ...app, status: newStatus } : app
            )
          );
        }
      } else {
        alert("❌ " + (data.message || "Update failed"));
      }
    } catch (err) {
      alert("❌ Network error");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    setPostingJob(true);

    if (!jobForm.title.trim() || !jobForm.summary.trim()) {
      alert("❌ Please fill all required fields!");
      setPostingJob(false);
      return;
    }

    try {
      const endpoint = editingJobId
        ? `${API_BASE}/api/auth/admin/jobs/${editingJobId}`
        : `${API_BASE}/api/auth/admin/jobs`;

      const method = editingJobId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobForm),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || `HTTP ${res.status}: Failed to save job`);
      }

      alert(
        editingJobId
          ? "✅ Job updated successfully!"
          : "✅ Job posted successfully! Now visible on Careers page."
      );

      setJobForm({
        title: "",
        type: "",
        location: "",
        summary: "",
        salary: "",
        experience: "",
      });
      setEditingJobId(null);
      await fetchJobs();
      setActiveTab("managejobs");
    } catch (err) {
      console.error("Post job error:", err);
      alert("❌ Error: " + err.message);
    } finally {
      setPostingJob(false);
    }
  };

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="admin-denied">
        <h2>🚫 Access Denied</h2>
        <p>Only admins can access this dashboard.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h3>👑 Admin Panel</h3>
          <p>Welcome, {user.fullName}</p>
        </div>

        <nav className="admin-nav">
          <button
            className={`nav-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 View All Users ({users.length})
          </button>

          <button
            className={`nav-btn ${activeTab === "applicants" ? "active" : ""}`}
            onClick={() => setActiveTab("applicants")}
          >
            📋 View All Applications ({applications.length})
          </button>

          <button
            className={`nav-btn ${activeTab === "managejobs" ? "active" : ""}`}
            onClick={() => setActiveTab("managejobs")}
          >
            🛠️ Manage Jobs ({jobs.length})
          </button>

          <button
            className={`nav-btn ${activeTab === "postjob" ? "active" : ""}`}
            onClick={() => setActiveTab("postjob")}
          >
            ➕ Post New Job
          </button>

          <button
            className={`nav-btn ${activeTab === "contacts" ? "active" : ""}`}
            onClick={() => setActiveTab("contacts")}
          >
            📨 Contacted ({contacts.length})
          </button>

          {/* NEW: Support tab */}
          <button
            className={`nav-btn ${activeTab === "support" ? "active" : ""}`}
            onClick={() => setActiveTab("support")}
          >
            🆘 Support ({tickets.length})
          </button>

          <button
            className={`nav-btn ${
              activeTab === "demorequests" ? "active" : ""
            }`}
            onClick={() => setActiveTab("demorequests")}
          >
            🎥 Demo Requests ({demoRequests.length})
          </button>

          <button
            className={`nav-btn ${
              activeTab === "consultations" ? "active" : ""
            }`}
            onClick={() => setActiveTab("consultations")}
          >
            Schedule Consultation
            <span className="count-badge">{consultations.length}</span>
          </button>
        </nav>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <h1>
            {activeTab === "users"
              ? "All Users"
              : activeTab === "applicants"
              ? "Applications (Pending & In Progress)"
              : activeTab === "managejobs"
              ? `Manage Jobs (${jobs.length})`
              : activeTab === "contacts"
              ? `Contacted (${contacts.length})`
              : activeTab === "support"
              ? `Support Tickets (${tickets.length})`
              : activeTab === "demorequests"
              ? `Demo Requests (${demoRequests.length})`
              : editingJobId
              ? `Edit Job #${editingJobId}`
              : "Post New Job"}
          </h1>
          <span className="user-count">
            {activeTab === "users"
              ? `${users.length} total users`
              : activeTab === "applicants"
              ? "Showing only Pending and In-Progress applications"
              : activeTab === "managejobs"
              ? `${jobs.length} active jobs`
              : activeTab === "contacts"
              ? `${contacts.length} contact messages received`
              : activeTab === "support"
              ? `${tickets.length} support tickets`
              : activeTab === "demorequests"
              ? `${demoRequests.length} demo requests`
              : editingJobId
              ? "Update existing job"
              : "Create new job posting"}
          </span>
        </div>

        {/* Demo Requests Tab */}
        {activeTab === "demorequests" && (
          <div className="admin-content">
            <div className="contacts-table-container">
              {demoRequests.length === 0 ? (
                <div className="empty-state">
                  <h3>📭 No demo requests yet</h3>
                  <p>Leads who request product demos will appear here.</p>
                </div>
              ) : (
                <table className="contacts-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product</th>
                      <th>Client Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Requested At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoRequests.map((d) => (
                      <tr key={d.id}>
                        <td>#{d.id}</td>
                        <td>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span style={{ fontWeight: 600 }}>
                              {d.productName}
                            </span>
                            <span
                              style={{
                                fontSize: "11px",
                                color: "#6b7280",
                                textTransform: "uppercase",
                              }}
                            >
                              {d.productType}
                            </span>
                          </div>
                        </td>
                        <td>{d.fullName}</td>
                        <td>
                          <a
                            href={`mailto:${d.email}`}
                            className="contact-email-link"
                          >
                            {d.email}
                          </a>
                        </td>
                        <td>{d.phone}</td>
                        <td>
                          {d.createdAt
                            ? new Date(d.createdAt).toLocaleString()
                            : "-"}
                        </td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteDemoRequest(d.id)}
                            disabled={deletingDemoId === d.id}
                          >
                            {deletingDemoId === d.id
                              ? "Deleting..."
                              : "🗑️ Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
        {activeTab === "consultations" && (
          <div className="admin-content">
            <div className="contacts-table-container">
              {consultations.length === 0 ? (
                <div className="empty-state">
                  <h3>No consultation requests yet</h3>
                  <p>
                    Consultation requests from Schedule Free Consultation page
                    will appear here.
                  </p>
                </div>
              ) : (
                <table className="contacts-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Project</th>
                      <th>Budget</th>
                      <th>Type</th>
                      <th>Date/Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultations.map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>
                          <strong>{c.fullName}</strong>
                        </td>
                        <td>
                          <a
                            href={`mailto:${c.email}`}
                            className="contact-email-link"
                          >
                            {c.email}
                          </a>
                        </td>
                        <td>{c.phone || "-"}</td>
                        <td>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span style={{ fontWeight: 600 }}>
                              {c.projectType}
                            </span>
                            <small style={{ color: "#6b7280" }}>
                              {c.projectSummary?.slice(0, 50)}...
                            </small>
                          </div>
                        </td>
                        <td>{c.budgetRange || "-"}</td>
                        <td>
                          <span className="type-badge">
                            {c.meetingType || "Not specified"}
                          </span>
                        </td>

                        <td>
                          {c.preferredDate} {c.preferredTime} IST
                        </td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteConsultation(c.id)}
                            disabled={deletingConsultationId === c.id}
                            title="Delete consultation"
                          >
                            {deletingConsultationId === c.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="admin-content">
            {loading ? (
              <div className="loading">🔄 Loading users...</div>
            ) : (
              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>City</th>
                      <th>College</th>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.fullName}</td>
                        <td>{u.city}</td>
                        <td>{u.collegeName}</td>
                        <td>{u.currentCompany || "-"}</td>
                        <td>
                          <span
                            className={`role-badge role-${u.role.toLowerCase()}`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="view-btn"
                              onClick={() => handleView(u)}
                              title="View details"
                            >
                              👁️ View
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDelete(u.id)}
                              disabled={deletingId === u.id}
                              title="Delete user"
                            >
                              {deletingId === u.id
                                ? "Deleting..."
                                : "🗑️ Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Applications Tab – only PENDING & IN_PROGRESS */}
        {activeTab === "applicants" && (
          <div className="admin-content">
            <div className="applications-table-container">
              {applications.filter((app) => {
                const s = (app.status || "").toUpperCase();
                return s === "PENDING" || s === "IN_PROGRESS";
              }).length === 0 ? (
                <div className="empty-state">
                  <h3>📭 No pending applications</h3>
                  <p>
                    All applications are either rejected or none received yet.
                  </p>
                </div>
              ) : (
                <table className="applications-table">
                  <thead>
                    <tr>
                      <th>App ID</th>
                      <th>Job Title</th>
                      <th>Candidate</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>CGPA</th>
                      <th>Expected Salary</th>
                      <th>Applied Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications
                      .filter((app) => {
                        const s = (app.status || "").toUpperCase();
                        return s === "PENDING" || s === "IN_PROGRESS";
                      })
                      .map((app) => (
                        <tr key={app.id}>
                          <td>#{app.id}</td>
                          <td>
                            <strong>{app.jobTitle || "Job Deleted"}</strong>
                          </td>
                          <td>{app.fullName}</td>
                          <td>{app.email}</td>
                          <td>{app.phone}</td>
                          <td>{app.cgpa}</td>
                          <td>₹{app.expectedSalary}</td>
                          <td>
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </td>
                          <td>
                            <span
                              className={`status-badge status-${app.status.toLowerCase()}`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="view-btn"
                                onClick={() => handleViewApp(app)}
                                title="View details"
                              >
                                👁️ View
                              </button>
                              {/* <a
                                href={`${API_BASE}/api/auth/resume/download?path=${encodeURIComponent(
                                  app.resumePath
                                )}`}
                                className="download-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                title="Download Resume"
                              >
                                📥 Resume
                              </a> */}
                              <a
                                // href={`${API_BASE}/api/auth/resume/download?resumePath=${encodeURIComponent(
                                //   app.resumePath
                                // )}`}
                                href={`${API_BASE}/api/auth/resume/download?resumeUrl=${encodeURIComponent(
                                  app.resumeUrl
                                )}`}
                                className="download-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                title="Download Resume"
                              >
                                📥 Resume
                              </a>

                              <select
                                className="status-select"
                                value={app.status}
                                onChange={(e) =>
                                  handleStatusUpdate(app.id, e.target.value)
                                }
                                disabled={updatingStatus === app.id}
                              >
                                <option value="PENDING">⏳ Pending</option>
                                <option value="IN_PROGRESS">
                                  🔄 In Progress
                                </option>
                                <option value="REJECTED">❌ Rejected</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Manage Jobs Tab */}
        {activeTab === "managejobs" && (
          <div className="admin-content">
            <div className="jobs-table-container">
              {jobs.length === 0 ? (
                <div className="empty-state">
                  <h3>📭 No jobs posted yet</h3>
                  <p>Post your first job using the "Post New Job" tab!</p>
                  <button
                    className="post-job-btn"
                    onClick={() => setActiveTab("postjob")}
                  >
                    ➕ Post First Job
                  </button>
                </div>
              ) : (
                <table className="jobs-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Salary</th>
                      <th>Experience</th>
                      <th>Posted Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td>#{job.id}</td>
                        <td>
                          {/* <strong>{job.title}</strong> */}
                          {job.title}
                        </td>
                        <td>{job.type}</td>
                        <td>{job.location}</td>
                        <td>{job.salary}</td>
                        <td>{job.experience}</td>
                        <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="view-btn"
                              onClick={() => handleViewJob(job)}
                              title="View details"
                            >
                              👁️ View
                            </button>
                            <button
                              className="edit-btn"
                              onClick={() => handleEditJob(job)}
                              title="Edit job"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteJob(job.id)}
                              title="Delete job"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Contacted Tab */}
        {activeTab === "contacts" && (
          <div className="admin-content">
            <div className="contacts-table-container">
              {contacts.length === 0 ? (
                <div className="empty-state">
                  <h3>📭 No contact requests yet</h3>
                  <p>Users can reach you from the Contact Us page.</p>
                </div>
              ) : (
                <table className="contacts-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Received At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr key={c.id}>
                        <td>#{c.id}</td>
                        <td>{c.name}</td>
                        <td>
                          <a
                            href={`mailto:${c.email}`}
                            className="contact-email-link"
                          >
                            {c.email}
                          </a>
                        </td>
                        <td>{c.subject}</td>
                        <td className="contact-msg-cell">{c.message}</td>
                        <td>
                          {c.createdAt
                            ? new Date(c.createdAt).toLocaleString()
                            : "-"}
                        </td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteContact(c.id)}
                            disabled={deletingContactId === c.id}
                          >
                            {deletingContactId === c.id
                              ? "Deleting..."
                              : "🗑️ Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Support Tab – support tickets */}
        {activeTab === "support" && (
          <div className="admin-content">
            <div className="contacts-table-container">
              {tickets.length === 0 ? (
                <div className="empty-state">
                  <h3>📭 No support tickets yet</h3>
                  <p>Users can raise issues from the Support page.</p>
                </div>
              ) : (
                <table className="contacts-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Category</th>
                      <th>Subject</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((t) => (
                      <tr key={t.id}>
                        <td>#{t.id}</td>
                        <td>
                          <a
                            href={`mailto:${t.email}`}
                            className="contact-email-link"
                          >
                            {t.email}
                          </a>
                        </td>
                        <td>{t.category}</td>
                        <td>{t.subject}</td>
                        <td className="contact-msg-cell">{t.description}</td>
                        <td>{t.status}</td>
                        <td>
                          {t.createdAt
                            ? new Date(t.createdAt).toLocaleString()
                            : "-"}
                        </td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteTicket(t.id)}
                            disabled={deletingTicketId === t.id}
                          >
                            {deletingTicketId === t.id
                              ? "Deleting..."
                              : "🗑️ Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Post Job Form */}
        {activeTab === "postjob" && (
          <div className="admin-content">
            <div className="job-form-container">
              <h3>
                {editingJobId
                  ? `✏️ Edit Job #${editingJobId}`
                  : "💼 Post New Job"}
              </h3>
              <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
                {editingJobId
                  ? "Update this job posting. Changes will reflect on Careers page immediately."
                  : "Jobs posted here will appear live on the Careers page."}
              </p>
              <form onSubmit={handlePostJob} className="job-form">
                <div className="form-group">
                  <label>Job Title *</label>
                  <input
                    type="text"
                    value={jobForm.title || ""}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, title: e.target.value })
                    }
                    placeholder="e.g. Junior Full-Stack Developer"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Type *</label>
                    <select
                      value={jobForm.type || ""}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, type: e.target.value })
                      }
                      required
                    >
                      <option value="">Select type</option>
                      <option>Full-time · On-site / Hybrid</option>
                      <option>Full-time · Remote Friendly</option>
                      <option>Full-time</option>
                      <option>Part-time · Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      type="text"
                      value={jobForm.location || ""}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, location: e.target.value })
                      }
                      placeholder="e.g. Hyderabad, India"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Salary Range *</label>
                    <input
                      type="text"
                      value={jobForm.salary || ""}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, salary: e.target.value })
                      }
                      placeholder="e.g. ₹6-12 LPA"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Experience *</label>
                    <input
                      type="text"
                      value={jobForm.experience || ""}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, experience: e.target.value })
                      }
                      placeholder="e.g. 0-2 Years"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Summary *</label>
                  <textarea
                    rows="4"
                    value={jobForm.summary || ""}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, summary: e.target.value })
                    }
                    placeholder="Describe the role, tech stack, and requirements..."
                    required
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "flex-end",
                    marginTop: "1.5rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setJobForm({
                        title: "",
                        type: "",
                        location: "",
                        summary: "",
                        salary: "",
                        experience: "",
                      });
                      setEditingJobId(null);
                    }}
                    className="close-modal-btn"
                    disabled={postingJob}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={postingJob}
                    className="post-job-btn"
                  >
                    {postingJob
                      ? "Saving..."
                      : editingJobId
                      ? "Update Job"
                      : "Post Job Live"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* User Details Modal */}
        {viewModal && selectedUser && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="user-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>👤 {selectedUser.fullName} Details</h3>
                <button className="close-btn" onClick={closeModal}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="user-detail-grid">
                  <div>
                    <label>ID:</label>
                    <span>{selectedUser.id}</span>
                  </div>
                  <div>
                    <label>Full Name:</label>
                    <span>{selectedUser.fullName}</span>
                  </div>
                  <div>
                    <label>Email:</label>
                    <span>{selectedUser.email}</span>
                  </div>
                  <div>
                    <label>Phone:</label>
                    <span>{selectedUser.phone}</span>
                  </div>
                  <div>
                    <label>Location:</label>
                    <span>{selectedUser.location}</span>
                  </div>
                  <div>
                    <label>City:</label>
                    <span>{selectedUser.city}</span>
                  </div>
                  <div>
                    <label>College:</label>
                    <span>{selectedUser.collegeName}</span>
                  </div>
                  <div>
                    <label>CGPA:</label>
                    <span>{selectedUser.cgpa}</span>
                  </div>
                  <div>
                    <label>Company:</label>
                    <span>{selectedUser.currentCompany || "N/A"}</span>
                  </div>
                  <div>
                    <label>Role:</label>
                    <span
                      className={`role-badge role-${selectedUser.role.toLowerCase()}`}
                    >
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="close-modal-btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Application Details Modal */}
        {appModal && selectedApp && (
          <div className="modal-overlay" onClick={closeAppModal}>
            <div className="app-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>📋 Application #{selectedApp.id}</h3>
                <button className="close-btn" onClick={closeAppModal}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="app-detail-grid">
                  <div>
                    <label>Candidate:</label>
                    <span>{selectedApp.fullName}</span>
                  </div>
                  <div>
                    <label>Email:</label>
                    <span>{selectedApp.email}</span>
                  </div>
                  <div>
                    <label>Phone:</label>
                    <span>{selectedApp.phone}</span>
                  </div>
                  <div>
                    <label>Job ID:</label>
                    <span>#{selectedApp.jobId}</span>
                  </div>
                  <div>
                    <label>Job Title:</label>
                    <span>{selectedApp.jobTitle || "N/A"}</span>
                  </div>
                  <div>
                    <label>CGPA:</label>
                    <span>{selectedApp.cgpa}</span>
                  </div>
                  <div>
                    <label>Current Company:</label>
                    <span>{selectedApp.currentCompany || "N/A"}</span>
                  </div>
                  <div>
                    <label>Expected Salary:</label>
                    <span>₹{selectedApp.expectedSalary}</span>
                  </div>
                  <div>
                    <label>Resume:</label>
                    <span>{selectedApp.resumePath}</span>
                  </div>
                  <div>
                    <label>Status:</label>
                    <span
                      className={`status-badge status-${selectedApp.status.toLowerCase()}`}
                    >
                      {selectedApp.status}
                    </span>
                  </div>
                  <div>
                    <label>Applied:</label>
                    <span>
                      {new Date(selectedApp.appliedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="close-modal-btn" onClick={closeAppModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Job Details Modal */}
        {jobModal && selectedJob && (
          <div className="modal-overlay" onClick={closeJobModal}>
            <div className="job-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>💼 Job #{selectedJob.id} Details</h3>
                <button className="close-btn" onClick={closeJobModal}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="job-detail-grid">
                  <div>
                    <label>ID:</label>
                    <span>#{selectedJob.id}</span>
                  </div>
                  <div>
                    <label>Title:</label>
                    <span>{selectedJob.title}</span>
                  </div>
                  <div>
                    <label>Type:</label>
                    <span>{selectedJob.type}</span>
                  </div>
                  <div>
                    <label>Location:</label>
                    <span>{selectedJob.location}</span>
                  </div>
                  <div>
                    <label>Salary:</label>
                    <span>{selectedJob.salary}</span>
                  </div>
                  <div>
                    <label>Experience:</label>
                    <span>{selectedJob.experience}</span>
                  </div>
                  <div>
                    <label>Summary:</label>
                    <span>{selectedJob.summary}</span>
                  </div>
                  <div>
                    <label>Posted:</label>
                    <span>
                      {new Date(selectedJob.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="edit-btn"
                  onClick={() => handleEditJob(selectedJob)}
                >
                  ✏️ Edit Job
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteJob(selectedJob.id)}
                >
                  🗑️ Delete Job
                </button>
                <button className="close-modal-btn" onClick={closeJobModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
