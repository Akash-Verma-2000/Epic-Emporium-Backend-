// Importing necessary modules and dependencies
import mongoose from "mongoose";
import { loggedInUserID } from "../../middlewares/jwt.middleware.js";
import ProductRepository from "./product.repository.js";

// Creating a new instance of the ProductRepository class
const productRepository = new ProductRepository();

export default class ProductController {

    // Method to fetch products of the logged-in vendor
    async getLoggedInVendorProduct(req, res) {
        try {
            // Retrieving products of the logged-in vendor from the repository
            const productArray = await productRepository.getLoggedInVendorProduct();

            // Sending the product data as a JSON response
            return res.status(200).json({ data: productArray });
        } catch (err) {
            // Handling errors
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }

    // Method to fetch all products
    async getAllProducts(req, res) {
        try {
            // Retrieving all products from the repository
            const productArray = await productRepository.getAllProducts();

            // Sending the product data as a JSON response
            return res.status(200).json({ data: productArray });
        } catch (err) {
            // Handling errors
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }

    // Method to fetch product details by ID
    async getProductByID(req, res) {
        try {
            // Retrieving product details by ID from the repository
            const productDetails = await productRepository.getProductByID(req.params.ID);

            // Sending the product details as a JSON response
            return res.status(200).json({ data: productDetails });
        } catch (err) {
            // Handling errors
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }

    // Method to fetch products by category
    async getCategoryProducts(req, res) {
        try {
            // Retrieving products by category from the repository
            const result = await productRepository.getCategoryProducts(req.params.category);

            // Sending the product data as a JSON response
            return res.status(200).json({ data: result });
        } catch (err) {
            // Handling errors
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }

    // Method to add a new product
    async addProduct(req, res) {
        try {
            // Extracting the filename of the uploaded image
            const image = req.file.filename;

            // Constructing the full image URL
            const imageFullPath = `https://epic-emporium-backend.onrender.com/uploads/${image}`; // Modify this to match your server URL

            // Creating a new product object with the image URL and the logged-in user's ID
            const productObj = { ...req.body, image: imageFullPath, productOwner: new mongoose.Types.ObjectId(loggedInUserID) }

            // Adding the new product to the repository
            await productRepository.addProduct(productObj);

            // Sending a success message as a JSON response
            return res.status(200).json({ message: "Product has been added." });
        } catch (err) {
            // Handling errors
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });

        }
    }

    // Method to update an existing product
    async updateProduct(req, res) {
        try {
            // Extracting the filename of the uploaded image
            const image = req.file.filename;

            // Constructing the full image URL
            const imageFullPath = `http://localhost:${process.env.PORT}/uploads/${image}`;

            // Creating a new product object with the updated image URL
            const productObj = { ...req.body, image: imageFullPath }

            // Updating the product in the repository
            const result = await productRepository.updateProduct(productObj, req.params.ID);

            // Sending a success or failure message as a JSON response
            if (result == "Product Updated") {
                return res.status(201).json({ message: "Product has been updated" });
            }

            return res.status(400).json({ message: "Product could not be updated" });
        } catch (err) {
            // Handling errors
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }


    // Method to delete a product
    async deleteProduct(req, res) {
        try {
            // Deleting the product from the repository
            const result = await productRepository.deleteProduct(req.params.ID);

            // Sending a success or failure message as a JSON response
            if (result.message == "Product had been deleted") {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }

        } catch (err) {
            // Handling errors
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }
}




