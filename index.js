// This file serves as the entry point for the backend portion of the application.

// Import necessary modules and packages
import express from "express"; // Importing Express.js framework
import 'dotenv/config' // Importing dotenv to load environment variables
import bodyParser from "body-parser"; // Middleware for parsing request bodies
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing
import path from "path" // Module for working with file and directory paths
import jwtAuthoriser from "./middlewares/jwt.middleware.js";  // Middleware for JWT token authorization
import { connectToDataBase } from "./configurations/mongoose.config.js"; // Function to connect to the database
import { customerRouter } from "./features/user/customer/customer.route.js"; // Router for customer-related routes
import { productRouter } from "./features/products/product.route.js"; // Router for product-related routes
import { cartRouter } from "./features/cart/cart.route.js"; // Router for cart-related routes
import { vendorRouter } from "./features/user/vendor/vendor.route.js"; // Router for vendor-related routes

// Create an instance of Express server
const server = express();

// Enable Cross-Origin Resource Sharing for all routes
server.use(cors());

// Middleware to parse incoming JSON requests
server.use(bodyParser.json())

// Serve static files from the 'uploads' directory
server.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Define route handlers for various features
server.use("/api/customer", customerRouter); // Routes related to customers
server.use("/api/vendor", vendorRouter);  // Routes related to vendors
server.use("/api/product", productRouter); // Routes related to products
server.use("/api/cart", jwtAuthoriser, cartRouter); // Routes related to carts, with JWT authorization

// Default route handler, responds with a simple message to indicate server is working
server.get("/", (req, res) => {
    return res.status(200).send("The Server is working");
})

// Start the server, listen on the specified port
server.listen(process.env.PORT, () => {

    connectToDataBase(); // Connect to the database when the server starts
    console.log("The server is working on port 5100");
})