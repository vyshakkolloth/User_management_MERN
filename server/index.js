const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./model/usermodel')
const userRoute = require('./Routes/userroutes')
const adminRoute = require('./Routes/adminroute')

app.use(cors())
app.use(express.json())


app.use('/admin',adminRoute)
app.use('/',userRoute)


mongoose.connect('mongodb://127.0.0.1:27017/react')




app.listen(3000,()=>{
    console.log('server started')
})