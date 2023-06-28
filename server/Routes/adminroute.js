const express = require('express')
const admincontroller = require('../controller/admincontroller')
const auth = require('../Middleware/auth')
const router = express.Router()
router.post('/login',admincontroller.login)
router.get('/home',auth.verify,admincontroller.home)
router.delete('/user-delete',admincontroller.deleteuser)
router.post('/createprofile',auth.verify,admincontroller.createprofile)
router.get('/editprofile',auth.verify,admincontroller.editprofile)
router.post('/updateprofile',admincontroller.updateprofile)


module.exports = router