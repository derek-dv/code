import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
import dbConnect from "../../../utils/dbconnect";
import User from "../../../model/User";

import { generateToken } from "../../../utils/token";

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log(req.header);
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          if (user.verified) {
            res.status(200).json({
              user_id: user._id,
              username: user.username,
              email: user.email,
              jwtToken: generateToken(user),
            });
            return;
          } else {
            res.status(400).json({ error: "Please verify your email" });
            return;
          }
        }
        res.status(401).json({ error: "Invalid email or password" });
      }
      res.status(401).json({ error: "Invalid email or password" });
      break;
    default:
      res.status(403).send(`Method ${req.method} not allowed`);
  }
}
