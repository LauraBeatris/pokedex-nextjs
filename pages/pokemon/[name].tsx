import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import useSWR from 'swr';

const Pokemon = () => {
  const { query } = useRouter();
  const { data: response, error } = useSWR(`/api/pokemon?name=${escape(query.name as string)}`, axios);
  const formattedPokemon = {
    ...(response?.data ? {
      ...response?.data,
      image: `/pokemon/${response?.data.name.english
        .toLowerCase()
        .replace(" ", "-")}.jpg`,
      name: response?.data.name.english
    } : {})
  }

  if (error) {
    return (
      <div>
        <p>Error while searching for pokemon</p>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>{(response?.data && formattedPokemon.name) || "Pokemon"}</title>
      </Head>

      <h1>{formattedPokemon.name}</h1>

      <div>
        <img
          src={formattedPokemon.image}
          aria-label={formattedPokemon.name}
          alt={formattedPokemon.name}
          title={formattedPokemon.title}
        />
      </div>
      <ul>
        {!!formattedPokemon.base && Object.entries(formattedPokemon.base).map(([key, value]) => (
          <li>
            <strong>{key}</strong>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pokemon;
