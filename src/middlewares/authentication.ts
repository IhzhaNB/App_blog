import { passport } from "../controllers/authController";

export default function authentication() {
  return passport.authenticate("jwt", { session: false });
}
