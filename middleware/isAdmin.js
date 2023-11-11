import jwt from "jsonwebtoken";

function isAdmin(req, res, next) {
    const accessToken = req.cookies["token"];
    var validToken
    if (accessToken == null) {
        res.json("user not an admin")
    }
    else {
        try {
            validToken = jwt.verify(accessToken, process.env.TOKEN_KEY); 
            if (validToken) {
                if(validToken.email==process.env.ADMIN_EMAIL){
                    req.user=validToken
                    req.authenticated = true
                    req.isAdmin = true;
                }
    
                next();
            }
        } catch (error) {
            res.json("Error: " + error)
        }
    }
    return validToken
}

export {isAdmin}