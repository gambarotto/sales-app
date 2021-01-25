import Sequelize, { Model } from 'sequelize';

class Status extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
        //freezeTableName: true,
      }
    );
    return this;
  }
}
export default Status;
