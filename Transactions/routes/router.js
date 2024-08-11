const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');

router.post('/payments', Controller.addpayment);
router.get('/payments', Controller.getAllPayment);
router.get('/payments/:id', Controller.getPaymentById);
router.put('/payments/:id', Controller.updatePayment);
router.delete('/payments/:id', Controller.deletePayment);

module.exports = router;