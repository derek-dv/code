import { Container, Paper, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Heading from "../../components/UI/Heading";
import Input from "../../components/formInput";

export default function ({ setAlert, setUser }) {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState();
  const [email, setEmail] = useState("");
  const token = router.query.token || null;

  useEffect(() => {
    if (!token) return;
    setLoading(true);

    axios
      .get(`/api/auth/change-email/${token}`)
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.response);
        setErrors(err.response.data.error);
        setSuccess(false);
        setLoading(false);
      });
  }, [token]);

  const submit = (e) => {
    e.preventDefault();

    const data = {
      email,
    };

      axios.post(`/api/auth/change-email/${token}`, data).then((res) => {
        localStorage.removeItem("user")
        setUser(null)
        router.push("/login");
        setAlert("Email changed! You can now try to log in.");
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      });
    };
  return (
    <Container>
      <div
        style={{ padding: "10rem 0" }}
        className="flex items-center justify-center flex-col"
      >
        {loading ? (
          <p>Loading</p>
        ) : success ? (
          <Paper className="p-4 pt-0 w-full lg:w-96">
            <Heading type="sectionHeading">Reset Password</Heading>
            <form onSubmit={submit} autoComplete="off">
              <div className="w-full my-3">
                <Input
                  label="New Email"
                  setValue={setEmail}
                  type="email"
                  required
                />
              </div>

              <Button
                style={{ backgroundColor: "blue", padding: "0.5rem 1rem" }}
                className="text-white text-bold"
                type="submit"
              >
                Change Email
              </Button>
            </form>
          </Paper>
        ) : (
          <p>{errors}</p>
        )}
      </div>
    </Container>
  );
}
