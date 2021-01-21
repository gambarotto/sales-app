import Sequelize, { Model } from 'sequelize';

class TypePayment extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        //modelName: 'typePayments',
      }
    );
    return this;
  }
}
export default TypePayment;
