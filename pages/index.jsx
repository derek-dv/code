import {Container, Button} from "@material-ui/core"
import Link from "next/link"

import Heading from "../components/UI/Heading"

export default function Home() {
  const buttonStyle = {
    backgroundColor: "blue",
    padding: "0.5rem 2rem",
    marginRight: "1rem"
  }
  return (
    <Container>
      <div style={{marginTop: "5rem"}} className="flex flex-wrap gap-5">
        <div>
          <img src="/type.svg"/>
        </div>
        <div className="flex-auto">
          <Heading type="mainHeading">Code Sharing Application</Heading>
          <p>
            Upload or paste your code to share
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button style={buttonStyle}>
              <Link href="/file/new">
                <a className="text-white">Get started</a>
              </Link>
            </Button>
            <Button style={buttonStyle}>
              <Link href="/signup">
                <a className="text-white">Register with us</a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}