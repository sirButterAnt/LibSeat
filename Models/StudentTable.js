
const { DataTypes} = require('sequelize');
const sequelize = require('../db');



const Student = sequelize.define('Student',{
    

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
    },deallocationTime:{
        type:DataTypes.TIME,
        allowNull:true, 
    }, allocationTime:{
        type:DataTypes.TIME,
        allowNull:true, 
    },password:{
        type:DataTypes.STRING,
        allowNull:false, 
    },seatId:{
        type:DataTypes.STRING,
        allowNull:true, 
    },phoneNumber:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },registerCondition:{
        type:DataTypes.STRING,
        allowNull:false,
    },feedBack:{
        type:DataTypes.STRING,
        allowNull:true,
    },status:{ 
        type:DataTypes.STRING,
        allowNull:false,   
    }
});



Student.sync({});
module.exports = Student;