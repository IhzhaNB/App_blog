import { Handler } from "express";
import ResponseJson from "../util/ResponseJson";

const NotFoundMiddleware: Handler = (req, res) => {
  res.status(404).json(new ResponseJson(false, "Endpoint Not Found", {}));
};

export default NotFoundMiddleware;
