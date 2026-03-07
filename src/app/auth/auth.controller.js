const AppError = require("../exceptions/appError")
const mailSvc = require("../services/mail.services")
const authSvc = require("./auth.services")

class AuthController {
    register = async (req,res,next)=>{
        try {
            const data =  await authSvc.transformRegisterData(req.body,req.file)
            const user = await authSvc.store(data)
          if(user){
              // await mailSvc.sendEmail(data.email,"USer Regiter",`
            // <h1>Dear ${data.name}</h1> <br>
            // <h1>no reply system</h1> <br>
            // <h1>Thanking you</h1> <br>
            // `)
            console.log(user)
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
    verifyOtp = async (req,res,next)=>{
        try {
            let email = req.body.email
            
        } catch (exception) {
            console.log("verifyOtp : ",exception)
            next(exception)
        }
    }
}
const authCtrl =new AuthController()
module.exports = authCtrl