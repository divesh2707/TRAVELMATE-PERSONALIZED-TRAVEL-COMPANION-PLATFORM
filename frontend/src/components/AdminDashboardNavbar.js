import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminDashboardNavbar.css"
import { MdDashboardCustomize } from "react-icons/md";

const AdminDashboardNavbar=()=>{
    const navigate = useNavigate();
    return(
        <div className="admin-navbar">
            <Link to="/adminDashboard">Overview</Link>
            <Link to="/adminDashboard/BookingAndCustomers">Booking & Customers</Link>
            <Link to="/adminDashboard/allPackages">Tour Packages</Link>
            <button onClick={() => navigate("/adminDashboard/createPackage")}> <MdDashboardCustomize size={25}/> Create New Package</button>
        </div>
    );
};


export default AdminDashboardNavbar;