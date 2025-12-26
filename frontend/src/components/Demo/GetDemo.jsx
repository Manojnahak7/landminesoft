import React, { useState } from "react";
import "../Demo/GetDemo.css";

const API_BASE = "http://localhost:7689";

const GetDemo = () => {
  const products = [
    {
      key: "ECOM",
      icon: "🛍️",
      name: "E‑Commerce",
      tagline: "Scale your online store",
      title: "E‑Commerce Solutions",
      description:
        "Custom storefronts, order management, payments and analytics for high‑growth online brands.",
    },
    {
      key: "APPS",
      icon: "📱",
      name: "Apps",
      tagline: "Build modern apps",
      title: "Web & Mobile Apps",
      description:
        "Full‑stack product development for SaaS, internal tools and customer‑facing applications.",
    },
    {
      key: "CLOUD",
      icon: "☁️",
      name: "Cloud",
      tagline: "Cloud‑native platforms",
      title: "Cloud & DevOps",
      description:
        "Design, deploy and manage scalable cloud infrastructure on AWS, Azure and GCP.",
    },
    {
      key: "AI",
      icon: "🤖",
      name: "AI",
      tagline: "AI‑powered products",
      title: "AI & Automation",
      description:
        "Integrate AI assistants, recommendation engines and workflow automation into your products.",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // New state

  const handleRequestDemo = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setForm({ fullName: "", email: "", phone: "" });
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!selectedProduct) return;

  //   setSubmitting(true);
  //   try {
  //     const res = await fetch(`${API_BASE}/api/demo-requests`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         productType: selectedProduct.key, // ECOM / APPS / CLOUD / AI
  //         productName: selectedProduct.name,
  //         fullName: form.fullName,
  //         email: form.email,
  //         phone: form.phone,
  //       }),
  //     });

  //     if (!res.ok) {
  //       const txt = await res.text();
  //       alert(txt || "Failed to submit demo request");
  //       return;
  //     }

  //     alert("Demo request submitted successfully!");
  //     closeModal();
  //   } catch (err) {
  //     alert(err.message || "Something went wrong");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/demo-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: selectedProduct.key,
          productName: selectedProduct.name,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        alert(txt || "Failed to submit demo request");
        return;
      }

      // Success message set karo instead of alert
      setSuccessMessage(
        "Demo request submitted successfully! Our team will contact you soon."
      );

      // 2 second baad modal close karo
      setTimeout(() => {
        closeModal();
        setSuccessMessage(""); // Clear message
      }, 2000);
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <section className="demo-center">
        <div className="demo-center-inner">
          <header className="demo-center-header">
            <h1>Product Demo Center</h1>
            <p>
              Explore our E‑Commerce, Apps, Cloud and AI solutions with a
              personalized demo from our product experts.
            </p>
          </header>

          <div className="demo-card-grid">
            {products.map((p) => (
              <article key={p.key} className="demo-card">
                <div className="demo-card-top">
                  <div className="demo-card-icon">{p.icon}</div>
                  <div className="demo-card-product">
                    <h3>{p.name}</h3>
                    <span>{p.tagline}</span>
                  </div>
                </div>

                <div className="demo-card-body">
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                </div>

                <button
                  className="demo-card-btn"
                  onClick={() => handleRequestDemo(p)}
                >
                  REQUEST A DEMO
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Simple modal (no external library) */}
      {isModalOpen && selectedProduct && (
        <div className="demo-modal-overlay" onClick={closeModal}>
          <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <h3>Request a {selectedProduct.name} demo</h3>
              <button className="demo-modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <p className="demo-modal-subtitle">
              Share your details and our team will schedule a{" "}
              <strong>{selectedProduct.name}</strong> product walkthrough.
            </p>

            {successMessage ? (
              <div className="demo-success-message">
                <div className="success-icon">✅</div>
                <p>{successMessage}</p>
              </div>
            ) : (
              <form className="demo-modal-form" onSubmit={handleSubmit}>
                <div className="demo-modal-field">
                  <label>Full name *</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="demo-modal-field">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div className="demo-modal-field">
                  <label>Phone number *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91‑XXXXXXXXXX"
                  />
                </div>

                <button
                  type="submit"
                  className="demo-modal-submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GetDemo;
