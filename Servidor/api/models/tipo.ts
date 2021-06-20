'use strict';
import {
  Model
} from 'sequelize';

interface TipoAttributes{
  id:number
  categoria:string
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Tipo extends Model<TipoAttributes> implements TipoAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!:number
     categoria!:string
    static associate(models:any) {
      Tipo.hasMany(models.Item,{
        foreignKey:'tipoId',
        onDelete:'CASCADE'
      })

    }
  };
  Tipo.init({
    id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type: DataTypes.INTEGER
    },
    categoria:{
      type:DataTypes.STRING,
      validate:{ 
         isAlpha: true,
         is:/^[a-z ,.'-]+$/i
      },
      allowNull:false,
      unique:true
    }
  },
  {
    sequelize,
    modelName: 'Tipo',
  });
  return Tipo;
};