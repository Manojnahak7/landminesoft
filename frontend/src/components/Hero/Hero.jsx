import React from "react";
import "./Hero.css";
import heroVideo from "../../assets/video1.mp4"; // 👈 apna video
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      {/* Background video */}
      <video
        className="hero-video"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay for readability */}
      <div className="hero-overlay" />

      {/* Content (left aligned) */}
      <div className="hero-content">
        <div className="hero-left">
          <h1>Building Intelligent Products for a Digital-First World</h1>

          <p>
            We design and build AI-powered software, modern web platforms, and
            cloud-native solutions tailored to your business.
          </p>

          <div className="hero-buttons">
            <Link to="/schedule">
              <button className="primary-btn">
                Schedule a Free Consultation
              </button>
            </Link>
            <Link to="/view">
              <button className="secondary-btn">View Our Projects</button>
            </Link>
          </div>
        </div>

        {/* Snow only on right side area */}
        <div className="hero-snow-right" />
      </div>
    </section>
  );
};

export default Hero;
