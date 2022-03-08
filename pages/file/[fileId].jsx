import Head from "next/head";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Container, Input, Button, Select, MenuItem } from "@material-ui/core";
import { useState, useEffect } from "react";
// Components
import Alert from "../../components/alert"
import Heading from "../../components/UI/Heading";
const GoogleExport = dynamic(() => import("../../components/googleExport"), {
  ssr: false,
});
const OneDriveExport = dynamic(
  () => import("../../components/onedriveExport"),
  {
    ssr: false,
  }
)
import languages from "../../utils/monaco-languages"


import Editor from "@monaco-editor/react";

const NewFile = ({ user, setAlert }) => {
  const { query } = useRouter();
  const router = useRouter();
  const fileId = query.fileId || null;
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("bat");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [isAuthor, setAuthor] = useState(false);
  const [authorId, setAuthorId] = useState();

  const handleEditorChange = (value, event) => {
    console.log(event);
    setCode(value);
  };

  useEffect(() => {
    if (!fileId) return;
    let author_i;
    if (user) {
      author_i = user.user_id;
      setAuthorId(author_i);
    } else if (localStorage.getItem("guestId")) {
      author_i = localStorage.getItem("guestId");
      setAuthorId(author_i);
    }

    console.log(authorId);

    setLoading(true);
    axios
      .get(`/api/files/${fileId}`)
      .then((res) => {
        console.log(res.data);
        const { fileName, language, code, author_id } = res.data;
        if (author_id === author_i) setAuthor(true);
        setName(fileName);
        setCode(code);
        setLanguage(language);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fileId, user]);

  const handlePost = (e) => {
    e.preventDefault();
    const data = {
      fileName: name,
      language,
      author_id: authorId,
      code,
    };

    console.log(authorId);

    axios.post("/api/files", data).then((res) => {
      console.log(res.data);
      router.push("/myfiles");
    }).catch((err)=>{
      setError("You must input text in the editor and add file name!")
    });
  };
  const handlePut = (e) => {
    e.preventDefault();
    const data = {
      code,
      fileName: name,
    };

    axios
      .put(`/api/files/${fileId}`, data)
      .then((res) => {
        setAlert("File edited!");
        setTimeout(() => {
          setAlert(null);
        }, 5000);
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
        setError("You must input text in the editor and add file name!")
      });
  };
  return (
    <>
      <Head>
        <title>
          {isAuthor ? "Editing " : "Viewing "} file | Code Sharing Application
        </title>
      </Head>
      <Container>{error ? <Alert variant="error" text={error}/> : null}
        <div className="py-6">
          <Heading className="mb-6" type="sectionHeading">
            {isAuthor ? "Editing " : "Viewing "}file
          </Heading>

          <div className="mb-2">
            <Select
              value={language}
              label="Language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lang)=>
                  <MenuItem key={lang.id} value={lang.id}>{lang.language}</MenuItem>
              )}
            </Select>
            {isAuthor ? (
              <>
                <Input
                  style={{ marginLeft: "2rem" }}
                  value={name}
                  placeholder="File name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  onClick={handlePut}
                  style={{
                    backgroundColor: "blue",
                    padding: "0.1rem 0.5rem",
                    marginLeft: "0.5rem",
                  }}
                >
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Input
                  style={{ marginLeft: "2rem" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="File name"
                />
                <Button
                  style={{
                    backgroundColor: "blue",
                    padding: "0.1rem 0.5rem",
                    marginLeft: "0.5rem",
                  }}
                  onClick={handlePost}
                >
                  Save new copy
                </Button>
              </>
            )}
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
            <div className="flex">
              <GoogleExport text="Export to Google drive" code={code} name={name} setAlert={setAlert} />
              <OneDriveExport text="Export to Microsoft drive" code={code} name={name} setAlert={setAlert} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NewFile;
