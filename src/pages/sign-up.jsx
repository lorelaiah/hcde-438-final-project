import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../firebase/auth";
import { db } from "../firebase/config.js";
import { doc, setDoc } from "firebase/firestore";


const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
        }

        if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
        }

        setLoading(true);

        try {
        const { user, error } = await signUpUser(email, password);
        
        if (error) {
            setError(error);
            return;
        }

        const date = new Date();
        const newData = {
            uid : user.uid,
            name : userName,
            email : email,
            password : password,
            dateJoined : date.toLocaleDateString()
        }
        try {
            await setDoc(doc(db, "users", user.uid), newData);
        } catch (error) {
            console.error("Error saving user:", error);
        }
        
        navigate("/");
        } catch (err) {
        setError("Failed to create an account. Please try again.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="auth-container">
        <div className="auth-form-container">
            <h2>Create Account</h2>
            {error && <div className="auth-error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="userName">Your name</label>
                    <input
                    type="userName"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="auth-button"
                    disabled={loading}
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </button>
            </form>
            
            <div className="auth-link">
            Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
        </div>
    );
};

export default SignUp;