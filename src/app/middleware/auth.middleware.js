const auth = (req,res,next)=>{
    try {
        next()
    } catch (exception) {
        next(exception)
    }
}

module.exports = auth