import bcrypt from "bcrypt";
import crypto from "crypto";
import dbConnect, { transporter } from "../../../utils/dbconnect";
import User from "../../../model/User";
import Token from "../../../model/Token";

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case "POST":
      const { email, password, confirmPassword } = req.body;
      const userExists = await User.exists({ email });

      if (!userExists) {
        if (password === confirmPassword) {
          const userToken = crypto.randomBytes(16).toString("hex");
          const user = new User({
            email,
            password: bcrypt.hashSync(password, 8),
            verified: false,
            verifyToken: userToken,
          });

          console.log(user);

          const createdUser = await user.save();
          console.log(
            `http://localhost:3000/verify-token/${createdUser.verifyToken}`
          );

          const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: "Verify account | Code Sharing Application",
            html: `<h1>Email Verification</h1>
                  <p>You have successfully created an account with this Email
                  Please click the link below to verify the account</p>
                  <a href="http://works.codemash.me/verify-token/${createdUser.verifyToken}">Verify Token</a>`,
          };

          transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
              console.log(err);
            }
          });
          res.status(201).json({
            user_id: createdUser._id,
            email: createdUser.email,
            verifyToken: createdUser.verifyToken,
          });
          return;
        }
        res.status(403).send("passwords do not match");
        return;
      }

      res.status(401).json({
        error: `User with email ${email}`,
      });

    default:
      res.status(403).send("Method not allowed");
  }
}
