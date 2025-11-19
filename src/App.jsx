import {Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Home from './pages/home.jsx';
import Profile from './pages/profile.jsx';

const App = () => (
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </div>
)

export default App;