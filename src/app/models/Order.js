import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.DOUBLE,
        dateStatus: Sequelize.DATE,
      },
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
    this.belongsTo(models.TypePayment, {
      foreignKey: 'idTypePayment',
      as: 'typePayment',
    });
    this.belongsTo(models.Address, {
      foreignKey: 'idBillingAddress',
      as: 'billingAddress',
    });
    this.belongsTo(models.Address, {
      foreignKey: 'idDeliveryAddress',
      as: 'deliveryAddress',
    });
    this.belongsTo(models.Status, {
      foreignKey: 'idStatus',
      as: 'status',
    });
  }
}
export default Order;
