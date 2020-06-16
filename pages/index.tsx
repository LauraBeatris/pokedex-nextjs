import { useState, useCallback } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';

export default function Home() {
  const { query } = useRouter();
  const [search, setSearch] = useState(query.name || "");
  const { data: response } = useSWR(`/api/search?name=${search}`, axios);

  const formattedPokemons = response?.data?.map((pokemon) => ({
      ...pokemon,
      image: `/pokemon/${pokemon.name.english
        .toLowerCase()
        .replace(" ", "-")}.jpg`,
      name: pokemon.name.english
    })
  );

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

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

        {!!formattedPokemons?.length && (
          <ul>
            {formattedPokemons.map(pokemon => (
              <li>
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
            ))}
          </ul>
      )}
      </section>
    </div>
  )
}
