import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlog,
  uploadBanner,
} from "../controllers/blogController";
import authentication from "../middlewares/authentication";
import uploads from "../config/multer";

const router = Router();

router.post(
  "/blog/banner",
  uploads.single("image"),
  authentication(),
  uploadBanner
);

router.post("/blog", authentication(), createBlog);
router.get("/blogs", getAllBlogs);
router.get("/blog/:id", getBlog);

export default router;
