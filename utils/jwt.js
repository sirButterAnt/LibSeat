var jwt = require('jsonwebtoken');
const path = "./config.env"
require('dotenv').config({path:path});


class JWT { 
    generateToken(user){
        const payload = {mail:user.mail,role:user.mail}
        return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"24h"})
    }
    verifyToken(token){
        return jwt.verify(token,process.env.SECRET_KEY)
    }

}

module.exports = JWT