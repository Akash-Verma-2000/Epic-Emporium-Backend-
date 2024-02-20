// Importing the 'express' module to create route handlers
import express from "express";

// Importing the 'CustomerController' class from the './customer.controller.js' file
import CustomerController from "./customer.controller.js";

// Creating a new router instance using the Router() function from Express
export const customerRouter = express.Router();

// Creating a new instance of the 'CustomerController' class
const customerController = new CustomerController();

// Route for customer signup, calls the 'signup' method from the 'CustomerController'
customerRouter.post("/signup", customerController.signup);

// Route for customer signin, calls the 'signin' method from the 'CustomerController'
customerRouter.post("/signin", customerController.signin);

// Route for sending OTP (One-Time Password) for customer, calls the 'sendOtp' method from the 'CustomerController'
customerRouter.post("/sendOTP", customerController.sendOtp);

// Route for verifying OTP (One-Time Password) for customer, calls the 'verifyOtp' method from the 'CustomerController'
customerRouter.post("/verifyOTP", customerController.verifyOtp);

// Route for resetting customer's password, calls the 'resetPassword' method from the 'CustomerController'
customerRouter.post("/reset-password", customerController.resetPassword);

