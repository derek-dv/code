import Link from "next/link";
import { useState } from "react";
import {
  Container,
  Link as MatLink,
  Select,
  MenuItem,
} from "@material-ui/core";
export default function Footer() {
  const [language, setLanguage] = useState("english");
  return (
    <div className="w-full bg-slate-500 p-2 mt-5">
      <Container>
        <div className="w-full mx-auto">
          <div
            style={{
              width: "100%",
              margin: "0 auto",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            <Select
              value={language}
              label="Language"
              onChange={(e) => setLanguage(e.target.value)}
              className="text-white"
            >
              <MenuItem value="english">English</MenuItem>
              <MenuItem value="french">French</MenuItem>
              <MenuItem value="cpp">Spanish</MenuItem>
              <MenuItem value="java">Portoguese</MenuItem>
              <MenuItem value="html">Hindi</MenuItem>
            </Select>
            <Link href="/">
              <a className="ml-3 text-blue-200 hover:text-blue-500 mr-2 cursor-pointer">
                About us
              </a>
            </Link>
            <Link href="/">
              <a className="text-blue-200 hover:text-blue-500 mr-2 cursor-pointer">
                Contacts
              </a>
            </Link>
            <Link href="/">
              <a className="text-blue-200 hover:text-blue-500 mr-2 cursor-pointer">
                Terms and conditions
              </a>
            </Link>
          </div>
          <div>
            <p className="text-center text-white">
              &copy;2022 Code sharing application | All rights reserved
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
