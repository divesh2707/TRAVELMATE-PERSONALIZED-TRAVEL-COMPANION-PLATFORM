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
import CreatePackage from "./pages/CreatePackage";
import AdminAllPackages from "./pages/AdminAllPackages";
import EditPackage from "./pages/EditPackage";
import AdminPackageDetails from "./pages/AdminPackageDetail";
import BookingHistory from "./pages/BookingHistory";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import BookingPackageDetail from "./pages/BookingPackageDetail";
import BookingAndCustomers from "./pages/BookingAndCustomers";
import CustomersHistory from "./pages/CustomersHistory";
import CustomerBookingPackageDetails from "./pages/CustomerBookingPackageDetails";

const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));

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
                <Route path="/adminDashboard" element={<AdminDashboard />} />
                <Route path="/adminDashboard/createPackage" element={<CreatePackage />} />
                <Route path="/adminDashboard/allPackages" element={<AdminAllPackages/>} />
                <Route path="/adminDashboard/editPackage/:city_id" element={ <EditPackage />}/>
                <Route path="/reset-password/:token" element={ <ResetPassword />} />
                <Route path="/adminDashboard/PackageDetails/:city_id" element={ <AdminPackageDetails />}/>
                <Route path="/adminDashboard/BookingAndCustomers" element={ <BookingAndCustomers />}/>
                <Route path="/profile" element={<ProtectedRoutes element={<Profile />} source="profile" />} />
                <Route path="/bookingHistory" element={<ProtectedRoutes element={<BookingHistory />} source="history" />} />
                <Route path="/adminDashboard/BookingAndCustomers/CustomersHistory/:user_id" element={<CustomersHistory />} />
                <Route path="/adminDashboard/BookingAndCustomers/CustomersHistory/:user_id/PackageDetail/:city_id"  element={<ProtectedRoutes element={<CustomerBookingPackageDetails />} source="CustomerbookingPackageDetails" />} />
                <Route path="/bookedPackageDetails/:city_id" element={<ProtectedRoutes element={<BookingPackageDetail />} source="bookingPackageDetails" />} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </Router>
    );
};

export default App;
