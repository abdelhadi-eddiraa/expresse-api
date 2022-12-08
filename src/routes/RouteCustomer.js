var {NewCustomer,AllCustomer}=require('../controllers/CustomerController.js')
var express=require('express')
var router=express.Router()


router.route('/').get(AllCustomer).post(NewCustomer)

module.exports=router;