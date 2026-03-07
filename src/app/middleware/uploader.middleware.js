const multer = require("multer")
const fs = require("fs")
const { randomString } = require("../utilities/helpers")
const ValidationFailure = require("../exceptions/validationFailure")
const myStorage = multer.diskStorage({
    destination :(req,file,cb)=>{
        const path = "./public/uploaders/"
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{
                recursive:true
            })
        }
        cb(null,path)
    },
    filename:(req,file,cb)=>{
        const ext = file.originalname.split(".").pop()
        const name = Date.now()+"-"+randomString(10)+"."+ext
        cb(null,name)
    }
})
const imageFilter = (req,file,cb)=>{
    const ext = file.originalname.split(".").pop()
    if(["jpeg","jpg","png","svg","webp","bmp","gif"].includes(ext.toLowerCase())){
        cb(null,true)
    }else{
        cb(new ValidationFailure({data:{image:"file Type not support"}}))
    }
}
const uploader = multer({
    storage:myStorage,
    fileFilter:imageFilter,
    limits:{
        fileSize:2*1024*1024
    }
})

module.exports = uploader