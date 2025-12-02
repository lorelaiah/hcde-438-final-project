import {Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Home from './pages/home.jsx';
import Profile from './pages/profile.jsx';
import MoodTracking from './pages/mood-tracking.jsx';
import Recommendations from './pages/recommendations.jsx';
import Login from './pages/login.jsx';

const App = () => (
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={<MoodTracking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/mood-tracking" element={</>} /> */}
            <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
    </div>
)

export default App;