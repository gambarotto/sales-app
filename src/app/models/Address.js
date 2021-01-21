import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        complement: Sequelize.STRING,
        uf: Sequelize.STRING(2),
        city: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        typeAddress: Sequelize.ENUM('Casa', 'Trabalho', 'Outro'),
      },
      {
        sequelize,
        //modelName: 'address',
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
export default Address;
