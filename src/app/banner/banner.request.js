const Joi = require("joi");

const createBannerSchema = Joi.object({
    title:Joi.string().min(3).required(),
    link:Joi.string().uri().empty(null,""),
    image:Joi.object().required(),
    status:Joi.string().pattern(/^(active|inactive)$/).default("inactive").required()
})


module.exports = {
    createBannerSchema
}