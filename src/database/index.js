//Faz a conexão com o db
import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

const models = [];

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
