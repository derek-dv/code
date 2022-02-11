import bcrypt from "bcrypt";
import crypto from "crypto";
import dbConnect, { transporter } from "../../../../utils/dbconnect";
import User from "../../../../model/User";

dbConnect();

export default async function (req, res) {
  const token = req.query.token;
  switch (req.method) {
    case "POST":
      const { email } = req.body;
      const verifyToken = crypto.randomBytes(16).toString("hex");
      const user = await User.findOne({ email });
      if (user) {
        let modifiedUser = await User.findOneAndUpdate(
          { email },
          {
            verifyToken,
          },
          { new: true }
        );

        const mailOptions = {
          to: email,
          from: process.env.EMAIL,
          subject: "Change EMAIL | Code Sharing Application",
          html: `<h1>Change EMAIL</h1>
                  <p>You have made a request to Change your Email.
                  Please click the link below to do so.</p>
                  <a href="http://code-a.herokuapp.com/change-email/${verifyToken}">Change Email</a>`,
        };
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log(err);
          }
        });

        modifiedUser.save();
        console.log(modifiedUser);
        res.json({ modifiedUser });
      } else {
        res.status(404).json({ error: "User does not exist" });
      }
      break;

    default:
      res.status(403).send("HTTP method not supported");
  }
}
