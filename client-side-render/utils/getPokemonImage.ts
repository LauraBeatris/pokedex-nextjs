/**
 * Returns the path to the pokemon image by name
 * @param {*} pokemonName The pokemon name
 */
const getPokemonImage = (pokemonName: string): string => {
  const transformPokemonName = pokemonName
    .toLowerCase()
    .replace(" ", "-");

  return `/images/pokemons/${transformPokemonName}.jpg`;
};

export default getPokemonImage;
