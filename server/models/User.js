import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 8, unique: true },
    friends: { type: Array, default: [] },
    location: { type: String, required: false },
    occupation: { type: String, required: false },
    viewedProfile: [
      {
        id: String,
        firstName: String,
        lastName: String,
        url: String,
        visitedAt: String,
        _id: false,
      },
    ],
    url: { type: String, required: false },
    twitterUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
//---------- avant --------- module.exports = mongoose.model("User", UserSchema);
