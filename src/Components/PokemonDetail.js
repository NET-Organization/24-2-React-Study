import React from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetail({ pokemonData, darkTheme }) {
  const { id } = useParams();
  const pokemon = pokemonData.find((pokemon) => pokemon.id === parseInt(id));

  if (!pokemon) {
    return <div>Pokémon not found!</div>;
  }

  return (
    <div
      style={{
        backgroundColor: darkTheme ? '#121212' : '#f0f0f0',
        color: darkTheme ? '#fff' : '#000',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h2>{pokemon.title}</h2>
      <img
        src={pokemon.frontSprite}
        alt={pokemon.title}
        style={{
          width: '150px',
          height: '150px',
          marginBottom: '20px',
        }}
      />
      <div className="types">
        <h3>Types:</h3>
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
      <div className="back-sprite">
        <h3>Back Sprite:</h3>
        <img
          src={pokemon.backSprite}
          alt={pokemon.title + ' back'}
          style={{
            width: '150px',
            height: '150px',
            marginTop: '20px',
          }}
        />
      </div>
    </div>
  );
}

export default PokemonDetail;
