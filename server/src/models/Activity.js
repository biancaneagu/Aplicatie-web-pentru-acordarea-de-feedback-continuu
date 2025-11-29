const {DataTypes}= require('sequelize');

const sequelize=require('../db');

const Activity=sequelize.define("Activity",{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    code:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    startTime:{
        type:DataTypes.DATE,
        allowNull:false
    },
    endTime:{
        type:DataTypes.DATE,
        allowNull:false
    }
});

module.exports=Activity;