"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(db) {
            db.User.hasMany(db.Comment, {
                foreignKey: "user_id",
                sourceKey: "id",
                onDelete: "cascade",
                onUpdate: "cascade",
            });
            db.User.hasMany(db.Post, {
                foreignKey: "user_id",
                sourceKey: "id",
                onDelete: "cascade",
                onUpdate: "cascade",
            });
            db.User.belongsToMany(db.Post, { through: "post_like" });
        }
    }
    User.init(
        {
            nickname: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
