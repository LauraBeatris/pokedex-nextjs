import getPokemonImage from "utils/getPokemonImage";
import { Pokemon, PokemonName } from "shared/types";

interface FormattedPokemon extends Omit<Pokemon, "name"> {
  image: string;
  name: PokemonName["english"]
}

/**
 * Format a pokemon
 * @param {*} pokemon The pokemon
 */
const formatPokemon = (pokemon: Pokemon): FormattedPokemon => ({
  ...pokemon,
  image: getPokemonImage(pokemon.name.english),
  name: pokemon.name.english,
});

export default formatPokemon;
