const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt');


const StudentRegister = sequelize.define('StudentRegister', {

    mail: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    studentName: {
        type: DataTypes.STRING,
        allowNull: false,
    }, IDcardPath: {
        type: DataTypes.STRING,
        allowNull: false,
    }, studentNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }, password: {
        type: DataTypes.STRING,
        allowNull: false,
    }, phoneNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }, registerCondition: {
        type: DataTypes.STRING,
        allowNull: false,
    }, feedBack: {
        type: DataTypes.STRING,
        allowNull: true,
    }, Id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }

});
StudentRegister.beforeCreate(async (student) => {
    const salt = await bcrypt.genSalt();
    student.password = await bcrypt.hash(student.password, salt);

});


StudentRegister.sync({});
module.exports = StudentRegister;