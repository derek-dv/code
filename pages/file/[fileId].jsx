import Head from "next/head";
import {useRouter} from "next/router"
import { Container, Input, Button, Select, MenuItem } from "@material-ui/core";
import { useState, useEffect } from "react";
// Components
import Heading from "../../components/UI/Heading";
import {files} from "../../dummy"

import Editor from "@monaco-editor/react"

const NewFile = () => {
  const [post, setPost] = useState(`import Link from "next/link";
        import Image from "next/image";
        import { Container, Button, Input, Card, IconButton } from "@material-ui/core";
        import { MoreVerticon } from "@mui/icons-material";
        import { Add } from "@material-ui/icons";
        
        import Heading from "../components/UI/Heading";
        const Files = () => {}}`);
  const [language, setLanguage] = useState("javascript")
  
  
  return (
    <>
      <Head>
        <title>script.js | Code Sharing Application</title>
      </Head>
      <Container>
        <div className="py-6">
          <Heading className="mb-6" type="sectionHeading">
            {'script.js'}
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
          </div><div className="flex flex-wrap gap-5">
          <Editor
            width="100%"
            height="60vh"
            // defaultLanguage="javascript"
            language={language}
            theme="vs-dark"
            value={post}
            onChange={(e)=>setPost(e.target.value)}
          />
            <div className="">
              <Button style={{
                backgroundColor: "red",
                marginRight: "2rem"
              }}>Export to Google Drive</Button>
              <Button style={{
                backgroundColor: "blue"
              }}>Export to Microsoft Drive</Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NewFile;
