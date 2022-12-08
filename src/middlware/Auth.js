var jwt =require('jsonwebtoken')
var {randomBytes}=require('crypto')
var secret= randomBytes(10).toString('hex')

const verifeyToken=(req,res,next)=>{
    const token=req.body.token || req.query.token || req.headers["x-access-token"];
    
    
    if(!token){
       res.status(201).end('A token is required for authentication') 
    }
    try{
        var decode=jwt.verify(token,secret )
        req.customer=decode
    }catch(err){
        res.status(404).send(err.message)
    }
    return next()
}

module.exports=verifeyToken