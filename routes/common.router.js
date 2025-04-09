import express from "express";
const router = express.Router();

import * as controllers from "../controllers/common.controller.js";

router.get("/blog-category", controllers.blogCategory);

export default router;
