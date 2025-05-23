import express from "express";

const router = express.Router();

import indexRouter from "./routes/index.js";
import insightRouter from "./routes/insight.router.js";
import authRouter from "./routes/auth.router.js";

import commonRouter from "./routes/common.router.js";

import works from "./routes/works.router.js";
import service from "./routes/service.router.js";

router.use("/", indexRouter);

router.use("/insight", insightRouter);

router.use("/auth", authRouter);

router.use("/common", commonRouter);

router.use("/works", works);

router.use("/service", service);

export default router;
