import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { Container, Input, Button, Select, MenuItem } from "@material-ui/core";
import { useState, useEffect } from "react";
// Components
import Heading from "../../components/UI/Heading";
import { files } from "../../dummy";

import Editor from "@monaco-editor/react";

const NewFile = () => {
  const { query } = useRouter();
  const fileId = query.fileId || null;
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  // fileName, language, code

  const handleEditorChange = (value, event) => {
    console.log(event);
    setCode(value);
  };

  useEffect(() => {
    if (!fileId) return;
    setLoading(true);
    axios
      .get(`/api/files/${fileId}`)
      .then((res) => {
        console.log(res.data);
        const { fileName, language, code } = res.data;
        setName(fileName);
        setCode(code);
        setLanguage(language);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fileId]);
  return (
    <>
      <Head>
        <title>Viewing {name} | Code Sharing Application</title>
      </Head>
      <Container>
        <div className="py-6">
          <Heading className="mb-6" type="sectionHeading">
            Editing {name ? name : ""}
          </Heading>

          <div className="mb-2">
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
              style={{ marginLeft: "2rem" }}
              value={name}
              disabled
              placeholder="File name"
            />
            <Button
              style={{
                backgroundColor: "blue",
                padding: "0.1rem 0.5rem",
                marginLeft: "0.5rem",
              }}
              disabled
            >
              Save
            </Button>
          </div>
          <div className="flex flex-wrap gap-5">
            <Editor
              width="100%"
              height="60vh"
              // defaultLanguage="javascript"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange}
            />
            <div className="">
              <Button
                style={{
                  backgroundColor: "red",
                  marginRight: "2rem",
                }}
              >
                Export to Google Drive
              </Button>
              <Button
                style={{
                  backgroundColor: "blue",
                }}
                onClick={() => alert(code)}
              >
                Export to Microsoft Drive
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NewFile;
