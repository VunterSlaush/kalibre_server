"use strict";

module.exports = function(sequelize, DataTypes) {
  var BookAuthor = sequelize.define(
    "BookAuthor",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      author: {
        type: DataTypes.INTEGER,
        references: {
          model: "authors",
          key: "id"
        }
      },
      book: {
        type: DataTypes.INTEGER,
        references: {
          model: "books",
          key: "id"
        }
      }
    },
    {
      tableName: "books_authors_link",
      timestamps: false,
      classMethods: {
        associate: function(models) {
          BookAuthor.belongsTo(models.Book, {
            foreignKey: "book",
            targetKey: "id"
          }),
            BookAuthor.belongsTo(models.Author, {
              foreignKey: "author",
              targetKey: "id"
            });
        }
      }
    }
  );
  return BookAuthor;
};
