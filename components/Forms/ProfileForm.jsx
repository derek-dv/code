import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Components
import Input from "../FormElements/Input";
import Button from "../FormElements/Button";

//
import { signupSchema } from "../../utils/schema/authSchema";

const ProfileForm = () => {
  const form = useForm({
    resolver: yupResolver(signupSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const updateProfileHandler = (data) => {
    alert(JSON.stringify(data, true, 2));
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(updateProfileHandler)}>
        <Input
          id="username"
          name="username"
          label="Username"
          placeholder="Username"
          error={errors?.username?.message}
          defaultValue="John Doe"
        />
        <Input
          id="email"
          name="email"
          label="Email"
          placeholder="Email"
          error={errors?.email?.message}
          defaultValue="johndoe@mail.com"
        />
        <Input
          id="password"
          name="password"
          label="New Password"
          placeholder="New Password"
          type="password"
          error={errors?.password?.message}
        />
        <Button>Update Profile</Button>
      </form>
    </FormProvider>
  );
};

export default ProfileForm;
