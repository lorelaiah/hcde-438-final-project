import React, { useState, useEffect } from "react";
import Song from "../components/song.jsx";
import { useAuth } from "../components/authContext.jsx";
import { Link } from "react-router-dom";

const Recommendations = () => {
    const { currentUser, loading } = useAuth();

    const [quote, setQuote] = useState(null);

    useEffect(() => {
        const getQuote = async () => {
            try {
                const response = await fetch("https://quotes.rest/qod?language=en");
                const data = await response.json();

                const q = data.contents.quotes[0];
                setQuote(q);
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
            <h2>quote of the day</h2>
            {quote ? (
                <div>
                    <p>"{quote.quote}"</p>
                    <p>- {quote.author}</p>
                </div>
            ) : (
                <p>fail rip</p>
            )}
        </div>
    );
};

export default Recommendations;
