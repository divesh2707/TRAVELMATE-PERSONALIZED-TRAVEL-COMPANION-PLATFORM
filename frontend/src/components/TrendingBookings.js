import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios.js";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

const TrendingBookingsChart = () => {
  const [data, setData] = useState([]);
  const COLORS = ["#ff0000", "#008000", "#0000ff", "#ff8c00","#ffff00", "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d2691e"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/adminDashboard/charts/trending-bookings");
        const formattedData = res.data.map(item => ({
          ...item,
          total_bookings: Number(item.total_bookings), // Convert to number
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching bookings by city:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <>
      <h3 style={{ fontSize: "25px", margin: "0px ", padding:"0" }}><span style={{ color: "#2196F3" }}>Trending Packages </span>  </h3>
      <h3 style={{ fontSize: "25px", margin: "0px ", padding:"0", paddingLeft:"5px" }}> ( Last 30 Days )</h3>
      <div style={{ width: "500px", height: "490px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total_bookings"
              nameKey="city_name"
              cx="50%"
              cy="50%"
              outerRadius={160}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="right"  wrapperStyle={{ fontSize: "20px", fontWeight: "bold" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default TrendingBookingsChart;
