// src/components/ViewProject/ViewProject.jsx
import React from "react";
import "../Viewproject/ViewProject.css";

const ViewProject = () => {
  return (
    <section className="coming-soon-section">
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <div className="icon-wrapper">
            <div className="rocket-icon">🚀</div>
          </div>

          <h1 className="coming-soon-title">Coming Soon</h1>

          <p className="coming-soon-text">
            We're working hard to bring you an amazing project viewing
            experience. Stay tuned for the launch!
          </p>

          <div className="features-preview">
            <h3>What's Coming:</h3>
            <ul>
              <li>📊 Detailed project analytics</li>
              <li>🔄 Real-time updates</li>
              <li>📱 Responsive design</li>
              <li>⚡ Fast performance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewProject;
