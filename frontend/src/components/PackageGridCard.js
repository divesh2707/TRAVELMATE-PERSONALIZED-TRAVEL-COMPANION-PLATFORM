import React , {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../api/axios.js';
import { Buffer } from "buffer";
import "../styles/PackageGridCard.css"

const PackageGridCard=(props)=>{
    
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

    if (!packageDetails) return <p>Loading...</p>;

    const { city, package: packageInfo } = packageDetails;
    const { city_name, image } = city;
    const { no_of_days } = packageInfo[0]; 

    const getImageSrc = (buffer) => {
        const base64String = Buffer.from(buffer.data).toString('base64'); // Use Node.js Buffer for conversion
        return `data:image/jpeg;base64,${base64String}`;
    };

    const handleCardClick = () => {
        navigate(`/packageDetail/${props.id}`); // Navigate to the package details page with the package ID
    };

    return(
        <div style={{height:`${props.height}`, width:`${props.width}`}} className="packageGridCardContainer" onClick={handleCardClick} role="button">
            <img src={getImageSrc(image)} alt="city_name" className="packageGridCardImage" /> 
            <h4 className="packageGridCardName">{city_name}</h4>
            <h6 className="packageGridCardDays">{no_of_days} Days / {no_of_days-1} Nights</h6>
        </div>
    );
};

export default PackageGridCard;