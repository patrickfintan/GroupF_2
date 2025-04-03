
import mongoose from "mongoose";


const contractSchema = mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        lID: {
            type: String,
            required: true,
        },
        tIDs: {
            type: [String],
            required: true,
        },
        fee: {
            type: Number,
            required: true,
        },
        doorNum: {
            type: Number,
            required: true,
        },
        contractLength: {
            type: String,
            required: true,
        },
        propertyType: {
            type: String,
            required: true,
        }
    }
);

//4.2) you can copy and past sample code from "https://mongoosejs.com/"
export const Contract = mongoose.model('Contract', contractSchema);