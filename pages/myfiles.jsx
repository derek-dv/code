import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
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

const Files = ({ user }) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorId, setAuthorId] = useState();

  useEffect(() => {
    setLoading(true);
    let author_id;
    if (user) {
      author_id = user.user_id;
      setAuthorId(author_id);
    } else if (localStorage.getItem("guestId")) {
      author_id = localStorage.getItem("guestId");
      setAuthorId(author_id);
    }
    console.log(process.env.NEXT_PUBLIC_MICROSOFT_APP_ID)

    console.log(author_id);
    axios
      .get(`/api/files/author/${author_id}`)
      .then((res) => {
        const ser = res.data.files;
        console.log(ser);
        setFiles(ser);
        setLoading(false);
        console.log(user);
        console.log('2' + process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [user]);

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
        {loading ? (
          <p>Loading</p>
        ) : (
          <table id="customers">
            <thead>
              <tr>
                <th>Index</th>
                <th>ID</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {files
                ? files.map((file, index) => (
                    <tr>
                      <td>{index}</td>
                      <td>{file._id}</td>
                      <td>{file.fileName}</td>
                      <td>
                        <>
                          <Link href={`/file/${file._id}`}>
                            <Button
                              style={{
                                backgroundColor: "blue",
                                marginRight: "2rem",
                              }}
                            >
                              Edit
                            </Button>
                          </Link>
                          <Button
                            style={{ backgroundColor: "red" }}
                            onClick={() => {
                              axios
                                .delete(`/api/files/${file._id}`)
                                .then((res) => {
                                  axios
                                    .get(`/api/files/author/${authorId}`)
                                    .then((res) => {
                                      setFiles(res.data.files);
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                });
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
};

export default Files;
