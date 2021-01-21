import Sequelize, { Model } from 'sequelize';

class ImageProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        thumbnail: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://192.168.15.24:3333/images/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'id_product',
      as: 'product',
    });
  }
}
export default ImageProduct;
