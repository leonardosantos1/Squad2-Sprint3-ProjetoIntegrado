'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item_usuario extends Model {
    static associate(models) {
      item_usuario.belongsTo(models.Item,{
        foreignKey:'itemId',
        onDelete:'CASCADE'
      })
      item_usuario.belongsTo(models.Usuario,{
        foreignKey:'usuarioId',
        onDelete:'CASCADE'
      })
      item_usuario.hasMany(models.Reserva,{
        foreignKey:'itemUsuarioId',
        onDelete:'CASCADE'
      })
    }
  };
  item_usuario.init({
    itemId:{
      type:DataTypes.INTEGER,
      validate:{
        isNumeric: true,
      }
    },
    usuarioId:{
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