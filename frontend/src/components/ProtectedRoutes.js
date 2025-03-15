import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, Navigate, useParams } from "react-router-dom";

// In your ProtectedRoutes component
const ProtectedRoutes = ({ element, source }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);  // Destructure loading from context
  const location = useLocation();
  const { user_id } = useParams();

  // Prevent any redirects or component rendering until the loading is complete
  if (loading) {
    return null; // Or a loading spinner, if you prefer
  }

  if (location.state === null && (source === "booking" || source === "payment")) {
    return <Navigate to="/planYourTrip" state={{ from: source }} />;
  }

  if (location.state === null && (source === "bookingPackageDetails" )) {
    return <Navigate to="/bookingHistory" state={{ from: source }} />;
  }

  if (location.state === null && (source === "CustomerbookingPackageDetails" )) {
    return <Navigate to={`/adminDashboard/BookingAndCustomers/CustomersHistory/${user_id}`} state={{ from: source }} />;
  }

  if (!isLoggedIn && source === "exp") {
    return <Navigate to="/login" state={{ source: "exp" }} />;
  }

  if (!isLoggedIn && source === "CustomizePackageDetails") {
    return <Navigate to="/404" />;
  }

  if(!isLoggedIn && source === "profile") {
    return <Navigate to="/login" state={{ source: "profile"}} />
  }

  if(!isLoggedIn && source === "history") {
    return <Navigate to="/login" state={{ source: "history"}} />
  }

  return element;
};

export default ProtectedRoutes;

