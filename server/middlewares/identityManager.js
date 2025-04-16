const jwt = require("jsonwebtoken")
const config = require("config")
const secretKey = config.get("jwtSecreteKey") 
const identityManager = (allowedRoles) => {
    return async (req,res,next) => {
        const token = req.header("token")
        if(!token){
            return res.status(400).json({
                status:400,
                message:"failure",
                error:{
                    message:"Access Denied. No token provided."
                }
            })
        }
        try {
        const decoded = jwt.verify(token,secretKey)
        req.user = decoded
        if(!allowedRoles.includes(decoded.role)){
            return res.status(400).json({
                status:400,
                message:"failure",
                error:{
                    message:"Forbidden. You don't have access to this route."
                }
            })
        }
        next();
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "Invalid Token",
              });
        }
    }
}

module.exports = identityManager