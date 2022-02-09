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
        res.status(200).json({ files: file });
        console.log(file);
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
