module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: process.env.DB_USER || 'docker',
  password: process.env.DB_PASSWORD || 'docker',
  database: process.env.DB_NAME || 'salesapp',
  define: {
    timestamps: true, // Faz com que todas as tabelas do banco tenham createAt,updateAt
    underscored: true, // Faz com q o sequelize padronize as tabelas, ex nova_tabela
    underscoredAll: true,
    //freezeTableName: true, // Cancela a pluralização automatica do sequelize
  },
};
