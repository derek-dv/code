import Head from "next/head";
import { useState } from "react";

// Components
import Layout from "../components/Layout";
import Alert from "../components/alert";

//
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [alert, setAlert] = useState();
  const [user, setUser] = useState();
  return (
    <>
      <Head>
        <title>Code sharing application</title>
        <meta
          name="description"
          content="We are the best code sharing application"
        />
      </Head>
      <Layout user={user}>
        {alert ? <Alert varient="success" text={alert} /> : null}
        <Component setAlert={setAlert} setUser={setUser} {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
