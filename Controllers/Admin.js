
const Admins = require("../Models/AdminTable.js");


    
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
