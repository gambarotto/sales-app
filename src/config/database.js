require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //operatorsAliases: process.env.NODE_ENV === 'test' ? false : true,
  logging: process.env.NODE_ENV === 'test' ? false : console.log,
  define: {
    timestamps: true, // Faz com que todas as tabelas do banco tenham createAt,updateAt
    underscored: true, // Faz com q o sequelize padronize as tabelas, ex nova_tabela
    underscoredAll: true,
    //freezeTableName: true, // Cancela a pluralização automatica do sequelize
  },
};
