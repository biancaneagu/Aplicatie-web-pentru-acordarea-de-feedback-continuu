import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Feedback = sequelize.define("Feedback", {
  type: {
    type: DataTypes.ENUM("SMILE", "FROWN", "SURPRISED", "CONFUSED"),
    allowNull: false,
  },
});

export default Feedback;
