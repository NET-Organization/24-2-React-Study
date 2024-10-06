import React, { useState } from 'react';
import dummyData from './dummyData';
import './App.css';

function App() {

  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredData = dummyData.filter((pokemon) =>
    pokemon.type.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className = "App">
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header>
        <img src='./header.png' alt='Header' className='header-image' />
      </header>
      <div className='blackBar'>
        <div class="search">
          <input 
            type="text" 
            class="search__input" 
            placeholder="타입을 입력해주세요."
            value={searchTerm} // 상태와 연결
            onChange={(e) => setSearchTerm(e.target.value)} // 검색어 입력 시 상태 업데이트
          />
        </div>
        <input 
          type="checkbox" 
          id="checkboxInput"
          onChange={() => setIsDarkMode(!isDarkMode)} // 체크박스 클릭 시 모드 전환
          checked={isDarkMode}/>
        <label 
          htmlFor="checkboxInput" 
          className="toggleSwitch">
        </label>
      </div>
      <main className="grid-container">
        {filteredData.length > 0 ? ( // 필터링된 데이터가 있는지 확인
          filteredData.map((pokemon, index) => (
            <div className='pokemon-card' key={index}>
              <h2>{pokemon.title}</h2>
              <p>{pokemon.content}</p>
              <p>{pokemon.type}</p>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p> // 검색 결과가 없을 경우 메시지 표시
        )}
      </main>
    </div>
    </div>
  );
}

export default App;
