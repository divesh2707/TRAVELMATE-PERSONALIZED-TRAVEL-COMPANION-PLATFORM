import React, { useState, useEffect } from 'react';
import "../styles/About_5.css";
import axiosInstance from '../api/axios';

const About_5 = () => {
    const [captions, setCaptions] = useState([]); // Correctly destructuring useState

    useEffect(() => {
        const fetchCaptions = async () => {
            try {
                const response = await axiosInstance.get(`/blogs/captions`);
                // Take only the first 3 captions
                const topThreeCaptions = response.data.slice(0, 3);
                setCaptions(topThreeCaptions);
            } catch (err) {
                console.error('Error fetching captions', err);
            }
        };

        fetchCaptions();
    }, []); // Empty dependency array ensures this runs only once after the component mounts

    return (
        <div className='about_5'>
            <h1 className="about5-heading">User Experience</h1>
            <div className="captions-container">
                {captions.map((captionObj, index) => (
                    <div key={index} className="caption-item">
                        {captionObj.caption}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About_5;
