import bcrypt from "bcrypt";
import dbConnect from "../../../utils/dbconnect";
import User from "../../../model/User";

import { generateToken } from "../../../utils/token";

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log(req.body);
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.status(200).json({
            user_id: user._id,
            email: user.email,
            jwtToken: generateToken(user),
          });
          return;
        }
        res.status(401).json({ error: "Invalid email or password" });
      }
      res.status(401).json({ error: "Invalid email or password" });
    default:
      res.status(403).send(`Method ${req.method} not allowed`);
  }
}
