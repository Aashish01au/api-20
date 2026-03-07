const UserModel = require("../user/user.model")
const { randomString } = require("../utilities/helpers")
class AuthServices {

    transformRegisterData = (payload,file=null)=>{
        try {
            const user = payload
            if(file){
                user.profile = file.filename
            }
            user.otp = randomString(8)
            user.status="inactive"
            const  timeAfterTwohours = new Date(Date.now()+(60*2*60*1000))
            console.log(timeAfterTwohours)
            user.expiryTime = timeAfterTwohours

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
            throw exception
        }
    }
}

const authSvc = new  AuthServices()
module.exports = authSvc