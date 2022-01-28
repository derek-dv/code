import {
  FormControl,
  TextField,
  InputLabel,
  Container,
  Paper,
  Input,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";

import Heading from "../components/UI/Heading";
import { loginSchema } from "../utils/schema/authSchema";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: yupResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  console.log(form);

  const submit = (e) => {
    e.preventDefault();
    console.log(errors);
    const data = {
      email,
      password,
    };

    setLoading(true);
    axios.post("/api/auth/login", data).then((res) => {
      localStorage.setItem("user", res.data);
      router.push("/");
    });
  };
  return (
    <Container>
      <div
        style={{ padding: "10rem 0" }}
        className="flex items-center justify-center flex-col"
      >
        <Paper className="p-4 pt-0 w-full lg:w-96">
          <Heading type="sectionHeading">Login</Heading>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(submit)} autoComplete="off">
              <div className="w-full mt-3">
                <FormControl fullWidth>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    variant="outlined"
                    type="email"
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email.message : null}
                  />
                </FormControl>
              </div>
              <div className="w-full mt-3 mb-3">
                <FormControl fullWidth>
                  <TextField
                    name="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    type="password"
                    error={errors.password ? true : false}
                    helperText={
                      errors.password ? errors.password.message : null
                    }
                  />
                </FormControl>
              </div>
              <Button
                style={{ backgroundColor: "blue" }}
                className="text-white text-bold"
                type="submit"
              >
                Login
              </Button>
            </form>
          </FormProvider>
        </Paper>
        <p className="mt-2 text-sm text-gray-500 text-left">
          Don't have an account?{"  "}
          <Link href="/signup">
            <a className="text-blue-400 underline">Signup</a>
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;
