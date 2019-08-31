'use strict';
module.exports = (sequelize, DataTypes) => {
  const View = sequelize.define('View', {
    name: DataTypes.STRING,
    displayType: DataTypes.STRING
  }, {});
  View.associate = function(models) {
    // associations can be defined here
  };
  return View;
};

