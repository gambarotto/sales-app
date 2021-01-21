import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        schedule_to: Sequelize.DATE,
        date_status: Sequelize.DATE,
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
    this.belongsTo(models.Status, {
      foreignKey: 'id_status',
      as: 'status',
    });
  }
}
export default Delivery;
