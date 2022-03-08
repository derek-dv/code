import { Container, Paper, Button } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
import { useState } from "react";
import axios from "axios";
import Alert from "../components/alert";
import Input from "../components/formInput";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: { ...(await serverSideTranslations(locale, ["login", "signup"])) },
  };
}

const Signup = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [signupError, setSignupError] = useState();

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    let error = {};

    let isError = false;
    if (email.length < 1) {
      error.email = "Email is required";
      isError = true;
    }

    if (password.length < 8) {
      error.password = "Password length must be at least 8";
      isError = true;
    }

    if (password !== confirm) {
      error.confirm = "Passwords do not match";
      isError = true;
    }
    setErrors(error);
    if (isError) return;

    setLoading(true);
    const data = { email, password, confirmPassword: confirm };
    axios
      .post("/api/auth/signup", data)
      .then((res) => {
        console.log(res.data);
        router.push("/emailVerify");
      })
      .catch((err) => {
        if (err.response.data) setSignupError(err.response.data.error);
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
        {signupError ? <Alert variant="error" text={signupError} /> : null}
        <Paper className="p-4 pt-0 w-full lg:w-96">
          <h2 className="text-xl font-bold">{t("signup:signup")}</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="w-full mt-2">
              <Input
                label={t("login:email")}
                error={errors.email ? errors.email : null}
                setValue={setEmail}
              />
            </div>

            <div className="w-full mt-2">
              <Input
                type="password"
                label={t("login:password")}
                error={errors.password ? errors.password : null}
                setValue={setPassword}
              />
            </div>

            <div className="w-full mt-2 mb-3">
              <Input
                type="password"
                label={t("signup:confirm")}
                error={errors.confirm ? errors.confirm : null}
                setValue={setConfirm}
              />
            </div>
            {loading ? (
              <Button
                style={{ backgroundColor: "blue", color: "gray", padding: "0.5rem 1rem" }}
                className="text-white text-bold"
                type="submit"
                disabled
                startIcon={<Loader type="Oval" height={20} width={20} />}
              >
                {t("signup:signup")}
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "blue", color: "white", padding: "0.5rem 1rem" }}
                className="text-white text-bold"
                type="submit"
              >
                {t("signup:signup")}
              </Button>
            )}
          </form>
        </Paper>
        <p className="mt-2 text-sm text-gray-500 text-left">
          {t("signup:already")}
          {"  "}
          <Link href="/login">
            <a className="text-blue-400 underline">{t("signup:login")}</a>
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Signup;
