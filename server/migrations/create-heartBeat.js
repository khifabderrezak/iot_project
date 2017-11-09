module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('heartBeats', {
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
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        time: {
          type: Sequelize.TIME,
          allowNull: false
        },
        /*removing Foreign key
        profilId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: 'Profil',
            key: 'id'
          }
        }
        */
      }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('heartBeats'),
  };
