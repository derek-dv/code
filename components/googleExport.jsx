import { Button, Modal } from "@material-ui/core";
import { useState } from "react";
const { gapi } = require("gapi-script");

import Heading from "./UI/Heading";

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

const SCOPES = "https://www.googleapis.com/auth/drive";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  border: "2px solid black",
  padding: "4rem",
  overflow: "scroll",
  height: "20rem",
  backgroundColor: "#eee",
};

export default function ({ text, code, name, setAlert }) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const [signedInUser, setSignedInUser] = useState();

  const handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const signout = () => {
    gapi.auth2
      .getAuthInstance()
      .disconnect()
      .then(() => {
        gapi.auth2.getAuthInstance().signOut();
      });
  };

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      // Set the signed in user
      // setSignedInUser(gapi.auth2.getAuthInstance().currentUser.je.Qt);
      console.log(gapi.auth2.getAuthInstance().currentUser);
      setProfile(
        gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
      );
    } else {
      // prompt user to sign in
      handleAuthClick();
    }
  };

  /**
   *  Sign out the user upon button click.
   */
  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().disconnect();
  };

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  const initClient = () => {
    gapi.client
      .init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        clientId:
          process.env.REACT_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          console.log(gapi.auth2.getAuthInstance());

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error) {}
      );
  };

  const handleClientLoad = () => {
    gapi.load("client:auth2", initClient);
    setOpen(true);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={style}>
          <Heading type="mainHeading" className="mb-2">
            Upload to Google Drive
          </Heading>
          <div>
            <img
              src={profile.hK}
              style={{
                margin: "0.5rem 0",
                width: "3rem",
                height: "3rem",
                borderRadius: "5rem",
              }}
            />
            <Button
              onClick={() => {
                signout();
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
              const contentType = file.type || "application/octet-stream";
              const user = gapi.auth2.getAuthInstance().currentUser.get();
              const oauthToken = user.getAuthResponse().access_token;
              const initResumable = new XMLHttpRequest();
              initResumable.open(
                "POST",
                "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
                true
              );
              initResumable.setRequestHeader(
                "Authorization",
                "Bearer " + oauthToken
              );
              initResumable.setRequestHeader(
                "Content-Type",
                "application/json"
              );
              initResumable.setRequestHeader(
                "X-Upload-Content-Length",
                file.size
              );
              initResumable.setRequestHeader(
                "X-Upload-Content-Type",
                contentType
              );
              initResumable.onreadystatechange = function () {
                if (
                  initResumable.readyState === XMLHttpRequest.DONE &&
                  initResumable.status === 200
                ) {
                  const locationUrl =
                    initResumable.getResponseHeader("Location");
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const uploadResumable = new XMLHttpRequest();
                    uploadResumable.open("PUT", locationUrl, true);
                    uploadResumable.setRequestHeader(
                      "Content-Type",
                      contentType
                    );
                    uploadResumable.setRequestHeader(
                      "X-Upload-Content-Type",
                      contentType
                    );
                    uploadResumable.onreadystatechange = function () {
                      if (
                        uploadResumable.readyState === XMLHttpRequest.DONE &&
                        uploadResumable.status === 200
                      ) {
                        console.log(uploadResumable.response);
                        setAlert("File uploaded");
                      }
                    };
                    uploadResumable.send(reader.result);
                  };
                  reader.readAsArrayBuffer(file);
                }
              };

              // You need to stringify the request body containing any file metadata

              initResumable.send(
                JSON.stringify({
                  name: file.name,
                  mimeType: contentType,
                  "Content-Type": contentType,
                  "Content-Length": file.size,
                })
              );
              setOpen(false);
            }}
          >
            Upload
          </Button>
        </div>
      </Modal>
      <Button
        style={{
          backgroundColor: "red",
          marginRight: "2rem",
          color: "white"
        }}
        onClick={() => handleClientLoad()}
      >
        {text}
      </Button>
    </>
  );
}
