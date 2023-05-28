import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    const onClose = () => {
        navigate('/')
    };

    if (isLoading) {
    return <div>Loading ...</div>;
    }

    return (
    isAuthenticated && (
        <div>
            <div className="menu-bar"></div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div className="back-button-LG">
                <button className="rainbow-button" color="back" onClick={onClose}>Back</button>
            </div>  
        </div>
    )
    );
};

export default Profile;