import ButtonSet  from "./buttonSet.jsx";
import { useState } from "react";
import { db } from "../firebase/config.js";
import { collection, addDoc, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";


const updateMood = async (docId, newData) => {
    try {
        const docRef = doc(db, "days", docId); 
        await setDoc(docRef, newData);
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

    const handleClick = async () => {
        if (saved) {
            setSaved(false);
        } else {
            const date = new Date();
            setDate(date.toLocaleDateString());
            setTime(date.toLocaleTimeString());
            const newData = {
                id : docId,
                date : date.toLocaleDateString(),
                time : date.toLocaleTimeString(),
                energyLevel : energy,
                moodLevel : mood,
                intensityLevel : intensity,
            }
            await updateMood(docId, newData);

            setSaved(true);
        }
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
    <div>
        <h3>last updated: {date}, {time}</h3>
        <p>energy</p>
        <ButtonSet id="energy-buttons" editable={!saved} onDataChange={handleEnergy}/>
        <p>mood</p>
        <ButtonSet id="mood-buttons" editable={!saved} onDataChange={handleMood}/>
        <p>intensity</p>
        <ButtonSet id="intensity-buttons" editable={!saved} onDataChange={handleIntensity}/>

        <button onClick={handleClick}>{saved ? "edit" : "save"}</button>

    </div>
    );
};

export default Mood;