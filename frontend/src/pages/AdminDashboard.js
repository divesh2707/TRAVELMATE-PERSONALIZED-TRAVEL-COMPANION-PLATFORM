import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PageNotFound from "./PageNotFound";
import AdminDashboardNavbar from "../components/AdminDashboardNavbar";
import TrendingBookingsChart from "../components/TrendingBookings";
import DailyBookingsChart from "../components/DailyBookingsChart";
import DailyRevenueChart from "../components/DailyRevenueChart";
import AdminDashboardCarousel from "../components/AdminDashboardCarousel";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const { isLoggedIn, user_role } = useContext(AuthContext);

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
            <div>
                <AdminDashboardCarousel />
            </div>
            <div className="chart-dashboard-container">
                <h3 className="chart-dashboard-heading">Trends & Insights</h3>
                <div className="chart-dashboard-flex" >
                    <div className="chart-left-side">
                        <div className="chart-container">
                            <DailyBookingsChart />
                        </div>
                        <div className="chart-container">
                            <DailyRevenueChart />
                        </div>
                    </div>
                    <div className="chart-container">
                        <TrendingBookingsChart />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
