import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Components
import Input from "../FormElements/Input";
import Button from "../FormElements/Button";

//
import { loginSchema } from "../../utils/schema/authSchema";

const LoginForm = ({ onSubmit }) => {
  const form = useForm({
    resolver: yupResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const formSubmitHandler = (data) => {
    if (typeof onSubmit === "function") {
      onSubmit(data);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(formSubmitHandler)} autoComplete="off">
        <Input
          label="Email"
          id="email"
          name="email"
          placeholder="Email"
          error={errors?.email?.message}
        />
        <Input
          label="Password"
          id="password"
          name="password"
          placeholder="Password"
          error={errors?.password?.message}
          type="password"
        />
        <Button>Login</Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
