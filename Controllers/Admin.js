
const Admins = require("../Models/AdminTable.js");
const bcrypt = require('bcrypt');

const JWT = require('../utils/jwt.js');
const jwt = new JWT();



exports.login = async(req,res)=>{
    try {
        const user = await Admins.findOne({where:{mail:req.body.mail}});
        if(!user){
            return res.status(401).json({status:'fail',message:'Email or password is wrong'});
        
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);

        if(!isMatch){
            return res.status(401).json({status:'fail',message:'Email or password is wrong'})
        }
        // generate token
        const token = jwt.generateToken(user);

        // set cookies

        res.cookie('token',token,{httpOnly:true,secure:true});

        res.status(200).json({
            status:'success',
            loggedUser:user,
    
            });


        

    } catch (error) {
        
    }
}
exports.getAdmin = async (req, res) => {
    try{
        const msg = req.body;
        const admin = await Admins.findOne({where : { mail : msg.mail}});
        console.log("admin is found");
        res.status(200).json(admin);
    }catch{
        console.error('Error getting admin', error);
        res.status(400).json({messge : 'Error getting admin'});
    }  
}

exports.setAdmin = async (req,res) => {
    try{
        const msg = req.body;
        const admin = await Admins.findOne({where : { mail : msg.mail}});
        await admin.update(msg);
        console.log("admin is found");
        res.status(200).json({message: "admin is found"})
    }catch{
        console.error('Error getting admin', error);
        res.status(400).json({messge : 'Error setting admin'});
    }  
}

exports.registerAdmin = async (req,res) => {
    try{
        const msg = req.body;
        newAdming = await Admins.create({msg});
        console.log("admin is created");
        res.status(200).json({message: "admin registered"})
    }catch{
        console.error('Error creating admin', error);
        res.status(400).json({messge : 'Error creating admin'});
    }  
}



exports.deleteAdmin = async (req, res) => {
    try{
        const msg = req.body;
        const admin = await Admins.destroy({where : { mail : msg.mail}});
        console.log("admin is created");
        res.status(200).json({message: "admin is created"})
    }catch{
        console.error('Error creating admin', error);
        res.status(400).json({messge : 'Error creating admin'});
    }  
}
