import React from "react";
import "../Strategy/StrategicPath.css";
import { Link } from "react-router-dom";

const cards = [
  {
    id: "01",
    title: "AI & Machine Learning Solutions",
    desc: "Design, train, and deploy custom AI/ML models that automate decisions, uncover patterns in your data, and power intelligent products.",
    footer: "Predictive Analytics · Recommendation Engines · Gen AI · NLP",
  },
  {
    id: "02",
    title: "Product & Software Development",
    desc: "Build robust web and backend systems with clean architecture, APIs, and integrations tailored to your business workflows and scale.",
    footer: "Custom Software · API Development · Microservices · Integrations",
  },
  {
    id: "03",
    title: "Mobile & Cloud‑Native Apps",
    desc: "Launch secure, high‑performance mobile and cloud apps that deliver seamless user experiences across platforms and devices.",
    footer: "iOS · Android · React Native · Cloud‑Native · DevOps",
  },
];

const StrategicPath = () => {
  return (
    <section className="sp-section">
      <div className="sp-header">
        <p className="sp-eyebrow">SELECT YOUR STRATEGIC PATH</p>
        <h2 className="sp-title">
          From AI/ML experimentation to full‑scale product engineering and cloud
          platforms, our team helps you ship reliable, production‑ready
          software.
        </h2>
      </div>

      <div className="sp-grid">
        {cards.map((card) => (
          <div key={card.id} className="sp-card">
            <div className="sp-card-inner">
              <div className="sp-card-number">{card.id}</div>

              <h3 className="sp-card-title">{card.title}</h3>

              <p className="sp-card-desc">{card.desc}</p>

              <p className="sp-card-footer">{card.footer}</p>

              <Link to="/contact">
                <button className="sp-card-cta">
                  Get Started <span>→</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StrategicPath;
