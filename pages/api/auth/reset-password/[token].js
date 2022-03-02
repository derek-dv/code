import dbConnect from "../../../../utils/dbconnect";
import User from "../../../../model/User";
import handler from "../../../../middleware/auth";

dbConnect();

handler
  .post(async (req, res) => {
    const token = req.query.token;
    const { newPassword } = req.body;
    let user = await User.findOne({ resetPasswordToken: token });
    if (user && !user.resetPasswordExpired()) {
      console.log(req.body);
      user.setPassword(newPassword, (err, newUser)=>{
        if (newUser) newUser.save()
      });
      res.json({ message: "password successfully changed" });
    } else {
      res.status(404).json({ error: "token not found or has expired" });
    }
  })
  .get(async (req, res) => {
    const token = req.query.token;
    let users = await User.findOne({ resetPasswordToken: token });
    console.log(token);
    console.log(users);
    if (users) {
      res.json({ message: "token exists" });
    } else {
      res.status(404).json({ error: "Token does not exist" });
    }
  });
export default handler;
