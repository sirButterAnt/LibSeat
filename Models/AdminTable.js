const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt');


const Admin = sequelize.define('Admin', {


    mail: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false

    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

Admin.beforeCreate(async (admin) => {
    const salt = await bcrypt.genSalt();
    admin.password = await bcrypt.hash(admin.password, salt);

});

Admin.sync({});
module.exports = Admin;