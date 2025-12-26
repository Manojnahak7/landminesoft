import React, { useState } from "react";
import "./Support.css";

// const API_BASE = "http://localhost:7689";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Support = () => {
  const [form, setForm] = useState({
    email: "",
    category: "TECHNICAL",
    subject: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      // Agar backend me support ticket endpoint banaoge:
      // POST /api/support/tickets
      const res = await fetch(`${API_BASE}/api/support/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to create support request");
      }

      setSuccess(
        "Support request created. Our team will contact you on email shortly."
      );
      setForm({
        email: "",
        category: "TECHNICAL",
        subject: "",
        description: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="support-section">
      <div className="support-container">
        {/* Left: Intro + FAQ */}
        <div className="support-left">
          <h1>Support</h1>
          <p className="support-subtitle">
            Facing an issue with careers portal or applications? Raise a support
            request and the team will respond as soon as possible.
          </p>

          <div className="support-faq-list">
            <div className="support-faq-card">
              <h3>Application status</h3>
              <p>
                You can track your application in the My Applications section of
                your profile. Status moves from Pending → In Progress →
                Rejected.
              </p>
            </div>
            <div className="support-faq-card">
              <h3>Login or signup issues</h3>
              <p>
                Try clearing browser cache and logging in again. If it still
                fails, raise a support ticket with error screenshot.
              </p>
            </div>
            <div className="support-faq-card">
              <h3>Technical problems</h3>
              <p>
                Mention browser, device, and exact steps to reproduce the issue.
                This helps resolve the problem faster.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="support-right">
          <h2>Create support ticket</h2>
          <p className="support-form-subtitle">
            Fill the form below and our support team will get back to you.
          </p>

          {success && <div className="support-success">{success}</div>}
          {error && <div className="support-error">{error}</div>}

          <form className="support-form" onSubmit={handleSubmit}>
            <div className="support-field">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="support-field">
              <label>Issue type</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="TECHNICAL">Technical issue</option>
                <option value="ACCOUNT">Account / Login</option>
                <option value="APPLICATION">Application / Job related</option>
                <option value="OTHER">Something else</option>
              </select>
            </div>

            <div className="support-field">
              <label>Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="Short summary of the issue"
              />
            </div>

            <div className="support-field">
              <label>Describe your issue</label>
              <textarea
                name="description"
                rows="5"
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Explain what went wrong and steps to reproduce..."
              />
            </div>

            <button
              type="submit"
              className="support-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit support request"}
            </button>

            <p className="support-small-note">
              For urgent issues, you can also email{" "}
              <a href="mailto:support@landminesoft.com">
                support@landminesoft.com
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Support;
