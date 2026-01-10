const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Feedback = sequelize.define("Feedback", {
  type: {
    type: DataTypes.ENUM("SMILE", "FROWN", "SURPRISED", "CONFUSED"),
    allowNull: false,
  },
});

module.exports = Feedback;
