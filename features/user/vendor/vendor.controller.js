// Importing the necessary modules and classes

import jwt from "jsonwebtoken";
import VendorRepository from "./vendor.repository.js";
import OtpEmail from "../../../configurations/email.config.js";

// Creating instances of VendorRepository and OtpEmail classes
const vendorRepository = new VendorRepository();
const otpEmail = new OtpEmail();

let otp; // Variable to store OTP
let verify; // Variable to store verification status
let vendorEmail; // Variable to store vendor email

export default class VendorController {

    // Method for handling vendor signup
    async signup(req, res) {
        try {
            // Calling the 'signup' method from VendorRepository to register a new vendor
            const result = await vendorRepository.signup(req.body);

            // If vendor registration is successful, return a success message
            if (result.message === "Vendor Registration Completed") {
                return res.status(201).json({ message: `Welcome to our family ${req.body.name}` });
            }

            // If the email is already registered, return a conflict message
            if (result.message === "Email Already Exists") {
                return res.status(409).json({ message: `Hello ${result.name} you alredy registered` });
            }

        } catch (err) {
            // If an error occurs during vendor signup, return a server error message
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }

    // Method for handling vendor signin
    async signin(req, res) {
        try {

            // Calling the 'signin' method from VendorRepository to authenticate a vendor
            const validVendor = await vendorRepository.signin(req.body);

            // If vendor authentication is successful, generate a JWT token and return it
            if (validVendor.message === "Valid Vendor") {
                const token = jwt.sign({ userID: validVendor.vendorID, email: validVendor.email, name: validVendor.name }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
                return res.status(200).json({ message: "You are logged in HAPPY SELLING", token: token });
            }

            // If vendor authentication fails, return a bad request message
            if (validVendor.message === "Invalid Vendor") {
                return res.status(400).json({ message: "Wrong Credentials" });
            }
        } catch (err) {
            // If an error occurs during vendor signin, return a server error message
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });

        }
    }

    // Method for sending OTP to vendor
    async sendOtp(req, res) {
        try {
            // Extracting vendor email from the request body
            vendorEmail = req.body.email;

            // Checking if the vendor is registered
            const isVendorPresent = await vendorRepository.sendOtp(vendorEmail);

            if (isVendorPresent) {

                // Generating OTP
                otp = Math.floor(100000 + Math.random() * 900000);

                // Sending OTP via email
                await otpEmail.sendOtp(vendorEmail, otp);

                // Returning success message
                return res.status(200).json({ message: `An OTP Has Been Sent To ${vendorEmail} Wait For Atleast 2 Mins Before Retrying` });
            } else {
                // Returning a not found message if vendor is not registered
                return res.status(404).json({ message: `"Oops! It looks like you're not registered with us yet. To ensure security, we require registration to send OTPs to your email. Please sign up to continue.` })
            }
        } catch (err) {
            // If an error occurs during OTP sending, return a server error message
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }

    // Method for verifying OTP
    verifyOtp(req, res) {
        try {
            // Verifying if the provided OTP matches the generated OTP
            if (otp == req.body.otp) {
                verify = true;
                // Returning success message if OTP is verified
                return res.status(200).json({ message: "OTP Verifyed Successfuly" });
            } else {
                verify = false;
                // Returning bad request message if OTP does not match
                return res.status(400).json({ message: "OTP Did Not Match Please Try Again" });
            }
        } catch (err) {
            // If an error occurs during OTP verification, return a server error message
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }

    }

    // Method for resetting vendor password
    async resetPassword(req, res) {
        try {
            // Extracting new password from request body
            const newPassword = req.body.newPassword;

            // Checking if OTP is verified
            if (verify) {

                // Calling the 'resetPassword' method from VendorRepository to reset vendor password
                const result = await vendorRepository.resetPassword(newPassword, vendorEmail);

                // If vendor is not found, return a not found message
                if (result == "Vendor Not Found") {
                    return res.status(404).json({ message: "Please check the email and try again." });
                }

                // Resetting variables and returning success message if password reset is successful
                otp = null;
                verify = null;
                vendorEmail = null;
                return res.status(201).json({ message: "Password has been updated." });
            } else {
                // Returning bad request message if OTP is not verified
                return res.status(400).json({ message: "OTP did not match please try again." });
            }
        } catch (err) {
            // If an error occurs during password reset, return a server error message
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }



}