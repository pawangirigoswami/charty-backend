const jwt = require("jsonwebtoken")
require("dotenv").config()


const authMiddleware = (req,res,next) =>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.json({
            status:401,
            success:false,
            message:"Access denied. no token provided"
        })
    }
    try{

        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = decoded
        next()

    }catch(err){
          res.json({
            status:500,
            success:false,
            message:"invalid token"
          })
    }
}

module.exports = authMiddleware