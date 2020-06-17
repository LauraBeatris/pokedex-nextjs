import React, { useState, useCallback, useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const apiUrl = req && req.headers && req.headers.host
    ? `http://${req.headers.host}`
    : window.location.origin;

  const response = await axios.get(`${apiUrl}/api/search?name=${query.search}`);

  const pokemons = response?.data?.map((pokemon) => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english
      .toLowerCase()
      .replace(" ", "-")}.jpg`,
    name: pokemon.name.english,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

const Home: React.FC = ({
  pokemons: initialPokemons,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { query } = useRouter();
  const [pokemons, setPokemons] = useState(initialPokemons || []);
  const [search, setSearch] = useState(query.name || "");
  const { data: response } = useSWR(`/api/search?name=${search}`, axios);

  useEffect(() => {
    const formattedPokemons = response?.data?.map((pokemon) => {
      const image = `/pokemon/${pokemon.name.english
        .toLowerCase()
        .replace(" ", "-")}.jpg`;

      return {
        ...pokemon,
        image,
        name: pokemon.name.english,
      };
    });

    setPokemons(formattedPokemons);
  }, [response?.data?.map]);

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

        {!!pokemons?.length && (
          <ul>
            {pokemons.map((pokemon) => (
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
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Home;
