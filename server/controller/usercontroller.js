const userModel = require('../model/usermodel')
const bcrypt = require('bcrypt')
const auth = require('../Middleware/auth')
const Register = async (req, res, next) => {


    try {

        let userdetails = req.body
        console.log(req.body)
        const user = await userModel.find({ email: userdetails.email })
        if (user.length == 0) {
            passbycrpt = await bcrypt.hash(userdetails.password, 10)
            userModel.create({
                firstname: userdetails.firstname,
                secondname: userdetails.secondname,
                email: userdetails.email,
                password: passbycrpt,

            })

            res.json({ status: true, result: userdetails })

        }
        else {
            return res.json({ error: 'Email is already exist' })
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }


}


const Login = async (req, res, next) => {

    try {

        let logindetails = req.body
        const finduser = await userModel.findOne({ email: logindetails.Email })
        if (finduser) {
            const matchpasswd = await bcrypt.compare(logindetails.password, finduser.password)
            if (matchpasswd == true) {
                const token = auth.generatetoken(finduser)

                res.json({ status: true, user: token,username:finduser.firstname })


            }

            else {
                res.json({ status: false, error: 'password' })
            }
        } else {
            res.json({ status: false, error: 'email' })
        }

    }
    catch (err) {
        console.log(err)
    }

}




const home = async(req,res,next)=>{
    const userdata = await userModel.findOne({email:req.user.email})
    res.json({success:true,userData:userdata})
}



const profile = async(req,res,next)=>{

    const userdata = req.user.email
    try{
        const getdetails = await userModel.findOne({email:userdata})
        res.json({userData:getdetails,success:true})
    }
    catch(err){
        console.log(err)
    }
}




const editprofile = async (req,res,next)=>{

    try{
        const editprofile = await userModel.findOne({email:req.user.email})
        res.json({userdata:editprofile,success:true})
    }
    catch(err){
        console.log(err)
    }

}


const updateprofile = async(req,res,next)=>{

    console.log('updateprofile')
    const profiledetails = req.body
    const email = req.user.email
    console.log(profiledetails)


    try{

        console.log('updateprofile try')

        const updatedata = await userModel.updateOne({email:email},{$set:{
            firstname:profiledetails.username,
            email:profiledetails.email,
            image:profiledetails.picture
        }})

        res.json({success:true,message:'Profile update Successfully'})



    }
    catch(err){
        console.log(err.message)
        res.json({success:true,message:'Something went wrong'})
    }
}










module.exports = { Register, Login,editprofile,updateprofile,profile,home}