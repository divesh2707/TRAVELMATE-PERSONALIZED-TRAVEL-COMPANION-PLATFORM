import React, { useState, useEffect } from 'react';
import "../styles/CustomCarousel.css"

const CustomCarousel = ({ images, interval = 1500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
  
    return () => clearInterval(timer); // Clean up the timer
  }, [currentIndex, interval]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}

      {/* Navigation Buttons */}
      <button type="button" className="carousel-btn left" onClick={handlePrev}>
        &#10094; {/* Left arrow */}
      </button>
      <button type="button" className="carousel-btn right" onClick={handleNext}>
        &#10095; {/* Right arrow */}
      </button>

      {/* Indicators */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
          >
            &#8212; {/* Dash */}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
