const jwt = require("jsonwebtoken");
import dbConnect from "../../../utils/dbconnect";
import bcrypt from "bcrypt";
import User from "../../../model/User";
import handler from "../../../middleware/auth";

dbConnect();

handler.post(async (req, res) => {
  const { password, oldPassword, email } = req.body;
  const user = await User.findOne({ email });
  console.log(req.header);
  if (user) {
    user.changePassword(oldPassword, password, (err, user) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(user);
    });
  }
  res.status(401).json({ error: "Invalid email or password" });
});

export default handler;
