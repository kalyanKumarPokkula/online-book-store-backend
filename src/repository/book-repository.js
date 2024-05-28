const { Author } = require("../models/index");
const { Book } = require("../models/index");

const { Op } = require("sequelize");

class BookRepository {
  async getBooks() {
    try {
      return await Book.findAll({
        include: {
          model: Author,
        },
      });
    } catch (error) {
      a;
      console.log(error);
    }
  }

  async getByYear(year) {
    try {
      return await Book.findAll({
        where: {
          publication_date: {
            [Op.between]: [new Date("2024-01-01"), new Date("2024-12-31")],
          },
        },
        include: {
          model: Author,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getBook(bookId) {
    try {
      return await Book.findByPk(bookId, {
        include: {
          model: Author,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = BookRepository;
