module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Profil', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        nom: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        prenom: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        mail: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          contact: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          
      }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Profil'),
  };