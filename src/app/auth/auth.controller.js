const AppError = require("../exceptions/appError")
const mailSvc = require("../services/mail.services")
const { randomString } = require("../utilities/helpers")
const bcrypt = require("bcryptjs")
const authSvc = require("./auth.services")
const jwt = require("jsonwebtoken")
require("dotenv").config()
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
                next(new AppError({message:"otp is expired!!!", code:400}))
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
    resendOTP = async (req,res,next)=>{
        try {
            const email = req.body.email
            const user = await authSvc.getSingleUserByFilter({
                email:email
            })

            if(!user){
                next(new AppError({message:"User Does not exist", code:400}))
            }else{
               if(user.status ==="active"){
                next(new AppError({message:"USer is alredy activated",code:400}))
               }else{
                const updateData = {
                    otp : randomString(6),
                    expiryTime : new Date(Date.now()+(60*2*60*1000))
                }
                const response = await authSvc.updateUser(user._id,updateData)
              //  await authSvc.resendOtpMail(user.email,user.name,updateData.otp)
                res.json({
                    result:updateData,
                    message:"Ur resend otp send success.. check ur email",
                    meta:null
                })
               }
            }
        } catch (exception) {
            console.log("ResendOTP : ",exception)
            next(exception)
        }
    }
    activatePassword = async(req,res,next)=>{
        try {
            const token = req.params.token
            const user = await authSvc.getSingleUserByFilter({
                authToken:token
            })
            
            if(!user){
                next(new AppError({message:"AuthToken does not exist", code:404}))
            }else{
                const password = bcrypt.hashSync(req.body.password,10)
                const response = await authSvc.updateUser(user._id,{
                    password:password,
                    authToken:null,
                    otp:null,
                    expiryTime:null,
                    status:"active"
                })
                res.json({
                    result:response,
                    message:'User Activated Successfully',
                    meta:null
                })
            }
        } catch (exception) {
            console.log("ActtivatePassword : ",exception)
            next(exception)
        }
    }
    loginUser = async (req,res,next)=>{
        try {
            const data = req.body
            const user = await authSvc.getSingleUserByFilter({
                email:data.email
            }) 
            if(!user){
                next(new AppError({code:400, message:"User Does not Exist"}))
            }else{
                const verify = bcrypt.compareSync(data.password,user.password)
                if(verify){
                   if(user.status ==="active"){
                    const payload  = {_id:user._id}
                    const token = jwt.sign(payload,process.env.JWT_SECRET,{
                        expiresIn:Date.now()+7200000
                    })
                    const refreshToken = jwt.sign(payload,process.env.JWT_SECRET,{
                        expiresIn:"1 day"
                    }) 

                    res.json({
                        result:{
                            token:token,
                            type:"Bearer",
                            refreshToken:refreshToken
                        },
                        message:"Login Success",
                        meta :null
                    })
                   }else{
                    next(new AppError({code:401, message:"ur account is not activetd or suspended , plz contact admin"}))
                   }
                }else{
                    next({code:400, message:"Creedentials does not match"})
                }
            }
        } catch (exception) {
            console.log("LoginUser : ",exception)
            next(exception)
        }
    }
    profile = async ( req,res,next)=>{
        try {
            const user = req.authUser
            res.json({
                result:{
                    _id:user._id,
                    name:user.name,
                    email:user.emil,
                    role:user.role,
                    status:user.status
                },
                message:'user Profile',
                meta :null
            })
        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }
    updateuser = async (req,res,next)=>{
        try {
        const payload = req.body
        const file = req.file
            const formatedData = await authSvc.transformUpdatedUSerData(payload,file )
            const updatedData = await authSvc.updateUser(req.params.id,formatedData)
        res.json({
            result:updatedData,
            message:"User Updated Successfully",
            meta:null
        })
        } catch (exception) {
            console.log("UpdateUser : ",exception)
            next(exception)
        }
    }
}
const authCtrl =new AuthController()
module.exports = authCtrl