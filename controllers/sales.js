const Sales = require('../models/Sales');
const httpLogger = require('../config/logger');

const getListSales = async (req, res) => {
  try {
    const title = req.query.title;
    const condition = title ? {
      title: {
        [Op.like]: `%${title}%`
      }
    } : null;

    Sales.findAll({
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
  }
};

const getOneSales = (req, res) => {
  try {
    const id = req.params.id;

    Sales.findByPk(id)
      .then(data => {
        if(data) {
          res.status(200).json({ data });
        } else {
          res.status(200).send({
            message: 'Cannot find sales'
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

const createSales = async (req, res) => {
  try {
    Sales.create({
      employee_id: req.body.employee_id,
      sales: req.body.sales,
    }).then((data) => {
      res.status(200).json({ message: 'Successfully create sales' })
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

const updateSales = async (req, res) => {
  try {
    const id = req.params.id;

    Sales.update({
      employee_id: req.body.employee_id,
      sales: req.body.sales,
    }, {
      where: {
        sales_id: id
      }
    })
      .then((status) => {
        if(status[0] === 1) {
          res.status(200).json({
            message: 'Sales was updated successfully.'
          })
        } else {
          res.status(200).send({
            message: 'Cannot update sales. Maybe sales was not found or body is empty'
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

const deleteSales = async (req, res) => {
  try {
    const id = req.params.id;

    Sales.destroy({
      where: {
        sales_id: id
      }
    })
      .then(status => {
        if(status === 1) {
          res.status(200).json({
            message: 'Sales was deleted successfully'
          })
        } else {
          res.status(200).json({
            message: 'Cannot delete sales. Maybe sales was not found'
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
  getListSales,
  getOneSales,
  createSales,
  updateSales,
  deleteSales,
};