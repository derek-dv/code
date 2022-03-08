import passport from "passport";
import crypto from "crypto";
import dbConnect, { transporter } from "../../../../utils/dbconnect";
import User from "../../../../model/User";

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
  .post(async (req, res)=>{
    const { email } = req.body;
      const userToken = crypto.randomBytes(16).toString("hex");
      const user = await User.findOne({ email });
      if (user) {
        const updated = await User.findOneAndUpdate(
          { email },
          {
            emailVerificationToken: userToken,
            verifyTokenCreateDate: Date.now(),
          },
          { new: true }
        );
        updated.save();
        console.log(`${process.env.DOMAIN}/${userToken}`)
        const mailOptions = {
          to: user.email,
          from: process.env.EMAIL,
          subject: "Verify account | Code Sharing Application",
          html: `<h1>Email Verification</h1>
                  <p>You have made a request to resend the email Verification linkk.
                  Please click the link below to verify the account</p>
                  <a href="${process.env.DOMAIN}/${userToken}">Verify Token</a>`,
        };
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log(data)
          }
        });
        console.log(updated);
        res.send({ updated });
        return
      }
      console.log(email);
      res.status(404).json({ error: "user not found" });
  })
export default handler