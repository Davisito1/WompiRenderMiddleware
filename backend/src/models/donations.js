import {Schema, model} from "mongoose"

const donationsModel = new Schema({
    donorId: {
        type: Schema.Types.ObjectId,
        ref: "donors"
    },
    amount: {type: Number},
    donationDate: {type: Date},
    paymentStatus: {type: String},
    transactionId: {type: String}
})

export default model("donations", donationsModel)