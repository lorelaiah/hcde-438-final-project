import React from 'react';

const Song = ({title, artist, img}) => (
    <div style={{display: "flex", flexDirection: "row"}}>
        <img src={img} style={{ maxWidth: "100px"}}/>
        <div>
            <h2>{title}</h2>
            <h3>{artist}</h3>
        </div>
    </div>
);

export default Song;