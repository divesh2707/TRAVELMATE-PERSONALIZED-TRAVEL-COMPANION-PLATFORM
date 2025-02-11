import React from "react";
import error from "../images/Error.png"
import "../styles/PageNotFound.css"

const PageNotFound=()=>{
    return(
        <div className="PageNotFound">
            <div>
            <h1>TravelMate</h1>
            <p>The requested URL was not found on this server. That's all we know.</p>
            </div>
            <img src={error} />
        </div>
    );
};

export default PageNotFound;