import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add an email address"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenCreateDate: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordCreateDate: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
});

//Reset password expires after 30 minutes
userSchema.methods.resetPasswordExpired = function () {
  let now = Date.now();
  return now - Date.parse(this.resetPasswordCreateDate) > 1800000;
};

export default mongoose.models.User || mongoose.model("User", userSchema);
