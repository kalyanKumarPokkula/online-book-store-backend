"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Publisher, { foreignKey: "publisher_id" });
      Book.belongsTo(models.Author, { foreignKey: "author_id" });
    }
  }
  Book.init(
    {
      book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      posterurl: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isbn: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: true, // Can be changed to false based on requirements
      },
      publication_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      publisher_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Publisher", // 'Publishers' refers to the table name
          key: "publisher_id",
        },
        allowNull: true,
      },
      author_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Author", // 'Authors' refers to the table name
          key: "author_id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Book",
      hooks: {
        beforeCreate: book => {
          book.description = book.description.toLowerCase();
        },
        beforeUpdate: book => {
          book.description = book.description.toLowerCase();
        },
      },
    }
  );
  return Book;
};
