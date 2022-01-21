import Head from "next/head";
import { Container } from "@material-ui/core";
import dynamic from "next/dynamic";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// Components
import Heading from "../../components/UI/Heading";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const NewFile = () => {
  const [post, setPost] = useState("");

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
          <MonacoEditor
            width="800"
            height="600"
            language="javascript"
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
