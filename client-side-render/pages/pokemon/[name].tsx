import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";

const Pokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState(null);
  const { query } = useRouter();
  const { data: response, error } = useSWR(
    `/api/pokemon?name=${escape(query.name as string)}`,
    axios,
  );

  useEffect(() => {
    if (response?.data) {
      const image = `/pokemon/${response?.data.name.english
        .toLowerCase()
        .replace(" ", "-")}.jpg`;

      const formattedPokemon = {
        ...response.data,
        image,
        name: response?.data.name.english,
      };

      setPokemon(formattedPokemon);
    }
  }, [response?.data]);

  if (error) {
    return (
      <div>
        <p>Error while searching for pokemon</p>
      </div>
    );
  }

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>

      <div>
        <img
          src={pokemon.image}
          aria-label={pokemon.name}
          alt={pokemon.name}
          title={pokemon.title}
        />
      </div>

      <ul>
        {!!pokemon.base && (
          Object.entries(pokemon.base)
            .map(([key, value]) => (
              <li key={key}>
                <strong>{key}</strong>
                <span>{value}</span>
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default Pokemon;
