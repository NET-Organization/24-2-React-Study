import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const baseURL = 'https://pokeapi.co/api/v2';

const typeTranslations = {
    normal: '노말',
    fire: '불꽃',
    water: '물',
    grass: '풀',
    poison: '독',
    flying: '비행',
    bug: '벌레',
};

function App() {
    const [pokemonData, setPokemonData] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const res = await axios.get(`${baseURL}/pokemon?offset=0&limit=20`);
                const pokemonList = res.data.results;

                const allPokemonData = [];
                for (const pokemon of pokemonList) {
                    const speciesRes = await axios.get(pokemon.url);
                    const speciesData = await axios.get(speciesRes.data.species.url);
                    const koreanName = speciesData.data.names.find(name => name.language.name === 'ko');

                    allPokemonData.push({
                        title: koreanName ? koreanName.name : pokemon.name,
                        sprite: speciesRes.data.sprites.front_default,
                        types: speciesRes.data.types.map(t => typeTranslations[t.type.name] || t.type.name) // 한글 타입 변환
                    });
                }
                setPokemonData(allPokemonData);
            } catch (err) {
                console.log(err);
            }
        }

        fetchPokemon();
    }, []);

    const filteredPokemons = pokemonData.filter((pokemon) =>
        selectedTypes.length === 0 || pokemon.types.some(type => selectedTypes.includes(type))
    );

    const handleTypeChange = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <header>
                <img src="/header.png" alt="Header" className="header-image" />
            </header>
            
            <div className="black-box">
                <div className="filter-options">
                    {Array.from(new Set(pokemonData.flatMap(pokemon => pokemon.types))).map((type) => (
                        <label key={type}>
                            <input
                                type="checkbox"
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleTypeChange(type)}
                            />
                            {type}
                        </label>
                    ))}
                </div>
                <label className="switch">
                    <input
                        type="checkbox"
                        onChange={() => setIsDarkMode(!isDarkMode)}
                        checked={isDarkMode}
                    />
                    <span className="slider"></span>
                </label>
            </div>

            <main className="grid-container">
                {filteredPokemons.map((pokemon, index) => (
                    <div className="pokemon-card" key={index}>
                        <h2>{pokemon.title}</h2>
                        <img src={pokemon.sprite} alt={pokemon.title} />
                        <p>{pokemon.types.join(', ')}</p>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default App;
