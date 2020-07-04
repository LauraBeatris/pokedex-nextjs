import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import {
  Spin, Layout, Row, Col, Typography, Tag,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import useSWR from "swr";
import { motion } from "framer-motion";

import stagger from "animations/stagger";
import fadeInUp from "animations/fadeInUp";

import GoBackArrowIcon from "../../public/images/icons/go-back-arrow.svg";
import "../../../styles/pages/details.less";

const Pokemon: React.FC = () => {
  const { query } = useRouter();
  const { data: response, error } = useSWR(
    `/api/pokemon?name=${query.name || ""}`,
    axios,
  );

  if (error) {
    return (
      <Layout className="pokemon-details">
        <Typography.Title>Error while searching for pokemon</Typography.Title>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>
          Pokemon |
          {" "}
          {response?.data?.name ? response?.data.name : "Pokemon Details"}
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

          {
            response?.data ? (
              <Layout.Content>
                <Row className="layout-content-wrapper">
                  <img
                    src={response.data.image}
                    alt={response.data.name}
                    aria-label={response.data.name}
                  />

                  <Col className="pokemon-info">
                    <Typography.Title level={1} className="pokemon-name">
                      {response.data.name}
                    </Typography.Title>
                  </Col>
                  <motion.div variants={stagger(0.08)}>
                    <Col>
                      <ul>
                        {
                          Object.entries(response?.data.base).map(([key, value]) => (
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
            )
          }
        </Layout>
      </motion.div>
    </>
  );
};

export default Pokemon;
