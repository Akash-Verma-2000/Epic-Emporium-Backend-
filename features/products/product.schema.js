// Importing the 'mongoose' module for defining MongoDB schemas
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Defining the schema for the 'products' collection
const productSchema = new Schema({
    title: String, // Field to store the title of the product as a string
    price: Number, // Field to store the price of the product as a number
    description: String, // Field to store the description of the product as a string
    category: String, // Field to store the category of the product as a string
    image: String,  // Field to store the image URL of the product as a string
    quantity: {
        // Field to store the quantity of the product available, defaulting to 1 if not provided
        type: Number,
        default: 1,
    },
    productOwner: mongoose.Schema.Types.ObjectId, // Field to store the ID of the product owner, referencing the '_id' field of another document
});

// Creating a model based on the defined schema, named 'Product', to interact with the 'products' collection in MongoDB
export const ProductModel = mongoose.model('Product', productSchema);