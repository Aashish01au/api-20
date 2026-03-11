const BannerModel = require("./banner.model")

class BannerServices {
    transformBannerData = (formattedData,userId) =>{
        try {
            const user = {
                ...formattedData
            }
            formattedData.image = formattedData.image.filename
            formattedData.createdBy = userId
            return formattedData
        } catch (exception) {
            throw exception
        }
    }

    store = async (data) =>{
        try {
            const user = await new  BannerModel(data) 
            return user.save()
        } catch (exception) {
            throw exception
        }
    }
}

const bannerSvc = new BannerServices()
module.exports = bannerSvc