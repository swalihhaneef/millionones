import express from "express";
const router = express.Router();

import * as controllers from "../controllers/jobApplication.controller.js";
import auth from "../middleware/auth.js";
import { multerUpload } from "../helper/functions.js";
import path from "path";
import { Error } from "express-error-catcher";

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`${allowedExtensions.join(",").replace(/[.,]/g, " ").replace(/\s/, "")} files are allowed`, 400));
  }
};

const jobFile = multerUpload("job-application", fileFilter, {
  fileSize: 5 * 1024 * 1024,
});

router.post("/", jobFile.single("file"), controllers.create);

router.use(auth);

export default router;
