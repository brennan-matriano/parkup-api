'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContactUsMessage = sequelize.define('ContactUsMessage', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.STRING,
  }, {});
  ContactUsMessage.associate = function(models) {
    // associations can be defined here
  };
  return ContactUsMessage;
};