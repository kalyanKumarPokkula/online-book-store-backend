const { where } = require("sequelize");
const { Book } = require("../models/index");
const { CartItem } = require("../models/index");

class CartItemRepository {
  async CreateCartItems(item) {
    try {
      const cart_item = await CartItem.create(item);
      return cart_item;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartItems(id) {
    try {
      return await CartItem.findAll({
        where: {
          cart_id: id,
        },
        include: {
          model: Book,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async destoryCartItem(cartItem_id) {
    try {
      return await CartItem.destroy({
        where: {
          cart_item_id: cartItem_id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CartItemRepository;
