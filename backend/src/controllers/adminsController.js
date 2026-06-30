import adminsModel from "../models/admins.js"

const adminsController = {}

adminsController.getAdmins = async (req, res) => {
    try {
        const admins = await adminsModel.find()
        return res.status(200).json(admins)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default adminsController