'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: 'Email address already in use!',
      },
    },
    password: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    passwordResetToken: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Listing);
  };
  return User;
};