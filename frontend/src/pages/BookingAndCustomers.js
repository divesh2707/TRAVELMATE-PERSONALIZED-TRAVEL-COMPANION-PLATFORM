import React, { useState, useEffect, useCallback, useContext } from "react";
import PageNotFound from "./PageNotFound";
import axiosInstance from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/BookingAndCustomers.css";
import { Buffer } from "buffer";
import AdminDashboardNavbar from "../components/AdminDashboardNavbar";
import { FaUser } from "react-icons/fa";
import "../styles/AdminDashboard.css";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const BookingAndCustomers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(false);
    const { isLoggedIn, user_role } = useContext(AuthContext);


    // Function to fetch all users
    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/users/all");
            const sortedUsers = res.data.sort((a, b) => a.user_id - b.user_id);
            setUsers(sortedUsers);
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Function to fetch only booked users
    const fetchBookedUsers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/users/allBooked");
            const sortedUsers = res.data.sort((a, b) => a.user_id - b.user_id);
            setUsers(sortedUsers);
        } catch (err) {
            console.error("Error fetching booked users:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch users based on filter
    useEffect(() => {
        if (filter) {
            fetchBookedUsers();
        } else {
            fetchUsers();
        }
    }, [filter, fetchUsers, fetchBookedUsers]);

    if (!isLoggedIn || user_role !== "admin") {
        return <PageNotFound />;
    }

    return (
        <>
            <div className="admin-dashboard">
                <AdminDashboardNavbar />
                <h3>TravelMate</h3>
                <p>A Personalized Travel Companion Platform</p>
            </div>

            <div className="booking-and-customers-toggle-whole-container">
                <span className="booking-and-customers-toggle-label">Show Booking Holders</span>
                <div className={`booking-and-customers-toggle-container ${filter ? "filter-on" : ""}`} onClick={() => setFilter((prev) => !prev)}>
                    <div className="booking-and-customers-toggle-circle"></div>
                    <span className="booking-and-customers-toggle-text">{filter ? "ON" : "OFF"}</span>
                </div> 
            </div>


            <div className="booking-and-customers-container">
                <h2 className="booking-and-customers-title">
                    <span style={{ color: "#2196F3" }}>Registered</span> Travelers Overview
                </h2>

                <div className="booking-and-customers-list">
                    {loading ? (
                        <div style={{ marginLeft: "670px", marginTop: "50px" }}>
                            <Loader />
                        </div>
                    ) : (
                        users.map((user) => (
                            <div key={user.user_id} className="booking-and-customers-card" onClick={()=>{
                                navigate(`/adminDashboard/BookingAndCustomers/CustomersHistory/${user.user_id}`)
                            }}>
                                <div className="booking-and-customers-company">
                                    Travel<span style={{ color: "#ccc" }}>Mate</span>
                                </div>

                                {user.profile_photo ? (
                                    <img
                                        src={`data:image/jpeg;base64,${Buffer.from(user.profile_photo.data).toString("base64")}`}
                                        alt="Profile"
                                        className="booking-and-customers-avatar"
                                    />
                                ) : (
                                    <div style={{ marginTop: "70px", backgroundColor: "#e7e7e7", paddingTop: "3px" }}>
                                        <FaUser size={100} color="#000050" />
                                    </div>
                                )}

                                <h3>{user.username.toUpperCase()}</h3>
                                <div className="booking-and-customers-user-data">
                                    <p className="booking-and-customers-user-data-p">ID : 00000{user.user_id}</p>
                                    <p className="booking-and-customers-user-data-p">{user.email}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default BookingAndCustomers;
