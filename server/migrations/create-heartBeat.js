module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('heartBeat', {
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
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('heartBeat'),
  };
