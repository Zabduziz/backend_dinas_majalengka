'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('wisata', [
      {
        id_wisata:"WST0001",
        nama_wisata:"Wisata keliling dunia",
        alamat:"56M9+V82, Cikasarung, Majalengka, Majalengka Regency, West Java",
        deskripsi:"tempatnya sangat direkomendasikan untuk berlibur bersama keluarga, teman maupun pasangan. disini bisa mengenal berbagai macam ikon bangunan dari berbagai belahan dunia, selain itu terdapat playground dan kebun binatang mini untuk anak-anak. namun jika datang saat siang hari akan terasa panas.",
        jam_buka:"09:30:00",
        jam_tutup:"21:00:00",
        coordinates: Sequelize.literal("ST_GeomFromText('POINT(108.21811398414022 -6.815265035238448)')")
      }, {
        id_wisata:"WST0002",
        nama_wisata:"Taman Gunung Batu Karang",
        alamat:"Babakan Jawa, Majalengka, Majalengka Regency, West Java 45419",
        deskripsi:"Spot bebatuan Purba yg sangat cantik, asri dan alami.",
        jam_buka:"08:00:00",
        jam_tutup:"18:00:00",
        coordinates: Sequelize.literal("ST_GeomFromText('POINT(108.20402890331492 -6.879353292003561)')")
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('wisata', null, {})
  }
};
