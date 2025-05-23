import express from "express";
import auth from "../middleware/auth.js";

import * as controllers from "../controllers/works.controller.js";
const router = express.Router();

router.get("/web", controllers.webList).get("/single/:id", controllers.details);

router.use(auth);
router.get("/", controllers.list).post("/", controllers.create).put("/", controllers.update).delete("/:id", controllers.deleteWork);
export default router;
