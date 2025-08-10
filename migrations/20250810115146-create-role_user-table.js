'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('role_user', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true,
        allowNull:false
      },
      id_role: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "roles",
          key: "id_role"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      id_user: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        references: {
          model: "user",
          key: "id_user"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('role_user')
  }
};
