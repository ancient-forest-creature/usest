import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  //I'm doing this on purpose
  const [val, setVal] = useState(1);
  useEffect(() => {
    setVal(val + 1);
    console.log(val);
  }, []);

  const [pokemon, setPokemon] = useState("");
  const [data, setData] = useState({})

  const callApi = (e) => {
    e.preventDefault();
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.log("Fail Whale", err));
  };
  return (
    <div className="App">
      <h1>{val}</h1>
      <br></br>
      <h1>{data.name}</h1>
      {/* <h1>{data && JSON.stringify(data)}</h1>
      <button onClick={callApi}>Get Pokemon</button> */}
      <form onSubmit={callApi}>
        <input onChange={(e) => setPokemon(e.target.value)} type="text" />
      </form>
      <div className="card" style={{width: "18rem"}}>
        <img className="card-img-top" src={data.sprites && data.sprites["front_default"]} alt="Card image cap" />
        <div className="card-body">
          <h3 className="card-title">{data.name}</h3>
          <h5 className="card-title">{data.id}</h5>
          {/* <p className="card-text">{data.abilities}</p> */}
          <ul>
            {data.abilities.map((poke, index) => {
                return (<li key={index}>{poke.ability.name}</li>)
            })}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default App;
