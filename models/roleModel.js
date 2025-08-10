'use Strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    }
    Role.init({
        id_role:DataTypes.STRING,
        role_name:DataTypes.ENUM(
            'dinas',
            'admin_uang',
            'admin_wisata',
            'user'
        ),
        created_at:DataTypes.DATE,
        updated_at:DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'roles'
    })
    return Role
}