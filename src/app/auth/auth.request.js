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
const resendOtpSchema= Joi.object({
    email:Joi.string().email().required()
})
const passwordSchema = Joi.object({
    password:Joi.string().min(8).required(),
    confirmPassword:Joi.string().valid(Joi.ref("password")).messages({'any.only':"Password does not mactch"}).required()
})
const loginUserSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})
const addressSchema = Joi.object({
    stName:Joi.string(),
    lat:Joi.number(),
    long:Joi.number(),
    wardNo:Joi.number(),
    ruralNo:Joi.string(),
    district:Joi.string(),
    state:Joi.string()
})
const updateuserSchema = Joi.object({
    name:Joi.string().min(3),
    role:Joi.string().regex(/^(admin|seller|customer)$/),
    status:Joi.string().pattern(/^(active|inactive)$/).default("inactive"),
    profile:Joi.string(),
    address:Joi.object({
        shipping:addressSchema.default(null),
        billing:addressSchema.default(null)
    }),
   })

module.exports = {
    registerSchema,
    verifyOtpSchema,
    passwordSchema,
    resendOtpSchema,
    loginUserSchema,
    updateuserSchema
}