import Sequelize, { Model } from 'sequelize';

class OrderProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        qty: Sequelize.INTEGER,
        amountProducts: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'idOrder',
      as: 'order',
    });
    this.belongsTo(models.Product, {
      foreignKey: 'idProduct',
      as: 'product',
    });
    this.belongsTo(models.Delivery, {
      foreignKey: 'idDelivery',
      as: 'delivery',
    });
  }
}
export default OrderProduct;
