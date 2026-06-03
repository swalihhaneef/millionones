import express from "express";
const router = express.Router();

import * as controllers from "../controllers/testimonial.controller.js";
import auth from "../middleware/auth.js";

router.get("/web", controllers.listTestimonialWeb);

router.use(auth);

router.post("/", controllers.create);

router.put("/", controllers.update);

router.delete("/:id", controllers.deleteTestimonial);

router.get("/", controllers.listTestimonial);

router.get("/:id", controllers.testimonialDetails);

export default router;
