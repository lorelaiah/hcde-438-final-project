import ButtonSet  from "./buttonSet.jsx";

const Mood = () => {
    const handleClick = () => {

    };
    return (
    <div>
        <p>hello!!!</p>
        <p>energy</p>
        <ButtonSet id="energy-buttons"/>
        <p>mood</p>
        <ButtonSet id="mood-buttons"/>
        <p>intensity</p>
        <ButtonSet id="intensity-buttons"/>

        <button onClick={handleClick}>save</button>

    </div>
    );
};

export default Mood;