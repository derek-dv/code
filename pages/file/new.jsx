import Head from "next/head";
import { Button, Container, Input, Select, MenuItem } from "@material-ui/core";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// Components
import Heading from "../../components/UI/Heading";

import Editor from "@monaco-editor/react"

const NewFile = () => {
  const [post, setPost] = useState("");
  const [language, setLanguage] = useState("javascript")

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
            <Select
              value={language}
              label="Language"
              onChange={(e)=>setLanguage(e.target.value)}
            >
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="javascript">JavaScript</MenuItem>
              <MenuItem value="cpp">C++</MenuItem>
              <MenuItem value="java">Java</MenuItem>
              <MenuItem value="html">HTML</MenuItem>
              <MenuItem value="css">CSS</MenuItem>
              <MenuItem value="markdown">Markdown</MenuItem>
            </Select>
            <Input style={{marginLeft: "2rem"}} placeholder="File name"/>
            <Button style={{
              backgroundColor: "blue",
              padding: "0.1rem 0.5rem",
              marginLeft: "0.5rem"
            }}>Save</Button>
          </div>
          <Editor
            width="800"
            height="60vh"
            language={language}
            theme="vs-dark"
            value={post}
            onChange={setPost}
          />
        </div>
      </Container>
    </>
  );
};

export default NewFile;
