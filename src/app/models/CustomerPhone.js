import Sequelize, { Model } from 'sequelize';

class CustomerPhone extends Model {
  static init(sequelize) {
    super.init(
      {
        ddd: Sequelize.STRING,
        number: Sequelize.STRING,
        type: Sequelize.STRING,
        notes: Sequelize.STRING(50),
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
  }
}
export default CustomerPhone;
