class UnAuthorized extends Error{
    constructor(){
        super()
        this.data = null,
        this.message = "UnAuthorized",
        this.code = 401
    }
}

module.exports = UnAuthorized