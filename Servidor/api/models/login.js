'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    static associate(models) {
      Login.belongsTo(models.Usuario,{
        foreignKey:'usuario_id'
      })
    }
  };
  Login.init({
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Login',
  });
  return Login;
};