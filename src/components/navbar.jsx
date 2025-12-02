import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => (
    <nav>
        <Link to="/">MOOD TRACKING </Link>
        <br></br>
        {/* <Link to="/mood-tracking">mood tracking</Link> */}
        {/* <br></br> */}
        <Link to="/recommendations">RECOMMENDATIONS </Link>
        <br></br>
        <Link to="/login">LOGIN</Link>
        <br></br>
        <Link to="/profile">PROFILE</Link>
    </nav>
);

export default Navbar;