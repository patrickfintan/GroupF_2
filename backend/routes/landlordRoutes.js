import express from 'express';
import {Landlord} from '../models/LandlordModels.js';
const router = express.Router();

//createing route for new customer
router.post('/', async(request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.firstName ||
            !request.body.surname ||
            !request.body.mobile ||
            !request.body.emailAddress ||
            !request.body.addressL1 ||
            !request.body.town ||
            !request.body.county ||
            !request.body.dob
        ) {return response.status(400).send({
            message: 'Send all required fields',
        });
    }

    const newLandlord = {
        title: request.body.title,
        firstName: request.body.firstName,
        surname: request.body.surname,
        mobile: request.body.mobile,
        emailAddress: request.body.emailAddress,
        addressL1: request.body.addressL1,
        addressL2: request.body.addressL2,
        town: request.body.town,
        county: request.body.county,
        eircode: request.body.eircode,
        dob: request.body.dob,
        canRent: request.body.canRent,
        canBeContacted: request.body.canBeContacted
    }

    const landlord = await Landlord.create(newLandlord);

    return response.status(201).send(landlord);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


// route to get all phones
router.get('/', async (request, response) => {
    try {
        const landlords = await Landlord.find({});
        return response.status(200).json(landlords);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


// route to get ONE customer account by id
router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        const landlord = await Landlord.findById(id);

        return response.status(200).json(landlord);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route to update a customer
router.put('/:id', async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.firstName ||
            !request.body.surname ||
            !request.body.mobile ||
            !request.body.emailAddress ||
            !request.body.addressL1 ||
            !request.body.town ||
            !request.body.county ||
            !request.body.dob
        ) {
            return response.status(400).send({
                message: 'Hey send all required fields ()',
            });
        }

        const {id} = request.params;

        const result = await Landlord.findByIdAndUpdate(id, request.body)

        if(!result) {
            return response.status(404).json({message: 'Customer not found'});
        }

        return response.status(200).send({message: 'Customer updated successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


//route to delete a Customer
router.delete('/:id', async (request, response) => {
    try{
       const {id} = request.params;
       const result = await Landlord.findByIdAndDelete(id);

       if(!result) {
        return response.status(404).json({message: 'Customer not found'});
    }

    return response.status(200).send({message: 'Customer deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;