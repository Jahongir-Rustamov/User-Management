import express from "express";
import { SignUpController, LoginController, LogoutController } from "../controllers/auth.controller.js";
import { ProtectRoute } from "../middlewares/protectRoute.js";
const router = express.Router();

router.post("/signup", SignUpController);

router.post("/login", LoginController);

router.delete("/logout", LogoutController);


export default router;