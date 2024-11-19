import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokemonDetail from './Components/PokemonDetail';
import ItemsPerPage from './Components/ItemsPerPage';
import Search from './Components/Search';
import Button from './Components/Button';
import Image from './Components/Image';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [darkTheme, setDarkTheme] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=300');
      const data = await response.json();
      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          const speciesRes = await fetch(details.species.url);
          const speciesDetails = await speciesRes.json();

          const genderRate = speciesDetails.gender_rate;

          return {
            id: details.id,
            title: details.name,
            frontSprite: details.sprites.front_default,
            backSprite: details.sprites.back_default,
            type: details.types.map((t) => t.type.name),
            genderRate: genderRate,
          };
        })
      );
      setPokemonData(detailedData);
    };

    fetchPokemonData();
  }, []);

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPokemon = filteredPokemon.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage * itemsPerPage < filteredPokemon.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleDarkMode = () => {
    setDarkTheme(!darkTheme);
  };

  const getCardColor = (pokemonId, genderRate) => {
    if (pokemonId === selectedPokemonId) {
      return darkTheme ? '#C89F77' : '#FFD700';
    }

    if (genderRate === -1) {
      return darkTheme ? '#404040' : '#D3D3D3';
    } else if (genderRate > 0) {
      return darkTheme ? '#b57272' : '#FFCCCB';
    } else {
      return darkTheme ? '#336699' : '#ADD8E6';
    }
  };

  const handleCardClick = (id) => {
    if (id === selectedPokemonId) {
      setSelectedPokemonId(null);
    } else {
      setSelectedPokemonId(id);
    }
  };

  return (
    <Router>
      <div style={{ backgroundColor: darkTheme ? '#121212' : '#f0f0f0', color: darkTheme ? '#fff' : '#000' }}>
        <header style={{ padding: '20px', textAlign: 'center' }}>
          <Button onToggle={toggleDarkMode} darkTheme={darkTheme} />
          <Image />
        </header>

        <main>
          <Search onSearch={handleSearch} />
          <ItemsPerPage itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} darkTheme={darkTheme} />

          <div
            className="pokemon-list"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 1fr)',
              gap: '10px',
              padding: '10px',
            }}
          >
            {paginatedPokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                onClick={() => handleCardClick(pokemon.id)} // Set the selected Pokémon ID on card click
                style={{
                  backgroundColor: getCardColor(pokemon.id, pokemon.genderRate), // Color based on selection
                  color: darkTheme ? '#fff' : '#000',
                  padding: '10px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Link
                  to={`/pokemon/${pokemon.id}`}  // Use Link for navigation to detail page
                  style={{
                    textDecoration: 'none',
                    color: darkTheme ? '#fff' : '#000',
                  }}
                >
                  <img
                    src={pokemon.frontSprite}
                    alt={pokemon.title}
                    style={{ width: '100px', height: '100px' }}
                  />
                  <h4>{pokemon.title}</h4>
                </Link>
                <div className="types">
                  {pokemon.type.map((type) => (
                    <span
                      key={type}
                      style={{
                        margin: '5px',
                        color: darkTheme ? '#fff' : '#000',
                        fontWeight: 'bold',
                      }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span
              style={{
                margin: '0 15px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: darkTheme ? '#fff' : '#000',
              }}
            >
              Page {currentPage}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage * itemsPerPage >= filteredPokemon.length}
            >
              Next
            </button>
          </div>
        </main>

        <Routes>
          {selectedPokemonId !== null && (
            <Route
              path="/pokemon/:id"
              element={<PokemonDetail pokemonData={pokemonData} darkTheme={darkTheme} />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
