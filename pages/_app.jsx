import Head from "next/head";
import { Provider } from "react-redux";

// Components
import Layout from "../components/Layout";

//
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Code sharing application</title>
        <meta
          name="description"
          content="We are the best code sharing application"
        />
      </Head>
      <div id="backdrop-bottom-placeholder"></div>
      <div id="notifications-placeholder"></div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
