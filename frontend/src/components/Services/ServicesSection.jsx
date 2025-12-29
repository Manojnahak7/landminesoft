// import React from "react";
import React, { useState, useEffect } from "react";
import "../Services/ServicesSection.css";

const services = [
  {
    title: "Agentic AI, RAG & LLM Solutions",
    desc: "We build intelligent autonomous agents, retrieval‑augmented generation systems, and custom language models that automate workflows and decision‑making.",
  },
  {
    title: "Web & Software Product Development",
    desc: "We design and ship full‑stack web products and platforms with clean architecture, scalable APIs, and modern frontends tailored to your business.",
  },
  {
    title: "Cloud Platforms & DevOps",
    desc: "We architect, migrate, and optimize secure cloud platforms with CI/CD pipelines, observability, and best‑practice security baked in.",
  },
  {
    title: "AI‑Powered Analytics & Automation",
    desc: "We turn raw data into usable insights with ML pipelines, dashboards, and workflow automation that unlock faster, smarter decisions.",
  },
  {
    title: "Mobile & Web App Experiences",
    desc: "We craft high‑performance web and mobile interfaces that feel fast, intuitive, and consistent across devices and browsers.",
  },
  {
    title: "Architecture Consulting & Tech Strategy",
    desc: "We help you choose the right stack, design future‑proof architectures, and plan delivery roadmaps for your AI and software initiatives.",
  },
];
useEffect(() => {
  fetch(`${API_BASE}/api/analytics/track-visit`, { 
    method: 'POST',
    credentials: 'include' 
  }).catch(console.error);
}, []);


const ServicesSection = () => {
  return (
    <section className="sv-section">
      <div className="sv-header">
        <p className="sv-eyebrow">SERVICES WE OFFER</p>
        <h2 className="sv-title">
          Crafting digital excellence that drives
          <br />
          business transformation forward
        </h2>
      </div>

      <div className="sv-grid">
        {services.map((service) => (
          <div key={service.title} className="sv-card">
            <h3 className="sv-card-title">{service.title}</h3>
            <p className="sv-card-desc">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
