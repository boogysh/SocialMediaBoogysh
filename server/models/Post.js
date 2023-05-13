import mongoose from "mongoose";
const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: String,
    description: String,
    likes: { type: Map, of: Boolean },
    comments: { type: Array, default: [] },
    postImgUrl: { type: String, required: false },
    postImgName: { type: String, required: false },
    userUrl: { type: String, required: true },
    payloadType: { type: String, required: false, default: null },
  },
  //{ timestamps: true }
  {
    // const time = new Date(Date.now());
    //createdAt: `${time.toLocaleDateString()}  ${time.toLocaleTimeString()}`,
    //---------------
    // timestamps: { currentTime: () => Date.now() + 1 * 60 * 60 * 1000 },
    timestamps: { currentTime: () => Date.now() + 2 * 60 * 60 * 1000 },
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
