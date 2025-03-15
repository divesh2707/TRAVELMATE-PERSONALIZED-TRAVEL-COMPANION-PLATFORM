import React, { useState } from "react";
import BookingHistoryNavbar from "../components/BookingHistoryNavbar.js";
import BookingHistoryFilter from "./BookingHistoryFilter";
import "../styles/BookingHistoryHeader.css";

const BookingHistoryHeader = ({filters, onFilterChange, resetFilters}) => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    return (
        <div className="booking-history-header-2">
            <BookingHistoryNavbar />
            <h1>Journey Log</h1>
            <button className="booking-history-filter-button" onClick={() => setIsFilterModalOpen(true)}>
                Filter
            </button>

            {isFilterModalOpen && (
                <div className="booking-history-filter-modal">
                    <div className="booking-history-filter-modal-content">
                        <BookingHistoryFilter
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

export default BookingHistoryHeader;
