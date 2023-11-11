import jwt from "jsonwebtoken";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler.js";
import { User } from "../models/Users.js";


const isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {
    const token = req.cookies.token; // Adjust the cookie name as needed
    console.log("token "+token)
    if (!token) {
        return res.status(401).json({ message: "Please login to access this route" });
    }

    try {
        const decodedData =await jwt.verify(token, "yTBtBYykM5");
        console.log(decodedData)
        if(decodedData){
            req.authenticated=true;
        }
        
        req.userData = decodedData; // Store the user data in req for later use
         // Proceed to the next middleware
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
});

export {isAuthenticatedUser}