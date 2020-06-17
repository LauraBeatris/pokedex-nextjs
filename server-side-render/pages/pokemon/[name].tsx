import Head from "next/head";
import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  let apiUrl =
    req && req.headers && req.headers.host
      ? "http://" + req.headers.host
      : window.location.origin;

  const response = await axios(
    `${apiUrl}/api/pokemon?name=${escape(query.name as string)}`
  );

  const image = `/pokemon/${response?.data.name.english
    .toLowerCase()
    .replace(" ", "-")}.jpg`;

  const pokemon = {
    ...response.data,
    image,
    name: response.data.name.english,
  }

  return {
    props: {
      pokemon,
    },
  }
};

const Pokemon: React.FC = ({ pokemon }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Head>
        <title>{(pokemon && pokemon.name) || "Pokemon"}</title>
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
        {!!pokemon.base &&
          Object.entries(pokemon.base).map(([key, value]) => (
            <li key={key}>
              <strong>{key}</strong>
              <span>{value}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Pokemon;
