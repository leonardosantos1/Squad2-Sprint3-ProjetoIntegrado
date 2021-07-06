'use strict';
import {
  Model
} from 'sequelize';

interface ItemUsuarioAttributes{
  id:number
  itemId:number
  usuarioId:number
}

module.exports = (sequelize:any, DataTypes:any) => {
  class item_usuario extends Model<ItemUsuarioAttributes> implements ItemUsuarioAttributes {
    id!:number
    itemId!:number
    usuarioId!:number
    static associate(models:any) {
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
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    itemId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{model:'Items', key:'id'},
      onDelete:'CASCADE',
      validate:{
        isNumeric: true,
      }
    },
    usuarioId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{model:'usuarios', key:'id'},
      onDelete:'CASCADE',
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