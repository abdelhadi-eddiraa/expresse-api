var mongoose =require('mongoose')
const Schema=mongoose.Schema

var CustomerSchema=new Schema({
    username:String,
    password:String,
    email:String,
    token:String,
    CraetedAT:{
        type:Date,
        default:Date.now
    }
})


module.exports=mongoose.model('Customer',CustomerSchema)