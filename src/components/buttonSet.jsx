import RateButton from "./rateButton.jsx";
import { useState, useEffect } from "react";


// displays the buttons for either energy, mood, or intensity ratings
const ButtonSet = ({editable, onDataChange, initial}) => {
    const options = [1, 2, 3, 4, 5];
    const [selectedButton, setSelectedButton] = useState(initial);

    // checks if initial has changed and then updates the selected button value (to retrieve past rating stored)
    useEffect(() =>{
        if (initial !== undefined && initial !== null && initial !== selectedButton) { 
            setSelectedButton(initial);
        }
    }, [initial]);

    // updates which button is selected for the mood component to store (once saved)
    useEffect(() => {
        onDataChange(selectedButton);
    }, [selectedButton, onDataChange]);

    // changes button selected but only if they already selected edit
    const handleClick = (num) => {
        if (editable) {
            setSelectedButton(num);
        }
        
    };

    return (
        <div>
            {options.map((option) => (
                <RateButton key={option} num={option} onSelect={handleClick} isSelected={selectedButton === option} />
            ))}
        </div>

    );

};

export default ButtonSet;

