import { PokemonData } from "../pokemonData";
import { DataComponent, Home, NavigationBar } from "../components/component";
import { SearchBar } from "../components/searchBar";
import { ThemeProvider } from "styled-components";
import Pagination from "react-js-pagination";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../components/theme";
import { ThemeModeButton } from "../components/toggle";
import '../styles/App.css';

function HomePage() {
    const [page, setPage] = useState(1);
    const changePageHandler = (page) => {
      setPage(page);
    }

    const [search, setSearch] = useState("");
    const onChange = (e) => {
      setSearch(e.target.value);
    }
  
    const allPokemonData = PokemonData();
    const [pokemonData, setData] = useState(allPokemonData);

    useEffect(() => {
      setData(allPokemonData.slice((page-1)*20, page * 20));
    }, [page, allPokemonData])


    const filterType = pokemonData.filter(p => {
      for(const type of p["type"])
      {
        if(type.includes(search))
          return true;
      }
      return false;
    })

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

            <Pagination
              activePage={page}
              itemsCountPerPage={20}
              totalItemsCount={allPokemonData.length}
              pageRangeDisplayed={5}
              prevPageText={"<"}
              nextPageText={">"}
              onChange={changePageHandler}
            />
          </Home>
        </ThemeProvider>
    );
}

export default HomePage;