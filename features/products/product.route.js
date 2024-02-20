// Importing the 'express' module to create route handlers
import express from "express"
import ProductController from "./product.controller.js" // Importing the 'ProductController' class from the './product.controller.js' file
import jwtAuthoriser from "../../middlewares/jwt.middleware.js";// Importing the 'jwtAuthoriser' middleware for JWT token authorization
import { upload } from "../../middlewares/fileUpload.middleware.js";// Importing the 'upload' middleware for file uploads

// Creating a new router instance using the Router() function from Express
export const productRouter = express.Router();

// Creating a new instance of the 'ProductController' class
const productController = new ProductController();

// Route for retrieving all products
productRouter.get("/all", productController.getAllProducts);

// Route for retrieving a product by its ID
productRouter.get("/:ID", productController.getProductByID);

// Route for retrieving products by category
productRouter.get("/category/:category", productController.getCategoryProducts);

// Defining HTTP GET, POST, PUT, and DELETE routes for product management, with JWT token authorization and file upload middleware

// Route for retrieving products of the logged-in vendor
productRouter.get("/", jwtAuthoriser, productController.getLoggedInVendorProduct);

// Route for adding a new product, with JWT token authorization and file upload middleware
productRouter.post("/add-product", jwtAuthoriser, upload.single('image'), productController.addProduct);

// Route for updating a product by its ID, with JWT token authorization and file upload middleware
productRouter.put("/update-product/:ID", jwtAuthoriser, upload.single('image'), productController.updateProduct);

// Route for deleting a product by its ID, with JWT token authorization
productRouter.delete("/delete-product/:ID", jwtAuthoriser, productController.deleteProduct);
