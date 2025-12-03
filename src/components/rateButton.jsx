
const RateButton = ({num, onSelect, isSelected}) => {

    const handleClick = () => {
        onSelect(num);
    };
    return (
        <button onClick={handleClick} className={isSelected ? "rate-button-selected" : "rate-button"}>{num}</button>
    );};

export default RateButton;