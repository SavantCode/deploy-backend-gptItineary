// Defines public authentication routes.

import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/auth.controller.js";
// import { verifyJWT } from "../middlewares/errorMiddleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/login").post(loginUser);

// Secured route
router.route("/logout").post(verifyJWT, logoutUser);

export default router;