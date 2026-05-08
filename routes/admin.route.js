import express from "express";
import { BlockUser, GetAllUsers, GetBlockedUsers, GetUserById, UnBlockUser } from "../controllers/admin.controller.js";
import { ProtectRoute } from "../middlewares/protectRoute.js";
import { ProtectAdmin } from "../middlewares/protectAdmin.js";

const router = express.Router();

router.get('/get/all/users', ProtectRoute, ProtectAdmin, GetAllUsers)

router.get('/get/user/:id', ProtectRoute, ProtectAdmin, GetUserById)

router.put('/block/user/:id', ProtectRoute, ProtectAdmin, BlockUser)

router.put('/unblock/user/:id', ProtectRoute, ProtectAdmin, UnBlockUser)

router.get('/get/blocked/users', ProtectRoute, ProtectAdmin, GetBlockedUsers)

export default router;