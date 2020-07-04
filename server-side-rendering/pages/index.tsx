import React, { useState, useCallback, useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import Head from "next/head";
import {
  Typography,
  Layout,
  Input,
  Row,
  Col,
  Spin,
  Tag,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import useSWR from "swr";
import { motion } from "framer-motion";

import fadeInUp from "animations/fadeInUp";
import getPokemonImage from "utils/getPokemonImage";
import "styles/pages/search.less";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const apiUrl = req?.headers?.host
    ? `http://${req.headers.host}`
    : window.location.origin;

  const response = await axios.get(`${apiUrl}/api/search?name=${query.name}`);

  const pokemons = response?.data?.map((pokemon) => ({
    ...pokemon,
    image: getPokemonImage(pokemon.name.english),
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
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [search, setSearch] = useState("");
  const { data: response } = useSWR(`/api/search?name=${search}`, axios, {
    revalidateOnFocus: false,
  });

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  useEffect(() => {
    if (response?.data) {
      setPokemons(prev => [...prev, ...response?.data]);
    }
  }, [response?.data]);

  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <Layout className="ant-layout">
        <Head>
          <title>Pokemon | Explore</title>
        </Head>
        <Layout.Header>
          <Row>
            <Col>
              <Typography.Title
                level={1}
                className="application-title"
              >
                Pokedex
              </Typography.Title>
              <Typography.Text className="technology-subtitle">
                Server Site Rendering
              </Typography.Text>
            </Col>
          </Row>

          <Row>
            <Input.Search
              placeholder="Search for a pokemon"
              onChange={handleSearch}
              value={search}
            />
          </Row>
        </Layout.Header>
        <Layout.Content>
          <Row gutter={[24, 16]} className="pokemons-container">
            {
              pokemons ? (
                pokemons.map(pokemon => (
                  <Col span={12} key={pokemon.id}>
                    <motion.div
                      variants={fadeInUp}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 1 }}
                      className="motion-container"
                    >
                      <Link href={`/pokemon/${pokemon.name}`}>
                        <Row className="pokemon-card">
                          <Col>
                            <Typography.Text className="pokemon-name">
                              {pokemon.name}
                            </Typography.Text>
                          </Col>

                          <Col className="pokemon-info">
                            <Row className="pokemon-types">
                              {
                                      pokemon.type?.map(type => (
                                        <Tag
                                          color="magenta"
                                          key={type}
                                        >
                                          {type}
                                        </Tag>
                                      ))
                              }
                            </Row>

                            <Row>
                              <img
                                src={pokemon.image}
                                aria-label={pokemon.name}
                                alt={pokemon.name}
                              />
                            </Row>
                          </Col>
                        </Row>
                      </Link>
                    </motion.div>
                  </Col>
                ))
              ) : (
                <Spin
                  indicator={(
                    <LoadingOutlined style={{ fontSize: 24 }} spin />
                  )}
                />
              )
            }
          </Row>
        </Layout.Content>
      </Layout>
    </motion.div>
  );
};

export default Home;
