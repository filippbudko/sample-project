import type { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Paper Checkout Elements Template</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A template for using Paper's Checkout Elements React SDK with a custom contract ERC-721."
        />
        <meta
          name="keywords"
          content="Paper, Checkout Elements, React SDK, Custom Contract, ERC-721"
        />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
