// Importing necessary modules and dependencies
import mongoose from 'mongoose';

// Destructuring Schema from mongoose
const { Schema } = mongoose;

// Defining a new schema for the Cart
const cartSchema = new Schema({

    // Defining a field to store the user ID associated with the cart, using MongoDB's ObjectId type
    userId: mongoose.Schema.Types.ObjectId,

    // Defining a field to store an array of cart products, allowing for dynamic product additions
    cartProducts: [],
});

// Creating a model named 'Cart' based on the cartSchema
export const CartModel = mongoose.model('Cart', cartSchema);