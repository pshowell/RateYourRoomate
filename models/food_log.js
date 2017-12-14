module.exports = function(sequelize, DataTypes) {

      var db = require("../models");
      var Roommate = sequelize.define("roommate", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.INTEGER,
        }
      });

    Roommate.associate = function(models) {
        // When a food item is deleted
        Roommate.belongsTo(models.User,{
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE"
          });
        Roommate.belongsTo(models.rating, {
            foreignKey: {
              allowNull: false,
            },
            onDelete: "CASCADE"
        });
        Roommate.belongsTo(models.food, {
            foreignKey: {
                allowNull: false,
            }
        })
    }
      return Roommate;
  };
