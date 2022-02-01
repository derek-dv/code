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
      <div className="flex gap-4 flex-wrap">
        {loading ? (
          <p>Loading</p>
        ) : (
          files.map((file) => (
            <Card
              style={{
                width: "15rem",
                height: "19rem",
              }}
            >
              <Link href={`/file/${file._id}`}>
                <a>
                  <img
                    style={{
                      maxWidth: "15rem",
                      minHeight: "17rem",
                    }}
                    src="/code2.jpg"
                  />
                </a>
              </Link>

              <div className="mx-2 flex justify-between items center">
                <p className="h-full my-auto text-sm font-bold text-gray-800">
                  {file.fileName}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
};

export default Files;
