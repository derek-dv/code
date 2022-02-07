import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MenuItems,
  Container,
  Button,
  Input,
  Card,
  IconButton,
} from "@material-ui/core";
import { Add, MoreVert } from "@material-ui/icons";

import Heading from "../components/UI/Heading";
import ReactGrid from "../components/reactGrid";

const Files = ({ user }) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([
    { name: "_id", name: "File ID" },
    { name: "fileName", name: "File Name" },
    { name: "language", name: "Language" },
    { name: "createdAt", name: "Created At" },
    { name: "updatedAt", name: "Updated At" },
  ]);

  const [rows, setRows] = useState();
  useEffect(() => {
    setLoading(true);
    let author_id;
    if (user) {
      author_id = user.user_id;
    } else if (localStorage.getItem("guestId")) {
      author_id = localStorage.getItem("guestId");
    } else author_id = null;
    axios
      .get(`/api/files/author/${author_id}`)
      .then((res) => {
        const ser = res.data;
        setLoading(false);
        console.log(ser);
        setFiles(ser);
        setRows(ser);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="">
      <div className="">
        <Heading className="mt-4" type="sectionHeading">
          My Files
        </Heading>
        <Input className="w-48 mb-2" placeholder="Search" />
        <div className="">
          <Button
            style={{
              backgroundColor: "#ebe9e4",
              marginBottom: "1rem",
            }}
            startIcon={<Add />}
            onClick={() => router.push("/file/new")}
          >
            Blank editor
          </Button>
        </div>
      </div>
      <div className="">
        {loading ? <p>Loading</p> : <ReactGrid rows={rows} columns={columns} />}
      </div>
    </Container>
  );
};

export default Files;
