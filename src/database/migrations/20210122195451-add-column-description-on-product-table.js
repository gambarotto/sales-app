module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'description', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('products', 'description');
  },
};
