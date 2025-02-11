import React from "react";
import PackageGridCard from "./PackageGridCard";
import "../styles/PlanGrid.css"


const PlanGrid=()=>{
    return(
        <div className="plangrid">
        <h3 className="plangrid-h3"><span style={{ color: "#2196F3" }}>Deals</span> You Can't Miss</h3>
        <p className="plangrid-p">Travel beyond boundaries with incredible savings</p>
            <div className="plangridContainer">
            <div className="plangriditem1"><PackageGridCard id="6" height="240px" width="470px" /></div>
            <div className="plangriditem2"><PackageGridCard id="5" height="490px" width="306.66px" /></div>
            <div className="plangriditem3"><PackageGridCard id="2" height="240px" width="460px" /></div>
            <div className="plangriditem4"><PackageGridCard id="4" height="240px" width="230px" /></div>
            <div className="plangriditem5"><PackageGridCard id="3" height="240px" width="230px" /></div>
            <div className="plangriditem6"><PackageGridCard id="1" height="240px" width="460px" /></div>
            </div>
        </div>
    );
};

export default PlanGrid;