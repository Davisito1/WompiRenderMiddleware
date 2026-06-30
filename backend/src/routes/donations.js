import express from "express"
import donationsController from "../controllers/donationsController.js"
import { validateAuthCookie } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.route("/")
.get(donationsController.getDonations)
.post(validateAuthCookie(["donor", "admin"]), donationsController.insertDonation)

router.route("/:id")
.put(validateAuthCookie(["admin"]), donationsController.updateDonation)
.delete(validateAuthCookie(["admin"]), donationsController.deleteDonation)

export default router