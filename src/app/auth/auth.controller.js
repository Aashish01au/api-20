const AppError = require("../exceptions/appError")
const mailSvc = require("../services/mail.services")
const { randomString } = require("../utilities/helpers")
const authSvc = require("./auth.services")

class AuthController {
    register = async (req,res,next)=>{
        try {
            const data =  await authSvc.transformRegisterData(req.body,req.file)
            const user = await authSvc.store(data)
          if(user){
          //  await authSvc.sendRegistrationEmail(user.name,user.email,user.otp,user.expiryTime)
            res.json({
                result:user,
                message :"User register Successfully!!!",
                meta :null
            })
          }else{
            next(new AppError({message:"Regiseration Faield ",code:400}))
          }
        } catch (exception) {
            console.log("RegisterUser : ",exception)
            next(exception)
        }
    }
    verifyOTP = async (req,res,next)=>{
        try {
            const {email,otp}= req.body
            const userDetails = await authSvc.verifyOtp({
                email:email,
                otp:otp
            })
            if(!userDetails){
                next(new AppError({message:"Toeken is expired!!!", code:400}))
            }else{
                const now = Date.now() 
                const expiryTime = userDetails.expiryTime.getTime()
                if(expiryTime<now){
                    next(new AppError({code:400, message:"Token is expired!!!"}))
                }else{
                    const token = randomString(100)
                    const response = await authSvc.updateUser(userDetails._id,{
                        authToken : token,
                        expiryTime: new Date(Date.now()+(60*2*60*1000)),
                        otp:null
                    })

                    res.json({
                        result:token,
                        message:"OTP Verified Success..",
                        meta:null
                    })
                }
            }
            
        } catch (exception) {
            console.log("VerifyOTP : ",exception)
            next(exception)
        }
    }
}
const authCtrl =new AuthController()
module.exports = authCtrl