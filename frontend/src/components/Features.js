import React from "react";
import FeatureCard from "./FeatureCard.js";
import { BiSolidCustomize } from "react-icons/bi";
import { IoWalletSharp } from "react-icons/io5";
import { GoCodeReview } from "react-icons/go";
import { MdPayment } from "react-icons/md"; // Icon for POA
import "../styles/Features.css";

const Features = () => {
    return (
        <>
            <h3 className="Features-h3">
                <span style={{ color: "#2196F3" }}>Why</span> Book With Us?
            </h3>
            <p className="Features-p">Discover the unrivaled benefits that promise memorable journeys all along.</p>
            <div className="Features">
                <FeatureCard 
                    name="Customizable Travel Packages" 
                    logo={BiSolidCustomize}
                    Description="Personalize your trip by selecting activities, and hotels for a unique experience." 
                />
                <FeatureCard 
                    name="Social Feed for Travel Stories"  
                    logo={GoCodeReview}
                    Description="Share posts, browse others' experiences, and engage with likes and comments." 
                />
                <FeatureCard 
                    name="Wallet-Friendly Pricing Options"  
                    logo={IoWalletSharp}
                    Description="Explore budget-friendly packages with clear cost details." 
                />
                <FeatureCard 
                    name="Pay on Arrival (POA)"  
                    logo={MdPayment}
                    Description="Book your package online and pay securely upon arrival at your destination." 
                />
            </div>
        </>
    );
};

export default Features;
