'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    isAccepted: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER,
  }, {});
  Reservation.associate = function(models) {
    Reservation.belongsTo(models.User);
    Reservation.belongsTo(models.Listing);
  };
  return Reservation;
};