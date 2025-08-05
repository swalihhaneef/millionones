import express from "express";
import * as controller from "../controllers/industries.controller.js";

const router = express.Router();

import auth from "../middleware/auth.js";

router.get("/web", controller.webList).get("/single/:id", controller.details);

router.use(auth);

router.get("/", controller.list);

router.post("/", controller.create);

router.put("/", controller.update);

router.delete("/:id", controller.deleteIndustry);

export default router;
