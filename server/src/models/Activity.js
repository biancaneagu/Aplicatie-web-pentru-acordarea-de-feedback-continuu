import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // Atenție: în ESM, extensia .js este adesea obligatorie

const Activity = sequelize.define("Activity", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export default Activity;