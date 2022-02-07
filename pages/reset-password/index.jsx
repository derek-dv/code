import { Container, Paper, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Heading from "../../components/UI/Heading";
import Input from "../../components/formInput";
import Alert from "../../components/alert";

export default function ({ setAlert }) {
  const { query } = useRouter();
  const [msg, setMsg] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();

    const data = {
      email,
    };

    axios
      .post(`/api/auth/reset-password`, data)
      .then((res) => {
        setMsg({ type: "success", text: "Check your Email for reset link" });
      })
      .catch((err) => {
        setMsg({ type: "error", text: err.response.data.error });
        console.log(err);
      });
  };
  return (
    <Container>
      <div
        style={{ padding: "10rem 0" }}
        className="flex items-center justify-center flex-col"
      >
        {msg ? <Alert variant={msg.type} text={msg.text} /> : null}
        {loading ? (
          <p>Loading</p>
        ) : (
          <Paper className="p-4 pt-0 w-full lg:w-96">
            <Heading type="sectionHeading">
              Provide Your Email to Reset Password
            </Heading>
            <form onSubmit={submit} autoComplete="off">
              <div className="w-full my-3">
                <Input label="Email" setValue={setEmail} type="email" />
              </div>

              <Button
                style={{ backgroundColor: "blue", padding: "0.5rem 1rem" }}
                className="text-white text-bold"
                type="submit"
              >
                Send Reset Link
              </Button>
            </form>
          </Paper>
        )}
      </div>
    </Container>
  );
}
