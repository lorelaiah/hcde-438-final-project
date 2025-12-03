import React from 'react';
import Song from "../components/song.jsx";
import { useAuth } from "../components/authContext.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Recommendations = () => {
    const { currentUser, loading } = useAuth();
    // add const for api data storage

    useEffect(() => {
        const getQuote = async () => {
            try {
                const response = await fetch(""); // add link
                const data = await response.json();
                // do something with the data
            } catch(err){
                console.log(err.message);
            }
        }
        getQuote();
    },[]);

    if (loading) {
        return (
            <div>loading...</div>
        );
    }



    if (!currentUser) {
        return (
            <div>
                <p>login to view recommendations</p>
                <Link to="/login"> login page </Link>
            </div>
        )
    };

    return (
        <div>
            <h1>recommendations</h1>
            <h2>recommended songs</h2>
            <ul>
                <Song title="neverita" artist="bad bunny" img="https://i.discogs.com/AVfnmTckGhWNpTOluDOLMqAXo-lwDuK8RK-zRw7DjUo/rs:fit/g:sm/q:90/h:528/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0MTEy/NTIwLTE2NjE2NTUx/ODQtMTg3NC5qcGVn.jpeg"></Song>
            </ul>

            <h2>quotes</h2>
            
            
        </div>
    );
};

export default Recommendations;