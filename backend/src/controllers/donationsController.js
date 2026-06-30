import donationsModel from "../models/donations.js"

const donationsController = {}

donationsController.getDonations = async (req, res) => {
    try {
        const donations = await donationsModel.find()
        return res.status(200).json(donations)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

donationsController.insertDonation = async (req, res) => {
    try {
        const {donorId, amount, donationDate, paymentStatus, transactionId} = req.body

        const newDonation = new donationsModel({
            donorId, amount, donationDate, paymentStatus, transactionId
        })

        await newDonation.save()

        return res.status(200).json({message: "Donation saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

donationsController.updateDonation = async (req, res) => {
    try {
        const {donorId, amount, donationDate, paymentStatus, transactionId} = req.body
        
        const donationUpdate = await donationsModel.findByIdAndUpdate(req.params.id, {
            donorId, amount, donationDate, paymentStatus, transactionId
            }, {new: true}
        )

        if (!donationUpdate) {
            return res.status(400).json({message: "Donation not found"})
        }

        return res.status(200).json({message: "Donation updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

donationsController.deleteDonation = async (req, res) => {
    try {
        const donationDelete = await donationsModel.findByIdAndDelete(req.params.id)

        if (!donationDelete) {
            return res.status(400).json({message: "Donation not found"})
        }

        return res.status(200).json({message: "Donation not found"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default donationsController