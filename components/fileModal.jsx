import { Button, Box, Modal, Typography } from "@material-ui/core";
import Heading from "./UI/Heading";
import { gapi } from "gapi-script";
import axios from "axios";
import { useState } from "react";

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

export default function BasicModal({
  profile,
  signout,
  open,
  setOpen,
  setAlert,
  files,
  setCode,
  setName,
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(profile);

  return (
    <div>
      <Modal
        style={{ overflow: "scroll" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <Heading type="sectionHeading" className="text-center">
            Google Drive Files
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
              style={{ backgroundColor: "blue", margin: "0.5rem 0" }}
            >
              Use another account
            </Button>
          </div>
          <table id="customers">
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <>
                  {file.mimeType.includes("application") ||
                  file.mimeType.includes("text") ? (
                    <tr key={file.id}>
                      <td>{index}</td>
                      <td>{file.name}</td>
                      <td>
                        <Button
                          style={{ backgroundColor: "blue" }}
                          onClick={() => {
                            gapi.client.drive.files
                              .get({
                                fileId: file.id,
                                alt: "media",
                              })
                              .then(
                                function (success) {
                                  console.log(success.body);
                                  setCode(success.body);
                                  setName(file.name);
                                  setOpen(false);
                                },
                                function (fail) {
                                  console.log(
                                    "Error " + fail.result.error.message
                                  );
                                  setAlert(fail.result.error.message);
                                }
                              );
                          }}
                        >
                          Import
                        </Button>
                      </td>
                    </tr>
                  ) : null}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}
