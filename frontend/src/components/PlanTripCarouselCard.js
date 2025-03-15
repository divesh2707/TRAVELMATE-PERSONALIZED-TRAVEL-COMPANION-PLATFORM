import React , {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios.js';
import { Buffer } from "buffer";
import "../styles/PlanTripCarouselCard.css"

const PlanTripCarouselCard=(props)=>{
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

    if (!packageDetails) return <p></p>;

    const { city, package: packageInfo } = packageDetails;
    const { city_name, image } = city;
    const { package_cost } = packageInfo[0]; 

    const getImageSrc = (buffer) => {
        const base64String = Buffer.from(buffer.data).toString('base64'); // Use Node.js Buffer for conversion
        return `data:image/jpeg;base64,${base64String}`;
    };

    const handleCardClick = () => {
        navigate(`/packageDetail/${props.id}`); // Navigate to the package details page with the package ID
    };

    return(
        <div className="PlanTripCarouselCardContainer" onClick={handleCardClick} role="button">
            <img src={getImageSrc(image)} alt="city_name" className="PlanTripCarouselCardImage" /> 
            <h4 className="PlanTripCarouselCardName">{city_name}</h4>
            <p className="PlanTripCarouselCardCost"> Starting From <strong>₹{package_cost}</strong></p>
        </div>
    );
};

export default PlanTripCarouselCard;