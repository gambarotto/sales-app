import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        costPrice: Sequelize.DOUBLE,
        salePrice: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Brand, {
      foreignKey: 'idBrand',
      as: 'brand',
    });
    this.belongsTo(models.Category, {
      foreignKey: 'idCategory',
      as: 'category',
    });
  }
}
export default Product;
