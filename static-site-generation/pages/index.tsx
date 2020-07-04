import React, { useState, useCallback } from "react";
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
import "styles/pages/search.less";

const Home: React.FC = () => {
  const [search, setSearch] = useState("");
  const { data: response } = useSWR(`/api/search?name=${search}`, axios);

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

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
                Static Site Generation
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
                response?.data ? (
                    response?.data.map(pokemon => (
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
                                        <Tag color="magenta" key={type}>
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
