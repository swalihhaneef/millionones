import express from "express";

import auth from "../middleware/auth.js";

import * as controllers from "../controllers/category.controller.js";

import { multerUpload } from "../helper/functions.js";

const category = multerUpload("category", null, {
  fileSize: 5 * 1024 * 1024, // Max file size of 10MB
});

const router = express.Router();

router.use(auth);

router.post("/", category.single("image"), controllers.create);

router.put("/", category.single("image"), controllers.update);

router.delete("/:id", controllers.deleteCategory);

router.get("/", controllers.listCategory);

export default router;
