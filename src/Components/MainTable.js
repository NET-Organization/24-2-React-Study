import React from 'react';
import { Link } from 'react-router-dom';

function MainTable({ darkTheme, searchQuery, pokemonData, currentPage, itemsPerPage }) {
  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <div
      className="pokemon-list"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: darkTheme ? '#121212' : '#f0f0f0',
        color: darkTheme ? '#fff' : '#000',
        paddingTop: '20px',
      }}
    >
      {currentPokemon.map((pokemon) => (
        <div
          key={pokemon.id}
          className="pokemon-card"
          style={{
            backgroundColor: pokemon.backgroundColor,
            margin: '10px',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            width: '200px',
            color: darkTheme ? '#fff' : '#000',
          }}
        >
          <img
            src={pokemon.frontSprite}
            alt={pokemon.title}
            onClick={() => pokemon.toggleSprite(pokemon.id)}
            style={{ cursor: 'pointer', width: '100%' }}
          />
          <h3>
            <Link
              to={`/pokemon/${pokemon.id}`}
              style={{
                color: darkTheme ? '#fff' : '#000',
                textDecoration: 'none',
              }}
            >
              {pokemon.title}
            </Link>
          </h3>
          <div className="types" style={{ display: 'flex', justifyContent: 'center' }}>
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
  );
}

export default MainTable;
