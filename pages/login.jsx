import {
  FormControl,
  TextField,
  InputLabel,
  Container,
  Paper,
  Button,
} from "@material-ui/core";
import Loader from "react-loader-spinner";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

import Heading from "../components/UI/Heading";
import Alert from "../components/alert";
import Input from "../components/formInput";

const Login = ({ setAlert, setUser, user }) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState();

  if (user) {
    router.push("/");
  }

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

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
    setErrors(error);
    const data = {
      email,
      password,
    };
    console.log(!isError);
    if (!isError) {
      // setLoading(true);
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
        });
      setLoading(false);
    } else {
      setLoading(false);
    }
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
          <Heading type="sectionHeading">Login</Heading>
          <form onSubmit={submit} autoComplete="off">
            <div className="w-full mt-3">
              <Input
                label="Email"
                error={errors.email ? errors.email : null}
                setValue={setEmail}
                type="email"
              />
            </div>
            <div className="w-full mt-3 mb-3">
              <Input
                label="Password"
                error={errors.password ? errors.password : null}
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
                Login
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "blue", padding: "0.5rem 1rem" }}
                className="text-white text-bold"
                type="submit"
              >
                Login
              </Button>
            )}
          </form>
        </Paper>
        <p className="mt-2 text-sm text-gray-500 text-left">
          Don't have an account?{"  "}
          <Link href="/signup">
            <a className="text-blue-400 underline">Signup</a>
          </Link>
        </p>
        <Link href="/reset-password">
          <a className="text-blue-400">Forgot password</a>
        </Link>
      </div>
    </Container>
  );
};

export default Login;
