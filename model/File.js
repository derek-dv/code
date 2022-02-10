const mongoose = require("mongoose");

function modelDeclared() {
  try {
    mongoose.model("File");
    return true;
  } catch (err) {
    return false;
  }
}

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, "Please add a file name"],
    },
    language: {
      type: String,
      required: [true, "Please add a language"],
    },
    code: {
      type: String,
      required: true,
    },
    author_id: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.File || mongoose.model("File", fileSchema);
