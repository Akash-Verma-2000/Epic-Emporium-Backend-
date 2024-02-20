// Importing necessary modules and dependencies
import mongoose from "mongoose";
import { loggedInUserID } from "../../middlewares/jwt.middleware.js";
import { ProductModel } from "../products/product.schema.js";
import { CartModel } from "./cart.schema.js"
export default class CartRepository {

    // Method to add a product to the cart
    async addToCart(productID) {
        try {
            // Checking if a cart exists for the logged-in user
            const isCartPresent = await CartModel.findOne({ userId: loggedInUserID });

            // Fetching the product object by its ID
            const productObj = await ProductModel.findById(productID);

            // Setting the default quantity of the product to 1
            productObj.quantity = 1;

            if (isCartPresent) {

                // If the cart already exists
                const cartProducts = isCartPresent.cartProducts;

                // Checking if the product is already present in the cart
                const isProductPresent = cartProducts.find(product => product._id.equals(new mongoose.Types.ObjectId(productID)));

                if (isProductPresent) {

                    // Returning a message indicating that the product is already present in the cart
                    return "Product Already Present";
                }

                else {
                    // Adding the product to the cart's product array
                    isCartPresent.cartProducts.unshift(productObj);

                    // Updating the cart in the database
                    await CartModel.findOneAndUpdate({ userId: loggedInUserID }, isCartPresent);

                    // Returning nothing (no need to return the cart products)
                    return;
                }

            }
            else {

                // If the cart doesn't exist for the user
                const cart = { userId: loggedInUserID, cartProducts: [productObj] };

                // Creating a new cart
                const newCart = new CartModel(cart);

                // Saving the new cart to the database
                newCart.save(newCart);

                // Returning nothing (no need to return the cart products)
                return;
            }

        } catch (err) {
            // Handling errors
            throw err;
        }
    }

    // Method to retrieve all products in the cart
    async getCartProducts() {
        try {
            // Finding the cart for the logged-in user
            const cart = await CartModel.findOne({ userId: loggedInUserID });

            if (!cart) {
                // Returning an empty array if the cart doesn't exist
                return [];
            }

            // Extracting cart products from the cart
            const cartArray = cart.cartProducts
            let newCartArray = [];

            // Looping through cart products and retrieving product details from the database
            for (let i of cartArray) {
                const productObj = await ProductModel.findById(i);
                if (productObj) {
                    newCartArray.unshift(i);
                }
            }

            // Returning the updated cart array with product details
            return newCartArray;
        } catch (err) {
            // Handling errors
            throw err
        }
    }

    // Method to increase the quantity of a product in the cart
    async increaseQuantity(productID) {
        try {
            // Finding the cart for the logged-in user
            const cart = await CartModel.findOne({ userId: loggedInUserID });
            const cartProducts = cart.cartProducts;

            // Finding the product in the cart by its ID
            const productObj = cartProducts.find(product => product._id.equals(new mongoose.Types.ObjectId(productID)));

            // Increasing the quantity of the product
            productObj.quantity++;

            // Updating the cart in the database
            await CartModel.findOneAndUpdate({ userId: loggedInUserID }, cart);

            // Returning the updated cart products
            return cartProducts;
        } catch (err) {
            // Handling errors
            throw err;
        }
    }

    // Method to decrease the quantity of a product in the cart
    async decreaseQuantity(productID) {
        try {
            // Finding the cart for the logged-in user
            const cart = await CartModel.findOne({ userId: loggedInUserID });
            const cartProducts = cart.cartProducts;

            // Finding the product in the cart by its ID
            const productObj = cartProducts.find(product => product._id.equals(new mongoose.Types.ObjectId(productID)));

            if (productObj.quantity == 1) {
                // Deleting the product from the cart if the quantity becomes less than 1
                return await this.deleteProduct(productID)
            }

            // Decreasing the quantity of the product
            productObj.quantity--;

            // Updating the cart in the database
            await CartModel.findOneAndUpdate({ userId: loggedInUserID }, cart);

            // Returning the updated cart products
            return cartProducts;
        } catch (err) {
            // Handling errors
            throw err;
        }
    }

    // Method to delete a product from the cart
    async deleteProduct(productID) {
        try {
            // Finding the cart for the logged-in user
            const cart = await CartModel.findOne({ userId: loggedInUserID });
            const cartProducts = cart.cartProducts;

            // Finding the index of the product in the cart by its ID
            const productIndex = cartProducts.findIndex(product => product._id.equals(new mongoose.Types.ObjectId(productID)));

            if (productIndex < 0) {
                // Returning the cart products if the product is not found in the cart
                return cartProducts;

            } else {
                // Removing the product from the cart
                cartProducts.splice(productIndex, 1);

                // Updating the cart in the database
                await CartModel.findOneAndUpdate({ userId: loggedInUserID }, cart);

                // Returning the updated cart products
                return cartProducts;

            }
        } catch (err) {
            // Handling errors
            throw err;
        }
    }
}