'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      order_num: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('cart', 'pending', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    // Génération d'un trigger pour initialiser `order_num` si besoin
    await queryInterface.sequelize.query(`
      CREATE TRIGGER set_order_num
      BEFORE INSERT ON orders
      FOR EACH ROW
      BEGIN
        SET NEW.order_num = CONCAT('ORD-', FLOOR(100000 + (RAND() * 900000)));
      END;
    `);
  },

  async down(queryInterface, Sequelize) {
    // Suppression du trigger
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS set_order_num;
    `);

    // Suppression de la table
    await queryInterface.dropTable('orders');
  },
};
