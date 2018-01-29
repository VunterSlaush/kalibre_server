"use strict";

/**
 * @swagger
 * definitions:
 *   Book:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         readOnly: true
 *       title:
 *         type: string
 *       downloadLink:
 *         type: string
 *       cover:
 *         type: string
 *       subject:
 *         type: string
 *       date:
 *         type: string
 *         format: date
 *       description:
 *         type: string
 *       authors:
 *         type: array
 *         items:
 *           type: string
 */

module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define(
    "Book",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      path: { type: DataTypes.STRING, allowNull: false }
    },
    {
      tableName: "books",
      timestamps: false,
      classMethods: {
        associate: function(models) {
          Book.belongsToMany(models.Author, {
            through: {
              model: models.BookAuthor,
              unique: false
            },
            as: "authors",
            foreignKey: "book",
            constraints: false
          });
        }
      }
    }
  );
  return Book;
};
