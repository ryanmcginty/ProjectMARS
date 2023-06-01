import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './login.css';

const Login = () => {

    const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
    
    useEffect(() => {
        if(isAuthenticated && user) {
            const { name } = user;
            localStorage.setItem("username", name);
            window.location.href = "/";
        }
    }, [isAuthenticated, user]);

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isAuthenticated) {
        return null;
    }

    return (
        <span className="login-button" onClick={() => loginWithRedirect()}>Login</span>
    );
};

export default Login;