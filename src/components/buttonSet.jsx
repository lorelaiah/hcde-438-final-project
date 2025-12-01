import RateButton from "./rateButton.jsx";
import { useState } from "react";

const ButtonSet = () => {
    const options = [1, 2, 3, 4, 5];
    const [selectedButton, setSelectedButton] = useState(); 

    const handleClick = (num) => {
        setSelectedButton(num);
    };
    return (
        <div>
            {options.map((option) => (
                <RateButton num={option} onSelect={handleClick} isSelected={selectedButton === option} />

            ))}
        </div>

    );

};

export default ButtonSet;

