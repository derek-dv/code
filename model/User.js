import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add an email address"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please add a username address"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
