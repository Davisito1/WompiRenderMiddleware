import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"

import { config } from "../../config.js";

import donorsModel from "../models/donors.js"

const loginDonorController = {}

loginDonorController.login = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut,
        } = req.body

        const donorFound = await donorsModel.findOne({email})

        if (!donorFound) {
            return res.status(400).json({message: "Admin not found"})
        }

        if (donorFound.timeOut && donorFound.timeOut > Date.now()) {
            return res.status(403).json({message: "Blocked account"})
        }

        const isMatch = bcrypt.compare(password, donorFound.password)

        if (!isMatch) {
            donorFound.loginAttempts = (donorFound.loginAttempts || 0) + 1

            if (donorFound.loginAttempts >= 5) {
                donorFound.timeOut = Date.now() + 5 * 60 * 1000
                donorFound.loginAttempts = 0

                await donorFound.save()

                return res.status(403).json({message: "Account blocked for many attempts"})
            }

            await donorFound.save()

            return res.status(401).json({message: "Wrong password"})
        }

        donorFound.loginAttempts = 0
        donorFound.timeOut = null

        const token = jsonwebtoken.sign(
            {id: donorFound._id, userType: "donor"},
            config.JWT.secret,
            {expiresIn: "30d"}
        )

        res.cookie("authCookie", token)

        return res.status(200).json({message: "Login succesfull"})
    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default loginDonorController