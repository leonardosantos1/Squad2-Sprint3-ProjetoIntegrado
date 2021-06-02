'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.Login,{
        foreignKey:'usuario_id',
        onDelete: 'CASCADE'
      })
    }
  };
  Usuario.init({
    nome:{
      type:DataTypes.STRING,
      validate:{
        is: { 
              args:/^[a-z ,.'-]+$/i
             // msg: "Nome invalido"
            }//isso ficou foda :)
      } 
    }, 
    cpf:{
      type:DataTypes.STRING,
      validate:{
        isNumeric: true,
        len: [11, 11]
      }
    }
  }, {
    sequelize,
    modelName: 'Usuario'
  });
  return Usuario;
};

