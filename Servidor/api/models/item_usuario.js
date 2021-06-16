'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item_usuario extends Model {
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
    item_id:{
      type:DataTypes.INTEGER,
      validate:{
        isNumeric: true,
      }
    },
    usuario_id:{
      type:DataTypes.INTEGER,
      validate:{
        isNumeric: true,
      }
    }
  }, {
    sequelize,
    modelName: 'item_usuario',
  });
  return item_usuario;
};