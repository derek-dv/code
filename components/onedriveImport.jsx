import { Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import FileModal from "./oneDriveModal";

const ms_graph = "https://graph.microsoft.com/v1.0";
const APP_ID = process.env.REACT_APP_MICROSOFT_APP_ID;
const REDIRECT_URI = process.env.REACT_APP_MICROSOFT_REDIRECT_URI;
const SCOPES = ["Files.ReadWrite"];

export default function ({ setCode, setName, setAlert, text }) {
  const [error, setError] = useState(null);
  const [isAth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [accessToken, setAccessToken] = useState();

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

    try{
      await publicClient.loginPopup({
      scopes: SCOPES,
      prompt: "select_account",
    });

    }

    catch(err) {
      console.error(err)
    }
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
        const config = {
          headers: {
            Authorization: `Bearer ${accessTokenResponse.accessToken}`,
          },
        };
        axios
          .get(`${ms_graph}/me/drive/root/children`, config)
          .then((res) => {
            console.log(res.data.value);
            setFiles(res.data.value);
            setUser(account.name);
            setOpen(true);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <FileModal
        open={open}
        setOpen={setOpen}
        files={files}
        setCode={setCode}
        setName={setName}
        setAlert={setAlert}
        token={accessToken}
        setFiles={setFiles}
        user={user}
      />
      <Button
        onClick={() => {
          login();
        }}
        style={{
          backgroundColor: "blue",
          color: "white"
        }}
      >
        {text}
      </Button>
    </>
  );
}
