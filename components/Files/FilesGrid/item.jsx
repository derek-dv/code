import React from "react";
import Link from "next/link";

// Components
import Paper from "../../UI/Paper";
import Heading from "../../UI/Heading";

//
import { File } from "../../icons";

const FileItem = ({ file }) => {
  return (
    <Link href={`/file/${file.slug}`}>
      <a>
        <Paper className="p-4 cursor-pointer hover:bg-gray-50">
          {file.title && (
            <Heading type="smallHeading" className="flex items-center">
              <div className="mr-1">
                <File size={1.6} />
              </div>
              {file.title}
            </Heading>
          )}
          {file.description && <p>{file.description}</p>}
        </Paper>
      </a>
    </Link>
  );
};

export default FileItem;
