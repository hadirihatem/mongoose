const mongoose=require('mongoose')



const userSchema= new mongoose.Schema({
    name:String,
   age:Number ,
   favoriteFoods: [String]



})
module.exports=mongoose.model('user',userSchema)