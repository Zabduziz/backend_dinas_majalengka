'use Strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    }
    User.init({
        id_user:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        nama_lengkap:DataTypes.STRING,
        email:DataTypes.STRING,
        tanggal_lahir:DataTypes.DATE,
        no_telpon:DataTypes.STRING,
        gender:DataTypes.ENUM('Laki-Laki', 'Perempuan'),
        password_hash:DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps:true
    })
    return User
}