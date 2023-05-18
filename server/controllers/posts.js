import Post from "../models/Post.js";
import User from "../models/User.js";
import { s3ClientFunc } from "../aws_s3/s3.js";

import {
  // S3Client, // imported as s3ClientFunc
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/* CREATE */

export const createPost = async (req, res) => {
  const { s3, bucketName } = s3ClientFunc();

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
      const url = await getSignedUrl(s3, getCommand, { expireIn: 60 }); //60s
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
  const { s3, bucketName } = s3ClientFunc(); 
  try {
    const { id } = req.params;
    console.log("id", id);
    const { userId } = req.body;
    // const { userId } = req.auth;
    //
    const post = await Post.findById(id);
    console.log("post", post);
    console.log("post.postImgName", post.postImgName);
    //Delete the image from s3
    const paramsDelete = {
      Bucket: bucketName,
      Key: post.postImgName,
    };
    const commandDelete = new DeleteObjectCommand(paramsDelete);
    const imageExist = post.postImgName.length > 0;
    console.log(imageExist);
    const evenUser = userId === post.userId;

    if (evenUser && imageExist) {
      //delete the post from s3
      await s3.send(commandDelete);
      await Post.deleteOne({ _id: id });
      //delete the post from mongoDB
      res.status(200).json({ message: "Post deleted successfully!" });
    } else if (evenUser && !imageExist) {
      await Post.deleteOne({ _id: id });
      //delete the post from mongoDB
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
