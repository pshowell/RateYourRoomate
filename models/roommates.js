module.exports = function(sequelize, DataTypes) {
    var Roommates = sequelize.define('Roommates', {
        rmname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        rmpicture: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rlocation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        withRoom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        rmgender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        rmage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rmbio: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    Roommates.associate = function(models) {
        Roommates.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return  Roommates;
};
