import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Container, Input, Select, MenuItem } from "@material-ui/core";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Heading from "../../components/UI/Heading";
import Editor from "@monaco-editor/react";

const NewFile = () => {
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fileName,
      language,
      code,
    };
    axios.post("/api/files", data).then((res) => {
      console.log(res.data);
      router.push("/myfiles");
    });
  };

  const handleEditorChange = (value, event) => {
    console.log(event);
    setCode(value);
  };

  return (
    <>
      <Head>
        <title>New File | Code Sharing Application</title>
      </Head>
      <Container>
        <div className="py-6">
          <Heading className="mb-6" type="mainHeading">
            New File
          </Heading>
          <div className="mb-2">
            <form onSubmit={handleSubmit}>
              <Select
                value={language}
                label="Language"
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="cpp">C++</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="html">HTML</MenuItem>
                <MenuItem value="css">CSS</MenuItem>
                <MenuItem value="markdown">Markdown</MenuItem>
              </Select>
              <Input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                style={{ marginLeft: "2rem" }}
                placeholder="File name"
              />
              <Button
                type="submit"
                style={{
                  backgroundColor: "blue",
                  padding: "0.1rem 0.5rem",
                  marginLeft: "0.5rem",
                }}
              >
                Save
              </Button>
            </form>
          </div>
          <Editor
            width="800"
            height="60vh"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
          />
          <div className="mt-5">
            <Button
              style={{
                backgroundColor: "red",
                marginRight: "2rem",
              }}
            >
              import from Google Drive
            </Button>
            <Button
              style={{
                backgroundColor: "blue",
              }}
            >
              import from Microsoft Drive
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NewFile;
