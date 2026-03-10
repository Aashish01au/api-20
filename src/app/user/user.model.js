const mongoose = require("mongoose")
const addressSchema = new mongoose.Schema({
    stName:String,
    lat:Number,
    long:Number,
    wardNo:String,
    ruralNo:String,
    district:String,
    state:String
})
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:3
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    role:{
        type:String,
        enum:["admin","seller","customer"],
        default:"customer",
        require:true,
    },
    status:{
        type:String,
        enum:["aactive","inactive"],
        default:"inactive",
        require:true,
    },
    profile:String,
    otp:String,
    authToken:String,
    forgetToken:String,
    password:String,
    expiryTime:Date,
    address:{
        shipping:addressSchema,
        billing:addressSchema
    },
    createdBy :{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null, 
        require:true  
    },
    updatededBy :{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null, 
        require:true  
    }
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
})

const UserModel = mongoose.model("User",UserSchema)

module.exports = UserModel