import express from "express";

import auth from "../middleware/auth.js";

import * as controller from "../controllers/jobPost.controller.js";

const router = express.Router();

router.get("/web", controller.webList);

router.use(auth);

router
  .get("/", controller.list)
  .post("/", controller.create)
  .put("/", controller.update)
  .put("/status", controller.statusUpdate)
  .delete("/:id", controller.deleteJobPost)
  .get("/:id", controller.details);

export default router;
