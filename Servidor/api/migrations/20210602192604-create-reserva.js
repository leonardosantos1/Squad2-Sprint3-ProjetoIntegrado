'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_reserva: {
        type: Sequelize.DATE,
        allowNull:false,
        unique:true
      },
      checkout: {
        type: Sequelize.DATE,
        allowNull:false,
        unique:true
      },
      item_usuario_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model:'item_usuarios', key:'id'},
        onDelete:'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservas');
  }
};