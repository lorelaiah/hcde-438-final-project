import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext.jsx"; 
import { logoutUser } from "../firebase/auth";
import { useState, useEffect } from "react";
import { db } from "../firebase/config.js";
import { doc, getDoc } from "firebase/firestore";

// profile page (with sign out button)
const Profile = () => {
    const navigate = useNavigate();
    const { currentUser, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!currentUser) {
        navigate("/");
    }

    const [profileData, setProfileData] = useState({ name: "", dateJoined: "" });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!currentUser) return;
            try {
                const ref = doc(db, "users", currentUser.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    const d = snap.data();
                    setProfileData({ name: d.name || "", dateJoined: d.dateJoined || "" });
                }
            } catch (err) {
                console.error("Failed to load profile data:", err);
            }
        };
        fetchProfile();
    }, [currentUser]);

    // log out user from firebase and then navigate to home page (which will display login)
    const handleSignOut = async () => {
        try {
        const { success, error } = await logoutUser();
        if (!success) {
            return;
        }
        navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

        return (
                <div className="auth-container">
                    <div className="auth-form-container">
                        <h2>Profile</h2>
                        <h3 style={{ marginTop: 6 }}>Hello, {profileData.name ? profileData.name : currentUser.email.split('@')[0]}</h3>
                        <p className="profile-meta" style={{ color: '#586069', marginTop: 6, marginBottom: 8, fontSize: '0.95rem' }}>
                                Joined: {profileData.dateJoined ? profileData.dateJoined : 'Unknown'} · {currentUser.email}
                        </p>

                        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </div>
                    </div>
                </div>
        );
};

export default Profile;