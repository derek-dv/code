import mongoose from "mongoose";
import nodemailer from "nodemailer";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) return;

  const db = await mongoose.connect(process.env.MONGO_URI);
//new
  connection.isConnected = db.connections[0].readyState;
  console.log(connection);
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export default dbConnect;
