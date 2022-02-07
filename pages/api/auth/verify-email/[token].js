import bcrypt from "bcrypt";
import crypto from "crypto";
import dbConnect from "../../../../utils/dbconnect";
import User from "../../../../model/User";

dbConnect();

export default async function (req, res) {
  const token = req.query.token;
  switch (req.method) {
    case "GET":
      try {
        const user = await User.findOne({ verifyToken: token });
        console.log(token);
        console.log(user);
        if (user) {
          const updated = await User.findOneAndUpdate(
            { verifyToken: token },
            { verified: true }
          );
          updated.save();
          res.json(updated);
        } else {
          console.log(user);
          res.status(404).json({ error: "token not found" });
        }
      } catch (err) {
        console.log(err);
      }
      break;
    default:
      res.status(400).send("The HTTP method is not supported");
  }
}
