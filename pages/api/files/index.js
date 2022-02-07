import jwt from "jsonwebtoken";
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
      const authorization = req.headers.authorization;
      const token = authorization.slice(7, authorization.length);
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const file = new File({
          fileName: req.body.fileName,
          language: req.body.language,
          author_id: req.body.author_id,
          code: req.body.code,
        });

        const createdFile = await file.save();
        res.status(201).send(createdFile);
      } catch (err) {
        const { code } = req.body;
        if (Number(Buffer.byteLength(code, "utf8")) / 1000 < 200) {
          const file = new File({
            fileName: req.body.fileName,
            language: req.body.language,
            author_id: req.body.author_id,
            code: req.body.code,
          });

          const createdFile = await file.save();
          res.status(201).send(createdFile);
        } else {
          res.status(400).json({ error: "file larger than 200kb" });
        }
      }
      break;
    default:
      res.status(400).send("Method not supported");
      break;
  }
}

export default Files;
