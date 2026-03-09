const ValidationFailure = require("../exceptions/validationFailure")

const bodyValidator = (schema) =>{
    return async (req,res,next)=>{
        try {
            const data = req.body
          await  schema.validateAsync(data)
          next()
        } catch (exception) {
          console.log(exception)
           const errorBag = {}
           exception.details.map((error)=>{
            errorBag[error.context.label] = error.message
           })
           next(new ValidationFailure(data=errorBag))
        }
    }
}

module.exports = bodyValidator