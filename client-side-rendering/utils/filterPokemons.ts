import formatPokemon from "utils/formatPokemon";
import { Pokemon, PokemonName } from "shared/types";

interface FormattedPokemon extends Omit<Pokemon, "name"> {
  image: string;
  name: PokemonName["english"]
}

/**
 * Filter the pokemons payload returned by the API
 * @param {*} pokemons The pokemons payload
 * @param {*} filterQueryName The query name param to filter pokemons
 */
const filterPokemons = (
  pokemons: Pokemon[],
  filterQueryName: string | RegExp,
): FormattedPokemon[] => {
  const filteredPokemons = pokemons
    .filter((pokemon) => pokemon.name.english.match(filterQueryName))
    .slice(0, 10)
    .map((pokemon) => formatPokemon(pokemon));

  return filteredPokemons;
};

export default filterPokemons;
