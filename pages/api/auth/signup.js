import bcrypt from "bcrypt";
import dbConnect from "../../../utils/dbconnect";
import User from "../../../model/User";

dbConnect();

export default async function (req, res) {
  switch (req.method) {
    case "POST":
      const { username, email, password, confirmPassword } = req.body;
      const userExists = await User.exists({ email }) || await User.exists({ username });

      if (!userExists) {
        if (password === confirmPassword) {
          const user = new User({
            username,
            email,
            password: bcrypt.hashSync(password, 8),
          });
          const createdUser = await user.save();
          res.status(201).json({
            user_id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email,
          });
          return;
        }
        res.status(403).send("passwords do not match");
        return;
      }

      res.status(401).json({ error: `User with email ${email} or username ${username} already exists` });

    default:
      res.status(403).send("Method not allowed");
  }
}
