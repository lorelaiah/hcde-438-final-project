import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../components/authContext.jsx";
import { Link } from "react-router-dom";

// recommendations page
const Recommendations = () => {
    const { currentUser, loading } = useAuth();
    const [joke, setJoke] = useState(null);
    const [animalImage, setAnimalImage] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    // get jokes from api or use fallback quotes if api doesn't work
    const getJoke = useCallback(
        async (signal) => {
            const url = "https://official-joke-api.appspot.com/random_joke";

            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (data && Object.keys(data).length > 0) {
                    setJoke(data);
                } else {
                    throw new Error("Empty API response");
                }
            } catch (err) {
                console.error("Joke API failed:", err.message);
            }
        },
        []
    );

    // get dog pictures from api
    const getAnimalPicture = useCallback(
        async (signal) => {
            const API_URL =
                "https://dog.ceo/api/breeds/image/random";

            try {
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                const imageUrl = data.message;
                setAnimalImage(imageUrl);
            } catch (err) {
                console.error("Dog API failed:", err.message);
            }
        },
        []
    );

    const fetchData = useCallback(
        async (signal) => {
            setFetching(true);
            setError(null);
            try {
                await Promise.all([getJoke(signal), getAnimalPicture(signal)]);
            } catch (err) {
                setError("Failed to fetch recommendations.");
            } finally {
                setFetching(false);
            }
        },
        [getJoke, getAnimalPicture]
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
            <button
                type="button"
                onClick={() => fetchData()}
                disabled={fetching}
                style={{ marginTop: 12 }}
            >
                {fetching ? "Refreshing..." : "Get New Inspiration"}
            </button>

            {fetching && <p>Loading inspiration...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h2>Funny Joke!</h2>
            {joke ? (
                <div>
                    <p><strong>{joke.setup}</strong></p>
                    <p>{joke.punchline}</p>
                    </div>
            ) : (
                !fetching && <p>No joke available.</p>
            )}

            <br></br>

            <h2>Cute Dog Picture</h2>
            {animalImage ? (
                <div style={{ margin: "1rem 0" }}>
                    <img
                        src={animalImage}
                        alt="A cute picture to brighten your day"
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
                !fetching && <p>No image available.</p>
            )}
        </div>
    );
};

export default Recommendations;