import React from 'react';
import "../styles/LearnButton.css"

const LearnButton=({ onClick })=>{
    return (
        <button className="learnButton" onClick={onClick}>Learn More</button>
    )
}

export default LearnButton;