import mongoose from "mongoose";
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add an email address"],
    unique: true,
  },
  emailVerified: {
    type: Boolean,
  },
  emailVerificationToken: {
    type: String,
  },
  verifyTokenCreateDate: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordCreateDate: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose,  { usernameField : 'email', limitAttempts: true });

//Reset password expires after 30 minutes
userSchema.methods.resetPasswordExpired = function () {
  let now = Date.now();
  return now - Date.parse(this.resetPasswordCreateDate) > 1800000;
};

export default mongoose.models.User || mongoose.model("User", userSchema);
