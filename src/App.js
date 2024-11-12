import './App.css';
import React, { useState, useEffect } from 'react';
import titleImage from './title.png';
import styled from 'styled-components';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';

const baseURL = `https://pokeapi.co/api/v2`;

const Title = styled.div`
  display: grid;
  grid-area: title;
  place-items: center;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => (props.darkTheme ? '#FFFFFF' : '#000000')};
`;

const Content = styled.div`
  display: grid;
  grid-area: content;
  place-items: center;
  background-color: ${(props) => (props.darkTheme ? '#555555' : '#aaaaaa')};
  color: ${(props) => (props.darkTheme ? '#FFFFFF' : '#000000')};
`;

const Type = styled.div`
  display: grid;
  grid-area: type;
  place-items: center;
  background-color: ${(props) => (props.darkTheme ? '#777777' : '#888888')};
  color: ${(props) => (props.darkTheme ? '#FFFFFF' : '#000000')};
`;

function Image() {
  return <img src={titleImage} width="100%" alt="pokemon page title" />;
}

function Button({ onToggle }) {
  return (
    <div className="container">
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        onChange={onToggle}
      />
      <label className="switch" htmlFor="checkbox">
        <span className="slider"></span>
      </label>
    </div>
  );
}

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(query.trim());
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, onSearch]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <form className="form">
      <label htmlFor="search">
        <input
          className="input"
          type="text"
          placeholder="Search pokemon"
          id="search"
          onChange={handleInputChange}
          value={query}
        />
      </label>
    </form>
  );
}

function InnerItems({ num, darkTheme, pokemonData }) {
  const outputData = pokemonData[Number(num)];
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/pokemon/${num}`);
  };

  return (
    <div className="child" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
      <Title darkTheme={darkTheme} backgroundColor={outputData.backgroundColor}>
        <img src={outputData.frontSprite} width="100%" alt={outputData.title} />
      </Title>
      <Content darkTheme={darkTheme}>
        <h2>{outputData.title}</h2>
      </Content>
      <Type darkTheme={darkTheme}>
        <p>{outputData.type.join(', ')}</p>
      </Type>
    </div>
  );
}

function MainTable({ darkTheme, searchQuery, pokemonData, currentPage, itemsPerPage }) {
  const filteredData = pokemonData.filter((item) =>
    item.title.includes(searchQuery)
  );

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentData = filteredData.slice(startIdx, endIdx);

  return (
    <div className="parent">
      {currentData.map((_, index) => (
        <InnerItems key={index} num={index + startIdx} darkTheme={darkTheme} pokemonData={pokemonData} />
      ))}
    </div>
  );
}


function PokemonDetail({ pokemonData }) {
  const { id } = useParams();
  const pokemon = pokemonData[id];
  const navigate = useNavigate();

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{pokemon.title}</h1>
      <img src={pokemon.frontSprite} alt={pokemon.title} width="200px" />
      <img src={pokemon.backSprite} alt={pokemon.title} width="200px" />
      <p>Type: {pokemon.type.join(', ')}</p>
      <p>Background Color: {pokemon.backgroundColor}</p>
      <button onClick={() => navigate('/')}>Back to Pokémon List</button>
    </div>
  );
}

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(`${baseURL}pokemon?offset=0&limit=200`);
        const pokemonList = res.data.results;

        const allPokemonData = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const speciesRes = await axios.get(pokemon.url);
            const speciesData = await axios.get(speciesRes.data.species.url);

            const koreanName = speciesData.data.names?.find(
              (name) => name.language.name === 'ko'
            );

            const types = speciesRes.data.types.map((type) => type.type.name);
            const frontSprite = speciesRes.data.sprites.front_default;
            const backSprite = speciesRes.data.sprites.back_default;

            const genderRate = speciesData.data.gender_rate;
            let backgroundColor;
            if (genderRate === -1) {
              backgroundColor = '#D3D3D3';
            } else if (genderRate > 0) {
              backgroundColor = '#FFCCCB';
            } else {
              backgroundColor = '#ADD8E6';
            }

            return {
              title: koreanName?.name || pokemon.name,
              frontSprite: frontSprite,
              backSprite: backSprite,
              type: types,
              backgroundColor: backgroundColor,
            };
          })
        );

        setPokemonData(allPokemonData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPokemon();
  }, []);

  const handleToggle = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === 'next' ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
  };

  document.body.style.backgroundColor = darkTheme ? '#000000' : '#FFFFFF';

  return (
    <Router>
      <div>
        <Image />
        <Button onToggle={handleToggle} />
        <Search onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <MainTable
                darkTheme={darkTheme}
                searchQuery={searchQuery}
                pokemonData={pokemonData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            }
          />
          <Route
            path="/pokemon/:id"
            element={<PokemonDetail pokemonData={pokemonData} />}
          />
        </Routes>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
          <button onClick={() => handlePageChange('next')} disabled={(currentPage * itemsPerPage) >= pokemonData.length}>
            Next
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;
