const jwttoken = require('jsonwebtoken')
const generatetoken = (finduser) => {
    return jwttoken.sign({
        name: finduser.firstname,
        email: finduser.email
    },'123')
}


const verify = async (req, res, next) => {
    try {
        console.log(1234589);
        const token = req.header('Authorization')
        if (token) {
            const verfyed = jwttoken.verify(token,'123')
            req.user = verfyed
            console.log(456);
            next()
        } else {
            res.json({ success: false })
        }
    } catch (err) {
        res.json({ success: false })
    }
}


module.exports = { generatetoken,verify }