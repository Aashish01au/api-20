const authSvc = require("../auth/auth.services")
const AppError = require("../exceptions/appError")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const auth = async (req,res,next)=>{
    try {

        let token = req.headers["authorization"]

        if(!token){
            next(new AppError({code:401, message:"Token does not set"}))
        }else{
            token = token.split(" ").pop()
            if(!token){
                next(new AppError({code:401, message:"Token is required!!!"}))
            }else{
                const data = jwt.verify(token,process.env.JWT_SECRET)
                
                const user = await authSvc.getSingleUserByFilter({
                    _id:data._id
                })
               if(!user){
                next(new AppError({code:401, message:"USer does not exist"}))
               }
               req.authUser = user
               next()
            }
        }
    } catch (exception) {
        console.log("auth : ",exception)
        if(exception instanceof jwt.JsonWebTokenError){
            exception.message = exception.message,
            exception.code= 401
        }
        next(exception)
    }
}

module.exports = auth