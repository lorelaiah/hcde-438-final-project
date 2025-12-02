
import Mood from "../components/mood.jsx";
import { db } from "../firebase/config.js";
import { useState, useEffect } from "react";
import { collection, doc, getDocs, query, setDoc, onSnapshot, orderBy } from "firebase/firestore";
import { useAuth } from "../components/authContext.jsx"; 
import { Link } from "react-router-dom";


const MoodTracking = () => {
    const [moodIds, setMoodIds] = useState([]);
    const { currentUser, loading } = useAuth();
    
    useEffect(() => {
        let unsubscribe = () => {};
        if (currentUser) {
            const collectionRef = collection(db, "users", currentUser.uid, "moods");
            const order = query(collectionRef, orderBy("timestamp", "desc"));
            unsubscribe = onSnapshot(order, (querySnapshot) => {
                const updatedMoodIds = querySnapshot.docs.map(doc => doc.id);
                setMoodIds(updatedMoodIds);
            }, (error) => {
                console.error("Error listening for moods:", error);
                setMoodIds([]);
            });
        }

        return () => unsubscribe(); 
        
    }, [currentUser]);

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


    const newMood = async () => {
        const newDoc = doc(collection(db, "users", currentUser.uid, "moods"));
        await setDoc(newDoc, {
            timestamp : new Date()
        });
        console.log("added");
    }

    return (
        <div>
            <h1>mood</h1>
            <button onClick={newMood}>log new mood</button>
            {moodIds.map((id) => (
                <div key={id}>
                <Mood moodId={id} />
                </div>
            ))}            
        </div>
    )
};

export default MoodTracking;


