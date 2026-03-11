const authRouter = require("../auth/auth.router")
const bannerRouter = require("../banner/banner.router")
const routes = require("express").Router()
routes.use("/auth",authRouter)
routes.use("/banner",bannerRouter)
module.exports = routes