import { useLocation } from 'react-router-dom';
import './pokemondetail.css';
//url의 위치 정보를 가져오는데 사용

function PokemonDetail() {
  const location = useLocation();
  const { pokemon } = location.state || {};

  return (
    <div>
      {pokemon ? (
        <>
          <div className="stylediv">
            <h1 className="title">{pokemon.title}</h1>
            <hr className="styleHr1"></hr>
            <img src={pokemon.sprite} alt={pokemon.title}></img>
            <hr className="styleHr1"></hr>
            <h2 className="type">TYPE</h2>
            <p className="stylep">{pokemon.type}</p>
            <hr className="styleHr2"></hr>
            <h2 className="type">STAT</h2>
            <ul>
              {pokemon.stats.map((stat) => (
                <li className="styleLi" key={stat.name}>
                  <strong>{stat.name}</strong>: {stat.value}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default PokemonDetail;
