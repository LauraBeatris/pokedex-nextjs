import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Pokedex | Welcome</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
