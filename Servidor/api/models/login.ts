'use strict';
import {
  Model
} from 'sequelize';

interface LoginAttributes{
  id:number
  senha:string
  usuarioId:number
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Login extends Model<LoginAttributes>  implements  LoginAttributes{
    
    id!:number
    senha!:string
    usuarioId!:number
    static associate(models:any) {
      Login.belongsTo(models.Usuario,{
        foreignKey:'usuarioId',
        onDelete:'CASCADE'
      })
    }
  };
  Login.init({
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    senha:{
      allowNull: false,
      type: DataTypes.STRING(600),
    },
    usuarioId:{
      type:DataTypes.INTEGER,
      unique:true,
      allowNull:false,
      references:{model:'usuarios', key:'id'},
      onDelete:'CASCADE',
      
    },
  }, {
    sequelize,
    modelName: 'Login',
  });
  return Login;
};