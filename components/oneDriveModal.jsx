import { IconButton, Button, Box, Modal, Typography } from "@material-ui/core";
import axios from "axios";
import Link from "next/link";
import Heading from "./UI/Heading";
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

const buttonStyle = {
  backgroundColor: "blue",
  color: "white",
};

export default function BasicModal({
  token,
  user,
  open,
  setOpen,
  setAlert,
  setFiles,
  files,
  setCode,
  setName,
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const downloadFile = (accessToken, file) => {
    const url = `https://graph.microsoft.com/v1.0/drive/items/${file.id}/content`;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(url, config)
      .then((res) => {
        console.log(res);
        setName(file.name);
        setCode(res.data);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            One Drive Files and Folders
          </Heading>

          <Heading type="smallHeading">{user}</Heading>
          <div>
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
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {files.map
                ? files.map((file, index) => {
                    if (file.file)
                      return (
                        <tr>
                          <td>{file.name}</td>
                          <td>
                            <Button
                              style={buttonStyle}
                              onClick={() => downloadFile(token, file)}
                            >
                              Open file
                            </Button>
                          </td>
                        </tr>
                      );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}
