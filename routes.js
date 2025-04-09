import express from "express";

const router = express.Router();

import indexRouter from "./routes/index.js";
import blogRouter from "./routes/blog.router.js";
import authRouter from "./routes/auth.router.js";

import commonRouter from "./routes/common.router.js";

router.use("/", indexRouter);
router.use("/blog", blogRouter);

router.use("/auth", authRouter);

router.use("/common", commonRouter);

export default router;
