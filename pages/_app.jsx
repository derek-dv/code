import Head from "next/head";
import crypto from "crypto";
import { useState, useEffect } from "react";

// Components
import Layout from "../components/Layout";
import Alert from "../components/alert";

//
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [alert, setAlert] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("user") && !localStorage.getItem("guestId")) {
      const guestId = crypto.randomBytes(16).toString("hex");
      localStorage.setItem("guestId", guestId);
    }

    if (localStorage.getItem("user")) {
      const temp = JSON.parse(localStorage.getItem("user"));
      setUser(temp);
    } else {
      setUser(undefined);
    }
  }, []);

  useEffect(()=>{
    setTimeout(()=>{
      setAlert(null)
    }, 10000)
  }, [alert])

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
        <Component
          user={user}
          setAlert={setAlert}
          setUser={setUser}
          {...pageProps}
        />
      </Layout>
    </>
  );
}

export default MyApp;
