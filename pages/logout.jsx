import { Container } from "@material-ui/core";
import { useEffect } from "react";
import Link from "next/link";
import Heading from "../components/UI/Heading";

export default function Logout({ setUser }) {
  useEffect(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);
  return (
    <Container>
      <Heading type="mainHeading">Logged out</Heading>
      <p>You are now logged out</p>
      <Link href="/">
        <a className="text-blue-400 hover:text-blue-600">Go to Home</a>
      </Link>
    </Container>
  );
}
