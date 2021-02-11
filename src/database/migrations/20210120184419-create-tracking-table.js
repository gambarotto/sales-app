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
      id_order: {
        type: Sequelize.STRING,
        references: { model: 'orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      id_status: {
        type: Sequelize.STRING,
        references: { model: 'statuses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      date_status: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('trackings');
  },
};
