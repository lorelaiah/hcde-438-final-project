import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext.jsx"; 
import { logoutUser } from "../firebase/auth";
import { doc } from "firebase/firestore";

const Profile = () => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { currentUser, loading } = useAuth();

    if (!currentUser) {
        navigate("/login");
    }

    const handleSignOut = async () => {
        setError("");
        setMessage("");
        
        try {
        const { success, error } = await logoutUser();
        
        if (!success) {
            setError(error || "Failed to log out");
            return;
        }
        
        navigate("/");
        } catch (err) {
        setError("An unexpected error occurred");
        }
    };


    return (
        <div>
            <h1>profile</h1>
            <p>{currentUser.email}</p>
            <button onClick={handleSignOut}>sign out</button>
        </div>
    );
};


export default Profile;