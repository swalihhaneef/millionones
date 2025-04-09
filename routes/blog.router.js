import express from "express";
const router = express.Router();

import * as controllers from "../controllers/blog.controller.js";
import auth from "../middleware/auth.js";

router.use(auth);

router.get("/", controllers.listBlog);

router.post("/", controllers.create);

router.put("/", controllers.update);

router.delete("/:id", controllers.deleteBlog);

export default router;
