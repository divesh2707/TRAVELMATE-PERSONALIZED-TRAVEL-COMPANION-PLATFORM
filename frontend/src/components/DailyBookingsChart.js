import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DailyBookingsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/adminDashboard/charts/daily-bookings");
        const formattedData = res.data.map(item => ({
          ...item,
          booking_date: new Date(item.booking_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching daily bookings:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h3 style={{ fontSize: "25px", margin: "0px", paddingLeft:"60px" }}>
        <span style={{ color: "#2196F3" }}>Bookings</span> Over Time
      </h3>
      <div style={{ width: "500px", height: "220px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="booking_date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_bookings" name="Total Bookings" fill="rgb(14, 41, 74)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default DailyBookingsChart;