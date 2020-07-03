import Link from "next/link";
import { Spin, Layout, Row, Col, Typography, Tag } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import getPokemonImage from "utils/getPokemonImage";
import GoBackArrowIcon from "../../public/images/icons/go-back-arrow.svg";
import "../../../styles/pages/details.less";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const apiUrl = req?.headers?.host
    ? `http://${req.headers.host}`
    : window.location.origin;

  const response = await axios(
    `${apiUrl}/api/pokemon?name=${escape(query.name as string)}`,
  );

  const pokemon = {
    ...response.data,
    image: getPokemonImage(response.data.name.english),
    name: response.data.name.english
  };

  return {
    props: {
      pokemon,
    },
  };
};

const Pokemon: React.FC = ({ pokemon }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
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
                aria-label={pokemon.name}
              />

            <Col className="pokemon-info">
              <Typography.Title
                  level={1}
                  className="pokemon-name"
                >
                  {pokemon.name}
                </Typography.Title>
            </Col>
            <Col>
              <ul>
                {
                  Object.entries(pokemon.base)
                    .map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}</strong>
                        <Tag color="magenta">{value}</Tag>
                      </li>
                  ))
                }
              </ul>
            </Col>
           </Row>
        </Layout.Content>
      ) : (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
      )}
    </Layout>
);

export default Pokemon;
