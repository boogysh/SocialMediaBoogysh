import Post from "../models/Post.js";
import User from "../models/User.js";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const bucketName = process.env.BUCKET_NAME;
//const bucketRegion = process.env.BUCKET_REGION;
//const accessKey = process.env.ACCESS_KEY;
//const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const bucketName = "social-media-boogysh";
const bucketRegion = "eu-west-3";
const accessKey = "AKIARRO4ZLJBCQJBAZUI";
const secretAccessKey = "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";

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

/* CREATE */
export const createPost = async (req, res) => {
  try {
    if (req.file) {
      req.file && req.file.buffer; //important

      const imageName = "posts/" + Date.now() + "-" + req.file.originalname;

      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);

      //- GET IMAGE FROM S3
      const getObjectParams = {
        Bucket: bucketName,
        Key: imageName,
      };
      const getCommand = new GetObjectCommand(getObjectParams);
      console.log(getCommand);
      const url = await getSignedUrl(s3, getCommand, { expireIn: 3600 });
      console.log("url", url);

      //IMAGE-URL OF THE POST
      let postImgUrl;
      req.file && (postImgUrl = url.split("?")[0]);
      !req.file && (postImgUrl = "");
      console.log(postImgUrl);
      //REQUEST
      const { userId, description, userUrl, payloadType } = req.body;
      console.log("req.body:", req.body);
      const user = await User.findById(userId);
      //CREATE NEW POST
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        likes: {},
        comments: [],
        postImgUrl: postImgUrl,
        postImgName: imageName,
        userUrl: userUrl,
        payloadType: payloadType,
      });
      await newPost.save();
      const post = await Post.find(); // all posts
      res.status(201).json(post);
    } else {
      //REQUEST
      const { userId, description, userUrl } = req.body;
      const user = await User.findById(userId);
      //CREATE NEW POST
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        likes: {},
        comments: [],
        postImgUrl: "",
        postImgName: "",
        userUrl: userUrl,
        payloadType: null,
      });
      await newPost.save();
      const post = await Post.find(); // all posts
      res.status(201).json(post);
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
//---------- DELETE POST--------------------
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    //
    const { userId } = req.body;
    // const { userId } = req.auth;
    //
    const post = await Post.findById(id);
    //Delete the image from s3
    const params = {
      Bucket: bucketName,
      Key: post.postImgName, // Key: imageName,
    };
    const command = new DeleteObjectCommand(params);
    // await s3.send(command);
    //
    //delete the post from mongoDB
    const evenUser = userId === post.userId;
    if (evenUser) {
      post.postImgName && await s3.send(command);
      await Post.deleteOne({ _id: id });
      res.status(200).json({ message: "Post deleted successfully!" });
    } else {
      res.status(403).json({ message: "Not authorized!" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE - like */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE - comment */
export const commentPost = async (req, res) => {
  try {
    // const { id } = req.params;
    const { postId, description, name, url } = req.body;
    const time = new Date(Date.now());
    const newComment = {
      postId: postId,
      description: description,
      name: name,
      url: url,
      createdAt: `${time.toLocaleDateString()} - ${time.toLocaleTimeString()}`,
    };
    const post = await Post.findById(postId);
    //if (newComment) post.comments.push(newComment);

    if (newComment) post.comments.unshift(newComment);
    // post.comments.unshift(req.body);
    console.log(post.comments);

    const updatedPost = await Post.findByIdAndUpdate(postId, {
      comments: post.comments,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
