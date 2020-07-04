import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";

import "antd/dist/antd.css";
import "styles/main.less";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Pokedex | Welcome</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
