module.exports = function(sequelize, DataTypes) {

      var db = require("../models");
      var Rating = sequelize.define("Rating", {
        rate: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        comment: {
          type: DataTypes.TEXT('long'),
          allowNull: false
        }
      });

      Rating.associate = function(models) {
        Rating.belongsTo(models.Roommate);
        Rating.belongsTo(models.User)
      }
      return Rating;
};
