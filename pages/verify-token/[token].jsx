import Link from "next/link";
import { Container, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

import Heading from "../../components/UI/Heading";

export default function () {
  const { query } = useRouter();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  let token = query.token || null;
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    console.log(query.token);
    axios
      .get(`/api/auth/verify-email/${token}`)
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.response);
        setMessage(err.response.data.error);
        setSuccess(false);
        setLoading(false);
      });
  }, [token]);
  return (
    <Container>
      <div className="mt-5">
        <Heading type="mainHeading">Verify Token</Heading>
        {loading ? (
          <p>Please wait</p>
        ) : (
          <div>
            {success ? (
              <>
                <p>
                  Congratulations! Your Email has been successfully verified.
                </p>
                <Link href="/login">
                  <Button style={{ backgroundColor: "blue" }}>
                    Go to login page
                  </Button>
                </Link>
              </>
            ) : (
              <p>{message}</p>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
