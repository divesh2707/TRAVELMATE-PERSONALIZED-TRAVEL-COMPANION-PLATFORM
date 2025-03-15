import React, { useState } from "react";
import CustomersHistoryFilter from "./CustomersHistoryFilter.js";
import "../styles/BookingHistoryHeader.css";
import AdminDashboardNavbar from "./AdminDashboardNavbar.js";

const CustomersHistoryHeader = ({filters, onFilterChange, resetFilters}) => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    return (
        <div className="booking-history-header-2" style={{paddingTop:"10px"}}>
            <AdminDashboardNavbar />
            <h1>Traveller's Journey Log</h1>
            <button className="booking-history-filter-button" onClick={() => setIsFilterModalOpen(true)} style={{top:"23px", right:"60px"}}>
                Filter
            </button>

            {isFilterModalOpen && (
                <div className="booking-history-filter-modal">
                    <div className="booking-history-filter-modal-content">
                        <CustomersHistoryFilter
                            filters={filters} 
                            onFilterChange={onFilterChange}
                            resetFilters={resetFilters}
                            setIsFilterModalOpen={setIsFilterModalOpen}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomersHistoryHeader;
