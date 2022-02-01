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

    case "PUT":
      try {
        const temp = await File.findOne({ _id: id });
        const file = await File.findOneAndUpdate(
          { _id: id },
          {
            fileName: req.body.fileName ? req.body.fileName : temp.fileName,
            code: req.body.code ? req.body.code : temp.code,
          }
        );
        file.save();
        res.send(file);
      } catch (err) {
        console.log(err);
      }
      break;

    default:
      res.status(403).send(`HTTP method ${httpMethod} not allowed`);
      break;
  }
};
