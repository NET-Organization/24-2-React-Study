// src/App.js
import React from 'react';
import dummyData from './dummyData';
import './App.css'; // CSS 파일을 추가하여 스타일을 적용합니다.

function App() {
    return (
        <div className="App">
            <header>
                <img src="/header.png" alt="Header" className="header-image" />
            </header>
            <main className="grid-container">
                {dummyData.map((pokemon, index) => (
                    <div className="pokemon-card" key={index}>
                        <h2>{pokemon.title}</h2>
                        <p>{pokemon.content}</p>
                        <p>{pokemon.type}</p>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default App;
