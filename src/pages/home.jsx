import React from 'react';
import Test from "../components/test.jsx";

const dummyData = {
    title: "poo",
    url: ""
};

const Home = () => (
    <div>
        <h1>welcome to the home page</h1>
        <Test title={dummyData.title} url={dummyData.url} />
        <button>poo</button>
    </div>
)

export default Home;