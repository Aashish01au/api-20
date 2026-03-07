const express = require("express")
const routes = require("../routes")
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
require("./mongodb.config")
app.use("/",routes)
app.use((req,res,next)=>{
    next({code:404, message:"Page not Found"})
})
app.use((error,req,res,next)=>{
    console.log("Error : ",error)
    const statusCode = error.code ?? 500
    const message = error.message ?? "Internal Server Error"
    const data = error.data  ?? null

    res.status(statusCode).json({
        result:data,
        message :message,
        meta :null
    })
})

module.exports = app