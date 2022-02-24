import { Button, Modal } from "@material-ui/core";
import axios from "axios";
import Heading from "./UI/Heading";
import { useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";

const ms_graph = "https://graph.microsoft.com/v1.0";
const APP_ID = "8d22d168-17c6-49f9-8118-57c7d5aa2a5d";
const REDIRECT_URI = "https://code.herokuapp.com";
const SCOPES = ["Files.ReadWrite"];

export default function ({ code, name, setAlert }) {
  const [user, setUser] = useState();
  const [open, setOpen] = useState();
  const [accessToken, setAccessToken] = useState();
  const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      border: "2px solid black",
      padding: "4rem",
      overflow: "scroll",
      height: "28rem",
      backgroundColor: "#eee",
    };
  async function login() {
    const publicClient = new PublicClientApplication({
      auth: {
        clientId: APP_ID,
        redirectUri: REDIRECT_URI,
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
      },
    });

    await publicClient.loginPopup({
      scopes: SCOPES,
      prompt: "select_account",
    });

    const account = publicClient.getAllAccounts()[0];

    
    const accessTokenRequest = {
      scopes: SCOPES,
      account: account,
    };
    publicClient
      .acquireTokenSilent(accessTokenRequest)
      .then((accessTokenResponse) => {
        setAccessToken(accessTokenResponse.accessToken);
        console.log(accessTokenResponse.accessToken);
        setOpen(true)
        setUser(account.name)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={style}>
          <Heading type="mainHeading" className="mb-2">
            Upload to OneDrive
          </Heading>
          <div>
            <Heading type="smallHeading">{user}</Heading>
            <Button
              onClick={() => {
                // signout();
              }}
              style={{ backgroundColor: "blue", margin: "1rem 0" }}
            >
              Use another account
            </Button>
          </div>
          <Button
            style={{ backgroundColor: "blue" }}
            onClick={() => {
              const file = new File([code], name, {
                type: "text/plain;charset=utf-8",
              });
              const contentType = "application/octet-stream";
              const config = {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": contentType,
                },
              };

              axios
                .put(`${ms_graph}/me/drive/root:/${name}:/content`, file, config)
                .then((res) => {
                  console.log(res);
                  setOpen(false);
                  setAlert("File uploaded")
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Upload
          </Button>
        </div>
      </Modal>
      <Button
        onClick={() => {
          login();
        }}
        style={{
          backgroundColor: "blue",
        }}
      >
        Export to Microsoft Drive
      </Button>
    </>
  );
}
