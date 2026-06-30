import express from "express"
import registerDonorController from "../controllers/registerDonorController.js"

const router = express.Router()

router.route("/").post(registerDonorController.register)
router.route("/verifyCode").post(registerDonorController.verifyCode)

export default router