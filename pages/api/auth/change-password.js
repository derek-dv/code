const jwt = require("jsonwebtoken");
import dbConnect from "../../../utils/dbconnect";
import User from "../../../model/User";

dbConnect();

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

  .post(async (req, res) => {
    const { password, oldPassword, email } = req.body;
    const user = await User.findOne({ email });
    console.log(req.header);
    if (user) {
      user.changePassword(oldPassword, password, (err, modUser) => {
        if (err) {
          console.log(err);
          res.status(401).json({ error: "Old password is incorrect" });
          throw err;
        } else {
          modUser.save();
          console.log(modUser);
          return;
        }
      });
    } else res.status(401).json({ error: "Email not found" });
  });

export default handler;
