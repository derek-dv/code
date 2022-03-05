import { Container, Paper, Button } from "@material-ui/core";
import Loader from "react-loader-spinner";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

import Heading from "../components/UI/Heading";
import Alert from "../components/alert";
import Input from "../components/formInput";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: { ...(await serverSideTranslations(locale, ["login", "signup"])) },
  };
}

const Login = ({ setAlert, setUser, user }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState();

  if (user) {
    router.push("/");
  }

  const submit = (e) => {
    e.preventDefault();

    if (isError) return;
    setLoading(true);
    axios
      .post("/api/auth/login", data)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.removeItem("guestId");
        setAlert(`Logged in as ${res.data.email}`);
        setUser(res.data);
        router.push("/");
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      })
      .catch((err) => {
        setLoading(false);
        setPassword("");
        setLoading(false);
        if (err.response.data.error) setLoginError(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Container>
      <div
        style={{ padding: "10rem 0" }}
        className="flex items-center justify-center flex-col"
      >
        {loginError ? <Alert variant="error" text={loginError} /> : null}
        {loading ? "loading" : ""}
        <Paper className="p-4 pt-0 w-full lg:w-96">
          <Heading type="sectionHeading">{t('login:login')}</Heading>
          <form onSubmit={submit} autoComplete="off">
            <div className="w-full mt-3">
              <Input
                label={t('login:email')}
                setValue={setEmail}
                type="email"
              />
            </div>
            <div className="w-full mt-3 mb-3">
              <Input
                label={t('login:password')}
                setValue={setPassword}
                type="password"
              />
            </div>
            {loading ? (
              <Button
                style={{ backgroundColor: "blue", padding: "0.5rem 1rem" }}
                className="text-white text-bold"
                type="submit"
                disabled
                startIcon={<Loader type="Oval" height={20} width={20} />}
              >
                {t('login:login')}
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "blue", padding: "0.5rem 1rem" }}
                className="text-white text-bold"
                type="submit"
              >
                {t('login:login')}
              </Button>
            )}
          </form>
        </Paper>
        <p className="mt-2 text-sm text-gray-500 text-left">
        {t('login:account')}{"  "}
          <Link href="/signup">
            <a className="text-blue-400 underline">{t('signup:signup')}</a>
          </Link>
        </p>
        <Link href="/reset-password">
          <a className="text-blue-400">{t('login:forgot')}</a>
        </Link>
      </div>
    </Container>
  );
};

export default Login;
