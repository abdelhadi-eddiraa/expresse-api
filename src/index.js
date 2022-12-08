// init project
var express = require("express");
var jwt =require('jsonwebtoken')
var bodyParser = require("body-parser");
var mongoose= require('mongoose')
var RouteCustomer=require('../src/routes/RouteCustomer.js')
var Customer = require('../src/models/Customer.js')
var bycrybt=require('bcryptjs')
var {randomBytes}=require('crypto')
var secret= randomBytes(10).toString('hex')
var Auth= require('../src/middlware/Auth.js')

var url='mongodb+srv://nour:Nour2007@cluster0.amti3o4.mongodb.net/TestApi'

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/customer',RouteCustomer)

app.get('/welcom',Auth,(req,res)=>{
  res.send('hello world')
})
const connect=async()=>{
  try{
    await mongoose.connect(url)
    console.log('database connected')
  }catch(err){
    console.log(err)
  }
}
connect()


app.post('/regester',async(req,res)=>{
  try{
     var {email,password,username,CraetedAT}=req.body
   
   if(!(email && password)){
      res.status(201).json({message:'("All input is required")'})
   }
   
   var oldUser=await Customer.findOne({email})
   if(oldUser){
           res.status(201).json({message:'("user already in the database plaes login")'})

   }
   var hashpassword= await bycrybt.hash(password,10)
   
   var customer= await Customer.create({
      username,
      email,
      password:hashpassword
   })
   
   var token=jwt.sign({ customer_id: customer._id },secret,{expiresIn: "2h",})
      customer.token=token
     token.save()
   
   
       res.status(201).json(customer);

  }catch(err){
        console.log(err);

  }
  
})


app.post("/login",async (req, res) => {
    try {
        // Get user input
        var { username, password } = req.body;
    
        // Validate user input
        if (!(username && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        var customer = await Customer.findOne({ username });
    
        if (customer && (await bycrybt.compare(password, customer.password))) {
          // Create token
          var token = jwt.sign(
            { customer_id: customer._id},
            secret,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          customer.token = token;
    
          // user
          res.status(200).json(customer);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
      // Our register logic ends here
 });
// Listen on port 8080
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
