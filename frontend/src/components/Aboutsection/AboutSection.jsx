import React from "react";
import "../Aboutsection/AboutSection.css";

const AboutSection = () => {
  return (
    <section id="about" className="about">
      <div className="about-inner">
        <div className="about-left">
          <p className="about-eyebrow">ABOUT LANDMINE SOFT</p>
          <h2 className="about-title">
            We build AI‑driven products and
            <br />
            reliable software platforms.
          </h2>
          <p className="about-text">
            Landmine Soft is a small, focused engineering team based in India,
            helping startups and enterprises ship AI‑powered applications,
            modern web platforms, and cloud‑native backends.
          </p>
          <p className="about-text">
            From prototypes to production systems, we work closely with your
            team—owning architecture, development, testing, and deployment—so
            you get a partner who cares about real business outcomes, not just
            tickets.
          </p>
        </div>

        <div className="about-right">
          <div className="about-stat">
            <span className="about-stat-number">10+</span>
            <span className="about-stat-label">Projects delivered</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-number">3+</span>
            <span className="about-stat-label">Core engineers</span>
          </div>
          <div className="about-stat">
            <span className="about-stat-number">4+</span>
            <span className="about-stat-label">
              Tech stacks (AI, Web, Cloud)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
