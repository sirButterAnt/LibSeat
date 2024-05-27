const { DataTypes} = require('sequelize');
const sequelize = require('../db');



const Room = sequelize.define('Room',{
    

    roomName:{
        primaryKey:true,
        type:DataTypes.STRING,
        allowNull:false
             
    },
    roomCondiation:{ 
        type:DataTypes.STRING,
        allowNull:false, 
    }
});

Room.sync({});
module.exports = Room;