// Importing necessary modules and classes
import jwt from "jsonwebtoken"; // Module for working with JWT tokens
import CustomerRepository from "./customer.repository.js";  // Importing CustomerRepository class for interacting with customer data
import OtpEmail from "../../../configurations/email.config.js";  // Importing OtpEmail class for sending OTP emails

// Creating instances of CustomerRepository and OtpEmail classes
const customerRepository = new CustomerRepository();
const otpEmail = new OtpEmail();

let otp; // Variable to store OTP
let verify; // Variable to store verification status
let customerEmail; // Variable to store customer email

export default class CustomerController {

    // Method for handling customer signup
    async signup(req, res) {
        try {
            // Calling the 'signup' method from CustomerRepository to register a new customer
            const result = await customerRepository.signup(req.body);

            // If customer registration is successful, return a success message
            if (result.message === "Customer Registration Completed") {
                return res.status(201).json({ message: `Welcome to our family ${req.body.name}` });
            }

            // If the email is already registered, return a conflict message
            if (result.message === "Email Already Exists") {
                return res.status(409).json({ message: `Hello ${result.name} you alredy registered` });
            }
        } catch (err) {
            // If an error occurs during customer signup, return a server error message
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }

    // Method for handling customer signin
    async signin(req, res) {
        try {
            // Calling the 'signin' method from CustomerRepository to authenticate a customer
            const validCustomer = await customerRepository.signin(req.body);

            // If customer authentication is successful, generate a JWT token and return it
            if (validCustomer.message === "Valid Customer") {
                const token = jwt.sign({ userID: validCustomer.customerID, email: validCustomer.email, name: validCustomer.name }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
                return res.status(200).json({ message: "You are logged in HAPPY SHOPPING", token: token });
            }

            // If customer authentication fails, return a bad request message
            if (validCustomer.message === "Invalid Customer") {
                return res.status(400).json({ message: "Wrong Credentials" });
            }
        } catch (err) {
            // If an error occurs during customer signin, return a server error message
            return res.status(500).json({ message: "Oop! something went wrong, please try again after refresh." });
        }
    }

    // Method for sending OTP to customer
    async sendOtp(req, res) {
        try {
            // Extracting customer email from the request body
            customerEmail = req.body.email;

            // Checking if the customer is registered
            const isCustomerPresent = await customerRepository.sendOtp(customerEmail);

            if (isCustomerPresent) {

                // Generating OTP
                otp = Math.floor(100000 + Math.random() * 900000);

                // Sending OTP via email
                await otpEmail.sendOtp(customerEmail, otp);

                // Returning success message
                return res.status(200).json({ message: `An OTP Has Been Sent To ${customerEmail}\nWait For Atleast 2 Mins Before Retrying` });
            } else {
                // Returning a not found message if customer is not registered
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

    // Method for resetting customer's password
    async resetPassword(req, res) {
        try {
            // Extracting new password from request body
            const newPassword = req.body.newPassword;

            // Checking if OTP is verified
            if (verify) {
                // Calling the 'resetPassword' method from CustomerRepository to reset customer password
                const result = await customerRepository.resetPassword(newPassword, customerEmail);

                // If customer is not found, return a not found message
                if (result == "Customer Not Found") {
                    return res.status(404).json({ message: "Please check the email and try again." });
                }

                // Resetting variables and returning success message if password reset is successful
                otp = null;
                verify = null;
                customerEmail = null;
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