import { Router } from "express";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController";

const router = Router();

router.post("/comment/:id", createComment);
router.patch("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);

export default router;
