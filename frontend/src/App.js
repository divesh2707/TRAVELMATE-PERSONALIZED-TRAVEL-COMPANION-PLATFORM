import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Experiences from "./pages/Experiences";
import PackageDetails from "./pages/PackageDetails";
import Booking from "./pages/Booking";
import ProtectedRoutes from "./components/ProtectedRoutes"; // Import the ProtectedRoute
import Payment from "./pages/Payment";
import PlanYourTrip from "./pages/PlanYourTrip";
import CustomizePackageDetails from "./pages/CustomizePackageDetails";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/packageDetail/:id" element={ <PackageDetails />}/>
                <Route path="/CustomizePackageDetail/:city_id" element={ <ProtectedRoutes element={<CustomizePackageDetails />} source="CustomizePackageDetails" />}/>
                <Route path="/planYourTrip" element={ <PlanYourTrip />}/>
                <Route path="/Login" element={<Login />} />
                <Route path="/Experiences" element={<ProtectedRoutes element={<Experiences />} source="exp" />} />
                <Route path="/booking/:package_id/:city_name" element={<ProtectedRoutes element={<Booking />} source="booking" />} />
                <Route path="/booking/:package_id/:city_name/payment" element={<ProtectedRoutes element={<Payment />} source="payment" />} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </Router>
    );
};

export default App;
