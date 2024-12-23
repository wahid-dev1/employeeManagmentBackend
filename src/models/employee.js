'use strict';
const {
  DataTypes,
} = require('sequelize');
module.exports = (sequelize,Sequelize) => {
  let Employee=sequelize.define('Employee',{
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    class: DataTypes.STRING,
    role: DataTypes.STRING
  });
  return Employee;
};