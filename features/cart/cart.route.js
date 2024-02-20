// Importing the express module to create routes
import express from "express";

// Importing the CartController to handle cart-related operations
import CartController from "./cart.controller.js";

// Creating an instance of the CartController
const cartController = new CartController();

// Creating a new router using Express's Router method
export const cartRouter = express.Router();

cartRouter.post("/add/:id", cartController.addToCart); // Route to add a product to the cart by ID
cartRouter.get("/all", cartController.getCartProducts); // Route to get all products in the cart
cartRouter.put("/increase/:id", cartController.increaseQuantity); // Route to increase the quantity of a product in the cart by ID
cartRouter.put("/decrease/:id", cartController.decreaseQuantity);// Route to decrease the quantity of a product in the cart by ID
cartRouter.delete("/delete/:id", cartController.deleteProduct);// Route to delete a product from the cart by ID
