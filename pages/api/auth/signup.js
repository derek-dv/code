import passport from "passport";
import crypto from "crypto";
import dbConnect, { transporter } from "../../../utils/dbconnect";
import User from "../../../model/User";

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
  .use(passport.initialize())
  .use(passport.session())
  .post(async (req, res) => {
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    const { email, password, confirmPassword } = req.body;
    const userExists = await User.exists({ email });

    if (!userExists) {
      if (password === confirmPassword) {
        const userToken = crypto.randomBytes(16).toString("hex");

        const createdUser = await User.register(
          new User({
            email,
            emailVerified: false,
            emailVerificationToken: userToken,
          }),
          password
        );

        console.log(
          `http://localhost:3000/verify-token/${createdUser.emailVerificationToken}`
        );

        const mailOptions = {
          to: createdUser.email,
          from: process.env.EMAIL,
          subject: "Verify account | Code Sharing Application",
          html: `<h1>Email Verification</h1>
                  <p>You have successfully created an account with this Email
                  Please click the link below to verify the account</p>
                  <a href="http://works.codemash.me/verify-token/${createdUser.emailVerificationToken}">Verify Token</a>`,
        };

        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log(err);
          }
        });
        res.status(201).json({
          user_id: createdUser._id,
          email: createdUser.email,
          emailVerificationToken: createdUser.emailVerificationToken,
        });
        return;
      }
      res.status(403).send("passwords do not match");
      return;
    }

    res.status(401).json({
      error: `User with email ${email} exists`,
    });
  });

export default handler;
