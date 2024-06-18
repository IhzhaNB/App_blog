import { Response } from "express";

export default function attachCookie(res: Response, token: string) {
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 100 * 60 * 60 * 24),
    secure: process.env.NODE_ENV !== "production" ? false : true,
  });
}
