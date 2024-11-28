const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');

const { verifyUserToken } = authMiddleware;
const { 
  getListEmployees, 
  getOneEmployee,
  createEmployee,
  updateEmployee,
  deleteEmpoyee,
} = require('../../controllers/employee');

router.get('/employee', verifyUserToken, getListEmployees);
router.get('/employee/:id', verifyUserToken, getOneEmployee);
router.post('/employee', verifyUserToken, createEmployee);
router.put('/employee/:id', verifyUserToken, updateEmployee);
router.delete('/employee/:id', verifyUserToken, deleteEmpoyee);

module.exports = router;