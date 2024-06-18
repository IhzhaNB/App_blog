import express from "express";
import errorMiddlewares from "./middlewares/ErrorMiddleware";
import NotFoundMiddleware from "./middlewares/NotFoundMiddleware";
import authRouter from "./routes/authRouter";
import blogRouter from "./routes/blogRouter";

import cookieParser from "cookie-parser";
import path from "path";
import authentication from "./middlewares/authentication";
import commentRouter from "./routes/commentRouter";

const app = express();

app.use(cookieParser());
app.use(express.json());

// Static File for banner
app.use("/static", express.static(path.join(__dirname, "/uploads/banner")));

// router
app.use("/auth", authRouter);
app.use("/api", blogRouter);
app.use("/api", authentication(), commentRouter);

// Middleware
app.use("*", NotFoundMiddleware);
app.use(errorMiddlewares);

app.listen(3000, () => console.log("Server running on port 3000"));
