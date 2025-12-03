import RateButton from "./rateButton.jsx";
import { useState, useEffect } from "react";

const ButtonSet = ({editable, onDataChange, initial}) => {
    const options = [1, 2, 3, 4, 5];
    const [selectedButton, setSelectedButton] = useState(initial); 

    useEffect(() =>{
        if (initial !== undefined && initial !== null && initial !== selectedButton) { 
            setSelectedButton(initial);
        }
    }, [initial]);

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

