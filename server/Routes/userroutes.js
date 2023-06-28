const express = require('express')
const auth = require('../Middleware/auth')
const usercontroller = require('../controller/usercontroller')
const router = express.Router()
router.post('/register',usercontroller.Register)
router.post('/login',usercontroller.Login)
router.get('/',auth.verify,usercontroller.home)
router.get('/profiledetails',auth.verify,usercontroller.profile)
router.get('/editprofile',auth.verify,usercontroller.editprofile)
router.post('/updateprofile',auth.verify,usercontroller.updateprofile)


module.exports=  router
