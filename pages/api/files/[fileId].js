import dbConnect from "../../../utils/dbconnect";
import File from "../../../model/File";
import handler from "../../../middleware/auth";

dbConnect();

handler
  .get(async (req, res) => {
    const id = req.query.fileId;
    try {
      const file = await File.findOne({ _id: id });
      res.status(200).json(file);
      console.log(file);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: `file with id ${id} not found` });
    }
  })
  .put(async (req, res) => {
    const id = req.query.fileId;
    try {
      const temp = await File.findOne({ _id: id });
      const file = await File.findOneAndUpdate(
        { _id: id },
        {
          fileName: req.body.fileName ? req.body.fileName : temp.fileName,
          code: req.body.code ? req.body.code : temp.code,
        }
      );
      file.save();
      res.send(file);
    } catch (err) {
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    const id = req.query.fileId;

    File.deleteOne({ _id: id })
      .then((files) => {
        res.json({ message: "File deleted" });
      })
      .catch(() => {
        res.status(404).json({ error: "File with ID not found" });
      });
  });

export default handler;
