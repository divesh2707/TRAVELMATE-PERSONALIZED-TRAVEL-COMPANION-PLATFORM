import React, { useEffect, useState, useContext, useRef } from "react";
import AllPackageCard from "../components/AllPackageCard";
import axiosInstance from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import PageNotFound from "./PageNotFound";
import AdminDashboardNavbar from "../components/AdminDashboardNavbar";
import AdminPackageSearch from "../components/AdminPackageSearch";
import { TbSearchOff } from "react-icons/tb";
import "../styles/AdminAllPackages.css";

const AdminAllPackages = () => {
    const { isLoggedIn, user_role } = useContext(AuthContext);
    const [cities, setCities] = useState([]);
    const [ids, setIds] = useState([]);
    const [searchItem, setSearchItem] = useState("");

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axiosInstance.get("/cities/get/all");
                setCities(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCities();
    }, []);

    const adminResultRef = useRef(null);

    const getIds = (cityIds, city_name) => {
        setIds(cityIds);
        setSearchItem(city_name);

        if (adminResultRef.current) {
            adminResultRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const removeCityFromUI = (city_id) => {
        setCities((prevCities) => prevCities.filter((city) => city.id !== city_id));
    };

    if (!isLoggedIn || user_role !== "admin") {
        return <PageNotFound />;
    }

    // Filter the searched cities using ids
    const searchedCities = cities.filter((city) => ids.includes(city.id));

    return (
        <div style={{ backgroundColor: "#ffffff" }}>
            <div className="admin-all-packages-headers">
                <AdminDashboardNavbar />
                <h2>Travel Packages Overview</h2>
                <p>View & Manage Travel Packages</p>
                <div className="admin-search-div" ref={adminResultRef}>
                    <AdminPackageSearch getIds={getIds} />
                </div>
            </div>

            {/* Search Result Section */}
            <div className="admin-searchResult" style={{ marginBottom: "50px", marginTop:"0px" }}>
                {searchItem.length > 0 && (
                    <>
                        {searchedCities.length > 0 ? (
                            <>
                                <h3 className="admin-searchResult-h3">
                                    <span style={{ color: "#2196F3" }}>Searched</span> Tour Packages
                                </h3>
                                <div className="admin-searchResultflex">
                                    {searchedCities.map((city) => (
                                        <AllPackageCard
                                            key={city.id}
                                            city_name={city.city_name}
                                            image={city.image}
                                            city_id={city.id}
                                            removeCityFromUI={removeCityFromUI}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    gap: "20px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom:"0",
                                    paddingBottom:"0"
                                }}
                            >
                                <TbSearchOff size={130} color="black" />
                                <div>
                                    <h3 style={{ fontSize: "55px", margin: "0" }}>
                                        <span style={{ color: "#2196F3" }}>Sorry,</span> Nothing there!
                                    </h3>
                                    <p style={{ fontSize: "35px", marginTop: "5px", marginBottom:"0" }}>You can explore downwards</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Display All Packages */}
            <div className="admin-all-packages">
                {cities.map((city) => (
                    <AllPackageCard
                        key={city.id}
                        city_name={city.city_name}
                        image={city.image}
                        city_id={city.id}
                        removeCityFromUI={removeCityFromUI}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminAllPackages;
