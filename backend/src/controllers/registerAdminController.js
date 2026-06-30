import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {config} from "../../config.js";
import adminsModel from "../models/admins.js"

const registerAdminController = {}

registerAdminController.register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut,
        } = req.body

        const existingAdmin = await adminsModel.findOne({email})

        if (existingAdmin) {
            return res.status(400).json({message: "Admin already exists"})
        }

        const passwordHashed = await bcryptjs.hash(password, 10)

        const randomCode = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign({
            randomCode,
            name,
            email,
            password: passwordHashed
        },
        config.JWT.secret,
        {
            expiresIn: "15m"
        }
        )

        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000})

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        //mailOptions -> quien lo recibe y como?
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificacion de cuenta",
            text: `Para verificar tu cuenta, utiliza este codigo ${randomCode} expira en 15 minutos`
        };

        //Enviar correo electronico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error" + error)
                return res.status(500).json({message: "Error sending email"});
            }

            return res.status(200).json({message: "Email sent"});
        });
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

registerAdminController.verifyCode = async (req, res) => {
    try {
        const {verificationCodeRequest} = req.body;

        const token = req.cookies.registrationCookie;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        const {
            randomCode: storedCode,
            name,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        } = decoded;

        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({ message: "Invalid code" });
        }
        
        const newAdmin = new adminsModel({
            name,
            email,
            password,
            isVerified: true,
        });

        await newAdmin.save();

        return res.status(200).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default registerAdminController