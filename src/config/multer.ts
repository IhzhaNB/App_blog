import multer from "multer";
import path from "path";
import ErrorResponse from "../util/ErrorResponse";

const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../", "/uploads/banner"));
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploads = multer({
  storage: diskStorage,
  limits: {
    fileSize: 5000000, // 5mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new ErrorResponse("Please upload an image", 400));
    }

    return cb(null, true);
  },
});

export default uploads;
