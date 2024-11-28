const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('employees', {
  employee_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  job_title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  salary: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  departement: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  joined_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  }
}, { 
  timestamps: false
});

Employee.associate = (models) => {
  Employee.hasMany(models.employees, {
    foreignKey: 'employee_id',
  });
}

module.exports = Employee;