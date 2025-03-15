import React , {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios.js';
import { Buffer } from 'buffer';
import { FaHotel } from "react-icons/fa";
import { FaTaxi } from "react-icons/fa";
import { TbTrekking } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/PackageCard.css"

const PackageCard=(props)=>{

    const [packageDetails, setPackageDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await axiosInstance.get(`/packages/details/${props.id}`);
                setPackageDetails(response.data);
                
            } catch (error) {
                console.error('Error fetching package details:', error);
            }
        };
    
        fetchPackageDetails();
    }, [props.id]);

    if (!packageDetails) return  <div className="package-card">
    <Skeleton height={230} width="100%" />
    <Skeleton height={50} width="80%" style={{ marginTop: 10 }} />
</div>;

    const { city, package: packageInfo, famousPlaces } = packageDetails;
    const { city_name, image } = city;
    const { no_of_days, package_description, package_cost } = packageInfo[0]; 

    const getImageSrc = (buffer) => {
        const base64String = Buffer.from(buffer.data).toString('base64'); // Use Node.js Buffer for conversion
        return `data:image/jpeg;base64,${base64String}`;
    };

    const handleCardClick = () => {
        navigate(`/packageDetail/${props.id}`); // Navigate to the package details page with the package ID
    };

    return(
        <div className="package-card" onClick={handleCardClick} role="button">  
            <img src={getImageSrc(image)} alt="city_name" className="package-image" /> 
            <p className="days">{no_of_days}D {no_of_days-1}N</p>
            <p className="city-name">{city_name}</p>
            <div className="icons">
               <span className="iconandtextwrap"> < FaHotel size={20}/> <span className="icon-text">1 Hotel</span> </span>
               <span className="iconandtextwrap"> < TbTrekking size={20}/> <span className="icon-text">{famousPlaces.length} Activities</span> </span>
               <span className="iconandtextwrap"> < FaTaxi size={20}/> <span className="icon-text">PickDrop</span> </span>
            </div>
            <div className="footer">   
            <p className="description">{package_description}</p>
            <p className="price">₹ {package_cost}.00</p>
            </div>
        </div>
    )
};

export default PackageCard;
