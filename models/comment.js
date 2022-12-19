"use strict";
const { Model } = require("sequelize");
const db = require(".");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(db) {
            db.Comment.belongsTo(db.User, {
                foreignKey: "user_id",
                targetKey: "id",
                onDelete: "cascade",
                onUpdate: "cascade",
            });
            db.Comment.belongsTo(db.Post, {
                foreignKey: "post_id",
                targetKey: "id",
                onDelete: "cascade",
                onUpdate: "cascade",
            });
        }
    }
    Comment.init(
        {
            comment: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Comment",
        }
    );
    return Comment;
};
