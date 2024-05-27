
const { DataTypes} = require('sequelize');
const sequelize = require('../db');
const Room = require('./Room.js');



const Seat = sequelize.define('Seat',{
    

    seatId:{
        primaryKey:true,
        type:DataTypes.STRING,
        allowNull:false
             
    },
    seatStatus:{ 
        type:DataTypes.STRING,
        allowNull:false,   
    },studentMail:{
        type:DataTypes.STRING,
        allowNull:true,
    },allocationTime:{
        type:DataTypes.TIME,
        allowNull:true,  
    },deallocationTime:{
        type:DataTypes.TIME,
        allowNull:true, 
    },roomName:{
        primaryKey:true,
        type:DataTypes.STRING,
        allowNull:false
    }
   

});


Seat.hasOne(Room, { foreignKey: 'roomName' });
Room.hasMany(ApplicationLetter, { foreignKey: 'roomName' });

RoomTable.sync({});
SeatTable.sync({});
module.exports = Seat;