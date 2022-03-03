import crypto from "crypto";
import dbConnect, { transporter } from "../../../../utils/dbconnect";
import User from "../../../../model/User";

dbConnect();

export default async function (req, res) {
  const token = req.query.token;
  switch (req.method) {
    case "POST":
      const { email } = req.body;
      const passwordResetToken = crypto.randomBytes(16).toString("hex");
      const user = await User.findOne({ email });
      if (user) {
        let modifiedUser = await User.findOneAndUpdate(
          { email },
          {
            passwordResetToken,
            resetPasswordCreateDate: Date.now(),
          },
          { new: true }
        );
        console.log(passwordResetToken)

        const mailOptions = {
          to: email,
          from: process.env.EMAIL,
          subject: "Reset password | Code Sharing Application",
          html: `<h1>Reset password</h1>
                  <p>You have made a request to reset password.
                  Please click the link below to do so.</p>
                  <a href="http://code-a.herokuapp.com/reset-password/${passwordResetToken}">Reset password</a>`,
        };
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log(err);
          }
        });
        console.log(modifiedUser);

        modifiedUser.save();
        res.json({ modifiedUser });
      } else {
        res.status(404).json({ error: "User does not exist" });
      }
      break;

    default:
      res.status(403).send("HTTP method not supported");
  }
}
