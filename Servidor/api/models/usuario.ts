'use strict';
import {
  Model
} from 'sequelize';

interface UsuarioAttributes{
  id:number
  nome:string
  cpf:string
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Usuario extends Model<UsuarioAttributes> 
  implements UsuarioAttributes{

    id!:number
    nome!:string
    cpf!:string
    static associate(models:any) {
      Usuario.hasOne(models.item_usuario,{
        foreignKey:'usuario_id',
        onDelete:'CASCADE'
      })
      Usuario.hasMany(models.Login,{
        foreignKey:'usuario_id',
        onDelete:'CASCADE'
      })

    }
  };
  Usuario.init({
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome:{ 
      type:DataTypes.STRING,
      validate:{
        is:/^[a-z ,.'-]+$/i
      },
      allowNull:false
    },
    cpf: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isNumeric: true,
        len: [11, 11]
      },
      unique:true
    }
  }, 
  {
    sequelize,
    modelName: 'Usuario',
    underscored:true
  });
  return Usuario;
};