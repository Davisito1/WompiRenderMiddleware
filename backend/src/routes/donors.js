import express from "express"
import donorsController from "../controllers/donorsController.js"

const router = express.Router()

router.route("/")
.get(donorsController.getDonors)

export default router