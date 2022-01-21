import {Container, Paper, Input, Button} from "@material-ui/core"
import Link from "next/link"
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {loginSchema} from "../utils/schema/authSchema"

const Login = () => {
	const form = useForm({
    resolver: yupResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const submit = (e) => {
  	e.preventDefault()
  	console.log(errors)
  }
	return (
		<Container>
			<div style={{padding: '10rem 0'}} className="flex items-center justify-center flex-col">
				<Paper className="p-4 pt-0 w-full lg:w-96">
					<h2 className="text-xl font-bold">Login</h2>
					<FormProvider {...form}>
						<form onSubmit={handleSubmit(submit)} autoComplete="off">
							<Input name='email' placeholder="Email" type="email" className="pb-2 w-full" />
							<p className="text-red-500 text-sm">{errors?.email?.message}</p>
							<Input name='password' placeholder="Password" type="password" className="mt-2 py-2 w-full" />
							<p className="text-red-500 text-sm mb-3">{errors?.password?.message}</p>
							<Button style={{backgroundColor: 'blue'}} className="text-white text-bold" type="submit">Login</Button>
						</form>
					</FormProvider>
				</Paper>
				<p className="mt-2 text-sm text-gray-500 text-left">
            Don't have an account?{"  "}
          <Link href="/signup">
            <a className="text-blue-400 underline">Signup Here</a>
          </Link>
        </p>
			</div>
		</Container>
	)
}

export default Login