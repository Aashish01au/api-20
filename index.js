const http = require("http")
const app = require("./src/app/config/express.config")
const server = http.createServer(app)
server.listen(9000,"localhost",((error)=>{
    if(!error){
        console.log("Server is running on port number 9000")
        console.log("Browse server at http://localhost:9000")
        console.log("Press CTRL + C to disconnect the server")
    }
}))