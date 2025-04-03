
import express from "express";

import userRoutes from './routes/userRoutes.js';
import landlordRoutes from './routes/landlordRoutes.js';
import contractRoutes from './routes/contractRoutes.js';

import cors from "cors";

import {PORT, mongoDBURL} from "./config.js";

import mongoose from 'mongoose';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {

    console.log(request);
    return response.status(234).send('running...');

});

app.use('/users', userRoutes);
app.use('/landlords', landlordRoutes);
app.use('/contracts', contractRoutes);

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('Successfully connected to database');

    app.listen(PORT, () => {
        console.log('App is listening for PORT: ' + PORT);
    })
})
.catch(() => {
    console.log("error");
})