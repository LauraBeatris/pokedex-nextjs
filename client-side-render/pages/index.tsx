import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Typography, Layout, Input, Row, Col, Spin, Tag } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import useSWR from "swr";

import "../../styles/pages/search.less";

const Home: React.FC = () => {
  const { query } = useRouter();
  const [search, setSearch] = useState(query.name || "");
  const { data: response } = useSWR(`/api/search?name=${search}`, axios);

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Pokemon | Explore</title>
      </Head>
      <Layout className="ant-layout">
        <Layout.Header>
          <Row>
            <Col>
              <Typography.Title level={1} className="application-title">
                Pokedex
              </Typography.Title>
              <Typography.Text className="technology-subtitle">
                Client Side Rendering
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
            {response?.data ? (
              response?.data.map((pokemon) => (
                <Col span={12} key={pokemon.id}>
                  <Link href={`/pokemon/${pokemon.name}`}>
                    <Row className="pokemon-card">
                      <Col>
                        <Typography.Text className="pokemon-name">
                          {pokemon.name}
                        </Typography.Text>
                      </Col>

                      <Col className="pokemon-info">
                        <Row className="pokemon-types">
                          {pokemon.type?.map((type) => (
                            <Tag color="magenta" key={type}>
                              {type}
                            </Tag>
                          ))}
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
                </Col>
              ))
            ) : (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
              />
            )}
          </Row>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default Home;
