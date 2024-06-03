
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const StudentRegisterTable = require('./StudentRegisterTable.js');
const SeatTable = require('./SeatTable.js');
const { FORCE } = require('sequelize/lib/index-hints');


const Student = sequelize.define('Student', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
    }, deallocationTime: {
        type: DataTypes.DATE,
        allowNull: true,
    }, allocationTime: {
        type: DataTypes.DATE,
        allowNull: true,
    }, seatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, status: {
        type: DataTypes.STRING,
        allowNull: false,
    }, roomName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


Student.belongsTo(StudentRegisterTable, { foreignKey: 'mail' });
StudentRegisterTable.hasMany(Student, { foreignKey: 'mail' });

Student.belongsTo(SeatTable, { foreignKey: 'seatId' });
SeatTable.hasMany(Student, { foreignKey: 'seatId' });


Student.sync({ FORCE: true });
StudentRegisterTable.sync({ FORCE: true });



module.exports = Student;