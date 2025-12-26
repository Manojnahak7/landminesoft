import React, { useState } from "react";
import "./ContactUs.css";

// const API_BASE = "http://localhost:7689"; 
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
      // yaha apni API hit karo
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Something went wrong");
      }

      setSuccess("Thank you! Your message has been sent.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message || "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-card">
        <h2>Contact us</h2>
        <p className="contact-subtitle">
          Have any questions or feedback? Drop a message and we will get back to
          you.
        </p>

        {success && <div className="contact-success">{success}</div>}
        {error && <div className="contact-error">{error}</div>}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-row">
            <div className="contact-field">
              <label>Your name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-field">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="contact-field">
            <label>Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-field">
            <label>Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="contact-submit-btn"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send message"}
          </button>
        </form>

        <div className="contact-extra">
          <p>
            Or reach us directly at{" "}
            <a href="mailto:support@landminesoft.com">
              support@landminesoft.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
