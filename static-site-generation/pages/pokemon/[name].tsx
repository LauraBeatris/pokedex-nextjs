import React from "react";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";

import pokemons from "pokemon.json";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: pokemons.map((pokemon) => ({
    params: {
      name: pokemon.name.english,
    },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pokemonFound = pokemons
    .find((pokemon) => pokemon.name.english === params.name);

  const image = `/pokemon/${pokemonFound.name.english
    .toLowerCase()
    .replace(" ", "-")}.jpg`;

  const pokemon = {
    ...pokemonFound,
    image,
    name: pokemonFound.name.english,
  };

  return {
    props: {
      pokemon,
    },
  };
};

const Pokemon: React.FC = ({ pokemon }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <div>
    <Head>
      <title>{pokemon.name || "Pokemon"}</title>
    </Head>

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
      {!!pokemon.base
          && Object.entries(pokemon.base).map(([key, value]) => (
            <li key={key}>
              <strong>{key}</strong>
              <span>{value}</span>
            </li>
          ))}
    </ul>
  </div>
);

export default Pokemon;
