import dbConnect from "../../../utils/dbconnect";
const File = require("../../../model/File");

dbConnect();

async function Files(req, res) {
  switch (req.method) {
    case "GET":
      const files = await File.find({});
      res.status(200).json({ files });
      break;

    case "POST":
      console.debug(req.body);
      const file = new File({
        fileName: req.body.fileName,
        language: req.body.language,
        author_id: req.body.author_id,
        code: req.body.code,
      });

      const createdFile = await file.save();
      res.status(201).send(createdFile);
      break;
    default:
      res.status(400).send("Method not supported");
      break;
  }
}

export default Files;
