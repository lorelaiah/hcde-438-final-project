import { useState } from "react";

const RateButton = ({num, onSelect, isSelected}) => {
    const handleClick = () => {
        onSelect(num);
    };
    return (
        <button onClick={handleClick}>{isSelected ? <h2>{num}</h2> : num}</button>
    );};

export default RateButton;