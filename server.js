const express= require('express')
const app=express()
const mongoose=require('mongoose')
require ('dotenv').config();
const user=require ('./modeles/user')



const url=process.env.brahim
mongoose.connect(url,
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    },
    (err)=>{ 
    if (err) throw err ;
    console.log("db connected");
});
app.use(express.json());


app.listen(5000 ,()=>{

    console.log('connected....' )
}
)
app.post("/users",(req,res)=>{
    const {name,age,favoriteFoods}=req.body
    const newuser=new user ({
        name ,
        age, 
        favoriteFoods,

    });
    newuser
    .save()
    .then((data)=>res.status(200).json(data))
    .catch((err)=>res.status(400).json(err));
});

//find search for user
user.find((err,data)=>{
    if (err) throw err ;
    console.log(data)
})

//find one user
user.findOne({favoriteFoods:{$in:['pizza']}})
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))

//find sameone by ID
user.findById('6093ec1e82d164297c1799b2')
.then((data)=>console.log(data))
.catch((err)=>console.log(err))
//find sameone by id and push other food to the arry 

 user.findOne ({name:'brahim'} ,(err,data)=>{
     if (err)
     throw err
     else {
         data.favoriteFoods.push('hamburger')
         console.log(data)
     }
 })
 //
 user.findOneAndUpdate({name:'chiraz'},{age:20},(err,data)=>{
     if (err)
     throw err 
     else {
         console.log(data)
     }
     }
    )

    //

    user.findByIdAndRemove('6093ec1e82d164297c1799b2' ,(err,data)=>{
        if (err)
        throw err
        else {
            console.log(data)
        }
    })
//

user.findOneAndRemove({name:'marry'} , (err,data)=>{
    if (err)
    throw err 
    else {
        console.log(data)
    }
})


// chain search Query 

 user.find({favoriteFoods:{$all:['burrits']}})
.select('-age')
.limit(2)
.sort({name:'asc'})
.exec((error,data)=>{
    if (error){
        console.log(data)
    }
}) 