import jwt from "jsonwebtoken";
import dbConnect from "../../../utils/dbconnect";
const File = require("../../../model/File");

import nc from "next-connect";
import passport from "passport";
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
  .use(passport.initialize())
  .use(passport.session())
  .get(async (req, res) => {
    const files = await File.find({});
    res.status(200).json({ files });
  })
  .post(async (req, res) => {
    try {
      const authorization = req.headers.authorization;
      const token = authorization.slice(7, authorization.length);
      const user = jwt.verify(token, process.env.JWT_SECRET);

      const fileSize = Number(Buffer.byteLength(code, "utf8")) / 1000;
      const file = new File({
        fileName: req.body.fileName,
        language: req.body.language,
        author_id: req.body.author_id,
        code: req.body.code,
        fileSize,
      });

      const createdFile = await file.save();
      res.status(201).send(createdFile);
      return;
    } catch (err) {
      const { code } = req.body;
      const fileSize = Number(Buffer.byteLength(code, "utf8")) / 1000;
      console.log(fileSize);
      if (fileSize < 200) {
        const file = new File({
          fileName: req.body.fileName,
          language: req.body.language,
          author_id: req.body.author_id,
          code: req.body.code,
          fileSize,
        });

        const createdFile = await file.save();
        res.status(201).send(createdFile);
      } else {
        res.status(400).json({ error: "file larger than 200kb" });
      }
    }
  });

dbConnect();

export default handler;
