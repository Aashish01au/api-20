const AppError = require("../exceptions/appError")
const mailSvc = require("../services/mail.services")
const UserModel = require("../user/user.model")
const { randomString } = require("../utilities/helpers")
class AuthServices {
    transformRegisterData = (payload,file=null)=>{
        try {
            const user = payload
            if(file){
                user.profile = file.filename
            }
            user.otp = randomString(6)
            user.status="inactive"
            const  timeAfterTwohours = new Date(Date.now()+(60*2*60*1000))
            user.expiryTime = timeAfterTwohours

            return user
        } catch (exception) {
            throw exception
        }
    }
    transformUpdatedUSerData = (payload, file=null)=>{
        try {
            const user = payload
            if(file){
                user.profile = file.filename
            }
            return user
        } catch (exception) {
            throw exception
        }
    }
    store = async (data)=>{
        try {
            const user = new UserModel(data)
            return await user.save()
        } catch (exception) {
            if(+exception.code==11000){
               throw new AppError({message:"Email should be unique", code:400})
            }
            throw exception
        }
    }
    sendRegistrationEmail = async (name,email,otp,expiryToken)=>{
        try {
                const response =  await mailSvc.sendEmail(email,"USer Regiter",`
            <h1>Dear ${name}</h1> <br>
            <h1>authToken :  ${otp}</h1> <br>
            <h1>expiryToken :  ${expiryToken}</h1> <br>
            <h1>Thanking you</h1> <br>
            `)
            return response
        } catch (exception) {
            throw exception
        }
    }
    resendOtpMail = async (to,name,otp)=>{
        try {
            const response = await mailSvc.sendEmail(to,"USer Regiter",`
            <h1>Dear ${name}</h1> <br>
            <h1>your resend otp token  :  ${otp}</h1> <br>
            <h1>your token will be expird in 2 hrs</h1> <br>
            <h1>Thanking you</h1> <br>
            `)
            return response
        } catch (exception) {
         throw exception   
        }
    }
    verifyOtp = async ({email,otp})=>{
        try {
            const user = await UserModel.findOne({
                email:email,
                otp:otp
            })
            return user
        } catch (exception) {
            throw exception
        }
    }
    updateUser = async (id,data)=>{
        try {
        const user = await UserModel.findByIdAndUpdate(id,{
            $set:data
        })
        return user
        } catch (exception) {
            throw exception
        }
    }
    getSingleUserByFilter = async (filter)=>{
        try {
            const user = await UserModel.findOne(filter)
            return user
        } catch (exception) {
            throw exception
        }
    }
}

const authSvc = new  AuthServices()
module.exports = authSvc