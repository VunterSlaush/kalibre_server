"use strict";

module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define(
    "Author",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING
    },
    {
      tableName: "authors",
      timestamps: false,
      classMethods: {
        associate: function(models) {
          Author.belongsToMany(models.Book, {
            through: {
              model: models.BookAuthor,
              unique: false
            },
            as: "books",
            foreignKey: "author",
            constraints: false
          });
        }
      },

      instanceMethods: {}
    }
  );
  return Author;
};
