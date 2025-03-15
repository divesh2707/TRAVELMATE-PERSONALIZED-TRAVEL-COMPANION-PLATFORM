import React, {useContext, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import PageNotFound from "./PageNotFound";
import EditCity from "../components/EditCity";
import EditHotel from "../components/EditHotel";
import EditPlace from "../components/EditPlace";
import EditPackageDetails from "../components/EditPackageDetails";
import { useParams } from "react-router-dom";

const EditPackage=()=>{
    const { isLoggedIn, user_role } = useContext(AuthContext);
    const [step, setStep] = useState(1);
    const [hotelCount, setHotelCount]= useState(0); 
    const {city_id} = useParams();

    const handleNext = () => setStep(step + 1);

    const handleBack = () => setStep(step - 1);

    const fetchHotelCount = (c) =>{
        setHotelCount(c);
    }

    if (!isLoggedIn || user_role !== "admin") {
        return <PageNotFound />;
    }

    return(
        <div>
            {step === 1 && <EditCity onNext={handleNext} onBack={handleBack} cityId={city_id} />}
            {step === 2 && <EditHotel cityId={city_id} onBack={handleBack} onNext={handleNext} fetchHotelCount={fetchHotelCount}/>}
            {step === 3 && <EditPlace cityId={city_id} onBack={handleBack} onNext={handleNext} hotelCount={hotelCount}/>}
            {step === 4 && <EditPackageDetails cityId={city_id} onBack={handleBack} />}
        </div>
    );
};

export default EditPackage;