const nodemailer = require("nodemailer")
require("dotenv").config()
class MailServices {
    transporter
    constructor(){
        try {
            this.transporter= nodemailer.createTransport({
                host:process.env.SMTP_HOST,
                port:process.env.SMTP_PORT,
                auth:{
                    user:process.env.SMTP_USER,
                    pass:process.env.SMTP_PSS
                }
            })
        } catch (exception) {
            throw{code:500, message:"Error  Connecting SMTP Server!!!"}
        }
    }

    sendEmail = async (to,sub,message)=>{
        try {
          const response =  await this.transporter.sendMail({
            from : process.env.SMTP_FROM_ADDR,
            to: to,
            subject: sub,
            text: message, // Plain-text version of the message
            html: message, // HTML version of the message
            })
            return response
        } catch (exception) {
            throw {code:500,message:"Error Sending Mail..."}
        }
    }
}
const mailSvc = new MailServices()
module.exports = mailSvc