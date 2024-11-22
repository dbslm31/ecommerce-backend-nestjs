'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('orders', 'Orders');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('Orders', 'orders');
  },
};
