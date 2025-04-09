import express from "express";
const router = express.Router();

import * as controllers from "../controllers/auth.controller.js";

router.post("/login", controllers.loginUser);

export default router;
