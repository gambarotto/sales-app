'use strict';
//um historico de alterações na entrega
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trackings', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      idOrder: {
        type: Sequelize.STRING,
        references: { model: 'orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      idStatus: {
        type: Sequelize.STRING,
        references: { model: 'status', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      dateStatus: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('trackings');
  },
};
