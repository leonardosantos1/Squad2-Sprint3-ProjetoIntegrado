'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item_usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      item_usuario.belongsTo(models.Item,{
        foreignKey:'item_id',
        onDelete:'CASCADE'
      })
      item_usuario.belongsTo(models.Usuario,{
        foreignKey:'usuario_id',
        onDelete:'CASCADE'
      })
      item_usuario.hasMany(models.Reserva,{
        foreignKey:'item_usuario_id',
        onDelete:'CASCADE'
      })
    }
  };
  item_usuario.init({
    item_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'item_usuario',
  });
  return item_usuario;
};