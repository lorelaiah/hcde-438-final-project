import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext.jsx"; 
import { logoutUser } from "../firebase/auth";

// profile page (with sign out button)
const Profile = () => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { currentUser, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    // if nobody is logged in take them immediately to the home page (which will show login)
    if (!currentUser) {
        navigate("/");
    }

    // log out user from firebase and then navigate to home page (which will display login)
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
            <h1>Profile</h1>
            <p>Hello, {currentUser.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Profile;