import dbConnect from "../../../utils/dbconnect";
import File from "../../../model/File";

dbConnect();

export default async (req, res) => {
  const httpMethod = req.method;
  const id = req.query.fileId;

  switch (httpMethod) {
    case "GET":
      try {
        const file = await File.findOne({ _id: id });
        res.status(200).json(file);
        console.log(file);
      } catch (error) {
        console.log(error);
        res.status(404).json({ error: `file with id ${id} not found` });
      }
      break;

    default:
      res.status(403).send("HTTP method not allowed");
      break;
  }
};
