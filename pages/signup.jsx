import {Container, Paper, Input, Button} from "@material-ui/core"
import Link from "next/link"
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {signupSchema} from "../utils/schema/authSchema"

const Signup = () => {
	const form = useForm({
    resolver: yupResolver(signupSchema),
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
					<h2 className="text-xl font-bold">Sign Up</h2>
					<FormProvider {...form}>
						<form onSubmit={handleSubmit(submit)} autoComplete="off">
							<Input name='username' placeholder="Username" type="text" className="pb-2 w-full" />
							<p className="text-red-500 text-sm">{errors?.username?.message}</p>
							<Input name='email' placeholder="Email" type="email" className="mt-2 pb-2 w-full" />
							<p className="text-red-500 text-sm">{errors?.email?.message}</p>
							<Input name='password' placeholder="Password" type="password" className="mt-2 py-2 w-full" />
							<p className="text-red-500 text-sm">{errors?.password?.message}</p>
							<Input name='confirmPassword' placeholder="Confirm Password" type="password" className="mt-2 py-2 w-full" />
							<p className="text-red-500 text-sm mb-3"></p>
							<Button style={{backgroundColor: 'blue'}} className="text-white text-bold" type="submit">Signup</Button>
						</form>
					</FormProvider>
				</Paper>
				<p className="mt-2 text-sm text-gray-500 text-left">
            Already have an account?{"  "}
          <Link href="/login">
            <a className="text-blue-400 underline">Login Here</a>
          </Link>
        </p>
			</div>
		</Container>
	)
}

export default Signup