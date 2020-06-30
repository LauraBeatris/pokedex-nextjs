import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Layout,
  Input,
  Row,
  Col,
} from "antd";
import axios from "axios";
import useSWR from "swr";

const Home: React.FC = () => {
  const { query } = useRouter();
  const [pokemons, setPokemons] = useState([]);
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
    <Layout style={{ background: "none", padding: "18px 29px" }}>
      <Layout.Header style={{ background: 'none', color: 'primary', padding: "0" }}>
        <Row style={{ flexDirection: "column" }}>
          <Col style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography.Title level={1} style={{ margin: 0, lineHeight: 1}}>Pokedex</Typography.Title>
            <Typography.Text style={{ fontSize: 14, lineHeight: '0px', margin: "10px 0 20px" }}>
              Client Side Rendering
            </Typography.Text>
          </Col>
        </Row>

        <Row>
          <Input.Search
            placeholder="Search for a pokemon"
            onChange={handleSearch}
            value={search}
            style={{ width: "250px" }}
          />
        </Row>
      </Layout.Header>
      <Layout.Content style={{ marginTop: 90 }}>
      <Row gutter={[24, 16]}>
        {
          (pokemons || []).map(pokemon => (
            <Col span={12} style={{
              backgroundColor: '#FF5555',
              borderRadius: 8,
              minHeight: 184,
              width: 182
            }}>
              <Typography.Text className="pokemon-name">{pokemon.name}</Typography.Text>
            </Col>
          ))
        }
      </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Home;
