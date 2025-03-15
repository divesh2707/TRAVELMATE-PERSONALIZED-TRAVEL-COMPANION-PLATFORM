import React from "react";
import "../styles/FeatureCard.css";

const FeatureCard = (props) => {
  return (
    <div className="feature-card-container">
      <div className="feature-card-logo">
        <props.logo size={45} />
      </div>
      <div className="feature-card-name">{props.name}</div>
      <div className="feature-card-description">{props.Description}</div>
    </div>
  );
};

export default FeatureCard;
