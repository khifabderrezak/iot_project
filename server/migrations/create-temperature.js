module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Temps', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        value: {
          type: Sequelize.DOUBLE,
          allowNull: false
        },
        date: {
            type: Sequelize.TIME,
            allowNull: false
        },
        profilId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: 'Profil',
            key: 'id'
          }
        }
      }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Temps'),
  };
