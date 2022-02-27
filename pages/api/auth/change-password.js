const jwt = require("jsonwebtoken");
import dbConnect from "../../../utils/dbconnect";
import bcrypt from "bcrypt"
import User from "../../../model/User";


dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case "POST":
      const { password, oldPassword, email } = req.body;
      const user = await User.findOne({ email });
      console.log(req.header);
      if (user) {
        if(password !== oldPassword) {
          res.status(401).json({error: "Passwords does not match"})
          return
        }

        if(bcrypt.compareSync(oldPassword, user.password)){
          const mod = await User.findOneAndUpdate({email}, {
            password: bcrypt.hashSync(password, 8)
          })
          mod.save()
          res.json({message: "Password changed"})
          return
        }
        else 
          res.send({error: "Invalid password"})
        return

      }
      res.status(401).json({ error: "Invalid email or password" });
      break;
    default:
      res.status(403).send(`Method ${req.method} not allowed`);
  }
}
