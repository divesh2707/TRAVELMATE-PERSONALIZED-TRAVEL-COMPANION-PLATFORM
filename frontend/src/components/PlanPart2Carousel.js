import React, { useRef } from "react";
import PackageCard from "../components/PackageCard.js";
import "../styles/PlanPart2Carousel.css"

const PlanPart2Carousel=()=>{
    const carouselRef = useRef(null);

    const scrollLeft = () => {
      carouselRef.current.scrollBy({
        left: -400, // Adjust based on the card width + margin
        behavior: "smooth",
      });
    };
  
    const scrollRight = () => {
      carouselRef.current.scrollBy({
        left: 400, // Adjust based on the card width + margin
        behavior: "smooth",
      });
    };
  
  
    return(
        <div className="plan-part2-carousel">
      <h3 className="plan-part2-carousel-h3">
        <span style={{ color: "#2196F3" }}>Explore</span> The Hidden Gems
      </h3>
      <p className="plan-part2-carousel-p">Tap into the untapped tourist spots for amazing vacations</p>
      <div className="carousel-container">
        <button className="carousel-btn left-btn" onClick={scrollLeft}>
        &#10094;
        </button>
        <div className="carousel" ref={carouselRef}>
          <PackageCard id="1" />
          <PackageCard id="2" />
          <PackageCard id="3" />
          <PackageCard id="4" />
          <PackageCard id="5" />
          <PackageCard id="6" />
        </div>
        <button className="carousel-btn right-btn" onClick={scrollRight}>
        &#10095;
        </button>
      </div>
    </div>

    );
};

export default PlanPart2Carousel;