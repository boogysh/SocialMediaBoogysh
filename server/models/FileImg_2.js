import mongoose from "mongoose";

const fileImg_2_Schema = new mongoose.Schema({
  photoUrl: String,
});

const FileImg_2 = mongoose.model("FileImg_2", fileImg_2_Schema);
// module.exports = FileImg_2;
export default  FileImg_2;
