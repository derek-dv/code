import dbConnect from "../../../../utils/dbconnect";
import File from "../../../../model/File";

dbConnect();

export default async (req, res) => {
  const httpMethod = req.method;
  const id = req.query.author_id;

  switch (httpMethod) {
    case "GET":
      try {
        const file = await File.find({ author_id: id });
        console.log(file);
        const totalFiles = file.length;
        const fileSize = file.reduce((a, c) => a + Number(c.fileSize), 0);
        console.log(fileSize);
        res.status(200).json({ files: file, totalFiles, fileSize });
      } catch (error) {
        console.log(id);
        res.status(404).json({ error: `Author with id ${id} not found` });
      }
      break;

    default:
      res.status(403).send(`HTTP method ${httpMethod} not allowed`);
      break;
  }
};
