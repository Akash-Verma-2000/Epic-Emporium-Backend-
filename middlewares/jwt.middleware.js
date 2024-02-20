// Importing the 'jsonwebtoken' module for working with JWT tokens
import jwt from "jsonwebtoken";

// Exporting variables to store user information (userID, userName, userEmail)
export let loggedInUserID;
export let loggedInUserName;
export let loggedInUserEmail;

// Middleware function for JWT token authorization
export default function jwtAuthoriser(req, res, next) {

    // Extracting the JWT token from the request headers
    const token = req.headers['authorization'];

    // If the token is not present in the request headers, return a 401 Unauthorized response
    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    try {
        // Verifying the JWT token using the secret key stored in the environment variables
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Storing user information (userID, userName, userEmail) extracted from the token in request object
        req.userID = payload.userID;
        loggedInUserEmail = payload.email;
        loggedInUserID = payload.userID;
        loggedInUserName = payload.name;

    } catch (err) {
        // If an error occurs during token verification, return a 401 Unauthorized response
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    // Call the next middleware function in the stack
    next();
}