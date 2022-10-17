import type { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Paper x Web3SF Workshop: How to 10x your paying customers with Web2.5</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A boilerplate for using Paper's Checkout Elements React SDK with a custom ERC-721 contract."
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
