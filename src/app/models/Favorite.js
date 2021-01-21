import { Model } from 'sequelize';

class OrderProduct extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, {
      foreignKey: 'id_customer',
      as: 'customer',
    });
    this.belongsTo(models.Product, {
      foreignKey: 'id_product',
      as: 'product',
    });
  }
}
export default OrderProduct;
