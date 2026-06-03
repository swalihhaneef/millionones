import express from "express";

import * as controllers from "../controllers/service.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/web", controllers.webList).get("/single/:id", controllers.details);

router.use(auth);

router.get("/", controllers.list).post("/", controllers.create).put("/", controllers.update).delete("/:id", controllers.deleteService);

export default router;
