import { ErrorRequestHandler } from "express";
import ErrorResponse from "../util/ErrorResponse";
import { ValidationError } from "yup";
import ResponseJson from "../util/ResponseJson";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { MulterError } from "multer";

const errorMiddlewares: ErrorRequestHandler = (
  err: ErrorResponse,
  req,
  res,
  next
) => {
  console.log(err);

  // Multer
  if (err instanceof MulterError) {
    err.status = 400;
    err.message = "Please upload file size under 5mb";
  }

  // Prisma
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      err.status = 409;
      err.message = "Account Already Exists";
    }
  }

  // Yup
  if (err instanceof ValidationError) {
    err.status = 400;
  }

  if (!err.status) {
    err.status = 500;
    err.message = "Internal Server Error";
  }

  return res.status(err.status).json(new ResponseJson(false, err.message, {}));
};

export default errorMiddlewares;
