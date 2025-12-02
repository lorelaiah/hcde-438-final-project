
import Mood from "../components/mood.jsx";
import { db } from "../firebase/config.js";
import { useState } from "react";
import { collection, doc } from "firebase/firestore";
import { useAuth } from "../components/authContext.jsx";
import { Link } from "react-router-dom";


const MoodTracking = () => {
    const [moodIds, setMoodIds] = useState([]);
    const { currentUser, loading } = useAuth();

    const newMood = () => {
        const newDocRef = doc(collection(db, "days"));
        const newId = newDocRef.id;
        setMoodIds(prevIds => [...prevIds, newId]);
        console.log("added");
    }

    if (loading) {
        return (
            <div>loading...</div>
        );
    }

    if (!currentUser) {
        return (
            <div>
                <p>login to log mood</p>
                <Link to="/login"> login page </Link>
            </div>
        )
    };

    return (
        <div>
            <h1>mood</h1>
            <button onClick={newMood}>log new mood</button>
            {moodIds.map((id) => (
                <div>
                <Mood moodId={id} user={currentUser.uid}/>
                </div>
            ))}            
        </div>
    )
};

export default MoodTracking;


