import { Container, Button, Paper, Modal } from "@material-ui/core";
import { useEffect, useState } from "react"
import Loader from "react-loader-spinner";;
import { useRouter } from "next/router";
import axios from "axios";
import CustomInput from "../components/formInput";
import Heading from "../components/UI/Heading";
import Alert from "../components/alert";
import Input from "../components/formInput";

export default function ({ setAlert, user, setUser}) {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [passwordError, setPasswordError] = useState(null);
  const [files, setFiles] = useState();
  const [email, setEmail] = useState();
  const [changeEmail, setChange] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    border: "2px solid black",
    padding: "4rem",
    minHeight: "18rem",
    backgroundColor: "#eee",
  };

  useEffect(() => {
    if (user) {
      setLoading(true)
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
        }).finally(()=>{
          setLoading(false)
        });
    }
  }, [user]);

  const handleChangePassword = () => {
    axios
      .post(`/api/auth/change-password`, { email: user.email, password, oldPassword })
      .then((res) => {
        console.log(res.data);
        setOpen(false)
        setAlert("Your password has been changed");
      })
      .catch((err) => {
        console.log(err);
        setPasswordError(err.response.data.error)
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
        router.push('/emailVerify')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeEmail = () => {
    axios
      .post(`/api/auth/change-email`, { _id: user.user_id, email })
      .then((res) => {
        console.log(res.data);
        setEmail(email)
        const newUser = {
          ...user,
          email: email
        }
        localStorage.setItem("user", JSON.stringify(newUser))
        setUser(newUser)
        setChange(false)
        setAlert("Your Email has been changed!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className="mt-5">
    {loading ? <Loader type="Oval"/> : user && !error ? (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div style={style}>{passwordError ? <Alert variant="error" text={passwordError} /> : null}
              <Heading type="sectionHeading" className="text-center">
                Change Password
              </Heading>
              <form>
                <div className="mb-3">
                  <Input
                    type="password"
                    label="Old Password"
                    setValue={setOldPassword}
                  />
                </div>
                <div className="mt-2 mb-3">
                  <Input
                    type="password"
                    label="New Password"
                    setValue={setPassword}
                  />
                </div>
                <Button style={{ backgroundColor: "blue", color: "white" }} onClick={handleChangePassword}>
                  Change Password
                </Button>
              </form>
            </div>
          </Modal>
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
                      <Input type="email" label={"Email"} setValue={setEmail} />
                    </td>
                    <td>
                      <Button
                        onClick={() => handleChangeEmail()}
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
                    onClick={() => setOpen(true)}
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
