'use strict';
import {
  Model
} from 'sequelize';

interface LoginAttributes{
  id:number
  senha:string
  usuario_id:number
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Login extends Model<LoginAttributes>  implements  LoginAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:number
    senha!:string
    usuario_id!:number
    static associate(models:any) {
      Login.belongsTo(models.Usuario,{
        foreignKey:'usuario_id',
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
    usuario_id:{
      type:DataTypes.INTEGER,
      unique:true,
      allowNull:false,
      references:{model:'Usuarios', key:'id'},
      onDelete:'CASCADE',
      
    },
  }, {
    sequelize,
    modelName: 'Login',
  });
  return Login;
};