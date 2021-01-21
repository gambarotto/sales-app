import Sequelize, { Model } from 'sequelize';

class Tracking extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        date_status: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'trackings',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'id_order',
      as: 'order',
    });
    // this.belongsTo(models.Status, {
    //   foreignKey: 'id_status',
    //   as: 'status',
    // });
  }
}
export default Tracking;
