import ButtonSet  from "./buttonSet.jsx";
import { useState, useEffect } from "react";
import { db } from "../firebase/config.js";
import { doc, setDoc, collection, getDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "./authContext.jsx"; 


const updateMood = async (docId, newData, user) => {
    try {
        const docRef = doc(db, "users", user, "moods", docId); 
        await setDoc(docRef, newData, { merge : true });
        console.log("Document updated successfully!");
    } catch (error) {
        console.error("Error saving document:", error);
    }
};

const Mood = ({ moodId }) => {
    const [docId, setDocId] = useState(moodId);
    const [saved, setSaved] = useState(false);
    const [energy, setEnergy] = useState();
    const [mood, setMood] = useState();
    const [intensity, setIntensity] = useState();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const { currentUser, loading } = useAuth();  



    useEffect(() => {
        const getMoodData = async () => {
            if (currentUser && docId) {
                const docRef = doc(db, "users", currentUser.uid, "moods", docId);
                const moodDoc = await getDoc(docRef);

                if (moodDoc.exists()) {
                    const data = moodDoc.data();
                    setDate(data.date || "");
                    setTime(data.time || "");
                    setEnergy(data.energyLevel || "");
                    console.log("energy level saved " + data.energyLevel);
                    setMood(data.moodLevel || "");
                    console.log("mood level saved " + data.moodLevel);
                    setIntensity(data.intensityLevel || "");
                    console.log("intensity level saved " + data.intensityLevel);
                    setSaved(true);
                    if (!data.date) {
                        setSaved(false);
                    }
                }
            }
        };

        getMoodData();
    console.log("energy level " + energy);
    console.log("mood level " + mood);
    console.log("intensity level " + intensity);
    }, [docId, currentUser]);


    const handleSave = async () => {
        if (saved) {
            setSaved(false);
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

    const handleDelete = async () => {
        await deleteDoc(doc(db, "users", currentUser.uid, "moods", docId));
        return;
    };

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
        <h3>Last Updated: {date}, {time}</h3>
        <div className="button-set">
            <p>Energy</p>
            <ButtonSet id="energy-buttons" editable={!saved} onDataChange={handleEnergy} initial={energy}/>
        </div>
        <div className="button-set">
            <p>Mood</p>
            <ButtonSet id="mood-buttons" editable={!saved} onDataChange={handleMood} initial={mood}/>
        </div>
        <div className="button-set">
            <p>Intensity</p>
            <ButtonSet id="intensity-buttons" editable={!saved} onDataChange={handleIntensity} initial={intensity}/>
        </div>
        
        <button onClick={handleSave}>{saved ? "Edit" : "Save"}</button>
        <button onClick={handleDelete}>Remove</button>

    </div>
    );
};

export default Mood;