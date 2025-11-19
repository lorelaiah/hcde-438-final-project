import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => (
    <nav>
        <Link to="/">home page</Link>
        <Link to="/profile">profile</Link>
        <button>sign out</button>
    </nav>
);

export default Navbar;