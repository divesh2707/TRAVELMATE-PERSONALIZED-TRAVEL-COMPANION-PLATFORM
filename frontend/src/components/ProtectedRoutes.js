import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, Navigate, useParams } from "react-router-dom";

// In your ProtectedRoutes component
const ProtectedRoutes = ({ element, source }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);  // Destructure loading from context
  const location = useLocation();
  const { city_id } = useParams();

  // Prevent any redirects or component rendering until the loading is complete
  if (loading) {
    return null; // Or a loading spinner, if you prefer
  }

  if (location.state === null && (source === "booking" || source === "payment")) {
    return <Navigate to="/planYourTrip" state={{ from: source }} />;
  }

  if (!isLoggedIn && source === "exp") {
    return <Navigate to="/login" state={{ source: "exp" }} />;
  }

  if (!isLoggedIn && source === "CustomizePackageDetails") {
    return <Navigate to="/login" state={{ source: "CustomizePackageDetails", city_id: city_id }} />;
  }

  return element;
};

export default ProtectedRoutes;

