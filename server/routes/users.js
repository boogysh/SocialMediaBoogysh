import express from "express";
import {
  getUsers,
  getUser,
  addUserVisitor,
  resetUserVisitors,
  getUserVisitors,
  getUserFriends,
  addRemoveFriend,
  patchUserTwitterAccount,
  patchUserLinkedinAccount,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/visitors", verifyToken, getUserVisitors);

/* UPDATE  */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/:id/:friendId/views", verifyToken, addUserVisitor);
router.patch("/:id/views/reset", verifyToken, resetUserVisitors);
router.patch("/:id/accounts/twitter", verifyToken, patchUserTwitterAccount);
router.patch("/:id/accounts/linkedin", verifyToken, patchUserLinkedinAccount);

export default router;
