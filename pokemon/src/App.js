import React, { useState } from 'react';
import './styles/App.css';
import dummyData from './dummyData';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './components/theme';
import { ThemeModeButton } from './components/toggle';
import { SearchBar } from './components/searchBar'
import { DataComponent, Home, NavigationBar } from './components/component';



function App() {
  //search 기능 구현
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  }

  const filterType = dummyData.filter(p => {
    return p["type"].includes(search);
  })

  //다크모드 구현 - state
  const [themeMode, setThemeMode] = useState(lightTheme);
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
