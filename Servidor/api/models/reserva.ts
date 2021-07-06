'use strict';
import {
  Model
} from 'sequelize';

interface ReservaAttributes{
  id:number
  dataReserva: Date
  checkout: Date
  itemUsuarioId:number
}
module.exports = (sequelize:any, DataTypes:any) => {
  class Reserva extends Model {
  
    id!:number
    dataReserva!: Date 
    checkout!: Date 
    itemUsuarioId!:number
    static associate(models:any) {
      Reserva.belongsTo(models.item_usuario,{
        foreignKey:'itemUsuarioId',
        onDelete:'CASCADE'
      })
    }
  };
  Reserva.init({
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    dataReserva: {
      type:DataTypes.DATE,
      allowNull:false,
      unique:true
    },
    checkout: {
      type:DataTypes.DATE
    },
      itemUsuarioId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{model:'item_usuarios', key:'id'},
        onDelete:'CASCADE'
      }
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};