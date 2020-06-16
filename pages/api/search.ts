import { NextApiRequest, NextApiResponse } from 'next';
import pokemonData from 'pokemon.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const filter = req.query.name ?
    new RegExp(req.query.name as string, "i")
    :
    /.*/;

  const filteredPokemons = pokemonData
    .filter(({ name: { english } }) => english.match(filter))
    .slice(0, 10);

  res.setHeader("Content-Type", "application/json");

  return res.
    status(200)
    .send(JSON.stringify(filteredPokemons))
}
