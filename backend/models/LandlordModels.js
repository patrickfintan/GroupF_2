
import mongoose from "mongoose";

const landlordSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        emailAddress: {
            type: String,
            required: true,
        },
        addressL1: {
            type: String,
            required: true,
        },
        addressL2: {
            type: String,
            required: false,
        },
        town: {
            type: String,
            required: true,
        },
        county: {
            type: String,
            required: true,
        },
        eircode: {
            type: String,
            required: false,
        },
        dob: {
            type: Date,
            required: true,
        },
        canRent: {
            type: Boolean,
        },
        canBeContacted: {
            type: Boolean,
        }
    }
);

//4.2) you can copy and past sample code from "https://mongoosejs.com/"
export const Landlord = mongoose.model('Landlord', landlordSchema);