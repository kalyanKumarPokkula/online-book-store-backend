"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Books", {
      book_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      posterurl: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      isbn: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: true, // Can be changed to false based on requirements
      },
      publication_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      stock_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      publisher_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Publishers", // 'Publishers' refers to the table name
          key: "publisher_id",
        },
        allowNull: true,
      },
      author_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Authors", // 'Authors' refers to the table name
          key: "author_id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Books");
  },
};
