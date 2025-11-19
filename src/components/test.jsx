import React from 'react';

const Test = ({title, url}) => (
    <div>
        <h2>title</h2>
        <img src={url} alt={title} style={{ maxWidth: "100%"}}/>

    </div>
);

export default Test;