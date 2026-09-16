'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('lead', 'prospect', 'client', 'inactif'),
        allowNull: false,
        defaultValue: 'lead',
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
       updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

     await queryInterface.addIndex('Contacts', ['userId'], {
      name: 'contacts_user_id_idx',
    });

    await queryInterface.addIndex('Contacts', ['email', 'userId'], {
      name: 'contacts_email_user_id_unique',
      unique: true,
    });

  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('Contacts');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Contacts_status";');
  
  },
};
