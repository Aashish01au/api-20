class AppError extends Error{
    constructor({data=null,code=null,message=null}){
        super()
        this.data = data,
        this.code = code,
        this.message = message
    }
}

module.exports = AppError