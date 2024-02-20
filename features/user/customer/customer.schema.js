// Importing the 'mongoose' module for defining MongoDB schemas
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Defining the schema for the 'customers' collection
const customerSchema = new Schema({

    name: String, // Field to store the customer's name as a string
    email: String, // Field to store the customer's email address as a string
    password: String, // Field to store the customer's password as a string
    type: {
        type: String,
        default: 'vendor' // Default value for the type field
    }
});

// Creating a model based on the defined schema, named 'Customer', to interact with the 'customers' collection in MongoDB
export const CustomerModel = mongoose.model('Customer', customerSchema);