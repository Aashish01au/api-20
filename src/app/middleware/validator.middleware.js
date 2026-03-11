const ValidationFailure = require("../exceptions/validationFailure")

const bodyValidator = (schema,imageFieldName=null) =>{
    return async (req,res,next)=>{
        try {
            const data = req.body
            console.log(data)
            if(imageFieldName){
              if(req.file){
                data.imageFieldName =req.file
              }else if(req.files){
                data.imageFieldName =req.files 
              }
            }
          await  schema.validateAsync(data)
          next()
        } catch (exception) {
          console.log("hii",exception)
           const errorBag = {}
           exception.details.map((error)=>{
            errorBag[error.context.label] = error.message
           })
           next(new ValidationFailure(data=errorBag))
        }
    }
}

module.exports = bodyValidator