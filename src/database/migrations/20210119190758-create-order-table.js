module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      id_customer: {
        type: Sequelize.STRING,
        references: { model: 'customers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      id_type_payment: {
        type: Sequelize.STRING,
        references: { model: 'type_payments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      id_billing_address: {
        type: Sequelize.STRING,
        references: { model: 'addresses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      id_delivery_address: {
        type: Sequelize.STRING,
        references: { model: 'addresses', key: 'id' },
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
    return queryInterface.dropTable('orders');
  },
};
