
const Admins = require("../Models/AdminTable.js");


    
exports.getAdmin = async (req, res) => {
    try{
        const msg = req.body;
        const admin = await Admins.findOne({where : { mail : msg.mail}});
        if( !admin){
            console.error('No admin found');
            res.status(400).json({messge : "No admin found"});
        }else{
            console.log("admin is found");
            res.status(200).json(admin);
        } 
    }catch{
        console.error('Error getting admin');
        res.status(400).json({messge : 'Error getting admin'});
    }  
}

exports.setAdmin = async (req,res) => {
    try{
        const msg = req.body;
        const admin = await Admins.findOne({where : { mail : msg.mail}});
        await admin.update(msg);
        console.log("admin is found");
        res.status(200).json({message: "admin information is updated"})
    }catch{
        console.error('Error getting admin');
        res.status(400).json({messge : 'Error setting admin'});
    }  
}

exports.registerAdmin = async (req,res) => {
    try{
        const msg = req.body;
        newAdming = await Admins.create({mail :msg.mail, phoneNumber : msg.phoneNumber, password : msg.password});
        console.log("admin is created");
        res.status(200).json({message: "admin registered"})
    }catch{
        console.error('Error creating admin');
        res.status(400).json({messge : 'Error creating admin'});
    }  
}



exports.deleteAdmin = async (req, res) => {
    try{
        const msg = req.body;
        const admin = await Admins.findOne({where : { mail : msg.mail}});
        if( !admin){
            console.error('Error no admin found');
            res.status(400).json({messge : 'Error no admin found'});
        }else{
            await Admins.destroy({where : { mail : msg.mail}});
            res.status(200).json({message: "admin is deteled"})
            console.log("admin is deleted");
        }
        
    }catch{
        console.error('Error creating admin');
        res.status(400).json({messge : 'Error creating admin'});
    }  
}
