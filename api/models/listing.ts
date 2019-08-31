'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    location: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pricePerHour: {
      type: DataTypes.INTEGER
    },
    dailyRate: {
      type: DataTypes.INTEGER
    },
    propertyType: {
      type: DataTypes.STRING
    },
    landmarks: {
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    },
    timeAvailabilityStart: {
      type: DataTypes.TIME,
      allowNull: false
    },
    timeAvailabilityEnd: {
      type: DataTypes.TIME,
      allowNull: false
    },
    dateAvailabilityStart: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dateAvailabilityEnd: {
      type: DataTypes.DATE,
      allowNull: false
    },
    requireApproval:  {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    imagePath:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    title:  {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Listing.associate = function(models) {
    Listing.belongsTo(models.User);
  };
  return Listing;
};