import React, { useRef } from 'react';
import About_1 from '../components/About_1';
import About_2 from '../components/About_2';
import About_3 from '../components/About_3';
import About_4 from '../components/About_4';
import About_5 from '../components/About_5';
import AboutFooter from '../components/AboutFooter';

const About =() =>{

    const about2Ref = useRef(null); // Reference to About_2 section

    // Function to scroll smoothly to About_2
    const handleScrollToAbout2 = () => {
    about2Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };


    return(
        <div>
            <About_1 onLearnMoreClick={handleScrollToAbout2}/>
            <div ref={about2Ref}>
                <About_2 />
            </div>
            <About_3 />
            <About_4 />
            <About_5 />
            <AboutFooter onLearnMoreClick={handleScrollToAbout2}/>
        </div>
    );
};

export default About;