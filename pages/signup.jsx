import {
  Container,
  TextField,
  FormControl,
  Paper,
  Button,
} from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import Alert from "../components/alert";
import Input from "../components/formInput";
import { signupSchema } from "../utils/schema/authSchema";

const Signup = ({ setAlert }) => {
  const [errors, setErrors] = useState({});
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

    if (!isError) {
      const data = { email, password, confirmPassword: confirm };
      axios
        .post("/api/auth/signup", data)
        .then((res) => {
          console.log(res.data);
          setAlert(
            `Verification link: works.codemash.me/verify-token/${res.data.emailVerificationToken}`
          );
          router.push("/emailVerify");
          // setTimeout(() => {
          //   setAlert(null);
          // }, 5000);
        })
        .catch((err) => {
          if (err.response.data) setSignupError(err.response.data.error);
        });
    }
  };
  return (
    <Container>
      <div
        style={{ padding: "10rem 0" }}
        className="flex items-center justify-center flex-col"
      >
        {signupError ? <Alert variant="error" text={signupError} /> : null}
        <Paper className="p-4 pt-0 w-full lg:w-96">
          <h2 className="text-xl font-bold">Sign Up</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="w-full mt-2">
              <Input
                label="Email"
                error={errors.email ? errors.email : null}
                setValue={setEmail}
              />
            </div>

            <div className="w-full mt-2">
              <Input
                type="password"
                label="Password"
                error={errors.password ? errors.password : null}
                setValue={setPassword}
              />
            </div>

            <div className="w-full mt-2 mb-3">
              <Input
                type="password"
                label="Confirm Password"
                error={errors.confirm ? errors.confirm : null}
                setValue={setConfirm}
              />
            </div>

            <Button
              style={{ backgroundColor: "blue" }}
              className="text-white text-bold"
              type="submit"
            >
              Signup
            </Button>
          </form>
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
