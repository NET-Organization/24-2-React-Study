import dummyData from './dummyData.js';
import './App.css';
import React, { useState, useEffect } from 'react';
import titleImage from './title.png';
import styled from 'styled-components';

const Title = styled.div`
  display: grid;
  grid-area: title;
  place-items: center;
  background-color: ${(props) => (props.darkTheme ? '#333333' : '#cccccc')};
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

const FancyBG = styled.div`
  position: absolute;
  width: 100%;
  inset: 0;
  background: ${(props) => (props.darkTheme ? '#1B1B1B' : 'E4E4E4')};
  border-radius: 30px;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  box-shadow: ${(props) => (props.darkTheme ? 'rgba(255, 255, 255) 0px 1px 4px' : 'rgba(0, 0, 0, 0.16) 0px 5px 20px')};
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

  // Debounce function: delay the search by 300ms after the user stops typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(query.trim()); // Send the trimmed query to the parent component
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
        <FancyBG />
        <div className="search">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
          >
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </div>
        <button className="close-btn" type="reset" onClick={() => setQuery('')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </label>
    </form>
  );
}

function InnerItems({ num, darkTheme }) {
  const outputData = dummyData[Number(num)];

  return (
    <div className="child">
      <Title darkTheme={darkTheme}>
        <h1>{outputData.title}</h1>
      </Title>
      <Content darkTheme={darkTheme}>
        <h2>{outputData.content}</h2>
      </Content>
      <Type darkTheme={darkTheme}>
        <p>{outputData.type}</p>
      </Type>
    </div>
  );
}

function MainTable({ darkTheme, searchQuery }) {
  const filteredData = dummyData.filter((item) =>
    item.title.includes(searchQuery) ||
    item.content.includes(searchQuery) ||
    item.type.includes(searchQuery)
  );

  return (
    <div className="parent">
      {filteredData.map((_, index) => (
        <InnerItems key={index} num={index} darkTheme={darkTheme} />
      ))}
    </div>
  );
}

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggle = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  document.body.style.backgroundColor = darkTheme ? '#000000' : '#FFFFFF';

  return (
    <div>
      <Image />
      <Button onToggle={handleToggle} />
      <Search onSearch={handleSearch} />
      <MainTable darkTheme={darkTheme} searchQuery={searchQuery} />
    </div>
  );
}

export default App;
