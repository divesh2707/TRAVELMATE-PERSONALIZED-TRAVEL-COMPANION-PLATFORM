import React from 'react';
import Nav_bar from './Nav_bar';
import LearnButton from './LearnButton'
import "../styles/About_1.css";

const About_1 =({ onLearnMoreClick }) =>{
    return(
        <div className='about_1'>
            <Nav_bar />
            <p className='custom-text'>WELCOME TO</p>
            <h1>TravelMate</h1>
            <p className='custom-text2'>A Personalized Travel Companion Platform</p>
            <LearnButton onClick={onLearnMoreClick}/>
        </div>

    );
};

export default About_1;