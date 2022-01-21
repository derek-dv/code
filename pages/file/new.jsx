import Head from "next/head";
import {Container} from "@material-ui/core"
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import {useState} from "react"
import { yupResolver } from "@hookform/resolvers/yup";
// Components
import Heading from "../../components/UI/Heading";

// const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const NewFile = () => {
  const [post, setPost] = useState("")
  const createNewFileHandler = (data) => {
    alert(JSON.stringify(data, true, 2));
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
          {/*<MonacoEditor
      // editorDidMount={() => {
      //   // @ts-ignore
      //   window.MonacoEnvironment.getWorkerUrl = (
      //     _moduleId,
      //     label
      //   ) => {
      //     if (label === "json")
      //       return "_next/static/json.worker.js";
      //     if (label === "css")
      //       return "_next/static/css.worker.js";
      //     if (label === "html")
      //       return "_next/static/html.worker.js";
      //     if (
      //       label === "typescript" ||
      //       label === "javascript"
      //     )
      //       return "_next/static/ts.worker.js";
      //     return "_next/static/editor.worker.js";
      //   };
      // }}
      width="800"
      height="600"
      language="markdown"
      theme="vs-dark"
      value={post}
      options={{
        minimap: {
          enabled: false
        }
      }}
      onChange={setPost}
    />*/}
        </div>
      </Container>
    </>
  );
};

export default NewFile;
