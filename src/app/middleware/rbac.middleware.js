const checkRoles = (roles)=>{
    return (req,res,next)=>{
        try {
            next()
        } catch (exception) {
            next(exception)
        }
    }
}

module.exports = checkRoles