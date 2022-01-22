import Link from "next/link";
import { MenuItems, Container, Button, Input, Card, IconButton } from "@material-ui/core";
import { Add, MoreVert } from "@material-ui/icons";

import Heading from "../components/UI/Heading";

import { files } from "../dummy";

const Files = () => {
  
  return (
    <Container className="">
      <div className="">
        <Heading className="mt-4" type="sectionHeading">
          My Files
        </Heading>
        <Input className="w-48 mb-2" placeholder="Search" />
        <div className="">
          <Button
            style={{
              backgroundColor: "#ebe9e4",
              marginBottom: "1rem",
            }}
            startIcon={<Add />}
          >
            Blank editor
          </Button>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {files.map((file) => (
          <Card
            style={{
              width: "15rem",
              height: "19rem",
            }}
          >
            <Link href={`file/${file.id}`}>
              <a>
                <img
                  style={{
                    maxWidth: "15rem",
                    minHeight: "17rem",
                  }}
                  src="/code2.jpg"
                />
              </a>
            </Link>

            <div className="mx-2 flex justify-between items center">
              <p className="h-full my-auto text-sm font-bold text-gray-800">
                {file.name}
              </p>
              <IconButton size="small" onClick={() => alert("clicked")}>
                <MoreVert size="small" />
              </IconButton>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Files;
