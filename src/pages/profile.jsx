import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext.jsx"; 
import { logoutUser } from "../firebase/auth";

// profile page (with sign out button)
const Profile = () => {
    const navigate = useNavigate();
    const { currentUser, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!currentUser) {
        navigate("/");
    }

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
        <div>
            <h1>Profile</h1>
            <p>Hello, {currentUser.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Profile;