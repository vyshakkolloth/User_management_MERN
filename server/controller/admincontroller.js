const userModel = require('../model/usermodel')
const bcrypt = require('bcrypt')
const auth = require('../Middleware/auth')


const login = async (req, res) => {


    console.log('details')
    try {
        const admindetails = req.body
        const finddetails = await userModel.findOne({ email: admindetails.Email })
        console.log(finddetails)
        if (finddetails.isadmin == 'true') {


            const matchpasswd = await bcrypt.compare(admindetails.password, finddetails.password)

            if (matchpasswd == true) {
                const token = auth.generatetoken(finddetails)

                res.json({ status: true, user: token, username: finddetails.firstname })
            }


            else {
                res.json({ status: false, error: 'password' })
            }

        } else {
            res.json({ status: false, error: 'Email' })
        }



    }
    catch (err) {
        console.log(err)
    }
}


const home = async (req,res)=>{
    console.log(123456);
    try{
        const admindetails = await userModel.find({isadmin:'false'})
        console.log(admindetails)
        res.json(admindetails)

    }
    catch(err){
        console.log(err)
    }
}


const deleteuser  = async (req,res)=>{
    try{
        const id = req.query.id
        const deleteuser = await userModel.deleteOne({_id:id})
        res.json({success:true})
    }
    catch(err){
        console.log(err)
    }
}


const createprofile = async(req,res)=>{
    try{
        console.log(req.body)
        const user = await userModel.find({email:req.body.email})
        if(user.length==0){
            userModel.create({firstname:req.body.username,
                secondname:req.body.username,
                email:req.body.email,
                image:req.body.picture})

            res.json({success:true})
        }else{
            res.json({error:'Email is already exist'})
        }
    }
    catch(err){
        console.log(err)
    }
}


const editprofile = async (req,res)=>{
    try{
        console.log('haiii')
        const id = req.query.id
        console.log(id)

        const updateprofile = await userModel.findOne({_id:id})
        res.json({userdata:updateprofile})
    }
    catch(err){
        console.log(err)
    }
}

const updateprofile = async(req,res,next)=>{

    console.log('updateprofile')
    const profiledetails = req.body
    const id = req.query.id
    console.log(profiledetails)


    try{

        console.log('updateprofile try')

        const updatedata = await userModel.updateOne({_id:id},{$set:{
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



module.exports = { login,
    home,
    deleteuser,
    createprofile,
    editprofile,
    updateprofile
 }