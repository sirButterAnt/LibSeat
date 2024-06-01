
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Room = require('./RoomTable');
const { FORCE } = require('sequelize/lib/index-hints');



const Seat = sequelize.define('Seat', {


    seatId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false

    },
    seatStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    }, studentMail: {
        type: DataTypes.STRING,
        allowNull: true,
    }, allocationTime: {
        type: DataTypes.TIME,
        allowNull: true,
    }, deallocationTime: {
        type: DataTypes.TIME,
        allowNull: true,
    }, roomName: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    }
});


Seat.belongsTo(Room, { foreignKey: 'roomName' });
Room.hasMany(Seat, { foreignKey: 'roomName' });

Room.sync({});
Seat.sync({});
module.exports = Seat;