'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi', {
      id_transaksi:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
        primaryKey:true
      },
      id_user:{
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'user',
          key:'id_user'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      id_wisata:{
        type: Sequelize.STRING,
        allowNull:false,
        references:{
          model:'wisata',
          key:'id_wisata'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      tanggal_kunjung:{
        type: Sequelize.DATE,
        allowNull:false
      },
      status:{
        type: Sequelize.ENUM('Terkonfirmasi', 'Pending', 'Dibatalkan'),
        allowNull:false
      },
      bukti_pembayaran:{
        type: Sequelize.STRING,
        allowNull:false
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
    await queryInterface.dropTable('transaksi')
  }
};
