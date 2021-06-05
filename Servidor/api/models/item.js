'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
     Item.hasOne(models.item_usuario,{
        foreignKey:'item_id',
        onDelete: 'CASCADE'
      })
      
      Item.belongsTo(models.Tipo,{
        foreignKey:'tipo_id',
        onDelete:'CASCADE'
      })
    }
  };
  Item.init({
    numeracao: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};