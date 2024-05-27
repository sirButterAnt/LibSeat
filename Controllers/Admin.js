
const Admins = require("../Models/AdminTable.js");


    
exports.getAdmin = async (msg) => {
    try{
        const admin = await Admins.findOne({where : { mail : msg.mail}});
        console.log("admin is found");
        return admin;
    }catch{
        console.error('Error getting admin', error);
        throw error;
    }  
}

exports.setAdmin = async (msg) => {
    try{
        const admin = await Admins.findOne({where : { mail : msg.mail}});
        await admin.update(msg);
        console.log("admin is found");
        return admin;
    }catch{
        console.error('Error getting admin', error);
        throw error;
    }  
}

exports.registerAdmin = async (msg) => {
    try{
        newAdming = await Admins.create({msg});
        console.log("admin is created");
        return newAdmin;
    }catch{
        console.error('Error creating admin', error);
        throw error;
    }  
}



exports.deleteAdmin = async (msg) => {
    try{
        const admin = await Admins.destroy({where : { mail : msg.mail}});
        console.log("admin is created");
        return admin;
    }catch{
        console.error('Error creating admin', error);
        throw error;
    }  
}
