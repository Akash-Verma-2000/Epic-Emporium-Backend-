// Importing 'loggedInUserID' from the 'jwt.middleware.js' file and 'ProductModel' from the 'product.schema.js' file
import { loggedInUserID } from "../../middlewares/jwt.middleware.js";
import { ProductModel } from "./product.schema.js";

// Exporting a class named 'ProductRepository'
export default class ProductRepository {

    // Method to retrieve a product by its ID
    async getProductByID(productID) {
        try {
            return await ProductModel.findById(productID);
        } catch (err) {
            throw err;
        }
    }


    // Method to retrieve products of the logged-in vendor
    async getLoggedInVendorProduct() {
        try {
            return await ProductModel.find({ productOwner: loggedInUserID });
        } catch (err) {
            throw err;
        }
    }

    // Method to retrieve all products
    async getAllProducts() {
        try {
            return await ProductModel.find();
        } catch (err) {
            throw err;
        }
    }

    // Method to retrieve products by category
    async getCategoryProducts(category) {
        try {
            return await ProductModel.find({ category })
        } catch (err) {
            throw err;
        }
    }

    // Method to add a new product
    async addProduct(productObj) {
        try {

            // Creating a new product document based on the provided product object
            const newproduct = new ProductModel(productObj);

            // Saving the new product document to the database
            await newproduct.save();
            return;
        } catch (err) {
            throw err;
        }
    }

    // Method to update an existing product
    async updateProduct(productObj, productID) {
        try {
            // Finding the product by its ID
            const product = await ProductModel.findById(productID);

            // Checking if the product exists and belongs to the logged-in user
            if (product && product.productOwner == loggedInUserID) {

                // Updating the product document with the provided object
                await ProductModel.findByIdAndUpdate(productID, productObj);
                return "Product Updated";
            }
            return;
        } catch (err) {
            throw err;
        }
    }

    // Method to delete a product
    async deleteProduct(productID) {
        try {
            // Finding the product by its ID
            const product = await ProductModel.findById(productID);

            // Checking if the product exists and belongs to the logged-in user
            if (product && product.productOwner == loggedInUserID) {

                // Deleting the product document from the database
                await ProductModel.findByIdAndDelete(productID);

                // Retrieving the remaining products after deletion
                const restProducts = await ProductModel.find();
                return { message: "Product had been deleted", restProducts };
            }
            // If product not found or doesn't belong to the logged-in user, return appropriate message
            const restProducts = await ProductModel.find();
            return { message: "Product not found", restProducts };
        } catch (err) {
            throw err;
        }
    }
}