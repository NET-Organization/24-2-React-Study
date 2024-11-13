import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import './App.css';
//import './About.js;

const baseURL = 'https://pokeapi.co/api/v2';

const typeTranslations = {
    normal: '노말',
    fire: '불꽃',
    water: '물',
    grass: '풀',
    electric: '전기',
    ice: '얼음',
    fighting: '격투',
    poison: '독',
    ground: '땅',
    flying: '비행',
    psychic: '에스퍼',
    bug: '벌레',
    rock: '바위',
    ghost: '고스트',
    dark: '악',
    dragon: '드래곤',
    steel: '강철',
    fairy: '페어리'
};

function App() {
    const [pokemonData, setPokemonData] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const res = await axios.get(`${baseURL}/pokemon?offset=0&limit=100`);
                const pokemonList = res.data.results;

                const allPokemonData = [];
                for (const pokemon of pokemonList) {
                    const speciesRes = await axios.get(pokemon.url);
                    const speciesData = await axios.get(speciesRes.data.species.url);
                    const koreanName = speciesData.data.names.find(name => name.language.name === 'ko');

                    allPokemonData.push({
                        id: pokemon.url.split('/').slice(-2, -1)[0],
                        title: koreanName ? koreanName.name : pokemon.name,
                        sprite: speciesRes.data.sprites.front_default,
                        types: speciesRes.data.types.map(t => typeTranslations[t.type.name] || t.type.name)
                    });
                }
                setPokemonData(allPokemonData);
            } catch (err) {
                console.log(err);
            }
        };

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

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const paginatedPokemons = filteredPokemons.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    const openPokemonDetailInNewWindow = (id) => {
        const newWindow = window.open('', '_blank', 'width=600,height=400');
        newWindow.document.write('<div id="pokemon-detail-root"></div>');
        newWindow.document.title = "포켓몬 상세 페이지";
        
        const renderDetail = async () => {
            const speciesRes = await axios.get(`${baseURL}/pokemon/${id}`);
            const speciesData = await axios.get(speciesRes.data.species.url);
            const koreanName = speciesData.data.names.find(name => name.language.name === 'ko');
            const pokemonDetail = {
                title: koreanName ? koreanName.name : speciesRes.data.name,
                sprite: speciesRes.data.sprites.front_default,
                types: speciesRes.data.types.map(t => typeTranslations[t.type.name] || t.type.name)
            };

            newWindow.document.body.innerHTML = `
                <div style="text-align: center;">
                    <h2>${pokemonDetail.title}</h2>
                    <img src="${pokemonDetail.sprite}" alt="${pokemonDetail.title}" />
                    <p>타입: ${pokemonDetail.types.join(', ')}</p>
                </div>
            `;
        };

        renderDetail();
    };

    return (
        <Router>
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
                    {paginatedPokemons.map((pokemon, index) => (
                        <div
                            key={index}
                            className="pokemon-card"
                            style={{ cursor: 'pointer' }}
                            onClick={() => openPokemonDetailInNewWindow(pokemon.id)}
                        >
                            <h2>{pokemon.title}</h2>
                            <img src={pokemon.sprite} alt={pokemon.title} />
                            <p>{pokemon.types.join(', ')}</p>
                        </div>
                    ))}
                </main>

                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={filteredPokemons.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    innerClass="pagination"
                />
            </div>

            <Routes>
                <Route path="/" element={<div />} />
            </Routes>
        </Router>
    );
}

export default App;
