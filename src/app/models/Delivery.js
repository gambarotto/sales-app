import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        scheduleTo: Sequelize.DATE,
        dateStatus: Sequelize.DATE,
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
    this.belongsTo(models.Status, {
      foreignKey: 'idStatus',
      as: 'status',
    });
  }
}
export default Delivery;
