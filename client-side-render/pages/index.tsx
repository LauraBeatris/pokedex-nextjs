import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

const Home: React.FC = () => {
  const { query } = useRouter();
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState(query.name || "");
  const { data: response } = useSWR(`/api/search?name=${search}`, axios);

  useEffect(() => {
    const pokemons = response?.data?.map((pokemon) => {
        const image = `/pokemon/${pokemon.name.english
          .toLowerCase()
          .replace(" ", "-")}.jpg`;

        return {
          ...pokemon,
          image,
          name: pokemon.name.english,
        }
    });

    setPokemons(pokemons);
  }, [response?.data?.map]);

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  if (!response) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <header>
        <img
          src="images/pikachu.png"
          aria-label="Pikachu"
          alt="Pikachu"
          title="Pikachu"
        />

        <h1>Pokedex</h1>
      </header>

      <section>
        <input
          type="text"
          placeholder="Search for a pokemon"
          aria-label="Search for a pokemon"
          onChange={handleSearch}
          value={search}
        />

        {!!pokemons?.length && (
          <ul>
            {
              pokemons.map(pokemon => (
                <li key={pokemon.id}>
                  <img
                    src={pokemon.image}
                    aria-label={pokemon.name}
                    alt={pokemon.name}
                    title={pokemon.title}
                  />

                  <Link href={`/pokemon/${pokemon.name}`}>
                    <strong>{pokemon.name}</strong>
                  </Link>
                  <span>{pokemon.type.join(", ")}</span>
                </li>
              ))
            }
          </ul>
        )}
      </section>
    </div>
  );
};

export default Home;
