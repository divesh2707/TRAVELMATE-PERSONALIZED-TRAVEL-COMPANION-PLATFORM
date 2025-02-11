import React from "react";
import "../styles/About_2.css"
import image from "../images/About_2.jpg"

const About_2=()=>{
    return(
        <div className="about_2">
           <h1 className="about-heading">Create Memories, Not Itineraries, with TravelMate</h1>
           <img className="about-image" src={image} alt="Person is Standing"></img>
           <p className="about-para">TravelMate is here to transform your travel planning into a smooth and exciting journey. 
            Whether you're looking for a weekend getaway or a grand adventure, 
            our platform customizes every detail to match your unique preferences. 
            From creating tailored travel packages to staying updated with real-time alerts and weather conditions, 
            we make sure your travels are stress-free and unforgettable. 
            Let TravelMate handle the planning while you focus on the adventure ahead!</p>
        </div>
    )
}

export default About_2;