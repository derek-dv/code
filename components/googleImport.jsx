import { Button } from "@material-ui/core";
import { useState } from "react";
const { gapi } = require("gapi-script");
import FileModal from "./fileModal";
// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/drive";

export default function ({ setCode, setName, setAlert, text }) {
  const [listDocumentsVisible, setListDocumentsVisibility] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoadingGoogleDriveApi, setIsLoadingGoogleDriveApi] = useState(false);
  const [isFetchingGoogleDriveFiles, setIsFetchingGoogleDriveFiles] =
    useState(false);
  const [signedInUser, setSignedInUser] = useState({});
  const handleChange = (file) => {};

  /**
   * Print files.
   */
  const listFiles = (searchTerm = null) => {
    setIsFetchingGoogleDriveFiles(true);
    gapi.client.drive.files.list({}).then(function (response) {
      setIsFetchingGoogleDriveFiles(false);
      setListDocumentsVisibility(true);
      const res = JSON.parse(response.body);
      console.log(res.files);
      setDocuments(res.files);
    });
  };

  /**
   *  Sign in the user upon button click.
   */
  const handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
  };

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      // Set the signed in user
      setSignedInUser(
        gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
      );
      setIsLoadingGoogleDriveApi(false);
      // list files if user is authenticated
      // setSignedInUser(gapi.auth2.currentUser.get().getBasicProfile())
      console.log(gapi.auth2.currentUser);
      listFiles();
    } else {
      // prompt user to sign in
      handleAuthClick();
    }
  };

  /**
   *  Sign out the user upon button click.
   */
  const handleSignOutClick = () => {
    gapi.auth2
      .getAuthInstance()
      .disconnect()
      .then(() => {
        gapi.auth2.getAuthInstance().signOut();
      });
  };

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  const initClient = () => {
    setIsLoadingGoogleDriveApi(true);
    gapi.client
      .init({
        apiKey: "AIzaSyB94z5c_LzLmTF28VH261Eb7avAb4_guFE",
        clientId:
          "968608582905-42e5jg30ds0dd2jnp2l4rtf77j5156qr.apps.googleusercontent.com",
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
  };

  return (
    <>
      <FileModal
        open={listDocumentsVisible}
        setOpen={setListDocumentsVisibility}
        files={documents}
        setCode={setCode}
        setName={setName}
        setAlert={setAlert}
        signout={handleSignOutClick}
        profile={signedInUser}
      />
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
