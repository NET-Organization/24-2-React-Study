import React from 'react';
import './Gridstyle.css';
import dummyData from './dummyData';

const Grid = () =>{
    return (
        <div className="grid-container">
            {dummyData.map(pokemon => (
                <div key={pokemon.title} className="grid-item">
                    <h1>{pokemon.title}</h1>
                    <p>{pokemon.content}</p>
                    <span>{pokemon.type}</span>
                </div>
            ))}
        </div>
    );
};

export default Grid;
