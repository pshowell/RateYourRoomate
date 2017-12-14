module.exports = function(sequelize, DataTypes) {

      var db = require("../models");
      var Rating = sequelize.define("rating", {
        rate: {
          type: DataTypes.STRING,
          allowNull: false
        },
        comment: {
          type: DataTypes.STRING,
          allowNull: false
        }
      });
      Rating.associate = function(models) {
          //associate userid with goals
        Rating.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          },
          onDelete: "CASCADE"
        });
        //associate goals to food logs
        Rating.hasMany(models.roommate, {
          onDelete: "CASCADE"
        })
      }
      return Rating;
};
