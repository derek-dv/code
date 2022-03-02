import dbConnect from "../../../../utils/dbconnect";
import User from "../../../../model/User";

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
    const token = req.query.token;
    const { newPassword } = req.body;
    let user = await User.findOne({ resetPasswordToken: token });
    if (user && !user.resetPasswordExpired()) {
      console.log(req.body);
      user.setPassword(newPassword, (err, newUser) => {
        if (newUser) newUser.save();
      });
      res.json({ message: "password successfully changed" });
    } else {
      res.status(404).json({ error: "token not found or has expired" });
    }
  })
  .get(async (req, res) => {
    const token = req.query.token;
    let users = await User.findOne({ resetPasswordToken: token });
    console.log(token);
    console.log(users);
    if (users) {
      res.json({ message: "token exists" });
    } else {
      res.status(404).json({ error: "Token does not exist" });
    }
  });
export default handler;
