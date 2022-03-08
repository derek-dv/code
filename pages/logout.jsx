import { Container } from "@material-ui/core";
import crypto from "crypto";
import { useEffect } from "react";
import Link from "next/link";
import Heading from "../components/UI/Heading";

export default function Logout({ setUser }) {
  useEffect(() => {
    localStorage.removeItem("user");
    setUser(null);
    const guestId = crypto.randomBytes(16).toString("hex");
    localStorage.setItem("guestId", guestId);
  }, []);
  return (
    <Container>
      <Heading className="mt-2" type="mainHeading">Logged out</Heading>
      <p className="mt-2">You are now logged out</p>
      <Link href="/">
        <a className="text-blue-400 hover:text-blue-600">Go to Home</a>
      </Link>
    </Container>
  );
}
