import axios from "axios";

function getRandomIndex() {
  return Math.trunc(Math.random() * 1025);
}

export async function fetchPokemonData(index = null) {
  const randomIndex = index ?? getRandomIndex();
  const responseName = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${randomIndex}/`
  );
  const name = responseName.data.names.find(
    (value) => value.language.name === "ko"
  ).name;

  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${randomIndex}/`
  );

  const image = response.data.sprites.front_default;
  return {
    name,
    image,
    index: randomIndex,
    evolutionChain: responseName.data.evolution_chain.url,
  };
}

export async function fetchEvolutionData(evolutionChainUrl) {
  const response = await axios.get(evolutionChainUrl);
  console.log(response);
  const next = response.data.chain.evolves_to[0].species.url ?? null;
  let nextIndex = null;
  if (next !== null) {
    nextIndex = next.split("/").at(-2);
  }
  return nextIndex;
}
