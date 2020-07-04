import Link from "next/link";
import {
  Spin, Layout, Row, Col, Typography, Tag,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { motion } from "framer-motion";

import stagger from "animations/stagger";
import fadeInUp from "animations/fadeInUp";

import "styles/pages/details.less";
import GoBackArrowIcon from "../../public/images/icons/go-back-arrow.svg";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const apiUrl = req?.headers?.host
    ? `http://${req.headers.host}`
    : window.location.origin;

  const { data: pokemon } = await axios(
    `${apiUrl}/api/pokemon?name=${escape(query.name as string)}`,
  );

  return {
    props: {
      pokemon,
    },
  };
};

const Pokemon: React.FC = ({ pokemon }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>
        Pokemon |
        {" "}
        {pokemon?.name ? pokemon.name : "Pokemon Details"}
      </title>
    </Head>
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <Layout className="pokemon-details">
        <Layout.Header className="pokemon-details-header">
          <motion.div
            whileHover={{ translateX: 5 }}
            whileTap={{ translateX: -2 }}
          >
            <Link href="/">
              <div>
                <GoBackArrowIcon />
              </div>
            </Link>
          </motion.div>
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
              <motion.div variants={stagger(0.08)}>
                <Col>
                  <ul>
                    {
                      Object.entries(pokemon.base).map(([key, value]) => (
                        <motion.li key={key} variants={fadeInUp}>
                          <strong>{key}</strong>
                          <Tag color="magenta">{value}</Tag>
                        </motion.li>
                      ))
                    }
                  </ul>
                </Col>
              </motion.div>
            </Row>
          </Layout.Content>
        ) : (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        )}
      </Layout>
    </motion.div>
  </>
);

export default Pokemon;
