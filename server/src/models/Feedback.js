const {DataTypes}= require('sequelize');
const sequelize=require('../db');

const Feedback=sequelize.define("Feedback",{
    type:{
        type:DataTypes.ENUM("smiley","frowny","surprized","confused"),
        allowNull:false
    }
});

module.exports=Feedback;