import express from "express"
import adminsController from "../controllers/adminsController.js";

const router = express.Router()

router.route("/")
.get(adminsController.getAdmins)

export default router