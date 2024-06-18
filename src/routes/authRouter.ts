import { Router } from "express";
import {
  getUser,
  handleGoogleCallback,
  login,
  passport,
  redirectToGoogle,
  register,
} from "../controllers/authController";
import authentication from "../middlewares/authentication";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/getuser", authentication(), getUser);

router.get("/google", redirectToGoogle);
router.get("/google/callback", handleGoogleCallback);

export default router;
