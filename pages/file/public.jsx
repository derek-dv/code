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

import Heading from "../../components/UI/Heading";
// import { files } from "../dummy";

const Files = () => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/files")
      .then((res) => {
        const ser = res.data.files;
        setLoading(false);
        console.log(ser);
        setFiles(ser);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="">
      <div className="">
        <Heading className="mt-4" type="sectionHeading">
          Public files
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
                              View
                            </Button>
                          </Link>
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
