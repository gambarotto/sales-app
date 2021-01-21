//Faz a conexão com o db
import Sequelize from 'sequelize';
import Customer from '../app/models/Customer';
import Address from '../app/models/Address';
import Order from '../app/models/Order';
import OrderProduct from '../app/models/OrderProduct';
import Tracking from '../app/models/Tracking';
import Delivery from '../app/models/Delivery';
import Product from '../app/models/Product';
import Category from '../app/models/Category';
import ImageProduct from '../app/models/ImageProduct';
import TypePayment from '../app/models/TypePayment';
import Favorite from '../app/models/Favorite';
import Status from '../app/models/Status';
import Brand from '../app/models/Brand';
import CustomerPhone from '../app/models/CustomerPhone';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [
  Customer,
  CustomerPhone,
  Address,
  Category,
  TypePayment,
  Status,
  Brand,
  Order,
  OrderProduct,
  Tracking,
  Delivery,
  Product,
  Favorite,
  ImageProduct,
  User,
];

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = new Sequelize(databaseConfig);
    //Testa a conexão
    try {
      await this.connection.authenticate();
      console.log(
        '\x1b[33m%s\x1b[0m',
        `=> 🚀 Connection with database has been established successfully`
      );
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    //conecta os models ao db
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
