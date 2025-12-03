import {Link} from 'react-router-dom';
import { useAuth } from "../components/authContext.jsx"; 

// navbar with links to mood tracking, recommendations, and profile if logged in (no links displayed if not logged in)
const Navbar = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div>loading...</div>
        );
    }

    // if no user is logged in, do not show any other links (they need to login first)
    if (!currentUser) {
        return (
        <nav>
            <h2 className="nav-name">ReFlect</h2>
        </nav>
        )
    };

    return (
        <nav>
            <h2 className="nav-name">ReFlect</h2>
            <Link className="nav-link" to="/">MOOD TRACKING </Link>
            <Link className="nav-link" to="/recommendations"> RECOMMENDATIONS </Link>
            <Link className="nav-link" to="/profile"> PROFILE</Link>
        </nav>
    );

};

export default Navbar;