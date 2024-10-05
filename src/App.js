import React, { useState } from 'react'; // useState import
import dummyData from './dummyData';
import './App.css';

function App() {
    // 상태 변수를 추가하여 검색어와 모드 상태를 저장
    const [selectedTypes, setSelectedTypes] = useState([]); // 선택된 타입 상태 추가
    const [isDarkMode, setIsDarkMode] = useState(false); // 다크 모드 상태 추가

    // 포켓몬 필터링 함수
    const filteredPokemons = dummyData.filter((pokemon) =>
        selectedTypes.length === 0 || selectedTypes.includes(pokemon.type) // 선택된 타입이 없거나 포함되어 있으면 필터링
    );

    // 타입을 선택하는 핸들러
    const handleTypeChange = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}> {/* 모드에 따라 클래스 변경 */}
            <header>
                <img src="/header.png" alt="Header" className="header-image" />
            </header>
            
            <div className="black-box">
                <div className="filter-options">
                    {/* 체크박스를 생성하여 타입을 선택할 수 있도록 함 */}
                    {Array.from(new Set(dummyData.map(pokemon => pokemon.type))).map((type) => (
                        <label key={type}>
                            <input
                                type="checkbox"
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleTypeChange(type)} // 체크박스 상태 업데이트
                            />
                            {type}
                        </label>
                    ))}
                </div>
                <label className="switch">
                    <input
                        type="checkbox"
                        onChange={() => setIsDarkMode(!isDarkMode)} // 체크박스 클릭 시 모드 전환
                        checked={isDarkMode} // 체크박스 상태에 모드 연결
                    />
                    <span className="slider"></span>
                </label>
            </div>

            <main className="grid-container">
                {filteredPokemons.map((pokemon, index) => (
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