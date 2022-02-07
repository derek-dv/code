import bcrypt from "bcrypt";
import crypto from "crypto";
import dbConnect from "../../../../utils/dbconnect";
import User from "../../../../model/User";

dbConnect();

export default async function (req, res) {
  const token = req.query.token;
  switch (req.method) {
    case "POST":
      const { email } = req.body;
      const resetPasswordToken = crypto.randomBytes(16).toString("hex");
      const user = await User.findOne({ email });
      if (user) {
        console.log(user);
        const modifiedUser = await User.findOneAndUpdate(
          { email },
          {
            resetPasswordToken,
            resetPasswordCreateDate: Date.now(),
          },
          { new: true }
        );
        console.log(
          `http://localhost:3000/reset-password/${modifiedUser.resetPasswordToken}`
        );
        const mailOptions = {
          to: user.email,
          from: process.env.EMAIL,
          subject: "Reset password | Code Sharing Application",
          html: `<h1>Email Verification</h1>
                  <p>You have made a request to reseyour password.
                  Please click the link below to do so.</p>
                  <a href="http://works.codemash.me/reset-password/${modifiedUser.verifyToken}">Reset password</a>`,
        };
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log(err);
          }
        });
        res.json({ modifiedUser });
      } else {
        res.status(404).json({ error: "User does not exist" });
      }
      break;

    default:
      res.status(403).send("HTTP method not supported");
  }
}
