import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import registerAdminRoutes from "./src/routes/registerAdmin.js"
import loginAdminRoutes from "./src/routes/loginAdmin.js"
import registerDonorRoutes from "./src/routes/registerDonor.js"
import loginDonorRoutes from "./src/routes/loginDonor.js"
import donationsRoutes from "./src/routes/donations.js"
import adminsRoutes from "./src/routes/admins.js"
import donorsRoutes from "./src/routes/donors.js"
import wompiRoutes from "./src/routes/wompi.js"

const app = express()

app.use(cors({
    origin: ["https://localhost5713", "http://localhost5174"],
    credentials: true
}))

app.use(cookieParser())

app.use(express.json())

app.use("/api/registerAdmin", registerAdminRoutes)
app.use("/api/loginAdmin", loginAdminRoutes)
app.use("/api/registerDonor", registerDonorRoutes)
app.use("/api/loginDonor", loginDonorRoutes)
app.use("/api/donations", donationsRoutes)
app.use("/api/admins", adminsRoutes)
app.use("/api/donors", donorsRoutes)
app.use("/api/wompi", wompiRoutes)

export default app