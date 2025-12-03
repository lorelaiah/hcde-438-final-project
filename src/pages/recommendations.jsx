import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../components/authContext.jsx";
import { Link } from "react-router-dom";

const Recommendations = () => {
    const { currentUser, loading } = useAuth();

    const [quote, setQuote] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    const getQuote = useCallback(async (signal) => {
        const fallbackQuotes = [
            { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { quote: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
            { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
            { quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
            { quote: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
            { quote: "You are never too old to set another goal or dream a new dream.", author: "C.S. Lewis" },
            { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        ];
        setFetching(true);
        setError(null);
        try {
            const res = await fetch("https://api.quotable.io/random", { signal, timeout: 5000 });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            console.log("✓ Success with direct API", data);
            setQuote({ quote: data.content, author: data.author });
            setFetching(false);
            return;
        } catch (err) {
            console.log("Direct API failed:", err.message);
        }

        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        setQuote(randomQuote);
        setFetching(false);
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        getQuote(controller.signal);
        return () => controller.abort();
    }, [getQuote]);

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
                <blockquote>
                    <p>"{quote.quote}"</p>
                    <footer>- {quote.author}</footer>
                </blockquote>
            ) : (
                !fetching && <p>No quote available.</p>
            )}

            <button type="button" onClick={() => getQuote()} disabled={fetching} style={{ marginTop: 12 }}>
                {fetching ? "Refreshing..." : "New Quote"}
            </button>
        </div>
    );
};

export default Recommendations;
