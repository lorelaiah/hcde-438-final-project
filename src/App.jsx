import {Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Home from './pages/home.jsx';
import Profile from './pages/profile.jsx';
import MoodTracking from './pages/mood-tracking.jsx';
import Recommendations from './pages/recommendations.jsx';
import Login from './pages/login.jsx';
import SignUp from './pages/sign-up.jsx';
import { useAuth } from "./components/authContext.jsx"; 

const App = () => {
    const { currentUser, loading } = useAuth();

    if (!currentUser) {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/profile" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </div>
        );
    }

    return (
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={<MoodTracking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
    </div>
    );

};

export default App;