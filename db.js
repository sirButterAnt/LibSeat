const Sequelize = require("sequelize");
const sequelize = new Sequelize("LibSeat", "root", "S-t-2118797", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;