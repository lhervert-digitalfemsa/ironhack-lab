import { Router } from "express";
import { check } from "express-validator";

import { handleError, verifyToken } from "../middlewares";

import { login, logout } from "../controllers/auth.controller";

const router = Router();

router.post(
  "/login",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "The password must have at least 6 characters").isLength({
      min: 6,
    }),
    handleError,
  ],
  login
);

router.get("/logout", verifyToken, logout);

export default router;