// the button to display in button set
const RateButton = ({num, onSelect, isSelected}) => {

    // tells button set that it was selected to update num for button set component
    const handleClick = () => {
        onSelect(num);
    };

    return (
        <button onClick={handleClick} className={isSelected ? "selected" : ""}>{num}</button>
    );};

export default RateButton;