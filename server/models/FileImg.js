import mongoose from "mongoose";

const FileImgSchema = new mongoose.Schema({
  myFile: String,
});

const FileImg = mongoose.model("FileImg", FileImgSchema);
export default FileImg;
