import React, { useState, useEffect } from "react";
import { useAuth } from "../components/authContext.jsx";
import { Link } from "react-router-dom";

const Recommendations = () => {
    const { currentUser, loading } = useAuth();

    const [quote, setQuote] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    const getQuote = async (signal) => {
        setFetching(true);
        setError(null);
        try {
            const res = await fetch("https://api.quotable.io/random", { signal });
            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`HTTP ${res.status}${text ? `: ${text}` : ""}`);
            }
            const data = await res.json();
            // Quotable returns { content, author }
            setQuote({ quote: data.content, author: data.author });
        } catch (err) {
            // If aborted, don't show an error to the user
            if (err.name === "AbortError") {
                console.log("Quote fetch aborted");
            } else {
                console.error("Error fetching quote:", err);
                setError(err.message || "Could not load quote. Try again.");
            }
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        getQuote(controller.signal);
        return () => controller.abort();
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
