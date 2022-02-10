import bcrypt from "bcrypt";
import crypto from "crypto";
import dbConnect, { transporter } from "../../../../utils/dbconnect";
import User from "../../../../model/User";

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case "POST":
      const { email } = req.body;
      const userToken = crypto.randomBytes(16).toString("hex");
      const user = await User.findOne({ email });
      if (user) {
        const updated = await User.findOneAndUpdate(
          { email },
          {
            verifyToken: userToken,
            verifyTokenCreateDate: Date.now(),
          }
        );
        updated.save();
        const mailOptions = {
          to: user.email,
          from: process.env.EMAIL,
          subject: "Verify account | Code Sharing Application",
          html: `<h1>Email Verification</h1>
                  <p>You have made a request to resend the email Verification linkk.
                  Please click the link below to verify the account</p>
                  <a href="http://code-a.herokuapp.com/verify-token/${modifiedUser.verifyToken}">Verify Token</a>`,
        };
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log(err);
          }
        });
        console.log(updated);
        res.send({ updated });
      }
      console.log(email);
      res.status(404).json({ error: "user not found" });
      break;
    default:
      res.send("HTTP method not supported");
  }
}
