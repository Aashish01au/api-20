class ValidationFailure extends Error{
    constructor(data=null){
        super()
        this.data = data,
        this.message = "Validation Failure",
        this.code = 400
    }
}

module.exports = ValidationFailure