import { NextApiRequest, NextApiResponse } from 'next';
import pokemonData from "pokemon.json";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .send('You must provide a name in order to find a pokemon');
  } else {
    const pokemonFound = pokemonData.find(
      ({ name: { english } }) => english === req.query.name
    );

    res.setHeader("Content-Type", "application/json")

    if (pokemonFound) {
      return res
        .status(200)
        .send(JSON.stringify(pokemonFound))
    } else {
      return res
        .status(404)
        .send(`Pokemon ${name} not found`)
    }
  }
}
