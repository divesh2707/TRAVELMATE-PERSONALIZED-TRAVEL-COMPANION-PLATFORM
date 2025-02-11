import React from "react";
import "../styles/About_3.css"
import PackageCard from "./PackageCard";

const About_3=()=>{
    return(
        <div className="about-3">
            <h1 className="about3-heading">Top Trending Getaways</h1>
            <div className="cards">
                <PackageCard id="5"/>
                <PackageCard id="4"/>
                <PackageCard id="6"/>
            </div>
        </div>
    )
};

export default About_3;