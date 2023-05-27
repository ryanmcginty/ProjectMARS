import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './login.css';

const Login = () => {

    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const [username] = useState("");
    const [password] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        try {
            await loginWithRedirect({
                screen_hint: "login",
                login_hint: username,
                password,
            });
        } catch (error) {
            setErrorMessage("Error logging in.");
        }
    };

    useEffect(() => {
        if(isAuthenticated) {
            window.location.href = "/";
        }
    }, [isAuthenticated]);

    if(isLoading) {
        return <div>Loading...</div>
    }

    return (
    <div className="login-page-container">
        <h2>Login</h2>
        {errorMessage && <p style={{ color: 'red', fontWeight: 650 }}>{errorMessage}</p>}
        <form className="form-container">
            <button className="login-button" type="button" onClick={handleLogin}>Login</button>
        </form>
    </div>
    );
};

export default Login;