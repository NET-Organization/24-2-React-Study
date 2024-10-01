import './App.css';
import dummyData from './dummyData';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={process.env.PUBLIC_URL + '/header.png'} className="App-logo" alt="header" />

        <div class="content">
          <div class="content-boxes">
            {dummyData.map((data, index) => (
              <DataComponent key={index} data={data}/>
            ))}
          </div>
        </div>

      </header>
    </div>
  );
};

const DataComponent = (props) => {
  const data = props.data;
  return <div class="pokemon-box">
    <p>{data["title"]}</p>
    <p>{data["content"]}</p>
    <p>{data["type"]}</p>
  </div>;
};

export default App;
