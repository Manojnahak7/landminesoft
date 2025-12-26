import React, { useState, useEffect } from "react";
import "../profile/ProfilePage.css";
import { useAuth } from "../../context/AuthContext";

const API_BASE = "http://localhost:7689";

const ProfilePage = () => {
  const { user, login } = useAuth();

  const [activeTab, setActiveTab] = useState("myApplications"); // main: myApplications | profile
  const [activeInnerTab, setActiveInnerTab] = useState("active"); // inner: active | inactive

  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    location: "",
    city: "",
    pincode: "",
    phone: "",
    collegeName: "",
    degree: "",
    yearOfPassing: "",
    cgpa: "",
    currentCompany: "",
    currentPosition: "",
    currentSalary: "",
  });

  // Fetch user applications
  useEffect(() => {
    if (user) {
      fetchApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchApplications = async () => {
    if (!user) return;
    try {
      setLoadingApps(true);
      const res = await fetch(
        `${API_BASE}/api/auth/applications/user/${user.id}`
      );
      if (res.ok) {
        const data = await res.json();
        setApplications(data); // assume backend already sorted
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoadingApps(false);
    }
  };

  // Sync form with user data
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        location: user.location || "",
        city: user.city || "",
        pincode: user.pincode || "",
        phone: user.phone || "",
        collegeName: user.collegeName || "",
        degree: user.degree || "",
        yearOfPassing: user.yearOfPassing || "",
        cgpa: user.cgpa || "",
        currentCompany: user.currentCompany || "",
        currentPosition: user.currentPosition || "",
        currentSalary: user.currentSalary || "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <section className="profile-section">
        <div className="profile-card">
          <h2>Please log in to view your profile.</h2>
        </div>
      </section>
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/profile/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Update failed");
      }

      const data = await res.json();
      login({
        ...user,
        fullName: data.fullName,
        email: data.email,
        location: data.location,
        city: data.city,
        pincode: data.pincode,
        phone: data.phone,
        collegeName: data.collegeName,
        degree: data.degree,
        yearOfPassing: data.yearOfPassing,
        cgpa: data.cgpa,
        currentCompany: data.currentCompany,
        currentPosition: data.currentPosition,
        currentSalary: data.currentSalary,
      });

      setEditMode(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---- FILTERED APPLICATION LISTS ----
  const activeApps = applications.filter(
    (app) =>
      app.status === "PENDING" ||
      app.status === "IN_PROGRESS" ||
      app.status === "pending" ||
      app.status === "inprogress"
  );

  const inactiveApps = applications.filter(
    (app) => app.status === "REJECTED" || app.status === "rejected"
  );

  const renderAppsTable = (apps) => {
    if (apps.length === 0) {
      return (
        <div className="empty-state">
          <h3>No applications found</h3>
          <p>Apply to jobs and they will show up here.</p>
        </div>
      );
    }

    return (
      <table className="apps-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Job Req</th>
            <th>My Application Status</th>
            <th>Date Submitted</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <tr key={app.id}>
              <td>{app.jobTitle || "Job Application"}</td>
              <td>{app.jobReqCode || app.jobReqId || "-"}</td>
              <td>
                <span className={`status-pill ${app.status}`}>
                  {String(app.status || "")
                    .replace("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </td>
              <td>
                {app.appliedAt
                  ? new Date(app.appliedAt).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <section className="profile-section">
      {/* MAIN TABS under navbar */}
      <div className="profile-tabs-wrapper">
        <button
          className={`profile-main-tab ${
            activeTab === "myApplications" ? "active" : ""
          }`}
          onClick={() => setActiveTab("myApplications")}
        >
          My Applications
        </button>
        <button
          className={`profile-main-tab ${
            activeTab === "profile" ? "active" : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </div>

      {/* CONTENT CARD */}
      <div className="profile-content-wrapper">
        {activeTab === "myApplications" && (
          <div className="applications-page">
            {/* inner tabs + refresh */}
            <div className="app-inner-tabs">
              <button
                className={`app-inner-tab ${
                  activeInnerTab === "active" ? "active" : ""
                }`}
                onClick={() => setActiveInnerTab("active")}
              >
                Active ({activeApps.length})
              </button>
              <button
                className={`app-inner-tab ${
                  activeInnerTab === "inactive" ? "active" : ""
                }`}
                onClick={() => setActiveInnerTab("inactive")}
              >
                Inactive ({inactiveApps.length})
              </button>

              <button
                className="refresh-btn"
                onClick={fetchApplications}
                disabled={loadingApps}
              >
                {loadingApps ? "Loading..." : "Refresh"}
              </button>
            </div>

            {/* table area */}
            <div className="applications-card-wrapper">
              {loadingApps ? (
                <div className="loading-state">Loading applications...</div>
              ) : activeInnerTab === "active" ? (
                renderAppsTable(activeApps)
              ) : (
                renderAppsTable(inactiveApps)
              )}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="profile-page">
            <div className="profile-header-row">
              <h2>Your profile</h2>
              <button
                type="button"
                className="profile-edit-btn"
                onClick={() => setEditMode((p) => !p)}
                disabled={loading}
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            <p className="profile-subtitle">
              All details stored in your Landmine Soft account.
            </p>

            {error && <div className="profile-error">{error}</div>}

            <form className="profile-grid" onSubmit={handleSave}>
              <div>
                <label>Full name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  readOnly={!editMode}
                  required
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  readOnly={!editMode}
                  required
                />
              </div>
              <div>
                <label>Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  readOnly={!editMode}
                  required
                />
              </div>
              <div>
                <label>City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  readOnly={!editMode}
                  required
                />
              </div>
              <div>
                <label>Pincode</label>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  readOnly={!editMode}
                  required
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  readOnly={!editMode}
                  required
                />
              </div>
              <div>
                <label>College name</label>
                <input
                  name="collegeName"
                  value={form.collegeName}
                  onChange={handleChange}
                  readOnly={!editMode}
                  required
                />
              </div>
              <div>
                <label>Degree</label>
                <input
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  readOnly={!editMode}
                  required
                />
              </div>
              <div>
                <label>Year of passing</label>
                <input
                  name="yearOfPassing"
                  value={form.yearOfPassing}
                  onChange={handleChange}
                  readOnly={!editMode}
                  required
                />
              </div>
              <div>
                <label>CGPA</label>
                <input
                  name="cgpa"
                  value={form.cgpa}
                  onChange={handleChange}
                  readOnly={!editMode}
                  required
                />
              </div>
              <div>
                <label>Current company</label>
                <input
                  name="currentCompany"
                  value={form.currentCompany}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>
              <div>
                <label>Current position</label>
                <input
                  name="currentPosition"
                  value={form.currentPosition}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>
              <div>
                <label>Current salary</label>
                <input
                  name="currentSalary"
                  value={form.currentSalary}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>

              {editMode && (
                <button
                  type="submit"
                  className="profile-save-btn"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save changes"}
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
