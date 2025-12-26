// src/components/ScheduleFreeConsultation/ScheduleFreeConsultation.jsx
import React, { useState } from "react";
import "../Schedule/ScheduleFreeConsultation.css";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const ScheduleFreeConsultation = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budgetRange: "",
    preferredDate: "",
    preferredTime: "",
    meetingType: "video",
    projectSummary: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // const res = await fetch("http://localhost:7689/api/consultations", {
const res = await fetch(`${API_BASE}/api/consultations`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        budgetRange: "",
        preferredDate: "",
        preferredTime: "",
        meetingType: "video",
        projectSummary: "",
      });
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="schedule-section">
      <div className="schedule-container">
        <div className="schedule-header">
          <h2>Schedule a Free Consultation</h2>
          <p>
            Share a few details about your software or product idea and pick a
            suitable time. Our team will get back to you to confirm the meeting.
          </p>
        </div>

        <form className="schedule-form" onSubmit={handleSubmit}>
          {/* Row 1: Name + Email */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">
                Full Name <span>*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Work Email <span>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 2: Company + Phone */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company / Organization</label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Company name (optional)"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone / WhatsApp</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3: Project Type + Budget */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="projectType">What do you want to build?</label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="web-app">Web Application</option>
                <option value="mobile-app">Mobile App</option>
                <option value="saas-platform">SaaS Platform</option>
                <option value="ai-solution">AI / Automation</option>
                <option value="modernization">
                  Modernize existing product
                </option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="budgetRange">Estimated budget</label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
              >
                <option value="">Select a range</option>
                <option value="<30K">Below ₹30K</option>
                <option value="<50K">Below ₹50K</option>
                <option value="<1L">Below ₹1L</option>
                <option value="<2L">Below ₹2L</option>
                <option value="2-5L">₹2L – ₹5L</option>
                <option value="5-10L">₹5L – ₹10L</option>
                <option value="10L+">₹10L and above</option>
              </select>
            </div>
          </div>

          {/* Row 4: Date + Time */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="preferredDate">
                Preferred date <span>*</span>
              </label>
              <input
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="preferredTime">
                Preferred time (IST) <span>*</span>
              </label>
              <input
                id="preferredTime"
                name="preferredTime"
                type="time"
                value={formData.preferredTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 5: Meeting Type */}
          <div className="form-row">
            <div className="form-group">
              <label>Meeting type</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="meetingType"
                    value="video"
                    checked={formData.meetingType === "video"}
                    onChange={handleChange}
                  />
                  Video call
                </label>
                <label>
                  <input
                    type="radio"
                    name="meetingType"
                    value="phone"
                    checked={formData.meetingType === "phone"}
                    onChange={handleChange}
                  />
                  Phone call
                </label>
              </div>
            </div>
          </div>

          {/* Project Summary */}
          <div className="form-group">
            <label htmlFor="projectSummary">
              Tell us about your project <span>*</span>
            </label>
            <textarea
              id="projectSummary"
              name="projectSummary"
              rows={4}
              placeholder="Share what you want to build, who it is for, and any timelines or key requirements."
              value={formData.projectSummary}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Request Consultation"}
            </button>
            {submitted && (
              <p className="success-msg">
                Thank you! Your request has been received. We will reach out
                shortly to confirm the meeting.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ScheduleFreeConsultation;
