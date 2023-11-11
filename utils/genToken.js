import jwt from "jsonwebtoken";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler.js";
import { User } from "../models/Users.js";

function generateToken(user) {
    const token =jwt.sign({ email: user.email, id: user._id }, process.env.TOKEN_KEY, { expiresIn: 1000 * 60 * 60 * 6 });
    return token;
}

function validateToken(req, res, next) {
    const accessToken = req.cookies["token"];
    var validToken
    if (accessToken == null) {
        res.status(404).json("user not authenticated")
    }
    else {
        try {
            validToken = jwt.verify(accessToken,  process.env.TOKEN_KEY)
            
            if (validToken) {
                req.authenticated = true;
                req.user = validToken
                
                next();
            }
        } catch (error) {
            res.json("error " + error)
        }
    }
    
}
export { generateToken, validateToken };
