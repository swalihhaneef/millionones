import express from "express";
const router = express.Router();

import * as controllers from "../controllers/insight.controller.js";
import auth from "../middleware/auth.js";
import { multerUpload } from "../helper/functions.js";

const blogFile = multerUpload("insight", null, {
  fileSize: 5 * 1024 * 1024, // Max file size of 10MB
});

router.get("/latest/:type", controllers.latestDetails);

router.get("/:type/list", controllers.listDetailsWeb);

router.get("/details/:permalink", controllers.insightDetailList);

router.use(auth);

router.post("/", blogFile.single("image"), controllers.create);

router.put("/", blogFile.single("image"), controllers.update);

router.delete("/:id", controllers.deleteInsight);

router.get("/", controllers.listInsight);

export default router;
