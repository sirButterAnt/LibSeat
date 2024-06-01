
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const StudentRegisterTable = require('./StudentRegisterTable.js');
const SeatTable = require('./SeatTable.js')


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
        type: DataTypes.TIME,
        allowNull: true,
    }, allocationTime: {
        type: DataTypes.TIME,
        allowNull: true,
    }, seatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


Student.belongsTo(StudentRegisterTable, { foreignKey: 'mail' });
StudentRegisterTable.hasMany(Student, { foreignKey: 'mail' });

Student.belongsTo(SeatTable, { foreignKey: 'seatId' });
SeatTable.hasMany(Student, { foreignKey: 'seatId' });


Student.sync({});
StudentRegisterTable.sync({});



module.exports = Student;