import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => (
    <nav>
        <Link to="/">home page</Link>
        <Link to="/mood-tracking">mood tracking</Link>
        <Link to="/recommendations">recommendations</Link>
        <Link to="/profile">login/profile</Link>
    </nav>
);

export default Navbar;