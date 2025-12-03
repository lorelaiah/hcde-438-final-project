import React from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from "../components/authContext.jsx"; 

const Navbar = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div>loading...</div>
        );
    }

    if (!currentUser) {
        return (
        <nav>
            <h2>ReFlect</h2>
        </nav>
        )
    };
    return (
        <nav>
            <h2>ReFlect</h2>
            <Link className="nav-link" to="/">MOOD TRACKING </Link>
            <Link className="nav-link" to="/recommendations"> RECOMMENDATIONS </Link>
            <Link className="nav-link" to="/profile"> PROFILE</Link>
        </nav>
    );

};

export default Navbar;