import { NextApiRequest, NextApiResponse } from "next";

import filterPokemons from "utils/filterPokemons";
import pokemonData from "pokemon.json";

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const filterQueryName = req.query.name
    ? new RegExp(req.query.name as string, "i")
    : /.*/;

  const filteredPokemons = filterPokemons(pokemonData, filterQueryName);

  res.setHeader("Content-Type", "application/json");

  return res
    .status(200)
    .send(JSON.stringify(filteredPokemons));
};
