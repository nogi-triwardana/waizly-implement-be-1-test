const db = require('../config/db');

const dbMiddleware = async (req, res, next) => {
  try {
    req.db = db;
    console.log("Connecting to the database");
    next();
  } catch (error) {
    console.error('Error connecting to the database : ', error.message);
    res.status(500).json({ message: 'Internal server error' })
  }
};

module.exports = dbMiddleware;