import React from "react";
import "../Whylandmine/WhyLandmineSoft.css";

const reasons = [
  {
    title: "Experienced engineering team",
    desc: "Work with developers who build AI, web, and cloud projects in real production—clean architecture, readable code, and modern best practices by default.",
  },
  {
    title: "Clear timelines & commitments",
    desc: "Every project starts with a defined scope, milestones, and delivery dates, so you always know what is shipping next and when.",
  },
  {
    title: "End‑to‑end ownership",
    desc: "From requirements and UX to development, testing, and deployment, our team stays responsible for the outcome—not just individual tasks.",
  },
  {
    title: "Transparent communication",
    desc: "Regular stand‑ups, demo calls, and status updates keep you in the loop, with one point of contact for decisions and escalations.",
  },
];

const WhyLandmineSoft = () => {
  return (
    <section className="why-section">
      <div className="why-header">
        <p className="why-eyebrow">WHY LANDMINE SOFT?</p>
        <h2 className="why-title">
          Building your product with an experienced team
          <br />
          that commits to timelines and outcomes.
        </h2>
      </div>

      <div className="why-grid">
        {reasons.map((item) => (
          <div key={item.title} className="why-card">
            <h3 className="why-card-title">{item.title}</h3>
            <p className="why-card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyLandmineSoft;
