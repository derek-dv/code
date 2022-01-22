import Head from "next/head";
import {useRouter} from "next/router"
import { Container, Input, Button, Select, MenuItem } from "@material-ui/core";
import { useState, useEffect } from "react";
// Components
import Heading from "../../components/UI/Heading";
import {files} from "../../dummy"

import Editor from "@monaco-editor/react"

const NewFile = () => {
  const [post, setPost] = useState();
  const [language, setLanguage] = useState("javascript")
  const {query} = useRouter()
  const id = query?.fileId
  const file = files.filter((file)=>file.id == id)[0]
  useEffect(()=>{
    console.log(file)
    setPost(file.code)
  })
  
  return (
    <>
      <Head>
        <title>{file.name} | Code Sharing Application</title>
      </Head>
      <Container>
        <div className="py-6">
          <Heading className="mb-6" type="sectionHeading">
            {file.name}
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
            width="60%"
            height="60vh"
            // defaultLanguage="javascript"
            language={"javascript"}
            theme="vs-dark"
            value={post}
            onChange={(e)=>setPost(e.target.value)}
          />
        </div>
      </Container>
    </>
  );
};

export default NewFile;
