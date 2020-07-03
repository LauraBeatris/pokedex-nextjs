import React from "react";
import {
  Spin,
  Layout,
  Row,
  Col,
  Typography,
  Tag,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import Link from "next/link";
import Head from "next/head";

import formatPokemon from "utils/formatPokemon";
import pokemons from "pokemon.json";

import GoBackArrowIcon from "../../public/images/icons/go-back-arrow.svg";
import "../../../styles/pages/details.less";

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

  return {
    props: {
      pokemon: formatPokemon(pokemonFound),
    },
  };
};

const Pokemon: React.FC = ({
  pokemon,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Head>
      <title>
        Pokemon | {pokemon?.name ? pokemon.name : "Pokemon Details"}
      </title>
    </Head>
    <Layout className="pokemon-details">
      <Layout.Header className="pokemon-details-header">
        <Link href="/">
          <GoBackArrowIcon />
        </Link>
      </Layout.Header>

      {pokemon ? (
        <Layout.Content>
          <Row className="layout-content-wrapper">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              aria-label={pokemon.name}
            />

            <Col className="pokemon-info">
              <Typography.Title level={1} className="pokemon-name">
                {pokemon.name}
              </Typography.Title>
            </Col>
            <Col>
              <ul>
                {Object.entries(pokemon.base).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}</strong>
                    <Tag color="magenta">{value}</Tag>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Layout.Content>
      ) : (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
      )}
    </Layout>
  </>
);

export default Pokemon;
