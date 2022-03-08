import jwt from "jsonwebtoken";
import dbConnect from "../../../utils/dbconnect";
import File from "../../../model/File";

dbConnect();

import nc from "next-connect";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // Limit each IP to 20 requests per `window` (here, per 5 minutes)
  message: {
    status: 429,
    error: "You are doing that too much. Please try again in 10 minutes.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(
    require("express-session")({
      secret: "Miss white is my cat",
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(limiter)
  .get(async (req, res) => {
    const id = req.query.fileId;
    try {
      const file = await File.findOne({ _id: id });
      res.status(200).json(file);
      console.log(file);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: `file with id ${id} not found` });
    }
  })
  .put(async (req, res) => {
    const id = req.query.fileId;

    try {
      const authorization = req.headers.authorization;
      const token = authorization.slice(7, authorization.length);
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const fileSize = Number(Buffer.byteLength(req.body.code, "utf8")) / 1000;
      const temp = await File.findOne({ _id: id });
      const file = await File.findOneAndUpdate(
        { _id: id },
        {
          fileName: req.body.fileName ? req.body.fileName : temp.fileName,
          code: req.body.code ? req.body.code : temp.code,
          fileSize
        }
      );
      file.save();
      res.send(file);
    } catch (err) {
      const fileSize = Number(Buffer.byteLength(req.body.code, "utf8")) / 1000;
      if (fileSize < 200) {
        const temp = await File.findOne({ _id: id });
      const file = await File.findOneAndUpdate(
        { _id: id },
        {
          fileName: req.body.fileName ? req.body.fileName : temp.fileName,
          code: req.body.code ? req.body.code : temp.code,
          fileSize
        }
      );
      file.save();
      res.send(file);
      }
      else {
        res.status(403).json({error: "Please login to upload large files"})
      }
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    const id = req.query.fileId;
    File.deleteOne({ _id: id })
      .then((files) => {
        res.json({ message: "File deleted" });
      })
      .catch(() => {
        res.status(404).json({ error: "File with ID not found" });
      });
  });

export default handler;
