import React from "react";
import "../styles/CreatePackageHeader.css"

const CreatePackageHeader=({active})=>{
    return(
        <div className="CreatePackageHeader">
            <h1 className="CreatePackagewebsite">TravelMate</h1>
            <div className="CreatePackagepages">
                <div className="CreatePackagecurrentpage">
                    <div className={`CreatePackagepageno ${active!=1 ? "CreatePackageactive" : ""}`}>1</div>
                    <p>City Details</p>
                </div>
                <div className="CreatePackagecurrentpage">
                    <div className={`CreatePackagepageno ${active!=2 ? "CreatePackageactive" : ""}`}>2</div>
                    <p>Hotels Details</p>
                </div>
                <div className="CreatePackagecurrentpage">
                    <div className={`CreatePackagepageno ${active!=3 ? "CreatePackageactive" : ""}`}>3</div>
                    <p>Places Details</p>
                </div>
                <div className="CreatePackagecurrentpage">
                    <div className={`CreatePackagepageno ${active!=4 ? "CreatePackageactive" : ""}`}>4</div>
                    <p>Package Details</p>
                </div>
            </div>
        </div>
    )
};

export default CreatePackageHeader;