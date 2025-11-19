import React from 'react';
import Test from "../components/test.jsx";
import Song from "../components/song.jsx";

const neverita = {
    title: "neverita",
    artist: "bad bunny",
    img: "https://i.discogs.com/AVfnmTckGhWNpTOluDOLMqAXo-lwDuK8RK-zRw7DjUo/rs:fit/g:sm/q:90/h:528/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0MTEy/NTIwLTE2NjE2NTUx/ODQtMTg3NC5qcGVn.jpeg"
};

const unVeranoSinTi = {
    title: "un verano sin ti",
    artist: "bad bunny",
    img: "https://i.discogs.com/AVfnmTckGhWNpTOluDOLMqAXo-lwDuK8RK-zRw7DjUo/rs:fit/g:sm/q:90/h:528/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0MTEy/NTIwLTE2NjE2NTUx/ODQtMTg3NC5qcGVn.jpeg"
};
const yoNoSoyCeloso = {
    title: "yo no soy celoso",
    artist: "bad bunny",
    img: "https://i.discogs.com/AVfnmTckGhWNpTOluDOLMqAXo-lwDuK8RK-zRw7DjUo/rs:fit/g:sm/q:90/h:528/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0MTEy/NTIwLTE2NjE2NTUx/ODQtMTg3NC5qcGVn.jpeg"
};
const bokete = {
    title: "bokete",
    artist: "bad bunny",
    img: "https://tse1.mm.bing.net/th/id/OIP.5uGKeHmrqRBhFNkI9mCZ-gHaHa?pid=Api"
};

const Home = () => (
    <div>
        <h1>home page idk</h1>
        <Song title={neverita.title} artist={neverita.artist} img={neverita.img}/>
        <Song title={unVeranoSinTi.title} artist={unVeranoSinTi.artist} img={unVeranoSinTi.img}/>
        <Song title={yoNoSoyCeloso.title} artist={yoNoSoyCeloso.artist} img={yoNoSoyCeloso.img}/>
        <Song title={bokete.title} artist={bokete.artist} img={bokete.img}/>
        <button>testbutton</button>
    </div>
)

export default Home;