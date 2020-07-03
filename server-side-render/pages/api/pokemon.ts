import { NextApiRequest, NextApiResponse } from "next";

import pokemonData from "pokemon.json";
import formatPokemon from "utils/formatPokemon";

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .send("You must provide a name in order to find a pokemon");
  }

  const findPokemon = pokemonData.find(
    (pokemon) => pokemon.name.english === req.query.name,
  );

  res.setHeader("Content-Type", "application/json");

  if (!findPokemon) {
    return res
      .status(404)
      .send(`Pokemon ${name} not found`);
  }

  return res
    .status(200)
    .send(JSON.stringify(formatPokemon(findPokemon)));
};
