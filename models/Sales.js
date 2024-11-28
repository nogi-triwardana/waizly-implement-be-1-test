const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Sales = sequelize.define('Sales', {
  sales_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employee_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Employee',
      key: 'sales_id'
    }
  },
  sales: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'sales_data',
  timestamps: false,  
});

Sales.associate = (models) => {
  Sales.belongsTo(models.employees, {
    foreignKey: 'employee_id',
  });
};

module.exports = Sales;