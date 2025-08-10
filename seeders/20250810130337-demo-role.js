'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        id_role:"dns",
        role_name:"dinas"
      }, {
        id_role:"adm_uang",
        role_name:"admin_uang",
      }, {
        id_role:"adm_wisata",
        role_name:"admin_wisata",
      }, {
        id_role:"usr",
        role_name:"user",
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {})
  }
};
