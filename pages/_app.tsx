import Head from 'next/head'
import { AppProps } from 'next/app'
import "styles/global.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Pokedex | Welcome</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App;
