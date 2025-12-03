import React, from "react";
import Song from "../components/song.jsx";
import { useAuth } from "../components/authContext.jsx";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";

const Recommendations = () => {
    const { currentUser, loading } = useAuth();

    const [quote, setQuote] = useState(null);

    useEffect(() => {
        const getQuote = async () => {
            try {
                const response = await fetch("https://zenquotes.io/api/today");
                const data = await response.json();

                setQuote(data[0]);
            } catch (err) {
                console.log("Error fetching quote:", err.message);
            }
        };

        getQuote();
    }, []);

    if (loading) {
        return <div>loading...</div>;
    }

    if (!currentUser) {
        return (
            <div>
                <p>login to view recommendations</p>
                <Link to="/login">login page</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>recommendations</h1>

            <h2>recommended songs</h2>
            <ul>
                <Song
                    title="neverita"
                    artist="bad bunny"
                    img="https://i.discogs.com/AVfnmTckGhWNpTOluDOLMqAXo-lwDuK8RK-zRw7DjUo/rs:fit/g:sm/q:90/h:528/w:600/czM6Ly9kaXNjb2dzLWRhdGFiYXNlLWltYWdlcy9SLTI0MTEyNTIwLTE2NjE2NTUxODQtMTg3NC5qcGVn.jpeg"
                />
            </ul>

            <h2>quotes</h2>
            {quote ? (
                <div>
                    <p>"{quote.q}"</p>
                    <p>- {quote.a}</p>
                </div>
            ) : (
                <p>loading quote...</p>
            )}
        </div>
    );
};

export default Recommendations;
