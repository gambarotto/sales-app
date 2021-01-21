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
      foreignKey: 'idCustomer',
      as: 'customer',
    });
    this.belongsTo(models.Product, {
      foreignKey: 'idProduct',
      as: 'product',
    });
  }
}
export default OrderProduct;
