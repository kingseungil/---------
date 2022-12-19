"use strict";
const { Model } = require("sequelize");
const db = require(".");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            db.Post.belongsToMany(db.User, { through: "post_like" });

            db.Post.hasMany(db.Comment, {
                foreignKey: "post_id",
                sourceKey: "id",
                onDelete: "cascade",
                onUpdate: "cascade",
            });
            db.Post.belongsTo(db.User, {
                foreignKey: "user_id",
                targetKey: "id",
                onDelete: "cascade",
                onUpdate: "cascade",
            });
        }
    }
    Post.init(
        {
            title: DataTypes.STRING,
            content: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Post",
        }
    );
    return Post;
};
