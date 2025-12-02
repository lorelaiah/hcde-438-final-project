import RateButton from "./rateButton.jsx";
import { useState, useEffect } from "react";

const ButtonSet = ({editable, onDataChange}) => {
    const options = [1, 2, 3, 4, 5];
    const [selectedButton, setSelectedButton] = useState(); 

    useEffect(() => {
        onDataChange(selectedButton);
    }, [selectedButton, onDataChange]);

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

