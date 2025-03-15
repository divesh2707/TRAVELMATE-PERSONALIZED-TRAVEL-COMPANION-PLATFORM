import React from "react";


const ForgetPasswordProfile = ({ ForgetPassword, passwordForms, profileEmail }) => {
    return (
        <div className="forget-password-container-profile">
            <div className="forget-password-box-profile">
                <h2>🔐 Password Reset</h2>
                <p className="reset-text-profile">
                    A password reset link has been sent to: <br />
                    <strong>{profileEmail}</strong>
                </p>
                <p className="reset-instructions-profile">
                    Please check your email and follow the instructions to reset your password.  
                    If you don’t see the email, check your spam folder.
                </p>
                <button className="back-button-profile-forget" onClick={() => { ForgetPassword(); passwordForms(); }}>
                    ← Back to Profile Settings
                </button>
            </div>
        </div>
    );
};

export default ForgetPasswordProfile;
