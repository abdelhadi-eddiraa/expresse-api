var {getAllCustomer,CreateCustomer}=require('../services/CustomerService.js')


const NewCustomer=async(req,res)=>{
    try{
       let customer= await CreateCustomer(req.body) 
       res.status(200).json({data:customer})
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

const AllCustomer=async(req,res)=>{
    try{
       let customers= await getAllCustomer() 
       res.status(200).json({data:customers})
    }catch(err){
        res.status(400).json({message:err.message})
    }
};

module.exports={
    NewCustomer,AllCustomer
}