import React, { useState} from 'react';
import ProfileChangeEmail from './ProfileChangeEmail';
import ProfileChangeUsername from './ProfileChangeUsername';
import ProfileChangePassword from './ProfleChangePassword';
import ProfileChangePhoto from './ProfileChangePhoto';
import ForgetPasswordProfile from './ForgetPasswordProfile';
import "../styles/EditProfile.css";

const EditProfile = ({editProfile}) => {
    const [showPasswordForms, setShowPasswordForms] = useState(false);
    const [showForgetPassword, setShowForgetPassword] = useState(false);
    const [message, setMessage]= useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [profileEmail, setProfileEmail]= useState("");

    const passwordForms=()=>{
        setShowPasswordForms(!showPasswordForms);
    }

    const ForgetPassword=()=>{
        setShowForgetPassword(!showForgetPassword);
    }

    return (
        <>      
            <div className='edit-profile-forms'>
                <ProfileChangePhoto />
                {!showForgetPassword && !showPasswordForms && <ProfileChangeUsername />}
                {!showForgetPassword && !showPasswordForms && <ProfileChangeEmail setProfileEmail={setProfileEmail}/>}
                {message && (<p className={`message-edit-profile ${showMessage ? 'fade-in' : 'fade-out'}`}>{message}</p>)}
                {!showForgetPassword &&  <ProfileChangePassword editProfile={editProfile} passwordForms={passwordForms} showPasswordForms={showPasswordForms} 
                setMessage={setMessage} setShowMessage={setShowMessage} ForgetPassword={ForgetPassword} profileEmail={profileEmail}/>}
                {showForgetPassword && <ForgetPasswordProfile ForgetPassword={ForgetPassword} passwordForms={passwordForms} profileEmail={profileEmail}/>}
            </div>
        </>
    );
};

export default EditProfile;
