import express from 'express';
import {Contract} from '../models/ContractModels.js';
const router = express.Router();

//createing route for new customer
router.post('/', async(request, response) => {
    try {
        if (
            !request.body.date ||
            !request.body.address ||
            !request.body.lID ||
            !request.body.tIDs ||
            !request.body.fee ||
            !request.body.doorNum ||
            !request.body.contractLength ||
            !request.body.propertyType
        ) {return response.status(400).send({
            message: 'Send all required fields',
        });
    }

    const newContract = {
        date: request.body.date,
        address: request.body.address,
        lID: request.body.lID,
        tIDs: request.body.tIDs,
        fee: request.body.fee,
        doorNum: request.body.doorNum,
        contractLength: request.body.contractLength,
        propertyType: request.body.propertyType,
    }

    const contract = await Contract.create(newContract);

    return response.status(201).send(contract);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route to get all phones
router.get('/', async (request, response) => {
    try {
        const contracts = await Contract.find({});
        return response.status(200).json(contracts);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route to get ONE customer account by id
router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        const contract = await Contract.findById(id);

        return response.status(200).json(contract);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route to update a customer
router.put('/:id', async (request, response) => {
    try{
        if (
            !request.body.date ||
            !request.body.address ||
            !request.body.lID ||
            !request.body.tIDs ||
            !request.body.fee ||
            !request.body.doorNum ||
            !request.body.contractLength ||
            !request.body.propertyType
        ) {
            return response.status(400).send({
                message: 'Hey send all required fields ()',
            });
        }

        const {id} = request.params;

        const result = await Contract.findByIdAndUpdate(id, request.body)

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
       const result = await Contract.findByIdAndDelete(id);

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