import dbConnect from "../../../../utils/dbconnect";
import File from "../../../../model/File";

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
    const id = req.query.author_id;
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
  });

export default handler;
