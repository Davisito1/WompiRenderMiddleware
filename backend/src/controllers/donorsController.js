import donorsModel from "../models/donors.js"

const donorsController = {}

donorsController.getDonors = async (req, res) => {
    try {
        const donors = await donorsModel.find()
        return res.status(200).json(donors)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default donorsController