import bcrypt from "bcrypt";
import crypto from "crypto";
import dbConnect from "../../../../utils/dbconnect";
import User from "../../../../model/User";

dbConnect();

export default async function (req, res) {
  const token = req.query.token;
  switch (req.method) {
    case "POST":
      const { _id, email } = req.body;
      const user = await User.findOne({ _id });
      if (user) {
        let modifiedUser = await User.findOneAndUpdate(
          { _id },
          {
            email,
          },
          { new: true }
        );

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
