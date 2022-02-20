import { Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";

const ms_graph = "https://graph.microsoft.com/v1.0";
const APP_ID = "8d22d168-17c6-49f9-8118-57c7d5aa2a5d";
const REDIRECT_URI = "http://localhost:3000";
const SCOPES = ["Files.ReadWrite"];

export default function () {
  const [error, setError] = useState(null);
  const [isAth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  let accessToken;

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
        accessToken = accessTokenResponse.accessToken;
        console.log(accessTokenResponse.accessToken);
        const config = {
          headers: {
            Authorization: `Bearer ${accessTokenResponse.accessToken}`,
          },
        };
        axios
          .get(`${ms_graph}/me/drive/root/children`, config)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // const listFiles = () => {
  // 	const config = {
  // 		headers: {
  // 		Authorization: `Bearer ${accessToken}`
  // 	}}
  // 	axios.get(`${ms_graph}/me/drive/items`, {}, config).then((res)=>{
  // 		console.log(res)
  // 	}).catch((err)=> {
  // 		console.log(err)
  // 	})
  // }

  return (
    <Button
      onClick={() => {
        login();
      }}
      style={{
        backgroundColor: "blue",
      }}
    >
      import from Microsoft Drive
    </Button>
  );
}
