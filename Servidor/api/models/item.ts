'use strict';
import {
  Model
} from 'sequelize';

interface ItemAttributes{
  id:number
  numeracao:number
  tipo_id:number
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Item extends Model<ItemAttributes> implements ItemAttributes {

    id!:number
    numeracao!:number
    tipo_id!:number
    static associate(models:any) {
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
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    numeracao:{
      allowNull:false,
      type:DataTypes.INTEGER,
      validate:{
        isNumeric: true
      }
    },
    tipo_id:{
      type: DataTypes.INTEGER,
        allowNull:false,
        references:{model:'Tipos', key:'id'},
        onDelete:'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};