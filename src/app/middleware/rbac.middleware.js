const ValidationFailure = require("../exceptions/validationFailure")

const permissionCheck = (roles)=>{
    return (req,res,next)=>{
        try {
            const user = req.authUser
            if(
                (typeof roles ==="string" && user.role ===roles)
                ||
                (Array.isArray(roles) && roles.includes ==user.role ) 
                ){
                    next()
                }else{
                    next(new ValidationFailure())
                }        
        } catch (exception) {
            next(exception)
        }
    }
}

module.exports = permissionCheck