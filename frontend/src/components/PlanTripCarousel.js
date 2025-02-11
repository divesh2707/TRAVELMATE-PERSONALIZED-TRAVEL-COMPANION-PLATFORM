import React, { useState, useEffect } from 'react';
import PlanTripCarouselCard from "./PlanTripCarouselCard";
import "../styles/PlanTripCarousel.css"

const PlanTripCarousel = ({ interval = 1500 }) => {
  const ids=[4,5,6];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ids.length);
    }, interval);
  
    return () => clearInterval(timer); // Clean up the timer
  }, [currentIndex, interval, ids.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ids.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ids.length - 1 : prevIndex - 1
    );
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
    <h3 className="planTripcarousel-h3">
        <span style={{ color: "#2196F3" }}>Top</span> Trending Destinations</h3>
        <p className="planTripcarousel-p">Explore the hottest travel spots around the globe.</p>
    <div className="PlanTripcarousel">
        {ids.map((id, index) => (
          <div
            key={index}
            className={`PlanTripcarousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <PlanTripCarouselCard id={id} />
          </div>
        ))}

      {/* Navigation Buttons */}
      <button className="PlanTripcarousel-btn left" onClick={handlePrev}>
        &#10094; {/* Left arrow */}
      </button>
      <button className="PlanTripcarousel-btn right" onClick={handleNext}>
        &#10095; {/* Right arrow */}
      </button>

      {/* Indicators */}
      <div className="PlanTripcarousel-indicators">
        {ids.map((_, index) => (
          <span
            key={index}
            className={`PlanTripindicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
          >
            &#8212; {/* Dash */}
          </span>
        ))}
      </div>
    </div>
    </>
  );
};

export default PlanTripCarousel;
