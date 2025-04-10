import express from "express";
const router = express.Router();

import * as controllers from "../controllers/blog.controller.js";
import auth from "../middleware/auth.js";
import { multerUpload } from "../helper/functions.js";

router.use(auth);

router.get("/web", controllers.listBlogWeb);

const blogFile = multerUpload("blog", null, {
  fileSize: 5 * 1024 * 1024, // Max file size of 10MB
});

router.post("/", blogFile.single("photo"), controllers.create);

router.put("/", controllers.update);

router.delete("/:id", controllers.deleteBlog);

router.get("/", controllers.listBlog);

export default router;
