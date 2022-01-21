import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "@material-ui/core"
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// import dynamic from "next/dynamic";
// const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

// Components
import Heading from "../../components/UI/Heading";
import Paper from "../../components/UI/Paper";
import Input from "../../components/FormElements/Input";
import Button from "../../components/FormElements/Button";

//
import { updateFileSchema } from "../../utils/schema/fileSchema";

const SingleFile = () => {
  const { query } = useRouter();

  const form = useForm({
    resolver: yupResolver(updateFileSchema),
  });
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = form;

  const updateFileHandler = (data) => {
    alert(JSON.stringify(data, true, 2));
  };

  return (
    <>
      <Head>
        <title>Editting File {`"${query?.fileId}"`}</title>
      </Head>
      <Container>
        <div className="py-6">
          <Heading className="mb-6" type="mainHeading">
            <span className="font-normal">Editing File </span>
            <span>{`"${query?.fileId}"`}</span>
          </Heading>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(updateFileHandler)}>
              <div className="mb-3">
                <Input
                  id="file_name"
                  name="file_name"
                  label="File Name"
                  placeholder="File Name"
                  error={errors?.file_name?.message}
                />
              </div>
              <Paper className="p-4">
                <textarea
                  className="w-full h-72 border border-gray-300 p-2 rounded-none outline-none"
                  {...register("code")}
                ></textarea>
              </Paper>
              <div className="mt-3">
                <Button>Update</Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </Container>
    </>
  );
};

export default SingleFile;
