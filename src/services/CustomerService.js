var Customer=require('../models/Customer.js')
getAllCustomer=async()=>{
    return  await Customer.find()
}


getSignalCustomer=async(id)=>{
    return await Customer.findById(id)
}

CreateCustomer=async(customer)=>{
    return await Customer.create(customer)
}


UpdateCustomer=async(id,customer)=>{
    return await Customer.findByIdAndUpdate(id,customer)
}


DeleteCustomer=async(id)=>{
    return await Customer.findByIdAndDelete(id)
}


module.exports={
    getAllCustomer,getSignalCustomer,CreateCustomer,UpdateCustomer,DeleteCustomer
}