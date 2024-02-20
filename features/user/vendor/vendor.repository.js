// Importing the 'VendorModel' class from the './vendor.schema.js' file
import { VendorModel } from "./vendor.schema.js"


export default class VendorRepository {

    // Method for registering a new vendor
    async signup(vendorObj) {
        try {
            // Check if a vendor with the provided email already exists
            const isVendorPresent = await VendorModel.findOne({ email: vendorObj.email });

            // If a vendor with the email exists, return a message indicating the email is already registered
            if (isVendorPresent) {
                return { message: "Email Already Exists", name: isVendorPresent.name };
            } else {
                // If the email is not registered, create a new vendor document and save it to the database
                const newVendor = new VendorModel(vendorObj);
                await newVendor.save();
                // Return a message indicating successful vendor registration
                return { message: "Vendor Registration Completed", name: vendorObj.name };
            }
        } catch (err) {
            // If an error occurs during the signup process, throw the error
            throw err;
        }
    }


    // Method for vendor signin
    async signin(vendorObj) {
        try {
            // Check if a vendor with the provided email and password exists
            const isVendorValid = await VendorModel.findOne({ email: vendorObj.email, password: vendorObj.password });

            if (isVendorValid) {

                // If a vendor with the provided email and password exists, return a message indicating valid vendor
                return { message: "Valid Vendor", name: isVendorValid.name, email: isVendorValid.email, vendorID: isVendorValid._id };
            } else {
                // If no vendor with the provided credentials is found, return a message indicating invalid vendor
                return { message: "Invalid Vendor" };
            }
        } catch (err) {
            // If an error occurs during the signin process, catch and handle the error
        }
    }

    // Method for sending OTP (One-Time Password) to a vendor
    async sendOtp(vendorEmail) {
        try {
            // Find and return the vendor document based on the provided email
            return VendorModel.findOne({ email: vendorEmail });
        } catch (err) {
            // If an error occurs during the OTP sending process, throw the error
            throw err;
        }
    }

    // Method for resetting a vendor's password
    async resetPassword(newPassword, vendorEmail) {
        try {
            // Find the vendor document based on the provided email
            const vendor = await VendorModel.findOne({ email: vendorEmail });

            // If no vendor is found with the provided email, return a message indicating vendor not found
            if (!vendor) {
                return "Vendor Not Found";
            }

            // Create an object containing the new password
            const newPasswordObj = {
                password: newPassword,
            }

            // Update the vendor's password in the database with the new password
            await VendorModel.findOneAndUpdate({ email: vendorEmail }, newPasswordObj);

            // Return a message indicating successful password reset
            return "Password Reset Successfuly";
        } catch (err) {
            // If an error occurs during the password reset process, throw the error
            throw err;
        }
    }

}