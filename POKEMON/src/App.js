import React from 'react';
import './App.css'
import Grid from './Grid';
import header from './assets/header.png';

function App(){

    return (
        <div className='App'>
            <img src={header} alt='Header'/>
            <Grid />
        </div>
    );
}

export default App;

