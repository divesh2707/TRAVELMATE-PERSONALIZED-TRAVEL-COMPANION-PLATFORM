import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios.js";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DailyRevenueChart = () => {
  const [data, setData] = useState([]);
  const [maxRevenue, setMaxRevenue] = useState(0);
  const [tickValues, setTickValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/adminDashboard/charts/daily-revenue");
        const formattedData = res.data.map(item => ({
          ...item,
          booking_date: new Date(item.booking_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }));

        setData(formattedData);

        // Find max revenue
        const maxVal = Math.max(...formattedData.map(item => item.daily_revenue));

        // Round max revenue to the nearest multiple of 25,000
        const roundedMax = Math.ceil(maxVal / 50000) * 50000;
        setMaxRevenue(roundedMax);

        // Generate tick values at equal intervals (25,000)
        const ticks = [];
        for (let i = 0; i <= roundedMax; i += 50000) {
          ticks.push(i);
        }
        setTickValues(ticks);

      } catch (error) {
        console.error("Error fetching daily revenue:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
       <h3 style={{ fontSize: "25px", margin: "0px", paddingLeft:"60px" }}><span style={{ color: "#2196F3" }}>Revenue</span> Over Time</h3>
      <div style={{ width: "500px", height: "200px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="booking_date" />
            <YAxis 
              domain={[0, maxRevenue]} 
              tickFormatter={(value) => value.toLocaleString()} 
              ticks={tickValues} // Ensure equal spacing on Y-axis
            />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="daily_revenue" name="Revenue" stroke="rgb(14, 41, 74)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default DailyRevenueChart;
