import {
  Container,
  TextField,
  FormControl,
  Paper,
  Input,
  Button,
} from "@material-ui/core";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signupSchema } from "../utils/schema/authSchema";

const Signup = () => {
  const form = useForm({
    resolver: yupResolver(signupSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const submit = (e) => {
    e.preventDefault();
    console.log(errors);
  };
  return (
    <Container>
      <div
        style={{ padding: "10rem 0" }}
        className="flex items-center justify-center flex-col"
      >
        <Paper className="p-4 pt-0 w-full lg:w-96">
          <h2 className="text-xl font-bold">Sign Up</h2>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(submit)} autoComplete="off">
              <div className="w-full mt-2">
                <FormControl fullWidth>
                  <TextField
                    name="username"
                    variant="outlined"
                    label="Username"
                    type="text"
                  />
                </FormControl>
              </div>

              <div className="w-full mt-2">
                <FormControl fullWidth>
                  <TextField
                    name="email"
                    variant="outlined"
                    label="Email"
                    type="email"
                  />
                </FormControl>
              </div>

              <div className="w-full mt-2">
                <FormControl fullWidth>
                  <TextField
                    name="password"
                    variant="outlined"
                    label="Password"
                    type="password"
                  />
                </FormControl>
              </div>

              <div className="w-full mt-2 mb-3">
                <FormControl fullWidth>
                  <TextField
                    name="confirmPassword"
                    variant="outlined"
                    label="Confirm Password"
                    type="password"
                  />
                </FormControl>
              </div>

              <Button
                style={{ backgroundColor: "blue" }}
                className="text-white text-bold"
                type="submit"
              >
                Signup
              </Button>
            </form>
          </FormProvider>
        </Paper>
        <p className="mt-2 text-sm text-gray-500 text-left">
          Already have an account?{"  "}
          <Link href="/login">
            <a className="text-blue-400 underline">Login Here</a>
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Signup;
