import { Container, Button, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CustomInput from "../components/formInput";
import Heading from "../components/UI/Heading";
import Input from "../components/formInput";

export default function ({ setAlert, user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [files, setFiles] = useState();
  const [email, setEmail] = useState();
  const [changeEmail, setChange] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/files/author/${user.user_id}`)
        .then((res) => {
          setFiles(res.data);
          setEmail(user.email);
          setError(false);
        })
        .catch((err) => {
          console.log(err.response);
          setError(true);
        });
    }
  }, [user]);

  const handleChangePassword = () => {
    axios
      .post(`/api/auth/reset-password`, { email: user.email })
      .then((res) => {
        console.log(res.data);
        setAlert("Check your Email for further steps");
        router.push("/changePassword");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVerifyToken = () => {
    axios
      .post(`/api/auth/verify-email/resend-token`, {
        email: user.email,
        _id: user.user_id,
      })
      .then((res) => {
        console.log(res.data);
        setAlert("Email successfully changed!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeEmail = () => {
    axios
      .post(`/api/auth/change-email`, { email: user.email })
      .then((res) => {
        console.log(res.data);
        setAlert("Check your Email for further steps");
        router.push("/changeEmail");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="mt-5">
      {user && !error ? (
        <>
          <Heading type="mainHeading" className="mb-3">
            Profile Page
          </Heading>
          <table id="customers">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total files uploaded</td>
                <td>{files.totalFiles}</td>
                <td></td>
              </tr>

              <tr>
                <td>Total file size</td>
                <td>{files.fileSize}</td>
                <td></td>
              </tr>
              <tr>
                <td>Email</td>
                {changeEmail ? (
                  <>
                    <td>
                      <Input type="email" label={email} setValue={setEmail} />
                    </td>
                    <td>
                      <Button
                        onClick={() => handleChangeEmail}
                        style={{ backgroundColor: "blue", marginRight: "1rem" }}
                      >
                        Change
                      </Button>
                      <Button
                        onClick={() => setChange(false)}
                        style={{ backgroundColor: "red" }}
                      >
                        Cancel
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.email}</td>
                    <td>
                      <Button
                        style={{ backgroundColor: "blue" }}
                        onClick={() => setChange(true)}
                      >
                        Change Email
                      </Button>
                    </td>
                  </>
                )}
              </tr>

              <tr>
                <td>Email Verified</td>
                <td>{user.verified ? "Yes" : "No"}</td>
                <td>
                  {user.verified ? null : (
                    <Button
                      style={{ backgroundColor: "blue" }}
                      onClick={handleVerifyToken}
                    >
                      Verify token
                    </Button>
                  )}
                </td>
              </tr>

              <tr>
                <td>Password</td>
                <td>********</td>
                <td>
                  <Button
                    style={{ backgroundColor: "blue" }}
                    onClick={handleChangePassword}
                  >
                    Change password
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p></p>
      )}
    </Container>
  );
}
