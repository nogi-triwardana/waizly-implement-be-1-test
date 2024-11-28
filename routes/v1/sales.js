const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');

const { verifyUserToken } = authMiddleware;
const {
  getListSales,
  getOneSales,
  createSales,
  updateSales,
  deleteSales,
} = require('../../controllers/sales');

router.get('/sales', verifyUserToken, getListSales);
router.get('/sales/:id', verifyUserToken, getOneSales);
router.post('/sales', verifyUserToken, createSales);
router.put('/sales/:id', verifyUserToken, updateSales);
router.delete('/sales/:id', verifyUserToken, deleteSales);

module.exports = router;