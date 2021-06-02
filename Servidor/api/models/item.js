'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.Tipo,{
        foreignKey:'tipo_id',
        onDelete:'CASCADADE'
      })
      Item.hasOne(models.Item_usuario,{
        foreignKey:'item_id',
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