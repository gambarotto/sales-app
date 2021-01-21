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
        //modelName: 'type_payments',
      }
    );
    return this;
  }
}
export default TypePayment;
