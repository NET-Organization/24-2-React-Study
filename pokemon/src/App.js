import dummyData from './dummyData.js' 
import './App.css'
import React from 'react'
import titleImage from './title.png'

function Image() {
  return (
    <img src={titleImage} width='100%' alt='pokemon page title'/>
  );
}

function InnerItems(props) {
  const outputData = dummyData[Number(props.num)];
  
  return (
    <div>
      <div class="title"><h1>{outputData.title}</h1></div>
      <div class="content"><p>{outputData.content}</p></div>
      <div class="type"><h4>{outputData.type}</h4></div>
    </div>
  );
}

function MainTable() {
  return (
    <div class="parent">
      <InnerItems num='0'/>
      <InnerItems num='1'/>
      <InnerItems num='2'/>
      <InnerItems num='3'/>
      <InnerItems num='4'/>
      <InnerItems num='5'/>
      <InnerItems num='6'/>
      <InnerItems num='7'/>
      <InnerItems num='8'/>
      <InnerItems num='9'/>
      <InnerItems num='10'/>
      <InnerItems num='11'/>
      <InnerItems num='12'/>
      <InnerItems num='13'/>
      <InnerItems num='14'/>
      <InnerItems num='15'/>
      <InnerItems num='16'/>
      <InnerItems num='17'/>
      <InnerItems num='18'/>
      <InnerItems num='19'/>
      <InnerItems num='20'/>
      <InnerItems num='21'/>
      <InnerItems num='22'/>
    </div>
  );
}

function App() {
  return (
    <div>
      <Image/>
      <MainTable/>
    </div>
  );
}

export default App