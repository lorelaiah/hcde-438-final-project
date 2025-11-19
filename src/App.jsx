import {Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Home from './pages/home.jsx';
import Profile from './pages/profile.jsx';
import MoodTracking from './pages/mood-tracking.jsx';
import Recommendations from './pages/recommendations.jsx';

const App = () => (
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mood-tracking" element={<MoodTracking />} />
            <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
    </div>
)

export default App;