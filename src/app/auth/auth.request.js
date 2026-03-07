const Joi = require("joi")
const registerSchema = Joi.object({
 name:Joi.string().min(3).required(),
 email:Joi.string().email().required(),
 role:Joi.string().regex(/^(admin|seller|customer)$/)
})
const verifyOtpSchema= Joi.object({
    email:Joi.string().email().required(),
    otp:Joi.string().required()
})

module.exports = {
    registerSchema,
    verifyOtpSchema
}