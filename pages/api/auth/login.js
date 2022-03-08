import dbConnect from "../../../utils/dbconnect";
import User from "../../../model/User";
import nc from "next-connect";
import passport from "passport";
import rateLimit from "express-rate-limit";

import { generateToken } from "../../../utils/token";

dbConnect();

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
  .use(passport.session());

handler.post(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    User.authenticate()(email, password, function (err, user) {
      if (user) {
        const token = generateToken(user);
        res.json({ user_id: user._id, email: user.email, jwtToken: token, verified: user.emailVerified });
        return;
      } else {
        console.log(err);
        res.status(403).json({ error: "Inavlid email or password" });
      }
    });
  } else {
    res.status(403).json({ error: "Inavlid email or password" });
    return;
  }
});

export default handler;
