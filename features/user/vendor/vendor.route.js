// Importing the 'express' module to create route handlers
import express from "express";

// Importing the 'VendorController' class from the './vendor.controller.js' file
import VendorController from "./vendor.controller.js";

// Creating a new router instance using the Router() function from Express
export const vendorRouter = express.Router();

// Creating a new instance of the 'VendorController' class
const vendorController = new VendorController();

// Route for vendor signup, calls the 'signup' method from the 'VendorController'
vendorRouter.post("/signup", vendorController.signup);

// Route for vendor signin, calls the 'signin' method from the 'VendorController'
vendorRouter.post("/signin", vendorController.signin);

// Route for sending OTP (One-Time Password) for vendor, calls the 'sendOtp' method from the 'VendorController'
vendorRouter.post("/sendOTP", vendorController.sendOtp);

// Route for verifying OTP (One-Time Password) for vendor, calls the 'verifyOtp' method from the 'VendorController'
vendorRouter.post("/verifyOTP", vendorController.verifyOtp);

// Route for resetting vendor's password, calls the 'resetPassword' method from the 'VendorController'
vendorRouter.post("/reset-password", vendorController.resetPassword);