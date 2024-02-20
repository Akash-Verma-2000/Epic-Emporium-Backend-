// Importing the CartRepository class from cart.repository.js
import CartRepository from "./cart.repository.js";

// Creating an instance of CartRepository
const cartRepository = new CartRepository();

export default class CartController {

    // Method to add a product to the cart
    async addToCart(req, res) {
        try {
            // Calling the addToCart method of CartRepository to add the product to the cart
            const result = await cartRepository.addToCart(req.params.id);

            // Checking if the result indicates that the product is already present in the cart

            if (result == "Product Already Present") {
                return res.status(409).json({ message: "This product is already present in your cart." })
            }
            else {
                return res.status(201).json({ message: "Product has been added to the cart." });
            }

        } catch (err) {
            // Handling errors that occur during the operation
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }

    // Method to retrieve all products in the cart
    async getCartProducts(req, res) {
        try {
            const result = await cartRepository.getCartProducts();
            return res.status(200).json({ data: result });
        } catch (err) {
            // Handling errors that occur during the operation
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }

    // Method to increase the quantity of a product in the cart
    async increaseQuantity(req, res) {
        try {

            const result = await cartRepository.increaseQuantity(req.params.id);
            return res.status(201).json({ data: result });

        } catch (err) {
            // Handling errors that occur during the operation
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }

    // Method to decrease the quantity of a product in the cart
    async decreaseQuantity(req, res) {
        try {

            const productID = req.params.id;
            const result = await cartRepository.decreaseQuantity(productID);
            return res.status(201).json(result);

        } catch (err) {
            // Handling errors that occur during the operation
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }

    // Method to delete a product from the cart
    async deleteProduct(req, res) {
        try {

            const productID = req.params.id;
            const result = await cartRepository.deleteProduct(productID);
            return res.status(201).json(result);

        } catch (err) {
            // Handling errors that occur during the operation
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });

        }
    }
}