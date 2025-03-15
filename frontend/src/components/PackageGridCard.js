import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios.js";
import { Buffer } from "buffer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/PackageGridCard.css";

const PackageGridCard = (props) => {
    const [packageDetails, setPackageDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await axiosInstance.get(`/packages/details/${props.id}`);
                setPackageDetails(response.data);
            } catch (error) {
                console.error("Error fetching package details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackageDetails();
    }, [props.id]);

    const getImageSrc = (buffer) => {
        const base64String = Buffer.from(buffer.data).toString("base64");
        return `data:image/jpeg;base64,${base64String}`;
    };

    const handleCardClick = () => {
        navigate(`/packageDetail/${props.id}`);
    };

    return (
        <div
            style={{ height: `${props.height}`, width: `${props.width}` }}
            className="packageGridCardContainer"
            onClick={handleCardClick}
            role="button"
        >
            {loading ? (
                <>
                    <Skeleton height={150} width="100%" />
                    <Skeleton height={20} width="80%" style={{ marginTop: 10 }} />
                    <Skeleton height={15} width="60%" />
                </>
            ) : (
                <>
                    <img src={getImageSrc(packageDetails.city.image)} alt={packageDetails.city.city_name} className="packageGridCardImage" />
                    <h4 className="packageGridCardName">{packageDetails.city.city_name}</h4>
                    <h6 className="packageGridCardDays">
                        {packageDetails.package[0].no_of_days} Days / {packageDetails.package[0].no_of_days - 1} Nights
                    </h6>
                </>
            )}
        </div>
    );
};

export default PackageGridCard;
