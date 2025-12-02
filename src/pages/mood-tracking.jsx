
import Mood from "../components/mood.jsx";
import { db } from "../firebase/config.js";
import { useState } from "react";
import { collection, doc } from "firebase/firestore";


const MoodTracking = () => {
    const [moodIds, setMoodIds] = useState([]);

    const newMood = () => {
        const newDocRef = doc(collection(db, "days"));
        const newId = newDocRef.id;
        setMoodIds(prevIds => [...prevIds, newId]);
        console.log("added");
    }

    return (
        <div>
            <h1>mood</h1>
            <button onClick={newMood}>log new mood</button>
            {moodIds.map((id) => (
                <div>
                <Mood moodId={id}/>
                </div>
            ))}            
        </div>
    )
};

export default MoodTracking;


