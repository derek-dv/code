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
      let user = await User.findOne({ emailVerificationToken: token });
      if (user) {
        console.log(req.body);
        const modifiedUser = await User.findOneAndUpdate(
          { emailVerificationToken: token },
          {
            email,
            emailVerified: false,
          },
          {
            new: true,
          }
        );
        modifiedUser = await modifiedUser.save();
        res.json({ message: "Email successfully changed" });
      } else {
        res.status(404).json({ error: "token not found" });
      }
      break;

    case "GET":
      let users = await User.findOne({ emailVerificationToken: token });
      console.log(token);
      console.log(users);
      if (users) {
        res.json({ message: "token exists" });
      } else {
        res.status(404).json({ error: "Token does not exist" });
      }
      break;

    default:
      res.status(400).send("HTTP method not supported");
  }
}
