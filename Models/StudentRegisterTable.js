const { DataTypes} = require('sequelize');
const sequelize = require('../db');



const StudentRegister = sequelize.define('StudentRegister',{
    
    mail:{
        primaryKey:true,
        type:DataTypes.STRING,
        allowNull:false      
    },
    studentName:{ 
        type:DataTypes.STRING,
        allowNull:false,   
    },IDcardPath:{
        type:DataTypes.STRING,
        allowNull:false,
    },studentNumber:{
        type:DataTypes.INTEGER,
        allowNull:false,  
    },password:{
        type:DataTypes.STRING,
        allowNull:false,  
    },phoneNumber:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },registerCondition:{
        type:DataTypes.STRING,
        allowNull:false,
    },feedBack:{
        type:DataTypes.STRING,
        allowNull:true,
    },Id:{
        type:DataTypes.INTEGER,
        allowNull:true,   
    }
});



StudentRegister.sync({});
module.exports = StudentRegister;