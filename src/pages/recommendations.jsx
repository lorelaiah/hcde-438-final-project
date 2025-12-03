import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../components/authContext.jsx";
import { Link } from "react-router-dom";
import fallbackCat1 from "../assets/cat_photo_1.png";
import fallbackCat2 from "../assets/cat_photo_2.png";

// recommendations page
const Recommendations = () => {
    const { currentUser, loading } = useAuth();
    const [quote, setQuote] = useState(null);
    const [animalImage, setAnimalImage] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const quote_api_key = "YOUR_API_KEY_HERE";
    const picture_api_key = "YOUR API KEY HERE";
    const fallbackCats = [fallbackCat1, fallbackCat2];

    // get quotes from api or use fallback quotes if api doesn't work
    const getQuote = useCallback(
        async (signal) => {
            const fallbackQuotes = [
                { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
                { quote: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
                { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
                { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
                { quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" }
            ];

            const API_URL = "https://api.api-ninjas.com/v1/randomquotes";

            try {
                const res = await fetch(API_URL, {
                    method: "GET",
                    headers: { "X-Api-Key": quote_api_key },
                    signal
                });

                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data = await res.json();

                if (data && data.length > 0) {
                    setQuote({ quote: data[0].quote, author: data[0].author });
                } else {
                    throw new Error("Empty API response");
                }

                return;
            } catch (err) {
                console.error("Quote API failed:", err.message);
            }

            const randomQuote =
                fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
            setQuote(randomQuote);
        },
        [quote_api_key]
    );

    // get cat pictures from api or use fallpack pictures if api doesn't work
    const getAnimalPicture = useCallback(
        async (signal) => {
            const API_URL =
                "https://api.api-ninjas.com/v1/randomimage?category=cat";

            try {
                const res = await fetch(API_URL, {
                    method: "GET",
                    headers: { "X-Api-Key": picture_api_key },
                    signal
                });

                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const blob = await res.blob();
                const imageUrl = URL.createObjectURL(blob);
                setAnimalImage(imageUrl);
            } catch (err) {
                console.error("Cat API failed:", err.message);

                const fallback = fallbackCats[Math.floor(Math.random() * fallbackCats.length)];
                setAnimalImage(fallback);
            }
        },
        [picture_api_key, fallbackCats]
    );

    const fetchData = useCallback(
        async (signal) => {
            setFetching(true);
            setError(null);
            try {
                await Promise.all([getQuote(signal), getAnimalPicture(signal)]);
            } catch (err) {
                setError("Failed to fetch recommendations.");
            } finally {
                setFetching(false);
            }
        },
        [getQuote, getAnimalPicture]
    );

    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller.signal);

        return () => {
            controller.abort();
            if (animalImage) URL.revokeObjectURL(animalImage);
        };
    }, []); 

    if (loading) return <div>Loading...</div>;

    // if nobody is logged in, put link to login page instead of displaying recommendations
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

            {fetching && <p>Loading inspiration...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <h2>Quote</h2>
            {quote ? (
                <blockquote>
                    <p>"{quote.quote}"</p>
                    <footer>- {quote.author}</footer>
                </blockquote>
            ) : (
                !fetching && <p>No quote available.</p>
            )}

            <h2>Cute Cat Picture</h2>
            {animalImage ? (
                <div style={{ margin: "1rem 0" }}>
                    <img
                        src={animalImage}
                        alt="A cat to brighten your day"
                        width="400"
                        height="300"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            borderRadius: "8px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                        }}
                    />
                </div>
            ) : (
                !fetching && <p>No cat image available.</p>
            )}

            <button
                type="button"
                onClick={() => fetchData()}
                disabled={fetching}
                style={{ marginTop: 12 }}
            >
                {fetching ? "Refreshing..." : "Get New Inspiration"}
            </button>
        </div>
    );
};

export default Recommendations;