"use strict";

module.exports = function(sequelize, DataTypes) {
  var <%= resourceUpper %> = sequelize.define("<%= resourceUpper %>", {
    name: {type: DataTypes.STRING, allowNull: false},
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // Add associations here
      }
    }
  });

  return <%= resourceUpper %>;
};