import express from "express";

const router = express.Router();

import indexRouter from "./routes/index.js";
import insightRouter from "./routes/insight.router.js";
import authRouter from "./routes/auth.router.js";

import commonRouter from "./routes/common.router.js";

import works from "./routes/works.router.js";
import service from "./routes/service.router.js";

import contact from "./routes/contact.router.js";

import jobPost from "./routes/jobPost.router.js";

import testimonial from "./routes/testimonial.router.js";

import jobApplication from "./routes/jobApplication.router.js";

import category from "./routes/category.router.js";

router.use("/", indexRouter);

router.use("/insight", insightRouter);

router.use("/auth", authRouter);

router.use("/common", commonRouter);

router.use("/works", works);

router.use("/service", service);

router.use("/contact", contact);

router.use("/job-post", jobPost);

router.use("/job-application", jobApplication);

router.use("/testimonial", testimonial);

router.use("/category", category);

export default router;
