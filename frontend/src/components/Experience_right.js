import React, { useState, useEffect } from 'react';
import PackageCard from './PackageCard';
import "../styles/Experience_right.css";
import axiosInstance from '../api/axios';

const Experience_right=()=>{
    const [captions, setCaptions] = useState([]); // Correctly destructuring useState

    useEffect(() => {
        const fetchCaptions = async () => {
            try {
                const response = await axiosInstance.get(`/blogs/captions`);
                // Take only the first 3 captions
                const topThreeCaptions = response.data.slice(0, 1);
                setCaptions(topThreeCaptions);
            } catch (err) {
                console.error('Error fetching captions', err);
            }
        };

        fetchCaptions();
    }, []); // Empty dependency array ensures this runs only once after the component mounts

    return(
        <div className="right">
            <h1 className="heading-right">"Top Pick: Explore Now!"</h1>
             <PackageCard id="5"/>
             <div className="captions-right">
             <h1 className="heading-right" style={{marginRight:"60px"}}> "Most Loved Review"</h1>
                {captions.map((captionObj, index) => (
                    <div key={index} className="caption-item-right">
                        {captionObj.caption}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Experience_right