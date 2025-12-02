import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => (
    <nav>
        <Link to="/">MOOD TRACKING </Link>

        <Link to="/recommendations"> RECOMMENDATIONS </Link>

        <Link to="/login"> LOGIN </Link>

        <Link to="/profile"> PROFILE</Link>
    </nav>
);

export default Navbar;