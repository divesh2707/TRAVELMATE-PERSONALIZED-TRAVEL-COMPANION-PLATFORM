import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PageNotFound from "./PageNotFound";
import AddCity from "../components/AddCity";
import AddHotel from "../components/AddHotel";
import AddPlace from "../components/AddPlace";
import AddPackage from "../components/AddPackage";


const CreatePackage = () => {
    const { isLoggedIn, user_role } = useContext(AuthContext);
    const [step, setStep] = useState(1);
    const [cityId, setCityId] = useState(null);
    const [hotelCount, setHotelCount]= useState(0);

    const handleNext = () => setStep(step + 1);

    const handleBack = () => setStep(step - 1);

    const fetchHotelCount = (c) =>{
        setHotelCount(c);
    }


    if (!isLoggedIn || user_role !== "admin") {
        return <PageNotFound />;
    }

    return (
        <div>
            {step === 1 && <AddCity onNext={handleNext} onBack={handleBack} setCityId={setCityId} cityId={cityId} />}
            {step === 2 && <AddHotel cityId={cityId} onBack={handleBack} onNext={handleNext} fetchHotelCount={fetchHotelCount}/>}
            {step === 3 && <AddPlace cityId={cityId} onBack={handleBack} onNext={handleNext} hotelCount={hotelCount}/>}
            {step === 4 && <AddPackage cityId={cityId} onBack={handleBack} />}
        </div>
    );
};

export default CreatePackage;
