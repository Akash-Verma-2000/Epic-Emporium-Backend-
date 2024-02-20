// Importing the 'CustomerModel' class from the './customer.schema.js' file
import { CustomerModel } from "./customer.schema.js"

// Exporting a class named 'CustomerRepository'
export default class CustomerRepository {

    // Method for registering a new customer
    async signup(customerObj) {
        try {
            // Check if a customer with the provided email already exists
            const isCustomerPresent = await CustomerModel.findOne({ email: customerObj.email });

            // If a customer with the email exists, return a message indicating the email is already registered
            if (isCustomerPresent) {
                return { message: "Email Already Exists", name: isCustomerPresent.name };
            } else {
                // If the email is not registered, create a new customer document and save it to the database
                const newCustomer = new CustomerModel(customerObj);
                await newCustomer.save();
                // Return a message indicating successful customer registration
                return { message: "Customer Registration Completed", name: customerObj.name };
            }

        } catch (err) {
            // If an error occurs during the signup process, throw the error
            throw err;
        }
    }

    // Method for sending OTP (One-Time Password) to a customer
    async sendOtp(customerEmail) {
        try {
            // Find and return the customer document based on the provided email
            return await CustomerModel.findOne({ email: customerEmail });
        } catch (err) {
            // If an error occurs during the OTP sending process, throw the error
            throw err;
        }
    }

    // Method for customer signin
    async signin(customerObj) {
        try {
            // Check if a customer with the provided email and password exists
            const isCustomerValid = await CustomerModel.findOne({ email: customerObj.email, password: customerObj.password });

            // If a customer with the provided email and password exists, return a message indicating valid customer
            if (isCustomerValid) {
                return { message: "Valid Customer", name: isCustomerValid.name, email: isCustomerValid.email, customerID: isCustomerValid._id };
            } else {
                // If no customer with the provided credentials is found, return a message indicating invalid customer
                return { message: "Invalid Customer" };
            }
        } catch (err) {
            // If an error occurs during the signin process, catch and handle the error
        }
    }

    // Method for resetting a customer's password
    async resetPassword(newPassword, customerEmail) {
        try {
            // Find the customer document based on the provided email
            const customer = await CustomerModel.findOne({ email: customerEmail });

            // If no customer is found with the provided email, return a message indicating customer not found
            if (!customer) {
                return "Customer Not Found";
            }

            // Create an object containing the new password
            const newPasswordObj = {
                password: newPassword,
            }

            // Update the customer's password in the database with the new password
            await CustomerModel.findOneAndUpdate({ email: customerEmail }, newPasswordObj);

            // Return a message indicating successful password reset
            return "Password Reset Successfuly";
        } catch (err) {
            // If an error occurs during the password reset process, throw the error
            throw err;
        }
    }

}