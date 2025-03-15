import React,{useState} from "react";
import axiosInstance from "../api/axios";
import { IoSearch } from "react-icons/io5";

const AdminPackageSearch=({getIds})=>{
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
          alert("Please enter a city name");
          return;
        }
    
        try {
          const response = await axiosInstance.get(`/cities/search/${searchTerm.trim()}`);
          const cityIds = response.data.map((city) => city.id); // Adjust based on API response structure
          getIds(cityIds, searchTerm.trim()); // Pass cityIds to parent component
        } catch (err) {
          console.error(err);
          alert("Error fetching city details. Please try again.");
        }
      };
    
      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleSearch(); // Trigger search on Enter key press
        }
      };
    

    return(
         <div className="searchContainer2">
              <span>
                <IoSearch size={30} color="#777" />
              </span>
              <input
                className="searchbar"
                type="text"
                placeholder="Find Your Best-Selling Adventure!"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown} // Listen for keydown events
              />
              <button className="searchbarButton" onClick={handleSearch}>
                Search
              </button>
            </div>
    );
};

export default AdminPackageSearch;