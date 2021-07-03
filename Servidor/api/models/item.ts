'use strict';
import {
  Model
} from 'sequelize';

interface ItemAttributes{
  id:number
  numeracao:number
  tipoId:number
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Item extends Model<ItemAttributes> implements ItemAttributes {

    id!:number
    numeracao!:number
    tipoId!:number
    static associate(models:any) {
     Item.hasOne(models.item_usuario,{
        foreignKey:'itemId',
        onDelete: 'CASCADE'
      })
      Item.belongsTo(models.Tipo,{
        foreignKey:'tipoId',
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
      },
      unique:true
    },
    tipoId:{
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