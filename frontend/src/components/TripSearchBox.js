import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { IoSearch } from "react-icons/io5";
import "../styles/TripSearchBox.css";

const TripSearchBox = ({ getIds }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm.trim().length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axiosInstance.get(`/cities/search/${searchTerm}`);
        setSuggestions(response.data);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300); // Debounce API calls
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a city name");
      return;
    }

    try {
      const response = await axiosInstance.get(`/cities/search/${searchTerm.trim()}`);
      console.log(response.data)
      const cityIds = response.data.map((city) => city.id);
      getIds(cityIds, searchTerm.trim());
      setShowSuggestions(false);
    } catch (err) {
      console.error(err);
      getIds([], searchTerm.trim());
    }
  };

  const handleSuggestionClick = (cityName) => {
    setSearchTerm(cityName);
    setShowSuggestions(false);
  };

  return (
    <div className="searchContainer2">
      <span>
        <IoSearch size={30} color="#777" />
      </span>
      <input
        className="searchbar"
        type="text"
        placeholder="You dream it, we make it happen!"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        onFocus={() => setShowSuggestions(suggestions.length > 0)}
      />
      <button className="searchbarButton" onClick={handleSearch}>
        Search
      </button>

      {showSuggestions && (
        <ul className="suggestionDropdown">
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleSuggestionClick(city.city_name)}>
              {city.city_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TripSearchBox;
