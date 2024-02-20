// Importing the mongoose library for database operations
import mongoose from "mongoose";

export async function connectToDataBase() {

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Data Base is connected");
    }
    catch {
        console.log("There is some issue in connecting data base");
    }
}



