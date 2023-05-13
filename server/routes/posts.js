import express from "express";
import {
  getFeedPosts,
  //   getUserPosts,
  likePost,
  commentPost,
  deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
// router.get("/userId/posts", verifyToken, getUserPosts);
// the logic of user posts is in UsegetPosts.jsx

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);

// DELETE
router.delete("/:id", verifyToken, deletePost);

export default router;
