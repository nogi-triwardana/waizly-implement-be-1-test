const Employee = require('../models/Employee');
const httpLogger = require('../config/logger');

const getListEmployees = async (req, res) => {
  try {
    const title = req.query.title;
    const condition = title ? {
      title: {
        [Op.like]: `%${title}%`
      }
    } : null;

    Employee.findAll({
      where: condition
    })
      .then((data) => {
        res.status(200).json({ data });
        httpLogger.info('Success', { 
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
        });
      })
      .catch(err => {
        res.status(500).send({
          message: err?.message || "Some error occured while retrieving data"
        })
        httpLogger.error('Error', { 
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
        });
      })
  } catch (error) {
    res.status(500).send({
      message: error?.message || 'Something went wrong'
    });
    httpLogger.error('Error', { 
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
    });
  }
};

const getOneEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    Employee.findByPk(id)
      .then((data) => {
        if(data) {
          res.status(200).json({ data });
        } else {
          res.status(200).send({
            message: 'Cannot find employee'
          })
        }
        httpLogger.info('Success', { 
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
        });
      })
      .catch(err => {
        res.status(500).send({
          message: err?.message || "Some error occured while retrieving data"
        });
        httpLogger.error('Error', { 
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
        });
      })
  } catch(error) {
    res.status(500).send({
      message: error?.message || 'Something went wrong'
    });
    httpLogger.error('Error', { 
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    Employee.create({
      name: req.body.name,
      job_title: req.body.job_title,
      salary: req.body.salary,
      departement: req.body.departement,
    }).then(() => {
      res.status(200).json({ message: 'Successfully create employee' })
      httpLogger.info('Success', { 
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
      });
    })

  } catch(error) {
    res.status(500).send({
      message: error?.message || 'Something went wrong'
    });
    httpLogger.error('Error', { 
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    Employee.update({
      name: req.body.name,
      job_title: req.body.job_title,
      salary: req.body.salary,
      departement: req.body.departement
    }, {
      where: {
        employee_id: id
      }
    })
      .then((status) => {
        if(status[0] === 1) {
          res.status(200).json({
            message: 'Employee was updated successfully.'
          });
        } else {
          res.status(200).send({
            message: 'Cannot update employee. Maybe employee was not found or body is empty'
          });
        }
        httpLogger.info('Success', { 
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
        });
      })
      .catch(err => {
        res.status(500).send({
          message: err?.message || "Some error occured while retrieving data"
        });
        httpLogger.error('Error', { 
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
        });
      })
  } catch(error) {
    res.status(500).send({
      message: error?.message || 'Something went wrong'
    });
    httpLogger.error('Error', { 
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
    });
  }
};

const deleteEmpoyee = async (req, res) => {
  try {
    const id = req.params.id;

    Employee.destroy({
      where: {
        employee_id: id
      }
    })
      .then(status => {
        if(status === 1) {
          res.status(200).json({
            message: 'Employee was deleted successfully'
          })
        } else {
          res.status(200).json({
            message: 'Cannot delete employee. Maybe employee was not found'
          })
        }
        httpLogger.info('Success', { 
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
        });
      })
      .catch(err => {
        res.status(500).send({
          message: err?.message || "Some error occured while retrieving data"
        });
        httpLogger.error('Error', { 
          method: req.method,
          url: req.originalUrl,
          status: res.statusCode,
        });
      })
  } catch(error) {
    res.status(500).send({
      message: error?.message || 'Something went wrong'
    });
    httpLogger.error('Error', { 
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
    });
  }
};

module.exports = {
  getListEmployees,
  getOneEmployee,
  createEmployee,
  updateEmployee,
  deleteEmpoyee,
};