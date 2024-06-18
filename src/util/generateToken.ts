import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

export default function generateToken(userId: string) {
  return jwt.sign({ id: userId }, authConfig.secretKey, {
    expiresIn: authConfig.expiresJwt,
  });
}
