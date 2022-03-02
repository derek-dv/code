import handler from "../../../middleware/auth";
import dbConnect from "../../../utils/dbconnect";
import User from "../../../model/User";

import { generateToken } from "../../../utils/token";

dbConnect();

handler.post(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    User.authenticate()(email, password, function (err, user) {
  
      if (user) {
        const token = generateToken(user);
        res.json({ user_id: user._id, email: user.email, jwtToken: token });
        return;
      }
      else {
        console.log(err);
        res.status(403).json({ error: "Inavlid email or password" });
      }
    });
  } else {
    res.status(403).json({ error: "Inavlid email or password" });
    return;
  }
});

export default handler;
