import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.DOUBLE,
        date_status: Sequelize.DATE,
      },
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
    this.belongsTo(models.TypePayment, {
      foreignKey: 'id_type_payment',
      as: 'typePayment',
    });
    this.belongsTo(models.Address, {
      foreignKey: 'id_billing_address',
      as: 'billingAddress',
    });
    this.belongsTo(models.Address, {
      foreignKey: 'id_delivery_address',
      as: 'deliveryAddress',
    });
    this.belongsTo(models.Status, {
      foreignKey: 'id_status',
      as: 'status',
    });
  }
}
export default Order;
