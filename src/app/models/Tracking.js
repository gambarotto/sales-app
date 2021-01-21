import Sequelize, { Model } from 'sequelize';

class Tracking extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        dateStatus: Sequelize.DATE,
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
      foreignKey: 'idOrder',
      as: 'order',
    });
    // this.belongsTo(models.Status, {
    //   foreignKey: 'idStatus',
    //   as: 'status',
    // });
  }
}
export default Tracking;
