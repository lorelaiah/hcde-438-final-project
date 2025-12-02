import ButtonSet  from "./buttonSet.jsx";
import { useState } from "react";
import { db } from "../firebase/config.js";
import { collection, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";


const Mood = () => {
    const [saved, setSaved] = useState(false);
    const newDocRef = doc(collection(db, "days"));
    const docId = newDocRef.id;
    const newMood = {
        id : docId,
        date : 0,
        time : 0,
        energyLevel : 0,
        moodLevel : 0,
        intensityLevel : 0,
    }

    const handleClick = () => {
        if (saved) {
            setSaved(false);

        } else {

            setSaved(true);
        }
    };



    return (
    <div>
        <p>hello!!!</p>
        <p>energy</p>
        <ButtonSet id="energy-buttons" editable={!saved}/>
        <p>mood</p>
        <ButtonSet id="mood-buttons" editable={!saved}/>
        <p>intensity</p>
        <ButtonSet id="intensity-buttons" editable={!saved}/>

        <button onClick={handleClick}>{saved ? "edit" : "save"}</button>

    </div>
    );
};

export default Mood;