import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cost_price: Sequelize.DOUBLE,
        sale_price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Brand, {
      foreignKey: 'id_brand',
      as: 'brand',
    });
    this.belongsTo(models.Category, {
      foreignKey: 'id_category',
      as: 'category',
    });
  }
}
export default Product;
