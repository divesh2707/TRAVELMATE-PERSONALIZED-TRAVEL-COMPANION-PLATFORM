import React from "react";
import "../styles/About_4.css"
import PackageCard from "./PackageCard";

const About_4=()=>{
    return( 
        <div className="about-4">
            <h1 className="about4-heading" style={{paddingTop:"20px"}}>Handpicked Collections,</h1>
            <h1 className="about4-heading" style={{paddingBottom:"20px"}}>Tailored by Our Experts</h1>
            <div className="cards">
                <PackageCard id="2"/>
                <PackageCard id="1"/>
                <PackageCard id="3"/>
            </div>
        </div>
    )
};

export default About_4;