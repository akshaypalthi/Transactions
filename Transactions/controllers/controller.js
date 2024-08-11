const db = require('../models/payments');

exports.addpayment = (req, res) => {
  const payment = req.body;
  db.addpayment(payment, (err) => {
    if (err) {
      res.status(500).send('Error');
      return;
    }
    res.status(201).send('created successfully');
  });
};

exports.getAllPayment = (req, res) => {
  db.getAllPayment((err, data) => {
    if (err) {
      res.status(500).send('Error getting details');
      return;
    }
    res.send(data);
  });
};

exports.getPaymentById = (req, res) => {
  const id = req.params.id;
  db.getPaymentById(id, (err, data) => {
    if (err) {
      res.status(500).send('Error getting details');
      return;
    }
    if (!data) {
      res.status(404).send('payment not found');
      return;
    }
    res.send(data);
  });
};

exports.updatePayment = (req, res) => {
  const id = req.params.id;
  const updatedpayment = req.body;
  db.updatePayment(id, updatedpayment, (err, result) => {
    if (err) {
      res.status(500).send('Error updating');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('payment not found');
      return;
    }
    res.status(200).send('payment updated successfully');
  });
};

exports.deletePayment = (req, res) => {
  const id = req.params.id;
  db.deletePayment(id, (err, result) => {
    if (err) {
      res.status(500).send('Error deleting ');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('payment not found');
      return;
    }
    res.send('payment deleted successfully');
  });
};