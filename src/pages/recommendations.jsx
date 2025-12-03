import React, { useState, useEffect } from "react";
import { useAuth } from "../components/authContext.jsx";
import { Link } from "react-router-dom";

const Recommendations = () => {
    const { currentUser, loading } = useAuth();

    const [quote, setQuote] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    const getQuote = async () => {
        setFetching(true);
        setError(null);
        try {
            const res = await fetch("https://api.quotable.io/random");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            // Quotable returns { content, author }
            setQuote({ quote: data.content, author: data.author });
        } catch (err) {
            console.error("Error fetching quote:", err);
            setError("Could not load quote. Try again.");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        getQuote();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!currentUser) {
        return (
            <div>
                <p>Please log in to view recommendations</p>
                <Link to="/login">Go to login</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Recommendations</h1>
            <h2>Quote</h2>

            {fetching && <p>Loading quote...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {quote ? (
                <div>
                    <p>"{quote.quote}"</p>
                    <p>- {quote.author}</p>
                </div>
            ) : (
                !fetching && <p>No quote available.</p>
            )}

            <button onClick={getQuote} disabled={fetching} style={{ marginTop: 12 }}>
                {fetching ? "Refreshing..." : "New Quote"}
            </button>
        </div>
    );
};

export default Recommendations;
