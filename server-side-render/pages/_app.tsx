import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";

import 'antd/dist/antd.css';
import "../../styles/main.less";

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Pokedex | Welcome</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
