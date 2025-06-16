import express from "express";
const router = express.Router();

import * as controllers from "../controllers/common.controller.js";

import { imageFileName, multerUpload } from "../helper/functions.js";
import auth from "../middleware/auth.js";

router.get("/category", controllers.category);

router.get("/countries",controllers.countries)

router.get("/states",controllers.states)

router.use(auth);

router.post(
  "/image/:folder",
  (req, res, next) => {
    const upload = multerUpload(req.params.folder, null, { fileSize: 5 * 1024 * 1024 });
    upload.single("image")(req, res, next);
  },
  imageFileName
);


export default router;
