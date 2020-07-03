import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import {
  Spin, Layout, Row, Col, Typography, Tag,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import useSWR from "swr";

import GoBackArrowIcon from "../../public/images/icons/go-back-arrow.svg";
import "../../../styles/pages/details.less";

const Pokemon: React.FC = () => {
  const { query } = useRouter();
  const { data: response, error } = useSWR(
    `/api/pokemon?name=${escape(query.name as string)}`,
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
          Pokemon | {response?.data?.name ? response?.data.name : "Pokemon Details"}
        </title>
      </Head>
      <Layout className="pokemon-details">
        <Layout.Header className="pokemon-details-header">
          <Link href="/">
            <div>
             <GoBackArrowIcon />
            </div>
          </Link>
        </Layout.Header>

        {response?.data ? (
          <Layout.Content>
            <Row className="layout-content-wrapper">
              <img
                src={response.data.image}
                alt={response.data.name}
                aria-label={response.data.name}
              />

              <Col className="pokemon-info">
                <Typography.Title
                  level={1}
                  className="pokemon-name"
                >
                  {response.data.name}
                </Typography.Title>
              </Col>
              <Col>
                <ul>
                  {
                    Object.entries(response.data.base)
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
    </>
  );
};

export default Pokemon;
