import { useEffect, useState } from "react";
import "./App.css";
import { fetchPokemonData } from "./api/pokemon";
import { fetchEvolutionData } from "./api/pokemon";

function App() {
  const [pokemonName, setPokemonName] = useState(null);
  const [pokemonUrl, setPokemonUrl] = useState(null);
  const [pokemonEvolutionChainUrl, setPokemonEvolutionChainUrl] =
    useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonData();
      setPokemonName(data.name);
      setPokemonUrl(data.image);

      setPokemonEvolutionChainUrl(data.evolutionChain);
    };
    fetchData();
  }, []);

  async function handleButtonClick() {
    const data = await fetchPokemonData();
    setPokemonName(data.name);
    setPokemonUrl(data.image);
    console.log(data);
    setPokemonEvolutionChainUrl(data.evolutionChain);
  }
  async function handleEvolutionClick() {
    const nextIndex = await fetchEvolutionData(pokemonEvolutionChainUrl);
    const data = await fetchPokemonData(nextIndex);
    setPokemonName(data.name);
    setPokemonUrl(data.image);
  }

  return (
    <>
      <h1>포켓몬</h1>
      <div>
        <div>
          <img src={pokemonUrl} />
        </div>
        <p>{pokemonName}</p>
        <button onClick={handleButtonClick}>버튼</button>
        <button onClick={handleEvolutionClick}>진화버튼</button>
      </div>
    </>
  );
}

export default App;
