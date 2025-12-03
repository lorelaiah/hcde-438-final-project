import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Profile from './pages/profile.jsx';
import MoodTracking from './pages/mood-tracking.jsx';
import Recommendations from './pages/recommendations.jsx';
import Login from './pages/login.jsx';
import SignUp from './pages/sign-up.jsx';
import { useAuth } from "./components/authContext.jsx"; 

const App = () => {
    const { currentUser } = useAuth();

    const pageStyle = {
        paddingTop: '0px', 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    if (!currentUser) {
        return (
            <div>
                <Navbar />
                <div style={pageStyle}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/profile" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                    </Routes>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div style={pageStyle}>
                <Routes>
                    <Route path="/" element={<MoodTracking />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/recommendations" element={<Recommendations />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
