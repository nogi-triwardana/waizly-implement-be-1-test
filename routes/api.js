const express = require('express');
const router = express.Router();

const authRouter = require('./v1/auth');
const employeeRouter = require('./v1/employee');
const salesRouter = require('./v1/sales');

router.use('/v1', authRouter);
router.use('/v1', employeeRouter);
router.use('/v1', salesRouter);

module.exports = router;