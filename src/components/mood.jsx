import ButtonSet  from "./buttonSet.jsx";
import { useState, useEffect } from "react";
import { db } from "../firebase/config.js";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "./authContext.jsx"; 

// updates the data in firestore for the mood using the document and user ids
const updateMood = async (docId, newData, user) => {
    try {
        const docRef = doc(db, "users", user, "moods", docId); 
        await setDoc(docRef, newData, { merge : true });
    } catch (error) {
        console.error("Error saving document:", error);
    }
};

// component for each mood entry
const Mood = ({ moodId }) => {
    const [docId, setDocId] = useState(moodId);
    const [saved, setSaved] = useState(false);
    const [energy, setEnergy] = useState();
    const [mood, setMood] = useState();
    const [intensity, setIntensity] = useState();
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const { currentUser, loading } = useAuth();  

    // gets all the previously stored data for this entry (if empty, leaves buttons unselected and not saved)
    useEffect(() => {
        // gets the mood data from firestore (asynchronous)
        const getMoodData = async () => {
            // checks if current user and document id exist
            if (currentUser && docId) {
                const docRef = doc(db, "users", currentUser.uid, "moods", docId);
                const moodDoc = await getDoc(docRef);
                // makes sure mood data exsits before changing states 
                if (moodDoc.exists()) {
                    const data = moodDoc.data();
                    setDate(data.date || "");
                    setTime(data.time || "");
                    setEnergy(data.energyLevel || "");
                    setMood(data.moodLevel || "");
                    setIntensity(data.intensityLevel || "");
                    setSaved(true);
                    // if there's no date (new log), then keep it unsaved to make it easier for user to edit new mood entry
                    if (!data.date) {
                        setSaved(false);
                    }
                }
            }
        };
        getMoodData();
    }, [docId, currentUser]);

    // saves the mood data to firestore and sets saved state
    const handleSave = async () => {
        // if saved, change state to not saved to allow user to edit now
        if (saved) {
            setSaved(false);
        // if not saved, save data and change state to saved
        } else {
            const date = new Date();
            setDate(date.toLocaleDateString());
            setTime(date.toLocaleTimeString());
            const newData = {
                id : docId,
                timestamp : date,
                date : date.toLocaleDateString(),
                time : date.toLocaleTimeString(),
                energyLevel : energy,
                moodLevel : mood,
                intensityLevel : intensity,
            }
            await updateMood(docId, newData, currentUser.uid);
            setSaved(true);
        }
    };

    // removes mood entry from firestore and returns blank html so that the mood component disappears from the page
    const handleDelete = async () => {
        await deleteDoc(doc(db, "users", currentUser.uid, "moods", docId));
        return;
    };

    // to update each state when buttons are clicked
    const handleEnergy = (num) => {
        setEnergy(num);
    };
    const handleMood = (num) => {
        setMood(num);
    };
    const handleIntensity = (num) => {
        setIntensity(num);
    };

    return (
    <div className="mood">
        <h2>{date}</h2>
        
        <div className="mood-buttons">
            <div className="button-set-container">
                <div className="button-set">
                    <h3>Energy</h3>
                    <ButtonSet id="energy-buttons" editable={!saved} onDataChange={handleEnergy} initial={energy}/>
                </div>
                <div className="button-set">
                    <h3>Mood</h3>
                    <ButtonSet id="mood-buttons" editable={!saved} onDataChange={handleMood} initial={mood}/>
                </div>
                <div className="button-set">
                    <h3>Intensity</h3>
                    <ButtonSet id="intensity-buttons" editable={!saved} onDataChange={handleIntensity} initial={intensity}/>
                </div>
            </div>
            <div className="control-buttons">
                <button onClick={handleSave}>{saved ? "Edit" : "Save"}</button>
                <button onClick={handleDelete}>Remove</button>
            </div>
            <p>{ time !== "" && "Last updated: " + time}</p>
        </div>
        
 
    </div>
    );

};

export default Mood;