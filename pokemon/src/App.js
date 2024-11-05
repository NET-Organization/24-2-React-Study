import React, { useState } from 'react';
import './styles/App.css';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './components/theme';
import { ThemeModeButton } from './components/toggle';
import { SearchBar } from './components/searchBar'
import { DataComponent, Home, NavigationBar } from './components/component';
import { PokemonData } from './pokemonData';



function App() {
  //search 기능 구현
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  }

  const pokemonData = PokemonData();
  const filterType = pokemonData.filter(p => {
    for(const type of p["type"])
    {
      if(type.includes(search))
        return true;
    }
    return false;
  })

  //다크모드 구현 - state
  const [themeMode, setThemeMode] = useState("lightTheme");
  const theme = themeMode === "lightTheme" ? lightTheme : darkTheme;

  const toggleTheme = () => {
    themeMode === "lightTheme" ? setThemeMode("darkTheme") : setThemeMode("lightTheme")
  }


  return (
    <ThemeProvider theme={theme}>
      <Home>
        <header className="App-header">
          <img src='./header.png' className="App-logo" alt="header" />
          <NavigationBar>
            <SearchBar search={search} onChange={onChange} />
            <ThemeModeButton toggleTheme={toggleTheme} themeMode={themeMode}/>
          </NavigationBar>
        </header>

        <div className="Content">
          {filterType.map((data, index) => (
            <DataComponent key={index} data={data}/>
          ))}
        </div>
      </Home>
    </ThemeProvider>
  );
};


export default App;
