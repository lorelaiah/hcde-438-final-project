
const RateButton = ({num, onSelect, isSelected}) => {


    const handleClick = () => {
        onSelect(num);
    };
    return (
        <button onClick={handleClick} className={isSelected ? "selected" : ""}>{num}</button>
    );};

export default RateButton;