import Sequelize, { Model } from 'sequelize';

class OrderProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        qty: Sequelize.INTEGER,
        amount_products: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'id_order',
      as: 'order',
    });
    this.belongsTo(models.Product, {
      foreignKey: 'id_product',
      as: 'product',
    });
    this.belongsTo(models.Delivery, {
      foreignKey: 'id_delivery',
      as: 'delivery',
    });
  }
}
export default OrderProduct;
