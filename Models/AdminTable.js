const { DataTypes} = require('sequelize');
const sequelize = require('../db');



const Admin = sequelize.define('Admin',{
    

    mail:{
        primaryKey:true,
        type:DataTypes.STRING,
        allowNull:false
             
    },
    phoneNumber:{ 
        type:DataTypes.STRING,
        allowNull:false, 
        
    },
    password:{ 
        type:DataTypes.STRING,
        allowNull:false,   
    },

});

Admin.sync({});
module.exports = Admin;