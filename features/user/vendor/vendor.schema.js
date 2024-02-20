// Importing the 'mongoose' module for defining MongoDB schemas
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Defining the schema for the 'Vendor' collection
const vendorSchema = new Schema({
    name: String,  // Field to store the vendor's name as a string
    email: String,  // Field to store the vendor's email address as a string
    password: String,  // Field to store the vendor's password as a string
    // Field to store the type of the vendor, defaulting to 'vendor' if not provided
    type: {
        type: String,
        default: 'vendor' // Default value for the type field
    }
});

// Creating a model based on the defined schema, named 'Vendor', to interact with the 'vendors' collection in MongoDB
export const VendorModel = mongoose.model('Vendor', vendorSchema);