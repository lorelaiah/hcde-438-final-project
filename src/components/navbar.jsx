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
            <Link to="/login"> LOGIN </Link>

        </nav>
        )
    };
    return (
        <nav>
            <Link to="/">MOOD TRACKING </Link>

            <Link to="/recommendations"> RECOMMENDATIONS </Link>

            <Link to="/profile"> PROFILE</Link>
        </nav>
    );

};

export default Navbar;