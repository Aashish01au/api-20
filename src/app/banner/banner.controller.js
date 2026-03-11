const bannerSvc = require("./banner.services")

class BannerController{
    index = (req,res,next)=>{
        try {
            
        } catch (exception) {
            console.log("IndexFunction :",exception)
            next(exception)
        }
    }

    create = async (req,res,next)=>{
        try {
            const formatedData = await bannerSvc.transformBannerData(req.body,req.authUser._id)
            const response = await bannerSvc.store(formatedData)
            res.json({
                result:response,
                message:"Banner Created Successfully",
                meta:null
            })
        } catch (exception) {
            console.log("createFunction :",exception)
            next(exception)
        }
    }

    update = (req,res,next)=>{
        try {
            
        } catch (exception) {
            console.log("updateFunction :",exception)
            next(exception)
        }
    }

    delete = (req,res,next)=>{
        try {
            
        } catch (exception) {
            console.log("deleteFunction :",exception)
            next(exception)
        }
    }

    homeList = (req,res,next)=>{
        try {
            
        } catch (exception) {
            console.log("homeListFunction :",exception)
            next(exception)
        }
    }
    
    getBanner = (req,res,next)=>{
        try {
            
        } catch (exception) {
            console.log("getBannerFunction :",exception)
            next(exception)
        }
    }
}


const bannerCtrl = new BannerController()
module.exports = bannerCtrl