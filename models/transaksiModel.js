'use Strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Transaksi extends Model {
        static associate(models) {
            this.belongsTo(models.User, {foreignKey:'id_user'})
            this.belongsTo(models.Wisata, {foreignKey:'id_wisata'})
            this.hasMany(models.TransaksiDetail, {foreignKey:'id_transaksi'})
        }
    }
    Transaksi.init({
        id_transaksi:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
            primaryKey:true
        },
        id_user:{
            type: DataTypes.STRING,
            allowNull:false,
            references:{
            model:'user',
            key:'id_user'
            },
            onUpdate:'CASCADE',
            onDelete:'CASCADE'
        },
        id_wisata:{
            type: DataTypes.STRING,
            allowNull:false,
            references:{
            model:'wisata',
            key:'id_wisata'
            },
            onUpdate:'CASCADE',
            onDelete:'CASCADE'
        },
        tanggal_kunjung:{
            type: DataTypes.DATE,
            allowNull:false
        },
        status:{
            type: DataTypes.ENUM('Terkonfirmasi', 'Pending', 'Dibatalkan'),
            allowNull:false
        },
        bukti_pembayaran:{
            type: DataTypes.STRING,
            allowNull:false
        }
    }, {
        sequelize,
        modelName:'Transaksi',
        tableName:'transaksi',
        timestamps:true
    })
}