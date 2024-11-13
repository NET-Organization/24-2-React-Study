import React from 'react';
import dummyData from './dummyData'; // dummyData 파일 경로에 맞게 수정

const PokemonGrid = () => {
  return (
    <div className="grid-container">
      {dummyData.map((pokemon) => (
        <div className="grid-item" key={pokemon.title}>
          <h3>{pokemon.title}</h3>
          <p>{pokemon.content}</p>
          <span>{pokemon.type}</span>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>포켓몬 목록</h1>
      <img src='/header.png' alt='' />
      <PokemonGrid />
    </div>
  )
}

export default App;