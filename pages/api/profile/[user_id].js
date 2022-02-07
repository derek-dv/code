import User from "../../../model/User";
import Profile from "../../../model/Profile";
import dbConnect from "../../../utils/dbconnect";

dbConnect();

export default async function (req, res) {
  const httpMethod = req.method;
  const userId = req.query.user_id;
  switch (httpMethod) {
    case "POST":
      const user = await User.findOne({ _id: userId });
      if (user) {
        console.log(user);
        const profile = new Profile({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,
          description: req.body.description,
          city: req.body.city,
          country: req.body.country,
          user_id: userId,
        });

        const createdProfile = await profile.save();

        res.status(201).json({ profile: createdProfile });
      } else res.status(404).json({ error: "User with ID not found" });
      break;
    case "GET":
      const user_ = await User.findOne({ _id: userId });

      if (user_) {
        const profile = await Profile.findOne({ user_id: userId });
        if (profile) {
          res.json({ profile });
        } else res.status(404).json({ error: "Profile with ID not found" });
      } else res.status(404).json({ error: "User with ID not found" });
    default:
      res.status(403).send("Method not supported");
  }
}
