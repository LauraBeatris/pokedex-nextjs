import { NextApiRequest, NextApiResponse } from "next";

import pokemonData from "pokemon.json";
import getPokemonImage from "utils/getPokemonImage"

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const filterQueryName = req.query.name
    ? new RegExp(req.query.name as string, "i")
    : /.*/;

  const filteredPokemons = pokemonData
    .filter((pokemon) =>
      pokemon.name.english.match(filterQueryName)
    )
    .slice(0, 10)
    .map((pokemon) => {
      return {
        ...pokemon,
        image: getPokemonImage(pokemon.name.english),
        name: pokemon.name.english,
      };
    });

  res.setHeader("Content-Type", "application/json");

  return res
    .status(200)
    .send(JSON.stringify(filteredPokemons));
};
