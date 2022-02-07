import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

tokenSchema.methods.hasExpired = function () {
  let now = Date.now();
  return now - Date.parse(createdDate) > 900000;
};

export default mongoose.models.Token || mongoose.model("Token", tokenSchema);
