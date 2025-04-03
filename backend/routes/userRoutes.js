import express from 'express';
import {User} from '../models/UserModels.js';
const router = express.Router();

//createing route for new customer
router.post('/', async(request, response) => {
    try {
        if (
            !request.body.firstName ||
            !request.body.mobile
        ) {return response.status(400).send({
            message: 'Send all required fields',
        });
    }

    const newUser = {
        firstName: request.body.firstName,
        mobile: request.body.mobile,
    }

    const user = await User.create(newUser);

    return response.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route to get all phones
router.get('/', async (request, response) => {
    try {
        const users = await User.find({});
        return response.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// route to get ONE customer account by id
router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        const user = await User.findById(id);

        return response.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


//route to update a customer
router.put('/:id', async (request, response) => {
    try{
        if (
            !request.body.firstName ||
            !request.body.mobile
        ) {
            return response.status(400).send({
                message: 'Hey send all required fields ()',
            });
        }

        const {id} = request.params;

        const result = await User.findByIdAndUpdate(id, request.body)

        if(!result) {
            return response.status(404).json({message: 'User not found'});
        }

        return response.status(200).send({message: 'User updated successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route to delete a Customer
router.delete('/:id', async (request, response) => {
    try{
       const {id} = request.params;
       const result = await User.findByIdAndDelete(id);

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